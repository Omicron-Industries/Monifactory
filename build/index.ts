#!/usr/bin/env node
/**
* Build script for Monifactory
*
* This script uses Juke Build, read the docs here:
* https://github.com/stylemistake/juke-build
*/

import fs from "fs"
import Juke from "juke-build"

import { CodegenAllTarget } from "./codegen/target-all.ts"
export * from "./codegen/target-all.ts"

import { BuildModlistTarget, DownloadModsTarget, writeModsToFolder } from "./deps/mods.ts"
export * from "./deps/mods.ts"
export { PackModeParameter } from "./deps/pack_mode_switcher.ts"
export * from "./launcher/server.ts"
export * from "./launcher/client.ts"

import { getZipModPackTarget } from "./lib/zip_mode_target.ts"

Juke.chdir("..", import.meta.url)
try { process.loadEnvFile(".env") } catch { /* No file */ }
Juke.setup({ file: import.meta.url })
    .then(code => process.exit(code))
    .catch(err => { throw err })

export const includeList = [
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

export const BuildClientTarget = getZipModPackTarget("client", [
    new Juke.Target({
        name: "group-client-files",
        dependsOn: [CodegenAllTarget, BuildModlistTarget],
        inputs: [
            ...includeList.map(v => `${v}/**`),
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
                fs.cpSync(folders, `dist/client/overrides/${folders}`, { recursive: true })
            }
        }
    })
])

export const BuildServerTarget = getZipModPackTarget("server", [
    new Juke.Target({
        name: "group-server-files",
        dependsOn: [CodegenAllTarget, BuildModlistTarget, DownloadModsTarget],
        inputs: [
            ...includeList.map(v => `${v}/**`),
            "dist/modlist.html"
        ],
        outputs: () => ([
            "dist/server/",
            ...includeList.map(v => `dist/server/${v}`),
            "dist/server/mods"
        ]),
        async executes() {
            Juke.rm("dist/server", { recursive: true })
            fs.mkdirSync("dist/server", { recursive: true })
            for (const folders of includeList) {
                fs.cpSync(folders, `dist/server/${folders}`, { recursive: true })
            }

            await writeModsToFolder("dist/server/mods", file => {
                const fillet = file.toLowerCase()
                return !clientMods.find(modName => fillet.includes(modName))
            })
        }
    })
])

export const BuildAllTarget = new Juke.Target({
    dependsOn: [BuildServerTarget, BuildClientTarget]
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
        Juke.rm("dist/server", { recursive: true })
        Juke.rm("dist/*.zip")
    },
})

export const CleanAllTarget = new Juke.Target({
    dependsOn: [CleanCacheTarget, CleanBuildTarget],
})
