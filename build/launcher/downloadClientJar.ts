import { Target } from "juke-build"
import { DownloadVersionDescription, readVersionDescription } from "./versionDescription.ts"
import { downloadWithChecksum } from "./downloadWithChecksum.ts"
import { mkdir, writeFile } from "node:fs/promises"
import { CACHE_PATH_CLIENT_JAR } from "./config.ts"
import { dirname } from "node:path"

export const DownloadClientJar = new Target({
    name: "download-client-jar",
    dependsOn: [DownloadVersionDescription],
    inputs: ["manifest.json"],
    outputs: () => [CACHE_PATH_CLIENT_JAR()],
    async executes() {
        const { downloads: { client } } = await readVersionDescription()

        await mkdir(dirname(CACHE_PATH_CLIENT_JAR()), { recursive: true })
        await writeFile(CACHE_PATH_CLIENT_JAR(), downloadWithChecksum(client))
    }
})
