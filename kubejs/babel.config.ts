/**
 * Babel configuration for KubeJS.
 *
 * KubeJS runs on a fork of an old Rhino version: https://github.com/kube-mods/Rhino
 * They also backported some newer Rhino features; but they are buggy as hell, e.g. `??`.
 */

import type { TransformOptions } from "@babel/core"
import runtime from "@babel/runtime/package.json" with { type: "json" }
import coreJs from "core-js-pure/package.json" with { type: "json" }

/** Standards KubeJS's engine already supports natively. */
const POLYFILL_BLACKLIST = [
    /^es\.(map|set|weak-map|weak-set)(\.constructor)?$/,
    /^es\.symbol/,
    /^es\.(array|string)\.iterator$/,
    /^es\.array\.(filter|map|push|unshift|concat|slice|for-each|index-of|is-array|join|reduce|some|every|find|find-index|fill|reverse|splice)$/,
    /^es\.object\.(values|keys|create|define-propert(y|ies)|get-own-property-descriptor|get-prototype-of|set-prototype-of|freeze|is-frozen)$/,
    /^es\.string\.(starts-with|ends-with|trim|repeat|pad-start|pad-end)$/,
    "es.object.entries",
    "es.string.includes",
    "es.date.to-json",
    "es.function.bind",
]

/** Features that are hard blocked by limitations of the engine. */
const POLYFILL_IMPOSSIBLE = [
    /^es\.promise/, // No job queues, no async, no Promise. KubeJS executes a bunch of synchronous IIFE files.
    /^es\.aggregate-error/,

    /^web\./, // DOM, obviously not a browser here. WebAPI also, but seriously, who cares about some AbortController in a recipe-declaring script.
    /^esnext\./, // Do not even start to worry about ECMAScript proposals. We are so far from Stage 4 it is crazy.
]

export default {
    targets: {
        rhino: "1.7.13"
    },
    presets: [
        ["@babel/preset-env", {
            include: ["transform-arrow-functions"], // Arrow functions work already, but lack `.name` prop. Name of functions is ultra broken here in general.
            exclude: [
                // KubeJS throws when accessing `Symbol.iterator` of a Java collection. Not cool, dude.
                "transform-for-of", // TODO: this is possible to re-implement with a custom plugin, if really needed...

                // Stuff we use "exclude" intentionally for; the engine actually already supports this:
                "transform-template-literals",
                "transform-typeof-symbol",
                "transform-literals",
            ],
        }],
        ["@babel/preset-typescript", {
            onlyRemoveTypeImports: true,
        }],
    ],
    plugins: [
        // Polyfills
        ["@babel/plugin-transform-runtime", {
            corejs: false,
            moduleName: "@babel/runtime",
            version: runtime.version
        }],
        ["babel-plugin-polyfill-corejs3", {
            method: "usage-pure",
            version: coreJs.version,
            exclude: [...POLYFILL_BLACKLIST, ...POLYFILL_IMPOSSIBLE],
        }],
    ],
} satisfies TransformOptions
