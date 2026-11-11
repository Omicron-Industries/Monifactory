import type { Readable } from "node:stream"
import type { MinecraftFile } from "./versionDescription.ts"
import { createHash } from "node:crypto"

/**
 * Downloads a file from the given URL and checks its integrity using the provided SHA-1 checksum and file size.
 * Most notably, does not load the entire file into memory, it just passes the data through.
 */
export async function *downloadWithChecksum({ url, sha1, size }: MinecraftFile) {
    const res = await fetch(url)
    if (!res.ok || !res.body) {
        throw new Error(`Failed to download file "${url}": ${res.status} ${res.statusText}`)
    }

    // These two compute the running total, without remembering bytes!!
    const hasher = createHash("sha1")
    let downloaded = 0

    for await (const chunk of res.body satisfies ReadableStream as ReadableStream<Uint8Array>) {
        hasher.update(chunk)
        downloaded += chunk.length
        yield chunk
    }

    if (downloaded !== size) {
        throw new Error(`Downloaded file size mismatch for "${url}": expected ${size} bytes, got ${downloaded} bytes`)
    }
    const finalHash = hasher.digest("hex")
    if (finalHash !== sha1) {
        throw new Error(`Downloaded file checksum mismatch for "${url}": expected ${sha1}, got ${finalHash}`)
    }
}

export async function matchesChecksum(stream: Readable | AsyncIterable<Buffer>, { sha1, size }: Pick<MinecraftFile, "sha1" | "size">) {
    const hasher = createHash("sha1")
    let actualSize = 0

    for await (const chunk of stream as AsyncIterable<Buffer>) {
        actualSize += chunk.length
        if (actualSize > size) return false // Already know at least the size is wrong.
        hasher.update(chunk)
    }

    return actualSize === size && hasher.digest("hex") === sha1
}
