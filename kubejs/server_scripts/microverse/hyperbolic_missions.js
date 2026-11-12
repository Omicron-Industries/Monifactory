/**
 * Recipe definitions for hyperbolic microverse projector missions.
 */
ServerEvents.recipes(event => {
    // T8MM mission
    microverse_mission(event, 8, 4, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "64x gtceu:dilithium_gem",
                "64x gtceu:dilithium_gem",
                Item.of("kubejs:hadal_energy_core", "{Damage:8000000}").weakNBT(),
                "kubejs:lair_of_the_warden_data"
            )
            .damageRate(20)
            .itemOutputs(
                "48x kubejs:hadal_shard",
                "64x kubejs:warden_heart",
                "64x kubejs:warden_heart",
                "32x kubejs:warden_heart",
                "64x kubejs:warden_horn",
                "48x kubejs:warden_horn"
            )
            .requiredMicroverse(4) // Corrupted
    })

    // T10MM missions
    microverse_mission(event, 10, 4, 180).forEach(builder => {
        builder
            .inputFluids("gtceu:helium_plasma 16000")
            .itemInputs("kubejs:universal_collapse_device", "kubejs:active_prismatic_core")
            .damageRate(75)
            .itemOutputs("8x kubejs:heart_of_a_universe")
            .requiredMicroverse(4) // Corrupted
            .updateMicroverse(0)
            .blacklistMicroverseParallels()
    })

    // T11MM missions
    microverse_mission(event, 11, 4).forEach(builder => {
        builder
            .itemInputs("kubejs:universal_navigator", "gtceu:neutronium_drill_head", "kubejs:elite_drilling_kit")
            .inputFluids("gtceu:crude_naquadah_fuel 500")
            .damageRate(2)
            .itemOutputs(
                "64x kubejs:alien_scrap",
                "64x kubejs:alien_scrap",
                "64x kubejs:alien_scrap",
                "64x kubejs:alien_scrap",
                "64x kubejs:alien_scrap"
            )
            .requiredMicroverse(3) // Shattered
    })

    microverse_mission(event, 11, 4, 100).forEach(builder => {
        builder
            .itemInputs(
                "kubejs:gravitational_amplifier",
                "64x gtceu:gravi_star"
            )
            .inputFluids("gtceu:crude_naquadah_fuel 500")
            .damageRate(2)
            .itemOutputs(
                "64x kubejs:quasi_stable_neutron_star"
            )
            .requiredMicroverse(3) // Shattered
    })

    microverse_mission(event, 12, 4, 90).forEach(builder => {
        builder
            .itemInputs("kubejs:field_stabilized_prismatic_pulsar_compound", "32x gtceu:infinity_ingot", "32x gtceu:meta_null_ingot")
            .damageRate(75)
            .itemOutputs("32x gtceu:monium_ingot")
            .requiredMicroverse(4) // Corrupted
            .updateMicroverse(0)
            .blacklistMicroverseParallels()
    })
})
