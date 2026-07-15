/**
 * Recipes for Optical Circuits.
 */

ServerEvents.tags("item", event => {
    event.add("forge:lenses/yellow", "gtceu:lithium_niobate_lens")
})

ServerEvents.recipes(event => {
    event.recipes.gtceu.mixer("dielectric_mirror_solution")
        .duration(900)
        .EUt(GTValues.VA[GTValues.LuV])
        .inputFluids("gtceu:polyethylene 1584")
        .itemInputs("7x gtceu:silicon_dioxide_dust", "1x gtceu:enderium_dust", "4x gtceu:tantalum_pentoxide_dust", "5x gtceu:rutile_dust", "2x gtceu:germanium_dust")
        .outputFluids("gtceu:dielectric_mirror_solution 4320")

    event.recipes.gtceu.alloy_blast_smelter("lithium_niobate")
        .blastFurnaceTemp(1510)
        .circuit(3)
        .duration(200)
        .EUt(GTValues.VA[GTValues.IV])
        .inputFluids("gtceu:oxygen 3000")
        .itemInputs("1x gtceu:lithium_dust", "1x gtceu:niobium_dust")
        .outputFluids("gtceu:lithium_niobate 720")
    event.recipes.gtceu.alloy_blast_smelter("lithium_niobate_gas")
        .blastFurnaceTemp(1510)
        .circuit(13)
        .duration(134)
        .EUt(GTValues.VA[GTValues.IV])
        .inputFluids("gtceu:oxygen 3000", "gtceu:nitrogen 5000")
        .itemInputs("1x gtceu:lithium_dust", "1x gtceu:niobium_dust")
        .outputFluids("gtceu:lithium_niobate 720")

    event.recipes.gtceu.chemical_bath("carbon_mesh_reinforced_circuit_board")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(800)
        .EUt(GTValues.VA[GTValues.EV])
        .inputFluids("gtceu:polyethyl_cyanoacrylate 144")
        .itemInputs("2x gtceu:carbon_fiber_mesh")
        .itemOutputs("1x kubejs:carbon_mesh_reinforced_circuit_board")

    event.recipes.gtceu.chemical_reactor("carbon_mesh_reinforced_printed_circuit_board_persulfate")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1500)
        .EUt(GTValues.VA[GTValues.HV])
        .inputFluids("gtceu:sodium_persulfate 5000")
        .itemInputs("1x kubejs:carbon_mesh_reinforced_circuit_board", "10x gtceu:osmium_foil")
        .itemOutputs("1x kubejs:carbon_mesh_reinforced_printed_circuit_board")

    event.recipes.gtceu.chemical_reactor("carbon_mesh_reinforced_printed_circuit_board_iron3")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1500)
        .EUt(GTValues.VA[GTValues.HV])
        .inputFluids("gtceu:iron_iii_chloride 2500")
        .itemInputs("1x kubejs:carbon_mesh_reinforced_circuit_board", "10x gtceu:osmium_foil")
        .itemOutputs("1x kubejs:carbon_mesh_reinforced_printed_circuit_board")

    const plastic_pipes = [
        { plastic: "polyethylene", type: "fluid", boost_multiplier: 1 },
        { plastic: "polyvinyl_chloride", type: "item", boost_multiplier: 1.25 },
        { plastic: "polytetrafluoroethylene", type: "fluid", boost_multiplier: 1.5 },
        { plastic: "polyethyl_cyanoacrylate", type: "fluid", boost_multiplier: 2 },
        { plastic: "polyether_ether_ketone", type: "item", boost_multiplier: 2.5 }
    ]
    // Intermediate Components
    plastic_pipes.forEach(data => {
        event.recipes.gtceu.assembler("electro_optic_modulator_" + data.plastic)
            .cleanroom(CleanroomType.CLEANROOM)
            .duration(600 / data.boost_multiplier)
            .EUt(GTValues.VA[GTValues.LuV])
            .inputFluids("gtceu:glass 144")
            .itemInputs("1x #forge:lenses/lithium_niobate", "1x #forge:lenses/nether_star", "2x gtceu:indium_tin_barium_titanium_cuprate_foil", "gtceu:small_yttrium_barium_cuprate_spring", `gtceu:${data.plastic}_small_${data.type}_pipe`)
            .itemOutputs("6x kubejs:electro_optic_modulator")
    })

    event.recipes.gtceu.circuit_assembler("optical_processing_unit")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(800)
        .EUt(GTValues.VA[GTValues.UV])
        .inputFluids("gtceu:dielectric_mirror_solution 1152")
        .itemInputs("8x kubejs:carbon_mesh_reinforced_printed_circuit_board", "gtceu:luv_emitter", "16x gtceu:normal_optical_pipe", "12x gtceu:lumium_foil", "32x gtceu:duranium_bolt")
        .itemOutputs("8x kubejs:optical_processing_unit")

    // Non-PrismaC PSoC Steps

    event.recipes.gtceu.cutter("prism_pane_water")
        .duration(180)
        .EUt(GTValues.VA[GTValues.EV])
        .itemInputs("3x monilabs:prism_glass")
        .inputFluids(Fluid.of("minecraft:water", 1000))
        .itemOutputs("8x kubejs:prism_pane")

    event.recipes.gtceu.cutter("prism_pane_distilled_water")
        .duration(120)
        .EUt(GTValues.VA[GTValues.EV])
        .itemInputs("3x monilabs:prism_glass")
        .inputFluids(Fluid.of("gtceu:distilled_water", 750))
        .itemOutputs("8x kubejs:prism_pane")

    event.recipes.gtceu.cutter("prism_pane_lubricant")
        .duration(90)
        .EUt(GTValues.VA[GTValues.EV])
        .itemInputs("3x monilabs:prism_glass")
        .inputFluids(Fluid.of("gtceu:lubricant", 250))
        .itemOutputs("8x kubejs:prism_pane")

    event.recipes.gtceu.forming_press("psoc_base")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(400)
        .EUt(GTValues.VA[GTValues.LuV])
        .itemInputs("gtceu:activated_netherite_plate", "gtceu:highly_advanced_soc", "2x kubejs:prism_pane")
        .itemOutputs("3x kubejs:photonic_soc_base")

    event.recipes.gtceu.large_chemical_reactor("psoc_inert")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(100)
        .EUt(GTValues.VA[GTValues.ZPM])
        .inputFluids("gtceu:lithium_niobate 36", "gtceu:dielectric_mirror_solution 72")
        .itemInputs("kubejs:photonic_soc_base", "gtceu:small_indium_phosphide_dust")
        .notConsumable("gtceu:zpm_emitter")
        .itemOutputs("kubejs:photonic_soc_inert")
})
