// priority: 1
/**
 * Utility functions for registering microminer missions,
 * and lower-tier projector missions more succinctly.
 */

/**
 * Array to keep track of how many missions are available for each microminer tier.
 * Used to generate circuit numbers for each mission.
 */
global.mission_counts = {
    "1": 0,
    "2": 0,
    "2half": 0,
    "3": 0,
    "3half": 0,
    "4": 0,
    "4half": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "11": 0,
    "12": 0
}

/**
 * Default durations for missions of a given microminer tier.
 * Compare with repairDurations of repair.js.
 */
const missionDurations = {
    "1": 100,
    "2": 120,
    "2half": 50,
    "3": 150,
    "3half": 180,
    "4": 200,
    "4half": 200,
    "5": 200,
    "6": 220,
    "7": 240,
    "8": 260,
    "9": 280,
    "10": 300,
    "11": 300,
    "12": 360
}

/**
 * Default EU/t costs for missions of a given microminer tier.
 */
const missionEUt = {
    "1": GTValues.VA[GTValues.HV],
    "2": GTValues.VHA[GTValues.EV],
    "2half": GTValues.VA[GTValues.EV],
    "3": GTValues.VA[GTValues.EV],
    "3half": GTValues.VHA[GTValues.EV],
    "4": GTValues.VHA[GTValues.IV],
    "4half": GTValues.VA[GTValues.IV],
    "5": GTValues.VA[GTValues.IV],
    "6": GTValues.VHA[GTValues.LuV],
    "7": GTValues.VA[GTValues.LuV],
    "8": GTValues.VA[GTValues.ZPM],
    "9": GTValues.VA[GTValues.UV],
    "10": GTValues.VA[GTValues.UHV],
    "11": GTValues.VA[GTValues.UEV],
    "12": GTValues.VA[GTValues.UEV]
}

/**
 * Registers a basic microverse mission and equivalent stabilized mission recipe
 * @param {Internal.RecipesEventJS} event Parameter used in consumer for ServerEvents.recipes().
 * @param {number|string} minerTier Miner tier index. Typically 1 through 12.
 * @param {number} duration Recipe duration in seconds. Defaults based on the miner tier if left undefined.
 * @param {number} EUt The EU per tick consumed by the recipe. Defaults based on the miner tier if left undefined.
 * @param {number} minerReturnChance Chance a damaged miner is returned, in percent. [Integer 0-100]
 * @returns {Internal.GTRecipeSchema$GTRecipeJS[]} Microverse recipe builders. Use this to add item and fluid I/O.
 */
function microverse_mission(event, minerTier, projectorTier, duration, EUt, minerReturnChance) {
    // Increase global mission counter
    global.mission_counts[minerTier]++;

    // Convert miner return chance from percentage to GTM"s hundredth-of-a-percent format
    minerReturnChance = Math.floor(minerReturnChance * 100)

    // Use defaults if duration or EU/t not defined
    if(duration == undefined) duration = missionDurations[minerTier]
    if(EUt == undefined) EUt = missionEUt[minerTier]

    // We return an array of GT recipe builders for the caller to act upon with a .forEach
    // rather than a long parameter list, multiple overloads, or varargs
    const builders = [];

    // Register basic microverse mission
    builders[0] = event.recipes.gtceu.microverse(`kubejs:mission_t${minerTier}_${global.mission_counts[minerTier]}`)
        .addData("projector_tier", projectorTier)
        .itemInputs(`kubejs:microminer_t${minerTier}`)
        .duration(Math.round(duration * 20))
        .addData("duration", Math.round(duration * 20))
        .EUt(EUt)

    if(isNaN(minerReturnChance) || minerReturnChance == undefined) {
        // By default, return the microminer that was passed into the input.
        builders[0].itemOutputs(`kubejs:microminer_t${minerTier}`)
    } else if(minerReturnChance > 0) {
        // Returns damaged miner if chance is positive and real
        builders[0].itemOutputs(`kubejs:microminer_t${minerTier}_damaged`)
    } else {
        // Never return no miner
        builders[0].itemOutputs(`kubejs:microminer_t${minerTier}`)
    }

    const stabilized_miners = [
        "2half",
        "3half",
        "4half",
        "6",
        "7",
        "8"
    ]

    // Register stabilized miner counterpart
    if(stabilized_miners.indexOf(minerTier.toString()) != -1) {
        builders[1] = event.recipes.gtceu.microverse(`kubejs:mission_t${minerTier}_${global.mission_counts[minerTier]}_stabilized`)
            .addData("projector_tier", projectorTier)
            .itemInputs(`kubejs:stabilized_microminer_t${minerTier}`)
            .itemOutputs(`kubejs:stabilized_microminer_t${minerTier}`)
            .duration(Math.round(duration * 20))
            .addData("duration", Math.round(duration * 20))
            .EUt(EUt)
    }

    return builders;
}
