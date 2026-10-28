import fs from "fs/promises"
import readline from "readline"
import { spawn } from "child_process"
import path from "path"
import Juke from "juke-build"
import { BuildServerTarget } from "../index.ts"
import { getJavaPath } from "./java.ts"
import { DownloadVersionDescription } from "./versionDescription.ts"
import { getForgeServerLibraryDir, InstallForgeServer } from "./forge/installForge.ts"
import { SERVER_INSTANCE_PATH } from "./config.ts"

const serverProperties = [
    "level-type=lostcities\\:lostcity",
    "online-mode=false",
].join("\n")

const eula = "eula=true\n"

const RX_ERRORS = /\/(ERROR|FATAL)\] \[KubeJS( [^\]]*)?\/\]/

const getServerJavaArgs = (jvmOptions: string[], userOptions: string[]) => [
    "-Xmx6G",
    ...jvmOptions,
    "@user_jvm_args.txt",
    `@${path.join(getForgeServerLibraryDir(), process.platform === "win32" ? "win_args.txt" : "unix_args.txt")}`,
    ...userOptions,
]

const BuildServerLiveTarget = new Juke.Target({
    name: "build-server-live",
    dependsOn: () => [BuildServerTarget],
    inputs: ["dist/server/**"],
    outputs: [path.join(SERVER_INSTANCE_PATH, "manifest.json")],
    executes: async () => {
        await fs.mkdir(SERVER_INSTANCE_PATH, { recursive: true })

        // Rewrite every folder that is bundled in server build already. Extra folders, like the world, survive.
        for (const entry of await fs.readdir("dist/server")) {
            await fs.rm(path.join(SERVER_INSTANCE_PATH, entry), { recursive: true, force: true })
        }
        await fs.cp("dist/server", SERVER_INSTANCE_PATH, { recursive: true })

        // Sorry Mojang.
        await fs.writeFile(path.join(SERVER_INSTANCE_PATH, "eula.txt"), eula)
        await fs.writeFile(path.join(SERVER_INSTANCE_PATH, "server.properties"), serverProperties)
    }
})

export const RunGametestServerTarget = new Juke.Target({
    dependsOn: [DownloadVersionDescription, BuildServerLiveTarget, InstallForgeServer],
    executes: async () => {
        const server = spawn(
            await getJavaPath(),
            getServerJavaArgs(
                ["-Dforge.enableGameTest=true", "-Dforge.gameTestServer=true"],
                ["--universe", "gametest"]
            ),
            {
                cwd: SERVER_INSTANCE_PATH,
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
    dependsOn: [DownloadVersionDescription, BuildServerLiveTarget, InstallForgeServer],
    executes: async () => Juke.exec(await getJavaPath(), getServerJavaArgs([], ["nogui"]), { cwd: SERVER_INSTANCE_PATH }),
})
