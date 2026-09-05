/**
 * Netherite processing line
 */

ServerEvents.recipes(event => {
    // We only use GT ores for the oreproc page and autogenned intermediates, not for the in-stone ore
    event.remove({ not: [{ input: "minecraft:ancient_debris" }, { input: "#forge:ores/netherite_scrap" }], output: "gtceu:crushed_netherite_scrap_ore" })
    event.remove([{ type: "minecraft:smelting", output: "minecraft:netherite_scrap", id: /gtceu:smelting\/.*netherite_scrap_ore.*/ }, { type: "minecraft:blasting", output: "minecraft:netherite_scrap", id: /gtceu:blasting\/.*netherite_scrap_ore.*/ }])
    event.remove({ id: "gtceu:alloy_smelt_netherite_scrap_to_nugget" })

    // Ancient Debris Processing
    event.recipes.gtceu.macerator("macerate_ancient_debris_to_crushed_ore")
        .itemInputs("minecraft:ancient_debris")
        .itemOutputs("2x gtceu:crushed_netherite_scrap_ore")
        .chancedOutput("gtceu:obsidian_dust", 1400, 850)
        .chancedOutput("gtceu:netherrack_dust", 1200, 800)
        .duration(400)
        .EUt(2)
        .category("gtceu:ore_crushing")

    event.recipes.gtceu.chemical_bath("ancient_debris_ardite_path")
        .itemInputs("gtceu:netherite_scrap_dust")
        .inputFluids("kubejs:molten_petrotheum")
        .itemOutputs("kubejs:dusty_netherite_cluster", "gtceu:ardite_sand_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.autoclave("dusty_netherite_cluster")
        .itemInputs("kubejs:dusty_netherite_cluster")
        .inputFluids("kubejs:molten_aerotheum")
        .itemOutputs("kubejs:netherite_cluster", "kubejs:ardite_sponge")
        .duration(200)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.electric_blast_furnace("ancient_debris_netherite_path")
        .itemInputs("gtceu:netherite_scrap_dust")
        .inputFluids("kubejs:molten_pyrotheum")
        .itemOutputs("kubejs:netherite_cluster")
        .outputFluids("gtceu:impure_molten_ardite")
        .duration(2000)
        .EUt(GTValues.VA[GTValues.EV])
        .blastFurnaceTemp(7000)

    event.recipes.gtceu.chemical_reactor("impure_molten_ardite")
        .inputFluids("gtceu:impure_molten_ardite", "kubejs:molten_cryotheum")
        .itemOutputs("gtceu:ardite_sand_dust", "kubejs:netherite_shards")
        .duration(600)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.mixer("ardite_slurry")
        .itemInputs("gtceu:ardite_sand_dust")
        .inputFluids("gtceu:nitric_acid")
        .outputFluids("gtceu:ardite_slurry")
        .duration(400)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.compressor("netherite_cluster")
        .itemInputs("2x kubejs:netherite_shards")
        .itemOutputs("kubejs:netherite_cluster")
        .duration(600)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.macerator("ardite_sand")
        .itemInputs("2x kubejs:ardite_sponge")
        .itemOutputs("gtceu:ardite_sand_dust")
        .duration(600)
        .EUt(GTValues.VA[GTValues.LV])

    // Ardite Line
    event.recipes.gtceu.centrifuge("ardite_slurry")
        .inputFluids("gtceu:ardite_slurry 2000")
        .itemOutputs("gtceu:ardite_salt_dust")
        .chancedOutput("gtceu:rarest_metal_mixture_dust", 2500, 0)
        .duration(800)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.chemical_reactor("ardite_dust")
        .itemInputs("gtceu:potassium_dichromate_dust", "gtceu:ardite_salt_dust")
        .inputFluids("kubejs:molten_aerotheum")
        .itemOutputs("gtceu:ardite_dust")
        .duration(300)
        .EUt(GTValues.VA[GTValues.EV])

    // Activated Nethline Line
    event.recipes.gtceu.chemical_bath("reactive_netherite_cluster")
        .itemInputs("kubejs:netherite_cluster")
        .inputFluids("gtceu:californium 18")
        .itemOutputs("kubejs:reactive_netherite_cluster")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LuV])

    event.recipes.gtceu.mixer("nether_conduit_dust")
        .itemInputs("3x kubejs:pyrotheum_dust", "4x gtceu:netherrack_dust", "2x enderio:withering_powder")
        .itemOutputs("9x gtceu:nether_conduit_dust")
        .duration(200)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.forming_press("inert_nether_compound_ingot")
        .itemInputs("gtceu:hot_ardite_ingot", "3x gtceu:nether_conduit_dust", "4x kubejs:primal_mana", "4x kubejs:reactive_netherite_cluster", "4x minecraft:gold_ingot", "16x gtceu:activated_carbon_dust")
        .itemOutputs("kubejs:inert_nether_compound_ingot")
        .duration(300)
        .EUt(GTValues.VA[GTValues.UV])
})

ServerEvents.tags("item", event => {
    const oresToRemove = event.get("forge:ores/netherite_scrap").getObjectIds();
    if(!oresToRemove.add("gtceu:raw_netherite_scrap")) console.error("Could not add Raw Netherite Scrap from list of Netherite Scrap ores to nuke")

    event.removeAllTagsFrom(oresToRemove.filter((value) => {
        return ResourceLocation.of("minecraft:ancient_debris", ":").compareTo(value) != 0
    }))
})

ServerEvents.recipes(event => {
    /**
     * Helper method for programmatically generating Smithing recipes for Activated Netherite.
     * @param {String} material Material to generate a list of IDs and material quantities for
     * @returns an array of entries which consist of [Ingredient ID, count, material count]
     */
    let tagPrefixes = (material, namespace) => {return [
        `${namespace}:${material}_plate`,
        `${namespace}:double_${material}_plate`,
        `${namespace}:${material}_rotor`,
        `${namespace}:${material}_ingot`,
        `${namespace}:${material}_rod`,
        `${namespace}:${material}_block`,
        `${namespace}:${material}_frame`,
        `${namespace}:${material}_tiny_fluid_pipe`,
        `${namespace}:${material}_small_fluid_pipe`,
        `${namespace}:${material}_normal_fluid_pipe`,
        `${namespace}:${material}_large_fluid_pipe`,
        `${namespace}:${material}_huge_fluid_pipe`,
        `${namespace}:${material}_quadruple_fluid_pipe`,
        `${namespace}:${material}_nonuple_fluid_pipe`,
    ]}

    let crystal_matrix_forms = tagPrefixes("crystal_matrix", "monilabs")
    let activated_netherite_forms = tagPrefixes("activated_netherite", "gtceu");
    activated_netherite_forms.forEach((entry, index) => {
        event.smithing(
            entry,
            "minecraft:netherite_upgrade_smithing_template",
            crystal_matrix_forms[index],
            "kubejs:inert_nether_compound_ingot"
        )
    })
})
