/**
 * Loot Superfabricator multiblock
 */
ServerEvents.recipes(event => {
    function fabricator(prediction, circuit, output) {
        event.recipes.gtceu.loot_superfabricator(`kubejs:${prediction}_${circuit}`)
            .itemInputs(Item.of("hostilenetworks:prediction", `{data_model:{id:"hostilenetworks:${prediction}"}}`).weakNBT())
            .circuit(circuit)
            .itemOutputs(output)
            .duration(60) // same for all recipes
            .EUt(GTValues.VHA[GTValues.MV]) // same for all recipes
    }
    if (doHNN) {
        // //// Machine Recipe //////

        event.recipes.gtceu.shaped("gtceu:loot_superfabricator", [
            "BPB",
            "CSC",
            "BCB"
        ], {
            B: "gtceu:dark_steel_plate",
            C: "#gtceu:circuits/ev",
            P: "gtceu:ev_emitter",
            S: "hostilenetworks:loot_fabricator",
        }).id("gtceu:shaped/loot_superfabricator")
            .addMaterialInfo()

        event.recipes.gtceu.assembly_line("loot_quantumfabricator")
            .itemInputs("gtceu:atomic_casing", "6x gtceu:trinaquadalloy_plate", "4x gtceu:loot_superfabricator", "kubejs:heart_of_a_universe", "4x #gtceu:circuits/uhv", "2x gtceu:uv_robot_arm", "2x gtceu:uv_emitter", Item.of("kubejs:abyssal_energy_core", "{Damage:4000000}").weakNBT())
            .inputFluids("gtceu:living_soldering_alloy 576")
            .itemOutputs("gtceu:loot_quantumfabricator")
            .addMaterialInfo(true)
            .stationResearch(b => b
                .researchStack("gtceu:loot_superfabricator")
                .EUt(GTValues.VA[GTValues.UHV])
                .CWUt(108, 512000)
            )
            .duration(1200)
            .EUt(GTValues.VA[GTValues.UHV])

        // //// Fabricator Recipes //////

        fabricator("blaze", 1, "10x minecraft:blaze_rod")
        fabricator("blaze", 2, "32x gtceu:sulfur_dust")
        fabricator("blaze", 3, "32x minecraft:magma_block")
        fabricator("creeper", 1, "24x minecraft:gunpowder")
        fabricator("creeper", 2, "6x minecraft:creeper_head")
        fabricator("creeper", 3, "16x minecraft:coal")
        fabricator("drowned", 1, "64x minecraft:rotten_flesh")
        fabricator("drowned", 2, "24x minecraft:copper_ingot")
        fabricator("drowned", 3, "1x minecraft:nautilus_shell")
        fabricator("ender_dragon", 1, "2x minecraft:dragon_breath")
        fabricator("ender_dragon", 2, "kubejs:dragon_lair_data")
        fabricator("ender_dragon", 3, "4x kubejs:ender_dragon_scale")
        fabricator("enderman", 1, "6x minecraft:ender_pearl")
        fabricator("enderman", 2, "6x minecraft:emerald")
        fabricator("enderman", 3, "2x enderio:enderman_head")
        fabricator("enderman", 4, "kubejs:impossible_realm_data")
        fabricator("ghast", 1, "2x minecraft:ghast_tear")
        fabricator("ghast", 2, "12x gtceu:silver_ingot")
        fabricator("ghast", 3, "64x minecraft:gunpowder")
        fabricator("guardian", 1, "32x minecraft:prismarine_shard")
        fabricator("guardian", 2, "32x minecraft:prismarine_crystals")
        fabricator("guardian", 3, "64x minecraft:cod")
        fabricator("guardian", 4, "2x minecraft:wet_sponge")
        fabricator("shulker", 1, "6x minecraft:shulker_shell")
        fabricator("shulker", 2, "6x minecraft:diamond")
        fabricator("skeleton", 1, "64x minecraft:arrow")
        fabricator("skeleton", 2, "64x minecraft:bone")
        fabricator("skeleton", 3, "4x minecraft:skeleton_skull")
        fabricator("skeleton", 4, "8x gtceu:tin_ingot")
        fabricator("slime", 1, "32x minecraft:slime_ball")
        fabricator("slime", 2, "6x gtceu:nickel_ingot")
        fabricator("slime", 3, "3x gtceu:platinum_nugget")
        fabricator("spider", 1, "32x minecraft:string")
        fabricator("spider", 2, "16x minecraft:spider_eye")
        fabricator("spider", 3, "10x gtceu:zinc_ingot")
        fabricator("thermal/thermal_elemental", 1, "16x gtceu:saltpeter_dust")
        fabricator("thermal/thermal_elemental", 2, "16x gtceu:obsidian_dust")
        fabricator("thermal/thermal_elemental", 3, "64x minecraft:snowball")
        fabricator("thermal/thermal_elemental", 4, "8x thermal:blitz_rod")
        fabricator("thermal/thermal_elemental", 5, "8x thermal:basalz_rod")
        fabricator("thermal/thermal_elemental", 6, "8x thermal:blizz_rod")
        fabricator("warden", 1, "minecraft:sculk_catalyst")
        fabricator("warden", 2, "kubejs:deep_dark_data")
        fabricator("warden", 3, "kubejs:warden_horn")
        fabricator("witch", 1, "16x minecraft:redstone")
        fabricator("witch", 2, "16x minecraft:glowstone_dust")
        fabricator("witch", 3, "16x minecraft:sugar")
        fabricator("wither", 1, "kubejs:wither_realm_data")
        fabricator("wither", 2, "16x kubejs:wither_bone")
        fabricator("wither_skeleton", 1, "4x minecraft:wither_skeleton_skull")
        fabricator("wither_skeleton", 2, "12x gtceu:lead_ingot")
        fabricator("wither_skeleton", 3, "64x minecraft:coal")
        fabricator("zombie", 1, "40x minecraft:rotten_flesh")
        fabricator("zombie", 2, "12x minecraft:iron_ingot")
        fabricator("zombie", 3, "32x minecraft:carrot")
        fabricator("zombie", 4, "32x minecraft:potato")
        fabricator("zombie", 5, "6x minecraft:zombie_head")
        fabricator("zombified_piglin", 1, "64x minecraft:rotten_flesh")
        fabricator("zombified_piglin", 2, "3x minecraft:gold_ingot")
    }
})
