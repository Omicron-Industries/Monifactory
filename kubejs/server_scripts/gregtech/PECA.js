/**
 * PECA processing line
 */
ServerEvents.recipes(event => {
    event.recipes.gtceu.chemical_reactor("sodium_cyanide")
        .inputFluids("gtceu:hydrogen_cyanide 1000")
        .itemInputs("gtceu:sodium_hydroxide_dust")
        .outputFluids("minecraft:water 1000")
        .itemOutputs("gtceu:sodium_cyanide_dust")
        .duration(50)
        .EUt(GTValues.VHA[GTValues.HV])

    // Would like to make this a mixer recipe but Mixers only have 2 fluid slots
    event.recipes.gtceu.chemical_reactor("chloroacetic_mixture")
        .notConsumableFluid("gtceu:acetic_anhydride 500")
        .inputFluids("gtceu:acetic_acid 1000", "gtceu:chlorine 3000")
        .outputFluids("gtceu:chloroacetic_mixture 2000")
        .duration(20)
        .EUt(GTValues.VA[GTValues.ZPM])

    event.recipes.gtceu.distillation_tower("chloroacetate_distillation")
        .inputFluids("gtceu:chloroacetic_mixture 2000")
        .itemOutputs("gtceu:small_chloroacetate_dust")
        .outputFluids("gtceu:dichloroacetate 500", "gtceu:trichloroacetate 250", "gtceu:hydrochloric_acid 1000")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.IV])

    event.recipes.gtceu.large_chemical_reactor("cyanoacetic_acid")
        .itemInputs("gtceu:chloroacetate_dust", "gtceu:sodium_cyanide_dust")
        .inputFluids("gtceu:hydrochloric_acid 1000", "gtceu:oxygen 500")
        .itemOutputs("gtceu:cyanoacetic_acid_dust", "gtceu:sodium_hydroxide_dust")
        .outputFluids("gtceu:chlorine 2000")
        .duration(600)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.chemical_reactor("ethyl_cyanoacrylate")
        .notConsumableFluid("gtceu:fluoroantimonic_acid 2000")
        .inputFluids("gtceu:ethanol 1000", "gtceu:formaldehyde 1000")
        .itemInputs("gtceu:cyanoacetic_acid_dust")
        .outputFluids("gtceu:ethyl_cyanoacrylate 1000", "minecraft:water 2000")
        .duration(380)
        .EUt(GTValues.VA[GTValues.LuV])

    // Polymerization recipe
    event.recipes.gtceu.chemical_reactor("polyethyl_cyanoacrylate")
        .chancedFluidInput("gtceu:dimethyl_sulfoxide 200", 500, 0)
        .inputFluids("gtceu:ethyl_cyanoacrylate 144", "minecraft:water 200")
        .outputFluids("gtceu:polyethyl_cyanoacrylate 144")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LuV])

    // Polymerization recipe with distilled water
    event.recipes.gtceu.chemical_reactor("polyethyl_cyanoacrylate_distilled")
        .chancedFluidInput("gtceu:dimethyl_sulfoxide 200", 100, 0)
        .inputFluids("gtceu:ethyl_cyanoacrylate 96", "gtceu:distilled_water 100")
        .outputFluids("gtceu:polyethyl_cyanoacrylate 144")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LuV])

    // Polymerization recipe with the moisture in the air like IRL
    event.recipes.gtceu.chemical_reactor("polyethyl_cyanoacrylate_air")
        .chancedFluidInput("gtceu:dimethyl_sulfoxide 200", 100, 0)
        .inputFluids("gtceu:ethyl_cyanoacrylate 144", "gtceu:air 1000")
        .outputFluids("gtceu:polyethyl_cyanoacrylate 144")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LuV])

    // Dimethyl sulfoxide (catalyst) chain below
    event.recipes.gtceu.chemical_reactor("dimethyl_sulfoxide")
        .inputFluids("gtceu:dimethyl_sulfide 1000", "gtceu:nitrogen_dioxide 1000")
        .outputFluids("gtceu:dimethyl_sulfoxide 1000", "gtceu:nitric_oxide 1000")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.chemical_reactor("dimethyl_sulfide")
        .notConsumable("gtceu:aluminium_dust")
        .inputFluids("gtceu:hydrogen_sulfide 1000", "gtceu:methanol 2000")
        .outputFluids("gtceu:dimethyl_sulfide 1000", "minecraft:water 2000")
        .duration(500)
        .EUt(GTValues.VHA[GTValues.LuV])

    // Uses for PECA with higher efficiency than PBI
    event.recipes.gtceu.bender("fluid_cell_peca")
        .itemInputs("gtceu:polyethyl_cyanoacrylate_plate")
        .itemOutputs("32x gtceu:fluid_cell")
        .duration(100)
        .EUt(GTValues.VA[GTValues.ULV])
        .circuit(12)

    event.recipes.gtceu.chemical_reactor("plastic_board_peca")
        .itemInputs("gtceu:polyethyl_cyanoacrylate_plate", "4x gtceu:copper_foil")
        .inputFluids("gtceu:sulfuric_acid 250")
        .itemOutputs("16x gtceu:plastic_circuit_board")
        .duration(500)
        .EUt(10)

    event.recipes.gtceu.fluid_solidifier("petri_dish_peca")
        .notConsumable("gtceu:cylinder_casting_mold")
        .inputFluids("gtceu:polyethyl_cyanoacrylate 9")
        .itemOutputs("4x gtceu:petri_dish")
        .duration(0.5 * 20)
        .EUt(GTValues.VA[GTValues.HV])

    // Glue from ECA
    event.recipes.gtceu.mixer("glue_from_ethyl_cyanoacrylate")
        .inputFluids("gtceu:ethyl_cyanoacrylate 2000")
        .itemInputs("gtceu:small_silicon_dioxide_dust")
        .outputFluids("gtceu:glue 10000")
        .duration(3 * 20)
        .EUt(GTValues.VA[GTValues.ULV])
})
