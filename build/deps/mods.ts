import Juke from "juke-build"
import fs from "fs/promises"
import { existsSync } from "fs"

import { readManifest, type ManifestFileEntry } from "../lib/manifest.ts"
import { DownloadCF, GetModInfo } from "../lib/curseforge.ts"
import { writeDatafileJSON } from "../lib/json_datafile.ts"

/** We do not want to DOS the poor CF mirror service */
const MAX_PARALLEL_MOD_TARGETS = 4

export const cacheFolderByManifestFileEntry = (file: ManifestFileEntry) => `dist/mod_cache/${file.projectID}-${file.fileID}/`
export const modInfoPath = "info.json"

const DownloadModTargets = new Map<ManifestFileEntry["projectID"], Juke.Target>()

export const createDownloadModTarget = (file: ManifestFileEntry, dependsOn?: Juke.DependsOn) => {
    if (DownloadModTargets.has(file.projectID))
        return DownloadModTargets.get(file.projectID)

    const cacheFolder = cacheFolderByManifestFileEntry(file)
    const modInfoFullPath = cacheFolder + modInfoPath

    return new Juke.Target({
        name: `Download mod from project ${file.projectID}, version ${file.fileID}`,

        onlyWhen: () => !existsSync(modInfoFullPath), // Jar path cannot be predetermined, so check what we can, the mod info path.

        dependsOn,

        executes: async () => {
            await fs.mkdir(cacheFolder, { recursive: true })

            await DownloadCF(file, cacheFolder)
            writeDatafileJSON(modInfoFullPath, await GetModInfo(file.projectID))
        }
    })
}

/** Depends on all mod targets */
export const DownloadModsTarget = new Juke.Target({
    inputs: ["manifest.json"],
    dependsOn: () => {
        const weave: Juke.Target[] = []

        for (const file of readManifest().files) {
            if (DownloadModTargets.has(file.projectID)) continue
            const downloadModTarget = createDownloadModTarget(
                file,
                // Entangles mod targets dependencies, so that each one waits for the mod target N places back
                // A B C D->A E->B F->C G->D H->E ...
                // This effectively creates exactly N independent threads to execute at once
                weave.length > MAX_PARALLEL_MOD_TARGETS ? [weave.shift()] : undefined
            )
            weave.push(downloadModTarget)
            DownloadModTargets.set(file.projectID, downloadModTarget)
        }
        return Array.from(DownloadModTargets.values())
    },
})
