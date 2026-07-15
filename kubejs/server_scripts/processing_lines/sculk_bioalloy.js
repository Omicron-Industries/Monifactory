/**
 * Sculk Bioalloy processing line
 */
ServerEvents.recipes(event => {
    // Auxillary production method for Glycerol
    // IRL saponification also works, but in Moni we have no representative item for "fat" nor any use for "soap"
    event.recipes.gtceu.large_chemical_reactor("glycerol_from_sugar_hydrogenolysis")
        .notConsumable("gtceu:ultimet_rod")
        .itemInputs("4x minecraft:sugar")
        .chancedInput("gtceu:soda_ash_dust", 1000, 0)
        .inputFluids("gtceu:hydrogen 8000", "minecraft:water 1000")
        .outputFluids("gtceu:glycerol 4000")
        .duration(1600)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.mixer("experience_attuned_dust")
        .itemInputs("7x gtceu:amethyst_dust", "2x gtceu:dark_soularium_dust", "4x gtceu:lapis_dust")
        .itemOutputs("13x gtceu:experience_attuned_dust")
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.mixer("sculk_agar")
        .itemInputs("4x gtceu:potassium_cyanide_dust", "7x gtceu:biotite_dust", "9x gtceu:collagen_dust")
        .inputFluids("enderio:xp_juice 1500", "gtceu:experience_attuned 288")
        .itemOutputs("32x gtceu:sculk_agar_dust")
        .duration(20 * 20)
        .EUt(GTValues.VA[GTValues.HV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    event.recipes.gtceu.discharger("amalgamated_sculk")
        .itemInputs("3x gtceu:sculk_agar_dust", "4x gtceu:echo_shard_dust", Item.of("kubejs:hadal_energy_core", "{Damage:8000000}").weakNBT())
        .inputFluids("gtceu:hadal_sculk")
        .itemOutputs("kubejs:amalgamated_sculk")
        .duration(10)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    event.recipes.gtceu.alloy_blast_smelter("bioalloy_base")
        .itemInputs("4x gtceu:blue_alloy_dust", "2x gtceu:lead_dust", "1x gtceu:lutetium_dust")
        .outputFluids("gtceu:bioalloy_base 1008")
        .duration(100 * 20)
        .EUt(GTValues.VA[GTValues.LuV])
        .blastFurnaceTemp(11900)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
        .circuit(3)

    event.recipes.gtceu.alloy_blast_smelter("bioalloy_base_gas")
        .itemInputs("4x gtceu:blue_alloy_dust", "2x gtceu:lead_dust", "1x gtceu:lutetium_dust")
        .inputFluids("gtceu:xenon 10")
        .outputFluids("gtceu:bioalloy_base 1008")
        .duration(75 * 20)
        .EUt(GTValues.VA[GTValues.LuV])
        .blastFurnaceTemp(11900)
        .cleanroom(CleanroomType.STERILE_CLEANROOM)
        .circuit(13)

    event.recipes.gtceu.sculk_vat("sculk_bioalloy")
        .itemInputs("kubejs:amalgamated_sculk")
        .inputFluids("gtceu:bioalloy_base 1008")
        .outputFluids("monilabs:sculk_bioalloy 1440")
        .xpRange(116000, 124000)
        .duration(60)
        .EUt(GTValues.VA[GTValues.ZPM])
})
