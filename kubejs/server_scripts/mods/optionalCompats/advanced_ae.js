/**
 * Compat AdvAE recipes les goo UwU
 */

if (Platform.isLoaded("advanced_ae")) {
    console.log("Advanced AE found, loading compat scripts...")
    ServerEvents.recipes(event => {
        // Removing Reaction Chamber shit
        event.remove({ id: /advanced_ae:.*_chamber/ })
        event.remove({ id: "advanced_ae:certuscharger" })
        event.remove({ id: "advanced_ae:fluixcrystals" })
        event.remove({ id: /advanced_ae:.*budding/ })
        event.remove({ id: "advanced_ae:quartzcrystal" })
        event.remove({ id: "advanced_ae:singularity" })
        event.remove({ id: "advanced_ae:fluixcrystalfromdust" })
        event.remove({ id: "advanced_ae:quantum_infusion" })

        // Q. Crafter and Throughput Monitor
        event.remove({ id: "advanced_ae:quantumcrafter" })
        event.shaped("advanced_ae:quantum_crafter", [
            "CSC",
            "MAM",
            "CPC"
        ], {
            A: "gtceu:ev_assembler",
            C: "#gtceu:circuits/iv",
            M: "expatternprovider:ex_molecular_assembler",
            P: "ae2:crafting_accelerator",
            S: "ae2:16k_crafting_storage"
        })

        event.remove({ id: "advanced_ae:throughput_monitor_configurator" })
        event.shaped("advanced_ae:throughput_monitor_configurator", [
            " MR",
            " RC",
            "R  "
        ], {
            C: "#gtceu:circuits/hv",
            M: "advanced_ae:throughput_monitor",
            R: "gtceu:stainless_steel_rod"
        })

        event.remove({ id: "advanced_ae:quantum_crafter_terminal" })
        event.shapeless("advanced_ae:quantum_crafter_terminal", ["#ae2:illuminated_panel", "ae2:logic_processor", "advanced_ae:quantum_crafter"]);

        event.remove({ id: "advanced_ae:throughput_monitor"})
        event.shapeless("advanced_ae:throughput_monitor", ["ae2:storage_monitor", "#gtceu:circuits/hv"]);

        // Quantum CPU blocks
        event.remove({ id: "advanced_ae:quantumstructure" })
        event.recipes.gtceu.assembler("quantum_glass")
            .itemInputs("gtceu:laminated_glass", "4x #gtceu:circuits/ulv")
            .inputFluids("gtceu:soldering_alloy 144")
            .itemOutputs("advanced_ae:quantum_structure")
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.EV])
            .circuit(6)

        event.remove({ id: "advanced_ae:quantumcore" })
        event.recipes.gtceu.assembly_line("quantum_cpu_core")
            .itemInputs(
                "2x mae2:16x_crafting_accelerator",
                "2x megacells:256m_crafting_storage",
                "32x ae2:singularity",
                "16x #gtceu:circuits/zpm",
                "12x advanced_ae:quantum_unit",
                "12x advanced_ae:quantum_unit",
                "24x advanced_ae:quantum_structure",
                "24x advanced_ae:quantum_structure"
            )
            .inputFluids("gtceu:advanced_soldering_alloy 2304")
            .itemOutputs("advanced_ae:quantum_core")
            .EUt(GTValues.VA[GTValues.ZPM])
            .duration(60 * 20)
            ["scannerResearch(java.util.function.UnaryOperator)"](b => b
                .researchStack("advanced_ae:quantum_unit")
                .duration(120 * 20)
                .EUt(GTValues.VA[GTValues.LuV])
            )
        event.remove({ id: "advanced_ae:quantumcore" })
        event.recipes.gtceu.assembly_line("quantum_cpu_core/living_soldering_alloy")
            .itemInputs(
                "2x mae2:16x_crafting_accelerator",
                "2x megacells:256m_crafting_storage",
                "32x ae2:singularity",
                "16x #gtceu:circuits/zpm",
                "12x advanced_ae:quantum_unit",
                "12x advanced_ae:quantum_unit",
                "24x advanced_ae:quantum_structure",
                "24x advanced_ae:quantum_structure"
            )
            .inputFluids("gtceu:living_soldering_alloy 1152")
            .itemOutputs("advanced_ae:quantum_core")
            .EUt(GTValues.VA[GTValues.ZPM])
            .duration(60 * 20)
            ["scannerResearch(java.util.function.UnaryOperator)"](b => b
                .researchStack("advanced_ae:quantum_unit")
                .duration(120 * 20)
                .EUt(GTValues.VA[GTValues.LuV])
            )

        event.remove({ id: "advanced_ae:quantumunit" })
        event.recipes.gtceu.assembler("quantum_crafting_unit")
            .itemInputs("2x ae2:crafting_unit", "4x megacells:accumulation_processor", "#gtceu:circuits/iv")
            .inputFluids("gtceu:advanced_soldering_alloy 72")
            .itemOutputs("advanced_ae:quantum_unit")
            .duration(5 * 20)
            .EUt(GTValues.VA[GTValues.LuV])
            .circuit(6)

        event.remove({ id: "advanced_ae:quantumstorage256" })
        event.recipes.gtceu.assembler("quantum_storage")
            .itemInputs("advanced_ae:quantum_unit", "2x megacells:cell_component_256m", "#gtceu:circuits/luv")
            .inputFluids("gtceu:advanced_soldering_alloy 144")
            .itemOutputs("advanced_ae:quantum_storage_256")
            .duration(10 * 20)
            .EUt(GTValues.VA[GTValues.LuV])

        event.remove({ id: "advanced_ae:quantumaccel" })
        event.recipes.gtceu.assembler("quantum_coprocessor")
            .itemInputs("advanced_ae:quantum_unit", "2x mae2:16x_crafting_accelerator", "#gtceu:circuits/luv")
            .inputFluids("gtceu:advanced_soldering_alloy 144")
            .itemOutputs("advanced_ae:quantum_accelerator")
            .duration(10 * 20)
            .EUt(GTValues.VA[GTValues.LuV])

        event.remove({ id: "advanced_ae:quantumdataentangler" })
        event.recipes.gtceu.assembly_line("quantum_storage_multiplier")
            .itemInputs(
                "16x gtceu:neutronium_frame",
                "32x advanced_ae:quantum_storage_256",
                "24x #gtceu:circuits/uhv",
                "4x gtceu:uv_field_generator",
                "2x kubejs:heart_of_a_universe",
                "32x gtceu:uhpic_chip",
                "32x gtceu:fine_ruthenium_trinium_americium_neutronate_wire",
                "gtceu:uv_parallel_hatch"
            )
            .inputFluids("gtceu:living_soldering_alloy 2304", "gtceu:tritanium 1152")
            .itemOutputs("advanced_ae:data_entangler")
            .EUt(GTValues.VA[GTValues.UHV])
            .duration(240 * 20)
            .stationResearch(b => b
                .researchStack("advanced_ae:quantum_storage_256")
                .CWUt(72, 384000)
                .EUt(GTValues.VA[GTValues.UV])
            )

        event.remove({ id: "advanced_ae:quantummultithreader" })
        event.recipes.gtceu.assembly_line("quantum_coprocessor_multiplier")
            .itemInputs(
                "16x gtceu:neutronium_frame",
                "32x advanced_ae:quantum_accelerator",
                "24x #gtceu:circuits/uhv",
                "4x gtceu:uv_field_generator",
                "2x kubejs:heart_of_a_universe",
                "32x gtceu:uhpic_chip",
                "32x gtceu:fine_ruthenium_trinium_americium_neutronate_wire",
                "gtceu:uv_parallel_hatch"
            )
            .inputFluids("gtceu:living_soldering_alloy 2304", "gtceu:tritanium 1152")
            .itemOutputs("advanced_ae:quantum_multi_threader")
            .EUt(GTValues.VA[GTValues.UHV])
            .duration(240 * 20)
            .stationResearch(b => b
                .researchStack("advanced_ae:quantum_accelerator")
                .CWUt(72, 384000)
                .EUt(GTValues.VA[GTValues.UV])
            )

        // Quantum Armour
        event.remove({ id: "advanced_ae:quantum_helmet" })
        event.recipes.gtceu.assembly_line("quantum_helmet")
            .itemInputs(
                "gtceu:nanomuscle_helmet",
                "gtceu:lapotronic_energy_orb_cluster",
                "gtceu:luv_field_generator",
                "2x gtceu:luv_fluid_regulator",
                "8x gtceu:platinum_octal_cable",
                "4x #gtceu:circuits/luv",
                "8x megacells:accumulation_processor",
                "12x gtceu:rhodium_plated_palladium_plate",
                "16x gtceu:naquadah_plate"
            )
            .inputFluids("gtceu:advanced_soldering_alloy 576", "gtceu:battery_alloy 1152")
            .itemOutputs("advanced_ae:quantum_helmet")
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(30 * 20)
            ["scannerResearch(java.util.function.UnaryOperator)"](b => b
                .researchStack("gtceu:nanomuscle_helmet")
                .duration(45 * 20)
                .EUt(GTValues.VA[GTValues.LuV])
            )
        event.remove({ id: "advanced_ae:quantum_chest" })
        event.recipes.gtceu.assembly_line("quantum_chestplate")
            .itemInputs(
                "gtceu:nanomuscle_chestplate",
                "gtceu:lapotronic_energy_orb_cluster",
                "gtceu:luv_field_generator",
                "2x gtceu:luv_robot_arm",
                "8x gtceu:platinum_octal_cable",
                "4x #gtceu:circuits/luv",
                "8x megacells:accumulation_processor",
                "12x gtceu:rhodium_plated_palladium_plate",
                "16x gtceu:naquadah_plate"
        )
            .inputFluids("gtceu:advanced_soldering_alloy 576", "gtceu:battery_alloy 1152")
            .itemOutputs("advanced_ae:quantum_chestplate")
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(30 * 20)
            ["scannerResearch(java.util.function.UnaryOperator)"](b => b
                .researchStack("gtceu:nanomuscle_chestplate")
                .duration(45 * 20)
                .EUt(GTValues.VA[GTValues.LuV])
            )
        event.remove({ id: "advanced_ae:quantum_leggings" })
        event.recipes.gtceu.assembly_line("quantum_leggings")
            .itemInputs(
                "gtceu:nanomuscle_leggings",
                "gtceu:lapotronic_energy_orb_cluster",
                "gtceu:luv_field_generator",
                "2x gtceu:luv_electric_piston",
                "8x gtceu:platinum_octal_cable",
                "4x #gtceu:circuits/luv",
                "8x megacells:accumulation_processor",
                "12x gtceu:rhodium_plated_palladium_plate",
                "16x gtceu:naquadah_plate"
            )
            .inputFluids("gtceu:advanced_soldering_alloy 576", "gtceu:battery_alloy 1152")
            .itemOutputs("advanced_ae:quantum_leggings")
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(30 * 20)
            ["scannerResearch(java.util.function.UnaryOperator)"](b => b
                .researchStack("gtceu:nanomuscle_leggings")
                .duration(45 * 20)
                .EUt(GTValues.VA[GTValues.LuV])
            )
        event.remove({ id: "advanced_ae:quantum_boots" })
        event.recipes.gtceu.assembly_line("quantum_boots")
            .itemInputs(
                "gtceu:nanomuscle_boots",
                "gtceu:lapotronic_energy_orb_cluster",
                "gtceu:luv_field_generator",
                "2x gtceu:luv_conveyor_module",
                "8x gtceu:platinum_octal_cable",
                "4x #gtceu:circuits/luv",
                "8x megacells:accumulation_processor",
                "12x gtceu:rhodium_plated_palladium_plate",
                "16x gtceu:naquadah_plate"
            )
            .inputFluids("gtceu:advanced_soldering_alloy 576", "gtceu:battery_alloy 1152")
            .itemOutputs("advanced_ae:quantum_boots")
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(30 * 20)
            ["scannerResearch(java.util.function.UnaryOperator)"](b => b
                .researchStack("gtceu:nanomuscle_boots")
                .duration(45 * 20)
                .EUt(GTValues.VA[GTValues.LuV])
            )

        // Quantum Armour Cards
        event.remove({ id: "advanced_ae:quantum_base_card" })
        event.recipes.gtceu.assembler("quantum_card_base")
            .itemInputs("ae2:advanced_card", "2x ae2:basic_card", "8x megacells:accumulation_processor", "4x ae2:logic_processor", "2x #gtceu:circuits/ev")
            .inputFluids("gtceu:advanced_soldering_alloy 144")
            .itemOutputs("advanced_ae:quantum_upgrade_base")
            .duration(10 * 20)
            .EUt(GTValues.VA[GTValues.IV])
            .circuit(1)

        event.remove({ output: /advanced_ae:.*_card/ })
        event.recipes.gtceu.forming_press("walk_speed_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "32x minecraft:sugar", "2x gtceu:ev_electric_motor")
            .itemOutputs("advanced_ae:walk_speed_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("sprint_speed_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "gtexolegs:iv_exoskeleton_legs")
            .itemOutputs("advanced_ae:sprint_speed_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("step_assist_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "2x gtceu:ev_conveyor_module")
            .itemOutputs("advanced_ae:step_assist_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("jump_height_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "2x gtceu:ev_electric_piston")
            .itemOutputs("advanced_ae:jump_height_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("lava_immunity_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "8x minecraft:blue_ice")
            .itemOutputs("advanced_ae:lava_immunity_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("flight_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "better_angel_ring:angel_ring")
            .itemOutputs("advanced_ae:flight_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("auto_feeding_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "4x minecraft:golden_carrot", "2x gtceu:ev_robot_arm")
            .itemOutputs("advanced_ae:auto_feeding_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("auto_stock_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "gtceu:me_stocking_input_bus", "2x gtceu:me_input_bus")
            .itemOutputs("advanced_ae:auto_stock_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("magnet_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "gtceu:hv_item_magnet", "2x gtceu:long_magnetic_samarium_rod")
            .itemOutputs("advanced_ae:magnet_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("reach_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "2x gtceu:iv_robot_arm", "4x gtceu:long_hssg_rod")
            .itemOutputs("advanced_ae:reach_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("night_vision_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "16x extendedcrafting:luminessence")
            .itemOutputs("advanced_ae:night_vision_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("flight_drift_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "2x gtceu:iv_field_generator")
            .itemOutputs("advanced_ae:flight_drift_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.LuV])
        event.recipes.gtceu.forming_press("recharging_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "2x gtceu:energy_crystal", "gtceu:lapotron_crystal")
            .itemOutputs("advanced_ae:recharging_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("portable_workbench_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "ae2:cell_workbench")
            .itemOutputs("advanced_ae:portable_workbench_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
        event.recipes.gtceu.forming_press("pick_craft_card")
            .itemInputs("advanced_ae:quantum_upgrade_base", "ae2:crafting_card")
            .itemOutputs("advanced_ae:pick_craft_card")
            .duration(15 * 20)
            .EUt(GTValues.VA[GTValues.IV])
    })
    console.log("Advanced AE compat scripts successfully loaded!")
} else { console.log("Advanced AE not found, skipping its compat scripts.") }
