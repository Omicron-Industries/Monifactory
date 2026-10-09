#!/usr/bin/env node
/**
* Build script for Monifactory
*
* This script uses Juke Build, read the docs here:
* https://github.com/stylemistake/juke-build
*/

import fs from "fs"
import path, { resolve } from "path"
import Juke from "juke-build"

import { CodegenAllTarget } from "./codegen/target-all.ts"
export * from "./codegen/target-all.ts"

import { cacheFolderByManifestFileEntry, DownloadModsTarget, modInfoPath } from "./deps/mods.ts"
export * from "./deps/mods.ts"
export * from "./deps/pack_mode_switcher.ts"
export * from "./run/server.ts"

import type { GetModInfo } from "./lib/curseforge.ts"
import { readManifest } from "./lib/manifest.ts"
import { readDatafileJSON } from "./lib/json_datafile.ts"
import { getZipModPackTarget } from "./lib/zip_mode_target.ts"

Juke.chdir("..", import.meta.url)
Juke.setup({ file: import.meta.url })
    .then(code => process.exit(code))
    .catch(err => { throw err })

const includeList = [
    "config",
    "defaultconfigs",
    "config-overrides",
    "kubejs",
//  "mods"
]

/** All mods must be lower-case */
const clientMods = [
    "oculus",
    "zume",
    "watermedia",
    "embeddium",
    "embeddiumplus",
    "citresewn",
    "legendarytooltips",
    "drippyloadingscreen",
    "badoptimizations",
    "fancymenu",
    "gtmoldraw",
    "phoenixchromaticcodes"
]

const symlinkSync = (ourDir: fs.PathLike, newDir: fs.PathLike) => {
    if (process.platform === "win32") {
        if (!fs.lstatSync(ourDir).isDirectory()) {
            fs.copyFileSync(ourDir, newDir)
            return
        }
        fs.symlinkSync(ourDir, newDir, "junction")
        return
    }
    fs.symlinkSync(ourDir, newDir)
}

/** A filter for the built client/server zips. */
const packFileBlacklist = (source: string) =>
    !["node_modules", ".tsbuild"].includes(path.basename(source))

const cpMods = (targetDir: string, filter?: (file: string) => boolean) => {
    // Cache might contain more files than the manifest!
    // Make sure to copy only the necessary ones
    for (const manifile of readManifest().files) {
        if (!manifile.required) continue
        const folder = cacheFolderByManifestFileEntry(manifile)
        for (const file of fs.readdirSync(folder, { recursive: false, encoding: "utf8" })) {
            if (!file.endsWith(".jar")) continue
            if (filter && !filter(file)) continue
            fs.copyFileSync(path.join(folder, file), path.join(targetDir, file))
        }
    }
}

// for --mode=beta/release
export const ModeParameter = new Juke.Parameter({
    type: "string"
})

export const BuildModlistTarget = new Juke.Target({
    inputs: ["manifest.json"],
    outputs: ["dist/modlist.html"],
    dependsOn: [DownloadModsTarget],
    executes: () => {
        fs.mkdirSync("dist", { recursive: true })
        const htmlLines = [
            "<ul>",
            ...readManifest().files.map(file => {
                const modInfo = readDatafileJSON(
                    cacheFolderByManifestFileEntry(file) + modInfoPath
                ) as Awaited<ReturnType<typeof GetModInfo>>
                return `<li><a href=${modInfo.links.websiteUrl}>${modInfo.name} (by ${modInfo.authors.map(a => a.name).join(", ")})</a></li>`
            }),
            "</ul>"
        ]
        fs.writeFileSync("dist/modlist.html", htmlLines.join("\n"))
    }
})

export const UpdateModsFolder = new Juke.Target({

    dependsOn: [DownloadModsTarget],
    outputs: () => ([
        "mods/"
    ]),
    executes: () => {
        try {
            // Nuking mods folder before re-adding them in order to stay up to date
            if(fs.existsSync("mods/")) fs.rmSync("mods/", { recursive: true })
            fs.mkdirSync("mods/", { recursive: true })
            cpMods("mods/")
        } catch (error) {
            Juke.logger.error(error)
            throw new Juke.ExitCode(1)
        }
    }
})

