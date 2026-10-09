/**
 * ESLint configuration file.
 */

import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint, { type ConfigArray } from "typescript-eslint";
import { MoniLabs } from "./dx/eslint-plugin/custom-plugin.ts";

export default [
    {
        // Code-gen.
        ignores: [
            "*_scripts/bundle.js",
            ".tsbuild/",
        ],
    },
    js.configs.recommended,
    {
        ...tseslint.configs.base,
        files: [
            "*.{m,c,}ts",
            "src/**/*.{m,c,}ts",
            "dx/**/*.{m,c,}ts"
        ],
    },
    {
        plugins: {
            "@stylistic/js": stylistic,
        },
        rules: {
            "no-unused-vars": "off",
            "no-undef": "off",
            "no-unexpected-multiline": "off",
            "no-var": "error",
            "no-useless-escape": "warn",
            "space-infix-ops": ["error", { "int32Hint": true }],
            "@stylistic/js/indent": ["error", 4, { SwitchCase: 0 }],
            "@stylistic/js/spaced-comment": "error",
            "@stylistic/js/linebreak-style": ["error", "unix"],
            "@stylistic/js/no-trailing-spaces": "error",
            "@stylistic/js/eol-last": ["error", "always"],
            "@stylistic/js/no-multi-spaces": ["error", { ignoreEOLComments: true }],
            "@stylistic/js/no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0 }],
            "@stylistic/js/no-extra-semi": "error",
            "@stylistic/js/quotes": ["error", "double", { avoidEscape: true }],
        },
    },
    MoniLabs,
] satisfies ConfigArray;
