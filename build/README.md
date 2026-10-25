# Monifactory build script

Uses juke from <https://github.com/tgstation/tgstation>


Juke is a Node.js library, [install Node and NPM](https://nodejs.org/en/download) first.


Build steps (**Requires Node 26 or later**):
- Run `npm install`.
- Run `node index.ts build-all`.

The script will skip build steps whose inputs have not changed since the last run.

## Getting list of available targets

You can get a list of all targets that you can build by running the following command:

```sh
node index.ts
```

## Environment secrets
Build script requires configuration that depends on you 🫵🫵🫵.
It loads an `.env` file at the root of the repository automatically if you just create one.

This is where you put your configs in `KEY=VALUE` rows.
Example:
```env
CF_API_KEY='$1a$1a$AaaAa11aAaAaaAaAAaA.A.AaAAa1a1a1a1111aaA1a1AAAA1a1AAa'
JAVA_PATH=C:\path\to\java\17\bin\java.exe # Do NOT quote the path!
LAUNCHER_JVM_ARGS='["-Xmx6G", "-XX:+UseZGC"]' # JSON array. Quote with ''!
```

## Launcher

### Downloading mods
Any task that requires launching the modpack in any way needs to download mods from CurseForge.

Set your `CF_API_KEY` (a [Console API key](https://console.curseforge.com/#/api-keys)) in [.env](#environment-secrets)!

```sh
# You can pre-warm the mod cache with
node index.ts download-mods

# Updates mods/ folder at the repo root, for running Monifactory in an external launcher.
node index.ts update-mods-folder
```

### Running a dedicated server

```sh
node index.ts run-dedicated-server
```

Runs the dedicated server by assembling the modpack entirely from scratch from your git checkout!

### Switching the pack mode

```sh
node index.ts switch-pack-mode --pack-mode=hard
```

The build script can also execute the coremod's mode switcher, just like the button on the title screen.

> [!CAUTION]
> Supplying `--pack-mode` to any other task will **not** do anything.
>
> Juke's help screen makes it sound like it does, but this is the only task that switches modes.
> The mode change is lasting, every other build task afterwards infers the repo state.
