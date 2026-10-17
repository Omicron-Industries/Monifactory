import Juke from "juke-build"

const npm = (...args: string[]) => Juke.exec("npm", args, {
    cwd: "kubejs",
    shell: true,
})

const KubeJsInstallDepsTarget = new Juke.Target({
    name: "kubejs-install-deps",
    inputs: ["kubejs/package.json", "kubejs/package-lock.json"],
    outputs: ["kubejs/node_modules/.package-lock.json"],
    executes: () => npm("ci"),
})

export const CodegenKubeJsTarget = new Juke.Target({
    dependsOn: [KubeJsInstallDepsTarget],
    inputs: [
        "kubejs/src/**",
        "kubejs/dx/babel-plugins/**",
        "kubejs/babel.config.ts",
        "kubejs/rollup.config.ts",
        "kubejs/package-lock.json",
    ],
    outputs: [
        "kubejs/startup_scripts/bundle.js",
        "kubejs/server_scripts/bundle.js",
        "kubejs/client_scripts/bundle.js",
    ],
    executes: () => npm("run", "--silent", "build"),
})
