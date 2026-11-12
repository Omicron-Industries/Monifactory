/**
 * Processing line for Prismarine (Previously Guardian Scales)
 */
ServerEvents.recipes(event => {
    event.recipes.gtceu.mixer("prismarine_slurry_mix")
        .itemInputs("8x minecraft:prismarine_shard", "2x minecraft:prismarine_crystals")
        .inputFluids("gtceu:aqua_regia 3000")
        .outputFluids("gtceu:prismarine_slurry 6000")
        .duration(14 * 20)
        .EUt(GTValues.VA[GTValues.MV])

    // Cupric Oxide and Cobalt Oxide are the useful minerals from which Guardian Scales derive their hue
    // Antimony Trifluoride and Potassium Iodide added as nice byproducts to have
    event.recipes.gtceu.centrifuge("prismarine_slurry_centrifuge")
        .inputFluids("gtceu:prismarine_slurry 6000")
        .itemOutputs("2x gtceu:cupric_oxide_dust")
        .itemOutputs("gtceu:potassium_iodide_dust")
        .chancedOutput("gtceu:cobalt_oxide_dust", 9000, 0)
        .chancedOutput("gtceu:antimony_trifluoride_dust", 4000, 0)
        .outputFluids("gtceu:chitinous_mixture 4000")
        .duration(10 * GTValues.SECONDS)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.cracker("crack_chitinous_mixture")
        .inputFluids("gtceu:chitinous_mixture", "#forge:steam 1000")
        .outputFluids("gtceu:cracked_chitinous_mixture 1250")
        .duration(4 * GTValues.SECONDS)
        .EUt(GTValues.VA[GTValues.MV])

    // Acetic Acid and Glucosamine come from breaking up Chitin via hydrogenolysis in the Cracker
    // Nitrosyl Chloride and Diluted Hydrochloric Acid are the products of Aqua Regia transformed in the reaction
    event.recipes.gtceu.distillation_tower("chitinous_mixture_distillation")
        .inputFluids("gtceu:cracked_chitinous_mixture 5000")
        .itemOutputs("gtceu:glucosamine_dust")
        .outputFluids("gtceu:acetic_acid 750", "gtceu:nitrous_acid 2500", "minecraft:water 1000", "gtceu:hydrochloric_acid 1750")
        .duration(10 * GTValues.SECONDS)
        .EUt(GTValues.VA[GTValues.LV])
})
