/**
 * Creative Multiblock Recipes
 */
ServerEvents.recipes(event => {
    event.recipes.gtceu.assembly_line("kubejs:creative_power")
        .itemInputs("4x #gtceu:circuits/uev", "8x kubejs:dimensionally_stabilized_infinity_heavy_plating", "4x monilabs:dimensional_stabilization_netherite_casing", "4x gtceu:uev_field_generator", "8x gtceu:uev_emitter", "4x gtceu:max_battery")
        .inputFluids("gtceu:living_soldering_alloy 576", "gtceu:polyether_ether_ketone 1152")
        .itemOutputs("monilabs:creative_energy_multi")
        .stationResearch(b => b
            .researchStack("gtceu:large_naquadah_reactor")
            .EUt(GTValues.VA[GTValues.UIV])
            .CWUt(144, 512000)
        )
        .duration(1200)
        .EUt(GTValues.VA[GTValues.UHV])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembly_line("omniscience_research_beacon")
        .itemInputs("gtceu:computation_receiver_hatch", "8x gtceu:europium_hex_cable", "4x gtceu:research_station", "16x gtceu:advanced_computer_casing", "16x #gtceu:circuits/uhv", "3x gtceu:uhv_sensor", "kubejs:universal_navigator", "4x gtceu:uhv_field_generator", "4x monilabs:sculk_bioalloy_plate", "64x gtceu:normal_optical_pipe", "64x gtceu:fine_ruridit_wire", "32x gtceu:ruthenium_trinium_americium_neutronate_single_wire")
        .inputFluids("gtceu:living_soldering_alloy 1152", "gtceu:omnium 4608", "gtceu:polyether_ether_ketone 2304")
        .itemOutputs("monilabs:creative_data_multi")
        .stationResearch(b => b
            .researchStack("gtceu:network_switch")
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(128, 57600)
        )
        .duration(1200)
        .EUt(GTValues.VA[GTValues.UEV])

    // Recipes used to run the creative multiblocks
    event.recipes.gtceu.creative_energy_multi("kubejs:superfuel_infinite_power")
        .inputFluids("gtceu:naquadah_superfuel 60")
        .duration(20)

    event.recipes.gtceu.creative_energy_multi("kubejs:antimatter_neut_infinite_power")
        .inputFluids("kubejs:antimatter_fuel 1000", "gtceu:neutronium 1000")
        .duration(5333)

    event.recipes.gtceu.creative_energy_multi("kubejs:antimatter_inf_infinite_power")
        .inputFluids("kubejs:antimatter_fuel 86", "gtceu:infinity 86")
        .duration(5333)

    if (doQuantumCoolant) {
        event.recipes.gtceu.creative_data_multi("kubejs:infinite_research_hm_em")
            .inputFluids("gtmutils:quantum_coolant 1080")
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(144)
            .duration(20)
    } else {
        event.recipes.gtceu.creative_data_multi("kubejs:infinite_research_nm")
            .inputFluids("gtceu:pcb_coolant 1080")
            .EUt(GTValues.VA[GTValues.UHV])
            .CWUt(144)
            .duration(20)
    }
})
