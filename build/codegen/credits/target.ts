import Juke from "juke-build"
import fs from "fs"
import { fileURLToPath } from "url"
import { v5 as uuid5 } from "uuid"
import z from "zod"

import { readDatafileJSON } from "../../lib/json_datafile.ts"
import { fillTemplateFile, fillTemplates } from "../fill_templates.ts"
import { hash } from "crypto"

const resolveNeighbourFilePath = (f: string) => fileURLToPath(import.meta.resolve("./" + f))

const contributorsFilePath = resolveNeighbourFilePath("contributors.json")

const devCapesFilePath = "kubejs/client_scripts/Dev_Capes.js"
const devCapeTemplateFilePath = resolveNeighbourFilePath("Dev_Cape.template.ts")
const devCapesTemplateFilePath = resolveNeighbourFilePath("Dev_Capes.template.ts")

const creditScreenLayoutFilePath = "config/fancymenu/customization/pack_credit_screen_layout.txt"
const creditScreenLayoutTemplateFilePath = resolveNeighbourFilePath("pack_credit_screen_layout.template.txt")
const creditScreenContributorTemplateFilePath = resolveNeighbourFilePath("pack_credit_screen_contributor.template.txt")

export const CodegenCreditsTarget = new Juke.Target({
    inputs: [
        devCapeTemplateFilePath,
        devCapesTemplateFilePath,

        creditScreenLayoutTemplateFilePath,
        creditScreenContributorTemplateFilePath,

        contributorsFilePath,
    ],
    outputs: [
        devCapesFilePath,
        creditScreenLayoutFilePath,
    ],
    executes: () => {
        const zRole = z.enum([
            "dev",
            "contributor",
            "dev-alt",
            "contributor-alt"
        ])

        const zContributor = z.object({
            mcuuid: z.string().optional(),
            role: zRole.optional(),
            description: z.string().optional(),
            link: z.string().optional()
        })

        const zContributorsFile = z.object({
            people: z.record(z.string(), zContributor),
            cape_name_of_role: z.record(zRole, z.string()),
            defaults: z.object({
                role: zRole,
                description: z.string(),
                skin: z.string()
            })
        })

        const { cape_name_of_role, people, defaults } = zContributorsFile.parse(readDatafileJSON(contributorsFilePath))

        // Apply default values to all people
        for (const [name, data] of Object.entries(people)) {
            people[name] = { ...defaults, ...data }
        }

        // ----------- Dev_Capes.js -----------
        const devCapeTemplate = fs.readFileSync(
            devCapeTemplateFilePath,
            { encoding: "utf8" },
        )

        const getCapesByRole = (role: z.infer<typeof zRole>) =>
            Object
                .entries(people)
                .flatMap(([name, data]) => data.mcuuid && data.role?.includes(role)
                    ? [fillTemplates(
                        devCapeTemplate,
                        {
                            "{{NAME}}": name,
                            "{{UUID}}": data.mcuuid,
                            "{{CAPE}}": cape_name_of_role[data.role],
                        },
                    )]
                    : []
                )
                .join("\n")

        fillTemplateFile(
            devCapesTemplateFilePath,
            devCapesFilePath,
            {
                "//{{CODEGEN_DEVS}}": getCapesByRole("dev"),
                "//{{CODEGEN_CONTRIBUTORS}}": getCapesByRole("contributor"),
            },
        )

        // ----------- pack_credit_screen_layout.txt -----------
        const startX = 25, startY = 20
        const stepX = 25, stepY = 50
        const maxX = 450
        const hoverOffsetX = -6, hoverOffsetY = 5
        let x = startX, y = startY

        const creditScreenContributorTemplate = fs.readFileSync(
            creditScreenContributorTemplateFilePath,
            { encoding: "utf8" },
        )

        const creditScreenContributors = Object
            .entries(people)
            .filter(([, data]) => !data.role?.includes("alt"))
        // Bubble up people with skins, as they would be more interesting
            .sort((a, b) => Number(!!b[1].mcuuid) - Number(!!a[1].mcuuid))
            .map(([name, data]) => {
                const uuidNamespace = hash("md5", JSON.stringify(data), "buffer")
                const elements = fillTemplates(
                    creditScreenContributorTemplate,
                    {
                        "{{MC_UUID}}": data.mcuuid ?? defaults.skin,
                        "{{V4_UUID}}": data.mcuuid ?? uuid5("uuid", uuidNamespace),
                        "{{PLAYERNAME}}": name,
                        // "NAME - DESC" if description exists, just "NAME" otherwise
                        "{{DESCRIPTION}}": [name, data.description].filter((s) => s).join(" - "),
                        "{{X_SKIN}}": x,
                        "{{Y_SKIN}}": y,
                        "{{X_BUTTON}}": x + hoverOffsetX,
                        "{{Y_BUTTON}}": y + hoverOffsetY,
                        "{{IF_HAS_LINK}}([^]*?){{IF_HAS_LINK_END}}\n": data.link ? (_, match) => match : "",
                        "{{LINK}}": data.link ?? "",
                        "{{BUTTON_EXEC_ACTION_UUID}}": uuid5("ButtonExecAction", uuidNamespace),
                        "{{BUTTON_EXEC_BLOCK_UUID}}": uuid5("ButtonExecBlock", uuidNamespace),
                    },
                )
                x += stepX
                if (x > maxX) {
                    // Next row
                    x = startX
                    y += stepY
                }
                return elements
            })
            .join("")

        fillTemplateFile(
            creditScreenLayoutTemplateFilePath,
            creditScreenLayoutFilePath,
            {
                "{{CODEGEN}}": creditScreenContributors,
            },
        )
    },
})

export default CodegenCreditsTarget
