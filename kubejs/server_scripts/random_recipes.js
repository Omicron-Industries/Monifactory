/** THIS FILE IS FOR RANDOM RECIPES THAT DOESNT REQUIRE THEIR OWN FILE */

ServerEvents.recipes(event => {

    // Snad
    if (doSnad) {
        if (doHarderRecipes) {
            event.shapeless("snad:snad", ["2x kubejs:double_compressed_sand", "enderio:pulsating_crystal"]).id("snad:snad")
            event.shapeless("snad:red_snad", ["2x kubejs:double_compressed_red_sand", "enderio:pulsating_crystal"]).id("snad:red_snad")
        } else {
            event.shapeless("snad:snad", ["2x kubejs:double_compressed_sand"]).id("snad:snad")
            event.shapeless("snad:red_snad", ["2x kubejs:double_compressed_red_sand"]).id("snad:red_snad")

            // If Snad is obtainable pre-autoclave, so must be the Vacuum Chest.
            event.replaceInput({ id: "enderio:vacuum_chest" }, "enderio:pulsating_crystal", "gtceu:tin_rotor")
        }
    } else {
        event.remove({ id: "snad:snad" })
        event.remove({ id: "snad:red_snad" })
    }


    // snaded sand snad
    compacting(event, "kubejs:compressed_sand", "minecraft:sand");
    compacting(event, "kubejs:double_compressed_sand", "kubejs:compressed_sand");

    // red snaded red sand red snad
    compacting(event, "kubejs:compressed_red_sand", "minecraft:red_sand");
    compacting(event, "kubejs:double_compressed_red_sand", "kubejs:compressed_red_sand");

    // Glider
    event.replaceInput({ id: "hangglider:glider_framework" }, "minecraft:iron_ingot", "gtceu:iron_rod")
    event.replaceInput({ id: "gtceu:shaped/basic_circuit_board" }, "gtceu:copper_single_wire", "gtceu:fine_copper_wire")

    // Void Air (normal air)
    event.recipes.gtceu.gas_collector("void_air")
        .dimension("javd:void")
        .outputFluids(Fluid.of("gtceu:air", 10000))
        .circuit(4)
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(200)

    // Lost Cities Air (normal air)
    event.recipes.gtceu.gas_collector("lc_air")
        .dimension("lostcities:lostcity")
        .outputFluids(Fluid.of("gtceu:air", 10000))
        .circuit(5)
        .EUt(GTValues.VHA[GTValues.LV])
        .duration(200)

    // Nerfed Ender Air distillation - less Tritium
    event.recipes.gtceu.distillation_tower("distill_liquid_ender_air")
        .inputFluids("gtceu:liquid_ender_air 200000")
        .outputFluids("gtceu:nitrogen_dioxide 128000", "gtceu:deuterium 50000", "gtceu:helium 15000", "gtceu:tritium 4000", "gtceu:krypton 1000", "gtceu:xenon 1000", "gtceu:radon 1000")
        .chancedOutput("gtceu:ender_pearl_dust", 1000, 0)
        .EUt(GTValues.VA[GTValues.IV])
        .duration(100 * 20)

    // Netherrack
    event.recipes.gtceu.chemical_reactor("dust_to_netherrack")
        .itemInputs("kubejs:dust")
        .inputFluids(Fluid.of("minecraft:lava", 1000))
        .itemOutputs("minecraft:netherrack")
        .duration(20)
        .EUt(GTValues.VA[GTValues.LV])

    // Lava from Magma
    event.recipes.gtceu.chemical_reactor("lava_from_magma")
        .itemInputs("minecraft:magma_block")
        .outputFluids(Fluid.of("minecraft:lava", 1000))
        .EUt(GTValues.VA[GTValues.LV])
        .duration(120)

    // Slime ball from plant ball
    event.smelting("2x minecraft:slime_ball", "gtceu:plant_ball")

    // Blazerod Shenanigans
    event.shapeless("minecraft:blaze_rod", "minecraft:brewing_stand")
    event.replaceInput({ input: "gtceu:wood_plate" }, "gtceu:wood_plate", "#minecraft:planks")

    // Processing for Ender Spores
    if (!doHNN) {
        event.shapeless("kubejs:ender_spore", ["minecraft:chorus_flower", "minecraft:ender_pearl", "thermal:phytogro", "minecraft:experience_bottle"])
        event.smelting("minecraft:ender_pearl", "kubejs:ender_spore")

        event.custom({
            "type": "thermal:insolator",
            "ingredient": {
                "item": "kubejs:ender_spore"
            },
            "result": [
                {
                    "item": "kubejs:ender_spore",
                    "chance": 2.0
                }
            ],
            "energy_mod": 3.0
        })

        event.recipes.gtceu.greenhouse("kubejs:greenhouse_boosted_ender_spore")
            .circuit(2)
            .notConsumable("kubejs:ender_spore")
            .itemInputs("4x gtceu:fertilizer")
            .inputFluids(Fluid.of("minecraft:water"))
            .itemOutputs("8x kubejs:ender_spore")
            .duration(640)
            .EUt(GTValues.VA[GTValues.MV])
    }

    // Change recipes for LV and MV macerators
    event.shaped("gtceu:lv_macerator", [
        "PMB",
        "WWH",
        "CCW"
    ], {
        P: "gtceu:lv_electric_piston",
        M: "gtceu:lv_electric_motor",
        B: "gtceu:wrought_iron_buzz_saw_blade",
        W: "gtceu:tin_single_cable",
        H: "gtceu:lv_machine_hull",
        C: "#gtceu:circuits/lv"
    }).id("gtceu:shaped/lv_macerator")

    event.shaped("gtceu:mv_macerator", [
        "PMB",
        "WWH",
        "CCW"
    ], {
        P: "gtceu:mv_electric_piston",
        M: "gtceu:mv_electric_motor",
        B: "gtceu:steel_buzz_saw_blade",
        W: "gtceu:copper_single_cable",
        H: "gtceu:mv_machine_hull",
        C: "#gtceu:circuits/mv"
    }).id("gtceu:shaped/mv_macerator")

    // Change recipes for end game diodes to use complex smd diodes
    event.findRecipes({ id: /gtceu:shaped\/(uiv|max)_diode/ }).forEach(recipe => {
        recipe.replaceInput("gtceu:advanced_smd_diode", "kubejs:complex_smd_diode")
    })

    // Implement Cryolobus smelting
    event.remove({ id: "gtceu:electric_blast_furnace/blast_cryolobus" })
    event.remove({ id: "gtceu:electric_blast_furnace/blast_cryolobus_gas" })
    const cryolobusFuels = [
        [500, 1600, "gtceu:cetane_boosted_diesel"],
        [400, 1600, "gtceu:gasoline"],
        [250, 1200, "gtceu:high_octane_gasoline"],
        [150, 900, "gtceu:jean_gasoline"]
    ]

    for (const [mB, duration, id] of cryolobusFuels) {
        event.recipes.gtceu.electric_blast_furnace(`cryolobus_${id.replace(/\W/g, "")}`)
            .itemInputs("gtceu:cryolobus_dust")
            .inputFluids(`${id} ${mB}`)
            .itemOutputs("gtceu:hot_cryolobus_ingot")
            .duration(duration)
            .blastFurnaceTemp(6800)
            .EUt(GTValues.VA[GTValues.LuV])

        event.recipes.gtceu.electric_blast_furnace(`cryolobus_scale_${id.replace(/\W/g, "")}`)
            .itemInputs("4x kubejs:warden_horn")
            .inputFluids(`${id} ${mB * 4}`)
            .itemOutputs("2x gtceu:hot_cryolobus_ingot")
            .duration(duration * 2)
            .blastFurnaceTemp(6800)
            .EUt(GTValues.VA[GTValues.LuV])
    }

    // Cryolobus Vac Freezer recipe
    event.remove({ id: "gtceu:vacuum_freezer/cool_hot_cryolobus_ingot" })
    event.recipes.gtceu.vacuum_freezer("cryolobus_ingot_cooling")
        .itemInputs("gtceu:hot_cryolobus_ingot")
        .itemOutputs("gtceu:cryolobus_ingot")
        .inputFluids(Fluid.of("kubejs:molten_cryotheum", 250))
        .duration(600)
        .EUt(GTValues.VA[GTValues.EV])

    // Alternative hv cutter
    event.shaped("gtceu:hv_cutter", [
        "WCG",
        "DHS",
        "CGM"
    ], {
        W: "gtceu:gold_single_cable",
        C: "#gtceu:circuits/hv",
        G: "gtceu:tempered_glass",
        D: "gtceu:hv_conveyor_module",
        H: "gtceu:hv_machine_hull",
        S: "gtceu:end_steel_gear", // TODO: FIX (likely requires registering end steel as a tool material, and idk how to do that)
        M: "gtceu:hv_electric_motor"
    })

    // Atmospheric Accumulator
    event.recipes.gtceu.shaped("gtceu:atmospheric_accumulator", [
        "WRW",
        "THT",
        "COC"
    ], {
        W: "gtceu:tungsten_single_cable",
        C: "#gtceu:circuits/iv",
        T: "gtceu:tungsten_large_fluid_pipe",
        H: "gtceu:iv_gas_collector",
        R: "gtceu:tungsten_steel_rotor",
        O: "gtceu:iv_electric_pump"
    }).id("gtceu:shaped/atmospheric_accumulator").addMaterialInfo()

    // Matter Alterator
    event.recipes.gtceu.shaped("gtceu:matter_alterator", [
        "WEW",
        "THT",
        "PCV"
    ], {
        W: "gtceu:tungsten_single_cable",
        C: "#gtceu:circuits/iv",
        T: "gtceu:restonia_gem",
        H: "gtceu:iv_atomic_reconstructor",
        E: "gtceu:iv_emitter",
        P: "gtceu:iv_electric_piston",
        V: "gtceu:iv_conveyor_module"
    }).id("gtceu:shaped/matter_alterator").addMaterialInfo()

    // Tantalum-catalysed ethanol->butadiene
    event.recipes.gtceu.large_chemical_reactor("ethanol_to_butadiene")
        .notConsumable("gtceu:tantalum_dust")
        .inputFluids("gtceu:ethanol 2000")
        .outputFluids("gtceu:butadiene 1000")
        .circuit(25)
        .duration(300)
        .EUt(GTValues.VA[GTValues.IV])

    // Netherstar Crafting
    event.shaped("kubejs:nether_star_south", [
        "ADA",
        "ADA",
        " A "
    ], {
        A: "minecraft:quartz",
        D: "kubejs:petrotheum_dust"
    })

    event.shaped("kubejs:nether_star_north", [
        " A ",
        "ADA",
        "ADA"
    ], {
        A: "minecraft:quartz",
        D: "kubejs:aerotheum_dust"
    })

    event.shaped("kubejs:nether_star_west", [
        " AA",
        "ADD",
        " AA"
    ], {
        A: "minecraft:quartz",
        D: "kubejs:cryotheum_dust"
    })

    event.shaped("kubejs:nether_star_east", [
        "AA ",
        "DDA",
        "AA "
    ], {
        A: "minecraft:quartz",
        D: "kubejs:pyrotheum_dust"
    })

    event.shaped("4x kubejs:nether_star_center", [
        "ABA",
        "CDE",
        "AFA"
    ], {
        A: "minecraft:quartz",
        B: "thermal:blitz_rod",
        C: "thermal:blizz_rod",
        D: "extendedcrafting:luminessence_block",
        E: "minecraft:blaze_rod",
        F: "thermal:basalz_rod"
    })

    event.shaped("minecraft:nether_star", [
        " A ",
        "DEB",
        " C "
    ], {
        A: "kubejs:nether_star_north",
        B: "kubejs:nether_star_east",
        C: "kubejs:nether_star_south",
        D: "kubejs:nether_star_west",
        E: "kubejs:nether_star_center"
    })

    event.recipes.gtceu.electrolyzer("saltpeter_dust")
        .itemInputs("4x #forge:sandstone")
        .itemOutputs("gtceu:saltpeter_dust")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LV])

    // UHV+ Parallel Control Hatch
    event.shaped("monilabs:uhv_parallel_hatch", [
        "SCE",
        "CHC",
        "WCW"
    ], {
        H: "gtceu:uhv_machine_hull",
        S: "gtceu:uhv_sensor",
        C: "#gtceu:circuits/uev",
        E: "gtceu:uhv_emitter",
        W: "gtceu:hyperdegenerate_darconite_quadruple_wire"
    })

    event.shaped("monilabs:uev_parallel_hatch", [
        "SCE",
        "CHC",
        "WCW"
    ], {
        H: "gtceu:uev_machine_hull",
        S: "gtceu:uev_sensor",
        C: "#gtceu:circuits/max",
        E: "gtceu:uev_emitter",
        W: "gtceu:monium_quadruple_wire"
    })

    //
    // Recycling below here
    //

    // RHF
    event.remove({ input: "gtceu:mega_blast_furnace" })
    event.recipes.gtceu.arc_furnace("rhf_recycling")
        .itemInputs("gtceu:mega_blast_furnace")
        .inputFluids("gtceu:oxygen 20786")
        .itemOutputs("20x gtceu:naquadah_alloy_ingot", "4x gtceu:invar_ingot", "2x gtceu:uranium_rhodium_dinaquadide_ingot", "gtceu:tin_ingot")
        .duration(20786)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.macerator("rhf_crushing")
        .itemInputs("gtceu:mega_blast_furnace")
        .itemOutputs("24x gtceu:stone_dust", "20x gtceu:naquadah_alloy_dust", "4x gtceu:invar_dust", "2x gtceu:rubber_dust")
        .duration(20786)
        .EUt(GTValues.VA[GTValues.LV])

    // BBC
    event.remove({ input: "gtceu:mega_vacuum_freezer" })
    event.recipes.gtceu.arc_furnace("bbc_recycling")
        .itemInputs("gtceu:mega_vacuum_freezer")
        .inputFluids("gtceu:oxygen 26976")
        .itemOutputs("18x gtceu:naquadah_alloy_ingot", "12x gtceu:stainless_steel_ingot", "12x gtceu:electrum_ingot", "gtceu:steel_block")
        .duration(26976)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.macerator("bbc_crushing")
        .itemInputs("gtceu:mega_vacuum_freezer")
        .itemOutputs("18x gtceu:naquadah_alloy_dust", "50x gtceu:small_rubber_dust", "49x gtceu:small_steel_dust", "12x gtceu:stainless_steel_dust")
        .duration(25408)
        .EUt(302)

    // Strings Recipe
    event.shaped("6x minecraft:string", [
        " A ",
        "ABA",
        " A "
    ], {
        A: "#minecraft:saplings",
        B: "#minecraft:swords"
    }).damageIngredient("#minecraft:swords")

    // Avaritia Replacement recipes
    compacting(event, "gtceu:neutronium_ingot", "gtceu:neutronium_nugget")

    // Recipe from Radon salt to Radon and Rock Salt
    event.recipes.gtceu.electrolyzer("radium_salt_to_radium_and_salt")
        .itemInputs("kubejs:radium_salt")
        .itemOutputs("gtceu:rock_salt_dust")
        .outputFluids(Fluid.of("gtceu:radon", 125))
        .circuit(1)
        .duration(150)
        .EUt(2000)

    // Add the Fluid Tag Filter
    event.shaped(Item.of("gtceu:fluid_tag_filter", 1), [
        "ZZZ",
        "ZLZ",
        "ZZZ"
    ], {
        Z: "gtceu:zinc_foil",
        L: "gtceu:lead_plate"
    })

    // Resonating Crystal recipes
    event.recipes.gtceu.alloy_smelter("kubejs:resonating_redstone")
        .itemInputs("4x minecraft:redstone", "kubejs:ender_shard")
        .itemOutputs("kubejs:resonating_crystal")
        .duration(180)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.alloy_smelter("kubejs:resonating_restonia")
        .itemInputs("gtceu:restonia_gem", "kubejs:ender_shard")
        .itemOutputs("kubejs:resonating_crystal")
        .duration(180)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.autoclave("kubejs:resonating_pearl_autoclave")
        .itemInputs("minecraft:ender_pearl")
        .inputFluids("gtceu:redstone 1152")
        .itemOutputs("12x kubejs:resonating_crystal")
        .duration(900)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.autoclave("kubejs:resonating_pulsating_autoclave")
        .itemInputs("kubejs:pulsating_dust")
        .inputFluids("gtceu:redstone 1152")
        .itemOutputs("12x kubejs:resonating_crystal")
        .duration(900)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.autoclave("kubejs:resonating_ender_dust_autoclave")
        .itemInputs("#forge:dusts/ender_pearl")
        .inputFluids("gtceu:redstone 1152")
        .itemOutputs("12x kubejs:resonating_crystal")
        .duration(900)
        .EUt(GTValues.VA[GTValues.HV])

    // Ender Shard
    event.shapeless("8x kubejs:ender_shard", ["minecraft:ender_pearl"]).id("kubejs:ender_pearl")
    event.recipes.gtceu.forge_hammer("kubejs:ender_pearl_shattering")
        .itemInputs("minecraft:ender_pearl")
        .itemOutputs("8x kubejs:ender_shard")
        .duration(40)
        .EUt(12)

    // Waterframes
    event.shaped("waterframes:frame", [
        "IGI",
        "GSG",
        "IGI"
    ], {
        I: "gtceu:iron_plate",
        S: "gtceu:steel_plate",
        G: "#forge:glass_panes"
    }).id("waterframes:frame")

    event.shaped("waterframes:projector", [
        "III",
        "IFG",
        "III"
    ], {
        F: "waterframes:frame",
        I: "gtceu:iron_plate",
        G: "#forge:glass_panes"
    }).id("waterframes:projector")

    event.shaped("waterframes:tv", [
        "III",
        "GFG",
        "III"
    ], {
        F: "waterframes:frame",
        I: "gtceu:iron_plate",
        G: "#forge:glass_panes"
    }).id("waterframes:tv")

    event.shaped("waterframes:big_tv", [
        "III",
        "GFG",
        "III"
    ], {
        F: "waterframes:tv",
        I: "gtceu:iron_plate",
        G: "#forge:glass_panes"
    }).id("waterframes:big_tv")

    event.shaped("waterframes:remote", [
        "IRI",
        "ICI",
        "ICI"
    ], {
        R: "minecraft:redstone",
        I: "gtceu:iron_plate",
        C: "gtceu:copper_plate"
    }).id("waterframes:remote")

    // Stonecut p2p tunnels, attunement sucks
    const p2p = ["redstone", "item", "fluid", "fe", "light"]
    p2p.forEach(type => {
        event.stonecutting(`ae2:${type}_p2p_tunnel`, "ae2:me_p2p_tunnel")
    })
    const mae2_p2p = doEUP2P ? ["pattern", "eu"] : ["pattern"]
    mae2_p2p.forEach(type => {
        event.stonecutting(`mae2:${type}_p2p_tunnel`, "ae2:me_p2p_tunnel")
    })
    const multi_p2p = doEUP2P ? ["pattern", "redstone", "fluid", "fe", "eu"] : ["pattern", "redstone", "fluid", "fe"]
    multi_p2p.forEach(type => {
        event.stonecutting(`mae2:${type}_multi_p2p_tunnel`, "mae2:item_multi_p2p_tunnel")
    })

    // Stonecutting CCI blocks & Marble
    let sameItemsTags = ["#chisel_chipped_integration:factory_block", "#chisel_chipped_integration:technical_block", "#chisel_chipped_integration:laboratory_block", "#chisel_chipped_integration:tyrian", "#chisel_chipped_integration:futura_block", "#moni:marble"]; // What item tags to go through (change this so you have your tags)
    sameItemsTags.forEach(tag => {
        let sameItems = Ingredient.of(tag).stacks; // Get all of the items with that tag
        sameItems.forEach(output => {
            event.stonecutting(output, Ingredient.of(tag))
        });
    });

    // Stonecut GTCEU warning blocks into each other
    let hazardNames = [
        "acid", "antimatter", "bio", "boss", "causality", "explosion", "fire",
        "generic", "gregification", "high_pressure", "high_temperature", "high_voltage",
        "laser", "magic", "magnetic", "mob_infestation", "mob_spawner", "noise",
        "radioactive", "spatial_storage", "turret", "void"
    ];
    for (let hazardName of hazardNames) {
        let hazard = `gtceu:${hazardName}_hazard_sign_block`
        event.stonecutting(hazard, "gtceu:solid_machine_casing")
        event.stonecutting("gtceu:solid_machine_casing", hazard)
    }

    event.remove({ id: "gtceu:shaped/mega_blast_furnace" })
    event.recipes.gtceu.assembly_line("kubejs:mega_blast_furnace")
        .itemInputs("gtceu:electric_blast_furnace", "4x #gtceu:circuits/zpm", "4x gtceu:luv_field_generator", "4x gtceu:naquadah_alloy_spring", "4x gtceu:dense_naquadah_alloy_plate", "4x gtceu:uranium_rhodium_dinaquadide_quadruple_wire")
        .inputFluids("gtceu:advanced_soldering_alloy 2304")
        .itemOutputs("gtceu:mega_blast_furnace")
        .duration(3000)
        .EUt(GTValues.VA[GTValues.LuV])
        .stationResearch(b => b.researchStack("gtceu:electric_blast_furnace").CWUt(16, 64000).EUt(GTValues.VA[GTValues.LuV]))

    event.remove({ id: "gtceu:shaped/mega_vacuum_freezer" })
    event.recipes.gtceu.assembly_line("kubejs:mega_vacuum_freezer")
        .itemInputs("gtceu:vacuum_freezer", "4x #gtceu:circuits/zpm", "4x gtceu:luv_field_generator", "4x gtceu:naquadah_normal_fluid_pipe", "4x gtceu:dense_naquadah_alloy_plate", "4x gtceu:uranium_rhodium_dinaquadide_quadruple_wire")
        .inputFluids("gtceu:advanced_soldering_alloy 2304")
        .itemOutputs("gtceu:mega_vacuum_freezer")
        .duration(3000)
        .EUt(GTValues.VA[GTValues.LuV])
        .stationResearch(b => b.researchStack("gtceu:vacuum_freezer").CWUt(16, 64000).EUt(GTValues.VA[GTValues.LuV]))

    event.recipes.minecraft.smelting("kubejs:pulsating_dust", ["gtceu:uraninite_dust"])
    event.recipes.minecraft.smelting("kubejs:pulsating_dust", ["kubejs:resonant_clathrate"])

    // Electrum
    event.replaceInput({ id: /redstone_arsenal/ }, "redstone_arsenal:flux_metal_block", "gtceu:electrum_flux_block")

    // Neutronium Buff
    event.remove({ id: "gtceu:fusion_reactor/americium_and_naquadria_to_neutronium_plasma" })
    event.recipes.gtceu.fusion_reactor("neutronium_buffed")
        .inputFluids("gtceu:americium 128", "gtceu:naquadah 128")
        .outputFluids("gtceu:neutronium 32")
        .duration(130)
        .EUt(98304)
        .fusionStartEU(600000000)

    // Resonant Ender <-> Pearl
    event.recipes.gtceu.extractor("resonant_ender_from_pearl")
        .itemInputs("1x minecraft:ender_pearl")
        .outputFluids(Fluid.of("thermal:ender", 250))
        .duration(40)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.fluid_solidifier("pearl_from_resonant_ender")
        .notConsumable("gtceu:ball_casting_mold")
        .inputFluids(Fluid.of("thermal:ender", 250))
        .itemOutputs("1x minecraft:ender_pearl")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])

    // Cleanroom Hatch
    event.remove({ id: "gtceu:shaped/maintenance_hatch_cleaning" })
    event.recipes.gtceu.shaped("gtceu:cleaning_maintenance_hatch", [
        "CMC",
        "RHR",
        "WCW"
    ], {
        R: "gtceu:iv_robot_arm",
        W: "gtceu:graphene_single_cable",
        M: "gtceu:auto_maintenance_hatch",
        H: "gtceu:iv_machine_hull",
        C: "#gtceu:circuits/iv"
    })
        .addMaterialInfo()
        .id("moni:shaped/cleaning_maintenance_hatch");

    // ZPM Field Gen
    event.remove({ id: "gtceu:field_generator_zpm" })
    event.recipes.gtceu.assembly_line("kubejs:zpm_field_generator")
        .itemInputs("gtceu:naquadah_alloy_frame", "6x gtceu:naquadah_alloy_plate", "gtceu:quantum_star", "2x gtceu:zpm_emitter", "2x #gtceu:circuits/zpm", "64x gtceu:fine_uranium_rhodium_dinaquadide_wire", "64x gtceu:fine_uranium_rhodium_dinaquadide_wire", "4x gtceu:vanadium_gallium_single_cable")
        .inputFluids("gtceu:advanced_soldering_alloy 576", "gtceu:cryococcus 1152")
        .itemOutputs("gtceu:zpm_field_generator")
        .duration(600)
        .EUt(24000)
        .stationResearch(b => b.researchStack("gtceu:luv_field_generator").CWUt(4, 16000).EUt(GTValues.VA[GTValues.LuV]))

    // Quantum Ring Assembler Recipes
    event.recipes.gtceu.assembler("kubejs:quantum_ring")
        .itemInputs("4x gtceu:stainless_steel_plate", "2x ae2:calculation_processor", "2x ae2:engineering_processor", "gtceu:quantum_star")
        .itemOutputs("ae2:quantum_ring")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.assembler("kubejs:quantum_link")
        .itemInputs("4x ae2:fluix_pearl", "4x ae2:quartz_glass", "gtceu:certus_quartz_plate")
        .itemOutputs("ae2:quantum_link")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])

    // Dragon Breath canning and uncanning
    event.recipes.gtceu.canner("dragon_breath_unbottling")
        .itemInputs("minecraft:dragon_breath")
        .itemOutputs("minecraft:glass_bottle")
        .outputFluids("gtceu:dragon_breath 250")
        .duration(400)
        .EUt(2)

    event.recipes.gtceu.canner("dragon_breath_bottling")
        .itemInputs("minecraft:glass_bottle")
        .inputFluids("gtceu:dragon_breath 250")
        .itemOutputs("minecraft:dragon_breath")
        .duration(400)
        .EUt(2)

    // JEAN Gasoline consumption
    event.recipes.gtceu.combustion_generator("jean_gasoline_generator")
        .inputFluids("gtceu:jean_gasoline 1")
        .duration(160)
        .EUt(-GTValues.V[GTValues.MV])

    // JEAN Gasoline
    event.recipes.gtceu.large_chemical_reactor("kubejs:jean_gasoline")
        .itemInputs("3x gtceu:netherrack_dust")
        .inputFluids("gtceu:high_octane_gasoline 8000", "gtceu:rocket_fuel 5000", "gtceu:chlorine_trifluoride 2000", "gtceu:tetraethyllead 1000", "gtceu:dragon_breath 500")
        .outputFluids("gtceu:jean_gasoline 16000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.IV])
        .circuit(24)

    event.recipes.gtceu.chemical_reactor("kubejs:chloroethane")
        .inputFluids("gtceu:ethylene 1000", "gtceu:hydrochloric_acid 1000")
        .outputFluids("gtceu:chloroethane 1000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(4)

    event.recipes.gtceu.chemical_reactor("kubejs:tetraethyllead")
        .itemInputs("8x gtceu:sodium_lead_alloy_dust")
        .inputFluids("gtceu:chloroethane 4000")
        .outputFluids("gtceu:tetraethyllead 1000")
        .itemOutputs("8x gtceu:salt_dust", "3x gtceu:lead_dust")
        .duration(300)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.chemical_reactor("kubejs:chlorine_trifluoride")
        .inputFluids("gtceu:fluorine 3000", "gtceu:chlorine 1000")
        .outputFluids("gtceu:chlorine_trifluoride 1000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.ULV])

    event.recipes.gtceu.mixer("kubejs:sodium_lead_alloy")
        .itemInputs("gtceu:sodium_dust", "gtceu:lead_dust")
        .itemOutputs("2x gtceu:sodium_lead_alloy_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.ULV])

    // Wither Gas consumption
    event.recipes.gtceu.gas_turbine("wither_gas_generator")
        .inputFluids("gtceu:wither_gas 1")
        .duration(140)
        .EUt(-GTValues.V[GTValues.LV])

    // Wither Gas
    event.recipes.gtceu.large_chemical_reactor("wither_gas")
        .notConsumable("minecraft:nether_star")
        .itemInputs("enderio:withering_powder", "2x gtceu:small_calcium_perchlorate_dust")
        .inputFluids("gtceu:lpg 8000", "gtceu:nitrobenzene 10000", "gtceu:overbased_magnesium_sulfonate 500")
        .outputFluids("gtceu:wither_gas 20000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.EV])

    // Calcium Perchlorate alternate recipe
    event.recipes.gtceu.chemical_reactor("calcium_perchlorate_from_calcium_chloride")
        .notConsumable("gtceu:rutile_dust")
        .itemInputs("3x gtceu:calcium_chloride_dust")
        .inputFluids("gtceu:oxygen 8000")
        .itemOutputs("11x gtceu:calcium_perchlorate_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    // Tetrapropene (ehehehe environmental destruction be damned)
    event.recipes.gtceu.chemical_reactor("tetrapropylene_from_propene")
        .inputFluids("gtceu:propene 4000")
        .outputFluids("gtceu:tetrapropylene 1000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(4)

    // Alkylbenzene
    event.recipes.gtceu.chemical_reactor("alkylbenzene_from_benzene")
        .inputFluids("gtceu:phosphoric_acid 100", "gtceu:benzene 1000", "gtceu:tetrapropylene 1000", )
        .outputFluids("gtceu:alkylbenzene 1000")
        .duration(120)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.chemical_reactor("alkylbenzene_from_ethylbenzene")
        .inputFluids("gtceu:phosphoric_acid 100", "gtceu:ethylbenzene 1000", "gtceu:tetrapropylene 1000", )
        .outputFluids("gtceu:alkylbenzene 1000", "gtceu:ethylene 1000")
        .duration(160)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.chemical_reactor("alkylbenzene_from_cumene")
        .inputFluids("gtceu:phosphoric_acid 100", "gtceu:cumene 1000", "gtceu:tetrapropylene 1000", )
        .outputFluids("gtceu:alkylbenzene 1000", "gtceu:propene 1000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    // Overbased Magnesium Sulfonate
    event.recipes.gtceu.chemical_reactor("overbased_magnesium_sulfonate_from_magnesium")
        .inputFluids("gtceu:alkylbenzene 1750", "gtceu:sulfur_trioxide 1750")
        .itemInputs("gtceu:magnesium_dust")
        .outputFluids("gtceu:overbased_magnesium_sulfonate 1750", "gtceu:hydrogen 1750")
        .duration(80)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.chemical_reactor("overbased_magnesium_sulfonate_from_magnesium_chloride")
        .inputFluids("gtceu:alkylbenzene 1750", "gtceu:sulfur_trioxide 1750")
        .itemInputs("3x gtceu:magnesium_chloride_dust")
        .outputFluids("gtceu:overbased_magnesium_sulfonate 1750", "gtceu:hydrochloric_acid 1750")
        .duration(60)
        .EUt(GTValues.VA[GTValues.HV])

    // Clay synthesis from Dust
    event.recipes.gtceu.forge_hammer("dust")
        .itemInputs("minecraft:sand")
        .itemOutputs("kubejs:dust")
        .duration(16)
        .EUt(10)

    event.recipes.gtceu.chemical_reactor("gt_clay")
        .itemInputs("kubejs:dust")
        .itemOutputs("minecraft:clay")
        .inputFluids("water")
        .duration(20)
        .EUt(GTValues.VHA[GTValues.LV])

    // Break Clay blocks into balls
    event.shapeless("4x minecraft:clay_ball", ["minecraft:clay"]);

    // Parallel Implosion Compressor
    event.recipes.gtceu.assembly_line("gtceu:implosion_collider")
        .itemInputs("4x enderio:reinforced_obsidian_block", "2x #gtceu:circuits/zpm", "gtceu:solid_machine_casing", "3x gtceu:niobium_nitride_double_cable", "2x gtceu:zpm_electric_piston")
        .inputFluids("gtceu:advanced_soldering_alloy 864", "gtceu:osmium 1152")
        .itemOutputs("gtceu:implosion_collider")
        .duration(900)
        .EUt(32000)
        ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack("gtceu:implosion_compressor").EUt(6000).duration(1800))

    // Froglights
    event.recipes.gtceu.atomic_reconstruction("ochre_froglight")
        .itemInputs("minecraft:magma_block")
        .itemOutputs("minecraft:ochre_froglight")
        .duration(20)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.atomic_reconstruction("verdant_froglight")
        .itemInputs("minecraft:ochre_froglight")
        .itemOutputs("minecraft:verdant_froglight")
        .duration(20)
        .EUt(GTValues.VHA[GTValues.LV])

    event.recipes.gtceu.atomic_reconstruction("pearlescent_froglight")
        .itemInputs("minecraft:verdant_froglight")
        .itemOutputs("minecraft:pearlescent_froglight")
        .duration(20)
        .EUt(GTValues.VHA[GTValues.LV])

    // Sodium to Sodium Hydroxide
    event.recipes.gtceu.chemical_reactor("na_to_naoh")
        .itemInputs("gtceu:sodium_dust")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:sodium_hydroxide_dust")
        .outputFluids("gtceu:hydrogen 1000")
        .duration(50)
        .EUt(GTValues.VA[GTValues.MV])

    // Patchouli Books that needed tweaking
    event.shapeless(Item.of("patchouli:guide_book", '{"patchouli:book":"laserio:laseriobook"}'), ["minecraft:book", "laserio:card_item"]).id("laserio:my_book_recipe_shapeless")

    // Chipped tinker's table
    event.replaceInput({ id: "chipped:benches/mechanist_workbench" }, "minecraft:tnt", "#forge:chests")

    // Phantom Paste
    event.shaped("framedblocks:phantom_paste", [
        "SSS",
        "SCS",
        "SSS"
    ], {
        S: "#forge:slimeballs",
        C: "minecraft:chorus_fruit",
    })

    // Let Oilsands have multiple types of oil
    event.remove({ id: "gtceu:centrifuge/oilsands_dust_separation" })
    event.recipes.gtceu.centrifuge("oilsands_to_oil")
        .itemInputs("gtceu:oilsands_dust")
        .chancedOutput("minecraft:sand", 2500, 0)
        .outputFluids("gtceu:oil 1000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(3)

    event.recipes.gtceu.centrifuge("oilsands_to_light_oil")
        .itemInputs("gtceu:oilsands_dust")
        .chancedOutput("minecraft:sand", 2500, 0)
        .outputFluids("gtceu:oil_light 500")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(4)

    event.recipes.gtceu.centrifuge("oilsands_to_heavy_oil")
        .itemInputs("gtceu:oilsands_dust")
        .chancedOutput("minecraft:sand", 2500, 0)
        .outputFluids("gtceu:oil_heavy 2000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(2)

    event.recipes.gtceu.centrifuge("oilsands_to_raw_oil")
        .itemInputs("gtceu:oilsands_dust")
        .chancedOutput("minecraft:sand", 2500, 0)
        .outputFluids("gtceu:oil_medium 1000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(1)

    // Fix ilmenite -> rutile stoich
    event.remove({ id: "gtceu:electric_blast_furnace/rutile_from_ilmenite" })

    event.recipes.gtceu.electric_blast_furnace("rutile_from_ilmenite")
        .itemInputs("10x gtceu:ilmenite_dust", "2x gtceu:carbon_dust")
        .itemOutputs("2x gtceu:wrought_iron_ingot", "6x gtceu:rutile_dust")
        .outputFluids("gtceu:carbon_dioxide 2000")
        .duration(1600)
        .blastFurnaceTemp(1700)
        .EUt(GTValues.VA[GTValues.HV])

    // Germanium can be used in diodes
    event.recipes.gtceu.mixer("silicon_germanium_mixing")
        .itemInputs("4x gtceu:silicon_dust", "1x gtceu:germanium_dust")
        .itemOutputs("5x gtceu:silicon_germanium_dust")
        .EUt(GTValues.VA[GTValues.LV])
        .duration(10 * 20)

    event.replaceInput({ output: "gtceu:diode"}, "gtceu:silicon_wafer", "gtceu:tiny_silicon_germanium_dust")
    event.recipes.gtceu.assembler("germanium_smd_diode")
        .itemInputs("1x gtceu:small_silicon_germanium_dust", "4x gtceu:fine_platinum_wire")
        .inputFluids("gtceu:polyethylene 144")
        .itemOutputs("64x gtceu:smd_diode")
        .duration(100)
        .EUt(GTValues.VA[GTValues.HV])

    // Germanium fusion
    event.recipes.gtceu.fusion_reactor("argon_and_silicon_to_germanium")
        .inputFluids("gtceu:argon 125", "gtceu:silicon 16")
        .outputFluids("gtceu:germanium 16")
        .duration(128)
        .EUt(0.75 * GTValues.V[GTValues.LuV])
        .fusionStartEU(220000000)

    // No dust mold, sadly
    event.recipes.gtceu.fluid_solidifier("solidify_germanium_to_dust")
        .inputFluids("gtceu:germanium 144")
        .itemOutputs("gtceu:germanium_dust")
        .duration(20)
        .EUt(GTValues.VA[GTValues.ULV])

    event.recipes.gtceu.fluid_solidifier("petri_dish_borosilicate")
        .notConsumable("gtceu:cylinder_casting_mold")
        .inputFluids("gtceu:borosilicate_glass 18")
        .itemOutputs("2x gtceu:petri_dish")
        .duration(80)
        .EUt(GTValues.VA[GTValues.HV])

    // Alternate Recipe for Octane
    event.recipes.gtceu.chemical_reactor("synthetic_octane")
        .chancedFluidInput("gtceu:sulfuric_acid 500", 5000, 0)
        .inputFluids("gtceu:butene 1000", "gtceu:butane 1000")
        .outputFluids("gtceu:octane 1000")
        .duration(240)
        .EUt(GTValues.VA[GTValues.HV])
        .circuit(1)

    // Give Acetic Acid from Methanol a Circuit
    event.recipes.gtceu.chemical_reactor("acetic_acid_from_methanol_circuit")
        .inputFluids("gtceu:methanol 1000", "gtceu:carbon_monoxide 1000")
        .outputFluids("gtceu:acetic_acid 1000")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(1)

    // Gilded Blackstone maceration
    event.recipes.gtceu.macerator("macerate_gilded_blackstone")
        .itemInputs("minecraft:gilded_blackstone")
        .itemOutputs("gtceu:blackstone_dust")
        .chancedOutput("gtceu:gold_dust", 2500, 0)
        .duration(66)
        .EUt(2)

    // Alternate recipes for using Hexafluorosilicic Acid
    event.recipes.gtceu.chemical_reactor("uranium_hexafluorosilicic")
        .itemInputs("3x gtceu:uraninite_dust")
        .inputFluids("gtceu:hexafluorosilicic_acid")
        .itemOutputs("3x gtceu:silicon_dioxide_dust")
        .outputFluids("gtceu:uranium_hexafluoride", "gtceu:hydrogen 2000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.chemical_reactor("antimony_trifluoride_hexafluorsilicic")
        .itemInputs("5x gtceu:antimony_trioxide_dust")
        .inputFluids("gtceu:hexafluorosilicic_acid")
        .itemOutputs("8x gtceu:antimony_trifluoride_dust", "3x gtceu:silicon_dioxide_dust")
        .outputFluids("minecraft:water 1000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.chemical_reactor("rutile_from_titanium")
        .itemInputs("gtceu:titanium_dust")
        .inputFluids("gtceu:oxygen 2000")
        .itemOutputs("gtceu:rutile_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.chemical_reactor("tantalum_pentoxide")
        .itemInputs("2x gtceu:tantalum_dust")
        .inputFluids("gtceu:oxygen 5000")
        .itemOutputs("7x gtceu:tantalum_pentoxide_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.HV])

    // Re-tier the Gregicality multiblocks of IV to be after platline Pt1, but before platline pt2
    event.replaceInput({ id: "gtceu:shaped/large_distillery"}, "gtceu:iridium_large_fluid_pipe", "gtceu:tungsten_carbide_large_fluid_pipe")
    event.replaceInput({ id: "gtceu:shaped/large_mixer"}, "gtceu:osmiridium_rotor", "gtceu:rhodium_plated_palladium_rotor")
    event.replaceInput({ id: "gtceu:shaped/large_electromagnet"}, "gtceu:osmium_quadruple_wire", "gtceu:niobium_nitride_quadruple_wire")

    // recipe for Caesium Hydroxide loop
    event.recipes.gtceu.chemical_reactor("caesium_hydroxide")
        .itemInputs("gtceu:caesium_dust")
        .inputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:caesium_hydroxide_dust")
        .outputFluids("gtceu:hydrogen 1000")
        .duration(20).EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.fusion_reactor("fuse_iridium_from_tantalum_beryllium")
        .inputFluids("gtceu:tantalum 16", "gtceu:beryllium 16")
        .outputFluids("gtceu:iridium 16")
        .duration(64)
        .EUt(0.75 * GTValues.V[GTValues.LuV])
        .fusionStartEU(300000000)

    // Allow MV GT superconductor to be cooled using chemical bath
    event.recipes.gtceu.chemical_bath("magnesium_diboride_cool_down")
        .itemInputs("gtceu:hot_magnesium_diboride_ingot")
        .inputFluids("minecraft:water 100")
        .itemOutputs("gtceu:magnesium_diboride_ingot")
        .duration(400)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.chemical_bath("magnesium_diboride_cool_down_distilled_water")
        .itemInputs("gtceu:hot_magnesium_diboride_ingot")
        .inputFluids("gtceu:distilled_water 100")
        .itemOutputs("gtceu:magnesium_diboride_ingot")
        .duration(250)
        .EUt(GTValues.VA[GTValues.MV])
})
