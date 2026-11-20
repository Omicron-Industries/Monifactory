import Juke from "juke-build"
import fs from "fs"
import { z } from "zod"
import type { ManifestFileEntry } from "./manifest.ts"
import { FindModrinthFileUrl } from "./modrinth.ts"
import { resolve } from "node:path"

/**
 * ********************************************************************************************************************
 *
 *      This key was issued specifically for the Omicron Industries team `https://github.com/Omicron-Industries`
 *      and its future contributors. If you make any kind of derivative work without the intent of contributing to
 *      upstream (projects by the Omicron Industries team), CurseForge requires you to change this.
 *
 * ********************************************************************************************************************
 *
 * By using this key you accept the terms and conditions laid down in
 * https://support.curseforge.com/en/support/solutions/articles/9000207405-curse-forge-3rd-party-api-terms-and-conditions
 */
const DEFAULT_CURSEFORGE_API_KEY = "$2a$10$blAbCtj13vXNPvqPKznf8Os7FNGlAQPjRyZIUoC8Q5nBaIPqtX5Lq"

const zCFModInfo = z.object({
    data: z.object({
        name: z.string(),
        links: z.object({
            websiteUrl: z.url(),
        }),
        authors: z.object({
            name: z.string(),
        }).array().nonempty(),
    }),
})

function fetchCurseForge(path: string): Promise<Response> {
    const token: string = process.env.CF_API_KEY ?? DEFAULT_CURSEFORGE_API_KEY
    return fetch(`https://api.curseforge.com/v1/${path}`, {
        redirect: "follow",
        headers: {
            Accept: "application/json",
            "x-api-key": token,
        }
    })
}

export const GetModInfo = async (modID: number) => {
    const modData = await fetchCurseForge(`mods/${modID}`)

    if (modData.status !== 200) {
        if (modData.status == 403) {
            Juke.logger.error(`Failed to fetch mod info at ${modData.url}: Bad CF Token`)
        } else {
            Juke.logger.error(`Failed to fetch mod info at ${modData.url}: ${modData.status}`)
        }
        throw new Juke.ExitCode(1)
    }
    return zCFModInfo.parse(await modData.json()).data
}

const zCFModData = z.object({
    data: z.object({
        id: z.number().int().positive().pipe(z.coerce.bigint()),
        fileName: z.string().regex(/\.(?:jar|zip)$/),
        fileLength: z.number().int().positive(),
        downloadUrl: z.url().or(z.null()),
        /** SHA1 of the file, if given. */
        hashes: z
            .object({
                value: z.string(),
                algo: z.number().int(),
            })
            .array()
            .transform(hashes => hashes.find(hash => hash.algo === 1 /* SHA1 */)?.value), // We do not really care about any other hashes atm.
    }),
})
type CFModData = z.infer<typeof zCFModData>["data"]

export const DownloadCF = async (modInfo: Partial<ManifestFileEntry> = {}, dest: string, retrycount?: number): Promise<CFModData> => {
    if (retrycount === null || retrycount === undefined) {
        retrycount = 5
    }
    const { projectID: modID, fileID: modFileID } = modInfo
    if (!modID || !modFileID) {
        Juke.logger.error(`Bad DownloadCF modInfo args. modID: ${modID} | modFileID: ${modFileID}`)
        throw new Juke.ExitCode(1)
    }

    const modData = await fetchCurseForge(`mods/${modID}/files/${modFileID}`)

    if (modData.status !== 200) {
        if (modData.status == 403) {
            Juke.logger.error(`Failed to fetch download url at ${modData.url}: Bad CF Token`)
            throw new Juke.ExitCode(1) // explicitly dont retry if this is the error
        } else {
            Juke.logger.error(`Failed to fetch download url at ${modData.url}: ${modData.status}`)
        }
        if (retrycount <= 0) {
            Juke.logger.error("Exhausted retries, exiting download")
            throw new Juke.ExitCode(1)
        }
        retrycount--
        return await DownloadCF(modInfo, dest, retrycount)
    }
    const { data: modDataJson } = zCFModData.parse(await modData.json())

    const filePath = `${dest}${modDataJson.fileName}`
    // TODO hash chk
    // let's see if the file exists
    if (fs.existsSync(filePath) && fs.statSync(filePath).size === modDataJson.fileLength) {
        Juke.logger.info(`Skipped: ${modDataJson.fileName}`)
        return modDataJson
    }

    Juke.logger.info(`Downloading: ${modDataJson.fileName}`)

    try {
        await download_file(modDataJson, {}, filePath)
    } catch (e) {
        if (e instanceof Juke.ExitCode) throw e
        Juke.logger.warn(`Download failed ${modDataJson.fileName}`)
        if (retrycount <= 0) {
            Juke.logger.error("Exhausted retries, exiting download")
            throw new Juke.ExitCode(1)
        }
        retrycount--
        return await DownloadCF(modInfo, dest, retrycount)
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).size !== modDataJson.fileLength) {
        Juke.logger.warn(`Download failed ${modDataJson.fileName}`)
        if (retrycount <= 0) {
            Juke.logger.error("Exhausted retries, exiting download")
            throw new Juke.ExitCode(1)
        }
        retrycount--
        return await DownloadCF(modInfo, dest, retrycount)
    }
    return modDataJson
}

async function download_file({ hashes: sha1, downloadUrl, fileName }: CFModData, options: RequestInit = {}, file: string) {
    // When download url is missing from CurseForge, it means the author disabled third party launcher downloads.
    // Shamelessly copying Prism Launcher logic, we just try to find the download url with Modrinth.
    const url = downloadUrl ?? (sha1 && await FindModrinthFileUrl(sha1))
    if (!url) {
        Juke.logger.error(`Failed to download ${fileName}: that project prohibits third party downloads. Download it manually to ${resolve(file)}, you only have to do this once.`)
        throw new Juke.ExitCode(1)
    }
    const response = await fetch(url, options)
    if (response.status !== 200) {
        return Juke.logger.error(`Failed to download ${url}: Status ${response.status}`)
    }
    if (response.body === null) {
        return Juke.logger.error(`Failed to download ${url}: No response body`)
    }
    await fs.promises.writeFile(file, response.body)
}
