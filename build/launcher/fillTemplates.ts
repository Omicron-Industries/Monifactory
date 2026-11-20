/**
 * Replaces `${key_name}` inside the {@linkcode template} string with the corresponding values from the {@linkcode variables} object.
 */
export function fillTemplates(template: string, variables: Record<string, string>): string {
    const filled = Object
        .entries(variables)
        .reduce((result, [key, value]) =>
            result.replaceAll(`\${${key}}`, value),
        template)

    // Find any other templates we forgot to supply values for.
    const leftoverKeys = filled
        .matchAll(/\${[a-zA-Z_-]+}/g)
        .map(match => match[0])
        .toArray()
    if (leftoverKeys.length)
        throw new Error(`Templates were not filled fully: missing ${leftoverKeys.join(", ")} in "${template}"`)

    return filled
}

if (import.meta.main) {
    console.log(fillTemplates("2+2=${four}", { four: "4" }))
    console.log(fillTemplates("2+2=${four}", { five: "5" })) // Should throw.
}
