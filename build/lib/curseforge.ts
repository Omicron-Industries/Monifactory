import Juke from "juke-build"
import fs from "fs"
import { z } from "zod"
import type { ManifestFileEntry } from "./manifest.ts"

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

function fetchCurseForge(path: string, init?: RequestInit): Promise<Response> {
    const token = process.env.CF_API_KEY
    return fetch(`${token ? "https://api.curseforge.com/v1/" : "https://api.curse.tools/v1/cf/"}${path}`, {
        redirect: "follow",
        ...init,
        headers: {
            Accept: "application/json",
            ...(token && { "x-api-key": token }),
            ...init?.headers,
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
    }).transform(data => ({
        ...data,
        downloadUrl: data.downloadUrl ?? `https://edge.forgecdn.net/files/${data.id / 1000n}/${data.id % 1000n}/${encodeURIComponent(data.fileName)}`
    })),
})
type CFModData = z.infer<typeof zCFModData>

export const DownloadCF = async (modInfo: Partial<ManifestFileEntry> = {}, dest: string, retrycount?: number): Promise<CFModData["data"]> => {
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

    dest = `${dest}${modDataJson.fileName}`
    // TODO hash chk
    // let's see if the file exists
    if (fs.existsSync(dest) && fs.statSync(dest).size === modDataJson.fileLength) {
        Juke.logger.info(`Skipped: ${modDataJson.fileName}`)
        return modDataJson
    }

    Juke.logger.info(`Downloading: ${modDataJson.fileName}`)

    try {
        await download_file(modDataJson.downloadUrl, {}, dest)
    } catch {
        Juke.logger.warn(`Download failed ${modDataJson.fileName}`)
        if (retrycount <= 0) {
            Juke.logger.error("Exhausted retries, exiting download")
            throw new Juke.ExitCode(1)
        }
        retrycount--
        return await DownloadCF(modInfo, dest, retrycount)
    }

    if (!fs.existsSync(dest) || fs.statSync(dest).size !== modDataJson.fileLength) {
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

async function download_file(url: string, options: RequestInit = {}, file: string) {
    const response = await fetch(url, options)
    if (response.status !== 200) {
        return Juke.logger.error(`Failed to download ${url}: Status ${response.status}`)
    }
    if (response.body === null) {
        return Juke.logger.error(`Failed to download ${url}: No response body`)
    }
    await fs.promises.writeFile(file, response.body)
}
