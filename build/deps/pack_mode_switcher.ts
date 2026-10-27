import Juke from "juke-build"
import z from "zod"
import fs from "node:fs/promises"
import { cacheFolderByManifestFileEntry, DownloadModsTarget } from "./mods.ts"
import { readManifest } from "../lib/manifest.ts"
import { join, resolve } from "path"
import { getJavaPath } from "../launcher/java.ts"
import { DownloadVersionDescription } from "../launcher/versionDescription.ts"

const CORE_MOD_PROJECT_ID = 1266569

const zPackMode = z.enum(["normal", "hard", "expert"])
export type TPackMode = z.infer<typeof zPackMode>

export const PackModeParameter = new Juke.Parameter({ type: "string" })

/**
 * Switches the pack mode of folder {@linkcode cwd} to {@linkcode PackModeParameter}.
 */
export const getPackModeSwitchTarget = (
    name: Juke.Target["name"],
    cwd: string,
    dependsOn: Juke.Target[],
) => Juke.createTarget({
    name,
    parameters: [PackModeParameter],
    dependsOn: [...dependsOn, DownloadModsTarget, DownloadVersionDescription],
    async executes({ get }) {
        const { data: mode } = zPackMode.safeParse(get(PackModeParameter))
        if (mode === undefined) {
            Juke.logger.error(`--pack-mode is required. Must be one of: ${zPackMode.options.join(", ")}`)
            throw new Juke.ExitCode(1)
        }

        const codeModInfo = readManifest().files
            .find(file => file.projectID === CORE_MOD_PROJECT_ID)
        if (!codeModInfo) {
            throw new Error("Core mod is not present in the manifest")
        }
        const coreModFolder = cacheFolderByManifestFileEntry(codeModInfo)
        const [coreModJarPath] = Juke.glob(join(coreModFolder, "*.jar"))
        if (!coreModJarPath) throw new Error("Core mod is not downloaded?")

        // Core mod performs pack switching when executed standalone
        await Juke.exec(
            await getJavaPath(),
            ["-jar", resolve(coreModJarPath), mode, "--relative"],
            { cwd },
        )

        await fs.writeFile(`${cwd}/config/fancymenu/assets/pack-version.txt`, readManifest().version)
    }
})
