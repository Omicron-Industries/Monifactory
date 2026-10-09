/**
 * The KubeJS code-gen entrypoint.
 * Bundles many files into one, and rewrites modern JavaScript in a KubeJS-compatible way, basically.
 */

import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"
import type { RollupOptions } from "rollup"
import babelConfig from "./babel.config.ts"
import hoistVars from "./dx/babel-plugins/hoist-vars.ts"

const extensions = [".ts", ".js"]

/** KubeJS entrypoint directories. */
const entrypoints = ["startup_scripts", "server_scripts", "client_scripts"]

export default entrypoints.map<RollupOptions>(entrypoint => ({
    input: `src/${entrypoint}/index.ts`,
    plugins: [
        nodeResolve({  // Resolves implicit imports from node_modules.
            extensions
        }),
        commonjs(), // core-js is written in CJS.
        babel({
            ...babelConfig,
            configFile: false,
            babelrc: false,
            babelHelpers: "runtime",
            extensions,
            exclude: /node_modules/,
        }),
    ],
    output: {
        file: `${entrypoint}/bundle.js`,
        format: "iife",
        banner: [
            "// priority: -9999",
            "// GENERATED FILE, DO NOT EDIT!",
        ].join("\n"),
        plugins: [
            getBabelOutputPlugin({
                configFile: false,
                babelrc: false,
                plugins: [hoistVars],
                allowAllFormats: true, // Need for IIFE format.
            }),
            terser({
                compress: false, // Do not enable! Rewrites code to JavaScript KubeJS bugs out on.
                mangle: true,
                keep_fnames: true, // KubeJS has no runtime renaming??
                keep_classnames: true,
                format: {
                    comments: /^ (priority:|GENERATED FILE)/, // Keep the banner only.
                    ascii_only: true,
                },
            }),
        ],
    },
}))
