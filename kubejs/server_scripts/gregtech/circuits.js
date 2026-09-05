/**
 * Custom GT circuit recipes
 */

// Function for replacing items in circuit assembler recipes without changing the order
function replaceCircassItem(event, idRegex, tagOrItem, toReplace, replaceWith) {
    // Get all GTCEu Circuit Assembler recipes with an ID matching the regex
    event.forEachRecipe({ id: idRegex, type: "gtceu:circuit_assembler" }, circuit_recipe => {
        // Get the JSON array object representing all of the item ingredients
        let itemIngredients = circuit_recipe.json.getAsJsonObject("inputs").getAsJsonArray("item")
        for (let i = 0; i < itemIngredients.size(); i++) {
            // Item ingredient to alter
            let curItemIngredient = itemIngredients.get(i).getAsJsonObject("content").getAsJsonObject("ingredient")

            if (curItemIngredient.getAsJsonPrimitive(tagOrItem) != null && curItemIngredient.getAsJsonPrimitive(tagOrItem).asString == toReplace) {
                // Change item ingredient if it does match
                curItemIngredient.remove(tagOrItem)
                curItemIngredient["addProperty(java.lang.String,java.lang.String)"](tagOrItem, replaceWith)
            }
        }
    })
}

function replaceGTRecipeAmount(event, recipeType, idRegex, tagOrItem, toAlter, multiplier) {
    // Get all GTCEu Circuit Assembler recipes with an ID matching the regex
    event.forEachRecipe({ id: idRegex, type: recipeType }, circuit_recipe => {
        // Get the JSON array object representing all of the item ingredients
        let itemIngredients = circuit_recipe.json.getAsJsonObject("inputs").getAsJsonArray("item")
        for (let i = 0; i < itemIngredients.size(); i++) {
            // Item ingredient to alter
            let curItemContent = itemIngredients.get(i).getAsJsonObject("content")
            let curItemIngredient = curItemContent.getAsJsonObject("ingredient")


            if (curItemIngredient.getAsJsonPrimitive(tagOrItem) != null && curItemIngredient.getAsJsonPrimitive(tagOrItem).asString == toAlter) {
                // Change item ingredient if it does match
                let prevCount = curItemContent.getAsJsonPrimitive("count").asInt
                curItemContent.remove("count")
                curItemContent["addProperty(java.lang.String,java.lang.Number)"]("count", prevCount * multiplier)
            }
        }
    })
}

