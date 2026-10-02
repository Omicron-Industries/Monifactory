/**
 * Recipe definitions for repairing microminers.
 */

/**
 * Durations for repairs of a given microminer tier.
 * Compare with missionDurations of mission_utils.js.
 */
const repairDurations = {
    "2half": 20,
    "3half": 40,
    "4half": 60,
    "6": 80,
    "7": 90,
    "8": 100
}

ServerEvents.recipes(event => {
    /**
     * Starts a recipe builder for a given microminer tier. Must be completed with more chanced input items.
     * The miner tier determines the duration of the recipe.
     * @param {number|string} minerTier Miner tier index. Typically 1 through 12.
     * @param {string[]} doublePlateList List of the names of the double plate materials used to repair the hull.
     * @param {string[]} heavyPlatingList List of the names of the heavy plating materials used to repair the hull.
     */
    function repairing(minerTier) {
        let minerTierNumber;

        if(minerTier == "2half") minerTierNumber = 2.5;
        else if(minerTier == "3half") minerTierNumber = 3.5;
        else if(minerTier == "4half") minerTierNumber = 4.5;
        else minerTierNumber = minerTier;

        const builder = event.recipes.gtceu.assembler(`kubejs:repair_t${minerTier}`)
            .itemInputs(`kubejs:microminer_t${minerTier}_damaged`)
            .itemOutputs(`kubejs:microminer_t${minerTier}`)
            .inputFluids(Fluid.of("gtceu:soldering_alloy", 36 * minerTierNumber))
            .duration(20 * repairDurations[minerTier])

        return builder;
    }

    repairing(6)
        .EUt(GTValues.VHA[GTValues.LuV])
        .chancedInput("2x gtceu:double_enderium_plate", 7000, 0)
        .chancedInput("kubejs:supercharged_laser_array", 3000, 0)
        .chancedItemInputLogic(ChanceLogic.XOR)

    repairing(7)
        .EUt(GTValues.VA[GTValues.LuV])
        .chancedInput("2x gtceu:double_cryolobus_plate", 4000, 0)
        .chancedInput("2x gtceu:double_naquadah_plate", 3000, 0)
        .chancedInput("kubejs:supercharged_laser_array", 3000, 0)
        .chancedItemInputLogic(ChanceLogic.XOR)

    repairing(8)
        .EUt(GTValues.VA[GTValues.ZPM])
        .chancedInput("2x monilabs:double_crystal_matrix_plate", 3000, 0)
        .chancedInput("2x gtceu:double_rhodium_plated_palladium_plate", 2500, 0)
        .chancedInput("2x gtceu:double_duranium_plate", 2000, 0)
        .chancedInput("2x kubejs:supercharged_laser_array", 2500, 0)
        .chancedItemInputLogic(ChanceLogic.XOR)

    // Combat miners always need repairs for engaging in combat
    repairing("2half")
        .EUt(GTValues.VHA[GTValues.EV])
        .chancedInput("2x gtceu:double_dark_steel_plate", 7000, 0)
        .chancedInput("minecraft:crossbow", 3000, 0)
        .chancedItemInputLogic(ChanceLogic.XOR)

    repairing("3half")
        .EUt(GTValues.VHA[GTValues.EV])
        .chancedInput("2x gtceu:dense_microversium_plate", 5000, 0)
        .chancedInput("2x gtceu:double_microversium_plate", 5000, 0)
        .chancedItemInputLogic(ChanceLogic.XOR)

    repairing("4half")
        .EUt(GTValues.VHA[GTValues.IV])
        .chancedInput("2x gtceu:double_lumium_plate", 3500, 0)
        .chancedInput("2x gtceu:double_hsse_plate", 3500, 0)
        .chancedInput("redstone_arsenal:flux_sword", 3000, 0)
        .chancedItemInputLogic(ChanceLogic.XOR)
})
