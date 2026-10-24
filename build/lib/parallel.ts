import { Readable, type ReadableOperatorOptions } from "node:stream"

export function distribute<T, R>(
    tasks: Iterable<T> | AsyncIterable<T>,
    doTask: (task: T) => R,
    options: ReadableOperatorOptions
): Promise<Awaited<R>[]> {
    return Readable
        .from(tasks)
        .map(doTask, options)
        .toArray(options) as Promise<Awaited<R>[]>
}
