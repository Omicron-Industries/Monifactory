import { basename, dirname, join } from "node:path"
import { ZipFile } from "node:zlib"
import { pipeline } from "node:stream/promises"
import { createWriteStream, existsSync } from "node:fs"
import { DownloadVersionDescription, readVersionDescription, type MinecraftFile } from "./versionDescription.ts"
import { downloadWithChecksum, matchesChecksum } from "./downloadWithChecksum.ts"
import fs from "node:fs/promises"
import { fillTemplates } from "./fillTemplates.ts"
import { checkRulesMatch } from "./checkRulesMatch.ts"
import { cacheForever } from "../lib/cache.ts"
import { CACHE_FOLDER_LIBRARIES, CACHE_FOLDER_NATIVES, LAUNCHER_OS } from "./config.ts"
import { distribute } from "../lib/parallel.ts"
import Juke from "juke-build"

type LibraryDownloadInfo = {
    readonly name: string,
    readonly isNative: boolean,
    readonly filePath: string,
    readonly download: MinecraftFile,
    readonly excludeFromExtract?: readonly string[],
}

/**
 * Decides which libraries need to be downloaded for the configured Minecraft version.
 * This is just logic and does not perform any IO, because this information is used it multiple places -
 * downloading the libraries, and generating the classpath.
 *
 * A task that reads this must depend on {@linkcode DownloadVersionDescription}!
 */
export const getDownloadLibraries = cacheForever(async (): Promise<readonly LibraryDownloadInfo[]> => {
    const { libraries } = await readVersionDescription()

    /** Occasionally, classifiers have `${arch}` in them. */
    const variables = {
        arch: process.arch === "x64" ? "64" : "32",
    }

    return libraries
        .values()
        .filter(lib => checkRulesMatch(lib.rules))
        .flatMap<LibraryDownloadInfo>(function *(lib) {
            if (lib.downloads.artifact) {
                // This library has a normal artifact - a jar.
                yield {
                    name: lib.name,
                    // Sometimes "artifact" libraries can also be natives. IDK how to properly distinguish them, so just check if the name contains "native", somehow it works.
                    isNative: lib.name.includes("native"),
                    filePath: join(CACHE_FOLDER_LIBRARIES, lib.downloads.artifact.path),
                    download: lib.downloads.artifact,
                    excludeFromExtract: lib.extract?.exclude,
                } satisfies LibraryDownloadInfo
            }
            if (lib.downloads.classifiers) {
                // This is a native library, which has different classifiers for different OSes.
                const whichClassifier = lib.natives?.[LAUNCHER_OS.name]
                if (!whichClassifier) {
                    throw new Error(`Failed to find which classifier to download for OS ${LAUNCHER_OS.name}, library ${lib.name}`)
                }
                const classifier = lib.downloads.classifiers?.[fillTemplates(whichClassifier, variables)]
                if (!classifier) {
                    throw new Error(`Did not find classifier ${whichClassifier} for library ${lib.name}`)
                }
                yield {
                    name: lib.name,
                    isNative: true,
                    filePath: join(CACHE_FOLDER_LIBRARIES, classifier.path),
                    download: classifier,
                    excludeFromExtract: lib.extract?.exclude,
                } satisfies LibraryDownloadInfo
            }
        })
        .toArray()
})


export const DownloadLibraries = new Juke.Target({
    name: "download-libraries",
    dependsOn: [DownloadVersionDescription],
    inputs: ["manifest.json"],
    outputs: [],
    async executes() {
        await distribute(
            await getDownloadLibraries(),
            async lib => {
                if (existsSync(lib.filePath)) {
                    await using fileHandle = await fs.open(lib.filePath)
                    if (await matchesChecksum(fileHandle.createReadStream(), lib.download)) {
                        return // Do nothing if already downloaded.
                    }
                    Juke.logger.warn(`Library ${lib.name} is wrong! Re-downloading it.`)
                }
                await fs.mkdir(dirname(lib.filePath), { recursive: true })
                await fs.writeFile(lib.filePath, downloadWithChecksum(lib.download), "utf-8")
                if (lib.isNative) {
                    // Native libraries are distributed as zip files (named as .jar files anyway), which need to be extracted into a natives directory.
                    // Java must reference dynamic native libraries in this directory when launching the game.
                    await fs.mkdir(CACHE_FOLDER_NATIVES, { recursive: true })
                    const zip = await ZipFile.open(lib.filePath)
                    try {
                        await distribute(
                            zip.values(),
                            async entry => {
                                if (!entry.isFile) return
                                // Apply blacklist - version manifest can specify some paths to be excluded from extraction.
                                if (lib.excludeFromExtract?.some(excludePath => entry.name.startsWith(excludePath))) return
                                // Write the native library file TO THE ROOT of natives directory
                                await pipeline(
                                    entry.contentIterator(),
                                    createWriteStream(join(CACHE_FOLDER_NATIVES, basename(entry.name)))
                                )
                            },
                            { concurrency: 100 }
                        )
                    } finally {
                        await zip.close()
                    }
                }
            },
            { concurrency: 5 }
        )
    }
})
