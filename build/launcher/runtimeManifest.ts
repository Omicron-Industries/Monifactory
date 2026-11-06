import * as os from "node:os"
import { dirname, join } from "node:path"
import { CACHE_FOLDER_RUNTIME, LAUNCHER_OS } from "./config.ts"
import z from "zod"
import { DownloadVersionDescription, readVersionDescription, zFile } from "./versionDescription.ts"
import { DownloadRuntimeIndex, LAUNCHER_RUNTIME_PLATFORM, readRuntimeIndex } from "./runtimeIndex.ts"
import { Target } from "juke-build"
import fs from "fs/promises"
import { downloadWithChecksum } from "./downloadWithChecksum.ts"
import { cacheForever } from "../lib/cache.ts"

/** Files of a single Java runtime version. */
const zRuntimeManifest = z.strictObject({
    files: z.record(
        z.string(), // slash-separated path of where to store something.
        z.union([
            z.strictObject({
                type: z.literal("directory"),
            }),
            z.strictObject({
                type: z.literal("file"),
                /** Executable file flag. */
                executable: z.boolean(),
                downloads: z.strictObject({
                    raw: zFile,
                    lzma: zFile.optional(), // Node cannot decompress this natively so I won't bother
                }),
            }),
            z.strictObject({
                type: z.literal("link"),
                /** Relative to the link. */
                target: z.string(),
            }),
        ])
    ),
})

/**
 * To mirror the `runtime` folder behaviour from the official launcher, the paths need to be dynamic depending on the runtime version.
 * So this function is the common code that calculates the folder layout.
 *
 * A task that calls this must depend on {@linkcode DownloadVersionDescription}!
 */
export const getRuntime = cacheForever(async () => {
    const { javaVersion: { component } } = await readVersionDescription()
    if (!LAUNCHER_RUNTIME_PLATFORM) {
        throw new Error(`Mojang does not support your setup (${LAUNCHER_OS.name} ${os.arch()}). Set a path to your own Java by following README.`)
    }
    const folder = join(CACHE_FOLDER_RUNTIME, component, LAUNCHER_RUNTIME_PLATFORM)
    return {
        component,
        platform: LAUNCHER_RUNTIME_PLATFORM, // The type is not nullish here, that is the point of the re-export.
        manifestPath: join(folder, component + ".json"),
        home: join(folder, component),
    }
})

export const DownloadRuntimeManifest = new Target({
    name: "download-runtime-manifest",
    dependsOn: [DownloadVersionDescription, DownloadRuntimeIndex],
    /** Not needed if the path is configured manually. */
    onlyWhen: () => !process.env.JAVA_PATH,
    inputs: ["manifest.json"],
    outputs: async () => LAUNCHER_RUNTIME_PLATFORM
        ? [(await getRuntime()).manifestPath]
        : [], // No outputs makes Juke think the task should be run, and it would throw in this case, as expected.
    async executes() {
        const { component, platform, manifestPath } = await getRuntime()

        // See the schema. The index is a double nested record.
        const runtime = (await readRuntimeIndex())[platform][component]
            .at(0) // We do however choose the first option just because.
        if (!runtime) {
            throw new Error(`Mojang does not support ${component} for ${platform}. Set a path to your own Java by following README.`)
        }

        await fs.mkdir(dirname(manifestPath), { recursive: true })
        await fs.writeFile(manifestPath, downloadWithChecksum(runtime.manifest), "utf-8")
        // Save to file ^    before parsing, because if schema fails, the download itself is not wrong.
        return await readRuntimeManifest()
    }
})

/** A task that reads this must depend on {@linkcode DownloadVersionDescription} and {@linkcode DownloadRuntimeManifest}! */
export const readRuntimeManifest = cacheForever(async () => {
    const json = await fs.readFile((await getRuntime()).manifestPath, { encoding: "utf8" })
    return zRuntimeManifest.parse(JSON.parse(json))
})

if (import.meta.main) {
    console.log(await readRuntimeManifest())
}
