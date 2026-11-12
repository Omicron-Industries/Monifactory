/**
 * Lowers the tiering of Active Transformers from LuV to IV - script 2 of 2.
 * - Changes recipes of High Power Casings and the Active Transformer machine to make them accessible earlier
 */
ServerEvents.recipes(event => {
    event.recipes.gtceu.assembler("high_power_casing")
        .itemInputs(
            "#forge:frames/stainless_steel",
            "6x #forge:plates/platinum",
            "#gtceu:circuits/hv",
            "8x #forge:fine_wires/neptunium_palladium_aluminium",
            "4x gtceu:osmium_single_wire",
        )
        .itemOutputs("2x gtceu:high_power_casing")
        .duration(100).EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("active_transformer")
        .itemInputs(
            "gtceu:iv_transformer_16a",
            "#gtceu:circuits/luv",
            "8x gtceu:samarium_iron_arsenic_oxide_single_wire",
            "2x gtceu:hpic_chip"
        )
        .inputFluids("gtceu:sodium_potassium 1000")
        .itemOutputs("gtceu:active_transformer")
        .duration(300).EUt(GTValues.VA[GTValues.IV])
        .addMaterialInfo(true)

    // Lowers the voltage at which the laser pipes can be made to post plat-line IV
    event.recipes.gtceu.assembler("laser_cable")
        .itemInputs(
            "gtceu:laminated_glass",
            "2x gtceu:rhodium_foil",
        )
        .inputFluids("gtceu:polytetrafluoroethylene 144")
        .itemOutputs("gtceu:normal_laser_pipe")
        .duration(100).EUt(GTValues.VA[GTValues.IV]).addMaterialInfo(true)
        .cleanroom(CleanroomType.CLEANROOM)
})
