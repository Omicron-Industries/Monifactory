import Juke from "juke-build"
import { join, relative, sep } from "node:path"
import fs from "node:fs/promises"
import { pipeline } from "node:stream/promises"
import { zipFiles } from "node:zlib"
import { getPackModeSwitchTarget } from "../deps/pack_mode_switcher.ts"
import { createWriteStream } from "node:fs"

export const getZipModPackTarget = (
    group: "server" | "client",
    dependsOn: Juke.Target[],
) => {
    const packSwitchPath = `dist/${group}${group !== "server" ? "/overrides" : ""}`

    return Juke.createTarget({

        inputs: [
            "manifest.json",
            "dist/modlist.html",
            "LICENSE.md",
            `dist/${group}`,
            join(packSwitchPath, ".mode"),
        ],

        outputs: [
            `dist/${group}.zip`,
        ],

        dependsOn: [getPackModeSwitchTarget(`switch-${group}-pack-mode`, packSwitchPath, dependsOn)],

        async executes() {
            Juke.rm(`dist/${group}.zip`)
            await Promise.all([
                fs.copyFile("manifest.json", `dist/${group}/manifest.json`),
                fs.copyFile("dist/modlist.html", `dist/${group}/modlist.html`),
                fs.copyFile("LICENSE.md", `dist/${group}/LICENSE.md`)
            ])

            Juke.logger.info("Zipping. This might take a while.")
            const files = (await fs.readdir(`dist/${group}`, { recursive: true, withFileTypes: true }))
                .map(entry => {
                    const entryPath = join(entry.parentPath, entry.name)
                    // Zip entry names always use /.
                    const entryName = relative(`dist/${group}`, entryPath).replaceAll(sep, "/")
                    // Folders always end with /.
                    return [entryPath, entry.isDirectory() ? `${entryName}/` : entryName] as const
                })
            await pipeline(
                zipFiles(files),
                createWriteStream(`dist/${group}.zip`),
            )
        }

    })
}
