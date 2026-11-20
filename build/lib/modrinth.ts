import { z } from "zod"

/** Modrinth asks API clients to identify themselves: https://docs.modrinth.com/api/#user-agents */
const USER_AGENT = "Omicron-Industries/Monifactory build script"

const zVersion = z.object({
    files: z.object({
        url: z.url(),
        hashes: z.object({
            sha1: z.string(),
        }),
    }).array(),
})

/**
 * Asks Modrinth if they have a file with the given {@linkcode sha1}.
 * @returns A download URL, if found.
 */
export async function FindModrinthFileUrl(sha1: string): Promise<string | undefined> {
    const response = await fetch(`https://api.modrinth.com/v2/version_file/${sha1}?algorithm=sha1`, {
        headers: {
            Accept: "application/json",
            "User-Agent": USER_AGENT,
        }
    })
    if (response.status === 404) {
        return undefined
    }
    if (!response.ok) {
        throw new Error(`Modrinth lookup of ${sha1} failed: ${response.status}`)
    }
    return zVersion.parse(await response.json())
        .files.find(file => file.hashes.sha1 === sha1)?.url
}
