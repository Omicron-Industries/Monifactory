import fs from "node:fs/promises"
import { readManifest } from "../../lib/manifest.ts"
import { Target } from "juke-build"
import { CACHE_FOLDER_FORGE, CACHE_PATH_FORGE_INSTALLER } from "../config.ts"

export const getForgeVersion = () => {
    const { minecraft } = readManifest()
    return `${minecraft.version}-${minecraft.modLoaders.id}`
}

export const getForgeProfileId = () => {
    const { minecraft } = readManifest()
    return `${minecraft.version}-forge-${minecraft.modLoaders.id}`
}

export const DownloadForgeInstaller = new Target({
    name: "download-forge-installer",
    inputs: ["manifest.json"],
    outputs: [CACHE_PATH_FORGE_INSTALLER],
    async executes() {
        const forgeVersion = getForgeVersion()
        const res = await fetch(`https://maven.minecraftforge.net/net/minecraftforge/forge/${forgeVersion}/forge-${forgeVersion}-installer.jar`)
        if (!res.ok || !res.body) {
            throw new Error(`Failed to download Forge installer: ${res.status} ${res.statusText}`)
        }
        await fs.mkdir(CACHE_FOLDER_FORGE, { recursive: true })
        await fs.writeFile(CACHE_PATH_FORGE_INSTALLER, res.body)
    }
})
