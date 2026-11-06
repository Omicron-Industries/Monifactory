/** Makes the decorated function return the same thing for the entire lifetime of the process. */
export function cacheForever<O extends object | string | number | boolean | symbol>(fn: () => O): () => O {
    let result: O | undefined = undefined
    return () => result ??= fn()
}

