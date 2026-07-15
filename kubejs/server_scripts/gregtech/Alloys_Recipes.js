/**
 * Alloy Smelter, Mixer, ABS recipes for alloys.
 * Alloy Smelter alloys don't need an ABS recipe.
 *
 * ABS recipes' durations are 75% the duration it would take to EBF all the ingots it produces in fluid form;
 * For example, Mythril takes 102.75 seconds in the EBF, but produces 2 ingots in the Mixer and ABS.
 * Thus it takes 2 * 102.75 * 0.75 = 154.1 seconds (3082 ticks) in the ABS per batch.
 *
 * Includes several ABS recipes for Thermal alloys that may become redundant when GTM#3295 is resolved.
 */

// Alloy Smelter recipes
ServerEvents.recipes(event => {
    /**
     * Generates each permutation of possible ingredients for an ingot in the Alloy Smelter.
     * @param {InputItem_[]} inputA Any possible primary inputs. The dust form must come first.
     * @param {InputItem_[]} inputB Any possible secondary inputs. The dust form must come first.
     * @param {string} result Result ID without ingot or dust suffix
     * @param {number} duration in seconds
     * @param {number} eut
     * @param {bool} doMixing Whether to generate a mixer recipe. Only enable if the output ingot has a dust form.
     */
    const alloySmeltingVariant = (inputA, inputB, result, duration, eut, doMixing) => {
        // do not const anything here, weird optimization happening with the js vm
        for (let itemA of inputA) {
            for (let itemB of inputB) {
                // the a here is so that it gets sorted on top, jei sorts by recipe id
                event.recipes.gtceu.alloy_smelter(`gtceu:${Item.of(itemA).idLocation.path}_and_${Item.of(itemB).idLocation.path}_into_${Item.of(result).idLocation.path}`)
                    .itemInputs(itemA, itemB)
                    .itemOutputs(Item.of(result.concat("_ingot")))
                    .duration(duration * 20)
                    .EUt(eut)
            }
        }

        // Mixer recipe means the first item of each Input list should be dust or powder-like
        if (doMixing) {
            event.recipes.gtceu.mixer(`${Item.of(result.concat("_dust")).idLocation.path}`)
                .itemInputs(inputA[0], inputB[0])
                .itemOutputs(Item.of(result.concat("_dust")))
                .duration(duration / 3 * 20)
                .EUt(eut)
        }
    }

    alloySmeltingVariant(
        ["#forge:dusts/steel", "#forge:ingots/steel"],
        ["#forge:dusts/obsidian", "#forge:obsidian", "#forge:gems/void"],
        "gtceu:dark_steel", 12, GTValues.VHA[GTValues.LV], true);

    event.shapeless("gtceu:conductive_alloy_dust", ["#forge:dusts/iron", "#forge:dusts/redstone"]).id("kubejs:conductive_alloy_dust_handcraft")
    alloySmeltingVariant(
        ["#forge:dusts/iron", "#forge:ingots/iron"],
        ["#forge:dusts/redstone"],
        "2x gtceu:conductive_alloy", 7.5, GTValues.VHA[GTValues.LV], true);

    alloySmeltingVariant(
        ["#forge:dusts/iron", "#forge:ingots/iron"],
        ["kubejs:pulsating_dust"],
        "gtceu:pulsating_alloy", 7.5, GTValues.VHA[GTValues.LV], true);

    alloySmeltingVariant(
        ["#forge:dusts/steel", "#forge:ingots/steel"],
        ["#forge:dusts/silicon", "#forge:ingots/silicon"],
        "2x gtceu:electrical_steel", 6, GTValues.VHA[GTValues.LV], true);

    alloySmeltingVariant(
        ["#forge:dusts/gold", "#forge:ingots/gold"],
        ["minecraft:soul_sand"],
        "gtceu:soularium", 6, GTValues.VA[GTValues.LV], true);

    alloySmeltingVariant(
        ["4x #forge:dusts/steel", "4x #forge:ingots/steel"],
        ["#forge:dusts/boron"],
        "5x nuclearcraft:ferroboron", 15, GTValues.VA[GTValues.MV], true);

    alloySmeltingVariant(
        ["#forge:ingots/ferroboron"],
        ["#forge:dusts/lithium"],
        "2x nuclearcraft:tough_alloy", 15, GTValues.VHA[GTValues.LV], false);

    alloySmeltingVariant(
        ["#forge:dusts/diamond", "#forge:gems/diamond"],
        ["3x #forge:dusts/steel", "3x #forge:ingots/steel"],
        "nuclearcraft:hard_carbon", 15, GTValues.VA[GTValues.HV], true);

    event.recipes.gtceu.alloy_smelter("kubejs:fission_reactor_glass")
        .itemInputs("nuclearcraft:fission_reactor_casing", "#forge:glass/colorless")
        .itemOutputs("nuclearcraft:fission_reactor_glass")
        .duration(50)
        .EUt(GTValues.VHA[GTValues.LV])

    event.remove({ output: "minecraft:netherite_ingot" })
    event.recipes.gtceu.alloy_smelter("kubejs:netherite_ingot")
        .itemInputs("4x #forge:ingots/gold", "4x minecraft:netherite_scrap") // was flipped
        .itemOutputs("1x minecraft:netherite_ingot")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])
})

