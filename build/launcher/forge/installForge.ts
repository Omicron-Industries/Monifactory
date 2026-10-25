import { resolve, basename, join } from "path"
import { CACHE_FOLDER_FORGE, CACHE_FOLDER_ROOT, CACHE_PATH_FORGE_INSTALLER, SERVER_INSTANCE_PATH } from "../config.ts"
import { DownloadClientJar } from "../downloadClientJar.ts"
import { DownloadLibraries } from "../downloadLibraries.ts"
import { getJavaPath } from "../java.ts"
import { DownloadVersionDescription } from "../versionDescription.ts"
import { DownloadForgeInstaller, getForgeVersion } from "./downloadForge.ts"
import Juke from "juke-build"
import fs from "node:fs/promises"
import { getForgeProfilePath } from "./forgeVersionDescription.ts"

/**
 * A task that calls this must depend on {@linkcode DownloadVersionDescription} and {@linkcode DownloadForgeInstaller}!
 */
async function runForgeInstaller(args: string[], cwd: string) {
    try {
        await Juke.exec(await getJavaPath(), ["-jar", resolve(CACHE_PATH_FORGE_INSTALLER), ...args], { cwd })
    } finally {
        // The installer logs into cwd.
        Juke.rm(join(cwd, basename(CACHE_PATH_FORGE_INSTALLER) + ".log"))
    }
}

/**
 * Runs the Forge installer, which writes patched Minecraft jars to the libraries folder.
 */
export const InstallForgeClient = new Juke.Target({
    name: "install-forge-client",
    dependsOn: () => [DownloadVersionDescription, DownloadClientJar, DownloadLibraries, DownloadForgeInstaller],
    inputs: ["manifest.json"],
    outputs: () => [getForgeProfilePath()],
    async executes() {
        // The installer refuses to install into a folder without a launcher profile, because it wants to add Forge to it. Why isn't that optional lmao.
        const launcherProfilesPath = join(CACHE_FOLDER_ROOT, "launcher_profiles.json")
        await fs.writeFile(launcherProfilesPath, JSON.stringify({ profiles: {} }))

        try {
            await runForgeInstaller(["--installClient", resolve(CACHE_FOLDER_ROOT)], CACHE_FOLDER_FORGE)
        } finally {
            await fs.rm(launcherProfilesPath)
        }
    }
})

/** Where the server's Forge lives. Also holds the launch arguments. */
export const getForgeServerLibraryDir = () => resolve(SERVER_INSTANCE_PATH, "libraries", "net", "minecraftforge", "forge", getForgeVersion())

/**
 * Runs the Forge installer, which writes patched Minecraft jars and the launch scripts.
 */
export const InstallForgeServer = new Juke.Target({
    name: "install-forge-server",
    dependsOn: () => [DownloadVersionDescription, DownloadForgeInstaller],
    inputs: ["manifest.json"],
    outputs: () => [getForgeServerLibraryDir()],
    async executes() {
        await fs.mkdir(SERVER_INSTANCE_PATH, { recursive: true })
        await runForgeInstaller(["--installServer"], SERVER_INSTANCE_PATH)
    }
})
