# Monifactory build script

Uses juke from <https://github.com/tgstation/tgstation>


Juke is a Node.js library, [install Node and NPM](https://nodejs.org/en/download) first.


Build steps (**Requires Node 23 or later**):
- Run `npm install`.
- Run `node index.ts`.

The script will skip build steps whose inputs have not changed since the last run.

## Getting list of available targets

You can get a list of all targets that you can build by running the following command:

```sh
node index.ts --help
```

## Switching the pack mode

```sh
node index.ts switch-pack-mode --pack-mode=hard
```

The build script can also execute the coremod's mode switcher, just like the button on the title screen.
The mode change is repository-wide, every other build task infers this state.

## Running a dedicated server

```sh
node index.ts run-dedicated-server
```

Runs the dedicated server by assembling the modpack entirely from scratch from your git checkout!

Mods are downloaded from CurseForge, you can set the `CF_API_KEY` environment variable with your [Console API key](https://console.curseforge.com/#/api-keys).