export const BuildClientTarget = getZipModPackTarget("client", PackSwitchTarget => [
    new Juke.Target({
        name: "group-client-files",
        dependsOn: [CodegenAllTarget, BuildModlistTarget, PackSwitchTarget],
        inputs: [
            ...includeList,
            "dist/modlist.html"
        ],
        outputs: () => ([
            "dist/client/",
            ...includeList.map(v => `dist/client/overrides/${v}`),
        // "dist/client/mods",
        ]),
        executes: () => {
            fs.mkdirSync("dist/client/overrides", { recursive: true })
            for (const folders of includeList) {
                fs.cpSync(folders, `dist/client/overrides/${folders}`, { recursive: true, filter: packFileBlacklist })
            }
        }
    })
])

export const BuildServerTarget = getZipModPackTarget("server", PackSwitchTarget => [
    new Juke.Target({
        name: "group-server-files",
        dependsOn: [CodegenAllTarget, BuildModlistTarget, DownloadModsTarget, PackSwitchTarget],
        inputs: [
            ...includeList.map(v => `${v}/**`),
            "dist/modlist.html"
        ],
        outputs: () => ([
            "dist/server/",
            ...includeList.map(v => `dist/server/${v}`),
            "dist/server/mods"
        ]),
        executes: () => {
            Juke.rm("dist/server", { recursive: true })
            fs.mkdirSync("dist/server", { recursive: true })
            for (const folders of includeList) {
                fs.cpSync(folders, `dist/server/${folders}`, { recursive: true, filter: packFileBlacklist })
            }

            fs.mkdirSync("dist/server/mods")
            cpMods("dist/server/mods", file => {
                const fillet = file.toLowerCase()
                return !clientMods.find(modName => fillet.includes(modName))
            })
        }
    })
])


export const BuildDevTarget = getZipModPackTarget("dev", PackSwitchTarget => [
    new Juke.Target({
        name: "group-dev-files",
        dependsOn: [BuildModlistTarget, DownloadModsTarget, PackSwitchTarget],
        inputs: [
            // weird bug with symlinked config and mods folder
            ...includeList,
            "dist/modlist.html"
        ],
        outputs: () => ([
            "dist/dev/",
            "dist/.devtmp/",
            ...includeList.map(v => `dist/dev/overrides/${v}`),
            "dist/dev/overrides/mods",
        ]),
        executes: () => {
            Juke.rm("dist/.devtmp", { recursive: true })
            fs.mkdirSync("dist/.devtmp", { recursive: true })

            if (fs.existsSync("dist/dev")) {
                Juke.logger.info("Only updating mods as dist/dev exists")

                fs.mkdirSync("dist/dev/overrides", { recursive: true })
                cpMods("dist/.devtmp")
                fs.cpSync("../mods", "dist/.devtmp", { recursive: true })
                return
            }

            fs.mkdirSync("dist/dev/overrides", { recursive: true })
            for (const folders of includeList.filter(v => !(v === "mods" || v === "config"))) {
                symlinkSync(resolve(folders), resolve(`dist/dev/overrides/${folders}`))
            }

            // "merge" both mod folders
            cpMods("dist/.devtmp")
            fs.cpSync("../mods", "dist/.devtmp", { recursive: true, force: true })
            symlinkSync(resolve("dist/.devtmp"), resolve("dist/dev/overrides/mods"))
            // fs.cpSync('dist/.devtmp', 'dist/dev/mods', { recursive: true });
            fs.cpSync("config", "dist/dev/overrides/config", { recursive: true })

            // todo find the mod to blame, or just remove this and the filters up there if this ever gets fixed
            Juke.logger.warn("Due to a bug with moonlight, symlinking the config folder causes errors which breaks game startup.")
            Juke.logger.warn("When updating, the config folder requires manual copy.")
        }
    })
])


export const BuildAllTarget = new Juke.Target({
    dependsOn: [BuildServerTarget, BuildClientTarget]
})

export const UploadTarget = new Juke.Target({
    dependsOn: [BuildAllTarget],
    parameters: [ModeParameter],
    inputs: [
        "dist/client.zip",
        "dist/server.zip",
    ],
    executes: ({ get }) => {
        get(ModeParameter)
    },
})

export const CleanCacheTarget = new Juke.Target({
    executes: () => {
        Juke.rm("dist/mod_cache", { recursive: true })
        Juke.rm("dist/modlist.html")
    },
})

export const CleanBuildTarget = new Juke.Target({
    executes: () => {
        Juke.rm("dist/client", { recursive: true })
        Juke.rm("dist/dev", { recursive: true })
        Juke.rm("dist/server", { recursive: true })
        Juke.rm("dist/.devtmp", { recursive: true })
        Juke.rm("dist/*.zip")
    },
})

export const CleanAllTarget = new Juke.Target({
    dependsOn: [CleanCacheTarget, CleanBuildTarget],
})

export default BuildDevTarget
