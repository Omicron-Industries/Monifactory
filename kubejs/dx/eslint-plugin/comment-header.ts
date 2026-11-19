/**
 * An ESLint rule that ensures all files have a C-style header, just like this one.
 */

import { ESLintUtils } from "@typescript-eslint/utils"

const defaultHeaderContent = "*\n * Describe this file here!\n "
const defaultHeader = `/*${defaultHeaderContent}*/\n\n`


export default ESLintUtils.RuleCreator.withoutDocs({
    meta: {
        type: "problem",
        hasSuggestions: true,
        fixable: "code",
        messages: {
            "no-header": "Label things with comments! " +
                "Every file should have a C-style comment at the top explaining what that file does " +
                "(Reference existing files if you don't know what that is).",
            "default-header": "Describe what this file does. If there is a good reason not to, replace this with /**/"
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            Program(node) {
                const continuousComments = node.comments
                    .slice(0,1)
                    // Comments must start at the beginning of the file
                    .filter(c => c.range[0] === 0)
                if(continuousComments.length > 0) {
                    // Find an array of continuous comments, that have no code in between
                    for(const comment of node.comments.slice(1)) {
                        if(comment.range[0] - continuousComments[0].range[1] <= 2)
                            continuousComments.unshift(comment)
                        else break
                    }
                    continuousComments.reverse()

                    // Find the first occurence of a c-style comment
                    const block = continuousComments.find(c => c.type === "Block")
                    if(block) {
                        if(block.value === defaultHeaderContent)
                            return context.report({
                                node: block,
                                messageId: "default-header",
                            })
                        // Good, there is a comment which is not default
                        return
                    }
                }

                // No comments at all or no block comment at the top
                return context.report({
                    node,
                    messageId: "no-header",

                    fix: (fixer) => [
                        fixer.insertTextBefore(node, defaultHeader)
                    ]
                })
            }
        }
    },
})
