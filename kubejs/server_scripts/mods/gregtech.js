/**
 * Custom recipes for GT
 */
ServerEvents.recipes(event => {

    event.shapeless("gtceu:red_alloy_dust", ["gtceu:copper_dust", "4x minecraft:redstone"]).id("kubejs:shapeless/red_alloy_dust")

    event.recipes.gtceu.extractor("one_experience_fluid")
        .itemInputs("kubejs:solidified_experience")
        .outputFluids(Fluid.of("enderio:xp_juice", 140))
        .duration(80)
        .EUt(GTValues.VA[GTValues.LV])

    // HNN MATTERS
    if (doHNN) {
        event.recipes.gtceu.extractor("overworld_fluid")
            .itemInputs("hostilenetworks:overworld_prediction")
            .outputFluids(Fluid.of("enderio:xp_juice", 200))
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.extractor("nether_experience_fluid")
            .itemInputs("hostilenetworks:nether_prediction")
            .outputFluids(Fluid.of("enderio:xp_juice", 400))
            .duration(80)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.extractor("ender_experience_fluid")
            .itemInputs("hostilenetworks:end_prediction")
            .outputFluids(Fluid.of("enderio:xp_juice", 500))
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])
    }

    event.recipes.gtceu.fluid_solidifier("one_experience_solid")
        .itemOutputs("kubejs:solidified_experience")
        .inputFluids(Fluid.of("enderio:xp_juice", 140))
        .notConsumable("gtceu:ball_casting_mold")
        .duration(500)
        .EUt(GTValues.VHA[GTValues.LV])

    // NETHER STAR RECIPES
    event.remove({ id: "hostilenetworks:living_matter/extraterrestrial/nether_star" })
    event.remove({ id: "gtceu:implosion_compressor/implodedust_nether_star_tnt" })

    event.recipes.gtceu.forge_hammer("nether_star_block_to_star")
        .itemInputs("gtceu:nether_star_block")
        .itemOutputs("9x minecraft:nether_star")
        .duration(100)
        .EUt(24)

    event.recipes.gtceu.implosion_compressor("implosion_star_tnt")
        .itemInputs("4x gtceu:nether_star_dust", "2x minecraft:tnt", "#forge:small_dusts/dark_ash")
        .itemOutputs("3x minecraft:nether_star")
        .duration(20)
        .EUt(GTValues.VA[GTValues.LV])

    // Other Quantum Flux Recipes
    event.recipes.gtceu.mixer("quantum_flux_hm")
        .itemInputs("redstone_arsenal:flux_gem")
        .inputFluids(Fluid.of("gtceu:mana", 250))
        .itemOutputs("8x kubejs:quantum_flux")
        .duration(100)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.large_chemical_reactor("kubejs:omnic_quantum_flux")
        .itemInputs("redstone_arsenal:flux_gem", "4x kubejs:primal_mana", "gtceu:nether_star_dust")
        .inputFluids("gtceu:dragon_breath 500")
        .itemOutputs("64x kubejs:quantum_flux")
        .duration(50)
        .EUt(GTValues.VA[GTValues.EV])

    // Remove Hot MV ingots (And molten fluid counterpart)
    event.remove([
        { id: /^gtceu:vacuum_freezer\/.*kanthal/ },
        { id: /^gtceu:vacuum_freezer\/.*silicon/ },
        { id: /^gtceu:chemical_bath\/.*kanthal.*cool/ },
        { id: /^gtceu:chemical_bath\/.*silicon.*cool/ }
    ])
    event.replaceOutput({}, "gtceu:hot_silicon_ingot", "gtceu:silicon_ingot")
    event.replaceOutput({}, "gtceu:hot_kanthal_ingot", "gtceu:kanthal_ingot")
    // When replacing fluids, the quantity of the replacing fluid needs to be specified. Else it defaults to 1 bucket.
    event.replaceOutput({id: /^gtceu:alloy_blast_smelter\/kanthal.*/}, Fluid.of("gtceu:molten_kanthal"), Fluid.of("gtceu:kanthal", 432))

    // Steel Machine Casing
    event.remove({ input: "gtceu:steel_machine_casing" })
    event.remove({ output: "gtceu:steel_machine_casing" })

    // Ender Pearl dust Electrolysis
    // event.remove({ id: 'gtceu:electrolyzer/decomposition_electrolyzing_ender_pearl' })

    // rock breaker
    const generateRockBreakerStoneRecipe = (stoneItem) => {
        event.recipes.gtceu.rock_breaker(`kubejs:rock_breaker_${stoneItem.replace(":", "_")}`)
            .notConsumable(stoneItem)
            .itemOutputs(stoneItem)
            .duration(16)
            .EUt(GTValues.VHA[GTValues.MV])
            .adjacentFluids("minecraft:lava", "minecraft:water")
    }

    generateRockBreakerStoneRecipe("minecraft:calcite")
    generateRockBreakerStoneRecipe("minecraft:tuff")
    generateRockBreakerStoneRecipe("quark:jasper")
    generateRockBreakerStoneRecipe("quark:limestone")
    generateRockBreakerStoneRecipe("quark:permafrost")
    generateRockBreakerStoneRecipe("quark:shale")
    generateRockBreakerStoneRecipe("quark:myalite")
})
