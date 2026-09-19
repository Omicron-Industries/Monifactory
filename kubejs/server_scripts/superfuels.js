/**
 * Recipes for superfuels such as JEAN and Wither Gas.
 */

ServerEvents.recipes(event => {
    // Dragon Breath canning and uncanning
    event.recipes.gtceu.canner("dragon_breath_unbottling")
        .itemInputs("minecraft:dragon_breath")
        .itemOutputs("minecraft:glass_bottle")
        .outputFluids("gtceu:dragon_breath 250")
        .duration(400)
        .EUt(2)

    event.recipes.gtceu.canner("dragon_breath_bottling")
        .itemInputs("minecraft:glass_bottle")
        .inputFluids("gtceu:dragon_breath 250")
        .itemOutputs("minecraft:dragon_breath")
        .duration(400)
        .EUt(2)

    // JEAN Gasoline consumption
    event.recipes.gtceu.combustion_generator("jean_gasoline_generator")
        .inputFluids("gtceu:jean_gasoline 1")
        .duration(160)
        .EUt(-GTValues.V[GTValues.MV])

    // JEAN Gasoline
    event.recipes.gtceu.large_chemical_reactor("kubejs:jean_gasoline")
        .itemInputs("3x gtceu:netherrack_dust")
        .inputFluids("gtceu:high_octane_gasoline 8000", "gtceu:rocket_fuel 5000", "gtceu:chlorine_trifluoride 2000", "gtceu:tetraethyllead 1000", "gtceu:dragon_breath 500")
        .outputFluids("gtceu:jean_gasoline 16000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.IV])
        .circuit(24)

    event.recipes.gtceu.chemical_reactor("kubejs:chloroethane")
        .inputFluids("gtceu:ethylene 1000", "gtceu:hydrochloric_acid 1000")
        .outputFluids("gtceu:chloroethane 1000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.LV])
        .circuit(4)

    event.recipes.gtceu.chemical_reactor("kubejs:tetraethyllead")
        .itemInputs("8x gtceu:sodium_lead_alloy_dust")
        .inputFluids("gtceu:chloroethane 4000")
        .outputFluids("gtceu:tetraethyllead 1000")
        .itemOutputs("8x gtceu:salt_dust", "3x gtceu:lead_dust")
        .duration(300)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.chemical_reactor("kubejs:chlorine_trifluoride")
        .inputFluids("gtceu:fluorine 3000", "gtceu:chlorine 1000")
        .outputFluids("gtceu:chlorine_trifluoride 1000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.ULV])

    event.recipes.gtceu.mixer("kubejs:sodium_lead_alloy")
        .itemInputs("gtceu:sodium_dust", "gtceu:lead_dust")
        .itemOutputs("2x gtceu:sodium_lead_alloy_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.ULV])

    // Wither Gas consumption
    event.recipes.gtceu.gas_turbine("wither_gas_generator")
        .inputFluids("gtceu:wither_gas 1")
        .duration(128)
        .EUt(-GTValues.V[GTValues.MV])

    // Wither Gas
    event.recipes.gtceu.large_chemical_reactor("wither_gas")
        .notConsumable("minecraft:nether_star")
        .itemInputs("enderio:withering_powder", "2x gtceu:small_calcium_perchlorate_dust")
        .inputFluids("gtceu:lpg 8000", "gtceu:nitrobenzene 10000", "gtceu:overbased_magnesium_sulfonate 500")
        .outputFluids("gtceu:wither_gas 20000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.EV])

    // Calcium Perchlorate alternate recipes
    event.recipes.gtceu.chemical_reactor("calcium_perchlorate_from_calcium_chloride")
        .notConsumable("gtceu:rutile_dust")
        .itemInputs("3x gtceu:calcium_chloride_dust")
        .inputFluids("gtceu:oxygen 8000")
        .itemOutputs("11x gtceu:calcium_perchlorate_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.chemical_reactor("calcium_perchlorate_from_calcite")
        .notConsumable("gtceu:vanadium_pentoxide_dust")
        .itemInputs("5x gtceu:calcite_dust", "3x gtceu:sodium_hydroxide_dust")
        .inputFluids("gtceu:chlorine 2000", "gtceu:oxygen 7000")
        .itemOutputs("11x gtceu:calcium_perchlorate_dust", "12x gtceu:sodium_bicarbonate_dust")
        .duration(150)
        .EUt(GTValues.VA[GTValues.MV])

    // Calcium Chloride alternate recipe
    event.recipes.gtceu.chemical_reactor("calcium_chloride_synthesis")
        .itemInputs("gtceu:calcium_dust")
        .inputFluids("gtceu:chlorine 2000")
        .itemOutputs("3x gtceu:calcium_chloride_dust")
        .duration(240)
        .EUt(GTValues.VA[GTValues.LV])

    // 1-Dodecene/Tetrapropylene, an monoalkene/alpha-olefin/oligomer
    event.recipes.gtceu.chemical_reactor("dodecene_from_propene")
        .notConsumableFluid("gtceu:titanium_tetrachloride")
        .inputFluids("gtceu:propene 4000")
        .outputFluids("gtceu:dodecene 1000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.chemical_reactor("dodecene_from_ethylene")
        .notConsumableFluid("gtceu:titanium_tetrachloride")
        .inputFluids("gtceu:ethylene 6000")
        .outputFluids("gtceu:dodecene 1000")
        .duration(250)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.chemical_reactor("dodecene_from_butene")
        .notConsumableFluid("gtceu:titanium_tetrachloride")
        .inputFluids("gtceu:butene 3000")
        .outputFluids("gtceu:dodecene 1000")
        .duration(150)
        .EUt(GTValues.VA[GTValues.MV])

    // Alkylbenzene
    event.recipes.gtceu.chemical_reactor("alkylbenzene_from_benzene")
        .inputFluids("gtceu:phosphoric_acid 100", "gtceu:benzene 1000", "gtceu:dodecene 1000", )
        .outputFluids("gtceu:alkylbenzene 1000")
        .duration(120)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.chemical_reactor("alkylbenzene_from_ethylbenzene")
        .inputFluids("gtceu:phosphoric_acid 100", "gtceu:ethylbenzene 1000", "gtceu:dodecene 1000", )
        .outputFluids("gtceu:alkylbenzene 1000", "gtceu:ethylene 1000")
        .duration(160)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.chemical_reactor("alkylbenzene_from_cumene")
        .inputFluids("gtceu:phosphoric_acid 100", "gtceu:cumene 1000", "gtceu:dodecene 1000", )
        .outputFluids("gtceu:alkylbenzene 1000", "gtceu:propene 1000")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    // Overbased Magnesium Sulfonate
    event.recipes.gtceu.chemical_reactor("overbased_magnesium_sulfonate_from_magnesium")
        .inputFluids("gtceu:alkylbenzene 2000", "gtceu:sulfur_trioxide 2000")
        .itemInputs("gtceu:magnesium_dust")
        .outputFluids("gtceu:overbased_magnesium_sulfonate 2000", "gtceu:hydrogen 2000")
        .duration(80)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.chemical_reactor("overbased_magnesium_sulfonate_from_magnesium_chloride")
        .inputFluids("gtceu:alkylbenzene 2000", "gtceu:sulfur_trioxide 2000")
        .itemInputs("3x gtceu:magnesium_chloride_dust")
        .outputFluids("gtceu:overbased_magnesium_sulfonate 2000", "gtceu:hydrochloric_acid 2000")
        .duration(60)
        .EUt(GTValues.VA[GTValues.HV])
})
