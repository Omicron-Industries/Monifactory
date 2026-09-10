/**
 * Buffs producing Wood Tar from Charcoal to make it actually even remotely doable in any tier beyond HV.
 */
ServerEvents.recipes(event => {
    // Buff Charcoal Extraction to take 2.4s each instead of 6.4s
    event.remove({ id: "gtceu:extractor/charcoal_extraction" })
    event.recipes.gtceu.extractor("charcoal_extraction")
        .itemInputs("minecraft:charcoal")
        .outputFluids("gtceu:wood_tar 100")
        .duration(48)
        .EUt(GTValues.VH[GTValues.ULV])
})
