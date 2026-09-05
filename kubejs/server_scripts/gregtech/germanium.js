/**
*Line for Germanium, which is used in Advanced Solder
*/
ServerEvents.recipes(event => {
    // Replace ash outputs with Coal Fly Ash
    event.replaceOutput({ input: ["minecraft:coal", "minecraft:coal_block", "gtceu:coal_dust", /coke/] },
        ["gtceu:ash_dust", "gtceu:dark_ash_dust"], "gtceu:coal_fly_ash_dust")

    // Initial Centrifuge Recipe
    event.recipes.gtceu.centrifuge("coal_fly_ash_centrifuge")
        .itemInputs("5x gtceu:coal_fly_ash_dust")
        .chancedOutput("gtceu:fly_ash_polymineral_mixture_dust", 8000, 0)
        .chancedOutput("gtceu:fly_ash_polymineral_mixture_dust", 7700, 0)
        .chancedOutput("gtceu:fly_ash_iron_mineral_mixture_dust", 7500, 0)
        .chancedOutput("gtceu:fly_ash_iron_mineral_mixture_dust", 6666, 0)
        .chancedOutput("gtceu:fly_ash_aluminosilicate_dust", 5500, 0)
        .duration(400)
        .EUt(GTValues.VA[GTValues.MV])

    // Aluminosilicate Line
    event.recipes.gtceu.electric_blast_furnace("kubejs:salt_roasted_aluminosilicate_dust")
        .itemInputs("gtceu:fly_ash_aluminosilicate_dust", "2x gtceu:soda_ash_dust")
        .inputFluids(Fluid.of("gtceu:oxygen", 3000))
        .itemOutputs("gtceu:salt_roasted_aluminosilicate_dust")
        .outputFluids(Fluid.of("gtceu:carbon_dioxide", 3000))
        .blastFurnaceTemp(3600)
        .duration(1200)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.chemical_bath("kubejs:aluminosilicate_leachate")
        .itemInputs("2x gtceu:salt_roasted_aluminosilicate_dust")
        .inputFluids(Fluid.of("gtceu:oxalic_acid_solution", 2000))
        .itemOutputs("4x gtceu:sodium_dust", "gtceu:germanium_dust", "4x gtceu:lithium_dust", "gtceu:silicon_dust", "gtceu:aluminium_dust", "gtceu:vanadium_dust")
        .outputFluids(Fluid.of("gtceu:oxalic_acid_solution", 1250))
        .duration(160)
        .EUt(GTValues.VA[GTValues.EV])

    // Polymineral Line
    event.recipes.gtceu.chemical_bath("kubejs:polymineral_leachate")
        .itemInputs("gtceu:fly_ash_polymineral_mixture_dust")
        .inputFluids(Fluid.of("gtceu:oxalic_acid_solution", 1000))
        .chancedOutput("gtceu:mica_dust", 2500, 0)
        .chancedOutput("ae2:certus_quartz_dust", 2500, 0)
        .chancedOutput("gtceu:quartzite_dust", 2500, 0)
        .chancedOutput("gtceu:marble_dust", 2500, 0)
        .chancedItemOutputLogic(ChanceLogic.XOR)
        .outputFluids(Fluid.of("gtceu:polymineral_leachate", 1000))
        .duration(300)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.centrifuge("polymineral_leachate_centrifuge")
        .inputFluids(Fluid.of("gtceu:polymineral_leachate", 3000))
        .itemOutputs("gtceu:nickel_dust")
        .chancedOutput("gtceu:nickel_dust", 7500, 0)
        .chancedOutput("gtceu:small_germanium_dust", 6666, 0)
        .outputFluids(Fluid.of("gtceu:oxalic_acid_solution", 500))
        .outputFluids(Fluid.of("minecraft:water", 500))
        .duration(500)
        .EUt(GTValues.VA[GTValues.MV])

    // Iron Mineral Line
    event.recipes.gtceu.chemical_bath("kubejs:iron_mineral_solution")
        .itemInputs("gtceu:fly_ash_iron_mineral_mixture_dust")
        .inputFluids(Fluid.of("gtceu:distilled_water", 1000))
        .itemOutputs("gtceu:small_zinc_dust")
        .outputFluids(Fluid.of("gtceu:iron_mineral_solution", 1000))
        .duration(900)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.electrolyzer("kubejs:iron_mineral_solution_electrolysis")
        .inputFluids(Fluid.of("gtceu:iron_mineral_solution", 3000))
        .chancedOutput("gtceu:germanium_dust", 3500, 0)
        .itemOutputs("2x gtceu:goethite_dust")
        .chancedOutput("gtceu:yellow_limonite_dust", 5000, 0)
        .chancedOutput("gtceu:sphalerite_dust", 5000, 0)
        .chancedOutput("gtceu:small_gallium_dust", 2000, 0)
        .outputFluids(Fluid.of("minecraft:water", 1000))
        .duration(200)
        .EUt(GTValues.VA[GTValues.EV])
})
