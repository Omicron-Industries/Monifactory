import { Target } from "juke-build"
import { join } from "node:path"
import { CACHE_FOLDER_ROOT } from "./config.ts"
import z from "zod"
import fs from "node:fs/promises"
import { existsSync } from "node:fs"
import { cacheForever } from "../lib/cache.ts"

const CACHE_PATH_VERSION_MANIFEST = join(CACHE_FOLDER_ROOT, "version_manifest.json")

export const zVersionType = z.literal(["release", "snapshot", "old_alpha", "old_beta"])

const zVersionManifest = z.strictObject({
    latest: z.record(zVersionType, z.string().optional()),
    versions: z.strictObject({
        id: z.string(),
        type: zVersionType,
        url: z.url(),
        time: z.coerce.date(),
        releaseTime: z.coerce.date(),
    }).array(),
})

/** Fetches all available Minecraft versions from the official Mojang version manifest. */
export const DownloadVersionManifest = new Target({
    name: "download-version-manifest",
    outputs: [CACHE_PATH_VERSION_MANIFEST],
    onlyWhen: () => !existsSync(CACHE_PATH_VERSION_MANIFEST), // Infinite cache lifetime is fine, it's not like we are version hopping.
    async executes() {
        const res = await fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json")
        if (!res.ok) {
            throw new Error(`Failed to fetch versions: ${res.status} ${res.statusText}`)
        }
        const { error, data } = zVersionManifest.safeParse(await res.json())
        if (error) {
            throw new Error(`Failed to parse versions: ${z.prettifyError(error)}`)
        }
        await fs.mkdir(CACHE_FOLDER_ROOT, { recursive: true })
        await fs.writeFile(CACHE_PATH_VERSION_MANIFEST, JSON.stringify(data))
    },
})

/** A task that reads this must depend on {@linkcode DownloadVersionManifest}! */
export const readVersionManifest = cacheForever(async () => {
    const json = await fs.readFile(CACHE_PATH_VERSION_MANIFEST, { encoding: "utf8" })
    return zVersionManifest.parse(JSON.parse(json))
})

if (import.meta.main) {
    console.log(await readVersionManifest())
}
