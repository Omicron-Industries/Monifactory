/**
 * Lapotron and Energium fixes
 */

ServerEvents.recipes(event => {
    event.remove({ output: "gtceu:energy_crystal" })
    event.remove({ output: "gtceu:lapotron_gem" })
    event.remove({ output: "gtceu:lapotron_crystal" })

    // VA -> VHA for fuel viability
    event.recipes.gtceu.mixer("energium_dust")
        .itemInputs("5x minecraft:redstone", "4x gtceu:ruby_dust")
        .circuit(1)
        .itemOutputs("9x gtceu:energium_dust")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(600)

    // VA -> VHA for fuel viability. Also, cobalt because :insane:
    event.recipes.gtceu.mixer("lapotron_dust")
        .itemInputs("3x gtceu:energium_dust", "gtceu:lapis_dust", "gtceu:cobalt_dust")
        .circuit(2)
        .itemOutputs("5x gtceu:lapotron_dust")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(200)

    event.recipes.gtceu.autoclave("energium_red_alloy")
        .itemInputs("gtceu:energium_dust")
        .inputFluids("gtceu:red_alloy 72")
        .itemOutputs("gtceu:energium_gem")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(40)

    event.recipes.gtceu.autoclave("energium_red_steel")
        .itemInputs("gtceu:energium_dust")
        .inputFluids("gtceu:red_steel 18")
        .itemOutputs("gtceu:energium_gem")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(10)

    event.recipes.gtceu.laser_engraver("energy_crystal")
        .itemInputs("gtceu:energium_block", "#gtceu:circuits/mv")
        .itemOutputs("gtceu:energy_crystal")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(150)

    event.recipes.gtceu.autoclave("lapotron_blue_alloy")
        .itemInputs("gtceu:lapotron_dust")
        .inputFluids("gtceu:blue_alloy 72")
        .itemOutputs("gtceu:lapotron_gem")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(40)

    event.recipes.gtceu.autoclave("lapotron_blue_steel")
        .itemInputs("gtceu:lapotron_dust")
        .inputFluids("gtceu:blue_steel 18")
        .itemOutputs("gtceu:lapotron_gem")
        .EUt(GTValues.VHA[GTValues.HV])
        .duration(10)

    event.recipes.gtceu.compressor("lapotron_block")
        .itemInputs("15x gtceu:lapotron_gem")
        .itemOutputs("gtceu:lapotron_block")
        .EUt(GTValues.VHA[GTValues.MV])
        .duration(200)

    event.recipes.gtceu.laser_engraver("lapotron_crystal")
        .itemInputs("gtceu:lapotron_block", "2x #gtceu:circuits/hv")
        .itemOutputs("gtceu:lapotron_crystal")
        .EUt(GTValues.VA[GTValues.EV])
        .duration(600)
})
