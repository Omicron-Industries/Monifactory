/**
 * Makes RTM coils not suck as much.
 */

ServerEvents.recipes(event => {
    // Change Tungsten and its alloys to require RTM coils to smelt
    event.findRecipes({ id: /(electric_blast_furnace|alloy_blast_smelter)\/[\w_]*tungsten/ }).forEach(recipe => {
        let oldTemp = recipe.json.getAsJsonObject("data").getAsJsonPrimitive("ebf_temp").asInt
        let newTemp = oldTemp <= 3600 ? oldTemp + 900 : oldTemp
        recipe.json.getAsJsonObject("data").remove("ebf_temp")
        recipe.json.getAsJsonObject("data")["addProperty(java.lang.String,java.lang.Number)"]("ebf_temp", newTemp)
    })

    // Make RTM blasting recipes faster than HSS-G
    event.findRecipes({ id: /(electric_blast_furnace|alloy_blast_smelter)\/[\w_]*rtm_alloy/ }).forEach(recipe => {
        let oldDur = recipe.json.getAsJsonPrimitive("duration").asInt
        let newDur = oldDur * 55 / 70
        recipe.json.remove("duration")
        recipe.json["addProperty(java.lang.String,java.lang.Number)"]("duration", newDur)
    })

    // Make HSS-G coils require liquid Ruthenium. ReplaceInput does not work with fluids
    event.recipes.gtceu.assembler("coil_hssg")
        .itemInputs("8x gtceu:hssg_double_wire", "8x gtceu:tungsten_carbide_foil")
        .inputFluids("gtceu:ruthenium 144")
        .itemOutputs("gtceu:hssg_coil_block")
        .duration(30 * 20)
        .EUt(GTValues.VA[GTValues.IV])
})
