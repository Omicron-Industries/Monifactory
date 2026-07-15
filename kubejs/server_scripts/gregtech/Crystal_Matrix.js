/**
 * Crystal Matrix processing line
 */

ServerEvents.recipes(event => {

    // Acetylene
    event.recipes.gtceu.electric_blast_furnace("calcium_carbide")
        .itemInputs("2x gtceu:quicklime_dust", "3x gtceu:carbon_dust")
        .itemOutputs("3x gtceu:calcium_carbide_dust")
        .outputFluids("gtceu:carbon_monoxide 1000")
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV])
        .blastFurnaceTemp(5400)

    event.recipes.gtceu.autoclave("hydroxide_to_quicklime")
        .itemInputs("3x gtceu:calcium_hydroxide_dust")
        .itemOutputs("2x gtceu:quicklime_dust")
        .outputFluids("minecraft:water 1000")
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.large_chemical_reactor("acetylene")
        .itemInputs("3x gtceu:calcium_carbide_dust")
        .itemOutputs("3x gtceu:calcium_hydroxide_dust")
        .inputFluids("minecraft:water 2000")
        .outputFluids("gtceu:acetylene 1000")
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV])

    // Crystal Matrix Line
    event.recipes.gtceu.forge_hammer("crystal_seeds_from_exquisite_diamond")
        .itemInputs("gtceu:exquisite_diamond_gem")
        .chancedOutput("kubejs:crystal_seeds", 500, 0)
        .duration(200)
        .EUt(GTValues.VA[GTValues.EV])

    const wafers = [
        ["gtceu:", "naquadah_wafer"],
        ["gtceu:", "neutronium_wafer"],
        ["kubejs:", "null_wafer"]
    ]

    wafers.forEach((wafer, index) => {
        event.recipes.gtceu.assembler(`raw_substrate_from_${wafer[1]}`)
            .itemInputs(wafer[0] + wafer[1], "4x gtceu:gold_foil", "4x gtceu:graphene_dust", "2x gtceu:cobalt_dust", "1x kubejs:crystal_seeds")
            .inputFluids("gtceu:nichrome 288")
            .itemOutputs("kubejs:nanotube_substrate")
            .duration(480)
            .EUt(GTValues.VA[GTValues.ZPM])
            .cleanroom(CleanroomType.CLEANROOM)
    })

    const carbon_containing_fluids = [
        { name: "acetylene", amount: 1 },
        { name: "ethylene", amount: 1.5 },
        { name: "ethanol", amount: 2 },
        { name: "methane", amount: 2.5 }
    ]
    carbon_containing_fluids.forEach( fluid_type => {
        event.recipes.gtceu.autoclave(`nanotube_growing_in_${fluid_type.name}`)
            .itemInputs("kubejs:nanotube_substrate", "2x gtceu:diamond_dust")
            .inputFluids(Fluid.of("gtceu:" + fluid_type.name, 1000 * fluid_type.amount))
            .chancedOutput("kubejs:grown_nanotube_substrate", 7000, 0)
            .chancedOutput("kubejs:failed_nanotube_substrate", 3000, 0)
            .chancedItemOutputLogic(ChanceLogic.XOR)
            .duration(2880 * fluid_type.amount)
            .EUt(GTValues.VA[GTValues.IV])
            .cleanroom(CleanroomType.CLEANROOM)
    })

    event.recipes.gtceu.macerator("recycle_failed_nanotube_substrate")
        .itemInputs("kubejs:failed_nanotube_substrate")
        .itemOutputs("kubejs:crystal_seeds")
        .chancedOutput("gtceu:gold_dust", 9500, 0)
        .chancedOutput("2x gtceu:cobalt_dust", 9000, 0)
        .chancedOutput("2x gtceu:nichrome_dust", 9500, 0)
        .duration(800)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.cutter("nanotube_separation")
        .itemInputs("kubejs:grown_nanotube_substrate")
        .itemOutputs("4x kubejs:carbon_nanotubes")
        .chancedOutput("kubejs:nanotube_substrate", 9500, 0)
        .duration(240)
        .EUt(GTValues.VA[GTValues.EV])
        .cleanroom(CleanroomType.CLEANROOM)

    event.recipes.gtceu.macerator("recycle_nanotubes")
        .itemInputs("kubejs:carbon_nanotubes")
        .itemOutputs("gtceu:small_carbon_dust")
        .chancedOutput("kubejs:crystal_seeds", 1500, 0)
        .duration(240)
        .EUt(GTValues.VA[GTValues.ULV])

    event.recipes.gtceu.macerator("recycle_nanotube_mesh")
        .itemInputs("kubejs:adhered_matrix_mesh")
        .itemOutputs("gtceu:small_carbon_dust", "gtceu:small_nether_star_dust")
        .chancedOutput("kubejs:crystal_seeds", 1500, 0)
        .duration(240)
        .EUt(GTValues.VA[GTValues.ULV])

    event.recipes.gtceu.chemical_bath("nanotube_bathing")
        .itemInputs("kubejs:carbon_nanotubes")
        .itemOutputs("kubejs:adhered_matrix_mesh")
        .inputFluids("gtceu:nether_star 36")
        .duration(60)
        .EUt(GTValues.VA[GTValues.LuV])
        .cleanroom(CleanroomType.CLEANROOM)

    event.recipes.gtceu.electric_blast_furnace("matrix_blasting")
        .itemInputs("4x kubejs:adhered_matrix_mesh")
        .itemOutputs("monilabs:hot_crystal_matrix_ingot")
        .duration(750)
        .EUt(GTValues.VA[GTValues.ZPM])
        .blastFurnaceTemp(3823)
        .circuit(1)

    event.recipes.gtceu.electric_blast_furnace("matrix_blasting_gas")
        .itemInputs("4x kubejs:adhered_matrix_mesh")
        .itemOutputs("monilabs:hot_crystal_matrix_ingot")
        .inputFluids("gtceu:krypton 10")
        .duration(500)
        .EUt(GTValues.VA[GTValues.ZPM])
        .blastFurnaceTemp(3823)
        .circuit(2)

    event.recipes.gtceu.macerator("matrix_macerating")
        .itemInputs("4x kubejs:adhered_matrix_mesh")
        .itemOutputs("monilabs:crystal_matrix_dust")
        .duration(0.6 * 20)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.forge_hammer("matrix_mesh_into_foil")
        .itemInputs("kubejs:adhered_matrix_mesh")
        .itemOutputs("monilabs:crystal_matrix_foil")
        .duration(0.6 * 20)
        .EUt(GTValues.VA[GTValues.MV])

    // Old Electrode stuff which is kinda cool I think
    event.recipes.gtceu.forming_press("graphite_electrode")
        .notConsumable("gtceu:rod_extruder_mold")
        .itemInputs("2x gtceu:graphite_dust", "1x gtceu:small_cobalt_dust")
        .itemOutputs("kubejs:graphite_electrode")
        .duration(7 * 20)
        .EUt(GTValues.VA[GTValues.MV])
        .addMaterialInfo(true)

    // Fortunately, no need to fix materialInfos because the difference is too small to affect recycling recipes
    event.replaceInput({ id: /^gtceu:shaped\/\w+_arc_/, not: [{id: "gtceu:shaped/lv_arc_furnace"}, {id: "gtceu:shaped/mv_arc_furnace"}, {id: "gtceu:shaped/hv_arc_furnace"}] }, "gtceu:graphite_dust", "kubejs:graphite_electrode")

})
