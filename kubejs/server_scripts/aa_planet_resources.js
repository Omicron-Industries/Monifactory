/**
 * Maceration recipes for Ad Astra planetary rock dusts
 * Makes planetary rock dusts drop from ores
 * Centrifuge recipes for converting planetary rock dusts into valuable resources
 * Maceration recipes for converting other blocks found on planets to resources
 */

ServerEvents.recipes(event => {
    // Regolith dusts
    let regolithDustResources = [
        ["moon", ["moon_sand"], "diamond"],
        ["mars", ["mars_sand"], "olivine"],
        ["venus", ["venus_sandstone", "venus_sandstone_bricks", "cracked_venus_sandstone_bricks", "venus_sand"], "titanite"],
        ["mercury", [], "cinnabar"],
        ["glacio", [], "sodalite"]
    ]

    regolithDustResources.forEach((planetResources, fluxCount) => {
        let stone_variants = [
            `${planetResources[0]}_stone`,
            `${planetResources[0]}_cobblestone`,
            `${planetResources[0]}_stone_bricks`,
            `cracked_${planetResources[0]}_stone_bricks`,
            `chiseled_${planetResources[0]}_stone_bricks`,
            `polished_${planetResources[0]}_stone`,
            `${planetResources[0]}_pillar`,
            `${planetResources[0]}_stone_brick_wall`
        ]

        // Planetary dust maceration recipe: stone variants
        stone_variants.forEach(variant => {
            event.recipes.gtceu.macerator(`macerate_${variant}`)
                .itemInputs(`ad_astra:${variant}`)
                .itemOutputs(`kubejs:${planetResources[0]}_dust`)
                .duration(200)
                .EUt(GTValues.VHA[GTValues.HV])
        })

        // Planetary dust maceration recipe: others
        planetResources[1].forEach(variant => {
            event.recipes.gtceu.macerator(`macerate_${variant}`)
                .itemInputs(`ad_astra:${variant}`)
                .itemOutputs(`kubejs:${planetResources[0]}_dust`)
                .duration(200)
                .EUt(GTValues.VHA[GTValues.HV])
        })

        // Recipes to make quantum flux from planets' rock dusts
        event.shaped(`${fluxCount + 1}x kubejs:quantum_flux`, [
            " B ",
            "BAB",
            " B "
        ], {
            A: `#forge:gems/${planetResources[2]}`,
            B: `kubejs:${planetResources[0]}_dust`
        }).id(`kubejs:quantum_flux_from_${planetResources[0]}_dust`)

        event.recipes.gtceu.mixer(`quantum_flux_from_${planetResources[0]}_dust`)
            .itemInputs(`4x kubejs:${planetResources[0]}_dust`, `#forge:gems/${planetResources[2]}`)
            .itemOutputs(`${fluxCount + 1}x kubejs:quantum_flux`)
            .duration(100)
            .EUt(GTValues.VA[GTValues.HV])
    })

    // Rock dust centrifuging
    event.recipes.gtceu.centrifuge("moon_dust_centrifuging")
        .itemInputs("kubejs:moon_dust")
        .chancedOutput("gtceu:glass_dust", 2500, 0)
        .chancedOutput("gtceu:quicklime_dust", 2300, 0)
        .chancedOutput("gtceu:ilmenite_dust", 2000, 0)
        .chancedOutput("gtceu:anorthite_dust", 1400, 0)
        .chancedOutput("gtceu:magnesia_dust", 1200, 0)
        .chancedOutput("gtceu:extraterrestrial_metal_mixture_dust", 1000, 0)
        .outputFluids(Fluid.of("gtceu:deuterium", 100))
        .duration(200)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.centrifuge("mars_dust_centrifuging")
        .itemInputs("kubejs:mars_dust")
        .chancedOutput("minecraft:sand", 4000, 0)
        .chancedOutput("gtceu:hematite_dust", 2300, 0)
        .chancedOutput("gtceu:calcium_perchlorate_dust", 2000, 0)
        .chancedOutput("gtceu:basaltic_mineral_sand_dust", 900, 90)
        .chancedOutput("gtceu:zincite_dust", 700, 0)
        .chancedOutput("gtceu:extraterrestrial_metal_mixture_dust", 1000, 0)
        .duration(200)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.centrifuge("venus_dust_centrifuging")
        .itemInputs("kubejs:venus_dust")
        .chancedOutput("gtceu:quartz_sand_dust", 3000, 0)
        .chancedOutput("gtceu:chalcopyrite_dust", 2600, 260)
        .chancedOutput("gtceu:calcium_carbonate_dust", 1800, 0)
        .chancedOutput("gtceu:apatite_dust", 1600, 0)
        .chancedOutput("gtceu:carbon_dust", 1300, 0)
        .chancedOutput("gtceu:extraterrestrial_metal_mixture_dust", 1200, 0)
        .outputFluids(Fluid.of("gtceu:sulfur_dioxide", 100))
        .duration(200)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.centrifuge("mercury_dust_centrifuging")
        .itemInputs("kubejs:mercury_dust")
        .chancedOutput("gtceu:stone_dust", 2900, 0)
        .chancedOutput("gtceu:basaltic_mineral_sand_dust", 2700, 0)
        .chancedOutput("gtceu:garnet_sand_dust", 2000, 0)
        .chancedOutput("gtceu:fullers_earth_dust", 1650, 0)
        .chancedOutput("minecraft:redstone", 1400, 0)
        .chancedOutput("gtceu:extraterrestrial_metal_mixture_dust", 1200, 0)
        .duration(200)
        .EUt(GTValues.VA[GTValues.EV])

    event.recipes.gtceu.centrifuge("glacio_dust_centrifuging")
        .itemInputs("kubejs:glacio_dust")
        .chancedOutput("gtceu:granitic_mineral_sand_dust", 4500, 0)
        .chancedOutput("gtceu:kyanite_dust", 3750, 0)
        .chancedOutput("gtceu:alunite_dust", 2500, 0)
        .chancedOutput("gtceu:oilsands_dust", 2250, 0)
        .chancedOutput("gtceu:bastnasite_dust", 1700, 0)
        .chancedOutput("gtceu:extraterrestrial_metal_mixture_dust", 1500, 0)
        .duration(200)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.centrifuge("extraterrestrial_metal_mixture_centrifuging")
        .itemInputs("gtceu:extraterrestrial_metal_mixture_dust")
        .chancedOutput("gtceu:ilmenite_dust", 6000, 0)
        .chancedOutput("gtceu:chromite_dust", 4000, 0)
        .chancedOutput("gtceu:pyrolusite_dust", 3500, 0)
        .chancedOutput("gtceu:wulfenite_dust", 2500, 0)
        .chancedOutput("gtceu:tungstate_dust", 2200, 0)
        .duration(1000)
        .EUt(GTValues.VA[GTValues.IV])

    // Maceration recycling for other extraterrestrial materials
    event.recipes.gtceu.macerator("macerate_conglomerate")
        .itemInputs("ad_astra:conglomerate")
        .chancedOutput("gtceu:mirabilite_dust", 2500, 0)
        .chancedOutput("gtceu:redrock_dust", 2500, 0)
        .chancedOutput("gtceu:biotite_dust", 2500, 0)
        .chancedOutput("gtceu:gypsum_dust", 2500, 0)
        .duration(200)
        .EUt(GTValues.VHA[GTValues.MV])

    event.recipes.gtceu.macerator("macerate_infernal_spire")
        .itemInputs("ad_astra:infernal_spire_block")
        .chancedOutput("minecraft:blaze_powder", 5000, 0)
        .chancedOutput("gtceu:bauxite_dust", 2800, 0)
        .chancedOutput("gtceu:scheelite_dust", 2000, 0)
        .chancedOutput("gtceu:sulfur_dust", 800, 0)
        .duration(200)
        .EUt(GTValues.VHA[GTValues.IV])

    event.recipes.gtceu.macerator("macerate_permafrost")
        .itemInputs("2x ad_astra:permafrost")
        .itemOutputs("minecraft:dirt", "gtceu:ice_dust")
        .duration(200)
        .EUt(GTValues.VHA[GTValues.ULV])

    // Dilithium
    event.recipes.gtceu.autoclave("dilithium_helium")
        .itemInputs("4x gtceu:dilithium_dust")
        .inputFluids("gtceu:helium 1000")
        .itemOutputs("4x gtceu:dilithium_gem")
        .duration(400)
        .EUt(110)

    // Hydrofluoric Acid from Fluorite
    event.recipes.gtceu.chemical_reactor("hydrofluoric_acid_from_fluorite")
        .itemInputs("3x gtceu:fluorite_dust")
        .inputFluids("gtceu:sulfuric_acid 1000", "minecraft:water 2000")
        .itemOutputs("8x gtceu:gypsum_dust")
        .outputFluids("gtceu:hydrofluoric_acid 2000")
        .duration(10 * 20)
        .EUt(GTValues.VHA[GTValues.LV])

    // Ad Astra boosted ores

    // Arsenopyrite metallurgy like Cobaltite
    event.recipes.gtceu.electric_blast_furnace("arsenopyrite_metallurgy")
        .itemInputs("gtceu:arsenopyrite_dust")
        .inputFluids("gtceu:oxygen 3000")
        .itemOutputs("gtceu:hematite_dust", "gtceu:arsenic_trioxide_dust")
        .outputFluids("gtceu:sulfur_dioxide 1000")
        .duration(100)
        .EUt(GTValues.VA[GTValues.MV])
        .blastFurnaceTemp(1200)

    // Argentite analogs to Sphalerite and Galena for Indium
    event.recipes.gtceu.mixer("indium_concentrate_sphalerite_argentite")
        .itemInputs("gtceu:purified_sphalerite_ore", "gtceu:purified_argentite_ore")
        .inputFluids("gtceu:sulfuric_acid 4000")
        .outputFluids("gtceu:indium_concentrate 1000")
        .duration(60)
        .EUt(150)

    event.recipes.gtceu.mixer("indium_concentrate_galena_argentite")
        .itemInputs("gtceu:purified_galena_ore", "gtceu:purified_argentite_ore")
        .inputFluids("gtceu:sulfuric_acid 4000")
        .outputFluids("gtceu:indium_concentrate 1000")
        .duration(60)
        .EUt(150)

    // Rutile from Titanite
    event.recipes.gtceu.electric_blast_furnace("rutile_from_titanite")
        .itemInputs("8x gtceu:titanite_dust", "1x gtceu:carbon_dust")
        .itemOutputs("1x gtceu:silicon_ingot", "3x gtceu:rutile_dust", "5x gtceu:calcite_dust")
        .duration(35 * 20)
        .EUt(GTValues.VA[GTValues.HV])
        .blastFurnaceTemp(1700)

    // Replace recipes that use liquid Iron II chloride with the new dust form
    event.recipes.gtceu.chemical_reactor("iron_2_chloride")
        .inputFluids("gtceu:iron_iii_chloride 2000", "gtceu:chlorobenzene 1000")
        .itemOutputs("2x gtceu:iron_ii_chloride_dust")
        .outputFluids("gtceu:hydrochloric_acid 1000", "gtceu:dichlorobenzene 1000")
        .duration(400)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.large_chemical_reactor("calcium_ferrocyanide")
        .inputFluids("gtceu:hydrogen_cyanide 6000", "minecraft:water 7000")
        .itemInputs("gtceu:iron_ii_chloride_dust", "10x gtceu:calcium_hydroxide_dust")
        .itemOutputs("15x gtceu:calcium_ferrocyanide_dust")
        .outputFluids("gtceu:hydrochloric_acid 2000")
        .duration(300)
        .EUt(GTValues.VA[GTValues.HV])

    // Add Tungstic Acid processing to Wolframite and Stolzite
    event.recipes.gtceu.chemical_bath("tungstic_acid_from_wolframite")
        .itemInputs("6x gtceu:wolframite_dust")
        .inputFluids("gtceu:hydrochloric_acid 2000")
        .itemOutputs("7x gtceu:tungstic_acid_dust")
        .chancedOutput("3x gtceu:iron_ii_chloride_dust", 5000, 0)
        .chancedOutput("3x gtceu:manganese_ii_chloride_dust", 5000, 0)
        .chancedItemOutputLogic(ChanceLogic.XOR)
        .duration(210)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.chemical_bath("tungstic_acid_from_stolzite")
        .itemInputs("6x gtceu:stolzite_dust")
        .inputFluids("gtceu:hydrochloric_acid 2000")
        .itemOutputs("7x gtceu:tungstic_acid_dust", "3x gtceu:lead_chloride_dust")
        .duration(210)
        .EUt(GTValues.VHA[GTValues.EV])

    // Metallurgy to refine Azurite and Carnotite
    event.recipes.gtceu.electric_blast_furnace("azurite_metallurgy")
        .itemInputs("15x gtceu:azurite_dust", "3x gtceu:calcium_dust")
        .itemOutputs("3x minecraft:copper_ingot", "10x gtceu:calcite_dust", "2x gtceu:quicklime_dust")
        .outputFluids("gtceu:steam 28800")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.MV])
        .blastFurnaceTemp(1100)

    if (doHarderProcessing) {
        event.recipes.gtceu.large_chemical_reactor("carnotite_metallurgy_hard")
            .itemInputs("27x gtceu:carnotite_dust")
            .inputFluids("gtceu:sulfur_dioxide 3000", "gtceu:sulfur_trioxide 3000")
            .itemOutputs("2x gtceu:potassium_dust", "6x gtceu:uraninite_dust", "7x gtceu:vanadium_pentoxide_dust")
            .outputFluids("gtceu:diluted_sulfuric_acid 9000")
            .duration(100)
            .EUt(GTValues.VHA[GTValues.MV])
            .blastFurnaceTemp(1100)
    } else {
        event.recipes.gtceu.large_chemical_reactor("carnotite_metallurgy_normal")
            .itemInputs("27x gtceu:carnotite_dust")
            .inputFluids("gtceu:sulfur_dioxide 3000", "gtceu:sulfur_trioxide 3000")
            .itemOutputs("2x gtceu:potassium_dust", "6x gtceu:uraninite_dust", "2x gtceu:vanadium_dust")
            .outputFluids("gtceu:diluted_sulfuric_acid 9000", "gtceu:oxygen 5000")
            .duration(100)
            .EUt(GTValues.VHA[GTValues.MV])
            .blastFurnaceTemp(1100)
    }
})

