/**
 * Smoreline :tr:
 */

ServerEvents.recipes(event => {
    // Milk Chocolate Making
    event.recipes.gtceu.electric_blast_furnace("kubejs:chocolate_liquor")
        .itemInputs("2x minecraft:cocoa_beans")
        .itemOutputs("gtceu:tiny_carbon_dust")
        .outputFluids(Fluid.of("gtceu:chocolate_liquor", 250))
        .duration(100)
        .blastFurnaceTemp(307)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.chemical_reactor("kubejs:milk_pasteurization")
        .inputFluids(Fluid.of("minecraft:milk", 1000), Fluid.of("gtceu:steam", 500))// TODO Change to forge tags for steam
        .notConsumable("2x gtceu:stainless_steel_plate")
        .outputFluids(Fluid.of("gtceu:pasteurized_milk", 1000))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(250)

    event.recipes.gtceu.mixer("kubejs:milk_chocolate")
        .itemInputs("minecraft:sugar")
        .inputFluids(Fluid.of("gtceu:chocolate_liquor", 250), Fluid.of("gtceu:pasteurized_milk", 250))
        .outputFluids(Fluid.of("gtceu:milk_chocolate", 288))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(80)

    event.recipes.gtceu.fluid_solidifier("kubejs:solidify_chocolate")
        .inputFluids(Fluid.of("gtceu:milk_chocolate", 144))
        .itemOutputs("kubejs:milk_chocolate")
        .notConsumable("gtceu:plate_casting_mold")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])

    // Graham Cracker
    event.recipes.gtceu.compressor("kubejs:graham_cracker")
        .itemInputs("2x gtceu:wheat_dust")
        .itemOutputs("kubejs:graham_cracker")
        .EUt(20)
        .duration(200)

    // Marshmallow
    event.recipes.gtceu.fluid_solidifier("kubejs:solid_marshmallow")
        .inputFluids(Fluid.of("gtceu:marshmallow", 144))
        .itemOutputs("kubejs:marshmallow")
        .notConsumable("gtceu:ball_casting_mold")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.mixer("kubejs:liquid_marshmallow")
        .itemInputs("gtceu:gelatin_dust", "minecraft:sugar")
        .inputFluids(Fluid.of("minecraft:water", 500))
        .outputFluids(Fluid.of("gtceu:marshmallow", 288))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(300)

    event.recipes.gtceu.extractor("kubejs:extract_milk")
        .notConsumable("minecraft:cow_spawn_egg")
        .outputFluids(Fluid.of("minecraft:milk", 5000))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(1000)

    // Smores
    event.shapeless("kubejs:smore_1", ["2x kubejs:graham_cracker", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_1");
    event.shapeless("kubejs:smore_2", ["2x kubejs:smore_1", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_2");
    event.shapeless("kubejs:smore_4", ["2x kubejs:smore_2", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_4");
    event.shapeless("kubejs:smore_8", ["2x kubejs:smore_4", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_8");
    event.shapeless("kubejs:smore_16", ["2x kubejs:smore_8", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_16");
    event.shapeless("kubejs:smore_32", ["2x kubejs:smore_16", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_32");
    event.shapeless("kubejs:smore_64", ["2x kubejs:smore_32", "kubejs:milk_chocolate", "kubejs:marshmallow"]).id("kubejs:smore_64");
})
