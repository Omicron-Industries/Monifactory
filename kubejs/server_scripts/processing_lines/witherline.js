/**
 * Recipes for Wither Bone Recycling.
 */
ServerEvents.recipes(event => {
    event.recipes.gtceu.macerator("macerate_wither_bone")
        .itemInputs("kubejs:wither_bone")
        .itemOutputs("2x enderio:withering_powder", "3x minecraft:bone_meal")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])
        .category("gtceu:macerator_recycling")
    event.recipes.gtceu.macerator("macerate_wither_rose")
        .itemInputs("minecraft:wither_rose")
        .chancedOutput("gtceu:bio_chaff", 500, 0)
        .chancedOutput("enderio:withering_powder", 200, 0)
        .duration(40)
        .EUt(GTValues.VA[GTValues.LV])
        .category("gtceu:macerator_recycling")

    event.recipes.gtceu.centrifuge("centrifuge_withering_powder")
        .itemInputs("8x enderio:withering_powder")
        .inputFluids("gtceu:formic_acid 1000")
        .itemOutputs("4x gtceu:coal_dust", "3x gtceu:stolzite_dust", "gtceu:arsenic_trioxide_dust")
        .chancedOutput("1x gtceu:biphenyl_dust", 5000, 0)
        .duration(18 * 20)
        .EUt(GTValues.VA[GTValues.HV])
})
