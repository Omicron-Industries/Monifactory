import fs from "fs/promises"
import { join } from "path"
import Juke from "juke-build"
import { BuildClientTarget, DownloadModsTarget, writeModsToFolder } from "../index.ts"
import { LAUNCHER_INSTANCE_PATH } from "./config.ts"

const clientBuildDir = join("dist", "client", "overrides")


export const BuildClientLiveTarget = new Juke.Target({
    name: "build-client-live",
    dependsOn: () => [
        DownloadModsTarget,
        BuildClientTarget
    ],
    inputs: [
        "manifest.json",
        clientBuildDir,
    ],
    outputs: [LAUNCHER_INSTANCE_PATH],
    executes: async () => {
        await fs.mkdir(LAUNCHER_INSTANCE_PATH, { recursive: true })

        // Rewrite every folder that is bundled in client build already. Extra folders, like the saves, survive.
        for (const entry of await fs.readdir(clientBuildDir)) {
            await fs.rm(join(LAUNCHER_INSTANCE_PATH, entry), { recursive: true, force: true })
        }

        const clientModsFolder = join(LAUNCHER_INSTANCE_PATH, "mods")
        // Nuking mods/, because they also survive the filter.
        await fs.rm(clientModsFolder, { force: true, recursive: true })
        await writeModsToFolder(clientModsFolder)

        await fs.cp(clientBuildDir, LAUNCHER_INSTANCE_PATH, { recursive: true })
    }
})

