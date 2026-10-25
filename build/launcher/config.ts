import { join } from "node:path"

/** Launcher version. If this is behind official launcher's version, newer versions of manifests could be incompatible. */
export const LAUNCHER_VERSION = 21

export const CACHE_FOLDER_ROOT = join("dist", "launcher_cache")
export const CACHE_FOLDER_ASSETS = join(CACHE_FOLDER_ROOT, "assets")
export const CACHE_FOLDER_LOGGER = join(CACHE_FOLDER_ROOT, "logger")
export const CACHE_PATH_CLIENT_JAR = join(CACHE_FOLDER_ROOT, "client.jar")
