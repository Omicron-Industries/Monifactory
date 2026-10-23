import { Readable, type ArrayOptions } from "node:stream"

export function distribute<T, R>(
    tasks: Iterable<T> | AsyncIterable<T>,
    doTask: (task: T) => R,
    options: ArrayOptions
): Promise<Awaited<R>[]> {
    return Readable
        .from(tasks)
        .map(doTask, options)
        .toArray(options) as Promise<Awaited<R>[]>
}
