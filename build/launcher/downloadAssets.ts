import { join } from "path"
import { downloadWithChecksum, matchesChecksum } from "./downloadWithChecksum.ts"
import fs from "node:fs/promises"
import { DownloadAssetIndex, readAssetIndex } from "./assetIndex.ts"
import { CACHE_FOLDER_ASSETS } from "./config.ts"
import Juke from "juke-build"
import { DownloadVersionDescription, readVersionDescription } from "./versionDescription.ts"
import { distribute } from "../lib/parallel.ts"
import { existsSync } from "node:fs"

const CACHE_FOLDER_ASSET_OBJECTS = join(CACHE_FOLDER_ASSETS, "objects")

/**
 * Downloads all assets specified in the asset index.
 */
export const DownloadAssets = new Juke.Target({
    name: "download-assets",
    dependsOn: [DownloadVersionDescription, DownloadAssetIndex],
    inputs: ["manifest.json"],
    outputs: [],
    async executes() {
        /** Mojang is nice and provides the total size of all assets, so we can show a progress indicator. */
        const { assetIndex: { totalSize: totalBytesToDownload } } = await readVersionDescription()
        const { objects } = await readAssetIndex()

        let alreadyDownloadedBytes = 0
        let lastLogTime = -Infinity
        function logStatus() {
            if (performance.now() - lastLogTime <= 5_000)
                return  // Log every 5 seconds only.
            lastLogTime = performance.now()

            Juke.logger.info(`Downloading assets.. ${(alreadyDownloadedBytes * 100 / totalBytesToDownload).toFixed(2)}%, ${alreadyDownloadedBytes}/${totalBytesToDownload} bytes`)
        }

        await distribute(
            Object.entries(objects),
            async ([name, { hash, size }]) => {
                alreadyDownloadedBytes += size

                const hashShort = hash.slice(0, 2)
                const dirPath = join(CACHE_FOLDER_ASSET_OBJECTS, hashShort)
                const filePath = join(dirPath, hash)

                if (existsSync(filePath)) {
                    await using fileHandle = await fs.open(filePath)
                    if (await matchesChecksum(fileHandle.createReadStream(), { sha1: hash, size })) {
                        return // Do nothing if already downloaded.
                    }
                    Juke.logger.warn(`Asset ${name} (${hash}) is wrong! Re-downloading it.`)
                }
                logStatus()

                // Download the actual file.
                await fs.mkdir(dirPath, { recursive: true })
                await fs.writeFile(filePath, downloadWithChecksum({
                    sha1: hash,
                    size,
                    url: `https://resources.download.minecraft.net/${hashShort}/${hash}`,
                }))
            },
            { concurrency: 15 }
        )
        logStatus()
    }
})
