/**
 * A Babel plugin that moves all `var`s to the top of their containing functions.
 *
 * KubeJS is a buggy mess, where `var` is scoped the same way as `let`, instead of function-scoped as the standard requires.
 * This breaks Babel and core-js, which is why we should run this fixer after them.
 */

import type { NodePath, PluginObj, types as t } from "@babel/core"
import helperHoistVariables from "@babel/helper-hoist-variables"
const hoistVariables = helperHoistVariables.default // CommonJS module hack

export default function hoistVarsPlugin({ types }: { types: typeof t }): PluginObj {
    return {
        name: "hoist-vars",
        visitor: {
            "Function|Program"(path: NodePath<t.Function | t.Program>) {
                const body: NodePath = path.isProgram() ? path : (path.get("body") as NodePath)
                if (!body.isBlockStatement() && !body.isProgram()) return

                const hoisted = new Map<string, t.Identifier>()
                hoistVariables(body, (id, name) => {
                    const binding = path.scope.getOwnBinding(name)
                    if (binding?.kind === "param") {
                        return // That is a function's parameter, already function-scoped and immovable.
                    }
                    if (binding && [
                        binding.path, // Where the binding was first declared.
                        ...binding.constantViolations // Where the binding was modified. Weird name for a property that says "mutations are here", but alright?
                    ].some(p => p.isFunctionDeclaration())) {
                        return // For some reason, in KubeJS, executing both "var a" and "function a() {}", in any order, throws. Ugh
                    }
                    hoisted.set(name, id)
                })
                if (hoisted.size === 0) return

                const container: NodePath<t.BlockStatement | t.Program> = body
                container.unshiftContainer("body", types.variableDeclaration(
                    "var",
                    Array.from(hoisted.values(), id => types.variableDeclarator(id)),
                ))
            },
        },
    }
}
