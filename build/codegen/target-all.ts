import Juke from "juke-build"

import { CodegenCreditsTarget } from "./credits/target.ts"
export { CodegenCreditsTarget } from "./credits/target.ts"

import { CodegenKubeJsTarget } from "./kubejs/target.ts"
export { CodegenKubeJsTarget } from "./kubejs/target.ts"

import { CodegenLangsTarget } from "./langs/target.ts"
export { CodegenLangsTarget } from "./langs/target.ts"

export const CodegenAllTarget = new Juke.Target({
    dependsOn: [
        CodegenCreditsTarget,
        CodegenKubeJsTarget,
        CodegenLangsTarget
    ],
})

export default CodegenAllTarget
