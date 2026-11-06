import { join } from "node:path"
import { DownloadVersionDescription, readVersionDescription } from "./versionDescription.ts"
import { downloadWithChecksum } from "./downloadWithChecksum.ts"
import { CACHE_FOLDER_LOGGER } from "./config.ts"
import { Target } from "juke-build"
import fs from "node:fs/promises"

/**
 * Some version manifests include a logging client file, which is used to configure log4j.
 */
export const DownloadLogger = new Target({
    name: "download-logger",
    dependsOn: [DownloadVersionDescription],
    inputs: ["manifest.json"],
    outputs: [CACHE_FOLDER_LOGGER],
    async executes() {
        const { logging } = await readVersionDescription()
        if (!logging) {
            return
        }

        await fs.mkdir(CACHE_FOLDER_LOGGER, { recursive: true })
        await fs.writeFile(
            join(CACHE_FOLDER_LOGGER, logging.client.file.id),
            downloadWithChecksum(logging.client.file)
        )
    }
})
