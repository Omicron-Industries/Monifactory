/**
 * "When dealing with long concatenated method calls or extended lists of parameters,
 * indent any continuations of that statement on a new line,
 * in the same way that one would indent the body of an if statement or for loop."
 */

import { ESLintUtils } from "@typescript-eslint/utils"

export default ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        hasSuggestions: true,
        fixable: "code",
        messages: {
            "chain-too-long": "There are too many calls in this chain, and no newlines."
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                let chainCount = 0
                for(let iNode = node;
                    iNode.callee.type === "MemberExpression" && iNode.callee.object.type === "CallExpression";
                    iNode = iNode.callee.object
                ) {
                    if(context.sourceCode.text.slice(
                        iNode.callee.object.range[1],
                        iNode.callee.property.range[0]
                    ).includes("\n"))
                        break
                    chainCount++
                }

                if(chainCount < 3)
                    return


                context.report({
                    messageId: "chain-too-long",
                    node
                })
            },
        }
    },
})