// Change base GT alloy recipes
ServerEvents.recipes(event => {
    // Different Black Steel Recipe. ABS has both regular & advanced recipe, each with a noble gas version.
    const cokeOptions = [
        "coke_gem",
        "coke_dust"
    ]

    event.remove({ id: "gtceu:centrifuge/decomposition_centrifuging__black_steel" })
    event.remove({ id: "gtceu:mixer/black_steel" })

    cokeOptions.forEach(cokeVariant => {
        event.recipes.gtceu.mixer("kubejs:black_steel_dust_" + cokeVariant)
            .itemInputs("3x #forge:dusts/steel", "2x #forge:dusts/black_bronze", "2x gtceu:void_gem", "2x gtceu:" + cokeVariant)
            .itemOutputs("9x gtceu:black_steel_dust")
            .duration(200)
            .EUt(GTValues.VA[GTValues.LV])
    })

    event.remove({ id: "gtceu:alloy_blast_smelter/black_steel" })
    event.remove({ id: "gtceu:alloy_blast_smelter/black_steel_gas" })

    cokeOptions.forEach(cokeVariant => {
        event.recipes.gtceu.alloy_blast_smelter("kubejs:black_steel_" + cokeVariant)
            .itemInputs("3x #forge:dusts/steel", "2x #forge:dusts/black_bronze", "2x gtceu:void_gem", "2x gtceu:" + cokeVariant)
            .circuit(3)
            .outputFluids(Fluid.of("gtceu:molten_black_steel", 1296))
            .duration(112.5 * 20 * 9 * 0.75 + 12.5) // 760s
            .EUt(GTValues.VA[GTValues.MV])
            .blastFurnaceTemp(1200)
        event.recipes.gtceu.alloy_blast_smelter("kubejs:black_steel_gas_" + cokeVariant)
            .itemInputs("3x #forge:dusts/steel", "2x #forge:dusts/black_bronze", "2x gtceu:void_gem", "2x gtceu:" + cokeVariant)
            .inputFluids(Fluid.of("gtceu:nitrogen", 9000))
            .circuit(13)
            .outputFluids(Fluid.of("gtceu:molten_black_steel", 1296))
            .duration((112.5 * 20 * 9 * 0.75 + 12.5) * 0.67) // 509.2s
            .EUt(GTValues.VA[GTValues.MV])
            .blastFurnaceTemp(1200)
        event.recipes.gtceu.alloy_blast_smelter("kubejs:black_steel_alternate_" + cokeVariant)
            .itemInputs("15x #forge:dusts/steel", "6x #forge:dusts/copper", "2x #forge:dusts/gold", "2x #forge:dusts/silver", "10x #forge:gems/void", "10x gtceu:" + cokeVariant)
            .circuit(4)
            .outputFluids(Fluid.of("gtceu:molten_black_steel", 6480))
            .duration(112.5 * 20 * 45 * 0.75 + 12.5 * 5) // 3800s
            .EUt(GTValues.VHA[GTValues.HV])
            .blastFurnaceTemp(1200)
        event.recipes.gtceu.alloy_blast_smelter("kubejs:black_steel_alternate_gas_" + cokeVariant)
            .itemInputs("15x #forge:dusts/steel", "6x #forge:dusts/copper", "2x #forge:dusts/gold", "2x #forge:dusts/silver", "10x #forge:gems/void", "10x gtceu:" + cokeVariant)
            .inputFluids(Fluid.of("gtceu:nitrogen", 9000))
            .circuit(14)
            .outputFluids(Fluid.of("gtceu:molten_black_steel", 6480))
            .duration((112.5 * 20 * 45 * 0.75 + 12.5 * 5) * 0.67) // 2546s
            .EUt(GTValues.VHA[GTValues.HV])
            .blastFurnaceTemp(1200)
    })

    // Replace default GTCEu glowstone separation recipe to match composition
    event.recipes.gtceu.mixer("kubejs:glowstone_dust")
        .itemInputs("gtceu:tricalcium_phosphate_dust", "#forge:dusts/gold", "#forge:dusts/barite")
        .itemOutputs("3x minecraft:glowstone_dust")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])
    event.recipes.gtceu.centrifuge("glowstone_separation")
        .itemInputs("5x minecraft:glowstone_dust")
        .itemOutputs("gtceu:tricalcium_phosphate_dust", "gtceu:gold_dust", "gtceu:barite_dust")
        .duration(976)  // Copied from the default Glowstone Separation recipe
        .EUt(80)        // Copied from the default Glowstone Separation recipe

    // Synthesis recipe for Barite since it's used for synthetic Glowstone
    event.recipes.gtceu.chemical_reactor("barite_from_barium")
        .itemInputs("gtceu:barium_dust")
        .inputFluids("gtceu:sulfuric_acid 1000")
        .itemOutputs("6x gtceu:barite_dust")
        .outputFluids("gtceu:hydrogen 2000")
        .duration(100)
        .EUt(GTValues.VA[GTValues.ULV])

    // Remove old rhodium plated palladium recipe
    event.remove({ id: "gtceu:mixer/rhodium_plated_palladium" })
    event.recipes.gtceu.mixer("kubejs:rhodium_plated_palladium_dust")
        .itemInputs("3x gtceu:palladium_dust", "gtceu:rhodium_dust", "2x gtceu:lumium_dust")
        .itemOutputs("6x gtceu:rhodium_plated_palladium_dust")
        .duration(400)
        .EUt(GTValues.VA[GTValues.IV])
        .circuit(1)
})

