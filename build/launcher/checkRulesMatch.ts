import type { Rules } from "./versionDescription.ts"
import { LAUNCHER_FEATURES, LAUNCHER_OS } from "./config.ts"

/**
 * Version descriptions include libraries and launch arguments that may have rules attached to them.
 * These rules specify whether the library or argument should be included based on the operating system and/or launcher configuration,
 * which is the result of this function.
 */
export function checkRulesMatch(
    rules: Rules | undefined,
): boolean {
    // If there are no rules, pass.
    if (!rules) {
        return true
    }

    // Start by not allowing.
    let shouldAllow = false
    // Then check each rule in order, and override the result if it matches.
    for (const rule of rules) {
        if (
            (rule.os === undefined || (
                (rule.os.name === undefined || rule.os.name === LAUNCHER_OS.name) &&
                (rule.os.arch === undefined || rule.os.arch === LAUNCHER_OS.arch) &&
                (rule.os.version === undefined || rule.os.version.test(LAUNCHER_OS.version)) &&
                (rule.os.versionRange === undefined || satisfiesVersion(LAUNCHER_OS.version, rule.os.versionRange))
            )) &&
            (rule.features === undefined ||
                strictEntries(rule.features).every(([feature, expectedFlag]) => expectedFlag === undefined || LAUNCHER_FEATURES[feature] === expectedFlag)
            )
        ) {
            shouldAllow = rule.action === "allow"
            // Yes, do not break here, because later rules may override this one.
            // It's a common pattern to write { "action": "allow" } as the first rule, and then specify "disallow" rules, as a blacklist of sorts instead.
        }
    }
    return shouldAllow
}

function satisfiesVersion(version: string, range: {
    min?: string | undefined,
    max?: string | undefined
}): boolean {
    const minVersion = range.min?.split(".").map(Number)
    const maxVersion = range.max?.split(".").map(Number)
    const currentVersion = version.split(".").map(Number)
    return currentVersion.every((num, i) =>
        num >= (minVersion?.[i] ?? -Infinity) &&
        num <= (maxVersion?.[i] ?? Infinity),
    )
}

function strictEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][]
}
