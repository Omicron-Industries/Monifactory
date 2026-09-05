/**
 * Script for generating recipes for stabilized microminers.
 */
ServerEvents.recipes(event => {
    const stabilized_miners = [
        "2half",
        "3half",
        "4half",
        "6",
        "7",
        "8"
    ]

    /**
     * Function for making a stabilized miner assembly line recipe.
     * @param {string} minerTier The tier of miner to generate a stabilized matter recipe for. Typically a string representation of a number.
     */
    function stabilized_miner_recipe(minerTier) {
        event.recipes.gtceu.assembly_line(`stable_t_${minerTier}`)
            .itemInputs(`kubejs:microminer_t${minerTier}`, "kubejs:heart_of_a_universe", "2x kubejs:hadal_shard", "8x gtceu:uv_field_generator", "7x gtceu:dense_iridium_plate", "7x gtceu:dense_iridium_plate")
            .inputFluids("gtceu:rocket_fuel 40800", "gtceu:omnium 576", "gtceu:neutronium 576")
            .itemOutputs(`kubejs:stabilized_microminer_t${minerTier}`)
            .duration(120)
            .EUt(GTValues.VA[GTValues.UHV])
    }

    stabilized_miners.forEach((minerTier) => {
        stabilized_miner_recipe(minerTier);
    });
})
