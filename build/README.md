# Monifactory build script

## Initial setup

- [install Node and NPM](https://nodejs.org/en/download/current) first. We require **Node 26 or later**.
- Open your terminal, go into the build folder (`cd build`), and run `npm install` there.
- Run `node index.ts` to print **list of the available tasks** the build script can do, to confirm it is working.
- Setup [environment secrets](#environment-secrets) if you'll be using it to launch the game or to create a [build](#build) one can import into any mainstream launcher.

### Environment secrets
Build script requires configuration that depends on you 🫵🫵🫵.
It loads an `.env` file at the root of the repository automatically if you just create one.

This is where you put your configs in `KEY=VALUE` rows.
Example:
```env
CF_API_KEY='$1a$1a$AaaAa11aAaAaaAaAAaA.A.AaAAa1a1a1a1111aaA1a1AAAA1a1AAa' # Get yours at https://console.curseforge.com/#/api-keys
JAVA_PATH=C:\path\to\java\17\bin\java.exe # Do NOT quote the path!
LAUNCHER_JVM_ARGS='["-Xmx6G", "-XX:+UseZGC"]' # JSON array. Quote with ''!
```

## Build
Produces modpack builds in CurseForge format.

Assuming you have a [CurseForge token configured](#environment-secrets), so that mods can be downloaded:
- The `build-client` task creates a `client.zip` in the `dist` directory.
- The `build-server` task creates a `server.zip` in the `dist` directory.
- The `build-all` task does both in one process.

They all require `--pack-mode` to be set to either `normal`, `hard`, or `expert`, which defines the **initial** pack mode the game boots with. (CurseForge releases are made with `--pack-mode=normal`, as you could have guessed.)

The `node index.ts download-mods` task warms up the mods cache, which can be used to debug CurseForge token issues without actually rebuilding the modpack over and over.
