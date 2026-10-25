import { cacheForever } from "../lib/cache.ts"
import { execFile } from "node:child_process"
import { readVersionDescription } from "./versionDescription.ts"
import { join } from "node:path"

/**
 * Resolves to the Java executable path.
 * Rejects if the configured Java version is incorrect for the configured Minecraft version.
 *
 * A task that reads this must depend on {@linkcode DownloadVersionDescription}!
 */
export const getJavaPath = cacheForever(async (): Promise<string> => {
    const expectedJavaVersion = (await readVersionDescription()).javaVersion?.majorVersion

    const javaExecutablePath = process.env.JAVA_PATH
        ?? (process.env.JAVA_HOME && join(process.env.JAVA_HOME, "bin", "java"))
        ?? "java"

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

    if (!actualJavaVersion || (expectedJavaVersion && actualJavaVersion !== expectedJavaVersion)) {
        throw new Error(`Java version mismatch. Expected ${expectedJavaVersion ?? "any"}, but found ${actualJavaVersion ?? "none"}. You can set the Java executable used by the launcher in .env, see the README.`)
    }

    return javaExecutablePath
})
