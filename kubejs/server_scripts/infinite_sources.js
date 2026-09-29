/**
 * Custom recipes for stuff that generates infinite amount of something
 */
ServerEvents.recipes(event => {
    event.remove({ id: "watercollector:watercollector" })


    if (!doHarderRecipes) {
        event.recipes.gtceu.shaped("watercollector:watercollector", [
            "AAA",
            "B B",
            "AAA"
        ], {
            A: "gtceu:wrought_iron_plate",
            B: "minecraft:water_bucket"
        }).addMaterialInfo()
    }

    // Infinite Cobble/Water cells
    event.replaceInput({ id: "expatternprovider:water_cell" }, "minecraft:water_bucket", "gtceu:infinite_water_cover")
    event.replaceInput({ id: "expatternprovider:cobblestone_cell" }, "minecraft:water_bucket", "gtceu:infinite_water_cover")
    event.replaceInput({ id: "expatternprovider:water_cell" }, "minecraft:diamond", "gtceu:mythril_plate")
    event.replaceInput({ id: "expatternprovider:cobblestone_cell" }, "minecraft:diamond", "gtceu:mythril_plate")

})
