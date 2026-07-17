/**
 * Greenhouse multiblock
 */

ServerEvents.recipes(event => {

    /*   Machine Recipe  */

    event.recipes.gtceu.shaped("gtceu:greenhouse", [
        "LWL",
        "ASA",
        "WRW"
    ], {
        L: "minecraft:redstone_lamp",
        A: "#gtceu:circuits/mv",
        W: "gtceu:copper_single_cable",
        S: "gtceu:solid_machine_casing",
        R: "gtceu:lv_fluid_regulator"
    }).id("kubejs:shaped/greenhouse")
        .addMaterialInfo()


    /*  Greenhouse Recipes  */

    function boost(input, factor) {
        let boosted = [];
        input.forEach(element => {
            let item = Item.of(element);
            let curCount = item.getCount() * factor;
            let type = item.getId();
            while (curCount > item.maxStackSize) {
                boosted.push(Item.of(type, item.maxStackSize));
                curCount -= item.maxStackSize;
            }
            if (curCount > 0) boosted.push(Item.of(type, curCount));
        })
        return boosted;
    }

    /**
     * @param {string} mod Input item mod name
     * @param {string} input Input item identifier
     * @param {number} duration Recipe duration
     * @param {string[]} output Base recipe output
     * @param {number} waterMod Multiplier for water consumption
     * @param {number} inputFeedbackAmount How many input items to add to output
     */
    function Greenhouse(mod, input, duration, output, waterMod, inputFeedbackAmount) {
        // Create new boosted output item array
        let boostedOutputs = boost(output, 2)

        // Push sapling/seed inputs (unboosted) onto output arrays
        if (inputFeedbackAmount > 0) {
            output.push(Item.of(`${mod}:${input}`, inputFeedbackAmount));
            boostedOutputs.push(Item.of(`${mod}:${input}`, inputFeedbackAmount));
        }

        event.recipes.gtceu.greenhouse(`kubejs:${input}`)
            .circuit(1)
            .notConsumable(InputItem.of(Item.of(`${mod}:${input}`)))
            .inputFluids(Fluid.of("minecraft:water", 1.5 * 8000 * waterMod))
            .itemOutputs(output)
            .duration(duration)
            .EUt(80)
        event.recipes.gtceu.greenhouse(`kubejs:${input}_boosted`)
            .circuit(2)
            .notConsumable(InputItem.of(Item.of(`${mod}:${input}`)))
            .itemInputs("1x gtceu:fertilizer")
            .inputFluids(Fluid.of("minecraft:water", 8000 * waterMod))
            .itemOutputs(boostedOutputs)
            .duration(duration / 2)
            .EUt(80)
        event.recipes.gtceu.greenhouse(`kubejs:${input}_phytogro`)
            .circuit(3)
            .notConsumable(InputItem.of(Item.of(`${mod}:${input}`)))
            .itemInputs("1x thermal:phytogro")
            .inputFluids(Fluid.of("minecraft:water", 4000 * waterMod))
            .itemOutputs(boostedOutputs)
            .duration(duration / 4)
            .EUt(80)
    }


    // //// Trees //////
    Greenhouse("gtceu", "rubber_sapling", 1280, ["32x gtceu:rubber_log", "8x gtceu:sticky_resin"], 2, 4)
    Greenhouse("minecraft", "oak_sapling", 1280, ["64x minecraft:oak_log", "4x minecraft:apple"], 2, 4)
    Greenhouse("minecraft", "dark_oak_sapling", 1280, ["64x minecraft:dark_oak_log", "4x minecraft:apple"], 2, 4)
    Greenhouse("minecraft", "spruce_sapling", 1280, ["64x minecraft:spruce_log"], 2, 4)
    Greenhouse("minecraft", "birch_sapling", 1280, ["64x minecraft:birch_log"], 2, 4)
    Greenhouse("minecraft", "acacia_sapling", 1280, ["64x minecraft:acacia_log"], 2, 4)
    Greenhouse("minecraft", "jungle_sapling", 1280, ["64x minecraft:jungle_log"], 2, 4)
    Greenhouse("minecraft", "azalea", 1280, ["64x minecraft:oak_log"], 2, 4)
    Greenhouse("minecraft", "flowering_azalea", 1280, ["64x minecraft:oak_log"], 2, 4)
    Greenhouse("minecraft", "cherry_sapling", 1280, ["64x minecraft:cherry_log"], 2, 4)
    Greenhouse("minecraft", "mangrove_propagule", 1280, ["64x minecraft:mangrove_log"], 2, 4)
    Greenhouse("minecraft", "chorus_flower", 1280, ["32x minecraft:chorus_fruit"], 2, 4)
    Greenhouse("minecraft", "warped_fungus", 1280, ["64x minecraft:warped_stem", "32x minecraft:warped_wart_block", "16x minecraft:shroomlight"], 2, 4)
    Greenhouse("minecraft", "crimson_fungus", 1280, ["64x minecraft:crimson_stem", "32x minecraft:nether_wart_block", "16x minecraft:shroomlight"], 2, 4)
    Greenhouse("thermal", "rubberwood_sapling", 1280, ["64x thermal:rubberwood_log"], 2, 4)

    // //// Crops //////
    Greenhouse("minecraft", "sugar_cane", 320, ["32x minecraft:sugar_cane"], 2, 0)
    Greenhouse("minecraft", "kelp", 640, ["32x minecraft:kelp"], 4, 0)
    Greenhouse("minecraft", "bamboo", 320, ["48x minecraft:bamboo"], 2, 0)
    Greenhouse("minecraft", "cactus", 640, ["32x minecraft:cactus"], 0.5, 0)
    Greenhouse("minecraft", "wheat_seeds", 640, ["32x minecraft:wheat"], 1, 0)
    Greenhouse("minecraft", "carrot", 640, ["32x minecraft:carrot"], 1, 0)
    Greenhouse("minecraft", "potato", 640, ["32x minecraft:potato"], 1, 0)
    Greenhouse("minecraft", "beetroot_seeds", 640, ["32x minecraft:beetroot"], 1, 0)
    Greenhouse("minecraft", "sweet_berries", 640, ["32x minecraft:sweet_berries"], 1, 0)
    Greenhouse("minecraft", "glow_berries", 640, ["32x minecraft:glow_berries"], 1, 0)
    Greenhouse("minecraft", "cocoa_beans", 640, ["32x minecraft:cocoa_beans"], 1, 0)
    Greenhouse("minecraft", "melon_seeds", 640, ["16x minecraft:melon"], 2, 0)
    Greenhouse("minecraft", "pumpkin_seeds", 640, ["16x minecraft:pumpkin"], 2, 0)
    Greenhouse("minecraft", "nether_wart", 640, ["16x minecraft:nether_wart"], 0.5, 0)
    Greenhouse("minecraft", "red_mushroom", 640, ["16x minecraft:red_mushroom"], 1, 0)
    Greenhouse("minecraft", "brown_mushroom", 640, ["16x minecraft:brown_mushroom"], 1, 0)
    Greenhouse("minecraft", "moss_block", 640, ["48x minecraft:moss_block"], 1, 0)


    // //// Flowers & Cosmetic Blocks //////
    let flowers = [
        "wither_rose",
        "cornflower",
        "sunflower",
        "peony",
        "red_tulip",
        "poppy",
        "rose_bush",
        "blue_orchid",
        "orange_tulip",
        "dandelion",
        "pink_tulip",
        "pink_petals",
        "allium",
        "lilac",
        "lily_of_the_valley",
        "oxeye_daisy",
        "azure_bluet",
        "white_tulip",
        "lily_pad",
        "weeping_vines",
        "twisting_vines",
        "vine",
        "glow_lichen",
        "tube_coral_fan",
        "brain_coral_fan",
        "bubble_coral_fan",
        "fire_coral_fan",
        "horn_coral_fan",
        "sea_pickle"
    ]
    flowers.forEach(flower => {
        Greenhouse("minecraft", flower, 320, [Item.of(flower, 16)], 1, 0);
    })

    // Torchflowers, Pitcher plants are grown from seeds
    Greenhouse("minecraft", "torchflower_seeds", 640, [Item.of("torchflower", 12), Item.of("torchflower_seeds", 6)], 1, 0);
    Greenhouse("minecraft", "pitcher_pod", 640, [Item.of("pitcher_plant", 12), Item.of("pitcher_pod", 6)], 1, 0);

    // A way to get grass blocks
    event.recipes.gtceu.greenhouse("kubejs:grass_block")
        .circuit(1)
        .notConsumable(InputItem.of(Item.of("minecraft:grass_block")))
        .itemInputs("64x dirt")
        .inputFluids(Fluid.of("minecraft:water", 24000))
        .itemOutputs("64x grass_block")
        .duration(640)
        .EUt(80)

    // Processing for Ender Spores and Glow Shrooms
    event.shapeless("kubejs:ender_spore", ["minecraft:chorus_flower", "minecraft:ender_pearl", "thermal:phytogro", "minecraft:experience_bottle"])
    event.smelting("minecraft:ender_pearl", "kubejs:ender_spore")

    event.shapeless("quark:glow_shroom", ["minecraft:brown_mushroom", "minecraft:glowstone_dust", "thermal:phytogro", "minecraft:experience_bottle"])
    event.shapeless("quark:glow_shroom", ["minecraft:red_mushroom", "minecraft:glowstone_dust", "thermal:phytogro", "minecraft:experience_bottle"])
    event.recipes.gtceu.macerator("macerate_glow_shroom")
        .itemInputs("3x quark:glow_shroom")
        .itemOutputs("1x minecraft:glowstone_dust")
        .chancedOutput("gtceu:plant_ball", 1000, 0)
        .duration(20 * 4)
        .EUt(0.25 * GTValues.V[GTValues.ULV])
    event.recipes.gtceu.macerator("macerate_glow_shroom_block")
        .itemInputs("quark:glow_shroom_block")
        .itemOutputs("1x minecraft:glowstone_dust")
        .chancedOutput("gtceu:plant_ball", 1000, 0)
        .duration(20 * 4)
        .EUt(0.25 * GTValues.V[GTValues.ULV])

    event.recipes.gtceu.greenhouse("kubejs:greenhouse_boosted_ender_spore")
        .circuit(3)
        .notConsumable("kubejs:ender_spore")
        .itemInputs("2x thermal:phytogro")
        .inputFluids(Fluid.of("minecraft:water", 8000))
        .itemOutputs("4x kubejs:ender_spore")
        .duration(640)
        .EUt(120)
    event.recipes.gtceu.greenhouse("kubejs:greenhouse_boosted_glow_shroom")
        .circuit(3)
        .notConsumable("quark:glow_shroom")
        .itemInputs("2x thermal:phytogro")
        .inputFluids(Fluid.of("minecraft:water", 8000))
        .itemOutputs("2x quark:glow_shroom", "18x quark:glow_shroom_block", "6x quark:glow_shroom_stem", "8x quark:glow_shroom_ring")
        .duration(640)
        .EUt(120)
})

