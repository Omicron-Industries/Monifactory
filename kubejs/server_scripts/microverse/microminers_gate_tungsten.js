/**
 * Changes small details about obtaining Tungsten
 * so that the T2MM is required to produce the first batches.
 */

ServerEvents.recipes(event => {
    // Tungstate processing moved up a tier to IV, duration halved to compensate
    event.recipes.gtceu.chemical_bath("tungstic_acid_from_tungstate")
        .itemInputs("7x gtceu:tungstate_dust")
        .inputFluids("gtceu:hydrochloric_acid 2000")
        .itemOutputs("7x gtceu:tungstic_acid_dust", "2x gtceu:lithium_chloride_dust")
        .duration(10.5 / 2 * GTValues.SECONDS)
        .EUt(GTValues.VHA[GTValues.IV])

    // Stolzite processing also moved up to IV in aa_planet_resources.js
})

GTCEuServerEvents.oreVeins(event => {
    // Change end Tungsten vein to not provide any Scheelite
    event.modify("gtceu:scheelite_vein", vein => {
        vein.dikeVeinGenerator(generator => generator
            .withBlock(GTMaterials.get("dilithium"), 3, 20, 60)
            .withBlock(GTMaterials.Tungstate, 2, 35, 55)
            .withBlock(GTMaterials.Lithium, 1, 20, 40)
        )
    })
})
