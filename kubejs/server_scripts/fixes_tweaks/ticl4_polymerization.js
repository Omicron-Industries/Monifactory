/**
 * A little bit of software wizardry that alters any Titanium Tetrachloride-boosted polymerization recipes in LCRs
 * to use 1/4 of the TiCl4 they normally do.
 */
ServerEvents.recipes(event => {
    // Get all GTCEu Assembler recipes with an ID matching the regex
    event.findRecipes({ id: /^gtceu:large_chemical_reactor\/[\w_]+_from_tetrachloride/, type: "gtceu:large_chemical_reactor" }).forEach(supercon_coil_recipe => {
        // Get the JSON array object representing all of the fluid ingredients
        let fluidIngredients = supercon_coil_recipe.json.getAsJsonObject("inputs").getAsJsonArray("fluid")
        for (let i = 0; i < fluidIngredients.size(); i++) {
            // Fluid ingredient to alter if it includes "forge:titanium_tetrachloride" as a tag
            let curFluidIngredient = fluidIngredients.get(i).getAsJsonObject("content")

            // Get the original Trinium fluid amount
            let fluidAmount = curFluidIngredient.getAsJsonPrimitive("amount").asInt

            // Confirm that we are indeed altering a fluid ingredient that contains the "forge:titanium_tetrachloride" tag
            let fluidIngredient = curFluidIngredient.getAsJsonArray("value")
            for (let j = 0; j < fluidIngredient.size(); j++) {
                if (fluidIngredient.get(j).getAsJsonPrimitive("tag").asString == "forge:titanium_tetrachloride") {
                    // Change fluid ingredient to 1/2 the amount if it does match
                    curFluidIngredient.remove("amount")
                    curFluidIngredient["addProperty(java.lang.String,java.lang.Number)"]("amount", fluidAmount / 25)
                }
            }
        }
    })
})
