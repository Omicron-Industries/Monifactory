// priority: 900
/**
 * Pack mode management.
 * Handles the interpretation of packmode.json to determine the global pack mode.
 * This determines the values of global booleans like doHNN, doHarderProcessing, and doMonicoins.
 * These are used in other scripts to define pack mode-specific behavior.
 */

// Packmode config path & name
const configName = "config/packmode.json";


// Default mode.json
const defaultConfig = {
    mode: "Normal",
    message: "This tells KubeJS what mode the pack is currently in, pack mode can be changed in the main menu after loading the game"
};


// Handle the possibility that there may not be a mode.json
let config = JsonIO.read(configName);
if (!config || !config.mode) {
    JsonIO.write(configName, defaultConfig);
    console.log(`Created new ${configName}`);
    config = defaultConfig;
}

let invalidConfig = function (configMode) {
    JsonIO.write(configName, defaultConfig);
    config.mode = defaultConfig.mode;
    console.error(`Overwrote ${configName}, because the mode ${configMode} was found. Valid modes are 'Normal', 'Hard' and 'Expert'.`);
}

let packMode = config.mode;
switch (packMode) {
case "Normal": case "Hard": case "Expert": break;
default: invalidConfig(); packMode = config.mode;
}


// String representation of the current packmode
global.packmode = packMode;

// [DEPRECATED] Global mode booleans. Note that isHardMode is also true if the pack is in Expert
/**
 * True if the modpack is in Normal Mode.
 * @deprecated as of 3/7/2025, Monifactory version 0.12.0.
 * Create or or use a feature-specific boolean instead.
 * See KubeJS/startup_scripts/_packmode.js for examples.
 */
global.isNormalMode = packMode == "Normal";

/**
 * True if the modpack is in Hard or Expert Mode.
 * @deprecated as of 3/7/2025, Monifactory version 0.12.0.
 * Create or or use a feature-specific boolean instead.
 * See KubeJS/startup_scripts/_packmode.js for examples.
 */
global.isExpertMode = packMode == "Expert";

/**
 * True if the modpack is in Hard Mode.
 * @deprecated as of 3/7/2025, Monifactory version 0.12.0.
 * Create or or use a feature-specific boolean instead.
 * See KubeJS/startup_scripts/_packmode.js for examples.
 */
global.isHardMode = (packMode == "Hard") || global.isExpertMode;


/**
 * True if the modpack is in Normal Mode.
 * @deprecated as of 3/7/2025, Monifactory version 0.12.0.
 * Create or or use a feature-specific boolean instead.
 * See KubeJS/startup_scripts/_packmode.js for examples.
 */
const isNormalMode = !!global.isNormalMode;

/**
 * True if the modpack is in Hard or Expert Mode.
 * @deprecated as of 3/7/2025, Monifactory version 0.12.0.
 * Create or or use a feature-specific boolean instead.
 * See KubeJS/startup_scripts/_packmode.js for examples.
 */
const isExpertMode = !!global.isExpertMode;

/**
 * True if the modpack is in Hard Mode.
 * @deprecated as of 3/7/2025, Monifactory version 0.12.0.
 * Create or or use a feature-specific boolean instead.
 * See KubeJS/startup_scripts/_packmode.js for examples.
 */
const isHardMode = !!global.isHardMode;

/*
Global feature toggle booleans. Shared across client and server.
If you want to alter some mode-specific features on your instance, do so here.
However, be warned that if you do so then no support will be provided for any issues you may encounter.
On the flipside, if you create your own fix for an issue you encounter, then any Pull Requests with such a fix are welcome.
*/
global.doAssemblyLineOrderingWarning = packMode == "Expert";
global.doBoilers = packMode == "Normal" || packMode == "Hard";
global.doCompacting = packMode == "Normal" || packMode == "Hard";
global.doConverters = packMode == "Normal" || packMode == "Hard";
global.doHarderPrintedSilicon = packMode == "Expert";
global.doHarderProcessing = packMode == "Hard" || packMode == "Expert";
global.doHarderRecipes = packMode == "Hard" || packMode == "Expert";
global.doHardGlassRecipesWarning == packMode == "Hard" || packMode == "Expert";
global.doHatchRevert = packMode == "Normal" || packMode == "Hard";
global.doHNN = packMode == "Normal";
global.doLaserIO = packMode == "Normal" || packMode == "Hard";
global.doMeowniPlush = packMode == "Hard" || packMode == "Expert";
global.doMonicoins = packMode == "Normal";
global.doSnad = packMode == "Normal" || packMode == "Hard";
global.doSteamAge = packMode == "Hard" || packMode == "Expert";
global.doFluxbore = packMode == "Normal" || packMode == "Hard";
global.doHarderFluxBore = packMode == "Normal" || packMode == "Hard";
global.doQuantumCoolant = packMode == "Hard" || packMode == "Expert";
global.doHostileMicroverse = packMode == "Hard" || packMode == "Expert";


// The !! is to cast the types into boolean since they got transformed into Java Objects from being globals
const doAssemblyLineOrderingWarning = !!global.doAssemblyLineOrderingWarning;
const doBoilers = !!global.doBoilers;
const doCompacting = !!global.doCompacting;
const doConverters = !!global.doConverters;
const doHarderPrintedSilicon = !!global.doHarderPrintedSilicon;
const doHarderProcessing = !!global.doHarderProcessing;
const doHarderRecipes = !!global.doHarderRecipes;
const doHardGlassRecipesWarning = !!global.doHardGlassRecipesWarning;
const doHatchRevert = !!global.doHatchRevert;
const doHNN = !!global.doHNN;
const doLaserIO = !!global.doLaserIO;
const doMeowniPlush = !!global.doMeowniPlush;
const doMonicoins = !!global.doMonicoins;
const doSnad = !!global.doSnad;
const doSteamAge = !!global.doSteamAge;
const doFluxbore = !!global.doFluxbore;
const doHarderFluxBore = !!global.doHarderFluxBore;
const doQuantumCoolant = !!global.doQuantumCoolant;
const doHostileMicroverse = !!global.doHostileMicroverse;
