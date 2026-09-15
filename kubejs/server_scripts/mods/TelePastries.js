/**
 * Custom teleportation cakes recipes
 */
ServerEvents.recipes(event => {

    event.remove({ output: ["telepastries:nether_cake", "telepastries:overworld_cake", "telepastries:lost_city_cake", "telepastries:end_cake"] })

    // Cake Base
    event.shaped("enderio:cake_base", [
        "SMS",
        "WWW"
    ], {
        W: "gtceu:wheat_dust",
        S: "minecraft:sugar",
        M: "minecraft:milk_bucket"
    })

    // Overworld Cake
    event.shaped("telepastries:overworld_cake", [
        "NKN",
        "OBO",
        "SAS"
    ], {
        N: "minecraft:redstone",
        O: "#minecraft:saplings",
        B: "enderio:cake_base",
        S: "gtceu:plant_ball",
        A: "minecraft:diamond",
        K: "gtceu:gold_dust"
    })

    event.shaped("telepastries:lost_city_cake", [
        "NNN",
        "SBS",
        "SSS"
    ], {
        N: "minecraft:redstone",
        B: "enderio:cake_base",
        S: "minecraft:diamond",
    })

    // Void Cake
    event.shaped("telepastries:custom_cake", [
        "ABC",
        "DED",
        "FFF"
    ], {
        A: "gtceu:restonia_gem",
        B: "gtceu:palis_gem",
        C: "gtceu:emeradic_gem",
        D: "kubejs:pulsating_dust",
        E: "enderio:cake_base",
        F: "gtceu:aluminium_plate"
    })
    if (doHNN) {
        event.shaped("telepastries:nether_cake", [
            "NNN",
            "OBO",
            "SSS"
        ], {
            N: "gtceu:dark_steel_dust",
            O: "minecraft:obsidian",
            B: "enderio:cake_base",
            S: "minecraft:netherrack"
        })
    } else {
        event.shaped("telepastries:nether_cake", [
            "NNN",
            "OBO",
            "SSS"
        ], {
            N: "gtceu:steel_dust",
            O: "minecraft:obsidian",
            B: "enderio:cake_base",
            S: "minecraft:gold_block"
        })
    }

    event.shaped("telepastries:end_cake", [
        "NNN",
        "OBO",
        "SSS"
    ], {
        N: "gtceu:uraninite_dust",
        O: "minecraft:ender_eye",
        B: "enderio:cake_base",
        S: "gtceu:black_steel_plate"
    })
})
