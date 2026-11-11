/**
 * Fixes upstream GregTech recipe conflicts.
 */

ServerEvents.recipes((event) => {
    // Fix the conflict between a formic acid and sodium bicarbonate recipe.
    // This fixes the upstream GTM issue "Recipe conflict between Formic Acid
    // and Sodium Bicarbonate Dust":
    // https://github.com/GregTechCEu/GregTech-Modern/issues/4823
    //
    // The fix we employ here is to simply add a circuit 1 to formic acid.
    //
    // This conflict only exists in Normal Mode, as Hard Mode+ changes the
    // recipe in ../_hardmode/platline.js.
    if (!doHarderProcessing) {
        event.recipes.gtceu
            .chemical_reactor("formic_acid")
            .inputFluids("gtceu:carbon_dioxide 1000", "minecraft:water 1000")
            .outputFluids("gtceu:formic_acid 1000", "gtceu:oxygen 1000")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])
            .circuit(1);
    }
});
