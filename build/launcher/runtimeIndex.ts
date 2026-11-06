import * as os from "node:os"
import { join } from "node:path"
import { CACHE_FOLDER_RUNTIME, LAUNCHER_OS } from "./config.ts"
import z from "zod"
import { zFile, type OS } from "./versionDescription.ts"
import { Target } from "juke-build"
import fs from "fs/promises"
import { cacheForever } from "../lib/cache.ts"

const CACHE_PATH_RUNTIME_INDEX = join(CACHE_FOLDER_RUNTIME, "all.json")

/**
 * Yup, this thing really is hardcoded in the official launcher.
 * I guess they cannot change it due to backwards compatibility problems?
 */
const RUNTIME_INDEX_URL = "https://piston-meta.mojang.com/v1/products/java-runtime/2ec0cc96c44e5a76b9c8b7c39df7210883d12871/all.json"

/** Mojang's weird names for the Java platforms they support. */
const zRuntimePlatform = z.enum([
    "gamecore",
    "linux",
    "linux-i386",
    "mac-os",
    "mac-os-arm64",
    "windows-arm64",
    "windows-x64",
    "windows-x86",
])
type RuntimePlatform = z.infer<typeof zRuntimePlatform>

const RUNTIME_PLATFORMS: Record<OS, Partial<Record<NodeJS.Architecture, RuntimePlatform>>> = {
    linux: { x64: "linux", ia32: "linux-i386" },
    osx: { x64: "mac-os", arm64: "mac-os-arm64" },
    windows: { x64: "windows-x64", ia32: "windows-x86", arm64: "windows-arm64" },
}
/** Java for this machine's configuration. `undefined` if Mojang does not have one for this platform. */
export const LAUNCHER_RUNTIME_PLATFORM: RuntimePlatform | undefined = RUNTIME_PLATFORMS[LAUNCHER_OS.name][os.arch()]

// Example entry: "mac-os-arm64": { "java-runtime-alpha": [], "java-runtime-beta": [], "java-runtime-delta": [{ ... }] ,... }
const zRuntimeIndex = z.record(
    zRuntimePlatform,
    z.record(
        z.string(),
        z.strictObject({
            availability: z.strictObject({
                group: z.number().int(),
                progress: z.number().int(),
            }),
            manifest: zFile,
            version: z.strictObject({
                /** @example "17.0.15" */
                name: z.string(),
                released: z.coerce.date(),
            }),
        }).array()
    )
)

/** Fetches the list of all Mojang official Java runtimes for every platform. */
export const DownloadRuntimeIndex = new Target({
    name: "download-runtime-index",
    inputs: ["manifest.json"], // Not really an input, but Juke is a silly library, which would otherwise not check the output exists.
    outputs: [CACHE_PATH_RUNTIME_INDEX],
    /** Not needed if Java is manually overridden anyway. */
    onlyWhen: () => !process.env.JAVA_PATH,
    async executes() {
        const res = await fetch(RUNTIME_INDEX_URL)
        if (!res.ok) {
            throw new Error(`Failed to fetch Java runtimes: ${res.status} ${res.statusText}`)
        }
        const { error, data } = zRuntimeIndex.safeParse(await res.json())
        if (error) {
            throw new Error(`Failed to parse Java runtimes: ${z.prettifyError(error)}`)
        }
        await fs.mkdir(CACHE_FOLDER_RUNTIME, { recursive: true })
        await fs.writeFile(CACHE_PATH_RUNTIME_INDEX, JSON.stringify(data))
    },
})

/** A task that reads this must depend on {@linkcode DownloadRuntimeIndex}! */
export const readRuntimeIndex = cacheForever(async () => {
    const json = await fs.readFile(CACHE_PATH_RUNTIME_INDEX, { encoding: "utf8" })
    return zRuntimeIndex.parse(JSON.parse(json))
})

if (import.meta.main) {
    console.log(await readRuntimeIndex())
}
