import fs from "fs/promises"
import { join, resolve } from "path"
import Juke from "juke-build"
import { BuildClientTarget, DownloadModsTarget, writeModsToFolder } from "../index.ts"
import { CACHE_FOLDER_ASSETS, CACHE_FOLDER_LIBRARIES, CACHE_FOLDER_LOGGER, CACHE_FOLDER_NATIVES, LAUNCHER_IGNORES_LOGGER_CONFIG, LAUNCHER_INSTANCE_PATH, LAUNCHER_JVM_ARGS, LAUNCHER_OS, LAUNCHER_VERSION } from "./config.ts"
import { DownloadVersionDescription, type Rules } from "./versionDescription.ts"
import { readManifest } from "../lib/manifest.ts"
import { DownloadLibraries, getDownloadLibraries } from "./downloadLibraries.ts"
import { InstallForgeClient } from "./forge/installForge.ts"
import { readForgeVersionDescription } from "./forge/forgeVersionDescription.ts"
import { DownloadAssets } from "./downloadAssets.ts"
import { DownloadLogger } from "./downloadLogger.ts"
import { execFile } from "child_process"
import { checkRulesMatch } from "./checkRulesMatch.ts"
import { fillTemplates } from "./fillTemplates.ts"
import { getJavaPath } from "./java.ts"

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

export const RunClientTarget = new Juke.Target({
    dependsOn: [
        DownloadVersionDescription,
        BuildClientLiveTarget,
        DownloadAssets,
        DownloadLibraries,
        DownloadLogger,
        InstallForgeClient,
    ],
    async executes() {
        const playerUUID = crypto.randomUUID()
        const modpackName = readManifest().name
        const classpathSeparator = LAUNCHER_OS.name === "windows" ? ";" : ":"

        const {
            type: releaseType,
            assetIndex: { id: assetIndexId },
            arguments: { jvm, game },
            logging,
            mainClass,
        } = await readForgeVersionDescription()

        /**
         * These are the values used to evaluate ${templates} in launch arguments.
         * Keys correspond to template names, not cosmetic!!
         */
        const LAUNCHER_PARAMETERS = {
            // Offline mode! To play multiplayer, build the pack, and import into a REAL launcher, with a Minecraft account.
            auth_access_token: playerUUID,
            auth_session: playerUUID,
            auth_uuid: playerUUID,
            auth_xuid: playerUUID,
            clientid: playerUUID,

            user_properties: "{}",
            user_type: "msa",

            auth_player_name: modpackName + "Dev",
            version_name: modpackName,
            version_type: `${releaseType} [Modpack Dev]`,
            launcher_name: `${modpackName} Integrated Launcher`,
            resolution_width: "856",
            resolution_height: "482",

            game_directory: resolve(LAUNCHER_INSTANCE_PATH),
            game_assets: resolve(CACHE_FOLDER_ASSETS),
            assets_root: resolve(CACHE_FOLDER_ASSETS),
            natives_directory: resolve(CACHE_FOLDER_NATIVES),
            library_directory: resolve(CACHE_FOLDER_LIBRARIES),
            launcher_version: `${LAUNCHER_VERSION}`,
            assets_index_name: assetIndexId,

            classpath: (await getDownloadLibraries())
                .map(lib => resolve(lib.filePath)) // Generates classpath from all the libraries specified in the version manifest
                .join(classpathSeparator),
            classpath_separator: classpathSeparator,

            quickPlayPath: "quick_play.json",
            quickPlaySingleplayer: "",
            quickPlayMultiplayer: "",
            quickPlayRealms: "",
        }

        const filterAndFillArgs = (args: Array<{
            rules?: Rules | undefined,
            value: string[]
        }>) => args
            .filter(arg => checkRulesMatch(arg.rules))
            .flatMap(arg => arg.value)
            .map(arg => fillTemplates(arg, LAUNCHER_PARAMETERS))

        const jvmArgs = filterAndFillArgs(jvm)
        if (!LAUNCHER_IGNORES_LOGGER_CONFIG && logging?.client.argument) {
            jvmArgs.push(fillTemplates(
                logging.client.argument,
                { path: resolve(CACHE_FOLDER_LOGGER, logging.client.file.id) },
            ))
        }
        jvmArgs.push(...LAUNCHER_JVM_ARGS())

        const gameArgs = filterAndFillArgs(game)

        const child = execFile(
            await getJavaPath(),
            [...jvmArgs, mainClass, ...gameArgs],
            { cwd: LAUNCHER_INSTANCE_PATH } // The sole reason for all those resolves above :P
        )
        child.stderr?.pipe(process.stderr)
        child.stdout?.pipe(process.stdout)
        return new Promise<void>((resolve, reject) => {
            child.once("exit", code => {
                if (code === 0) {
                    resolve()
                } else {
                    reject(new Error(`Client exited with code ${code}`))
                }
            })
        })
    }
})

