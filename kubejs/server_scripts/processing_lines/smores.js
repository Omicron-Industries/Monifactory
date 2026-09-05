/**
 * Smoreline :tr:
 */

ServerEvents.recipes(event => {
    // Milk Chocolate Making
    event.recipes.gtceu.macerator("kubejs:ground_cocoa_nibs")
        .itemInputs("nuclearcraft:roasted_cocoa_beans")
        .itemOutputs("nuclearcraft:ground_cocoa_nibs")
        .EUt(20)
        .duration(100)

    event.recipes.gtceu.electric_blast_furnace("kubejs:chocolate_liquor")
        .itemInputs("nuclearcraft:ground_cocoa_nibs")
        .itemOutputs("gtceu:tiny_carbon_dust")
        .outputFluids(Fluid.of("nuclearcraft:chocolate_liquor", 144))
        .duration(100)
        .blastFurnaceTemp(307)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.extractor("kubejs:cocoa_butter")
        .itemInputs("nuclearcraft:ground_cocoa_nibs")
        .itemOutputs("nuclearcraft:cocoa_solids")
        .outputFluids(Fluid.of("nuclearcraft:cocoa_butter", 144))
        .EUt(2)
        .duration(32)

    event.recipes.gtceu.mixer("kubejs:unsweetened_chocolate")
        .inputFluids(Fluid.of("nuclearcraft:chocolate_liquor", 144), Fluid.of("nuclearcraft:cocoa_butter", 144))
        .outputFluids(Fluid.of("nuclearcraft:unsweetened_chocolate", 288))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(100)

    event.recipes.gtceu.chemical_reactor("kubejs:milk_pasteurization")
        .inputFluids(Fluid.of("minecraft:milk", 1000), Fluid.of("gtceu:steam", 500))// TODO Change to forge tags for steam
        .notConsumable("2x gtceu:stainless_steel_plate")
        .outputFluids(Fluid.of("nuclearcraft:pasteurized_milk", 1000))
        .EUt(GTValues.VA[GTValues.HV])
        .duration(250)

    event.recipes.gtceu.mixer("kubejs:dark_chocolate")
        .inputFluids(Fluid.of("nuclearcraft:unsweetened_chocolate", 144), Fluid.of("nuclearcraft:sugar", 72))
        .outputFluids(Fluid.of("nuclearcraft:dark_chocolate", 144))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(100)

    event.recipes.gtceu.mixer("kubejs:milk_chocolate")
        .inputFluids(Fluid.of("nuclearcraft:dark_chocolate", 144), Fluid.of("nuclearcraft:pasteurized_milk", 250))
        .outputFluids(Fluid.of("nuclearcraft:milk_chocolate", 288))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(80)

    event.recipes.gtceu.fluid_solidifier("kubejs:solidify_chocolate")
        .inputFluids(Fluid.of("nuclearcraft:milk_chocolate", 144))
        .itemOutputs("nuclearcraft:milk_chocolate")
        .notConsumable("gtceu:plate_casting_mold")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])

    // Graham Cracker
    event.recipes.gtceu.compressor("kubejs:graham_cracker")
        .itemInputs("2x gtceu:wheat_dust")
        .itemOutputs("nuclearcraft:graham_cracker")
        .EUt(20)
        .duration(200)

    // Marshmallow
    event.recipes.gtceu.fluid_solidifier("kubejs:solid_marshmallow")
        .inputFluids(Fluid.of("nuclearcraft:marshmallow", 144))
        .itemOutputs("nuclearcraft:marshmallow")
        .notConsumable("gtceu:ball_casting_mold")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.mixer("kubejs:liquid_marshmallow")
        .inputFluids(Fluid.of("nuclearcraft:sugar", 72), Fluid.of("nuclearcraft:hydrated_gelatin", 144))
        .outputFluids(Fluid.of("nuclearcraft:marshmallow", 144))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(100)
    event.recipes.gtceu.extractor("kubejs:liquid_sugar")
        .itemInputs("minecraft:sugar")
        .outputFluids(Fluid.of("nuclearcraft:sugar", 144))
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(150)
    event.recipes.gtceu.mixer("kubejs:hydrated_gelatin")
        .inputFluids(Fluid.of("minecraft:water", 500), Fluid.of("nuclearcraft:gelatin", 144))
        .outputFluids(Fluid.of("nuclearcraft:hydrated_gelatin", 144))
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(45)
    event.recipes.gtceu.extractor("kubejs:gelatin")
        .itemInputs("gtceu:gelatin_dust")
        .outputFluids("nuclearcraft:gelatin 144")
        .EUt(GTValues.VA[GTValues.ULV])
        .duration(100)

    event.recipes.gtceu.extractor("kubejs:extract_milk")
        .notConsumable("minecraft:cow_spawn_egg")
        .outputFluids(Fluid.of("minecraft:milk", 5000))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(1000)

    // Smores
    event.shapeless("kubejs:smore_1", ["2x nuclearcraft:graham_cracker", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_1");
    event.shapeless("kubejs:smore_2", ["2x kubejs:smore_1", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_2");
    event.shapeless("kubejs:smore_4", ["2x kubejs:smore_2", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_4");
    event.shapeless("kubejs:smore_8", ["2x kubejs:smore_4", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_8");
    event.shapeless("kubejs:smore_16", ["2x kubejs:smore_8", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_16");
    event.shapeless("kubejs:smore_32", ["2x kubejs:smore_16", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_32");
    event.shapeless("kubejs:smore_64", ["2x kubejs:smore_32", "nuclearcraft:milk_chocolate", "nuclearcraft:marshmallow"]).id("kubejs:smore_64");
})
