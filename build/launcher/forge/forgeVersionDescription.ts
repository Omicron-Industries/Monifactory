import z from "zod"
import { join } from "node:path"
import fs from "fs/promises"
import { CACHE_FOLDER_VERSIONS } from "../config.ts"
import { readVersionDescription, zLibrary, zLogging, zRuledValues, type Library, type VersionDescription } from "../versionDescription.ts"
import { getForgeProfileId } from "./downloadForge.ts"
import { cacheForever } from "../../lib/cache.ts"

/**
 * Forge overrides to the version description.
 */
const zForgeVersionDescription = z.looseObject({
    inheritsFrom: z.string(),
    id: z.string(),
    mainClass: z.string(),
    libraries: zLibrary.array(),
    arguments: z.strictObject({
        game: zRuledValues,
        jvm: zRuledValues,
    }),
    /** Forge writes `{}` here. */
    logging: zLogging.partial().optional(),
})
type ForgeVersionDescription = z.infer<typeof zForgeVersionDescription>

export const getForgeProfilePath = () => join(CACHE_FOLDER_VERSIONS, getForgeProfileId(), getForgeProfileId() + ".json")

/**
 * Maven library name without a version.
 * @example "org.lwjgl:lwjgl:3.3.1:natives-linux" -> "org.lwjgl:lwjgl:natives-linux"
 */
function libraryKey({ name }: Library) {
    const [group, artifact, /* version */, ...classifier] = name.split("@")[0].split(":")
    return [group, artifact, ...classifier].join(":")
}

function inheritVersionDescription(vanilla: VersionDescription, forge: ForgeVersionDescription): VersionDescription {
    if (forge.inheritsFrom !== vanilla.id) {
        throw new Error(`${forge.id} requires ${forge.inheritsFrom}, but it was given ${vanilla.id} instead`)
    }
    return {
        ...vanilla,
        id: forge.id,
        mainClass: forge.mainClass,
        libraries: new Map(
            // Forge's libraries should replace the vanilla ones.
            [...vanilla.libraries, ...forge.libraries]
                .map(lib => [libraryKey(lib), lib]) // The key drops versions, so that a library can be replaced by a different version of itself.
        ).values().toArray(),
        minecraftArguments: undefined,
        arguments: {
            ...vanilla.arguments,
            game: [...vanilla.arguments.game, ...forge.arguments.game],
            jvm: [...vanilla.arguments.jvm, ...forge.arguments.jvm],
        },
        logging: forge.logging?.client ? { client: forge.logging.client } : vanilla.logging,
    }
}

/**
 * Forge generates this version description after installation. Use this over vanilla in the actual launch.
 *
 * A task that reads this must depend on `DownloadVersionDescription` and `InstallForgeClient`!
 */
export const readForgeVersionDescription = cacheForever(async () => {
    const json = await fs.readFile(getForgeProfilePath(), { encoding: "utf8" })
    const forgeVersionDescription = zForgeVersionDescription.parse(JSON.parse(json))
    return inheritVersionDescription(await readVersionDescription(), forgeVersionDescription)
})