ServerEvents.recipes(event => {
    // Phytogenic Insolator recipes
    event.custom({
        type: "thermal:insolator",
        "ingredient": {
            "item": "gtceu:rubber_sapling"
        },
        "result": [
            {
                "item": "gtceu:rubber_log",
                "chance": 6.0
            },
            {
                "item": "gtceu:sticky_resin",
                "chance": 1.25
            },
            {
                "item": "gtceu:rubber_sapling",
                "chance": 1.1
            }
        ],
        "energy_mod": 3.0,
        "water_mod": 3.0
    }).id("kubejs:thermal/insolator/rubber_sapling")

    event.custom({
        type: "thermal:insolator",
        "ingredient": {
            "item": "minecraft:pink_petals",
        },
        "result": [
            {
                "item": "minecraft:pink_petals",
                "chance": 2.0
            }
        ],
        "energy_mod": 1.0,
        "water_mod": 1.0
    }).id("kubejs:thermal/insolator/pink_petals")

    // Fix anomalous Plant Ball compressor recipe and tweak Mixer fertilizer recipe
    // The combination of these two changes makes the Mixer fertilizer recipe significantly less scalable.
    event.recipes.gtceu.compressor("plant_ball_from_sapling")
        .itemInputs("8x #minecraft:saplings")
        .itemOutputs("1x gtceu:plant_ball")
        .duration(15 * 20)
        .EUt(0.25 * GTValues.V[GTValues.ULV])
    event.replaceInput({ id: "gtceu:mixer/fertilizer" }, "gtceu:wood_dust", "gtceu:compost_mix_dust")

    // More Fertilizer recipes
    const existing_left_reagents = [
        {ingredient: "1x gtceu:glauconite_sand_dust", modifier: 0, abbreviation: "g"},
        {ingredient: "1x gtceu:calcium_dust", modifier: 0, abbreviation: "ca"},
        {ingredient: "1x gtceu:calcite_dust", modifier: -1, abbreviation: "c"},
        {ingredient: "1x gtceu:apatite_dust", modifier: 0, abbreviation: "a"},
    ]

    const existing_right_reagents = [
        {ingredient: "1x gtceu:tricalcium_phosphate_dust", modifier: 1, abbreviation: "t"},
        {ingredient: "1x gtceu:phosphate_dust", modifier: 0, abbreviation: "p"},
        {ingredient: "1x gtceu:sulfur_dust", modifier: 0, abbreviation: "s"},
        {ingredient: "3x gtceu:ash_dust", modifier: -1, abbreviation: "a"},
        {ingredient: "1x gtceu:dark_ash_dust", modifier: -1, abbreviation: "d"},
    ]

    const new_left_reagents = [
        {ingredient: "1x gtceu:potassium_dust", modifier: 0, abbreviation: "k"},
        {ingredient: "1x gtceu:saltpeter_dust", modifier: 0, abbreviation: "s"},
        {ingredient: "1x gtceu:potash_dust", modifier: 0, abbreviation: "po"},
        {ingredient: "1x gtceu:potassium_sulfate_dust", modifier: 1, abbreviation: "pos"},
    ]

    const new_right_reagents = [
        {ingredient: "1x gtceu:ammonium_chloride_dust", modifier: 1, abbreviation: "amm"},
    ]

    function defineFertRecipesForReagentPair(left_reagent, right_reagent) {
        event.recipes.gtceu.chemical_reactor(`fertilizer_${left_reagent.abbreviation}_${right_reagent.abbreviation}`)
            .itemInputs(left_reagent.ingredient, right_reagent.ingredient)
            .inputFluids(Fluid.of("minecraft:water", 1000))
            .itemOutputs(Item.of("gtceu:fertilizer", 3 + left_reagent.modifier + right_reagent.modifier))
            .duration(100 * (3 + left_reagent.modifier + right_reagent.modifier))
            .EUt(GTValues.VA[GTValues.LV])
    }

    // Define new Fertilizer recipes for all possible combinations
    existing_left_reagents.forEach(left_reagent => {
        new_right_reagents.forEach(right_reagent => {
            defineFertRecipesForReagentPair(left_reagent, right_reagent)
        })
    })

    new_left_reagents.forEach(left_reagent => {
        existing_right_reagents.forEach(right_reagent => {
            defineFertRecipesForReagentPair(left_reagent, right_reagent)
        })
    })

    new_left_reagents.forEach(left_reagent => {
        new_right_reagents.forEach(right_reagent => {
            defineFertRecipesForReagentPair(left_reagent, right_reagent)
        })
    })

    // Remove Fertilizer elecrolysis recipe to prevent Fertilizer Alchemy
    event.remove({ id: "gtceu:electrolyzer/fertilizer_decomposition" })
})