ServerEvents.tags("item", event => {
    event.add("forge:lenses/brown", "gtceu:stolzite_lens")
})

// Add regolith dusts to ores' loot pool
LootJS.modifiers((event) => {
    const moonDust = LootEntry.of("kubejs:moon_dust").when(c => c.randomChance(0.50))
    const moonDustFortune = LootEntry.of("kubejs:moon_dust")
        .limitCount(0, 2)
        .when(c => c.randomTableBonus("minecraft:fortune", [0, 0.60, 1.2, 2.0]))
        .applyOreBonus("minecraft:fortune")

    const marsDust = LootEntry.of("kubejs:mars_dust").when(c => c.randomChance(0.50))
    const marsDustFortune = LootEntry.of("kubejs:mars_dust")
        .limitCount(0, 2)
        .when(c => c.randomTableBonus("minecraft:fortune", [0, 0.60, 1.2, 2.0]))
        .applyOreBonus("minecraft:fortune")

    const venusDust = LootEntry.of("kubejs:venus_dust").when(c => c.randomChance(0.50))
    const venusDustFortune = LootEntry.of("kubejs:venus_dust")
        .limitCount(0, 2)
        .when(c => c.randomTableBonus("minecraft:fortune", [0, 0.60, 1.2, 2.0]))
        .applyOreBonus("minecraft:fortune")

    const mercuryDust = LootEntry.of("kubejs:mercury_dust").when(c => c.randomChance(0.50))
    const mercuryDustFortune = LootEntry.of("kubejs:mercury_dust")
        .limitCount(0, 2)
        .when(c => c.randomTableBonus("minecraft:fortune", [0, 0.60, 1.2, 2.0]))
        .applyOreBonus("minecraft:fortune")

    const glacioDust = LootEntry.of("kubejs:glacio_dust").when(c => c.randomChance(0.50))
    const glacioDustFortune = LootEntry.of("kubejs:glacio_dust")
        .limitCount(0, 2)
        .when(c => c.randomTableBonus("minecraft:fortune", [0, 0.60, 1.2, 2.0]))
        .applyOreBonus("minecraft:fortune")

    event.addBlockLootModifier(/.*moon_.*_ore$/).addSequenceLoot(moonDust, moonDustFortune);
    event.addBlockLootModifier(/.*mars_.*_ore$/).addSequenceLoot(marsDust, marsDustFortune);
    event.addBlockLootModifier(/.*venus_.*_ore$/).addSequenceLoot(venusDust, venusDustFortune);
    event.addBlockLootModifier(/.*mercury_.*_ore$/).addSequenceLoot(mercuryDust, mercuryDustFortune);
    event.addBlockLootModifier(/.*glacio_.*_ore$/).addSequenceLoot(glacioDust, glacioDustFortune);
});
