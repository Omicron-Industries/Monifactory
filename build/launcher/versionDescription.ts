import z from "zod"
import { distribute } from "../lib/parallel.ts"
import { DownloadVersionManifest, readVersionManifest, zVersionType } from "./versionManifest.ts"
import { CACHE_FOLDER_VERSIONS, LAUNCHER_VERSION } from "./config.ts"
import { join } from "node:path"
import fs from "fs/promises"
import { readManifest } from "../lib/manifest.ts"
import { Target } from "juke-build"
import { cacheForever } from "../lib/cache.ts"

// BE NOT AFRAID
// The following is just a large zod schema for validating and transforming a version description provided by Mojang.
// It is quite a complicated structure.

// Actual tasks are at the bottom of the file.

const zFeatureFlag = z.enum([
    "is_demo_user",
    "has_custom_resolution",
    "has_quick_plays_support",
    "is_quick_play_singleplayer",
    "is_quick_play_multiplayer",
    "is_quick_play_realms",
])
export type FeatureFlag = z.infer<typeof zFeatureFlag>

const zOs = z.enum(["windows", "osx", "linux"])
export type OS = z.infer<typeof zOs>

const zRules = z.strictObject({
    action: z.literal(["allow", "disallow"]),
    features: z.record(zFeatureFlag, z.boolean().optional()).optional(),
    os: z.strictObject({
        name: zOs.optional(),
        arch: z.enum(["x86"]).optional(),
        version: z.string().transform(str => new RegExp(str)).optional(),
        versionRange: z.strictObject({
            min: z.string().optional(),
            max: z.string().optional(),
        }).optional(),
    }).optional(),
}).array()
export type Rules = z.infer<typeof zRules>

export const zRuledValues = z.union([
    z.string().transform(str => ({
        rules: undefined,
        value: [str],
    })),
    z.strictObject({
        rules: zRules.optional(),
        value: z.union([
            z.string().transform(str => [str]),
            z.string().array(),
        ]),
    }),
]).array()
type RuledValues = z.infer<typeof zRuledValues>

const zFile = z.strictObject({
    sha1: z.string(),
    size: z.number(),
    url: z.url(),
})
export type MinecraftFile = z.infer<typeof zFile>

const zFileWithId = zFile.extend({
    id: z.string(),
})

const zFileWithPath = zFile.extend({
    path: z.string(),
})

export const zLogging = z.strictObject({
    client: z.strictObject({
        argument: z.string(),
        type: z.string(),
        file: zFileWithId,
    }),
})

export const zLibrary = z.strictObject({
    name: z.string(),
    downloads: z.union([
        z.strictObject({
            artifact: zFileWithPath,
            classifiers: z.record(z.string(), zFileWithPath).optional(),
        }),
        z.strictObject({
            artifact: z.undefined(),
            classifiers: z.record(z.string(), zFileWithPath),
        }),
    ]),
    rules: zRules.optional(),
    natives: z.record(zOs, z.string().optional()).optional(),
    extract: z.strictObject({
        /** @example ["META-INF/"] */
        exclude: z.string().array(),
    }).optional(),
})
export type Library = z.infer<typeof zLibrary>

/** Version manifest for a single version */
const zVersionDescription = z.object({
    id: z.string(),
    assetIndex: zFileWithId.extend({
        totalSize: z.number(),
    }),
    assets: z.string(),
    mainClass: z.string(),
    logging: zLogging.optional(),
    libraries: zLibrary.array(),
    javaVersion: z.strictObject({
        component: z.string(),
        majorVersion: z.number().int(),
    }).optional(),
    complianceLevel: z.number().int().optional(),
    downloads: z.strictObject({
        client: zFile,
        server: zFile.optional(),
        client_mappings: zFile.optional(),
        server_mappings: zFile.optional(),
        windows_server: zFile.optional(),
    }),
    minimumLauncherVersion: z.number().int().gt(0).lte(LAUNCHER_VERSION),
    releaseTime: z.coerce.date(),
    time: z.coerce.date(),
    type: zVersionType,
}).and(z.union([
    z.object({
        arguments: z.strictObject({
            "game": zRuledValues,
            "jvm": zRuledValues,
            "default-user-jvm": zRuledValues.optional(),
        }),
        minecraftArguments: z.undefined(),
    }),
    z.object({
        arguments: z.undefined(),
        minecraftArguments: z.string(), // This is a legacy variant, the launcher hardcodes what to do for JVM arguments, and so we are too.
    }).transform(({ minecraftArguments }) => ({
        arguments: {
            game: [{ value: minecraftArguments.split(" ") }] satisfies RuledValues,
            jvm: [
                {
                    value: [
                        "-cp",
                        "${classpath}",
                        "-Djava.library.path=${natives_directory}",
                        "-Djna.tmpdir=${natives_directory}",
                        "-Dorg.lwjgl.system.SharedLibraryExtractPath=${natives_directory}",
                        "-Dio.netty.native.workdir=${natives_directory}",
                        "-Dminecraft.launcher.brand=${launcher_name}",
                        "-Dminecraft.launcher.version=${launcher_version}",
                    ],
                },
                {
                    rules: [{
                        action: "allow",
                        os: {
                            name: "windows",
                        },
                    }],
                    value: [
                        "-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump",
                    ],
                },
                {
                    rules: [{
                        action: "allow",
                        os: {
                            name: "osx",
                        },
                    }],
                    value: [
                        "-XstartOnFirstThread",
                    ],
                },
            ] satisfies RuledValues,
        },
    })),
]))
export type VersionDescription = z.infer<typeof zVersionDescription>

async function downloadVersionDescription(url: string, fileName: string) {
    const res = await fetch(url)
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
    }
    const { error, data } = zVersionDescription.safeParse(await res.json())
    if (error) {
        throw new Error(`Failed to parse versions: ${z.prettifyError(error)}`)
    }
    await fs.mkdir(CACHE_FOLDER_VERSIONS, { recursive: true })
    await fs.writeFile(join(CACHE_FOLDER_VERSIONS, fileName + ".json"), JSON.stringify(data))
}

/** Which version the modpack actually runs on? */
const getDesiredVersionId = () => readManifest().minecraft.version

export const DownloadVersionDescription = new Target({
    name: "download-version-description",
    dependsOn: [DownloadVersionManifest],
    inputs: [
        "manifest.json"
    ],
    outputs: () => [
        join(CACHE_FOLDER_VERSIONS, getDesiredVersionId() + ".json")
    ],
    async executes() {
        const desiredVersionId = getDesiredVersionId()
        const desiredVersionUrl = (await readVersionManifest()).versions.find(({ id }) => desiredVersionId === id)?.url
        if (!desiredVersionUrl) {
            throw new Error(`Failed to find version "${desiredVersionId}" in Mojang's listing`)
        }
        await downloadVersionDescription(desiredVersionUrl, desiredVersionId)
    }
})


/** A task that reads this must depend on {@linkcode DownloadVersionDescription}! */
export const readVersionDescription = cacheForever(async () => {
    const json = await fs.readFile(join(CACHE_FOLDER_VERSIONS, getDesiredVersionId() + ".json"), { encoding: "utf8" })
    return zVersionDescription.parse(JSON.parse(json))
})

if (import.meta.main) {
    // Redownload and parse all versions to ensure the schema is correct.
    await distribute(
        (await readVersionManifest()).versions,
        version => downloadVersionDescription(version.url, version.id),
        { concurrency: 10 }
    )
    // Make sure the Minecraft version in the manifest is real.
    console.log(await readVersionDescription())
}
