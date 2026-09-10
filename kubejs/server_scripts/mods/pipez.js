/**
 * Custom recipes for the Pipez mod
 */

ServerEvents.recipes(event => {
    // Pipes
    event.recipes.gtceu.shaped(Item.of("pipez:item_pipe", 6), [
        "SGS",
        "PPP",
        "SGS"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:plates/gold",
        P: "gtceu:tin_small_item_pipe"
    }).id("pipez:item_pipe")

    event.recipes.gtceu.assembler("pipez:item_pipe")
        .itemInputs("4x #forge:plates/steel", "2x #forge:plates/gold", Item.of("gtceu:tin_small_item_pipe", 2))
        .itemOutputs(Item.of("pipez:item_pipe", 8))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * GTValues.SECONDS)
        .addMaterialInfo(true)

    event.recipes.gtceu.shaped(Item.of("pipez:fluid_pipe", 6), [
        "SGS",
        "PPP",
        "SGS"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:plates/cobalt",
        P: "gtceu:bronze_small_fluid_pipe"
    }).id("pipez:fluid_pipe")

    event.recipes.gtceu.assembler("pipez:fluid_pipe")
        .itemInputs("4x #forge:plates/steel", "2x #forge:plates/cobalt", Item.of("gtceu:bronze_small_fluid_pipe", 2))
        .itemOutputs(Item.of("pipez:fluid_pipe", 8))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * GTValues.SECONDS)
        .addMaterialInfo(true)

    event.recipes.gtceu.shaped(Item.of("pipez:energy_pipe", 6), [
        "SGS",
        "PPP",
        "SGS"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:plates/red_alloy",
        P: "gtceu:lead_double_cable"
    }).id("pipez:energy_pipe")

    event.recipes.gtceu.assembler("pipez:energy_pipe")
        .itemInputs("4x #forge:plates/steel", "2x #forge:plates/red_alloy", Item.of("gtceu:lead_double_cable", 2))
        .itemOutputs(Item.of("pipez:energy_pipe", 8))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * GTValues.SECONDS)
        .addMaterialInfo(true)

    // Upgrades
    // Defined in this very specific order to somehow make recursive MaterialInfo work.
    event.recipes.gtceu.shaped(Item.of("pipez:ultimate_upgrade", 3), [
        "GG",
        "UW",
        "SW"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:nuggets/brass",
        W: "gtceu:end_steel_quadruple_wire",
        U: "pipez:advanced_upgrade"
    }).id("pipez:ultimate_upgrade")

    event.recipes.gtceu.assembler("pipez:ultimate_upgrade")
        .itemInputs(Item.of("pipez:advanced_upgrade"), "#forge:plates/steel", "2x #forge:nuggets/brass", Item.of("gtceu:end_steel_quadruple_wire", 2))
        .itemOutputs(Item.of("pipez:ultimate_upgrade", 4))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20 * GTValues.SECONDS)
        .addMaterialInfo(true)

    event.recipes.gtceu.shaped(Item.of("pipez:advanced_upgrade", 3), [
        "GG",
        "UW",
        "SW"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:nuggets/brass",
        W: "gtceu:vibrant_alloy_quadruple_wire",
        U: "pipez:improved_upgrade"
    }).id("pipez:advanced_upgrade")

    event.recipes.gtceu.assembler("pipez:advanced_upgrade")
        .itemInputs(Item.of("pipez:improved_upgrade"), "#forge:plates/steel", "2x #forge:nuggets/brass", Item.of("gtceu:vibrant_alloy_quadruple_wire", 2))
        .itemOutputs(Item.of("pipez:advanced_upgrade", 4))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20 * GTValues.SECONDS)
        .addMaterialInfo(true)

    event.recipes.gtceu.shaped(Item.of("pipez:improved_upgrade", 3), [
        "GG",
        "UW",
        "SW"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:nuggets/brass",
        W: "gtceu:energetic_alloy_quadruple_wire",
        U: "pipez:basic_upgrade"
    }).id("pipez:improved_upgrade")

    event.recipes.gtceu.assembler("pipez:improved_upgrade")
        .itemInputs(Item.of("pipez:basic_upgrade"), "#forge:plates/steel", "2x #forge:nuggets/brass", Item.of("gtceu:energetic_alloy_quadruple_wire", 2))
        .itemOutputs(Item.of("pipez:improved_upgrade", 4))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20 * GTValues.SECONDS)
        .addMaterialInfo(true)

    event.recipes.gtceu.shaped(Item.of("pipez:basic_upgrade", 3), [
        "GG",
        "SW",
        "SW"
    ], {
        S: "#forge:plates/steel",
        G: "#forge:nuggets/brass",
        W: "gtceu:conductive_alloy_quadruple_wire"
    }).id("pipez:basic_upgrade")

    event.recipes.gtceu.assembler("pipez:basic_upgrade")
        .itemInputs("2x #forge:plates/steel", "2x #forge:nuggets/brass", Item.of("gtceu:conductive_alloy_quadruple_wire", 2))
        .itemOutputs(Item.of("pipez:basic_upgrade", 4))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(20 * GTValues.SECONDS)
        .addMaterialInfo(true)

    // Tools
    event.recipes.gtceu.shaped("pipez:wrench", [
        " P ",
        " RP",
        "N  "
    ], {
        P: "#forge:ingots/iron",
        R: "#forge:rods/long/lead",
        N: "#forge:nuggets/iron"
    }).id("pipez:wrench")

    event.recipes.gtceu.shaped("pipez:filter_destination_tool", [
        "DS",
        "SP"
    ], {
        P: "#forge:paper",
        D: "gtceu:computer_monitor_cover",
        S: "#forge:screws/iron",
    }).id("pipez:filter_destination_tool")
})
