import { join } from "node:path"
import { CACHE_FOLDER_ASSETS } from "./config.ts"
import z from "zod"
import { DownloadVersionDescription, readVersionDescription } from "./versionDescription.ts"
import { Target } from "juke-build"
import fs from "fs/promises"
import { downloadWithChecksum } from "./downloadWithChecksum.ts"
import { cacheForever } from "../lib/cache.ts"

const CACHE_FOLDER_ASSET_INDEXES = join(CACHE_FOLDER_ASSETS, "indexes")
/** The game looks up the asset index at `${assets_root}/indexes/${assets_index_name}.json`, this is not configurable! */
const getAssetIndexPath = (id: string) => join(CACHE_FOLDER_ASSET_INDEXES, id + ".json")

/**
 * Schema describing the asset index JSON file.
 */
const zAssetIndex = z.strictObject({
    objects: z.record(z.string(), z.strictObject({
        hash: z.string(),
        size: z.number().int(),
    })),
    virtual: z.literal(true).optional(),
    map_to_resources: z.literal(true).optional(),
})

export const DownloadAssetIndex = new Target({
    name: "download-asset-index",
    dependsOn: [DownloadVersionDescription],
    inputs: ["manifest.json"],
    outputs: [CACHE_FOLDER_ASSET_INDEXES],
    async executes() {
        const { assetIndex } = await readVersionDescription()
        const decoder = new TextDecoder()
        const assetIndexData = (await Array.fromAsync(downloadWithChecksum(assetIndex), chunk => decoder.decode(chunk))).join("")
        await fs.mkdir(CACHE_FOLDER_ASSET_INDEXES, { recursive: true })
        await fs.writeFile(getAssetIndexPath(assetIndex.id), assetIndexData, "utf-8")
        // Save to file ^    before parsing, because if schema fails, the download itself is not wrong.
        return zAssetIndex.parse(JSON.parse(assetIndexData))
    }
})

/** A task that reads this must depend on {@linkcode DownloadVersionDescription} and {@linkcode DownloadAssetIndex}! */
export const readAssetIndex = cacheForever(async () => {
    const { assetIndex } = await readVersionDescription()
    const json = await fs.readFile(getAssetIndexPath(assetIndex.id), { encoding: "utf8" })
    return zAssetIndex.parse(JSON.parse(json))
})

if (import.meta.main) {
    console.log(await readAssetIndex())
}
