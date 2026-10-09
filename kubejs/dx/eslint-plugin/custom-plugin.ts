/**
 * Custom ESLint plugin for Monifactory's KubeJS
 */

import commentHeader from "./comment-header.ts"
import recipeSpacing from "./recipe-spacing.ts"
import multiblockDeclaration from "./multiblock-declaration.ts"
import callChains from "./call-chains.ts"
import type { TSESLint } from "@typescript-eslint/utils"

/**
 * Creates a custom ESLint plugin
 * @param name Plugin name
 * @param rules Plugin rules
 */
function customPluginWithAllRulesError(name: string, rules: Record<string, TSESLint.AnyRuleModule>): TSESLint.FlatConfig.Config {
    return {
        plugins: {
            [name]: { rules }
        },
        rules: Object.fromEntries(
            Object.entries(rules).map(([rule]) =>
                [`${name}/${rule}`, "error"]
            )
        )
    }
}

export const MoniLabs = customPluginWithAllRulesError("moni-labs", {
    "comment-header": commentHeader,
    "recipe-spacing": recipeSpacing,
    "multiblock-declaration": multiblockDeclaration,
    "call-chains": callChains
})
