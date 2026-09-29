/**
 * Lets you use other Oils for Lubricant like the old days.
 */

ServerEvents.recipes(event => {
    function OilLube(fluid, name, outMod) {
        event.recipes.gtceu.brewery(`lubricant_from_${name}_oil_and_redstone`)
            .itemInputs("minecraft:redstone")
            .inputFluids(`${fluid} 1000`)
            .outputFluids(`gtceu:lubricant ${outMod * 1000}`)
            .duration(128)
            .EUt(GTValues.VH[GTValues.ULV])
        event.recipes.gtceu.brewery(`lubricant_from_${name}_oil_and_talc`)
            .itemInputs("gtceu:talc_dust")
            .inputFluids(`${fluid} 1000`)
            .outputFluids(`gtceu:lubricant ${outMod * 1000}`)
            .duration(128)
            .EUt(GTValues.VH[GTValues.ULV])
        event.recipes.gtceu.brewery(`lubricant_from_${name}_oil_and_soapstone`)
            .itemInputs("gtceu:soapstone_dust")
            .inputFluids(`${fluid} 1000`)
            .outputFluids(`gtceu:lubricant ${outMod * 1000}`)
            .duration(128)
            .EUt(GTValues.VH[GTValues.ULV])
    }
    OilLube("gtceu:oil_light", "light", 0.25)
    OilLube("gtceu:oil_medium", "raw", 0.5)
    OilLube("gtceu:oil_heavy", "heavy", 1.5)
})
