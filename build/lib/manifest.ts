import z from "zod"
import { readDatafileJSON } from "./json_datafile.ts"

const zCFID = z.number().int().positive()

const zManifestFile = z.object({
    fileID: zCFID,
    required: z.boolean(),
    projectID: zCFID,
})
export type ManifestFileEntry = z.infer<typeof zManifestFile>

const zManifest = z.object({
    minecraft: z.object({
        version: z.string().nonempty(),
        modLoaders: z.tuple([
            z.strictObject({
                id: z.string().startsWith("forge-").transform(s => s.slice("forge-".length)),
                primary: z.literal(true),
            })
        ]).transform(([forge]) => forge),
    }),
    version: z.string().nonempty(),
    files: zManifestFile.array()
})
export type Manifest = z.infer<typeof zManifest>

export const readManifest = (): Manifest => zManifest.parse(readDatafileJSON("manifest.json"))