ServerEvents.recipes(event => {

    // Make Integrated Circuits cheaper :3c
    // Integrated LV - Removes Diodes, increases ILC Chips required from 1 > 2
    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_lv" })
    event.recipes.gtceu.circuit_assembler("integrated_circuit_lv")
        .itemInputs("gtceu:resin_printed_circuit_board", "2x gtceu:ilc_chip", "2x #gtceu:resistors", "2x gtceu:fine_copper_wire", "2x gtceu:tin_bolt")
        .inputFluids("gtceu:tin 144")
        .itemOutputs("2x gtceu:basic_integrated_circuit")
        .duration(10 * 20)
        .EUt(GTValues.VHA[GTValues.LV])
    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_lv_soldering_alloy" })
    event.recipes.gtceu.circuit_assembler("integrated_circuit_lv_soldering_alloy")
        .itemInputs("gtceu:resin_printed_circuit_board", "2x gtceu:ilc_chip", "2x #gtceu:resistors", "2x gtceu:fine_copper_wire", "2x gtceu:tin_bolt")
        .inputFluids("gtceu:soldering_alloy 72")
        .itemOutputs("2x gtceu:basic_integrated_circuit")
        .duration(10 * 20)
        .EUt(GTValues.VHA[GTValues.LV])
    // Integrated HV - Swaps ILCs with Diodes
    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_hv" })
    event.recipes.gtceu.circuit_assembler("integrated_circuit_hv")
        .itemInputs("2x gtceu:good_integrated_circuit", "2x gtceu:ram_chip", "2x #gtceu:diodes", "4x #gtceu:transistors", "8x gtceu:fine_electrum_wire", "8x gtceu:annealed_copper_bolt")
        .inputFluids("gtceu:tin 144")
        .itemOutputs("gtceu:advanced_integrated_circuit")
        .duration(40 * 20)
        .EUt(GTValues.VA[GTValues.LV])
    event.remove({ id: "gtceu:circuit_assembler/integrated_circuit_hv_soldering_alloy" })
    event.recipes.gtceu.circuit_assembler("integrated_circuit_hv_soldering_alloy")
        .itemInputs("2x gtceu:good_integrated_circuit", "2x gtceu:ram_chip", "2x #gtceu:diodes", "4x #gtceu:transistors", "8x gtceu:fine_electrum_wire", "8x gtceu:annealed_copper_bolt")
        .inputFluids("gtceu:soldering_alloy 72")
        .itemOutputs("gtceu:advanced_integrated_circuit")
        .duration(40 * 20)
        .EUt(GTValues.VA[GTValues.LV])

    // Replace some computer components with magical metals
    replaceCircassItem(event, /workstation_ev/, "tag", "forge:bolts/blue_alloy", "forge:bolts/vibrant_alloy")
    replaceCircassItem(event, /nano_computer_iv/, "tag", "forge:fine_wires/electrum", "forge:fine_wires/lumium")
    replaceCircassItem(event, /crystal_computer_zpm/, "tag", "forge:fine_wires/niobium_titanium", "forge:fine_wires/enderium")

    // Replace some processors' capacitors with resistors so that each circuit theme uses all SMD component types
    replaceCircassItem(event, /quantum_processor_ev/, "item", "gtceu:smd_capacitor", "gtceu:smd_resistor")
    replaceCircassItem(event, /quantum_processor_ev/, "item", "gtceu:advanced_smd_capacitor", "gtceu:advanced_smd_resistor")
    replaceCircassItem(event, /crystal_processor_iv/, "item", "gtceu:advanced_smd_capacitor", "gtceu:advanced_smd_resistor")
    replaceCircassItem(event, /wetware_processor_luv/, "item", "gtceu:advanced_smd_capacitor", "gtceu:advanced_smd_resistor")

    // Recipe categories seem to be separate when not using builders
    replaceGTRecipeAmount(event, "gtceu:chemical_reactor", /wetware_circuit_board/, "tag", "forge:foils/niobium_titanium", 0.75)
    replaceGTRecipeAmount(event, "gtceu:large_chemical_reactor", /wetware_circuit_board/, "tag", "forge:foils/niobium_titanium", 0.75)


    // Complex SMDs
    const smds = [
        ["transistor", "gtceu:enriched_naquadah_foil", "8x gtceu:fine_necrosiderite_wire", 72],
        ["resistor", "monilabs:crystal_matrix_dust", "4x gtceu:fine_necrosiderite_wire", 144],
        ["capacitor", doHarderRecipes ? "gtceu:kapton_k_foil" : "gtceu:polybenzimidazole_foil", "gtceu:necrosiderite_foil", 36],
        ["diode", "gtceu:indium_gallium_phosphide_dust", "8x gtceu:fine_necrosiderite_wire", 72],
        ["inductor", "gtceu:terbium_ring", "4x gtceu:fine_necrosiderite_wire", 72]
    ]

    for (const [item, primary, secondary, plastic_amount] of smds) {
        event.recipes.gtceu.assembler(`complex_smd_${item}`)
            .itemInputs(primary, secondary)
            .inputFluids(`gtceu:polyethyl_cyanoacrylate ${plastic_amount}`)
            .itemOutputs(`64x kubejs:complex_smd_${item}`)
            .duration(160)
            .EUt(245760)
    }

    // Crystal and Wetware tweaks are more invasive than a 1-item swapout
    // Move Crystal SoC up a voltage tier
    event.remove({ id: "gtceu:circuit_assembler/crystal_processor_iv_soc_soldering_alloy" })
    event.recipes.gtceu.circuit_assembler("crystal_processor_iv_soc_soldering_alloy")
        .itemInputs("gtceu:multilayer_fiber_reinforced_printed_circuit_board", "gtceu:crystal_soc", "8x gtceu:fine_niobium_titanium_wire", "8x gtceu:yttrium_barium_cuprate_bolt")
        .inputFluids("gtceu:living_soldering_alloy 18")
        .itemOutputs("4x gtceu:crystal_processor")
        .duration(5 * 20)
        .EUt(150000)
        .cleanroom(CleanroomType.CLEANROOM)

    // Wetware printed circuit board
    event.remove({ output: "gtceu:wetware_printed_circuit_board" })
    event.recipes.gtceu.large_chemical_reactor("kubejs:wetware_printed_circuit_board_iron3")
        .itemInputs("gtceu:wetware_circuit_board", "24x minecraft:sculk_vein", "8x gtceu:stem_cells")
        .inputFluids("gtceu:sodium_persulfate 3000", "gtceu:iron_iii_chloride 1500", "enderio:xp_juice 1000")
        .itemOutputs("gtceu:wetware_printed_circuit_board")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(1800)
        .cleanroom(CleanroomType.CLEANROOM)

    // NPU
    event.remove({ output: "gtceu:neuro_processing_unit" })
    event.recipes.gtceu.circuit_assembler("neuro_processing_unit")
        .itemInputs("gtceu:wetware_printed_circuit_board", "4x gtceu:stem_cells", "8x gtceu:polybenzimidazole_small_fluid_pipe", "4x gtceu:enderium_plate", "16x gtceu:silicone_rubber_foil", "8x gtceu:hsse_bolt")
        .inputFluids("gtceu:sterilized_growth_medium 100")
        .itemOutputs("gtceu:neuro_processing_unit")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(600)
        .EUt(80000)

    // Wetware Processor SoC recipe moved to UHV so that all SoC recipes are 2 voltage tiers above the base
    event.remove({ id: "gtceu:circuit_assembler/wetware_processor_luv_soc_soldering_alloy" })
    event.recipes.gtceu.circuit_assembler("wetware_processor_luv_soc_soldering_alloy")
        .itemInputs("gtceu:neuro_processing_unit", "gtceu:highly_advanced_soc", "8x gtceu:fine_yttrium_barium_cuprate_wire", "8x gtceu:naquadah_bolt")
        .inputFluids("gtceu:living_soldering_alloy 18")
        .itemOutputs("4x gtceu:wetware_processor")
        .duration(5 * 20)
        .EUt(600000)
        .cleanroom(CleanroomType.CLEANROOM)

    // Wetware Mainframe (Abnormally expensive in base game since it's the last circuit made cheaper here)
    event.remove({ output: "gtceu:wetware_processor_mainframe" })
    event.recipes.gtceu.assembly_line("wetware_mainframe_uhv")
        .itemInputs(
            "2x gtceu:tritanium_frame",
            "2x gtceu:wetware_processor_computer",
            "8x gtceu:advanced_smd_inductor",
            "16x gtceu:advanced_smd_capacitor",
            "12x gtceu:advanced_smd_diode",
            "24x gtceu:ram_chip",
            "4x gtceu:uhpic_chip",
            "8x gtceu:enriched_naquadah_trinium_europium_duranide_double_wire",
            "8x gtceu:europium_plate"
        )
        .inputFluids("gtceu:advanced_soldering_alloy 1152", "gtceu:polyethyl_cyanoacrylate 1152")
        .itemOutputs("gtceu:wetware_processor_mainframe")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(2000)
        .stationResearch(b => b
            .researchStack("gtceu:wetware_processor_computer")
            .CWUt(72)
            .EUt(GTValues.VA[GTValues.ZPM])
        )
    // Same as above but with living solder
    event.recipes.gtceu.assembly_line("wetware_mainframe_uhv/living_soldering_alloy")
        .itemInputs(
            "2x gtceu:tritanium_frame",
            "2x gtceu:wetware_processor_computer",
            "8x gtceu:advanced_smd_inductor",
            "16x gtceu:advanced_smd_capacitor",
            "12x gtceu:advanced_smd_diode",
            "24x gtceu:ram_chip",
            "4x gtceu:uhpic_chip",
            "8x gtceu:enriched_naquadah_trinium_europium_duranide_double_wire",
            "8x gtceu:europium_plate"
        )
        .inputFluids("gtceu:living_soldering_alloy 576", "gtceu:polyethyl_cyanoacrylate 1152")
        .itemOutputs("gtceu:wetware_processor_mainframe")
        .EUt(GTValues.VA[GTValues.ZPM]).duration(2000)
        .stationResearch(b => b
            .researchStack("gtceu:wetware_processor_computer")
            .CWUt(72)
            .EUt(GTValues.VA[GTValues.ZPM])
        )

    event.recipes.gtceu.circuit_assembler("optical_processor")
        .itemInputs(
            "1x kubejs:optical_processing_unit",
            "1x kubejs:photonic_soc_active",
            "4x kubejs:electro_optic_modulator",
            "16x gtceu:advanced_smd_resistor",
            "16x gtceu:advanced_smd_transistor",
            "8x gtceu:fine_naquadah_wire"
        )
        .inputFluids("gtceu:living_soldering_alloy 18")
        .itemOutputs("4x kubejs:optical_processor")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(20 * 20)
        .EUt(150000)

    event.recipes.gtceu.assembly_line("optical_processor_assembly")
        .itemInputs(
            "kubejs:optical_processing_unit",
            "2x kubejs:optical_processor",
            "8x gtceu:advanced_smd_inductor",
            "16x gtceu:advanced_smd_capacitor",
            "8x gtceu:rhodium_foil",
            "32x gtceu:ram_chip",
            "16x gtceu:fine_naquadah_wire"
        )
        .inputFluids("gtceu:living_soldering_alloy 216")
        .itemOutputs("2x kubejs:optical_processor_assembly")
        .duration(20 * 20)
        .EUt(150000)
        .stationResearch(b => b
            .researchStack("kubejs:optical_processor")
            .CWUt(16)
            .EUt(GTValues.VA[GTValues.LuV])
        )

    event.recipes.gtceu.assembly_line("optical_processor_computer")
        .itemInputs(
            "kubejs:optical_processing_unit",
            "2x kubejs:optical_processor_assembly",
            "12x gtceu:advanced_smd_diode",
            "24x gtceu:nor_memory_chip",
            "40x gtceu:ram_chip",
            "24x gtceu:fine_naquadah_wire",
            "32x gtceu:polyethyl_cyanoacrylate_foil",
            "6x monilabs:crystal_matrix_plate"
        )
        .inputFluids("gtceu:living_soldering_alloy 360", "gtceu:omnium 144")
        .itemOutputs("kubejs:optical_processor_computer")
        .duration(20 * 20)
        .EUt(150000)
        .stationResearch(b => b
            .researchStack("kubejs:optical_processor_assembly")
            .CWUt(72)
            .EUt(GTValues.VA[GTValues.ZPM])
        )

    event.recipes.gtceu.assembly_line("optical_processor_mainframe")
        .itemInputs(
            "2x gtceu:activated_netherite_frame",
            "2x kubejs:optical_processor_computer",
            "12x gtceu:advanced_smd_inductor",
            "24x gtceu:advanced_smd_capacitor",
            "16x gtceu:advanced_smd_diode",
            "16x kubejs:hyperdynamic_ram_chip",
            "8x kubejs:uxpic_chip",
            "12x gtceu:ruthenium_trinium_americium_neutronate_double_wire",
            "12x monilabs:crystal_matrix_plate"
        )
        .inputFluids("gtceu:living_soldering_alloy 720", "gtceu:polyethyl_cyanoacrylate 1152", "gtceu:omnium 288")
        .itemOutputs("kubejs:optical_processor_mainframe")
        .duration(2400)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(b => b
            .researchStack("kubejs:optical_processor_computer")
            .CWUt(128)
            .EUt(GTValues.VA[GTValues.UV])
        )


    // Extradimensional Circuits
    event.recipes.gtceu.assembly_line("miniature_microverse_container")
        .itemInputs("2x #gtceu:circuits/ulv",
            "8x gtceu:microversium_foil",
            "4x gtceu:glass_tube",
            "8x gtceu:microversium_foil"
        )
        .inputFluids("gtceu:living_soldering_alloy 288")
        .itemOutputs("4x kubejs:miniature_microverse_container")
        .duration(400)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(b => b
            .researchStack("monilabs:basic_microverse_projector")
            .CWUt(32)
            .EUt(GTValues.VA[GTValues.LuV])
        )

    event.recipes.gtceu.circuit_assembler("null_infused_circuit_board")
        .itemInputs("16x kubejs:carbon_mesh_reinforced_circuit_board",
            "8x gtceu:meta_null_foil",
            "8x gtceu:nano_cpu_chip",
            "#gtceu:circuits/zpm",
            "gtceu:luv_field_generator"
        )
        .inputFluids("gtceu:living_soldering_alloy 576")
        .itemOutputs("16x kubejs:null_infused_circuit_board")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1200)
        .EUt(GTValues.VA[GTValues.UV])

    event.recipes.gtceu.large_chemical_reactor("null_infused_printed_circuit_board")
        .itemInputs("kubejs:null_infused_circuit_board", "8x gtceu:fine_necrosiderite_wire", "16x gtceu:naquadah_alloy_foil")
        .inputFluids("gtceu:iron_iii_chloride 5000")
        .itemOutputs("kubejs:null_infused_printed_circuit_board")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(100)
        .EUt(600000)

    event.recipes.gtceu.microverse("extradimensional_processing_unit")
        .itemInputs(
            "kubejs:microminer_t11",
            "kubejs:null_infused_printed_circuit_board",
            "4x gtceu:meta_null_bolt",
            "8x gtceu:hyperdegenerate_darconite_foil",
            "2x kubejs:hyperdynamic_ram_chip",
            "10x kubejs:miniature_microverse_container"
        )
        .inputFluids("gtceu:crude_naquadah_fuel 50")
        .duration(300)
        .addData("duration", 300)
        .damageRate(1)
        .addData("projector_tier", 2)
        .EUt(GTValues.VA[GTValues.LuV])
        .itemOutputs("kubejs:microminer_t11")
        .itemOutputs("kubejs:extradimensional_processing_unit")
        .requiredMicroverse(3) // Shattered


    event.recipes.gtceu.assembler("microverse_containment_unit")
        .itemInputs("monilabs:eltz_frame", "16x gtceu:microversium_plate", "8x kubejs:prism_pane", "gtceu:iv_field_generator")
        .inputFluids("gtceu:advanced_soldering_alloy 1152")
        .itemOutputs("64x kubejs:microverse_containment_unit")
        .duration(300)
        .EUt(GTValues.VHA[GTValues.LuV])

    event.recipes.gtceu.microverse("extradimensional_quantum_cpu_core")
        .itemInputs(
            "kubejs:microminer_t11",
            "16x kubejs:microverse_containment_unit",
            "32x gtceu:qbit_cpu_chip",
            "32x gtceu:nano_cpu_chip",
            "4x gtceu:advanced_soc",
            "64x gtceu:fine_platinum_wire"
        )
        .inputFluids("gtceu:crude_naquadah_fuel 50")
        .duration(2000)
        .addData("duration", 2000)
        .addData("projector_tier", 2)
        .EUt(GTValues.VA[GTValues.LuV])
        .damageRate(2)
        .itemOutputs("kubejs:microminer_t11")
        .itemOutputsRanged("kubejs:extradimensional_quantum_cpu_core", 12, 16)
        .requiredMicroverse(3) // Shattered

    event.recipes.gtceu.assembly_line("extradimensional_processor")
        .itemInputs(
            "kubejs:extradimensional_processing_unit",
            "4x kubejs:extradimensional_quantum_cpu_core",
            "4x kubejs:complex_smd_resistor",
            "4x kubejs:complex_smd_transistor",
            "8x gtceu:fine_necrosiderite_wire"
        )
        .inputFluids("gtceu:living_soldering_alloy 288")
        .itemOutputs("4x kubejs:extradimensional_processor")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.UHV])
        .stationResearch(b => b
            .researchStack("kubejs:extradimensional_quantum_cpu_core")
            .CWUt(16)
            .EUt(GTValues.VA[GTValues.LuV])
        )

    event.recipes.gtceu.microverse("extradimensional_crystal_cpu_core")
        .itemInputs(
            "kubejs:microminer_t11",
            "16x kubejs:microverse_containment_unit",
            "16x gtceu:crystal_cpu",
            "32x gtceu:qbit_cpu_chip",
            "4x gtceu:crystal_soc",
            "64x gtceu:fine_niobium_titanium_wire"
        )
        .inputFluids("gtceu:crude_naquadah_fuel 50")
        .duration(2000)
        .addData("duration", 2000)
        .addData("projector_tier", 2)
        .EUt(GTValues.VA[GTValues.LuV])
        .damageRate(3)
        .itemOutputs("kubejs:microminer_t11")
        .itemOutputsRanged("kubejs:extradimensional_crystal_cpu_core", 8, 16)
        .requiredMicroverse(3) // Shattered

    event.recipes.gtceu.assembly_line("extradimensional_processor_assembly")
        .itemInputs(
            "kubejs:extradimensional_processing_unit",
            "2x kubejs:extradimensional_processor",
            "4x kubejs:extradimensional_crystal_cpu_core",
            "4x kubejs:complex_smd_inductor",
            "4x kubejs:complex_smd_capacitor",
            "2x kubejs:hyperdynamic_ram_chip",
            "12x gtceu:fine_necrosiderite_wire"
        )
        .inputFluids("gtceu:living_soldering_alloy 1152")
        .itemOutputs("2x kubejs:extradimensional_processor_assembly")
        .duration(20 * 20)
        .EUt(GTValues.VHA[GTValues.UHV])
        .stationResearch(b => b
            .researchStack("kubejs:extradimensional_processor")
            .CWUt(72)
            .EUt(GTValues.VA[GTValues.ZPM])
        )

    event.recipes.gtceu.microverse("extradimensional_wetware_cpu_core")
        .itemInputs(
            "kubejs:microminer_t11",
            "16x kubejs:microverse_containment_unit",
            "4x gtceu:crystal_cpu",
            "8x gtceu:qbit_cpu_chip",
            "48x gtceu:stem_cells",
            "2x gtceu:petri_dish",
            "4x gtceu:highly_advanced_soc",
            "64x gtceu:fine_yttrium_barium_cuprate_wire"
        )
        .inputFluids("gtceu:crude_naquadah_fuel 50")
        .duration(2000)
        .addData("duration", 2000)
        .addData("projector_tier", 2)
        .EUt(GTValues.VA[GTValues.LuV])
        .damageRate(4)
        .itemOutputs("kubejs:microminer_t11")
        .itemOutputsRanged("kubejs:extradimensional_wetware_cpu_core", 4, 16)
        .requiredMicroverse(3) // Shattered

    event.recipes.gtceu.assembly_line("extradimensional_processor_computer")
        .itemInputs(
            "kubejs:extradimensional_processing_unit",
            "2x kubejs:extradimensional_processor_assembly",
            "4x kubejs:extradimensional_wetware_cpu_core",
            "8x kubejs:complex_smd_diode",
            "48x gtceu:nor_memory_chip",
            "16x kubejs:multidimensional_cpu_chip",
            "4x kubejs:hyperdynamic_ram_chip",
            "16x gtceu:fine_necrosiderite_wire",
            "gtceu:infinity_plate"
        )
        .inputFluids("gtceu:living_soldering_alloy 576", "gtceu:polyether_ether_ketone 1152")
        .itemOutputs("1x kubejs:extradimensional_processor_computer")
        .duration(20 * 20)
        .EUt(GTValues.VHA[GTValues.UHV])
        .stationResearch(b => b
            .researchStack("kubejs:extradimensional_processor_assembly")
            .CWUt(128)
            .EUt(GTValues.VA[GTValues.UV])
        )

    event.recipes.gtceu.microverse("extradimensional_optical_cpu_core")
        .itemInputs(
            "kubejs:microminer_t11",
            "16x kubejs:microverse_containment_unit",
            "20x kubejs:photonic_soc_active",
            "32x kubejs:electro_optic_modulator",
            "64x gtceu:fine_naquadah_wire"
        )
        .inputFluids("gtceu:crude_naquadah_fuel 50")
        .duration(2000)
        .addData("duration", 2000)
        .addData("projector_tier", 2)
        .EUt(GTValues.VA[GTValues.LuV])
        .damageRate(5)
        .itemOutputs("kubejs:microminer_t11")
        .itemOutputsRanged("kubejs:extradimensional_optical_cpu_core", 0, 16)
        .requiredMicroverse(3) // Shattered

    event.recipes.gtceu.assembly_line("extradimensional_processor_mainframe")
        .itemInputs(
            "2x gtceu:infinity_frame",
            "4x kubejs:extradimensional_processor_computer",
            "4x kubejs:extradimensional_optical_cpu_core",
            "16x kubejs:complex_smd_inductor",
            "32x kubejs:complex_smd_capacitor",
            "32x kubejs:complex_smd_diode",
            "64x gtceu:nor_memory_chip",
            "64x gtceu:nand_memory_chip",
            "32x kubejs:multidimensional_cpu_chip",
            "16x kubejs:hyperdynamic_ram_chip",
            "16x gtceu:necrosiderite_single_wire",
            "8x gtceu:double_infinity_plate"
        )
        .inputFluids("gtceu:living_soldering_alloy 4320", "gtceu:polyether_ether_ketone 576", "gtceu:omnium 1152")
        .itemOutputs("kubejs:extradimensional_processor_mainframe")
        .duration(3200)
        .EUt(GTValues.VA[GTValues.UHV])
        .stationResearch(b => b
            .researchStack("kubejs:extradimensional_processor_computer")
            .CWUt(192)
            .EUt(GTValues.VA[GTValues.UHV])
        )
})
