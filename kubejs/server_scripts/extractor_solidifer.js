/**
 * Extraction and solidification recipes for NC and GT
 */
ServerEvents.recipes(event => {
    // Solidified to Gas
    extractgas("neon", "kubejs:solidified_neon", Fluid.of("gtceu:neon", 1000));
    extractgas("krypton", "kubejs:solidified_krypton", Fluid.of("gtceu:krypton", 1000));
    extractgas("xenon", "kubejs:solidified_xenon", Fluid.of("gtceu:xenon", 1000));
    extractgas("argon", "kubejs:solidified_argon", Fluid.of("gtceu:argon", 1000));
    // Extract Nuclearcraft Isotopes
    extractisotope("uranium_233", "nuclearcraft:uranium_233", Fluid.of("gtceu:uranium_233", 144));
    extractisotope("plutonium_238", "nuclearcraft:plutonium_238", Fluid.of("gtceu:plutonium_238", 144))
    extractisotope("plutonium_242", "nuclearcraft:plutonium_242", Fluid.of("gtceu:plutonium_242", 144))
    extractisotope("neptunium_237", "nuclearcraft:neptunium_237", Fluid.of("gtceu:neptunium", 144));
    extractisotope("neptunium_236", "nuclearcraft:neptunium_236", Fluid.of("gtceu:neptunium", 144));
    extractisotope("curium_243", "nuclearcraft:curium_243", Fluid.of("gtceu:curium", 144));
    extractisotope("curium_245", "nuclearcraft:curium_245", Fluid.of("gtceu:curium", 144));
    extractisotope("americium_241", "nuclearcraft:americium_241", Fluid.of("gtceu:americium", 144));
    extractisotope("americium_242", "nuclearcraft:americium_242", Fluid.of("gtceu:americium", 144));
    extractisotope("americium_243", "nuclearcraft:americium_243", Fluid.of("gtceu:americium", 144));
    extractisotope("californium_250", "nuclearcraft:californium_250", Fluid.of("gtceu:californium", 144));
    extractisotope("californium_251", "nuclearcraft:californium_251", Fluid.of("gtceu:californium", 144));
    extractisotope("californium_252", "nuclearcraft:californium_252", Fluid.of("gtceu:californium", 144));

    function extractgas(recipename, input, output) {
        event.recipes.gtceu.extractor(recipename)
            .itemInputs(input)
            .outputFluids(output)
            .duration(200)
            .EUt(GTValues.VA[GTValues.LV])
    }
    function extractisotope(recipename, input, output) {
        event.recipes.gtceu.extractor(recipename)
            .itemInputs(input)
            .outputFluids(output)
            .duration(180)
            .EUt(6)
    }
})
