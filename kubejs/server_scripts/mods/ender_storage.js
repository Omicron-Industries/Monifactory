/**
 * Recipes for Ender Tanks and Ender Chests.
 */

ServerEvents.recipes(event => {
    // Ender Chest and Tank (gives the full slot version)
    // event.remove({ output: ["endertanks:ender_tank", "enderchests:ender_chest"] })

    // Chest
    event.recipes.gtceu.shaped("enderchests:ender_chest", [
        "ABA",
        "DED",
        "AFA"
    ], {
        A: "minecraft:blaze_rod",
        B: "#minecraft:wool",
        D: "minecraft:obsidian",
        E: "gtceu:aluminium_crate",
        F: "gtceu:ender_pearl_block"
    }).id("enderchests:ender_chest").addMaterialInfo()

    // Pouch
    event.shaped("enderchests:ender_bag", [
        "ABA",
        "DED",
        "AFA"
    ], {
        A: "minecraft:blaze_powder",
        B: "#minecraft:wool",
        D: "gtceu:dense_obsidian_plate",
        E: "enderchests:ender_pouch",
        F: "gtceu:ender_eye_plate"
    }).id("enderchests:ender_bag")

    // Tank
    event.recipes.gtceu.shaped("endertanks:ender_tank", [
        "ABA",
        "DED",
        "AFA"
    ], {
        A: "minecraft:blaze_rod",
        B: "#minecraft:wool",
        D: "minecraft:obsidian",
        E: "gtceu:aluminium_drum",
        F: "gtceu:ender_pearl_block"
    }).id("endertanks:tank").addMaterialInfo()

    // Bucket
    event.shaped("endertanks:ender_bucket", [
        "ABA",
        "DED",
        "AFA"
    ], {
        A: "minecraft:blaze_powder",
        B: "#minecraft:wool",
        D: "gtceu:dense_obsidian_plate",
        E: "minecraft:bucket",
        F: "gtceu:ender_eye_plate"
    }).id("endertanks:bucket")
})
