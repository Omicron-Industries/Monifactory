/**
 * Rebalancing tweaks on various Gas-related things.
 */
ServerEvents.recipes(event => {
    event.recipes.gtceu.gas_turbine("nitrobenzene")
        .inputFluids("gtceu:nitrobenzene 1")
        .duration(100)    // 150% more than default GT
        .EUt(-GTValues.V[GTValues.LV])

    // Buff Charcoal Extraction to take 2.4s each instead of 6.4s
    event.remove({ id: "gtceu:extractor/charcoal_extraction" })
    event.recipes.gtceu.extractor("charcoal_extraction")
        .itemInputs("minecraft:charcoal")
        .outputFluids("gtceu:wood_tar 100")
        .duration(48)
        .EUt(GTValues.VH[GTValues.ULV])
})
