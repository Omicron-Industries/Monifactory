/**
*Line for rare earths with actual chemistry
*/
ServerEvents.recipes(event => {

    event.recipes.gtceu.mixer("re_digestion_mixer")
        .itemInputs("1x gtceu:rare_earth_dust")
        .inputFluids("gtceu:sulfuric_acid 250")
        .outputFluids("gtceu:rare_earth_sulfate_solution 1000")
        .duration(120)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.mixer("monazite_digestion_mixer")
        .itemInputs("2x gtceu:crushed_monazite_ore")
        .inputFluids("gtceu:sulfuric_acid 250")
        .outputFluids("gtceu:rare_earth_sulfate_solution 1000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.mixer("oxidizer_rare_earth_mixer")
        .inputFluids("gtceu:rare_earth_sulfate_solution 1000", "gtceu:oxalic_acid_solution 1000")
        .itemOutputs("5x gtceu:oxidized_re_sludge_dust")
        .duration(120)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.centrifuge("rare_earth_mass_separation")
        .itemInputs("4x gtceu:oxidized_re_sludge_dust")
        .inputFluids("gtceu:nitric_acid 1000")
        .outputFluids("gtceu:light_rare_earths 600", "gtceu:heavy_rare_earths 500", "gtceu:oxalic_acid_solution 750")
        .duration(160)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.centrifuge("separate_light_rare_earths")
        .inputFluids("gtceu:light_rare_earths 250")
        .chancedOutput("gtceu:small_neodymium_dust", 6500, 0)
        .chancedOutput("gtceu:small_samarium_dust", 5000, 0)
        .chancedOutput("gtceu:small_yttrium_dust", 5000, 0)
        .chancedOutput("gtceu:small_lanthanum_dust", 4000, 0)
        .chancedOutput("gtceu:small_cerium_dust", 7500, 0)
        .chancedOutput("gtceu:small_cadmium_dust", 5000, 0)
        .duration(40)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.distillation_tower("distill_heavy_rare_earths")
        .inputFluids("gtceu:heavy_rare_earths 1000")
        .itemOutputs("1x gtceu:europium_oxide_dust")
        .outputFluids("gtceu:terbium_solution 250", "gtceu:lutetium_solution 300")
        .duration(160)
        .EUt(GTValues.VA[GTValues.IV])
    // Terbium
    event.recipes.gtceu.electric_blast_furnace("blast_terbium_solution")
        .inputFluids("gtceu:terbium_solution 1000")
        .outputFluids("gtceu:steam 9600")
        .itemOutputs("5x gtceu:terbium_oxide_dust")
        .duration(120).EUt(GTValues.VA[GTValues.LuV])
        .blastFurnaceTemp(10800)

    event.recipes.gtceu.chemical_reactor("cuprous_chloride_dust")
        .itemInputs("gtceu:copper_dust")
        .inputFluids("gtceu:chlorine 1000")
        .itemOutputs("2x gtceu:cuprous_chloride_dust")
        .duration(160).EUt(GTValues.VA[GTValues.MV]);

    event.recipes.gtceu.large_chemical_reactor("terbium_oxide_lcr")
        .itemInputs("5x gtceu:terbium_oxide_dust", "12x gtceu:cuprous_chloride_dust")
        .itemOutputs("8x gtceu:terbium_salt_dust", "9x gtceu:cuprous_oxide_dust")
        .duration(40)
        .EUt(GTValues.VA[GTValues.ZPM])

    event.recipes.gtceu.autoclave("terbium_salt_autoclave")
        .itemInputs("8x gtceu:terbium_salt_dust", "3x gtceu:calcium_dust")
        .inputFluids(Fluid.of("gtceu:steam", 9600))
        .itemOutputs("2x gtceu:terbium_dust", "9x gtceu:calcium_chloride_dust")
        .outputFluids(Fluid.of("water", 60))
        .duration(320)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.polarizer("terbium_polarize_long")
        .itemInputs("gtceu:long_terbium_rod")
        .itemOutputs("gtceu:long_magnetic_terbium_rod")
        .duration(200)
        .EUt(GTValues.VA[GTValues.ZPM])
    event.recipes.gtceu.polarizer("terbium_polarize")
        .itemInputs("gtceu:terbium_rod")
        .itemOutputs("gtceu:magnetic_terbium_rod")
        .duration(200)
        .EUt(GTValues.VA[GTValues.ZPM])

    // Lutetium
    event.recipes.gtceu.large_chemical_reactor("lutetium_solution_acid_wash")
        .inputFluids("gtceu:lutetium_solution 1000", "gtceu:hydrofluoric_acid 6000")
        .itemOutputs("8x gtceu:lutetium_fluoride_dust")
        .outputFluids("minecraft:water 3000")
        .duration(160)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.electric_blast_furnace("lutetium_fluoride_blast")
        .itemInputs("8x gtceu:lutetium_fluoride_dust", "3x gtceu:calcium_dust")
        .itemOutputs("2x gtceu:lutetium_dust", "9x gtceu:fluorite_dust")
        .duration(120).EUt(GTValues.VA[GTValues.IV])
        .blastFurnaceTemp(2300)

    // Europium
    event.recipes.gtceu.large_chemical_reactor("europium_oxide_reduction_lcr")
        .itemInputs("5x gtceu:europium_oxide_dust", "1x gtceu:zinc_dust")
        .itemOutputs("4x gtceu:europium_ii_oxide_dust", "2x gtceu:zincite_dust")
        .duration(160)
        .EUt(GTValues.VA[GTValues.LuV])

    event.recipes.gtceu.electric_blast_furnace("ebf_europium_oxide_reduction")
        .itemInputs("6x gtceu:europium_ii_oxide_dust", "2x gtceu:aluminium_dust")
        .itemOutputs("3x gtceu:europium_dust", "5x gtceu:bauxite_dust")
        .duration(120).EUt(GTValues.VA[GTValues.LuV])
        .blastFurnaceTemp(9001)

    // Wet the drys
    event.recipes.gtceu.large_chemical_reactor("oxalic_acid_dihydrate")
        .notConsumable(doHarderProcessing ? "gtceu:vanadium_pentoxide_dust" : "gtceu:vanadium_dust")
        .itemInputs("minecraft:sugar")
        .inputFluids(Fluid.of("gtceu:nitric_acid", 12000), "minecraft:water")
        .itemOutputs("6x gtceu:oxalic_acid_dihydrate_dust")
        .outputFluids("gtceu:nitric_oxide 12000")
        .duration(600).EUt(GTValues.VA[GTValues.LV])

    // Dry the wets
    event.recipes.gtceu.electric_blast_furnace("oxalic_acid")
        .itemInputs("gtceu:oxalic_acid_dihydrate_dust")
        .itemOutputs("gtceu:oxalic_acid_dust")
        .outputFluids(Fluid.of("gtceu:steam", 19200))
        .duration(400)
        .blastFurnaceTemp(1700)
        .EUt(GTValues.VA[GTValues.MV])

    // Wet the drys again
    event.recipes.gtceu.chemical_reactor("kubejs:oxalic_acid_solution")
        .itemInputs("gtceu:oxalic_acid_dust")
        .inputFluids(Fluid.of("minecraft:water", 1000))
        .outputFluids(Fluid.of("gtceu:oxalic_acid_solution", 1000))
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    // New electrolysis recipe to reflect Sugar's altered formula
    event.recipes.gtceu.electrolyzer("sugar_electrolysis")
        .itemInputs("23x minecraft:sugar")
        .itemOutputs("12x gtceu:carbon_dust")
        .outputFluids(Fluid.of("minecraft:water", 11000))
        .duration(3.2 * 20)
        .EUt(GTValues.VA[GTValues.LV])
})