// EnderIO alloys
ServerEvents.recipes(event => {
    // Energetic Alloy
    event.recipes.gtceu.mixer("kubejs:energetic_alloy_dust")
        .itemInputs("2x #forge:dusts/gold", "#forge:dusts/redstone", "#forge:dusts/glowstone")
        .itemOutputs("4x gtceu:energetic_alloy_dust")
        .duration(140)
        .EUt(GTValues.VA[GTValues.LV])

    // Vibrant Alloy
    event.recipes.gtceu.mixer("kubejs:vibrant_alloy_dust")
        .itemInputs("#forge:dusts/energetic_alloy", "#forge:dusts/ender_pearl")
        .itemOutputs("2x gtceu:vibrant_alloy_dust")
        .duration(260)
        .EUt(GTValues.VA[GTValues.LV])

    // End Steel
    event.recipes.gtceu.mixer("kubejs:end_steel_dust")
        .itemInputs("gtceu:dark_steel_dust", "gtceu:vibrant_alloy_dust", "#forge:dusts/endstone")
        .itemOutputs("3x gtceu:end_steel_dust")
        .duration(260)
        .EUt(GTValues.VA[GTValues.MV])
})

// Thermal alloys
ServerEvents.recipes(event => {
    event.recipes.gtceu.mixer("kubejs:mythril")
        .itemInputs("#forge:dusts/titanium")
        .inputFluids(Fluid.of("gtceu:mana", 1000))
        .itemOutputs("2x gtceu:mythril_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.mixer("kubejs:lumium_dust")
        .itemInputs("4x #forge:dusts/tin_alloy", "2x #forge:dusts/sterling_silver", "2x extendedcrafting:luminessence", "kubejs:energized_clathrate")
        .itemOutputs("7x gtceu:lumium_dust")
        .inputFluids(Fluid.of("gtceu:mana", 1000))
        .duration(300)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.mixer("kubejs:signalum_dust")
        .itemInputs("4x #forge:dusts/annealed_copper", "2x #forge:dusts/red_steel", "2x #forge:dusts/red_alloy", "kubejs:destabilized_clathrate")
        .itemOutputs("9x gtceu:signalum_dust")
        .inputFluids(Fluid.of("gtceu:mana", 1000))
        .duration(300)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.mixer("kubejs:enderium_dust")
        .itemInputs("4x gtceu:lead_dust", "2x gtceu:platinum_dust", "gtceu:blue_steel_dust", "gtceu:osmium_dust", "gtceu:tantalum_dust", "kubejs:resonant_clathrate")
        .itemOutputs("10x gtceu:enderium_dust")
        .inputFluids(Fluid.of("gtceu:mana", 1000))
        .duration(300)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.mixer("kubejs:manyullyn_dust")
        .itemInputs("4x gtceu:ardite_dust", "4x gtceu:cobalt_dust")
        .itemOutputs("9x gtceu:manyullyn_dust")
        .inputFluids(Fluid.of("gtceu:mana", 1000))
        .duration(400)
        .EUt(GTValues.VA[GTValues.LV])
})

ServerEvents.recipes(event => {
    // Dark Soularium recipe (Requires Tritium!)
    event.recipes.gtceu.electric_blast_furnace("kubejs:dark_soularium_ingot")
        .itemInputs("#forge:ingots/soularium", "#forge:ingots/dark_steel")
        .inputFluids(Fluid.of("gtceu:tritium", 1000))
        .itemOutputs("gtceu:dark_soularium_ingot")
        .duration(1200) // 60 sec
        .EUt(32000)
        .blastFurnaceTemp(8600)

    // Thermal Expansion ABS recipe fixes
    /**
     * @param {RegExp | string} recipeMatcherID
     * @param {import("../../dx/typings/GTJSONRecipe.mjs").GTJSONRecipeItemIngredient[]} ingredients
     */
    function addInputItems(recipeMatcherID, ingredients) {
        /** @type {import("../../dx/typings/GTJSONRecipe.mjs").GTJSONRecipe["inputs"]["item"]} */
        let itemEntries = ingredients.map(ingredient => ({
            chance: 10000,
            maxChance: 10000,
            tierChanceBoost: 0,
            content: {
                type: "gtceu:sized",
                count: ingredient.count,
                ingredient: ingredient
            }
        }))
        itemEntries = JSON.parse(JSON.stringify(itemEntries))
        event.forEachRecipe({ id: recipeMatcherID }, recipe => {
            recipe.json.getAsJsonObject("inputs").getAsJsonArray("item").addAll(itemEntries)
        })
    }

    addInputItems(/^gtceu:alloy_blast_smelter\/signalum/, [{item: "kubejs:destabilized_clathrate", count: 1}])
    addInputItems(/^gtceu:alloy_blast_smelter\/lumium/, [{item: "extendedcrafting:luminessence", count: 2}, {item: "kubejs:energized_clathrate", count: 1}])
    addInputItems(/^gtceu:alloy_blast_smelter\/enderium/, [{item: "kubejs:resonant_clathrate", count: 1}])
})
