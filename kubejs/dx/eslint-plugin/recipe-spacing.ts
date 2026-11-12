/**
 * An ESLint rule that defines spacing in recipe registrations
 */

import { ESLintUtils } from "@typescript-eslint/utils"

export default ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        hasSuggestions: true,
        fixable: "code",
        messages: {
            "space-before-result": "There should not be any space between '(' and the recipe result.",
            "space-before-pattern": "There should be exactly 1 space between the recipe result and and '['.",
            "space-before-ingredients": "There should be exactly 1 space between ']' and '{'.",
            "space-after-ingredients": "There should not be any space between the ingredient list and ')'.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if(node.arguments.length !== 3)
                    return
                const [result, pattern, ingredients] = node.arguments
                if(pattern.type !== "ArrayExpression" || ingredients.type !== "ObjectExpression")
                    return

                // Space after ( and before first argument
                if(node.callee.range[1] + 1 !== result.range[0])
                    context.report({
                        messageId: "space-before-result",
                        node: result,
                        fix: (fixer) => [
                            fixer.removeRange([node.callee.range[1] + 1, result.range[0]])
                        ]
                    })

                // Space after first argument and before first argument
                if(context.sourceCode.text.slice(result.range[1], pattern.range[0]) !== ", ")
                    context.report({
                        messageId: "space-before-pattern",
                        node: pattern,
                        fix: (fixer) => [
                            fixer.replaceTextRange([result.range[1], pattern.range[0]], ", ")
                        ]
                    })

                // Space after second argument and before third argument
                if(context.sourceCode.text.slice(pattern.range[1], ingredients.range[0]) !== ", ")
                    context.report({
                        messageId: "space-before-ingredients",
                        node: ingredients,
                        fix: (fixer) => [
                            fixer.replaceTextRange([pattern.range[1], ingredients.range[0]], ", ")
                        ]
                    })

                // Space after third argument and before )
                if(ingredients.range[1] + 1 !== node.range[1])
                    context.report({
                        messageId: "space-after-ingredients",
                        node: ingredients,
                        fix: (fixer) => [
                            fixer.removeRange([ingredients.range[1], node.range[1] - 1])
                        ]
                    })
            }
        }
    },
})
