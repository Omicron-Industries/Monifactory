/**
 * Recipes for Phoenix Fission, fission fuels, and reactor components.
 */
ServerEvents.recipes(event => {
    // Fission fuels
    /**
     * Other data is in startup_scripts/fission/fission_fuel_data.js
     * @type {{identifier: string, category: string, material1: com.gregtechceu.gtceu.api.data.chemical.material.Material, material2: com.gregtechceu.gtceu.api.data.chemical.material.Material, enrichment:Boolean}[]}
     */
    const fission_fuels = [
        {identifier: "tbu", category: "thorium", material1: GTMaterials.Thorium, material2: GTMaterials.Uranium235, enrichment: false},
        {identifier: "235", category: "uranium", material1: GTMaterials.Uranium238, material2: GTMaterials.Uranium235, enrichment: true},
        {identifier: "233", category: "uranium", material1: GTMaterials.Uranium238, material2: GTMaterials.get("uranium_233"), enrichment: true},
        {identifier: "mix_237", category: "neptunium", material1: GTMaterials.Uranium238, material2: GTMaterials.Neptunium, enrichment: false},
        {identifier: "239", category: "plutonium", material1: GTMaterials.get("plutonium_240"), material2: GTMaterials.Plutonium239, enrichment: true},
        {identifier: "241", category: "plutonium", material1: GTMaterials.get("plutonium_240"), material2: GTMaterials.Plutonium241, enrichment: true},
    ]
    fission_fuels.forEach(fuel_type => {
        let identifier = "";
        if(fuel_type.enrichment) {
            // Low-enriched fuels
            identifier = `le${fuel_type.category.charAt(0)}_${fuel_type.identifier}`
            // Fuel recipe
            event.shaped(`phoenix_fission:${identifier}_fuel`, ["ABB", "BBB", "BBB"], { A: ChemicalHelper.getDust(fuel_type.material2, GTValues.M).asIngredient(), B: ChemicalHelper.getDust(fuel_type.material1, GTValues.M).asIngredient() })
            // GT Fuel recipe
            event.recipes.gtceu.forming_press(`kubejs:${identifier}_press`)
                .notConsumable(GTItems.SHAPE_MOLD_CYLINDER)
                .itemInputs(ChemicalHelper.getDust(fuel_type.material1, 8 * GTValues.M), ChemicalHelper.getDust(fuel_type.material2, GTValues.M))
                .itemOutputs(`phoenix_fission:${identifier}_fuel`)
                .duration(20 * GTValues.SECONDS)
                .EUt(48)
            // Recycle unused fuel
            event.recipes.gtceu.thermal_centrifuge(`kubejs:${identifier}_decomp`)
                .itemInputs(`phoenix_fission:${identifier}_fuel`)
                .itemOutputs(ChemicalHelper.getDust(fuel_type.material1, 8 * GTValues.M), ChemicalHelper.getDust(fuel_type.material2, GTValues.M))
                .duration(80 * GTValues.SECONDS)
                .EUt(48)

            // High-enriched fuels
            identifier = `he${fuel_type.category.charAt(0)}_${fuel_type.identifier}`
            // Fuel recipe
            event.shaped(`phoenix_fission:${identifier}_fuel`, ["AAA", "ABB", "BBB"], { A: ChemicalHelper.getDust(fuel_type.material2, GTValues.M).asIngredient(), B: ChemicalHelper.getDust(fuel_type.material1, GTValues.M).asIngredient() })
            // GT Fuel recipe
            event.recipes.gtceu.forming_press(`kubejs:${identifier}_press`)
                .notConsumable(GTItems.SHAPE_MOLD_CYLINDER)
                .itemInputs(ChemicalHelper.getDust(fuel_type.material1, 5 * GTValues.M), ChemicalHelper.getDust(fuel_type.material2, 4 * GTValues.M))
                .itemOutputs(`phoenix_fission:${identifier}_fuel`)
                .duration(20 * GTValues.SECONDS)
                .EUt(48)
            // Recycle unused fuel
            event.recipes.gtceu.thermal_centrifuge(`kubejs:${identifier}_decomp`)
                .itemInputs(`phoenix_fission:${identifier}_fuel`)
                .itemOutputs(ChemicalHelper.getDust(fuel_type.material1, 5 * GTValues.M), ChemicalHelper.getDust(fuel_type.material2, 4 * GTValues.M))
                .duration(80 * GTValues.SECONDS)
                .EUt(48)
        } else {
            identifier = fuel_type.identifier;
            // Fuel recipe
            event.shaped(`phoenix_fission:${identifier}_fuel`, ["ABB", "BBB", "BBB"], { A: ChemicalHelper.getDust(fuel_type.material2, GTValues.M).asIngredient(), B: ChemicalHelper.getDust(fuel_type.material1, GTValues.M).asIngredient() })
            // GT Fuel recipe
            event.recipes.gtceu.forming_press(`kubejs:${identifier}_press`)
                .notConsumable(GTItems.SHAPE_MOLD_CYLINDER)
                .itemInputs(ChemicalHelper.getDust(fuel_type.material1, 8 * GTValues.M), ChemicalHelper.getDust(fuel_type.material2, GTValues.M))
                .itemOutputs(`phoenix_fission:${identifier}_fuel`)
                .duration(20 * GTValues.SECONDS)
                .EUt(48)
            // Recycle unused fuel
            event.recipes.gtceu.thermal_centrifuge(`kubejs:${identifier}_decomp`)
                .itemInputs(`phoenix_fission:${identifier}_fuel`)
                .itemOutputs(ChemicalHelper.getDust(fuel_type.material1, 8 * GTValues.M), ChemicalHelper.getDust(fuel_type.material2, GTValues.M))
                .duration(80 * GTValues.SECONDS)
                .EUt(48)
        }
    });

    // Depleted fuel decomposition
    /**
     * Helper method for defining recipes for recovering isotopes from depleted nuclear fuel.
     * @param {string} fuel_type Fuel type.
     * @param {com.gregtechceu.gtceu.api.data.chemical.material.stack.MaterialStack[]} outputs
     * @param {number} voltage_tier Voltage tier the centrifuge recipe operates at.
     */
    function decompdepleted(fuel_name, outputs, voltage_tier) {
        let outputDusts = outputs.map((value, index, array) => {
            return ChemicalHelper.getDust(value)
        })
        event.recipes.gtceu.centrifuge(`depleted_${fuel_name}_fuel_decomposition`)
            .itemInputs(`phoenix_fission:depleted_${fuel_name}_fuel`)
            .itemOutputs(outputDusts)
            .duration(400)
            .EUt(GTValues.VHA[voltage_tier])
    }
    /*
    IRL the vast majority of spent nuclear fuel is the fertile isotope, with trace amounts of transmuted fissile product.
    In Moni, the transmuted product is exaggerated for gameplay reasons.
    */

    // Thorium yields U-233, U-235, and Np-237 IRL.
    decompdepleted("tbu", [GTMaterials.Thorium.multiply(GTValues.M * 3), GTMaterials.Uranium235.multiply(GTValues.M * 0.25), GTMaterials.get("uranium_233").multiply(GTValues.M * 2), GTMaterials.Neptunium.multiply(GTValues.M * 0.75)], GTValues.EV)

    // Uranium yields primarily isotopes of Plutonium (Especially Pu-239) with a little bit of Np-237 from U-235 fuels, and Americium from U-233 fuels.
    decompdepleted("leu_233", [GTMaterials.Uranium238.multiply(GTValues.M * 3), GTMaterials.get("uranium_233").multiply(GTValues.M * 0.25), GTMaterials.get("plutonium_240").multiply(GTValues.M * 2), GTMaterials.Plutonium239.multiply(GTValues.M * 0.5), GTMaterials.Plutonium241.multiply(GTValues.M * 0.25)], GTValues.IV)
    decompdepleted("heu_233", [GTMaterials.Uranium238.multiply(GTValues.M * 2), GTMaterials.get("uranium_233").multiply(GTValues.M * 1.25), GTMaterials.get("plutonium_240").multiply(GTValues.M * 2), GTMaterials.Plutonium239.multiply(GTValues.M * 0.5), GTMaterials.Plutonium241.multiply(GTValues.M * 0.25)], GTValues.IV)
    decompdepleted("leu_235", [GTMaterials.Uranium238.multiply(GTValues.M * 3), GTMaterials.Uranium235.multiply(GTValues.M * 0.25), GTMaterials.get("plutonium_240").multiply(GTValues.M * 2), GTMaterials.Plutonium239.multiply(GTValues.M * 0.5), GTMaterials.Neptunium.multiply(GTValues.M * 0.5)], GTValues.IV)
    decompdepleted("heu_235", [GTMaterials.Uranium238.multiply(GTValues.M * 2), GTMaterials.Uranium235.multiply(GTValues.M * 1.25), GTMaterials.get("plutonium_240").multiply(GTValues.M * 2), GTMaterials.Plutonium239.multiply(GTValues.M * 0.5), GTMaterials.Neptunium.multiply(GTValues.M * 0.5)], GTValues.IV)

    // MIX-237 yields a mix of Plutonium and Americium.
    decompdepleted("mix_237", [GTMaterials.Uranium238.multiply(GTValues.M * 3), GTMaterials.Neptunium.multiply(GTValues.M * 0.25), GTMaterials.get("uranium_233").multiply(GTValues.M * 2), GTMaterials.Plutonium241.multiply(GTValues.M * 0.5), GTMaterials.Americium.multiply(GTValues.M * 0.25)], GTValues.IV)

    // Plutonium fuels yield Curium. (Especially Cu-245, which comes from Pu-242) Pu-239 fuels yield a bit of Np-237, while Pu-241 fuels yield Am-243. LE fuels, with their high Pu-242 content, also yield Am-243.
    decompdepleted("lep_239", [GTMaterials.get("plutonium_240").multiply(GTValues.M * 3), GTMaterials.Plutonium239.multiply(GTValues.M * 0.25), GTMaterials.Plutonium241.multiply(GTValues.M * 0.25), GTMaterials.Curium.multiply(GTValues.M * 0.75), GTMaterials.Neptunium.multiply(GTValues.M * 0.75)], GTValues.LuV)
    decompdepleted("hep_239", [GTMaterials.get("plutonium_240").multiply(GTValues.M * 2), GTMaterials.Plutonium239.multiply(GTValues.M * 1.25), GTMaterials.Plutonium241.multiply(GTValues.M * 0.25), GTMaterials.Curium.multiply(GTValues.M * 0.75), GTMaterials.Neptunium.multiply(GTValues.M * 0.75)], GTValues.LuV)
    decompdepleted("lep_241", [GTMaterials.get("plutonium_240").multiply(GTValues.M * 3), GTMaterials.Plutonium241.multiply(GTValues.M * 0.25), GTMaterials.Curium.multiply(GTValues.M * 0.75), GTMaterials.Americium.multiply(GTValues.M * 0.5), GTMaterials.Californium.multiply(GTValues.M * 0.25)], GTValues.LuV)
    decompdepleted("hep_241", [GTMaterials.get("plutonium_240").multiply(GTValues.M * 2), GTMaterials.Plutonium241.multiply(GTValues.M * 1.25), GTMaterials.Curium.multiply(GTValues.M * 0.75), GTMaterials.Americium.multiply(GTValues.M * 0.5), GTMaterials.Californium.multiply(GTValues.M * 0.25)], GTValues.LuV)

    /*
    // Americium yields Curium. (Cu-243 from Americium-241, and Cu-245 from  Americium-243) LEA, with its high Am-243 content, also yields Pu-239.
    decompdepleted("americium_lea_242", "8x gtceu:plutonium_nugget", "5x nuclearcraft:curium_245", "nuclearcraft:californium_251", "nuclearcraft:californium_252", GTValues.LuV)
    decompdepleted("americium_hea_242", "3x nuclearcraft:curium_245", "2x nuclearcraft:californium_251", "2x nuclearcraft:californium_252", "nuclearcraft:californium_250", GTValues.LuV)
    */

    // Common fissile byproducts: Xenon, Iodine, [Steep drop] Caesium, Processed Fissile Waste
    // Rare fissile byproducts: Fissile products: Inert Metal Mixture, Rare Earth, Barium, Molybdenum (Zirconium)
})
