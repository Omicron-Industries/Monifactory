import Juke from "juke-build"
import z from "zod"
import { cacheFolderByManifestFileEntry, DownloadModsTarget } from "./mods.ts"
import { readManifest } from "../lib/manifest.ts"
import { join, resolve } from "path"
import { readDatafileJSON } from "../lib/json_datafile.ts"
import { getJavaPath } from "../launcher/java.ts"
import { DownloadVersionDescription } from "../launcher/versionDescription.ts"

const CORE_MOD_PROJECT_ID = 1266569


const zPackMode = z.enum(["normal", "hard", "expert"])
export type TPackMode = z.infer<typeof zPackMode>

let mutex = false

/**
 * A task that reads this must depend on {@linkcode DownloadVersionDescription}!
 */
const executePackModeSwitch = async (mode: TPackMode) => {
    while (mutex) {
        await new Promise(r => setTimeout(r, 1000))
    }
    mutex = true
    try {
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
        )
    } finally {
        mutex = false
    }
}

export const getPackModeSwitchTarget = (
    mode: TPackMode,
    { cwd, onlyWhen }: {
        cwd: string,
        onlyWhen: Juke.OnlyWhenFn,
    }
) => Juke.createTarget({
    name: "switch-pack-mode-to-" + mode,

    onlyWhen: async ctx => {
        if (!await onlyWhen(ctx)) return false
        try {
            const { mode: existingMode } = readDatafileJSON(join(cwd, "config/packmode.json")) as { mode?: string }
            if (!existingMode) {
                throw new Error("Current pack mode is not set")
            }
            return mode !== existingMode.toLowerCase()
        } catch {
            return true
        }
    },

    // Needs the core mod jar
    dependsOn: [DownloadModsTarget],

    executes: () => executePackModeSwitch(mode),

})

export const PackModeParameter = new Juke.Parameter({ type: "string" })

export const SwitchPackModeTarget = new Juke.Target({
    parameters: [PackModeParameter],
    dependsOn: [DownloadModsTarget, DownloadVersionDescription],
    executes: ({ get }) => {
        const { data: mode } = zPackMode.safeParse(get(PackModeParameter))
        if (mode === undefined) {
            Juke.logger.error(`Invalid pack mode selected. Must be one of: ${zPackMode.options.join(", ")}`)
            throw new Juke.ExitCode(1)
        }
        return executePackModeSwitch(mode)
    },
})
