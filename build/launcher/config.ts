import { join } from "node:path"
import * as os from "node:os"
import type { FeatureFlag, OS } from "./versionDescription.ts"

/** Launcher version. If this is behind official launcher's version, newer versions of manifests could be incompatible. */
export const LAUNCHER_VERSION = 21
export const LAUNCHER_INSTANCE_PATH = join("dist", "client_live")

export const CACHE_FOLDER_ROOT = join("dist", "launcher_cache")
export const CACHE_FOLDER_ASSETS = join(CACHE_FOLDER_ROOT, "assets")
export const CACHE_FOLDER_LOGGER = join(CACHE_FOLDER_ROOT, "logger")
export const CACHE_FOLDER_LIBRARIES = join(CACHE_FOLDER_ROOT, "libraries")
export const CACHE_FOLDER_NATIVES = join(CACHE_FOLDER_ROOT, "natives")
export const CACHE_PATH_CLIENT_JAR = join(CACHE_FOLDER_ROOT, "client.jar")

export const LAUNCHER_OS: {
    readonly name: OS,
    readonly arch?: "x86",
    readonly version: string
} = {
    name: os.type() === "Windows_NT" ? "windows" : os.type() === "Darwin" ? "osx" : "linux",
    arch: os.arch() === "x64" ? "x86" : undefined,
    version: os.release(),
}

export const LAUNCHER_FEATURES: Readonly<Record<FeatureFlag, boolean>> = {
    has_custom_resolution: false,
    is_demo_user: false,
    has_quick_plays_support: true,
    is_quick_play_multiplayer: false,
    is_quick_play_realms: false,
    is_quick_play_singleplayer: false,
}
