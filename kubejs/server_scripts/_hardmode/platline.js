/**
 * Hardmode Platline recipes.
 * An abbreviated version of NH's platline.
 */
if (doHarderProcessing) {
    ServerEvents.recipes(event => {
        // Platinum Group
        event.remove({ id: "gtceu:centrifuge/pgs_separation" })
        event.remove({ id: "gtceu:electrolyzer/raw_platinum_separation" })
        event.remove({ id: "gtceu:chemical_reactor/raw_palladium_separation" })
        event.remove({ id: "gtceu:large_chemical_reactor/raw_palladium_separation" })
        event.remove({ id: "gtceu:chemical_reactor/inert_metal_mixture_separation" })
        event.remove({ id: "gtceu:large_chemical_reactor/inert_metal_mixture_separation" })
        event.remove({ id: "gtceu:chemical_reactor/ruthenium_tetroxide_separation" })
        event.remove({ id: "gtceu:large_chemical_reactor/ruthenium_tetroxide_separation" })
        event.remove({ id: "gtceu:electrolyzer/rhodium_sulfate_separation" })
        // event.remove({ id: "gtceu:large_chemical_reactor/rarest_metal_mixture_separation" })
        // event.remove({ id: "gtceu:centrifuge/iridium_metal_residue_separation" })
        // event.remove({ id: "gtceu:chemical_reactor/iridium_chloride_separation" })
        // event.remove({ id: "gtceu:large_chemical_reactor/iridium_chloride_separation" })
        event.remove({ id: "gtceu:distillation_tower/acidic_osmium_solution_separation" })
        event.remove({ id: "gtceu:distillery/acidic_osmium_solution_separation_to_hydrochloric_acid" })
        event.remove({ id: "gtceu:distillery/acidic_osmium_solution_separation_to_water" })
        event.remove({ id: "gtceu:large_chemical_reactor/rarest_metal_mixture_separation" })
        event.remove({ id: "gtceu:chemical_reactor/acetic_acid_from_methanol"})
        event.remove({ id: "gtceu:large_chemical_reactor/acetic_acid_from_methanol"})
        // event.remove({ id: "gtceu:chemical_reactor/osmium_tetroxide_separation" })
        // event.remove({ id: "gtceu:large_chemical_reactor/osmium_tetroxide_separation" })
        event.remove({ id: "gtceu:centrifuge/decomposition_centrifuging__platinum_sludge_residue" })

        // Formic Acid
        event.recipes.gtceu.chemical_reactor("sodium_methoxide")
            .itemInputs("gtceu:sodium_dust")
            .inputFluids("gtceu:methanol 1000")
            .itemOutputs("6x gtceu:sodium_methoxide_dust")
            .outputFluids("gtceu:hydrogen 1000")
            .duration(10).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.chemical_reactor("methyl_formate")
            .itemInputs("gtceu:tiny_sodium_methoxide_dust")
            .inputFluids("gtceu:methanol 1000", "gtceu:carbon_monoxide 1000")
            .outputFluids("gtceu:methyl_formate 1000")
            .duration(16).EUt(GTValues.VA[GTValues.LV])
            .circuit(3)

        event.recipes.gtceu.chemical_reactor("formic_acid")
            .inputFluids("gtceu:methyl_formate 1000", "minecraft:water 1000")
            .outputFluids("gtceu:formic_acid 1000", "gtceu:methanol 1000")
            .duration(16).EUt(GTValues.VA[GTValues.LV])

        // Potassium Pyrosulfate
        event.recipes.gtceu.chemical_bath("rock_salt_to_potassium_bisulfate")
            .itemInputs("2x gtceu:rock_salt_dust")
            .inputFluids("gtceu:sulfuric_acid 1000")
            .itemOutputs("7x gtceu:potassium_bisulfate_dust")
            .outputFluids("gtceu:hydrochloric_acid 1000")
            .duration(60).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.chemical_bath("saltpeter_to_potassium_bisulfate")
            .itemInputs("5x gtceu:saltpeter_dust")
            .inputFluids("gtceu:sulfuric_acid 1000")
            .itemOutputs("7x gtceu:potassium_bisulfate_dust")
            .outputFluids("gtceu:nitric_acid 1000")
            .duration(60).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.chemical_reactor("potassium_bisulfate_to_potassium_pyrosulfate")
            .itemInputs("14x gtceu:potassium_bisulfate_dust")
            .itemOutputs("11x gtceu:potassium_pyrosulfate_dust")
            .outputFluids("minecraft:water 1000")
            .duration(30).EUt(GTValues.VHA[GTValues.MV])

        event.recipes.gtceu.chemical_reactor("potassium_sulfate_to_potassium_pyrosulfate")
            .itemInputs("7x gtceu:potassium_sulfate_dust")
            .inputFluids("gtceu:sulfur_trioxide 1000")
            .itemOutputs("11x gtceu:potassium_pyrosulfate_dust")
            .duration(30).EUt(GTValues.VHA[GTValues.MV])

        // Platinum Group Sludge
        event.recipes.gtceu.centrifuge("bathe_platinum_group_sludge_dust")
            .itemInputs("2x gtceu:platinum_group_sludge_dust")
            .inputFluids("gtceu:aqua_regia 2000")
            .itemOutputs("gtceu:platinum_group_residue_dust", "gtceu:iridium_group_sludge_dust", "gtceu:platinum_sludge_residue_dust")
            .outputFluids("gtceu:platinum_palladium_leachate 1000")
            .duration(200).EUt(GTValues.VA[GTValues.HV])

        event.recipes.gtceu.chemical_bath("bathe_platinum_metallic_dust")
            .itemInputs("2x gtceu:platinum_metallic_dust")
            .inputFluids("gtceu:aqua_regia 2000")
            .itemOutputs("gtceu:platinum_group_residue_dust", "gtceu:iridium_group_sludge_dust")
            .outputFluids("gtceu:platinum_palladium_leachate 1000")
            .duration(200).EUt(GTValues.VA[GTValues.LV])

        // Platinum Sludge Residue
        event.recipes.gtceu.centrifuge("centrifuge_platinum_sludge_residue_dust")
            .itemInputs("5x gtceu:platinum_sludge_residue_dust")
            .itemOutputs("2x gtceu:silicon_dioxide_dust", "2x gtceu:copper_dust")
            .chancedOutput("gtceu:gold_dust", 4000, 0)
            .duration(938).EUt(GTValues.VA[GTValues.LV])

        // Platinum
        event.recipes.gtceu.chemical_reactor("platinum_palladium_leachate_separation")
            .itemInputs("8x gtceu:ammonium_chloride_dust")
            .inputFluids("gtceu:platinum_palladium_leachate 1000")
            .itemOutputs("9x gtceu:ammonium_hexachloroplatinate_dust", "gtceu:crude_platinum_residue_dust")
            .outputFluids("gtceu:palladium_rich_ammonia 1000")
            .duration(1200).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.large_chemical_reactor("ammonium_hexachloroplatinate_to_platinum")
            .itemInputs("9x gtceu:ammonium_hexachloroplatinate_dust")
            .inputFluids("gtceu:hydrogen 3000")
            .circuit(2)
            .itemOutputs("4x gtceu:platinum_raw_dust")
            .outputFluids("gtceu:hydrochloric_acid 3000", "gtceu:ammonia 2000")
            .duration(140).EUt(GTValues.VA[GTValues.EV])

        let steam = new JSONObject()
        steam.add("amount", 3840)
        steam.add("value", { tag: "forge:steam" })

        event.recipes.gtceu.autoclave("platinum_raw_dust_to_platinum")
            .itemInputs("3x gtceu:platinum_raw_dust", "gtceu:calcium_dust")
            .inputFluids(FluidIngredientJS.of(steam))
            .itemOutputs("gtceu:platinum_dust", "3x gtceu:calcium_chloride_dust")
            .outputFluids("minecraft:water 24")
            .duration(30).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.sifter("sift_crude_platinum_residue_dust")
            .itemInputs("gtceu:crude_platinum_residue_dust")
            .chancedOutput("gtceu:platinum_metallic_dust", 9500, 0)
            .duration(600).EUt(GTValues.VA[GTValues.LV])

        // Palladium
        event.recipes.gtceu.electrolyzer("palladium_rich_ammonia_to_palladium_raw_dust")
            .inputFluids("gtceu:palladium_rich_ammonia 1000")
            .itemOutputs("gtceu:palladium_raw_dust")
            .outputFluids("gtceu:ammonia 2000")
            .duration(250).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.chemical_reactor("raw_palladium_dust_to_palladium_dust")
            .itemInputs("3x gtceu:palladium_raw_dust")
            .inputFluids("gtceu:formic_acid 1000")
            .itemOutputs("gtceu:palladium_dust")
            .outputFluids("gtceu:hydrochloric_acid 3000", "gtceu:carbon_dioxide 1000")
            .duration(250).EUt(GTValues.VA[GTValues.LV])

        // Rhodium
        event.recipes.gtceu.electric_blast_furnace("platinum_group_residue_to_iridium_group_sludge")
            .itemInputs("gtceu:platinum_group_residue_dust", "11x gtceu:potassium_pyrosulfate_dust")
            .itemOutputs("gtceu:rhodium_sulfate_dust", "7x gtceu:potassium_sulfate_dust")
            .duration(200).EUt(GTValues.VA[GTValues.MV])
            .blastFurnaceTemp(1048)

        event.recipes.gtceu.chemical_bath("bathe_rhodium_sulfate")
            .itemInputs("6x gtceu:rhodium_sulfate_dust")
            .inputFluids("minecraft:water 2000")
            .itemOutputs("gtceu:iridium_group_sludge_dust")
            .outputFluids("gtceu:rhodium_sulfate_solution 2000")
            .duration(300).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.chemical_reactor("rhodium_sulfate_solution_to_crude_rhodium_residue_dust")
            .itemInputs("3x gtceu:zinc_dust")
            .inputFluids("gtceu:rhodium_sulfate_solution 1000")
            .itemOutputs("18x gtceu:zinc_sulfate_dust", "gtceu:crude_rhodium_residue_dust")
            .duration(300).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.electric_blast_furnace("crude_rhodium_residue_to_rhodium")
            .itemInputs("gtceu:crude_rhodium_residue_dust")
            .itemOutputs("gtceu:rhodium_dust")
            .outputFluids("gtceu:steam 9600")
            .duration(300).EUt(GTValues.VA[GTValues.MV])
            .blastFurnaceTemp(848)

        // Ruthenium
        event.recipes.gtceu.electric_blast_furnace("iridium_group_sludge_to_sodium_ruthenate")
            .itemInputs("gtceu:iridium_group_sludge_dust", "2x gtceu:soda_ash_dust")
            .itemOutputs("2x gtceu:sodium_ruthenate_dust", "gtceu:ash_dust", "gtceu:rarest_metal_mixture_dust")
            .duration(200).EUt(GTValues.VA[GTValues.MV])
            .blastFurnaceTemp(1023)

        event.recipes.gtceu.chemical_reactor("sodium_ruthenate_to_ruthenium_tetroxide")
            .itemInputs("6x gtceu:sodium_ruthenate_dust")
            .inputFluids("gtceu:chlorine 2000", "minecraft:water 2000")
            .itemOutputs("5x gtceu:ruthenium_tetroxide_dust")
            .outputFluids("gtceu:salt_water 2000")
            .duration(1200).EUt(GTValues.VA[GTValues.HV])

        event.recipes.gtceu.chemical_reactor("ruthenium_tetroxide_to_ruthenium")
            .itemInputs("5x gtceu:ruthenium_tetroxide_dust")
            .inputFluids("gtceu:hydrogen 8000")
            .itemOutputs("gtceu:ruthenium_dust")
            .outputFluids("minecraft:water 4000")
            .duration(300).EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.chemical_bath("bathe_rarest_metal_mixture")
            .itemInputs("gtceu:rarest_metal_mixture_dust")
            .inputFluids("gtceu:hydrochloric_acid 1000")
            .itemOutputs("gtceu:iridium_metal_residue_dust")
            .outputFluids("gtceu:acidic_osmium_solution 1000")
            .duration(100).EUt(GTValues.VHA[GTValues.LuV])

        // Osmium is mostly similar to base GTM method
        event.recipes.gtceu.distillation_tower("distill_acidic_osmium_solution")
            .inputFluids("gtceu:acidic_osmium_solution 2000")
            .itemOutputs("gtceu:osmium_tetroxide_dust")
            .outputFluids("gtceu:hydrochloric_acid 2000")
            .duration(150).EUt(GTValues.VA[GTValues.IV])

        // Iridium follows regular processing exactly once separated from Rarest Metal Residue
    })
}
