import Juke from "juke-build"
import fs from "fs/promises"
import { existsSync } from "fs"

import { readManifest, type ManifestFileEntry } from "../lib/manifest.ts"
import { DownloadCF, GetModInfo } from "../lib/curseforge.ts"
import { readDatafileJSON, writeDatafileJSON } from "../lib/json_datafile.ts"
import { distribute } from "../lib/parallel.ts"

/** We do not want to DOS CurseForge. */
const MAX_PARALLEL_MOD_TARGETS = 10

export const cacheFolderByManifestFileEntry = (file: ManifestFileEntry) => `dist/mod_cache/${file.projectID}-${file.fileID}/`
const modInfoPath = "info.json"

/** Depends on all mod targets */
export const DownloadModsTarget = new Juke.Target({
    inputs: ["manifest.json"],
    executes: () => distribute(
        readManifest().files,
        async file => {
            const cacheFolder = cacheFolderByManifestFileEntry(file)
            const modInfoFullPath = cacheFolder + modInfoPath

            if (existsSync(modInfoFullPath)) { // Jar path cannot be predetermined, so check what we can, the mod info path.
                return //  Already downloaded
            }

            await fs.mkdir(cacheFolder, { recursive: true })

            await DownloadCF(file, cacheFolder)
            writeDatafileJSON(modInfoFullPath, await GetModInfo(file.projectID))
        },
        { concurrency: MAX_PARALLEL_MOD_TARGETS }
    )
})


export const BuildModlistTarget = new Juke.Target({
    inputs: ["manifest.json"],
    outputs: ["dist/modlist.html"],
    dependsOn: [DownloadModsTarget],
    async executes() {
        await fs.mkdir("dist", { recursive: true })
        const htmlLines = [
            "<ul>",
            ...readManifest().files.map(file => {
                const modInfo = readDatafileJSON(
                    cacheFolderByManifestFileEntry(file) + modInfoPath
                ) as Awaited<ReturnType<typeof GetModInfo>>
                return `<li><a href=${modInfo.links.websiteUrl}>${modInfo.name} (by ${modInfo.authors.map(a => a.name).join(", ")})</a></li>`
            }),
            "</ul>"
        ]
        await fs.writeFile("dist/modlist.html", htmlLines.join("\n"))
    }
})
