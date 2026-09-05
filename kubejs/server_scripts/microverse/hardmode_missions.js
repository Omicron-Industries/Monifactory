/**
 * Recipe definitions for Hard Mode and Expert Mode-exclusive microverse projector missions.
 */
ServerEvents.recipes(event => {
    if(doHostileMicroverse) {
        microverse_mission(event, "2half", 1, 10, undefined, 100).forEach(builder => {
            builder
                .itemInputs("8x minecraft:tnt")
                .inputFluids("minecraft:lava 8000")
                .requiredMicroverse(1) // Normal
                .damageRate(50)
                .updateMicroverse(2) // Hostile
                .blacklistMicroverseParallels()
        })
        microverse_mission(event, "2half", 1, 10, undefined, 100).forEach(builder => {
            builder
                .itemInputs("2x gtceu:industrial_tnt")
                .inputFluids("minecraft:lava 4000")
                .requiredMicroverse(1) // Normal
                .damageRate(50)
                .updateMicroverse(2) // Hostile
                .blacklistMicroverseParallels()
        })
    }

    microverse_mission(event, "2half", 1, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "minecraft:mossy_cobblestone",
            )
            .inputFluids("minecraft:lava 2000")
            .damageRate((doHostileMicroverse ? -30 : 0)) // heal microverse if hostile, damage if not
            .itemOutputs(
                "64x minecraft:bone",
                "64x minecraft:rotten_flesh",
                "16x minecraft:rotten_flesh",
                "32x minecraft:gunpowder",
                "24x minecraft:string",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "2half", 1, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "minecraft:mud",
            )
            .inputFluids("minecraft:lava 2000")
            .damageRate((doHostileMicroverse ? -30 : 0))
            .itemOutputs(
                "48x minecraft:slime_ball",
                "64x minecraft:prismarine_shard",
                "24x minecraft:prismarine_crystals"
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "2half", 1, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "minecraft:redstone_block",
            )
            .inputFluids("minecraft:lava 4000")
            .damageRate((doHostileMicroverse ? -30 : 0))
            .itemOutputs(
                "16x minecraft:blaze_rod",
                "16x thermal:blizz_rod",
                "16x thermal:blitz_rod",
                "16x thermal:basalz_rod",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "2half", 1, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "minecraft:netherrack",
            )
            .inputFluids("minecraft:lava 4000")
            .damageRate((doHostileMicroverse ? -30 : 0))
            .itemOutputs(
                "24x minecraft:ghast_tear",
                "48x kubejs:wither_bone",
                "64x minecraft:magma_cream",
                "32x minecraft:magma_cream"
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "2half", 1, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "minecraft:end_stone",
            )
            .inputFluids("minecraft:lava 6000")
            .damageRate((doHostileMicroverse ? -30 : 0))
            .itemOutputs(
                "16x enderio:enderman_head",
                "16x minecraft:ender_pearl",
                "16x minecraft:ender_pearl",
                "16x minecraft:shulker_shell",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    // T3.5
    // A series of missions damaging Microverses by a flat 40% over 20s
    microverse_mission(event, "3half", 1, 20, GTValues.VA[GTValues.EV], 100).forEach(builder => {
        builder
            .damageRate(100)
            .requiredMicroverse(3) // Shattered
    })

    microverse_mission(event, "3half", 1, 20, GTValues.VA[GTValues.IV], 100).forEach(builder => {
        builder
            .damageRate(100)
            .requiredMicroverse(4) // Corrupted
    })

    if(doHostileMicroverse) {
        // Hostile-type Microverses instead get pacified
        microverse_mission(event, "3half", 1, 20, GTValues.VA[GTValues.EV], 100).forEach(builder => {
            builder
                .damageRate(-500)
                .requiredMicroverse(2) // Hostile
                .updateMicroverse(1) // Normal
        })
    }

    // T4.5
    microverse_mission(event, "4half", 2, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "24x kubejs:aerotheum_dust",
                "16x minecraft:ender_eye",
            )
            .damageRate((doHostileMicroverse ? -20 : 2))
            .itemOutputs(
                "64x kubejs:dragon_lair_data",
                "64x kubejs:dragon_lair_data",
                "32x minecraft:dragon_breath",
                "32x kubejs:ender_dragon_scale",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "4half", 2, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "24x kubejs:aerotheum_dust",
                "4x kubejs:dragon_lair_data",
            )
            .damageRate((doHostileMicroverse ? -20 : 2))
            .itemOutputs(
                "64x kubejs:ender_dragon_scale",
                "32x kubejs:ender_dragon_scale",
                "64x minecraft:dragon_breath",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "4half", 2, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "24x kubejs:aerotheum_dust",
                "64x kubejs:wither_bone",
            )
            .damageRate((doHostileMicroverse ? -20 : 2))
            .itemOutputs(
                "64x kubejs:wither_realm_data",
                "16x minecraft:nether_star",
                "16x minecraft:nether_star",
                "16x minecraft:nether_star",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })

    microverse_mission(event, "4half", 2, undefined, undefined, 100).forEach(builder => {
        builder
            .itemInputs(
                "32x kubejs:aerotheum_dust",
                "16x minecraft:sculk_catalyst",
            )
            .damageRate((doHostileMicroverse ? -20 : 2))
            .itemOutputs(
                "64x kubejs:deep_dark_data",
                "16x kubejs:warden_horn",
            )
            .requiredMicroverse((doHostileMicroverse ? 2 : 1)) // Hostile : Normal
    })
})
