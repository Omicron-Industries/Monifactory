/**
 * Custom recipes for AE2 & addons
 */
ServerEvents.recipes(event => {

    // Base AE2
    // ME Controller
    event.remove({ id: "ae2:network/blocks/controller" })
    event.recipes.gtceu.shaped(Item.of("ae2:controller"), [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:dark_steel_plate",
        B: "gtceu:fluix_plate",
        C: "ae2:energy_acceptor"
    }).id("kubejs:ae2/controller")
        .addMaterialInfo()

    // Energy Acceptor
    event.remove({ id: "ae2:network/blocks/energy_energy_acceptor" })
    event.recipes.gtceu.shaped(Item.of("ae2:energy_acceptor"), [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "gtceu:electrical_steel_plate",
        B: "gtceu:fluix_plate",
        C: "gtceu:lv_machine_hull"
    }).id("kubejs:ae2/energy_acceptor")
        .addMaterialInfo()

    // ME Chest
    event.remove({ id: "ae2:network/blocks/storage_chest" })
    event.shaped(Item.of("ae2:chest"), [
        "ABA",
        "CDE",
        "FGF"
    ], {
        A: "ae2:quartz_glass",
        B: "#ae2:illuminated_panel",
        C: "gtceu:certus_quartz_plate",
        D: "gtceu:aluminium_crate",
        E: "gtceu:fluix_plate",
        F: "gtceu:dark_steel_block",
        G: "gtceu:nether_quartz_plate"
    }).id("kubejs:ae2/chest")

    // ME Drive
    event.remove({ id: "ae2:network/blocks/storage_drive" })
    event.shaped(Item.of("ae2:drive"), [
        "ABA",
        "CDC",
        "AEA"
    ], {
        A: "gtceu:aluminium_plate",
        B: "gtceu:mv_emitter",
        C: "#gtceu:circuits/lv",
        D: "ae2:chest",
        E: "gtceu:mv_sensor"
    }).id("kubejs:ae2/storage_drive")

    // Inscriber
    event.remove({ id: "ae2:network/blocks/inscribers" })
    event.recipes.gtceu.shaped(Item.of("ae2:inscriber"), [
        "ABA",
        "CDA",
        "ABA"
    ], {
        A: "gtceu:dark_steel_plate",
        B: "gtceu:mv_electric_piston",
        C: "ae2:fluix_crystal",
        D: "gtceu:mv_machine_hull"
    }).id("kubejs:ae2/inscriber")
        .addMaterialInfo()

    // PE Patterns
    event.remove({ id: "ae2:network/crafting/patterns_blank" })
    event.shaped(Item.of("ae2:blank_pattern", 8), [
        "AAA",
        "BCB",
        "BBB"
    ], {
        A: "gtceu:fine_silver_wire",
        B: "gtceu:polyethylene_plate",
        C: "#gtceu:circuits/hv"
    }).id("kubejs:ae2/blank_pattern")

    // PTFE Patterns
    event.shaped(Item.of("ae2:blank_pattern", 16), [
        "AAA",
        "BCB",
        "BBB"
    ], {
        A: "gtceu:fine_silver_wire",
        B: "gtceu:polytetrafluoroethylene_plate",
        C: "#gtceu:circuits/ev"
    }).id("kubejs:ae2/blank_pattern_ptfe")

    // Pattern Provider
    event.remove({ id: "ae2:network/blocks/pattern_providers_interface" })
    event.shaped(Item.of("ae2:pattern_provider"), [
        "ABA",
        "CDE",
        "AAA"
    ], {
        A: "gtceu:aluminium_plate",
        B: "gtceu:mv_robot_arm",
        C: "ae2:annihilation_core",
        D: "gtceu:mv_machine_hull",
        E: "ae2:formation_core"
    }).id("kubejs:ae2/pattern_provider")

    // Molecular Assembler
    event.remove({ id: "ae2:network/crafting/molecular_assembler" })
    event.shaped(Item.of("ae2:molecular_assembler"), [
        "ABA",
        "CDE",
        "ABA"
    ], {
        A: "gtceu:aluminium_plate",
        B: "ae2:quartz_glass",
        C: "ae2:annihilation_core",
        D: "minecraft:crafting_table",
        E: "ae2:formation_core"
    }).id("kubejs:ae2/molecular_assembler")

    // Interface
    event.remove({ id: "ae2:network/blocks/interfaces_interface" })
    event.shaped(Item.of("ae2:interface"), [
        "ABA",
        "CDE",
        "AAA"
    ], {
        A: "gtceu:aluminium_plate",
        B: "gtceu:mv_conveyor_module",
        C: "ae2:annihilation_core",
        D: "gtceu:mv_machine_hull",
        E: "ae2:formation_core"
    }).id("kubejs:ae2/interface")

    // Requester
    event.remove({ id: "merequester:requester" })
    event.shaped(Item.of("merequester:requester"), [
        "ABA",
        "CDC",
        "AFA"
    ], {
        A: "gtceu:rhodium_plated_palladium_plate",
        B: "gtceu:luv_robot_arm",
        C: "#gtceu:circuits/zpm",
        D: "gtceu:luv_machine_hull",
        F: "gtceu:fluix_plate"
    }).id("kubejs:ae2/requster")

    // Quantum Ring
    event.remove({ id: "ae2:network/blocks/quantum_ring" })
    event.shaped(Item.of("ae2:quantum_ring"), [
        "ABA",
        "DCD",
        "ABA"
    ], {
        A: "gtceu:stainless_steel_plate",
        B: "ae2:calculation_processor",
        C: "gtceu:quantum_star",
        D: "ae2:engineering_processor"
    }).id("kubejs:ae2/quantum_ring")

    // Quantum Link Chamber
    event.remove({ id: "ae2:network/blocks/quantum_link" })
    event.shaped(Item.of("ae2:quantum_link"), [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "ae2:quartz_glass",
        B: "ae2:fluix_pearl",
        C: "gtceu:certus_quartz_plate"
    }).id("kubejs:ae2/quantum_link")

    // Storage Cell Removal
    event.remove({ id: "ae2:network/cells/item_storage_cell_1k" })
    event.remove({ id: "ae2:network/cells/item_storage_cell_4k" })
    event.remove({ id: "ae2:network/cells/item_storage_cell_16k" })
    event.remove({ id: "ae2:network/cells/item_storage_cell_64k" })
    event.remove({ id: "ae2:network/cells/item_storage_cell_256k" })

    event.remove({ id: "ae2:network/cells/fluid_storage_cell_1k" })
    event.remove({ id: "ae2:network/cells/fluid_storage_cell_4k" })
    event.remove({ id: "ae2:network/cells/fluid_storage_cell_16k" })
    event.remove({ id: "ae2:network/cells/fluid_storage_cell_64k" })
    event.remove({ id: "ae2:network/cells/fluid_storage_cell_256k" })

    event.remove({ id: "ae2:network/cells/spatial_storage_cell_2_cubed" })
    event.remove({ id: "ae2:network/cells/spatial_storage_cell_16_cubed" })
    event.remove({ id: "ae2:network/cells/spatial_storage_cell_128_cubed" })

    event.remove({ id: "ae2:network/cells/view_cell" })

    // Storage Housing
    event.remove({ id: "ae2:network/cells/item_cell_housing" })
    event.shaped(Item.of("ae2:item_cell_housing"), [
        "ABA",
        "B B",
        "ABA"
    ], {
        A: "gtceu:fine_red_alloy_wire",
        B: "gtceu:electrical_steel_plate"
    }).id("kubejs:ae2/item_cell_housing")

    event.remove({ id: "ae2:network/cells/fluid_cell_housing" })
    event.shaped(Item.of("ae2:fluid_cell_housing"), [
        "ABA",
        "B B",
        "ABA"
    ], {
        A: "gtceu:fine_red_alloy_wire",
        B: "gtceu:energetic_alloy_plate"
    })

    // CPUs
    event.remove({ id: "ae2:network/crafting/cpu_crafting_unit" })
    event.shaped(Item.of("ae2:crafting_unit"), [
        "ABA",
        "CDC",
        "ABA"
    ], {
        A: "gtceu:aluminium_plate",
        B: "ae2:calculation_processor",
        C: "ae2:fluix_glass_cable",
        D: "ae2:logic_processor"
    }).id("kubejs:ae2/cpu_crafting_unit")

    // Charger
    event.remove({ id: "ae2:network/blocks/crystal_processing_charger" })
    event.shaped(Item.of("ae2:charger"), [
        "ABA",
        "A  ",
        "ABA"
    ], {
        A: "gtceu:dark_steel_plate",
        B: "gtceu:certus_quartz_plate"
    }).id("kubejs:ae2/charger")

    event.recipes.gtceu.autoclave("charged_autoclave")
        .itemInputs(["ae2:certus_quartz_crystal"])
        .inputFluids("gtceu:distilled_water 100")
        .itemOutputs("ae2:charged_certus_quartz_crystal")
        .duration(20)
        .EUt(GTValues.VA[GTValues.HV])

    // Matter Condenser
    event.remove({ id: "ae2:network/blocks/io_condenser" })
    event.shaped(Item.of("ae2:condenser"), [
        "APA",
        "FBF",
        "APA"
    ], {
        A: "gtceu:double_titanium_plate",
        B: "gtceu:quantum_star",
        F: "gtceu:fluix_plate",
        P :"gtceu:mv_field_generator"
    }).id("kubejs:ae2/matter_condensor")

    // Storage Components
    const storage_tiers = [
        "1k",
        "4k",
        "16k",
        "64k",
        "256k",
        "1m",
        "4m",
        "16m",
        "64m",
        "256m"
    ]
    const storage_component_ingredients = [
        ["mv", "minecraft:glass", "ae2:calculation_processor", "gtceu:polyethylene", 1],
        ["hv", "minecraft:glass", "ae2:engineering_processor", "gtceu:polyethylene", 1],
        ["ev", "ae2:logic_processor", "ae2:engineering_processor", "gtceu:polyethylene", 1],
        ["iv", "ae2:logic_processor", "ae2:engineering_processor", "gtceu:polytetrafluoroethylene", 1],
        ["iv", "ae2:engineering_processor", "megacells:accumulation_processor", "gtceu:polytetrafluoroethylene", 2],
        ["luv", "ae2:engineering_processor", "megacells:accumulation_processor", "gtceu:polytetrafluoroethylene", 2],
        ["luv", "megacells:accumulation_processor", "gtceu:quantum_eye", "gtceu:polytetrafluoroethylene", 2],
        ["zpm", "megacells:accumulation_processor", "gtceu:quantum_eye", "gtceu:polybenzimidazole", 2],
        ["zpm", "megacells:accumulation_processor", "gtceu:quantum_eye", "gtceu:polybenzimidazole", 2],
    ]
    for (let index = 0; index < storage_component_ingredients.length; index++) {
        let curTier;
        if (index < 4) curTier = Item.of(`ae2:cell_component_${storage_tiers[index + 1]}`)
        else curTier = Item.of(`megacells:cell_component_${storage_tiers[index + 1]}`)

        let curIngredients = storage_component_ingredients[index];

        let toRemove;
        if (index < 4) toRemove = `ae2:network/cells/item_storage_components_cell_${storage_tiers[index + 1]}_part`
        else toRemove = `megacells:cells/cell_component_${storage_tiers[index + 1]}`

        let prevTier;
        if (index <= 4) prevTier = Item.of(`ae2:cell_component_${storage_tiers[index]}`)
        else prevTier = Item.of(`megacells:cell_component_${storage_tiers[index]}`)

        event.remove({ id: toRemove })
        event.shaped(Item.of(curTier), [
            "ABA",
            "SCS",
            "ASA"
        ], {
            A: curIngredients[1],
            B: curIngredients[2],
            C: `#gtceu:circuits/${curIngredients[0]}`,
            S: Item.of(prevTier)
        }).id(`kubejs:ae2/storage_component_${storage_tiers[index + 1]}`)

        // Cheaper ramp up to reduce exponential effect
        event.recipes.gtceu.assembler(`kubejs:ae2/${storage_tiers[index + 1]}_storage_assembler`)
            .itemInputs(
                Item.of(prevTier, 2),
                Item.of(curIngredients[1], 2),
                Item.of(curIngredients[2], 1),
                `#gtceu:circuits/${curIngredients[0]}`
            )
            .inputFluids(Fluid.of(curIngredients[3], 144 * curIngredients[4]))
            .itemOutputs(curTier)
            .EUt(GTValues.VHA[GTValues.HV])
            .duration(200)
            .cleanroom(CleanroomType.CLEANROOM)
    }

    // 1K Storage Component recipes
    event.remove({ id: "ae2:network/cells/item_storage_components_cell_1k_part" })
    for (let index = 0; index < 5; index++) {
        let circuit = `#gtceu:circuits/${GTValues.VN[index + 1].toLowerCase()}`
        let glass = index == 0 ? "minecraft:glass" : "gtceu:tempered_glass"
        event.shaped(Item.of("ae2:cell_component_1k", Math.pow(2, index)), [
            "ABA",
            "BCB",
            "ABA"
        ], {
            A: glass,
            B: "gtceu:red_alloy_plate",
            C: circuit
        }).id(`kubejs:ae2/storage_component_1k_${Math.pow(2, index)}`)
    }

    // Wireless Receiver
    event.remove({ id: "ae2:network/wireless_part" })
    event.shaped(Item.of("ae2:wireless_receiver"), [
        " A ",
        "BCB",
        " B "
    ], {
        A: "gtceu:ev_emitter",
        B: "gtceu:titanium_plate",
        C: "ae2:fluix_pearl"
    }).id("kubejs:ae2/wirelss_receiver")

    // AE2 Cards
    event.remove({ id: "ae2:materials/basiccard" })
    event.shaped("ae2:basic_card", [
        "AB ",
        "ACB",
        "AB "
    ], {
        A: "gtceu:fine_copper_wire",
        B: "gtceu:iron_plate",
        C: "ae2:calculation_processor"
    }).id("kubejs:ae2/basic_card")
    event.remove({ id: "ae2:materials/advancedcard" })
    event.shaped("ae2:advanced_card", [
        "AB ",
        "ACB",
        "AB "
    ], {
        A: "gtceu:fine_aluminium_wire",
        B: "gtceu:electrical_steel_plate",
        C: "ae2:calculation_processor"
    }).id("kubejs:ae2/advanced_card")

    // Network Memory Card
    event.remove({ id: "ae2:tools/network_memory_card" })
    event.shapeless("ae2:memory_card", ["#gtceu:circuits/hv", "ae2:basic_card"]).id("kubejs:ae2/memory_card")

    // Crafting Card
    event.remove({ id: "ae2:materials/cardcrafting"})
    event.shapeless("ae2:crafting_card", ["minecraft:crafting_table", "ae2:basic_card", "#gtceu:circuits/ev"])

    // Level Emitter
    event.remove({ id: "ae2:network/parts/level_emitter" })
    event.shapeless("ae2:level_emitter", ["minecraft:redstone_torch", "gtceu:aluminium_plate", "ae2:calculation_processor", "#forge:rods/stainless_steel"]).id("kubejs:ae2/level_emitter")

    // Energy level Emitter
    event.remove({ id: "ae2:network/parts/energy_level_emitter" })
    event.shapeless("ae2:energy_level_emitter", ["ae2:level_emitter", "#forge:gems/certus_quartz"]).id("kubejs:ae2/energy_level_emitter").id("kubejs:ae2/energy_level_emitter")

    // Processors
    event.remove({ id: "ae2:inscriber/silicon_print" })
    const wafers = [
        ["gtceu:", "silicon_wafer"],
        ["gtceu:", "phosphorus_wafer"],
        ["gtceu:", "naquadah_wafer"],
        ["gtceu:", "neutronium_wafer"],
        ["kubejs:", "null_wafer"]
    ]
    if (doHarderPrintedSilicon) {
        // Use only Greg wafers for printed silicon in EM
        wafers.forEach((wafer, index) => {
            event.custom({
                "type": "ae2:inscriber",
                "ingredients": {
                    "middle": {
                        "item": (wafer[0] + wafer[1])
                    },
                    "top": {
                        "item": "ae2:silicon_press"
                    }
                },
                "mode": "inscribe",
                "result": {
                    "item": "ae2:printed_silicon",
                    "count": 2 ** index
                }
            }).id("kubejs:ae2/" + wafer[1] + "_print")
        })
    } else {
        // Use AE2 silicon in other modes
        event.custom({
            "type": "ae2:inscriber",
            "ingredients": {
                "middle": {
                    "item": "ae2:silicon"
                },
                "top": {
                    "item": "ae2:silicon_press"
                }
            },
            "mode": "inscribe",
            "result": {
                "item": "ae2:printed_silicon"
            }
        }).id("kubejs:ae2/silicon_print")
    }

    event.remove({ id: "ae2:inscriber/logic_processor" })
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": {
            "bottom": {
                "item": "ae2:printed_silicon"
            },
            "middle": {
                "tag": "gtceu:circuits/lv"
            },
            "top": {
                "item": "ae2:printed_logic_processor"
            }
        },
        "mode": "press",
        "result": {
            "item": "ae2:logic_processor"
        }
    }).id("kubejs:ae2/logic_processor")

    event.remove({ id: "ae2:inscriber/calculation_processor" })
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": {
            "bottom": {
                "item": "ae2:printed_silicon"
            },
            "middle": {
                "tag": "gtceu:circuits/lv"
            },
            "top": {
                "item": "ae2:printed_calculation_processor"
            }
        },
        "mode": "press",
        "result": {
            "item": "ae2:calculation_processor"
        }
    }).id("kubejs:ae2/calculation_processor")

    event.remove({ id: "ae2:inscriber/engineering_processor" })
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": {
            "bottom": {
                "item": "ae2:printed_silicon"
            },
            "middle": {
                "tag": "gtceu:circuits/lv"
            },
            "top": {
                "item": "ae2:printed_engineering_processor"
            }
        },
        "mode": "press",
        "result": {
            "item": "ae2:engineering_processor"
        }
    }).id("kubejs:ae2/engineering_processor")

    // Storage bus
    event.remove({ id: "ae2:network/parts/storage_bus" })
    event.shapeless("ae2:storage_bus", ["ae2:interface", "gtceu:mv_electric_piston", "gtceu:mv_electric_pump"]).id("kubejs:ae2/storage_bus")

    // Busses
    event.remove({ id: "ae2:network/parts/import_bus" })
    event.shaped("ae2:export_bus", [
        " A ",
        "DBD",
        " C "
    ], {
        A: "gtceu:mv_electric_pump",
        B: "ae2:formation_core",
        C: "gtceu:mv_electric_piston",
        D: "gtceu:aluminium_plate"
    }).id("kubejs:ae2/export_bus")
    event.remove({ id: "ae2:network/parts/export_bus" })
    event.shaped("ae2:import_bus", [
        " A ",
        "DBD",
        " C "
    ], {
        A: "gtceu:mv_electric_pump",
        B: "ae2:annihilation_core",
        C: "gtceu:mv_electric_piston",
        D: "gtceu:aluminium_plate"
    }).id("kubejs:ae2/import_bus")

    // P2P
    event.remove({ id: "ae2:network/parts/tunnels_me" })
    event.shaped("ae2:me_p2p_tunnel", [
        " A ",
        "ABA",
        "CCC"
    ], {
        A: "gtceu:stainless_steel_plate",
        B: "ae2:engineering_processor",
        C: "gtceu:fluix_plate"
    }).id("kubejs:ae2/p2p_tunnel")

    // Cable Anchor
    event.recipes.gtceu.wiremill("ae2:cable_anchor")
        .itemInputs("gtceu:steel_bolt")
        .itemOutputs("2x ae2:cable_anchor")
        .duration(20)
        .EUt(GTValues.VHA[GTValues.LV])

    // Cables
    event.remove({ id: "ae2:network/parts/quartz_fiber_part" })
    event.remove({ id: "gtceu:shapeless/gem_to_gem_flawedgem_nether_quartz" })
    event.remove({ id: "ae2:network/cables/glass_fluix" })

    event.recipes.gtceu.wiremill("kubejs:ae2/quartz_fiber")
        .itemInputs("ae2:certus_quartz_crystal")
        .itemOutputs("ae2:quartz_fiber")
        .duration(50)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    event.recipes.gtceu.alloy_smelter("kubejs:ae2/fluix_cable")
        .itemInputs(["ae2:fluix_dust", "ae2:quartz_fiber"])
        .itemOutputs("2x ae2:fluix_glass_cable")
        .duration(50)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)


    // Skystone
    event.recipes.gtceu.macerator("sky_stone_dust")
        .itemInputs("ae2:sky_stone_block")
        .itemOutputs("ae2:sky_dust")
        .duration(120)
        .EUt(GTValues.VA[GTValues.ULV])

    // Budding Certus
    event.recipes.gtceu.autoclave("flawless_budding")
        .itemInputs("ae2:flawed_budding_quartz", "ae2:charged_certus_quartz_crystal")
        .inputFluids("gtceu:distilled_water 100")
        .itemOutputs("ae2:flawless_budding_quartz")
        .duration(20)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.mixer("fluix")
        .itemInputs("ae2:charged_certus_quartz_crystal", "minecraft:redstone", "minecraft:quartz")
        .inputFluids(Fluid.of("minecraft:water", 100))
        .itemOutputs("2x ae2:fluix_crystal")
        .duration(20)
        .EUt(GTValues.VA[GTValues.ULV])
        .circuit(3)

    event.recipes.gtceu.compressor("fluix_plate")
        .itemInputs("ae2:fluix_dust")
        .itemOutputs("gtceu:fluix_plate")
        .duration(400)
        .EUt(2)

    // Cable Recipes
    event.remove({ id: "ae2:network/cables/covered_fluix" })
    event.shapeless("ae2:fluix_smart_cable", ["ae2:fluix_covered_cable", "#forge:small_dusts/redstone", "#forge:small_dusts/glowstone"])
        .id("ae2:network/cables/smart_fluix")

    // Terminal
    event.remove({ id: "ae2:network/parts/terminals" })
    event.shapeless("ae2:terminal", ["#ae2:illuminated_panel", "#gtceu:circuits/lv"]).id("kubejs:ae2_terminal")

    // Cable stuff
    const colors = ["black", "blue", "brown", "cyan", "gray", "green", "light_blue", "light_gray", "lime", "magenta", "orange", "pink", "purple", "red", "white", "yellow"]

    function washToFluix(wash) {
        event.shaped(`8x ae2:fluix_${wash}_cable`, [
            "CCC",
            "CDC",
            "CCC"
        ], {
            C: `#ae2:${wash}_cable`,
            D: "#ae2:can_remove_color"
        })
    }

    function coveredDenseCable(color) {
        event.shaped(`ae2:${color}_covered_dense_cable`, [
            "CC",
            "CC"
        ], {
            C: `ae2:${color}_covered_cable`
        })
    }

    function smartDenseCable(color) {
        event.shaped(`ae2:${color}_smart_dense_cable`, [
            "CC",
            "CC"
        ], {
            C: `ae2:${color}_smart_cable`
        })
    }


    washToFluix("covered")
    washToFluix("covered_dense")
    washToFluix("smart_dense")
    washToFluix("glass")
    washToFluix("smart")

    colors.forEach(coveredDenseCable)
    colors.forEach(smartDenseCable)

    event.recipes.gtceu.assembler("kubejs:ae2/fluix_covered_cable_rubber")
        .itemInputs("#ae2:glass_cable")
        .inputFluids("gtceu:rubber 144")
        .itemOutputs("ae2:fluix_covered_cable")
        .duration(100)
        .EUt(GTValues.VA[GTValues.ULV])
    event.recipes.gtceu.assembler("kubejs:ae2/fluix_covered_cable_silicone")
        .itemInputs("#ae2:glass_cable")
        .inputFluids("gtceu:silicone_rubber 72")
        .itemOutputs("ae2:fluix_covered_cable")
        .duration(100)
        .EUt(GTValues.VA[GTValues.ULV])
    event.recipes.gtceu.assembler("kubejs:ae2/fluix_covered_cable_styrene_butadiene")
        .itemInputs("#ae2:glass_cable")
        .inputFluids("gtceu:styrene_butadiene_rubber 36")
        .itemOutputs("ae2:fluix_covered_cable")
        .duration(100)
        .EUt(GTValues.VA[GTValues.ULV])

    colors.forEach(color => {
        event.recipes.gtceu.assembler(`kubejs:ae2/fluix_covered_cable_wool_${color}`)
            .itemInputs("#ae2:glass_cable", `#chipped:${color}_carpet`)
            .itemOutputs(`ae2:${color}_covered_cable`)
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])
    })

    // Presses
    function pressengrave(name, press, lens) {
        event.recipes.gtceu.laser_engraver(name)
            .itemInputs("gtceu:vanadium_steel_block")
            .notConsumable(lens)
            .itemOutputs(press)
            .duration(1600)
            .EUt(GTValues.VA[GTValues.MV])
    }

    pressengrave("kubejs:ae2/engineering_processor_press", "ae2:engineering_processor_press", "#forge:lenses/red");
    pressengrave("kubejs:ae2/calculation_processor_press", "ae2:calculation_processor_press", "#forge:lenses/blue");
    pressengrave("kubejs:ae2/silicon_press", "ae2:silicon_press", "#forge:lenses/light_blue");
    pressengrave("kubejs:ae2/logic_processor_press", "ae2:logic_processor_press", "#forge:lenses/green");
    pressengrave("kubejs:ae2/name_press", "ae2:name_press", "#forge:lenses/white");

    // MEGA cells
    event.remove({ id: "megacells:inscriber/accumulation_processor_press" })
    event.recipes.gtceu.laser_engraver("kubejs:mega/accumulation_processor_press")
        .itemInputs("gtceu:stainless_steel_block")
        .notConsumable("#forge:lenses/magenta")
        .itemOutputs("megacells:accumulation_processor_press")
        .duration(1600)
        .EUt(GTValues.VHA[GTValues.HV])
        .cleanroom(CleanroomType.CLEANROOM)

    event.remove({ id: "megacells:inscriber/accumulation_processor_print" })
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": {
            "middle": {
                "item": "gtceu:black_steel_ingot"
            },
            "top": {
                "item": "megacells:accumulation_processor_press"
            }
        },
        "mode": "inscribe",
        "result": {
            "item": "megacells:printed_accumulation_processor"
        }
    }).id("kubejs:mega/accumulation_processor_print")

    event.remove({ id: "megacells:inscriber/accumulation_processor" })
    event.custom({
        "type": "ae2:inscriber",
        "ingredients": {
            "bottom": {
                "item": "ae2:printed_silicon"
            },
            "middle": {
                "tag": "gtceu:circuits/hv"
            },
            "top": {
                "item": "megacells:printed_accumulation_processor"
            }
        },
        "mode": "press",
        "result": {
            "item": "megacells:accumulation_processor"
        }
    }).id("kubejs:mega/accumulation_processor")

    event.remove({ id: /megacells:cells\/standard\/.*storage_cell.*m$/ })

    event.remove({ id: "megacells:cells/mega_item_cell_housing" })
    event.shaped(Item.of("megacells:mega_item_cell_housing"), [
        "ABA",
        "B B",
        "ABA"
    ], {
        A: "gtceu:fine_lumium_wire",
        B: "gtceu:naquadah_plate"
    }).id("kubejs:mega/item_cell_housing")

    event.remove({ id: "megacells:cells/mega_fluid_cell_housing" })
    event.shaped(Item.of("megacells:mega_fluid_cell_housing"), [
        "ABA",
        "B B",
        "ABA"
    ], {
        A: "gtceu:fine_lumium_wire",
        B: "monilabs:crystal_matrix_plate"
    }).id("kubejs:mega/fluid_cell_housing")

    event.remove({ id: "megacells:network/cell_dock" })
    event.recipes.gtceu.assembler("kubejs:mega/cell_dock")
        .itemInputs("4x gtceu:stainless_steel_plate", "8x gtceu:aluminium_plate", "gtceu:mv_emitter", "gtceu:mv_sensor", "2x #gtceu:circuits/mv")
        .inputFluids("gtceu:soldering_alloy 144")
        .itemOutputs("8x megacells:cell_dock")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(200)

    event.remove({ id: "megacells:crafting/mega_crafting_unit" })
    event.shaped(Item.of("megacells:mega_crafting_unit"), [
        "ABA",
        "CDC",
        "ABA"
    ], {
        A: "gtceu:black_steel_plate",
        B: "ae2:logic_processor",
        C: "ae2:crafting_unit",
        D: "megacells:accumulation_processor"
    }).id("kubejs:mega/cpu_crafting_unit")

    // Remove Duplicates
    event.remove({ id: "megacells:crafting/mega_crafting_accelerator" })
    event.remove({ id: /megacells:network\/mega_interface/ })
    event.remove({ id: /megacells:network\/mega_pattern_provider/ })
    event.remove({ output: /megacells:sky_steel/ })

    // MAE2 compat stuff
    event.remove({ id: /mae2/, not: { id: /crafting_accelerator/ } })
    // Crafting Accelerators
    const accelerator_ingredients = [
        ["hv", "ae2:engineering_processor", "megacells:accumulation_processor", "gtceu:polyethylene", 1],
        ["ev", "ae2:engineering_processor", "megacells:accumulation_processor", "gtceu:polyethylene", 1.5],
        ["iv", "ae2:engineering_processor", "megacells:accumulation_processor", "gtceu:polytetrafluoroethylene", 1],
        ["luv", "ae2:engineering_processor", "megacells:accumulation_processor", "gtceu:polytetrafluoroethylene", 1.5],
    ]
    for (let index = 1; index <= 4; index++) {
        let curTier = Item.of(`mae2:${Math.pow(4, index)}x_crafting_accelerator`);

        let prevTier;
        if (index == 1) prevTier = Item.of("ae2:crafting_accelerator")
        else prevTier = Item.of(`mae2:${Math.pow(4, index - 1)}x_crafting_accelerator`)

        let curIngredients = accelerator_ingredients[index - 1]

        event.shaped(curTier, [
            "ACA",
            "SBS"
        ], {
            A: curIngredients[1],
            B: curIngredients[2],
            C: `#gtceu:circuits/${curIngredients[0]}`,
            S: Item.of(prevTier)
        }).id(`kubejs:ae2/crafting_accelerator_${Math.pow(4, index)}x`)

        // Cheaper ramp up to eliminate exponential effect
        event.recipes.gtceu.assembler(`kubejs:ae2/crafting_accelerator_${Math.pow(4, index)}x_assembler`)
            .itemInputs(
                Item.of(prevTier, 1),
                Item.of(curIngredients[1], 2),
                Item.of(curIngredients[2], 1),
                `#gtceu:circuits/${curIngredients[0]}`
            )
            .inputFluids(Fluid.of(curIngredients[3], 144 * curIngredients[4]))
            .itemOutputs(curTier)
            .EUt(GTValues.VA[GTValues.HV])
            .duration(200)
            .cleanroom(CleanroomType.CLEANROOM)
    }

    event.shaped("mae2:item_multi_p2p_tunnel", [
        " A ",
        "ABA",
        "CDC"
    ], {
        A: "gtceu:black_steel_plate",
        B: "megacells:accumulation_processor",
        C: "gtceu:sapphire_plate",
        D: "gtceu:fluix_plate"
    }).id("kubejs:ae2/multi_p2p_tunnel")


    // Greg circuits
    if (doHarderPrintedSilicon) {
        wafers.forEach((wafer, tier) => {
            event.recipes.gtceu.forming_press("ae2_printed_" + wafer[1] + "greg")
                .notConsumable("ae2:silicon_press")
                .itemInputs("4x " + wafer[0] + wafer[1])
                .itemOutputs(Item.of("ae2:printed_silicon", 4 * (2 ** tier)))
                .duration(10)
                .EUt(GTValues.VA[GTValues.EV])
        })
    } else {
        event.recipes.gtceu.forming_press("ae2_printed_silicon_greg")
            .notConsumable("ae2:silicon_press")
            .itemInputs("4x ae2:silicon")
            .itemOutputs("4x ae2:printed_silicon")
            .duration(10)
            .EUt(GTValues.VA[GTValues.EV])
    }

    // Processors
    const processor_info = [
        {type: "engineering", material:"minecraft:diamond"},
        {type: "logic", material:"minecraft:gold_ingot"},
        {type: "calculation", material:"ae2:certus_quartz_crystal"},
    ]

    processor_info.forEach(processorType => {
        event.recipes.gtceu.forming_press(`ae2_printed_${processorType.type}_greg`)
            .notConsumable(`ae2:${processorType.type}_processor_press`)
            .itemInputs(Item.of(processorType.material, 4))
            .itemOutputs(`4x ae2:printed_${processorType.type}_processor`)
            .duration(10)
            .EUt(GTValues.VA[GTValues.EV])

        event.recipes.gtceu.circuit_assembler(`ae2_${processorType.type}_processor_greg`)
            .itemInputs(`ae2:printed_${processorType.type}_processor`, "ae2:printed_silicon", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 72")
            .itemOutputs(`2x ae2:${processorType.type}_processor`)
            .duration(50)
            .EUt(1.25 * GTValues.V[GTValues.EV])
            .cleanroom(CleanroomType.CLEANROOM)
    })

    // Accumulation processor done separately
    event.recipes.gtceu.forming_press("mega_printed_accumulation_greg")
        .notConsumable("megacells:accumulation_processor_press")
        .itemInputs("4x gtceu:black_steel_plate")
        .itemOutputs("4x megacells:printed_accumulation_processor")
        .duration(10)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.circuit_assembler("mega_accumulation_processor_greg")
        .itemInputs("megacells:printed_accumulation_processor", "ae2:printed_silicon", "#gtceu:circuits/hv")
        .inputFluids("gtceu:indium_gallium_phosphide 36")
        .itemOutputs("2x megacells:accumulation_processor")
        .duration(100)
        .EUt(1.25 * GTValues.V[GTValues.EV])
        .cleanroom(CleanroomType.CLEANROOM)

    /** ExtendedAE **/

    // Pattern Modifier (NAE2's Pattern Multitool)
    event.remove({ id: "expatternprovider:pattern_modifier" })
    event.shapeless("expatternprovider:pattern_modifier", ["ae2:calculation_processor", "ae2:blank_pattern", "ae2:logic_processor"]).id("kubejs:epp/pattern_modifier")

    // Extended Pattern Provider
    event.remove({ id: "expatternprovider:epp" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_pattern_provider")
        .itemInputs("2x ae2:pattern_provider", "2x ae2:capacity_card", "4x gtceu:aluminium_plate")
        .itemOutputs("expatternprovider:ex_pattern_provider")
        .duration(180)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(4)

    event.remove({ id: "expatternprovider:epp_upgrade" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_pattern_provider_upgrade")
        .itemInputs("ae2:pattern_provider", "2x ae2:capacity_card", "4x gtceu:aluminium_plate")
        .itemOutputs("expatternprovider:pattern_provider_upgrade")
        .duration(180)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(3)

    // Extended Interface
    event.remove({ id: "expatternprovider:ei" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_interface")
        .itemInputs("2x ae2:interface", "2x ae2:capacity_card", "4x gtceu:aluminium_plate")
        .itemOutputs("expatternprovider:ex_interface")
        .duration(180)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(4)

    event.remove({ id: "expatternprovider:ei_upgrade" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_interface_upgrade")
        .itemInputs("ae2:interface", "2x ae2:capacity_card", "4x gtceu:aluminium_plate")
        .itemOutputs("expatternprovider:interface_upgrade")
        .duration(180)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(3)

    // Oversize Interface
    event.remove({ id: "expatternprovider:oversize_interface" })
    event.recipes.gtceu.assembler("kubejs:epp/oversize_interface")
        .itemInputs("8x expatternprovider:ex_interface", "8x ae2:capacity_card", "8x gtceu:stainless_steel_plate")
        .itemOutputs("expatternprovider:oversize_interface")
        .duration(240)
        .EUt(GTValues.VA[GTValues.HV])

    // Extended MA
    event.remove({ id: "expatternprovider:ex_molecular_assembler" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_molecular_assembler")
        .itemInputs("8x ae2:molecular_assembler", "8x gtceu:fluix_plate", "8x ae2:capacity_card")
        .itemOutputs("expatternprovider:ex_molecular_assembler")
        .duration(240)
        .EUt(GTValues.VA[GTValues.HV])

    // Extended Inscriber
    event.remove({ id: "expatternprovider:ex_inscriber" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_inscriber")
        .itemInputs("4x ae2:inscriber", "2x ae2:capacity_card")
        .itemOutputs("expatternprovider:ex_inscriber")
        .duration(180)
        .EUt(GTValues.VA[GTValues.LV])

    // Extended Charger
    event.remove({ id: "expatternprovider:ex_charger" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_charger")
        .itemInputs("4x ae2:charger", "2x ae2:capacity_card")
        .itemOutputs("expatternprovider:ex_charger")
        .duration(180)
        .EUt(GTValues.VA[GTValues.LV])

    // Tag storage bus
    event.remove({ id: "expatternprovider:tag_storage_bus" })
    event.recipes.gtceu.assembler("kubejs:epp/tag_storage_bus")
        .itemInputs("ae2:storage_bus", "2x gtceu:aluminium_plate", "ae2:logic_processor")
        .itemOutputs("expatternprovider:tag_storage_bus")
        .duration(180)
        .EUt(GTValues.VA[GTValues.LV])

    // Mod storage bus
    event.remove({ id: "expatternprovider:mod_storage_bus" })
    event.recipes.gtceu.assembler("kubejs:epp/mod_storage_bus")
        .itemInputs("ae2:storage_bus", "2x gtceu:aluminium_plate", "ae2:calculation_processor")
        .itemOutputs("expatternprovider:mod_storage_bus")
        .duration(180)
        .EUt(GTValues.VA[GTValues.LV])

    // Extended Pattern Access Terminal
    // Note that the terminal doesn't have a fullblock version.
    event.remove({ id: "expatternprovider:epa" })
    event.shapeless("expatternprovider:ex_pattern_access_part", ["ae2:pattern_access_terminal", "ae2:logic_processor"]).id("expatternprovider:epa_upgrade")
    event.shapeless("expatternprovider:ex_pattern_access_part", ["#ae2:illuminated_panel", "ae2:engineering_processor", "#ae2:pattern_provider", "ae2:logic_processor"]).id("expatternprovider:epa_direct")

    // ExtendedAE Silicon Block
    event.remove({id:"expatternprovider:silicon_block"})

    // Circuit cutter
    event.remove({ id: "expatternprovider:circuit_cutter" })
    event.remove({ id: /expatternprovider.*cutter/ })

    // ME packing tape
    event.shapeless("expatternprovider:me_packing_tape", ["gtceu:basic_tape", "ae2:fluix_dust"]).id("expatternprovider:tape")

    // Assembler Matrix
    // Assembler Matrix Frame
    event.remove({ id: "expatternprovider:assembler_matrix_frame" })
    event.recipes.gtceu.assembler("kubejs:epp/assembler_matrix_frame")
        .itemInputs("4x gtceu:mythril_plate", "4x gtceu:blue_steel_frame", "gtceu:plascrete", "#gtceu:circuits/hv")
        .inputFluids("gtceu:polyethylene 288")
        .itemOutputs("4x expatternprovider:assembler_matrix_frame")
        .duration(150)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    // Assembler Matrix Wall
    event.remove({ id: "expatternprovider:assembler_matrix_wall" })
    event.recipes.gtceu.assembler("kubejs:epp/assembler_matrix_wall")
        .itemInputs("expatternprovider:assembler_matrix_frame", "gtceu:hv_electric_motor")
        .itemOutputs("expatternprovider:assembler_matrix_wall")
        .circuit(1)
        .duration(100)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    // Assembler Matrix Glass
    event.remove({ id: "expatternprovider:assembler_matrix_glass" })
    event.recipes.gtceu.assembler("kubejs:epp/assembler_matrix_glass")
        .itemInputs("expatternprovider:assembler_matrix_frame", "gtceu:hv_electric_motor", "ae2:quartz_glass")
        .itemOutputs("expatternprovider:assembler_matrix_glass")
        .circuit(2)
        .duration(100)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    // Assembler Matrix Pattern Core
    event.remove({ id: "expatternprovider:assembler_matrix_pattern" })
    event.recipes.gtceu.assembler("kubejs:epp/assembler_matrix_pattern")
        .itemInputs("4x expatternprovider:assembler_matrix_frame", "4x ae2:engineering_processor", "expatternprovider:ex_pattern_provider", "6x ae2:blue_lumen_paint_ball")
        .inputFluids("gtceu:polyethylene 288")
        .itemOutputs("expatternprovider:assembler_matrix_pattern")
        .duration(150)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    // Assembler Matrix Craft Core
    event.remove({ id: "expatternprovider:assembler_matrix_crafter" })
    event.recipes.gtceu.assembler("kubejs:epp/assembler_matrix_crafter")
        .itemInputs("4x expatternprovider:assembler_matrix_frame", "4x ae2:engineering_processor", "expatternprovider:ex_molecular_assembler", "6x ae2:purple_lumen_paint_ball")
        .inputFluids("gtceu:polyethylene 288")
        .itemOutputs("expatternprovider:assembler_matrix_crafter")
        .duration(150)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    // Assembler Matrix Speed Core
    event.remove({ id: "expatternprovider:assembler_matrix_speed" })
    event.recipes.gtceu.assembler("kubejs:epp/assembler_matrix_speed")
        .itemInputs("4x expatternprovider:assembler_matrix_frame", "4x megacells:accumulation_processor", "mae2:4x_crafting_accelerator", "expatternprovider:ex_pattern_provider", "expatternprovider:ex_molecular_assembler", "6x ae2:red_lumen_paint_ball")
        .inputFluids("gtceu:polyethylene 288")
        .itemOutputs("expatternprovider:assembler_matrix_speed")
        .duration(150)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    // Misc stuff
    event.shaped("expatternprovider:ingredient_buffer", [
        "ISI",
        "GCG",
        "ISI"
    ], {
        I: "gtceu:iron_plate",
        S: "ae2:cell_component_1k",
        G: "ae2:quartz_glass",
        C: "gtceu:lv_hermetic_casing"
    }).id("expatternprovider:ingredient_buffer")

    event.replaceInput({ id: "expatternprovider:crystal_fixer" }, "minecraft:iron_ingot", "gtceu:iron_plate")

    event.remove({ id: "expatternprovider:ex_drive" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_drive")
        .itemInputs("2x ae2:drive", "4x gtceu:fluix_plate", "ae2:capacity_card")
        .itemOutputs("expatternprovider:ex_drive")
        .duration(240)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(4)

    event.remove({ id: "expatternprovider:ex_drive_upgrade" })
    event.recipes.gtceu.assembler("kubejs:epp/ex_drive_upgrade")
        .itemInputs("1x ae2:drive", "4x gtceu:fluix_plate", "ae2:capacity_card")
        .itemOutputs("expatternprovider:drive_upgrade")
        .duration(240)
        .EUt(GTValues.VA[GTValues.MV])
        .circuit(3)

    // Quantum Bridge Card
    event.remove({ id: "ae2wtlib:quantum_bridge_card" })
    event.custom({
        type: "ae2:inscriber",
        ingredients: {
            bottom: {
                item: "ae2:singularity"
            },
            middle: {
                item: "ae2:advanced_card"
            },
            top: {
                item: "ae2:singularity"
            }
        },
        mode: "press",
        result: { item: "ae2wtlib:quantum_bridge_card" }
    }).id("kubejs:ae2wtlib/quantum_bridge_card")

    // Vibrant Quartz Glass
    event.remove({ output: "ae2:quartz_vibrant_glass" })
    event.recipes.gtceu.alloy_smelter("kubejs:vibrant_quartz_glass")
        .itemInputs("ae2:quartz_glass", "gtceu:vibrant_alloy_dust")
        .itemOutputs("ae2:quartz_vibrant_glass")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    // Semi-Vibrant Quartz Glass
    event.recipes.gtceu.alloy_smelter("mae2:cloud_chamber")
        .itemInputs("ae2:quartz_vibrant_glass", "gtceu:small_amethyst_dust")
        .itemOutputs("mae2:cloud_chamber")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    // Faulty Memory Card
    event.shapeless("mae2:faulty_card", ["ae2:memory_card", "#ae2:knife"])

    // Network Analyser
    event.remove({ id:"ae2netanalyser:analyser"})
    event.shaped(Item.of("ae2netanalyser:network_analyser"), [
        "R R",
        "DSD",
        "FDF"
    ], {
        R: "gtceu:electrical_steel_rod",
        D: "gtceu:dark_steel_plate",
        F: "gtceu:fluix_plate",
        S: "gtceu:mv_sensor"
    }).id("kubejs:ae2netanalyser/network_analyser")
})
