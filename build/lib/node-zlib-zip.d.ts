// All credit to https://github.com/DefinitelyTyped/DefinitelyTyped/pull/75745
// PR copy paste. Can't wait for this to get merged!
/* eslint-disable */
import type * as stream from "node:stream";

declare module "node:zlib" {
    type ZipInputType = ArrayBuffer | NodeJS.ArrayBufferView;
    interface ZipEntryContentOptions {
        /**
         * Verify the entry's CRC-32 checksum.
         * @default true
         * @since v26.8.0
         */
        verify?: boolean | undefined;
        /**
         * Reject content declaring more than this many uncompressed bytes, before allocating anything.
         * @default zlib.getMaxZipContentSize()
         * @since v26.8.0
         */
        maxSize?: number | undefined;
    }
    interface ZipEntryContentIterOptions {
        /**
         * Verify the entry's CRC-32 checksum.
         * @default true
         * @since v26.8.0
         */
        verify?: boolean | undefined;
        /**
         * Reject content declaring more than this many uncompressed bytes, before decompressing anything.
         * @default no limit
         * @since v26.8.0
         */
        maxSize?: number | undefined;
    }
    interface ZipEntryCreateOptionsBase {
        /**
         * An entry comment.
         * @since v26.8.0
         */
        comment?: string | undefined;
        /**
         * Unix permission bits.
         * @default 0o644; except 0o755 for directories, 0o777 for symlinks
         * @since v26.8.0
         */
        mode?: number | undefined;
        /**
         * The entry's modification time.
         * @default the current time
         * @since v26.8.0
         */
        modified?: Date | undefined;
    }
    interface ZipEntryCreateOptions extends ZipEntryCreateOptionsBase {
        /**
         * Compression method.
         * @default "deflate"; except "store" for directories and empty content
         * @since v26.8.0
         */
        method?: "deflate" | "store" | "zstd" | undefined;
    }
    interface ZipEntryCreateStreamOptions extends ZipEntryCreateOptionsBase {
        /**
         * Compression method.
         * @default "deflate"
         * @since v26.8.0
         */
        method?: "deflate" | "store" | "zstd" | undefined;
    }
    interface ZipEntryCreateSymlinkOptions extends ZipEntryCreateOptionsBase {}
    /**
     * An in-memory, zero-copy view over the entries of a ZIP archive already held in a `Buffer`, `TypedArray`,
     * `DataView`, or `ArrayBuffer`. Its set of entries can be edited - entries added or removed - but, unlike
     * `ZipFile`, those edits are not written into the source buffer: a newly added entry is held as a separate
     * in-memory `ZipEntry` (the passed buffer is a fixed-size view with no room to append to), and removal just drops
     * the entry from `ZipBuffer`'s index. The original bytes are never modified. `zipBuffer.toBuffer()` serializes the
     * current set of entries into a fresh archive.
     *
     * `ZipBuffer` does not copy the archive you hand it. It keeps a view onto that memory and reads each entry's
     * content lazily and directly from it, which is what makes construction cheap regardless of archive size. The
     * trade-off is that you must not modify or reuse that memory - including the `ArrayBuffer` backing a
     * `TypedArray`/`DataView` - while the `ZipBuffer`, or any `ZipEntry` obtained from it, is still in use: a later
     * read would observe the change and may fail or return corrupt data. Pass a copy (for example
     * `Buffer.from(source)`) if the source might be mutated or reused.
     *
     * `add()` and `toBuffer()` each have a `*Sync` counterpart (`addSync()`, `toBufferSync()`) that performs the same
     * compression work synchronously. As with the synchronous `node:fs` APIs, these block the Node.js event loop and
     * further JavaScript execution until the operation completes; use them only where synchronous execution is
     * appropriate (for example, short-lived scripts or startup code), not in code that must stay responsive.
     * @since v26.8.0
     * @experimental
     */
    class ZipBuffer {
        /**
         * Parses the archive's central directory. Throws an `ERR_ZIP_INVALID_ARCHIVE` or `ERR_ZIP_UNSUPPORTED_FEATURE`
         * error if `buffer` is not a well-formed, supported archive.
         *
         * `buffer` is not copied: the `ZipBuffer` retains a zero-copy view of it (for a `TypedArray`, `DataView`, or
         * `ArrayBuffer`, of the underlying `ArrayBuffer`) and reads entry content directly from it on demand. Do not
         * mutate or reuse that memory while the `ZipBuffer` or any entry read from it is still live; pass a copy if it
         * might change.
         * @param buffer A complete ZIP archive.
         * @since v26.8.0
         */
        constructor(buffer: ZipInputType);
        /**
         * @since v26.8.0
         */
        [Symbol.iterator](): NodeJS.Iterator<[name: string, entry: ZipEntry]>;
        /**
         * Equivalent to `zipBuffer.addEntry(await zlib.ZipEntry.create(filename, data, options))`.
         * @param filename The entry's name within the archive. A trailing `/` marks a directory entry.
         * @param data The entry's complete, uncompressed content.
         * @param options See `zlib.ZipEntry.create()`.
         * @returns `Promise` fulfilled with the created `ZipEntry`.
         * @since v26.8.0
         */
        add(filename: string, data: ZipInputType, options?: ZipEntryCreateOptions): Promise<ZipEntry>;
        /**
         * The synchronous version of `zipBuffer.add()`.
         * Equivalent to `zipBuffer.addEntry(zlib.ZipEntry.createSync(filename, data, options))`.
         * @param filename The entry's name within the archive. A trailing `/` marks a directory entry.
         * @param data The entry's complete, uncompressed content.
         * @param options See `zlib.ZipEntry.createSync()`.
         * @returns The created entry.
         * @since v26.8.0
         */
        addSync(filename: string, data: ZipInputType, options?: ZipEntryCreateOptions): ZipEntry;
        /**
         * Adds an already-built entry, keyed by its own `zipEntry.name`. Replaces any existing entry of that name.
         * @returns `entry`
         * @since v26.8.0
         */
        addEntry(entry: ZipEntry): ZipEntry;
        /**
         * Removes every entry.
         * @since v26.8.0
         */
        clear(): void;
        /**
         * @returns `true` if an entry named `name` existed and was removed.
         * @since v26.8.0
         */
        delete(name: string): boolean;
        /**
         * @returns `Iterator` of `[name, entry]` pairs, where `entry` is a `ZipEntry`.
         * @since v26.8.0
         */
        entries(): NodeJS.Iterator<[name: string, entry: ZipEntry]>;
        /**
         * Calls `callback` once for each entry, in the order the archive lists them.
         * @since v26.8.0
         */
        forEach(callback: (entry: ZipEntry, name: string, zipBuffer: this) => void, thisArg?: any): void;
        /**
         * Throws `ERR_ZIP_ENTRY_NOT_FOUND` if the archive has no entry named `name`.
         * @since v26.8.0
         */
        get(name: string): ZipEntry;
        /**
         * @since v26.8.0
         */
        has(name: string): boolean;
        /**
         * @returns `Iterator` of entry names.
         * @since v26.8.0
         */
        keys(): NodeJS.Iterator<string>;
        /**
         * Serializes the current set of entries - in the order they were added or read - into a fresh archive,
         * switching to Zip64 structures automatically as needed (see `zlib.createZipArchive()`).
         * @param options An archive comment, as a shorthand for `{ comment: options }`. The comment defaults to
         * `zipBuffer.comment`.
         * @returns `Promise` fulfilled with a `Buffer` containing the serialized archive.
         * @since v26.8.0
         */
        toBuffer(options?: string | CreateZipArchiveOptions): Promise<NonSharedBuffer>;
        /**
         * The synchronous version of `zipBuffer.toBuffer()` (see `zlib.createZipArchiveSync()`).
         * @param options See `zipBuffer.toBuffer()`.
         * @returns The serialized archive.
         * @since v26.8.0
         */
        toBufferSync(options?: string | CreateZipArchiveOptions): NonSharedBuffer;
        /**
         * @returns `Iterator` of `ZipEntry`.
         * @since v26.8.0
         */
        values(): NodeJS.Iterator<ZipEntry>;
        /**
         * The archive-level comment, preserved byte-for-byte across `zipBuffer.toBuffer()` calls unless overridden.
         * The bytes are decoded as UTF-8 when they are valid UTF-8 and as CP437 otherwise (the field carries no
         * encoding flag of its own).
         * @since v26.8.0
         */
        readonly comment: string;
        /**
         * The number of entries in the archive.
         * @since v26.8.0
         */
        readonly size: number;
        /**
         * Always `true`.
         * @since v26.8.0
         */
        readonly writable: true;
    }
    /**
     * A single file or directory inside a ZIP archive. Instances are produced by `ZipBuffer` and `ZipFile`, or created
     * directly for writing with `ZipEntry.create()`/`ZipEntry.createStream()`.
     *
     * `create()` and `content()` each have a `*Sync` counterpart (the streaming `contentIterator()` does not). As with
     * the synchronous `node:fs` APIs, these block the Node.js event loop and further JavaScript execution until the
     * operation (including any deflate/inflate pass) completes; use them only where synchronous execution is
     * appropriate (for example, short-lived scripts or startup code), not in code that must stay responsive.
     * @since v26.8.0
     * @experimental
     */
    class ZipEntry {
        /**
         * Compresses `data` (unless `method` is `'store'`, or compression would not reduce its size) and computes its
         * CRC-32.
         *
         * When the entry ends up stored uncompressed (because `method` is `'store'`, or because compression would not
         * reduce the size), the entry retains a zero-copy view of `data` rather than a copy, and its CRC-32 has already
         * been recorded. Do not mutate `data` after creating the entry; pass a copy if it might change.
         *
         * The MS-DOS date/time fields ZIP uses for `modified` have 2-second resolution and no time zone. When
         * `modified` does not fall on a whole 2-second boundary, an Info-ZIP extended-timestamp extra field is written
         * as well, recording the whole (UTC) second so the time round-trips more precisely (see `zipEntry.modified`).
         * This applies to every entry-creation path.
         * @param filename The entry's name within the archive. A trailing `/` marks a directory entry.
         * @param data The entry's complete, uncompressed content. Must be empty when `filename` names a directory.
         * @since v26.8.0
         */
        static create(filename: string, data: ZipInputType, options?: ZipEntryCreateOptions): Promise<ZipEntry>;
        /**
         * Creates an entry whose content is compressed on the fly as it is serialized by `zlib.createZipArchive()`,
         * without buffering `source` in memory. Its `size`, `compressedSize`, and `crc32` only become available once
         * serialization has finished. There is no synchronous counterpart: streaming entries only make sense with an
         * asynchronous, incrementally-produced `source`.
         *
         * `source` is drained exactly once, during serialization. Until that happens the entry has no readable content,
         * so `zipEntry.content()`, `zipEntry.contentSync()`, and `zipEntry.contentIterator()` throw
         * `ERR_INVALID_STATE`. If the entry is serialized by adding it to a writable `ZipFile` with
         * `zipFile.addEntry()` (or `addEntrySync()`), it is then promoted in place to a file-backed entry pointing at
         * the copy just written, so it becomes readable (and can be serialized again) for as long as that `ZipFile`
         * stays open. Serializing it any other way (for example directly through `zlib.createZipArchive()`) leaves it
         * spent and unreadable.
         *
         * Because `source` may hold an operating-system resource (a file read stream, say), a streaming entry is
         * disposable: its `Symbol.dispose` and `Symbol.asyncDispose` methods destroy `source` if it has not been
         * consumed. An entry passed to an archive is disposed by that archive (see `zlib.createZipArchive()`); dispose
         * an entry directly only when it was built but never handed to one. Disposal is a no-op for non-streaming
         * entries - in particular a file-backed entry never closes the `ZipFile` descriptor it borrows.
         * @param filename The entry's name within the archive. Must not end in `/`.
         * @param source Yields the entry's uncompressed content as `Uint8Array` chunks.
         * @since v26.8.0
         */
        static createStream(
            filename: string,
            source: AsyncIterable<Uint8Array>,
            options?: ZipEntryCreateStreamOptions,
        ): ZipEntry;
        /**
         * Creates a symbolic-link entry: a stored entry whose content is `target` and whose Unix mode type bits mark
         * it as a symlink, so `zipEntry.isSymlink` is `true` when it is read back. Extraction tools that honor symlink
         * entries recreate the link; treat `target` as untrusted (see `zipEntry.name` on path safety).
         * @param filename The entry's name within the archive.
         * @param target The symbolic link's target path.
         * @since v26.8.0
         */
        static createSymlink(filename: string, target: string, options?: ZipEntryCreateSymlinkOptions): ZipEntry;
        /**
         * The synchronous version of `zlib.ZipEntry.create()`.
         * @param filename The entry's name within the archive. A trailing `/` marks a directory entry.
         * @param data The entry's complete, uncompressed content. Must be empty when `filename` names a directory.
         * @param options See `zlib.ZipEntry.create()`.
         * @since v26.8.0
         */
        static createSync(filename: string, data: ZipInputType, options?: ZipEntryCreateOptions): ZipEntry;
        /**
         * Parses every entry out of `buffer` directly, without indexing it into a `ZipBuffer`. Like `ZipBuffer`, the
         * yielded entries hold zero-copy views of `buffer` rather than copies of their content, so the same rule
         * applies: do not mutate or reuse `buffer` while any of them is still in use.
         * @param buffer A complete ZIP archive.
         * @returns `Iterator` of `ZipEntry`.
         * @since v26.8.0
         */
        static read(buffer: ZipInputType): NodeJS.Iterator<ZipEntry>;
        private constructor();
        /**
         * @since v26.8.0
         */
        [Symbol.asyncDispose](): Promise<void>;
        /**
         * @since v26.8.0
         */
        [Symbol.dispose](): void;
        /**
         * Throws an `ERR_ZIP_ENTRY_TOO_LARGE` error if the entry's declared size exceeds `maxSize`, an
         * `ERR_ZIP_ENTRY_CORRUPT` error if the content fails CRC-32 verification or does not match its declared size,
         * and an `ERR_INVALID_STATE` error for a streaming entry (`zlib.ZipEntry.createStream()`) whose content is not
         * yet available (see that method for when a streaming entry becomes readable).
         * @returns `Promise` fulfilled with a `Buffer` containing the entry's decompressed content. The buffer is a
         * fresh copy that shares no memory with the archive or with data the entry was created from.
         * @since v26.8.0
         */
        content(options?: ZipEntryContentOptions): Promise<NonSharedBuffer>;
        /**
         * The synchronous version of `zipEntry.content()`.
         * @param options See `zipEntry.content()`.
         * @returns The entry's decompressed content.
         * @since v26.8.0
         */
        contentSync(options?: ZipEntryContentOptions): NonSharedBuffer;
        /**
         * Unlike `zipEntry.content()`, this does not buffer the whole member in memory. For a file-backed entry (one
         * returned by `zipFile.get()`) the compressed bytes are read from disk as the iterator is consumed and nothing
         * is retained; the entry is valid only while its `ZipFile` is open.
         *
         * Because streaming is the bounded-memory path for arbitrarily large members, it is not capped by
         * `zlib.getMaxZipContentSize()` the way `zipEntry.content()` is - that default guards a single large
         * allocation, which streaming never makes. Output is still bounded per chunk to the declared uncompressed size;
         * pass `maxSize` to impose an explicit ceiling.
         *
         * For an in-memory entry stored without compression, the yielded chunks are zero-copy views of the entry's
         * retained content (see `zipEntry.rawContent`); do not mutate them.
         *
         * The yielded chunks are provisional until the iterator completes. CRC-32 verification (and the final
         * declared-size check) can only run once every byte has been read, so a corrupt or truncated entry is reported
         * by the iterator throwing after the last chunk, not before the first. Each chunk is still bounded so the total
         * never exceeds the declared size or `maxSize`, but a consumer that must not act on unverified bytes should
         * buffer them (or use `zipEntry.content()`, which verifies before returning anything) rather than processing
         * chunks as they arrive.
         * @returns `AsyncIterator` of `Buffer` chunks of the entry's decompressed content.
         * @since v26.8.0
         */
        contentIterator(options?: ZipEntryContentIterOptions): NodeJS.AsyncIterator<Buffer>;
        /**
         * @since v26.8.0
         */
        readonly comment: string;
        /**
         * `true` if the entry's content is stored in compressed form (any compression method, currently deflate or
         * Zstandard); `false` if it is stored uncompressed.
         * @since v26.8.0
         */
        readonly compressed: boolean;
        /**
         * @since v26.8.0
         */
        readonly compressedSize: number;
        /**
         * @since v26.8.0
         */
        readonly crc32: number;
        /**
         * The entry's raw general-purpose bit flag.
         * @since v26.8.0
         */
        readonly flags: number;
        /**
         * `true` if the entry is a directory (its name ends with `/`).
         * @since v26.8.0
         */
        readonly isDirectory: boolean;
        /**
         * `true` if the entry is a regular file - that is, neither a directory nor a symbolic link.
         * @since v26.8.0
         */
        readonly isFile: boolean;
        /**
         * `true` if the entry is a symbolic link (its Unix mode type bits are `S_IFLNK`); its content is the link
         * target. Always `false` for archives not written on a Unix-like system. When extracting, treat a symlink's
         * target as untrusted - see `zipEntry.name` on path safety.
         * @since v26.8.0
         */
        readonly isSymlink: boolean;
        /**
         * The entry's raw compression method: `0` for stored, `8` for deflate, `93` for Zstandard.
         * @since v26.8.0
         */
        readonly method: number;
        /**
         * The entry's Unix mode permission bits, including the setuid, setgid, and sticky bits (the low 12 bits,
         * `0o7777`), or `0` if the archive was not written on a Unix-like system. The file-type bits are not included
         * here; use `zipEntry.isDirectory` / `zipEntry.isSymlink` for the type.
         * @since v26.8.0
         */
        readonly mode: number;
        /**
         * The entry's last-modification time. When the archive carries a higher-fidelity timestamp in an extra field -
         * an NTFS (`0x000a`), Info-ZIP extended (`0x5455`), or Info-ZIP Unix (`0x5855`) field, as most modern tools
         * write - that absolute (UTC) time is used; otherwise the coarse, local-time MS-DOS date/time field (2-second
         * resolution) is used.
         *
         * Some tools store their high-fidelity timestamp only in the local file header, so on a file-backed entry (one
         * returned by `zipFile.get()`) the first read of this property may perform a small synchronous positioned disk
         * read to resolve that header. If that read fails, the value silently falls back to the central-directory
         * data.
         * @since v26.8.0
         */
        readonly modified: Date;
        /**
         * The entry's name, decoded from the central directory, which is treated as authoritative - a local file header
         * that disagrees is ignored, so a mismatched-header ("ZIP-confusion") archive cannot make `name` disagree with
         * what is read. The bytes are decoded from a valid Info-ZIP Unicode Path extra field (`0x7075`) when one is
         * present; otherwise as UTF-8 when the language-encoding flag (general-purpose bit 11) is set or the bytes are
         * valid UTF-8 (plenty of tools wrote UTF-8 names without ever setting the flag); and as CP437 - the historical
         * default - only when they are not. See `zipEntry.nameBuffer` for the raw bytes.
         *
         * The name is returned verbatim: it is never normalized, and a name containing `..`, a leading `/`, a drive
         * letter, or backslashes is neither rewritten nor rejected. A `ZipFile`/`ZipBuffer` never writes to disk, so
         * guarding against path traversal ("Zip Slip") when extracting is the caller's responsibility.
         * @since v26.8.0
         */
        readonly name: string;
        /**
         * The entry's raw name bytes, before any character decoding. Useful when the archive's names are in an encoding
         * other than UTF-8 or CP437 and the caller wants to decode them itself.
         * @since v26.8.0
         */
        readonly nameBuffer: Buffer;
        /**
         * The entry's raw (still compressed, if applicable) content when it is held in memory, or `null` when there is
         * no in-memory buffer to expose - for an entry created with `zlib.ZipEntry.createStream()`, or a file-backed
         * entry returned by `zipFile.get()`, whose bytes are read from disk on demand rather than retained. Use
         * `zipEntry.content()` or `zipEntry.contentIterator()` to read a file-backed entry.
         * @since v26.8.0
         */
        readonly rawContent: Buffer | null;
        /**
         * The entry's uncompressed size, in bytes.
         * @since v26.8.0
         */
        readonly size: number;
    }
    interface ZipFileOpenOptions {
        /**
         * Open the underlying file for both reading and writing (`'r+'`), enabling `zipFile.addEntry()`,
         * `zipFile.add()`, and `zipFile.delete()`.
         * @default false
         * @since v26.8.0
         */
        writable?: boolean | undefined;
    }
    /**
     * A random-access view over the entries of a ZIP archive on disk. Only the archive's tail and central directory are
     * read up front; member content is read from disk lazily, on demand. Writable when opened with
     * `{ writable: true }`: `zipFile.addEntry()`/`zipFile.add()` append the new member's data where the central
     * directory used to be, then rewrite the central directory immediately after it; `zipFile.delete()` just rewrites
     * the central directory. Both mean the file is altered as soon as the method's returned `Promise` fulfills. Deleted
     * or replaced members are left behind as dead space; `zipFile.compact()` produces a stream with none.
     *
     * These in-place edits are not crash-atomic. Rewriting the central directory happens in place, so a write that
     * fails partway - the disk fills, the device disconnects, the process is killed - can leave the archive on disk
     * with a partial or missing central directory, i.e. unreadable, even though the member data before it is intact.
     * The rejected call surfaces the underlying error and the `ZipFile` object is left usable (its in-memory view is
     * not discarded, so a caller can attempt recovery - for example re-writing the entries elsewhere with
     * `zipFile.compact()`), but that in-memory view may no longer match the bytes on disk. Write to a copy, or
     * `compact()` into a fresh file, when durability across a failure matters.
     *
     * As with the synchronous `node:fs` APIs, every `*Sync` method blocks the Node.js event loop and further JavaScript
     * execution until the operation completes; use them only where synchronous execution is appropriate (for example,
     * short-lived scripts or startup code), not in code that must stay responsive. A synchronous method throws
     * `ERR_INVALID_STATE` if called while an asynchronous `add()`, `addEntry()`, `delete()`, or `close()` on the same
     * `ZipFile` has not settled yet, since letting the two interleave could corrupt the archive.
     * @since v26.8.0
     * @experimental
     */
    class ZipFile {
        /**
         * Throws an `ERR_ZIP_ARCHIVE_TOO_LARGE` error if the archive's central directory is too large to buffer in
         * memory.
         * @since v26.8.0
         */
        static open(filename: string, options?: ZipFileOpenOptions): Promise<ZipFile>;
        /**
         * The synchronous version of `zlib.ZipFile.open()`.
         * @since v26.8.0
         */
        static openSync(filename: string, options?: ZipFileOpenOptions): ZipFile;
        private constructor();
        /**
         * Equivalent to `zipFile.addEntry(await zlib.ZipEntry.create(filename, data, options))`.
         * @param filename The entry's name within the archive. A trailing `/` marks a directory entry.
         * @param data The entry's complete, uncompressed content.
         * @param options See `zlib.ZipEntry.create()`.
         * @returns `Promise` fulfilled with the created `ZipEntry`.
         * @since v26.8.0
         */
        add(filename: string, data: ZipInputType, options?: ZipEntryCreateOptions): Promise<ZipEntry>;
        /**
         * Writes `entry` where the central directory currently starts, then rewrites the central directory to include
         * it, replacing any existing entry of the same name. Throws `ERR_ZIP_NOT_WRITABLE` if the `ZipFile` was not
         * opened with `{ writable: true }`.
         *
         * The returned (same) `entry` is left readable: a streaming entry created with `zlib.ZipEntry.createStream()`,
         * which would otherwise be spent once serialized, is promoted in place to a file-backed entry pointing at the
         * copy just written (valid while this `ZipFile` is open). In-memory entries keep their own buffer unchanged.
         * @returns `Promise` fulfilled with `entry`.
         * @since v26.8.0
         */
        addEntry(entry: ZipEntry): Promise<ZipEntry>;
        /**
         * The synchronous version of `zipFile.addEntry()`. `entry` must not be a pending streaming entry (one created
         * with `zlib.ZipEntry.createStream()`) - there is no synchronous way to drain its asynchronous source.
         * @returns `entry`
         * @since v26.8.0
         */
        addEntrySync(entry: ZipEntry): ZipEntry;
        /**
         * The synchronous version of `zipFile.add()`. Equivalent to
         * `zipFile.addEntrySync(zlib.ZipEntry.createSync(filename, data, options))`.
         * @param filename The entry's name within the archive. A trailing `/` marks a directory entry.
         * @param data The entry's complete, uncompressed content.
         * @param options See `zlib.ZipEntry.createSync()`.
         * @returns The created entry.
         * @since v26.8.0
         */
        addSync(filename: string, data: ZipInputType, options?: ZipEntryCreateOptions): ZipEntry;
        /**
         * Closes the underlying file handle.
         * @since v26.8.0
         */
        close(): Promise<void>;
        /**
         * The synchronous version of `zipFile.close()`.
         * @since v26.8.0
         */
        closeSync(): void;
        /**
         * Does not modify the open file; pipe the result into a new one.
         * @param comment An archive comment. @default zipFile.comment
         * @returns A stream of the currently live entries, serialized as a fresh archive with no dead space left by
         * prior `zipFile.addEntry()`/`zipFile.delete()` calls.
         * @since v26.8.0
         */
        compact(comment?: string): stream.Readable;
        /**
         * The synchronous version of `zipFile.compact()`. Does not modify the open file.
         * @param comment An archive comment. @default zipFile.comment
         * @returns The currently live entries, serialized as a fresh archive with no dead space left by prior
         * `zipFile.addEntry()`/`zipFile.delete()` calls.
         * @since v26.8.0
         */
        compactSync(comment?: string): NonSharedBuffer;
        /**
         * Rewrites the central directory without writing any new content - the archive does not grow. Throws
         * `ERR_ZIP_NOT_WRITABLE` if the `ZipFile` was not opened with `{ writable: true }`.
         * @returns `Promise` fulfilled with `true` if an entry named `name` existed and was removed, `false`
         * otherwise.
         * @since v26.8.0
         */
        delete(name: string): Promise<boolean>;
        /**
         * The synchronous version of `zipFile.delete()`.
         * @returns `true` if an entry named `name` existed and was removed, `false` otherwise.
         * @since v26.8.0
         */
        deleteSync(name: string): boolean;
        /**
         * @returns `Iterator` of `[name, entry]` pairs, where `entry` is a `Promise` fulfilled with a `ZipEntry`.
         * @since v26.8.0
         */
        entries(): NodeJS.Iterator<[name: string, entry: Promise<ZipEntry>]>;
        /**
         * The synchronous version of `zipFile.entries()`.
         * @returns `Iterator` of `[name, entry]` pairs, where `entry` is a resolved `ZipEntry` (not a `Promise`).
         * @since v26.8.0
         */
        entriesSync(): NodeJS.Iterator<[name: string, entry: ZipEntry]>;
        /**
         * @since v26.8.0
         */
        forEach(callback: (entry: Promise<ZipEntry>, name: string, zipFile: this) => void, thisArg?: any): void;
        /**
         * The synchronous version of `zipFile.forEach()`: `callback` is invoked with a resolved `ZipEntry` instead of a
         * `Promise`.
         * @since v26.8.0
         */
        forEachSync(callback: (entry: ZipEntry, name: string, zipFile: this) => void, thisArg?: any): void;
        /**
         * Returns a lazy, file-backed `ZipEntry` for `name`. Nothing is read from disk here and no content is buffered:
         * the returned entry reads (and, for `zipEntry.content()`, decompresses) its member straight from the file on
         * each access, and the `ZipFile` retains no member content. The entry is valid only while this `ZipFile` is
         * open. Reading its content later may throw `ERR_ZIP_ENTRY_TOO_LARGE` if the member is too large to hold in a
         * single buffer; use `zipEntry.contentIterator()` (or `zipFile.stream()`) instead. Throws
         * `ERR_ZIP_ENTRY_NOT_FOUND` if the archive has no entry named `name`.
         * @since v26.8.0
         */
        get(name: string): Promise<ZipEntry>;
        /**
         * The synchronous version of `zipFile.get()`. Like `get()`, it reads nothing up front and only builds the lazy
         * handle, so it does not itself block on I/O - but reads performed later through the returned entry (such as
         * `zipEntry.contentSync()`) do; see the `ZipFile` class documentation note on synchronous methods.
         * @since v26.8.0
         */
        getSync(name: string): ZipEntry;
        /**
         * @since v26.8.0
         */
        has(name: string): boolean;
        /**
         * @returns `Iterator` of entry names.
         * @since v26.8.0
         */
        keys(): NodeJS.Iterator<string>;
        /**
         * Convenience wrapper that resolves to a `Readable` over `zipEntry.contentIterator()` of `zipFile.get(name)`;
         * the compressed bytes are read from disk as the stream is consumed. The returned promise rejects with
         * `ERR_ZIP_ENTRY_NOT_FOUND` if the archive has no entry named `name`.
         * @returns `Promise` fulfilled with a `stream.Readable` of the member's decompressed content, without buffering
         * the whole member in memory.
         * @since v26.8.0
         */
        stream(name: string, options?: ZipEntryContentIterOptions): Promise<stream.Readable>;
        /**
         * @returns `Iterator` of `Promise` objects, each fulfilled with a `ZipEntry`.
         * @since v26.8.0
         */
        values(): NodeJS.Iterator<Promise<ZipEntry>>;
        /**
         * The synchronous version of `zipFile.values()`.
         * @returns `Iterator` of resolved `ZipEntry` values (not `Promise`s).
         * @since v26.8.0
         */
        valuesSync(): NodeJS.Iterator<ZipEntry>;
        /**
         * The archive-level comment, preserved byte-for-byte across `zipFile.addEntry()`/`zipFile.delete()` calls. The
         * bytes are decoded as UTF-8 when they are valid UTF-8 and as CP437 otherwise (the field carries no encoding
         * flag of its own).
         * @since v26.8.0
         */
        readonly comment: string;
        /**
         * The number of entries in the archive.
         * @since v26.8.0
         */
        readonly size: number;
        /**
         * Whether this `ZipFile` was opened with `{ writable: true }`.
         * @since v26.8.0
         */
        readonly writable: boolean;
    }
    interface CreateZipArchiveOptions {
        /**
         * An archive comment.
         * @since v26.8.0
         */
        comment?: string | undefined;
        /**
         * Shifts every local/central header offset the archive records by this many bytes.
         * @default 0
         * @since v26.8.0
         */
        baseOffset?: number | undefined;
    }
    /**
     * Serializes `entries` into a ZIP archive, switching to Zip64 structures automatically once the entry count, or any
     * offset or size, exceeds what the classic 32-/16-bit ZIP fields can hold. The returned `Readable` is also an
     * `AsyncIterable` of the same `Buffer` chunks it streams.
     *
     * Entries are written in iteration order and nothing deduplicates names: an iterable that yields two entries with
     * the same name produces an archive containing both, and most extraction tools keep the one that appears later.
     * `ZipBuffer` and `ZipFile` `add()` methods replace entries by name instead.
     *
     * The entries are owned by the returned stream: each is consumed as the archive is produced and must not be reused
     * afterwards. This matters for streaming entries (from `zlib.ZipEntry.createStream()`), which hold an underlying
     * source such as a file read stream. If the returned stream is destroyed before it is fully consumed - for example,
     * the destination of a `pipeline()` fails - it disposes the entry it was serializing and every entry still queued
     * behind it, destroying their sources so no descriptor leaks. Consume the stream to the end, or destroy it
     * (directly, through a failed `pipeline()`, or with `await using`), to guarantee this cleanup; a stream that is
     * neither consumed nor destroyed cannot release anything. A `ZipEntry` that is never handed to an archive can be
     * released directly with `Symbol.dispose` / `Symbol.asyncDispose`.
     *
     * Throws an `ERR_ZIP_ARCHIVE_TOO_LARGE` error if the archive comment exceeds 65,535 bytes when encoded as UTF-8.
     *
     * Passing `options.baseOffset` produces an archive that is valid immediately when placed after other content in the
     * same file, without relying on a reader's self-extracting-archive detection to compensate for the shift.
     * @param entries `Iterable` | `AsyncIterable` of `ZipEntry`.
     * @param options An archive comment, as a shorthand for `{ comment: options }`.
     * @returns A byte stream of the serialized archive.
     * @since v26.8.0
     * @experimental
     */
    function createZipArchive(
        entries: Iterable<ZipEntry> | AsyncIterable<ZipEntry>,
        options?: string | CreateZipArchiveOptions,
    ): stream.Readable;
    /**
     * The synchronous version of `zlib.createZipArchive()`. Blocks the Node.js event loop and further JavaScript
     * execution until the whole archive (including any deflate passes) has been produced; use only where synchronous
     * execution is appropriate (for example, short-lived scripts or startup code), not in code that must stay
     * responsive. `entries` must be a plain (synchronous) `Iterable` - a streaming entry created with
     * `zlib.ZipEntry.createStream()` throws when its turn to serialize comes up, since draining its asynchronous source
     * has no synchronous equivalent.
     *
     * As with `zlib.createZipArchive()`, the entries are owned by the returned iterator and must not be reused. If
     * iteration stops early - including the throw on a streaming entry - the entry that stopped it and every entry
     * still queued behind it are disposed, releasing any sources they hold.
     * @param entries `Iterable` of `ZipEntry`.
     * @param options See `zlib.createZipArchive()`.
     * @returns `Iterator` of `Buffer` chunks making up the serialized archive.
     * @since v26.8.0
     * @experimental
     */
    function createZipArchiveSync(
        entries: Iterable<ZipEntry>,
        options?: string | CreateZipArchiveOptions,
    ): NodeJS.Iterator<Buffer>;
    /**
     * The current default ceiling, in bytes, applied by `zipEntry.content()` when no explicit `maxSize` is given.
     * Default: `268435456` (256 MiB).
     * @since v26.8.0
     * @experimental
     */
    function getMaxZipContentSize(): number;
    /**
     * Sets the default ceiling used by `zipEntry.content()` when no explicit `maxSize` option is given. This is a guard
     * against zip bombs: an archive whose central directory declares a member larger than this is rejected before
     * allocating memory for it. Streaming reads (`zipEntry.contentIterator()`, `zipFile.stream()`) are bounded-memory
     * by design and are not affected by this setting.
     * @since v26.8.0
     * @experimental
     */
    function setMaxZipContentSize(size: number): void;
    interface ZipFilesOptions extends CreateZipArchiveOptions {
        /**
         * Resolve a symbolic link and archive the file it points to, rather than storing the link itself.
         * @default true
         * @since v26.8.0
         */
        followSymlinks?: boolean | undefined;
    }
    /**
     * Builds an archive from files on disk. For each `[sourcePath, entryName]` pair it reads `sourcePath` and adds an
     * entry named `entryName`, capturing the file's Unix mode and modification time. A directory becomes a directory
     * entry; a regular file's contents are streamed in (as a `zlib.ZipEntry.createStream()` entry) without being
     * buffered in memory. Directory contents are not walked recursively - list each path you want included.
     *
     * When `followSymlinks` is `true` (the default) a symbolic link is resolved and archived as its target file; when
     * it is `false` the link itself is stored as a symbolic-link entry whose content is the target path (see
     * `zlib.ZipEntry.createSymlink()`).
     * @param files `Iterable` of `[sourcePath, entryName]` string pairs. Any iterable works - an array, a `Map`, the
     * result of `Object.entries()`, a generator.
     * @param options An archive comment, as a shorthand for `{ comment: options }`.
     * @returns `stream.Readable` of `Buffer` chunks making up the serialized archive.
     * @since v26.8.0
     * @experimental
     */
    function zipFiles(
        files: Iterable<readonly [sourcePath: string, entryName: string]>,
        options?: string | ZipFilesOptions,
    ): stream.Readable;
}
