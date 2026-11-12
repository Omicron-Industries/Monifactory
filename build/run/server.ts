import fs from "fs/promises"
import { existsSync } from "fs"
import readline from "readline"
import { spawn } from "child_process"
import path from "path"
import Juke from "juke-build"
import { BuildServerTarget } from "../index.ts"
import { readManifest } from "../lib/manifest.ts"

const serverProperties = "level-type=lostcities\\:lostcity\n"

const eula = "eula=true\n"

const serverInstanceDir = "dist/server-live"

const RX_ERRORS = /\/(ERROR|FATAL)\] \[KubeJS( [^\]]*)?\/\]/

const getForgeVersion = () => {
    const { minecraft } = readManifest()
    return `${minecraft.version}-${minecraft.modLoaders.id}`
}

const getForgeLibraryDir = () => path.join("libraries/net/minecraftforge/forge", getForgeVersion())

const getServerJavaArgs = (jvmOptions: string[], userOptions: string[]) => [
    "-Xmx6G",
    ...jvmOptions,
    "@user_jvm_args.txt",
    `@${getForgeLibraryDir()}/${process.platform === "win32" ? "win" : "unix"}_args.txt`,
    ...userOptions,
]

const BuildServerLiveTarget = new Juke.Target({
    name: "build-server-live",
    dependsOn: () => [BuildServerTarget],
    inputs: ["dist/server/**"],
    outputs: [path.join(serverInstanceDir, "manifest.json")],
    executes: async () => {
        await fs.mkdir(serverInstanceDir, { recursive: true })

        // Rewrite every folder that is bundled in server build already. Extra folders, like the world, survive.
        for (const entry of await fs.readdir("dist/server")) {
            await fs.rm(path.join(serverInstanceDir, entry), { recursive: true, force: true })
        }
        await fs.cp("dist/server", serverInstanceDir, { recursive: true })

        // Sorry Mojang.
        await fs.writeFile(path.join(serverInstanceDir, "eula.txt"), eula)
        await fs.writeFile(path.join(serverInstanceDir, "server.properties"), serverProperties)

        const forgeVersion = getForgeVersion()

        // Install Forge if have not yet.
        if (!existsSync(path.join(serverInstanceDir, getForgeLibraryDir()))) {
            Juke.logger.info("Downloading Forge installer")
            const response = await fetch(`https://maven.minecraftforge.net/net/minecraftforge/forge/${forgeVersion}/forge-${forgeVersion}-installer.jar`)
            if (!response.ok) {
                Juke.logger.error(`Failed to download Forge installer: ${response.status} ${response.status}`)
                throw new Juke.ExitCode(1)
            }

            const installerPath = path.join(serverInstanceDir, "forge-installer.jar")
            await fs.writeFile(installerPath, response.body)

            try {
                await Juke.exec("java", ["-jar", "forge-installer.jar", "--installServer"], { cwd: serverInstanceDir })
            } finally {
                Juke.rm(installerPath)
                Juke.rm(`${installerPath}.log`)
            }
        }
    }
})

export const RunGametestServerTarget = new Juke.Target({
    dependsOn: [BuildServerLiveTarget],
    executes: async () => {
        const server = spawn(
            "java",
            getServerJavaArgs(
                ["-Dforge.enableGameTest=true", "-Dforge.gameTestServer=true"],
                ["--universe", "gametest"]
            ),
            {
                cwd: serverInstanceDir,
                stdio: ["ignore", "pipe", "inherit"],
            }
        )

        readline.createInterface({ input: server.stdout }).on("line", line => {
            console.log(line)
            if (!RX_ERRORS.test(line)) return
            server.kill("SIGKILL")
        })

        const code = await new Promise<number>((resolve, reject) => {
            server.on("error", reject)
            server.on("exit", resolve)
        })

        if (code === null) {
            Juke.logger.error("Server encountered a runtime error")
            throw new Juke.ExitCode(1)
        }
        if (code !== 0) {
            Juke.logger.error(`Server exited with code ${code}`)
            throw new Juke.ExitCode(code)
        }
    }
})

export const RunDedicatedServerTarget = new Juke.Target({
    dependsOn: [BuildServerLiveTarget],
    executes: () => Juke.exec("java", getServerJavaArgs([], ["nogui"]), { cwd: serverInstanceDir }),
})
