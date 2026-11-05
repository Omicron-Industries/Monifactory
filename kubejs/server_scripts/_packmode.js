// priority: 900
/**
 * Server-side pack mode management.
 * This file adds a set of constant booleans for convenience in determining if a feature is enabled
 * and enables gamestages to toggle feature-specific FTBQuests quests if the respective content is also enabled.
 */

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
const doStoneline = !!global.doStoneline;
const doFluxbore = !!global.doFluxbore;
const doHarderFluxBore = !!global.doHarderFluxBore;
const doQuantumCoolant = !!global.doQuantumCoolant;
const doHostileMicroverse = !!global.doHostileMicroverse;

PlayerEvents.loggedIn(event => {
    const gameStages = [
        "Boilers",
        "Compacting",
        "Converters",
        "HarderProcessing",
        "HarderRecipes",
        "HardGlassRecipesWarning",
        "HNN",
        "LaserIO",
        "Monicoins",
        "Snad",
        "SteamAge",
        "Stoneline",
        "HalfMMs",
        "QuantumCoolant",
        "HostileMicroverse"
    ];

    gameStages.forEach(stage => {
        const flag = global[`do${stage}`];
        if (flag) {
            event.removeGameStage(`dont${stage}`);
            event.addGameStage(`do${stage}`);
        } else {
            event.removeGameStage(`do${stage}`);
            event.addGameStage(`dont${stage}`);
        }
    });
});
