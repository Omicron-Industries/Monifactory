import { join, resolve } from "node:path"
import { execFile } from "node:child_process"
import { existsSync } from "node:fs"
import fs from "node:fs/promises"
import Juke from "juke-build"
import { LAUNCHER_OS } from "./config.ts"
import { DownloadVersionDescription, readVersionDescription } from "./versionDescription.ts"
import { DownloadRuntimeManifest, getRuntime, readRuntimeManifest } from "./runtimeManifest.ts"
import { downloadWithChecksum, matchesChecksum } from "./downloadWithChecksum.ts"
import { cacheForever } from "../lib/cache.ts"

export const DownloadJava = new Juke.Target({
    name: "download-java",
    dependsOn: [DownloadVersionDescription, DownloadRuntimeManifest],
    inputs: ["manifest.json"],
    outputs: [],
    /** Not needed if the path is configured manually. */
    onlyWhen: () => !process.env.JAVA_PATH,
    async executes() {
        const { home } = await getRuntime()
        const files = Object.entries((await readRuntimeManifest()).files)

        let lastLogTime = performance.now()

        // The manifest lists files and directories in the exact order they need to be created, no parallelism.
        for (const [i, [relativePath, entry]] of files.entries()) {
            const path = join(home, relativePath)
            switch (entry.type) {
                case "directory":
                    await fs.mkdir(path, { recursive: true })
                    break
                case "file":
                    if (existsSync(path)) {
                        await using fileHandle = await fs.open(path)
                        if (await matchesChecksum(fileHandle.createReadStream(), entry.downloads.raw)) {
                            break // Do nothing if already downloaded.
                        }
                        Juke.logger.warn(`Java file ${relativePath} is wrong! Re-downloading it.`)
                    }
                    await fs.writeFile(path, downloadWithChecksum(entry.downloads.raw))
                    if (entry.executable) {
                        await fs.chmod(path, 0o755)
                    }
                    break
                case "link":
                    await fs.rm(path, { force: true })
                    await fs.symlink(entry.target, path)
                    break
            }


            if (performance.now() - lastLogTime <= 3_000)
                continue  // Log every 5 seconds only.
            lastLogTime = performance.now()

            Juke.logger.info(`Downloading Java.. ${(100 * i / files.length).toFixed(2)}%, ${i}/${files.length} files`)
        }
    }
})

/**
 * Java executable path. Used for executing mods and the game.
 *
 * A task that reads this must depend on {@linkcode DownloadVersionDescription} and {@linkcode DownloadJava}!
 */
export const getJavaPath = cacheForever(async (): Promise<string> => {
    const expectedJavaVersion = (await readVersionDescription()).javaVersion.majorVersion

    async function locateJavaExecutablePath() {
        // Manually set.
        if (process.env.JAVA_PATH)
            return process.env.JAVA_PATH

        // Downloaded from Mojang.
        const { home } = await getRuntime()
        switch (LAUNCHER_OS.name) {
            case "windows": return resolve(home, "bin", "java.exe")
            case "osx": return resolve(home, "jre.bundle", "Contents", "Home", "bin", "java")
            case "linux": return resolve(home, "bin", "java")
        }
    }

    const javaExecutablePath = await locateJavaExecutablePath()

    /** Runs the `java -version` command for real, to test the setup before it could break down the line. */
    const actualJavaVersion = await new Promise<number | null>(resolve => {
        execFile(javaExecutablePath, ["-version"], (err, stdout, stderr) => {
            if (err) return resolve(null)
            const version = stderr.match(/"(\d+)\.(\d+)\.[^"]+"/)?.slice(1).map(Number)
            if (version?.[0] === undefined || version[1] === undefined || version.some(isNaN)) {
                return resolve(null)
            }
            resolve(version[0] === 1 ? version[1] : version[0])
        })
    })

    if (actualJavaVersion !== expectedJavaVersion) {
        throw new Error(`Java version mismatch. Expected ${expectedJavaVersion}, but found ${actualJavaVersion ?? "none"}. You can set the Java executable used by the launcher in .env, see the README.`)
    }

    return javaExecutablePath
})
