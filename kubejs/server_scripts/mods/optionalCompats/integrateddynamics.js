/**
 * Compat for Integrated Dynamics & Tunnels (requires both).
 */

if (Platform.isLoaded("integrateddynamics") && Platform.isLoaded("integratedtunnels")) {
    console.log("Integrated Dynamics and Tunnels found, loading compat scripts...")
    ServerEvents.recipes(event => {
        // Remove the recipe tabs, also fuck you "ID-C"
        event.remove({ id: /^integrateddynamics:(drying_basin|mechanical_drying_basin|squeezer|mechanical_squeezer)/ })

        // Add Menril processing
        event.recipes.gtceu.extractor("menril_resin_from_logs")
            .itemInputs("integrateddynamics:menril_log")
            .chancedOutput("integrateddynamics:crystalized_menril_chunk", 1250, 0)
            .outputFluids("integrateddynamics:menril_resin 288")
            .duration(20)
            .EUt(GTValues.VH[GTValues.LV])
        event.recipes.gtceu.fluid_solidifier("menril_block_from_fluid")
            .notConsumable("gtceu:block_casting_mold")
            .inputFluids("integrateddynamics:menril_resin 1296")
            .itemOutputs("integrateddynamics:crystalized_menril_block")
            .duration(80)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.extractor("menril_resin_from_chunks")
            .itemInputs("integrateddynamics:crystalized_menril_chunk")
            .outputFluids("integrateddynamics:menril_resin 144")
            .duration(52)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.extractor("menril_resin_from_blocks")
            .itemInputs("integrateddynamics:crystalized_menril_block")
            .outputFluids("integrateddynamics:menril_resin 1296")
            .duration(468)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.forge_hammer("menril_chunks_from_blocks")
            .itemInputs("integrateddynamics:crystalized_menril_block")
            .itemOutputs("9x integrateddynamics:crystalized_menril_chunk")
            .duration(100)
            .EUt(0.75 * GTValues.V[GTValues.ULV])
        event.recipes.gtceu.compressor("menril_block_from_chunks")
            .itemInputs("9x integrateddynamics:crystalized_menril_chunk")
            .itemOutputs("integrateddynamics:crystalized_menril_block")
            .duration(300)
            .EUt(0.25 * GTValues.V[GTValues.ULV])

        // Add Chorus processing
        event.recipes.gtceu.mixer("liquid_chorus_production")
            .itemInputs("minecraft:chorus_fruit")
            .inputFluids("integrateddynamics:menril_resin 144")
            .outputFluids("integrateddynamics:liquid_chorus 144")
            .duration(80)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.fluid_solidifier("chorus_block_from_fluid")
            .notConsumable("gtceu:block_casting_mold")
            .inputFluids("integrateddynamics:liquid_chorus 1296")
            .itemOutputs("integrateddynamics:crystalized_chorus_block")
            .duration(120)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.extractor("liquid_chorus_from_chunks")
            .itemInputs("integrateddynamics:crystalized_chorus_chunk")
            .outputFluids("integrateddynamics:liquid_chorus 144")
            .duration(78)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.extractor("liquid_chorus_from_blocks")
            .itemInputs("integrateddynamics:crystalized_chorus_block")
            .outputFluids("integrateddynamics:liquid_chorus 1296")
            .duration(702)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.forge_hammer("chorus_chunks_from_blocks")
            .itemInputs("integrateddynamics:crystalized_chorus_block")
            .itemOutputs("9x integrateddynamics:crystalized_chorus_chunk")
            .duration(150)
            .EUt(0.75 * GTValues.V[GTValues.ULV])
        event.recipes.gtceu.compressor("chorus_block_from_chunks")
            .itemInputs("9x integrateddynamics:crystalized_chorus_chunk")
            .itemOutputs("integrateddynamics:crystalized_chorus_block")
            .duration(450)
            .EUt(0.25 * GTValues.V[GTValues.ULV])

        // Logic Cables
        event.remove({ output: "integrateddynamics:cable" })
        event.shaped("2x integrateddynamics:cable", [
            "AAA",
            "BCB",
            "AAA"
        ], {
            A: "integrateddynamics:crystalized_menril_chunk",
            B: "gtceu:iron_rod",
            C: "gtceu:fine_red_alloy_wire"
        })
        event.shaped("4x integrateddynamics:cable", [
            "AAA",
            "BCB",
            "AAA"
        ], {
            A: "integrateddynamics:crystalized_menril_chunk",
            B: "gtceu:steel_rod",
            C: "gtceu:fine_red_alloy_wire"
        })
        event.recipes.gtceu.assembler("cheaper_id_cable")
            .itemInputs("6x integrateddynamics:crystalized_menril_chunk", "2x gtceu:steel_rod", "gtceu:fine_red_alloy_wire")
            .itemOutputs("8x integrateddynamics:cable")
            .duration(100)
            .EUt(GTValues.VA[GTValues.HV])

        // Input/Output Variable Transformers
        event.remove({ id: "integrateddynamics:crafting/variable_transformer_input" })
        event.remove({ id: "integrateddynamics:crafting/variable_transformer_output" })
        event.recipes.gtceu.assembler("variable_transformer_input")
            .itemInputs("4x integrateddynamics:crystalized_menril_chunk", "2x integrateddynamics:variable", "#gtceu:circuits/ulv")
            .inputFluids("gtceu:redstone 144")
            .circuit(1)
            .itemOutputs("4x integrateddynamics:variable_transformer_input")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.assembler("variable_transformer_output")
            .itemInputs("4x integrateddynamics:crystalized_menril_chunk", "2x integrateddynamics:variable", "#gtceu:circuits/ulv")
            .inputFluids("gtceu:redstone 144")
            .circuit(2)
            .itemOutputs("4x integrateddynamics:variable_transformer_output")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.shapeless("integrateddynamics:variable_transformer_output", ["integrateddynamics:variable_transformer_input"])
        event.recipes.shapeless("integrateddynamics:variable_transformer_input", ["integrateddynamics:variable_transformer_output"])

        // Variable Cards (quite variable indeed)
        event.remove({ id: "integrateddynamics:crafting/variable" })
        event.recipes.gtceu.forming_press("variable_cards")
            .itemInputs("8x integrateddynamics:crystalized_menril_chunk", "#gtceu:circuits/ulv")
            .itemOutputsRanged("16x integrateddynamics:variable", 16, 24)
            .duration(300)
            .EUt(GTValues.VA[GTValues.LV])

        // Facades
        event.remove({ id: "integrateddynamics:crafting/facade" })
        event.shaped("32x integrateddynamics:facade", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "gtceu:sticky_resin",
            B: "integrateddynamics:crystalized_menril_block"
        })

        // Wrench and Labeller
        event.remove({ id: "integrateddynamics:crafting/wrench" })
        event.remove({ id: "integrateddynamics:crafting/labeller" })
        event.shaped("integrateddynamics:wrench", [
            " AB",
            " CA",
            "C  "
        ], {
            A: "integrateddynamics:crystalized_menril_chunk",
            B: "#gtceu:circuits/lv",
            C: "minecraft:stick"
        })
        event.shaped("integrateddynamics:labeller", [
            " AB",
            " CA",
            "C  "
        ], {
            A: "minecraft:paper",
            B: "integrateddynamics:crystalized_menril_chunk",
            C: "minecraft:stick"
        })

        // Torches
        event.remove({ id: "integrateddynamics:crafting/menril_torch" })
        event.remove({ output: "integrateddynamics:menril_torch_stone" })
        event.shaped("4x integrateddynamics:menril_torch", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "minecraft:torch",
            B: "integrateddynamics:menril_berries"
        })
        event.shapeless(("integrateddynamics:menril_torch_stone"), ["integrateddynamics:menril_torch", "minecraft:cobblestone"])
        event.recipes.gtceu.assembler("menril_torches")
            .itemInputs("3x minecraft:torch", "integrateddynamics:menril_berries")
            .itemOutputs("5x integrateddynamics:menril_torch")
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])
        event.recipes.gtceu.assembler("stone_menril_torches")
            .itemInputs("4x integrateddynamics:menril_torch", "minecraft:cobblestone")
            .itemOutputs("4x integrateddynamics:menril_torch_stone")
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])

        // Stairs (Assembler recipes)
        event.recipes.gtceu.assembler("menril_stairs")
            .itemInputs("3x integrateddynamics:menril_planks")
            .itemOutputs("4x integrateddynamics:menril_planks_stairs")
            .circuit(7)
            .duration(100)
            .EUt(GTValues.VH[GTValues.ULV])
        event.recipes.gtceu.assembler("menril_block_stairs")
            .itemInputs("3x integrateddynamics:crystalized_menril_block")
            .itemOutputs("4x integrateddynamics:crystalized_menril_block_stairs")
            .circuit(7)
            .duration(100)
            .EUt(GTValues.VH[GTValues.ULV])
        event.recipes.gtceu.assembler("menril_brick_stairs")
            .itemInputs("3x integrateddynamics:crystalized_menril_brick")
            .itemOutputs("4x integrateddynamics:crystalized_menril_brick_stairs")
            .circuit(7)
            .duration(100)
            .EUt(GTValues.VH[GTValues.ULV])
        event.recipes.gtceu.assembler("chorus_block_stairs")
            .itemInputs("3x integrateddynamics:crystalized_chorus_block")
            .itemOutputs("4x integrateddynamics:crystalized_chorus_block_stairs")
            .circuit(7)
            .duration(100)
            .EUt(GTValues.VH[GTValues.ULV])
        event.recipes.gtceu.assembler("chorus_brick_stairs")
            .itemInputs("3x integrateddynamics:crystalized_chorus_brick")
            .itemOutputs("4x integrateddynamics:crystalized_chorus_brick_stairs")
            .circuit(7)
            .duration(100)
            .EUt(GTValues.VH[GTValues.ULV])

        // Slabs (Cutter recipes)
        function Cutting(mod, input, output, outMod, lubeMod, lubeTime, energyCost) {
            event.recipes.gtceu.cutter(`${output}_water`)
                .itemInputs(`${mod}:${input}`)
                .inputFluids(`minecraft:water ${lubeMod * 4}`)
                .itemOutputs(`${outMod}x ${mod}:${output}`)
                .duration(lubeTime * 2)
                .EUt(energyCost)

            event.recipes.gtceu.cutter(`${output}_distilled_water`)
                .itemInputs(`${mod}:${input}`)
                .inputFluids(`gtceu:distilled_water ${lubeMod * 3}`)
                .itemOutputs(`${outMod}x ${mod}:${output}`)
                .duration(lubeTime * 1.5)
                .EUt(energyCost)

            event.recipes.gtceu.cutter(`${output}`)
                .itemInputs(`${mod}:${input}`)
                .inputFluids(`gtceu:lubricant ${lubeMod}`)
                .itemOutputs(`${outMod}x ${mod}:${output}`)
                .duration(lubeTime)
                .EUt(energyCost)
        }
        Cutting("integrateddynamics", "menril_planks", "menril_slab", 2, 1, 200, GTValues.VHA[GTValues.ULV])
        Cutting("integrateddynamics", "crystalized_menril_block", "crystalized_menril_block_slab", 2, 1, 40, GTValues.V[GTValues.ULV])
        Cutting("integrateddynamics", "crystalized_menril_brick", "crystalized_menril_brick_slab", 2, 1, 40, GTValues.V[GTValues.ULV])
        Cutting("integrateddynamics", "crystalized_chorus_block", "crystalized_chorus_block_slab", 2, 1, 40, GTValues.V[GTValues.ULV])
        Cutting("integrateddynamics", "crystalized_chorus_brick", "crystalized_chorus_brick_slab", 2, 1, 40, GTValues.V[GTValues.ULV])

        // Functional fullblocks
        event.remove({ id: "integrateddynamics:crafting/logic_programmer" })
        event.remove({ id: "integrateddynamics:crafting/variablestore" })
        event.remove({ id: "integrateddynamics:crafting/proxy" })
        event.remove({ id: "integrateddynamics:crafting/materializer" })
        event.remove({ id: "integrateddynamics:crafting/delay" })
        event.shaped("integrateddynamics:logic_programmer", [
            "ABA",
            "CDC",
            "ABA"
        ], {
            A: "gtceu:aluminium_plate",
            B: "#gtceu:circuits/mv",
            C: "integrateddynamics:cable",
            D: "minecraft:crafting_table"
        })
        event.shaped("integrateddynamics:variablestore", [
            "ABA",
            "CDC",
            "ABA"
        ], {
            A: "gtceu:aluminium_plate",
            B: "#gtceu:circuits/ulv",
            C: "integrateddynamics:cable",
            D: "gtceu:wood_crate"
        })
        event.recipes.gtceu.assembler("integrated_dynamics_proxy")
            .itemInputs("integrateddynamics:variablestore", "8x integrateddynamics:variable", "4x #gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(1)
            .itemOutputs("integrateddynamics:proxy")
            .duration(400)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("integrated_dynamics_materialiser")
            .itemInputs("8x integrateddynamics:variable", "4x #gtceu:circuits/ulv")
            .inputFluids("gtceu:redstone 288")
            .circuit(3)
            .itemOutputs("integrateddynamics:materializer")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("delayer")
            .itemInputs("integrateddynamics:variablestore", "4x #gtceu:circuits/lv", "2x minecraft:clock")
            .inputFluids("gtceu:redstone 288")
            .circuit(2)
            .itemOutputs("integrateddynamics:delay")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])

        // Part Enhancement: Offset
        event.remove({ id: "integrateddynamics:crafting/enhancement_offset" })
        event.recipes.gtceu.assembler("enhancement_offset")
            .itemInputs("2x integrateddynamics:variable_transformer_input", "2x integrateddynamics:variable_transformer_output", "#gtceu:circuits/mv", "minecraft:ender_eye")
            .circuit(7)
            .itemOutputs("integrateddynamics:enhancement_offset")
            .duration(100)
            .EUt(GTValues.VA[GTValues.MV])

        // Panels
        event.remove({ id: "integrateddynamics:crafting/part_static_light_panel" })
        event.remove({ id: "integrateddynamics:crafting/part_dynamic_light_panel" })
        event.remove({ id: "integrateddynamics:crafting/part_display_panel" })
        event.recipes.gtceu.assembler("static_panel")
            .itemInputs("2x #ae2:illuminated_panel", "8x integrateddynamics:menril_torch", "4x minecraft:glowstone_dust", "#gtceu:circuits/ulv")
            .inputFluids("integrateddynamics:menril_resin 576")
            .circuit(1)
            .itemOutputs("4x integrateddynamics:part_static_light_panel")
            .duration(200)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.assembler("static_panel_stone")
            .itemInputs("2x #ae2:illuminated_panel", "8x integrateddynamics:menril_torch_stone", "4x minecraft:glowstone_dust", "#gtceu:circuits/ulv")
            .inputFluids("integrateddynamics:menril_resin 576")
            .circuit(1)
            .itemOutputs("4x integrateddynamics:part_static_light_panel")
            .duration(200)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.assembler("dynamic_panel")
            .itemInputs("integrateddynamics:part_static_light_panel", "2x #gtceu:circuits/ulv")
            .circuit(2)
            .itemOutputs("integrateddynamics:part_dynamic_light_panel")
            .duration(200)
            .EUt(GTValues.VA[GTValues.LV])
        event.recipes.gtceu.assembler("display_panel")
            .itemInputs("integrateddynamics:part_dynamic_light_panel", "4x integrateddynamics:variable", "#gtceu:circuits/lv")
            .itemOutputs("integrateddynamics:part_display_panel")
            .duration(400)
            .EUt(GTValues.VA[GTValues.MV])

        // Readers and Writer
        event.remove({ id: "integrateddynamics:crafting/part_block_reader" })
        event.remove({ id: "integrateddynamics:crafting/part_fluid_reader" })
        event.remove({ id: "integrateddynamics:crafting/part_inventory_reader" })
        event.remove({ id: "integrateddynamics:crafting/part_network_reader" })
        event.remove({ id: "integrateddynamics:crafting/part_redstone_reader" })
        event.remove({ id: "integrateddynamics:crafting/part_redstone_writer" })
        event.recipes.gtceu.assembler("reader_block")
            .itemInputs("integrateddynamics:variable_transformer_input", "#gtceu:circuits/mv", "minecraft:observer")
            .inputFluids("gtceu:redstone 288")
            .circuit(9)
            .itemOutputs("integrateddynamics:part_block_reader")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("reader_fluid")
            .itemInputs("integrateddynamics:variable_transformer_input", "#gtceu:circuits/mv", "gtceu:aluminium_drum")
            .inputFluids("gtceu:redstone 288")
            .circuit(9)
            .itemOutputs("integrateddynamics:part_fluid_reader")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("reader_inventory")
            .itemInputs("integrateddynamics:variable_transformer_input", "#gtceu:circuits/mv", "gtceu:aluminium_crate")
            .inputFluids("gtceu:redstone 288")
            .circuit(9)
            .itemOutputs("integrateddynamics:part_inventory_reader")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("reader_network")
            .itemInputs("integrateddynamics:variable_transformer_input", "#gtceu:circuits/mv", "ae2:storage_bus")
            .inputFluids("gtceu:redstone 288")
            .circuit(9)
            .itemOutputs("integrateddynamics:part_network_reader")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("reader_redstone")
            .itemInputs("integrateddynamics:variable_transformer_input", "#gtceu:circuits/mv", "4x minecraft:redstone")
            .inputFluids("gtceu:redstone 288")
            .circuit(9)
            .itemOutputs("integrateddynamics:part_redstone_reader")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("writer_redstone")
            .itemInputs("integrateddynamics:variable_transformer_input", "#gtceu:circuits/mv", "4x minecraft:redstone")
            .inputFluids("gtceu:redstone 288")
            .circuit(10)
            .itemOutputs("integrateddynamics:part_redstone_writer")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])

        // Item & Fluid Covers
        event.remove({ id: "integratedtunnels:crafting/part_interface_item" })
        event.remove({ id: "integratedtunnels:crafting/part_interface_filter_item" })
        event.remove({ id: "integratedtunnels:crafting/part_importer_item" })
        event.remove({ id: "integratedtunnels:crafting/part_exporter_item" })
        event.remove({ id: "integratedtunnels:crafting/part_interface_fluid" })
        event.remove({ id: "integratedtunnels:crafting/part_interface_filter_fluid" })
        event.remove({ id: "integratedtunnels:crafting/part_importer_fluid" })
        event.remove({ id: "integratedtunnels:crafting/part_exporter_fluid" })
        event.recipes.gtceu.assembler("item_interface")
            .itemInputs("8x integrateddynamics:crystalized_menril_chunk", "gtceu:bronze_crate", "2x #gtceu:circuits/ulv")
            .inputFluids("gtceu:red_alloy 288")
            .itemOutputs("6x integratedtunnels:part_interface_item")
            .duration(100)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("filtered_item_interface")
            .itemInputs("2x integratedtunnels:part_interface_item", "gtceu:item_filter")
            .itemOutputs("2x integratedtunnels:part_interface_filter_item")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("item_importer")
            .itemInputs("2x integratedtunnels:part_interface_item", "2x integrateddynamics:variable_transformer_input", "ae2:annihilation_core", "#gtceu:circuits/ulv")
            .inputFluids("integrateddynamics:menril_resin 576")
            .itemOutputs("2x integratedtunnels:part_importer_item")
            .duration(300)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("item_exporter")
            .itemInputs("2x integratedtunnels:part_interface_item", "2x integrateddynamics:variable_transformer_output", "ae2:formation_core", "#gtceu:circuits/ulv")
            .inputFluids("integrateddynamics:menril_resin 576")
            .itemOutputs("2x integratedtunnels:part_exporter_item")
            .duration(300)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("fluid_interface")
            .itemInputs("8x integrateddynamics:crystalized_menril_chunk", "gtceu:bronze_drum", "2x #gtceu:circuits/ulv")
            .inputFluids("gtceu:red_alloy 288")
            .itemOutputs("6x integratedtunnels:part_interface_fluid")
            .duration(100)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("filtered_fluid_interface")
            .itemInputs("2x integratedtunnels:part_interface_fluid", "gtceu:fluid_filter")
            .itemOutputs("2x integratedtunnels:part_interface_filter_fluid")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("fluid_importer")
            .itemInputs("2x integratedtunnels:part_interface_fluid", "2x integrateddynamics:variable_transformer_input", "ae2:annihilation_core", "#gtceu:circuits/ulv")
            .inputFluids("integrateddynamics:menril_resin 576")
            .itemOutputs("2x integratedtunnels:part_importer_fluid")
            .duration(300)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("fluid_exporter")
            .itemInputs("2x integratedtunnels:part_interface_fluid", "2x integrateddynamics:variable_transformer_output", "ae2:formation_core", "#gtceu:circuits/ulv")
            .inputFluids("integrateddynamics:menril_resin 576")
            .itemOutputs("2x integratedtunnels:part_exporter_fluid")
            .duration(300)
            .EUt(GTValues.VA[GTValues.MV])

        // World Importers/Exporters
        event.recipes.gtceu.assembler("world_importer_item")
            .itemInputs("2x integrateddynamics:variable_transformer_input", "integratedtunnels:part_interface_item", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(4)
            .itemOutputs("integratedtunnels:part_importer_world_item")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("world_exporter_item")
            .itemInputs("2x integrateddynamics:variable_transformer_output", "integratedtunnels:part_interface_item", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(5)
            .itemOutputs("integratedtunnels:part_exporter_world_item")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("world_importer_fluid")
            .itemInputs("2x integrateddynamics:variable_transformer_input", "integratedtunnels:part_interface_fluid", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(4)
            .itemOutputs("integratedtunnels:part_importer_world_fluid")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("world_exporter_fluid")
            .itemInputs("2x integrateddynamics:variable_transformer_output", "integratedtunnels:part_interface_fluid", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(5)
            .itemOutputs("integratedtunnels:part_exporter_world_fluid")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("world_importer_block")
            .itemInputs("2x integrateddynamics:variable_transformer_input", "ae2:annihilation_plane", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(4)
            .itemOutputs("integratedtunnels:part_importer_world_block")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("world_exporter_block")
            .itemInputs("2x integrateddynamics:variable_transformer_output", "ae2:formation_plane", "#gtceu:circuits/lv")
            .inputFluids("gtceu:redstone 288")
            .circuit(5)
            .itemOutputs("integratedtunnels:part_exporter_world_block")
            .duration(200)
            .EUt(GTValues.VA[GTValues.MV])
    })
    console.log("Integrated Dynamics/Tunnels compat scripts successfully loaded!")
} else { console.log("Integrated Dynamics and/or Integrated Tunnels not found, skipping their compat scripts.") }
