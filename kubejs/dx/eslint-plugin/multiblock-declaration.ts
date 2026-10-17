/**
 * An ESLint rule that ensures all multiblock pattern builders use
 * `@` char for the controller, ` ` (space) for air and `#` for the 'any' predicate.
 */

import { ESLintUtils, type TSESTree } from "@typescript-eslint/utils"

const builderFactoryArgs = "definition"
const builderName = "FactoryBlockPattern"

const rulePredicateCode: Record<string, string> = {
    "@": `Predicates.controller(Predicates.blocks(${builderFactoryArgs}.get()))`,
    "#": "Predicates.any()",
    " ": "Predicates.air()",
}

/**
 * Finds the root expression in the call chain
 */
export function isInMultiblockBuilderCallChain(rootCall: TSESTree.CallExpression) {
    let rootCallee
    for(;;) {
        if(rootCall.callee.type === "MemberExpression")
            rootCallee = rootCall.callee
        else break
        if(rootCallee.object.type === "CallExpression")
            rootCall = rootCallee.object
        else break
    }
    if(!rootCallee) return false
    const o = rootCallee.object
    return o && o.type === "Identifier" && o.name === builderName
}

export default ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        hasSuggestions: true,
        fixable: "code",
        messages: {
            "char-not-char": "The first argument must be a single character, like '@'.",
            "not-2-args": "A 'where' call should have 2 arguments.",
            ...Object.fromEntries(
                Object.entries(rulePredicateCode).map(([char, code]) => [
                    "predicate-for-" + char, `The predicate for '${char}' should be ${code}`
                ])
            ),

            "factory-no-args": "Multiblock pattern factory must have a single argument.",
            "factory-args": `Multiblock pattern factory arguments should be '${builderFactoryArgs} =>'`
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if(node.callee.type !== "MemberExpression")
                    return
                if(node.callee.property.type !== "Identifier" || node.callee.property.name !== "where")
                    return
                if(!isInMultiblockBuilderCallChain(node))
                    return
                // Now we are sure we are dealing with a multiblock pattern builder

                if(node.arguments.length !== 2)
                    return context.report({
                        messageId: "not-2-args",
                        node: node
                    })

                const [char, predicate] = node.arguments

                // First argument check
                if(char.type !== "Literal" || typeof char.value !== "string" || char.value.length !== 1)
                    return context.report({
                        messageId: "char-not-char",
                        node: char
                    })

                // Second argument check
                const predicateCodeActual = context.sourceCode.text.slice(...predicate.range)
                const predicateCodeShouldBe = rulePredicateCode[char.value]
                if(predicateCodeShouldBe && predicateCodeActual !== predicateCodeShouldBe)
                    context.report({
                        // @ts-expect-error It's not smart enough
                        messageId: "predicate-for-" + char.value,
                        node: predicate,
                        fix: fixer => [
                            fixer.replaceText(predicate, predicateCodeShouldBe)
                        ]
                    })
            },
            ArrowFunctionExpression(node) {
                if(node.body.type !== "CallExpression")
                    return
                if(!isInMultiblockBuilderCallChain(node.body))
                    return
                // Now we are sure we are dealing with a multiblock factory function

                if(node.params.length < 1)
                    return context.report({
                        messageId: "factory-no-args",
                        node: node
                    })

                const paramsRange: [number, number] = [
                    node.params[0].range[0],
                    node.params.at(-1).range[1]
                ]
                if(context.sourceCode.text.slice(...paramsRange) !== builderFactoryArgs)
                    return context.report({
                        messageId: "factory-args",
                        node: node.params[0],
                        fix: fixer => [
                            fixer.replaceTextRange(paramsRange, builderFactoryArgs)
                        ]
                    })
            }
        }
    },
})
