/**
 * Widget recipes for the Bountry Board
 */
ServerEvents.recipes(event => {
    event.shaped("kubejs:wooden_widget_left", [
        "SPP",
        "APP",
        "SPP"
    ], {
        P: "#minecraft:planks",
        S: "#minecraft:wooden_slabs",
        A: "#forge:tools/saws"
    }).noMirror().id("kubejs:bountiful/wooden_widget_left")
    event.shaped("kubejs:wooden_widget_right", [
        "PPS",
        "PPA",
        "PPS"
    ], {
        P: "#minecraft:planks",
        S: "#minecraft:wooden_slabs",
        A: "#forge:tools/saws",
    }).noMirror().id("kubejs:bountiful/wooden_widget_right")
    event.shaped("kubejs:wooden_widget", [
        "LGR"
    ], {
        L: "kubejs:wooden_widget_left",
        G: "enderio:wood_gear",
        R: "kubejs:wooden_widget_right"
    }).noMirror().id("kubejs:bountiful/wooden_widget")

    event.shaped("kubejs:stone_widget_up", [
        "SAS",
        "PPP",
        "PPP"
    ], {
        P: "minecraft:stone",
        S: "minecraft:stone_slab",
        A: "#forge:tools/hammers"
    }).id("kubejs:bountiful/stone_widget_up")
    event.shaped("kubejs:stone_widget_down", [
        "PPP",
        "PPP",
        "SAS"
    ], {
        P: "minecraft:stone",
        S: "minecraft:stone_slab",
        A: "#forge:tools/hammers",
    }).id("kubejs:bountiful/stone_widget_down")
    event.shaped("kubejs:stone_widget", [
        "U",
        "G",
        "D"
    ], {
        U: "kubejs:stone_widget_up",
        G: "enderio:stone_gear",
        D: "kubejs:stone_widget_down"
    }).id("kubejs:bountiful/stone_widget")
    event.shaped("kubejs:alloy_widget", [
        "WPW",
        "PGP",
        "WPW"
    ], {
        P: "gtceu:cupronickel_plate",
        W: "gtceu:electrum_single_cable",
        G: "gtceu:invar_gear"
    }).id("kubejs:bountiful/alloy_widget")

    if(doLaserIO) {
        event.shaped("kubejs:ender_widget", [
            "APB",
            "PGP",
            "PCP"
        ], {
            P: "gtceu:vibrant_alloy_plate",
            G: "gtceu:electrical_steel_gear",
            A: "laserio:card_item",
            B: "laserio:card_fluid",
            C: "laserio:card_redstone"
        }).id("kubejs:bountiful/ender_widget")
    }
})
