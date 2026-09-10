/**
 * In Moni, some types of plasma from base GregTech: Modern are over- or under-powered.
 * This file rebalances some of their recipes so that there's a more meaningful progression.
 */

ServerEvents.recipes(event => {
    // Nerf Helium Plasma EU per mB to a little under half its original value
    event.recipes.gtceu.plasma_generator("helium")
        .inputFluids("gtceu:helium_plasma 1")
        .outputFluids("gtceu:helium 1")
        .EUt(-GTValues.V[GTValues.EV])
        .duration(0.8 * 20)

    // Change plasma fusion recipes to input/output multiples of 144mB for metals instead of 16mB
    event.findRecipes({ type: "gtceu:fusion_reactor"}).forEach(recipe => {
        let isPlasmaRecipe = false;

        let fluidOutputs = recipe.json.getAsJsonObject("outputs").getAsJsonArray("fluid")
        // See if this recipe is actually a plasma recipe (Recipe ID is misleading, sometimes includes keyword "plasma" when recipe does not involve plasma)
        fluidOutputs.forEach(fluidOutput => {
            let content = fluidOutput.getAsJsonObject("content")
            let value = content.getAsJsonArray("value")
            value.forEach(fluidValue => {
                let fluidType = fluidValue.getAsJsonPrimitive("fluid").asString
                if(fluidType.includes("plasma")) isPlasmaRecipe = true
            })
        })

        // Modify fluid I/O if it's indeed a plasma recipe
        fluidOutputs.forEach(fluidOutput => {
            let content = fluidOutput.getAsJsonObject("content")
            let amount = content.getAsJsonPrimitive("amount").asInt
            if(amount == 16 && isPlasmaRecipe) {
                content.remove("amount")
                content["addProperty(java.lang.String,java.lang.Number)"]("amount", 144)
            }
        })

        let fluidIngredients = recipe.json.getAsJsonObject("inputs").getAsJsonArray("fluid")
        fluidIngredients.forEach(fluidIngredient => {
            let content = fluidIngredient.getAsJsonObject("content")
            let amount = content.getAsJsonPrimitive("amount").asInt
            if(amount == 16 && isPlasmaRecipe) {
                content.remove("amount")
                content["addProperty(java.lang.String,java.lang.Number)"]("amount", 144)
            }
        })
    })

    // Add Beryllium Plasma
    event.recipes.gtceu.fusion_reactor("lithium_and_deuterium_to_beryllium_plasma")
        .inputFluids("gtceu:lithium 144", "gtceu:deuterium 125")
        .outputFluids("gtceu:beryllium_plasma 144")
        .EUt(0.75 * GTValues.VA[GTValues.IV])
        .duration(1.6 * 20)
        .fusionStartEU(100000000)

    event.recipes.gtceu.plasma_generator("beryllium")
        .inputFluids("gtceu:beryllium_plasma 1")
        .outputFluids("gtceu:beryllium 1")
        .EUt(-GTValues.V[GTValues.EV])
        .duration(0.8 * 20)
})
