/**
 * Naquadah Reactor multiblock
 */

ServerEvents.recipes(event => {
    // Naquadah Reactor Crafting
    event.recipes.gtceu.assembly_line("kubejs:naquadah_reactor")
        .itemInputs("gtceu:computer_monitor_cover", "3x ae2:spatial_pylon", "#gtceu:circuits/zpm", "gtceu:superconducting_coil",)
        .inputFluids("gtceu:advanced_soldering_alloy 1152", "gtceu:duranium 288")
        .itemOutputs("gtceu:naquadah_reactor")
        .duration(1500)
        .EUt(GTValues.VA[GTValues.ZPM])
        .stationResearch(b => b.researchStack(Item.of("kubejs:empty_fuel_rod")).EUt(GTValues.VA[GTValues.LuV]).CWUt(16, 64000))
        .addMaterialInfo(true)

    // Naquadah Reactor usage. Circuit number dictates fuel consumption rate, for more flexible power gen.
    event.recipes.gtceu.naquadah_reactor("kubejs:process_naquadah_1")
        .itemInputs("4x kubejs:naquadah_fuel_rod")
        .circuit(1)
        .itemOutputs("3x kubejs:hot_naquadah_fuel_rod", "1x kubejs:hot_depleted_naquadah_fuel_rod")
        .duration(24000)
        .EUt(-GTValues.V[GTValues.ZPM], 2)

    /*
    event.recipes.gtceu.naquadah_reactor("kubejs:process_naquadah_2")
        .itemInputs("4x kubejs:naquadah_fuel_rod")
        .circuit(2)
        .itemOutputs("2x kubejs:hot_naquadah_fuel_rod", "2x kubejs:hot_depleted_naquadah_fuel_rod")
        .duration(16000)
        .EUt(-GTValues.V[GTValues.ZPM], 3)
    */

    event.recipes.gtceu.naquadah_reactor("kubejs:process_naquadah_3")
        .itemInputs("4x kubejs:naquadah_fuel_rod")
        .circuit(3)
        .itemOutputs("1x kubejs:hot_naquadah_fuel_rod", "3x kubejs:hot_depleted_naquadah_fuel_rod")
        .duration(12000)
        .EUt(-GTValues.V[GTValues.ZPM], 4)

    // Large Naquadah Reactor recipe
    event.recipes.gtceu.assembly_line("kubejs:large_naquadah_reactor")
        .itemInputs("gtceu:computer_monitor_cover", "4x ae2:spatial_pylon", "2x #gtceu:circuits/uv", "gtceu:fusion_coil", "2x gtceu:neutron_reflector", "gtceu:naquadah_alloy_frame", "gtceu:uv_sensor", "gtceu:uv_emitter", "2x gtceu:zpm_field_generator", "48x gtceu:fine_ruthenium_trinium_americium_neutronate_wire")
        .inputFluids("gtceu:living_soldering_alloy 1152", "gtceu:omnium 576")
        .itemOutputs("gtceu:large_naquadah_reactor")
        .duration(1500)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(b => b.researchStack(Item.of("gtceu:naquadah_reactor")).EUt(GTValues.VA[GTValues.UV]).CWUt(128, 512000))
        .addMaterialInfo(true)

    // Refinery Recipe
    event.recipes.gtceu.assembly_line("kubejs:naquadah_refinery")
        .itemInputs("gtceu:large_mixer", "4x #gtceu:circuits/uv", "8x nuclearcraft:plate_elite", "4x gtceu:zpm_field_generator", "4x gtceu:uv_hermetic_casing", "2x kubejs:empty_fuel_rod", "2x gtceu:zpm_electric_pump", "2x gtceu:duranium_huge_fluid_pipe", "16x gtceu:double_tritanium_plate")
        .inputFluids("gtceu:omnium 1152", "gtceu:living_soldering_alloy 1152", "gtceu:polyethyl_cyanoacrylate 2304")
        .itemOutputs("gtceu:naquadah_refinery")
        .duration(1500)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(b => b.researchStack(Item.of("gtceu:large_mixer")).EUt(GTValues.VA[GTValues.UV]).CWUt(128, 512000))
        .addMaterialInfo(true)

    // Large Naquadah Reactor usage
    event.recipes.gtceu.large_naquadah_reactor("kubejs:process_crude_fuel")
        .inputFluids("gtceu:crude_naquadah_fuel 20")
        // .outputFluids("gtceu:crude_naquadah_fuel_depleted 20")
        .duration(40)
        .EUt(-GTValues.V[GTValues.UV], 24)

    event.recipes.gtceu.large_naquadah_reactor("kubejs:process_fuel")
        .inputFluids("gtceu:naquadah_fuel 30")
        // .outputFluids("gtceu:naquadah_fuel_depleted 30")
        .duration(40)
        .EUt(-GTValues.V[GTValues.UHV], 32)

    event.recipes.gtceu.large_naquadah_reactor("kubejs:process_superfuel")
        .inputFluids("gtceu:naquadah_superfuel 40")
        // .outputFluids("gtceu:naquadah_superfuel_depleted 50")
        .duration(40)
        .EUt(-GTValues.V[GTValues.UHV], 64)
})
