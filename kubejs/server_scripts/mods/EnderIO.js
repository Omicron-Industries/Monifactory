/**
 * Custom recipes for EnderIO
 */
ServerEvents.recipes(event => {
    // General item replacement
    event.replaceInput({ id: /^enderio:/ }, "#forge:ingots/copper_alloy", "#forge:plates/electrical_steel")
    event.replaceInput({ id: /^enderio:/ }, "#forge:gears/iron", "enderio:iron_gear") // Infinity Bimetal Gear

    event.remove({ output: ["enderio:iron_gear", "enderio:energized_gear", "enderio:vibrant_gear", "enderio:dark_bimetal_gear"] })

    // Infinity Bimetal Gear
    event.recipes.gtceu.alloy_smelter("kubejs:infinity_gear")
        .itemInputs("gtceu:iron_gear", "2x enderio:grains_of_infinity")
        .itemOutputs("enderio:iron_gear")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    // Energized Bimetal Gear
    event.recipes.gtceu.alloy_smelter("kubejs:energetic_gear")
        .itemInputs("enderio:iron_gear", "4x gtceu:energetic_alloy_ingot")
        .itemOutputs("enderio:energized_gear")
        .duration(150)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    // Vibrant Bimetal Gear
    event.recipes.gtceu.alloy_smelter("kubejs:vibrant_gear")
        .itemInputs("enderio:energized_gear", "4x gtceu:vibrant_alloy_ingot")
        .itemOutputs("enderio:vibrant_gear")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    // Dark Bimetal Gear
    event.recipes.gtceu.alloy_smelter("kubejs:dark_bimetal_gear")
        .itemInputs("enderio:iron_gear", "4x gtceu:dark_steel_ingot")
        .itemOutputs("enderio:dark_bimetal_gear")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)


    event.remove({ output: ["enderio:pulsating_crystal", "enderio:vibrant_crystal"] })

    event.recipes.gtceu.autoclave("kubejs:vibrant_crystal")
        .itemInputs("minecraft:emerald")
        .inputFluids(Fluid.of("gtceu:vibrant_alloy", 144))
        .itemOutputs("enderio:vibrant_crystal")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.autoclave("kubejs:pulsating_crystal")
        .itemInputs("minecraft:diamond")
        .inputFluids(Fluid.of("gtceu:pulsating_alloy", 144))
        .itemOutputs("enderio:pulsating_crystal")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])

    // Capacitors
    event.remove({ output: "enderio:basic_capacitor" })

    const capacitorCores = [
        ["enderio:grains_of_infinity", 1],
        ["#gtceu:circuits/ulv", 2],
        ["gtceu:capacitor", 4],
        ["gtceu:smd_capacitor", 5],
        ["gtceu:advanced_smd_capacitor", 8],
        ["kubejs:complex_smd_capacitor", 12],
    ]

    capacitorCores.forEach(core => {
        event.shaped(`${core[1]}x enderio:basic_capacitor`, [
            " N ",
            "NCN",
            "W W"
        ], {
            N: "#forge:ingots/electrical_steel",
            C: core[0],
            W: "gtceu:tin_single_wire"
        }).id(`kubejs:basic_capacitor_${Item.of(core[0]).idLocation.path}_tin`)

        event.shaped(`${core[1]}x enderio:basic_capacitor`, [
            " N ",
            "NCN",
            "W W"
        ], {
            N: "#forge:ingots/electrical_steel",
            C: core[0],
            W: "gtceu:annealed_copper_single_wire"
        }).id(`kubejs:basic_capacitor_${Item.of(core[0]).idLocation.path}_copper`)
    })

    // Compressed caps
    event.shaped("kubejs:compressed_octadic_capacitor", [
        "CCC",
        "CCC",
        "CCC"
    ], {
        C: "enderio:octadic_capacitor"
    }).id("kubejs:compressed_octadic_capacitor")

    event.shaped("kubejs:double_compressed_octadic_capacitor", [
        "CCC",
        "CCC",
        "CCC"
    ], {
        C: "kubejs:compressed_octadic_capacitor"
    }).id("kubejs:double_compressed_octadic_capacitor")

    // make it use tags
    event.replaceInput({ id: "enderio:octadic_capacitor" }, "minecraft:glowstone", "#forge:storage_blocks/glowstone")

    // Fused Quartz
    event.recipes.gtceu.alloy_smelter("kubejs:fused_quartz")
        .itemInputs("3x minecraft:quartz")
        .notConsumable("gtceu:block_casting_mold")
        .itemOutputs("enderio:fused_quartz")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    // Clear Glass
    event.recipes.gtceu.alloy_smelter("kubejs:clear_glass_soda_ash")
        .itemInputs("minecraft:glass", "gtceu:tiny_soda_ash_dust")
        .itemOutputs("enderio:clear_glass")
        .duration(40)
        .EUt(GTValues.VHA[GTValues.LV])
    event.recipes.gtceu.alloy_smelter("kubejs:clear_glass_quicklime")
        .itemInputs("minecraft:glass", "gtceu:tiny_quicklime_dust")
        .itemOutputs("enderio:clear_glass")
        .duration(40)
        .EUt(GTValues.VHA[GTValues.LV])

    // Enlightened fused quartz
    event.recipes.gtceu.alloy_smelter("kubejs:enlightened_fused_quartz")
        .itemInputs("#enderio:fused_quartz", "minecraft:glowstone")
        .itemOutputs("enderio:fused_quartz_e")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    // dark fused quartz
    event.recipes.gtceu.alloy_smelter("kubejs:dark_fused_quartz")
        .itemInputs("#enderio:fused_quartz", "gtceu:black_quartz_gem")
        .itemOutputs("enderio:fused_quartz_d")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])
        .addMaterialInfo(true)

    // Enlightened clear glass
    event.recipes.gtceu.alloy_smelter("kubejs:enlightened_clear_glass")
        .itemInputs("#enderio:clear_glass", "minecraft:glowstone")
        .itemOutputs("enderio:clear_glass_e")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])

    // dark clear glass
    event.recipes.gtceu.alloy_smelter("kubejs:dark_clear_glass")
        .itemInputs("#enderio:clear_glass", "gtceu:black_quartz_gem")
        .itemOutputs("enderio:clear_glass_d")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])

    // chassis. "industrial machine chassis"
    event.remove({ output: "enderio:void_chassis" })
    event.recipes.gtceu.alloy_smelter("kubejs:void_chassis")
        .itemInputs("gtceu:lv_machine_hull", "2x enderio:grains_of_infinity")
        .itemOutputs("enderio:void_chassis")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    event.remove({ output: "enderio:ensouled_chassis" })
    event.recipes.gtceu.alloy_smelter("kubejs:ensouled_chassis")
        .itemInputs("enderio:void_chassis", "6x #forge:dusts/soularium")
        .itemOutputs("enderio:ensouled_chassis")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])


    // Enchanter
    event.remove({ output: ["enderio:enchanter"] })
    event.recipes.gtceu.shaped("enderio:enchanter", [
        "DCD",
        "BBB",
        " A "
    ], {
        A: "gtceu:palis_block",
        B: "gtceu:dark_steel_ingot",
        C: "minecraft:book",
        D: "minecraft:diamond"
    }).id("kubejs:enchanter")
        .addMaterialInfo()

    // Custom enchanter books
    event.custom(
        {
            "type": "enderio:enchanting",
            "cost_multiplier": 1,
            "enchantment": "ensorcellation:air_affinity",
            "input": {
                "count": 1,
                "ingredient": {
                    "item": "quark:bottled_cloud"
                }
            }
        })

    if (Platform.isLoaded("ulvcovm")) {
        event.custom(
            {
                "type": "enderio:enchanting",
                "cost_multiplier": 1,
                "enchantment": "ensorcellation:reach",
                "input": {
                    "count": 1,
                    "ingredient": {
                        "item": "ulvcovm:ulv_robot_arm"
                    }
                }
            })
    }

    // Yeta Wrench
    event.remove({ output: ["enderio:yeta_wrench"] })
    event.shaped("enderio:yeta_wrench", [
        "I I",
        " G ",
        " I "
    ], {
        I: "#forge:ingots/electrical_steel",
        G: "enderio:iron_gear"  // Infinity Bimetal Gear
    }).id("kubejs:yeta_wrench")

    // Soul Vials

    // Villager Soul Vial
    event.shaped(Item.of("enderio:filled_soul_vial", '{BlockEntityTag: {EntityStorage: {Entity: {id: "minecraft:villager"}}}}').strongNBT(), [
        " E ",
        "EVE",
        " E "
    ], {
        E: "minecraft:emerald",
        V: "enderio:empty_soul_vial"
    }).id("kubejs:villager_soul_vial")

    // Enderman Soul Vial
    event.shaped(Item.of("enderio:filled_soul_vial", '{BlockEntityTag: {EntityStorage: {Entity: {id: "minecraft:enderman"}}}}').strongNBT(), [
        " E ",
        "EVE",
        " E "
    ], {
        E: "enderio:enderman_head",
        V: "enderio:empty_soul_vial"
    }).id("kubejs:enderman_soul_vial")

    // Shulker Soul Vial
    event.shaped(Item.of("enderio:filled_soul_vial", '{BlockEntityTag: {EntityStorage: {Entity: {id: "minecraft:shulker"}}}}').strongNBT(), [
        " E ",
        "EVE",
        " E "
    ], {
        E: "minecraft:shulker_shell",
        V: "enderio:empty_soul_vial"
    }).id("kubejs:shulker_soul_vial")

    // Zombie Soul Vial
    event.shaped(Item.of("enderio:filled_soul_vial", '{BlockEntityTag: {EntityStorage: {Entity: {id: "minecraft:zombie"}}}}').strongNBT(), [
        " E ",
        "EVE",
        " E "
    ], {
        E: "minecraft:zombie_head",
        V: "enderio:empty_soul_vial"
    }).id("kubejs:zombie_soul_vial")

    // Ghast Soul Vial
    event.shaped(Item.of("enderio:filled_soul_vial", '{BlockEntityTag: {EntityStorage: {Entity: {id: "minecraft:ghast"}}}}').strongNBT(), [
        " E ",
        "EVE",
        " E "
    ], {
        E: "minecraft:ghast_tear",
        V: "enderio:empty_soul_vial"
    }).id("kubejs:ghast_soul_vial")

    // Witch Soul Vial
    event.shaped(Item.of("enderio:filled_soul_vial", '{BlockEntityTag: {EntityStorage: {Entity: {id: "minecraft:witch"}}}}').strongNBT(), [
        "GEG",
        "EVE",
        "GEG"
    ], {
        E: "minecraft:redstone",
        G: "minecraft:glowstone_dust",
        V: "enderio:empty_soul_vial"
    }).id("kubejs:witch_soul_vial")

    // Grains
    event.recipes.gtceu.macerator("kubejs:grains_of_prescience")
        .itemInputs("enderio:prescient_crystal")
        .itemOutputs("enderio:prescient_powder")
        .duration(400)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.macerator("kubejs:grains_of_vibrancy")
        .itemInputs("enderio:vibrant_crystal")
        .itemOutputs("enderio:vibrant_powder")
        .duration(300)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.macerator("kubejs:grains_of_piezallity")
        .itemInputs("enderio:pulsating_crystal")
        .itemOutputs("enderio:pulsating_powder")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.macerator("kubejs:grains_of_the_end")
        .itemInputs("enderio:ender_crystal")
        .itemOutputs("enderio:ender_crystal_powder")
        .duration(500)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.macerator("kubejs:grains_of_innocence")
        .itemInputs("enderio:enticing_crystal")
        .itemOutputs("kubejs:grains_of_innocence")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.LV])

    // Fluid of the Void (TODO: actually use EnderIO machines when they are totally definitely for sure ported to 1.20.1)

    event.recipes.gtceu.chemical_reactor("kubejs:dew_of_the_void")
        .itemInputs("enderio:pulsating_powder", "enderio:vibrant_powder")
        .inputFluids("thermal:ender 4000")
        .outputFluids("enderio:dew_of_the_void 2000")
        .duration(84)
        .EUt(GTValues.VHA[GTValues.LV])

    // Crafter
    event.replaceInput({ id: "enderio:crafter"}, "#forge:ingots/iron", "kubejs:resonating_crystal")
    event.replaceInput({ id: "enderio:crafter"}, "enderio:iron_gear", "enderio:vibrant_gear")


    // Z-Logic Controller
    event.shaped("enderio:z_logic_controller", [
        "SHS",
        "SCS",
        "WBW"
    ], {
        B: "gtceu:red_alloy_block",
        C: "#gtceu:circuits/mv",
        H: "minecraft:zombie_head",
        S: "#forge:ingots/soularium",
        W: "gtceu:silicon_wafer"
    }).id("kubejs:z_logic_controller")

    event.shaped("2x enderio:z_logic_controller", [
        "SHS",
        "SCS",
        "WBW"
    ], {
        B: "gtceu:red_alloy_block",
        C: "#gtceu:circuits/mv",
        H: "minecraft:zombie_head",
        S: "#forge:ingots/soularium",
        W: "gtceu:phosphorus_wafer"
    }).id("kubejs:z_logic_controller_2x")

    event.shaped("4x enderio:z_logic_controller", [
        "SHS",
        "SCS",
        "WBW"
    ], {
        B: "gtceu:red_alloy_block",
        C: "#gtceu:circuits/mv",
        H: "minecraft:zombie_head",
        S: "#forge:ingots/soularium",
        W: "gtceu:naquadah_wafer"
    }).id("kubejs:z_logic_controller_4x")

    event.shaped("8x enderio:z_logic_controller", [
        "SHS",
        "SCS",
        "WBW"
    ], {
        B: "gtceu:red_alloy_block",
        C: "#gtceu:circuits/mv",
        H: "minecraft:zombie_head",
        S: "#forge:ingots/soularium",
        W: "gtceu:neutronium_wafer"
    }).id("kubejs:z_logic_controller_8x")

    // glider wing
    event.replaceInput({ id: "enderio:glider_wing" }, "#forge:ingots/dark_steel", "#forge:nuggets/dark_steel")

    // staff of traveling
    event.replaceInput({ id: "enderio:staff_of_travelling" }, "#forge:ingots/dark_steel", "#forge:rods/dark_steel")
    event.replaceInput({ id: "enderio:staff_of_travelling" }, "enderio:ender_crystal", "enderio:pulsating_crystal")

    // travel anchor
    event.replaceInput({ id: "enderio:travel_anchor" }, "enderio:conduit_binder", "#forge:plates/vibrant_alloy")
    event.replaceInput({ id: "enderio:travel_anchor" }, "iron_ingot", "#forge:plates/dark_steel")

    // staff of levity
    event.replaceInput({ id: "enderio:staff_of_levity" }, "enderio:infinity_rod", "#forge:rods/dark_steel")

    // coordinate selector
    event.remove({ id: "enderio:coordinate_selector" })
    event.shaped("enderio:coordinate_selector", [
        "ABC",
        " DC",
        "  C"
    ], {
        A: "gtceu:mv_emitter",
        B: "#forge:plates/pulsating_alloy",
        C: "#forge:plates/electrical_steel",
        D: "enderio:iron_gear"
    }).id("kubejs:coordinate_selector")

    // soul binder
    event.remove({ id: "enderio:soul_binder" })
    event.recipes.extendedcrafting.shaped_table("enderio:soul_binder", [
        "AAAAA",
        "GBCBG",
        "ADHEA",
        "GBFBG",
        "AAZAA",
    ], {
        A: "#forge:plates/soularium",
        B: "#forge:plates/tungsten_steel",
        C: "enderio:enderman_head",
        D: "minecraft:creeper_head",
        E: "minecraft:zombie_head",
        F: "minecraft:skeleton_skull",
        G: "#forge:gears/energized",
        H: "enderio:ensouled_chassis",
        Z: "enderio:z_logic_controller"
    }).id("kubejs:soul_binder")

    // powered spawner
    event.remove({ id: "enderio:powered_spawner" })
    event.shaped("enderio:powered_spawner", [
        "ABA",
        "ACA",
        "DED"
    ], {
        A: "#forge:ingots/electrical_steel",
        B: "enderio:broken_spawner",
        C: "enderio:ensouled_chassis",
        D: "#forge:gems/vibrant_crystal",
        E: "enderio:z_logic_controller"
    }).modifyResult((grid, result) => {
        let input = grid.find("enderio:broken_spawner")
        return result.withNBT(input.nbt)
    }).id("kubejs:powered_spawner")

    // slicensplice
    event.replaceInput({ id: "enderio:slice_and_splice" }, "#forge:ingots/soularium", "#forge:plates/tungsten_steel")
    event.replaceInput({ id: "enderio:slice_and_splice" }, "iron_bars", "enderio:dark_steel_bars")

    // wired charger
    event.remove({ id: "enderio:wired_charger" })
    event.shaped("enderio:wired_charger", [
        "ABA",
        "EDE",
        "GEG"
    ], {
        A: "#forge:plates/dark_steel",
        B: "ae2:charger",
        G: "#forge:gears/energized",
        D: "enderio:void_chassis",
        E: "#forge:plates/electrical_steel"
    }).id("kubejs:wired_charger")

    // Experience Rod
    event.shaped("enderio:experience_rod", [
        "  V",
        " S ",
        "V  ",
    ], {
        S: "#forge:ingots/soularium",
        V: "#forge:ingots/vibrant_alloy"
    })

    // xp obelisk
    event.remove({ id: "enderio:xp_obelisk" })
    event.shaped("enderio:xp_obelisk", [
        " A ",
        "BCB",
        "DED"
    ], {
        A: "enderio:experience_rod",
        B: "#forge:ingots/energetic_alloy",
        C: "enderio:fluid_tank",
        D: "#forge:ingots/soularium",
        E: "enderio:ensouled_chassis"
    })

    // Clear tanks
    event.shapeless("enderio:fluid_tank", ["enderio:fluid_tank"])
    event.shapeless("enderio:pressurized_fluid_tank", ["enderio:pressurized_fluid_tank"])

    // Make End Steel Craftable in HV
    event.recipes.gtceu.chemical_bath("end_steel_ingot_cooling")
        .inputFluids("minecraft:water 100")
        .itemInputs("gtceu:hot_end_steel_ingot")
        .itemOutputs("gtceu:end_steel_ingot")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.HV])

    event.recipes.gtceu.chemical_bath("end_steel_ingot_distilled_cooling")
        .inputFluids("gtceu:distilled_water 100")
        .itemInputs("gtceu:hot_end_steel_ingot")
        .itemOutputs("gtceu:end_steel_ingot")
        .duration(125)
        .EUt(GTValues.VHA[GTValues.HV])

    // Enderios
    event.shapeless("enderio:enderios", ["minecraft:bowl", "minecraft:milk_bucket", "#forge:dusts/wheat", "#forge:dusts/ender_pearl"])

    // Dense Obsidian Plate for Reinforced Obsidian
    event.remove({ id: "gtceu:bender/bend_obsidian_plate_to_dense_plate" })
    event.recipes.gtceu.implosion_compressor("infinity_toolset/dense_obsidian_plate")
        .itemInputs("9x gtceu:obsidian_plate", "minecraft:tnt")
        .itemOutputs("gtceu:dense_obsidian_plate")
        .duration(20)
        .EUt(GTValues.VA[GTValues.LV])

    // Dark Steel Bars
    event.remove({ output: "enderio:dark_steel_bars" })
    event.shaped("3x enderio:dark_steel_bars", [
        " H ",
        "RRR",
        "RRR"
    ], {
        R: "gtceu:dark_steel_rod",
        H: "#forge:tools/hammers"
    })
    event.recipes.gtceu.assembler("dark_steel_bars")
        .itemInputs("6x gtceu:dark_steel_rod")
        .itemOutputs("3x enderio:dark_steel_bars")
        .duration(300)
        .EUt(4)
        .addMaterialInfo(true)

    // Reinforced Obsidian
    event.remove({ id: "enderio:reinforced_obsidian_block" })
    event.recipes.gtceu.shaped("enderio:reinforced_obsidian_block", [
        "IBI",
        "BPB",
        "IBI"
    ], {
        P: "gtceu:dense_obsidian_plate",
        B: "enderio:dark_steel_bars",
        I: "gtceu:double_titanium_tungsten_carbide_plate"
    }).addMaterialInfo()

    // Rock Breaker/Rock Cycle Simulator recipea or Grains of Infinity
    event.recipes.gtceu.rock_breaker("kubejs:rock_breaker_grains_of_infinity")
        .notConsumable("enderio:grains_of_infinity")
        .itemOutputs("enderio:grains_of_infinity")
        .duration(16)
        .EUt(GTValues.VA[GTValues.MV])
        .adjacentFluids("minecraft:lava", "enderio:dew_of_the_void")
        .posY(-64, -59)

    event.recipes.gtceu.rock_cycle_simulator("kubejs:rock_cycle_simulator_grains_of_infinity")
        .notConsumable("enderio:grains_of_infinity")
        .itemOutputs("enderio:grains_of_infinity")
        .duration(16)
        .EUt(GTValues.VA[GTValues.MV])
        .posY(-64, -59)
})
