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
     * @param {number} inputFeedbackAmount How many input items to add to output
     */
    function Greenhouse(mod, input, duration, output, inputFeedbackAmount) {
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
            .inputFluids(Fluid.of("minecraft:water", 24000))
            .itemOutputs(output)
            .duration(duration)
            .EUt(80)
        event.recipes.gtceu.greenhouse(`kubejs:${input}_boosted`)
            .circuit(2)
            .notConsumable(InputItem.of(Item.of(`${mod}:${input}`)))
            .itemInputs("1x gtceu:fertilizer")
            .inputFluids(Fluid.of("minecraft:water", 16000))
            .itemOutputs(boostedOutputs)
            .duration(duration / 2)
            .EUt(80)
    }


    // //// Trees //////
    Greenhouse("gtceu", "rubber_sapling", 1280, ["32x gtceu:rubber_log", "8x gtceu:sticky_resin"], 4)
    Greenhouse("minecraft", "oak_sapling", 1280, ["64x minecraft:oak_log", "4x minecraft:apple"], 4)
    Greenhouse("minecraft", "dark_oak_sapling", 1280, ["64x minecraft:dark_oak_log", "4x minecraft:apple"], 4)
    Greenhouse("minecraft", "spruce_sapling", 1280, ["64x minecraft:spruce_log"], 4)
    Greenhouse("minecraft", "birch_sapling", 1280, ["64x minecraft:birch_log"], 4)
    Greenhouse("minecraft", "acacia_sapling", 1280, ["64x minecraft:acacia_log"], 4)
    Greenhouse("minecraft", "jungle_sapling", 1280, ["64x minecraft:jungle_log"], 4)
    Greenhouse("minecraft", "azalea", 1280, ["64x minecraft:oak_log"], 4)
    Greenhouse("minecraft", "flowering_azalea", 1280, ["64x minecraft:oak_log"], 4)
    Greenhouse("minecraft", "cherry_sapling", 1280, ["64x minecraft:cherry_log"], 4)
    Greenhouse("minecraft", "mangrove_propagule", 1280, ["64x minecraft:mangrove_log"], 4)
    Greenhouse("minecraft", "chorus_flower", 1280, ["32x minecraft:chorus_fruit"], 4)
    Greenhouse("minecraft", "warped_fungus", 1280, ["64x minecraft:warped_stem", "32x minecraft:warped_wart_block", "16x minecraft:shroomlight"], 4)
    Greenhouse("minecraft", "crimson_fungus", 1280, ["64x minecraft:crimson_stem", "32x minecraft:nether_wart_block", "16x minecraft:shroomlight"], 4)
    Greenhouse("ad_astra", "aeronos_mushroom", 1280, ["32x ad_astra:aeronos_stem", "64x ad_astra:aeronos_cap"], 3)
    Greenhouse("ad_astra", "strophar_mushroom", 1280, ["32x ad_astra:strophar_stem", "64x ad_astra:strophar_cap"], 3)
    Greenhouse("thermal", "rubberwood_sapling", 1280, ["64x thermal:rubberwood_log"], 4)

    // //// Crops //////
    Greenhouse("minecraft", "sugar_cane", 640, ["32x minecraft:sugar_cane"], 0)
    // TODO: Increase water requirement for Kelp
    Greenhouse("minecraft", "kelp", 640, ["32x minecraft:kelp"], 0)
    Greenhouse("minecraft", "bamboo", 640, ["48x minecraft:bamboo"], 0)
    Greenhouse("minecraft", "cactus", 640, ["32x minecraft:cactus"], 0)
    Greenhouse("minecraft", "wheat_seeds", 640, ["32x minecraft:wheat"], 0)
    Greenhouse("minecraft", "carrot", 640, ["32x minecraft:carrot"], 0)
    Greenhouse("minecraft", "potato", 640, ["32x minecraft:potato"], 0)
    Greenhouse("minecraft", "beetroot_seeds", 640, ["32x minecraft:beetroot"], 0)
    Greenhouse("minecraft", "sweet_berries", 640, ["32x minecraft:sweet_berries"], 0)
    Greenhouse("minecraft", "glow_berries", 640, ["32x minecraft:glow_berries"], 0)
    Greenhouse("minecraft", "cocoa_beans", 640, ["32x minecraft:cocoa_beans"], 0)
    Greenhouse("minecraft", "sea_pickle", 640, ["32x minecraft:sea_pickle"], 0)
    Greenhouse("minecraft", "melon_seeds", 640, ["16x minecraft:melon"], 0)
    Greenhouse("minecraft", "pumpkin_seeds", 640, ["16x minecraft:pumpkin"], 0)
    Greenhouse("minecraft", "nether_wart", 640, ["16x minecraft:nether_wart"], 0)
    Greenhouse("minecraft", "red_mushroom", 640, ["16x minecraft:red_mushroom"], 0)
    Greenhouse("minecraft", "brown_mushroom", 640, ["16x minecraft:brown_mushroom"], 0)


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
        "moss_block",
        "glow_lichen",
        "tube_coral_fan",
        "brain_coral_fan",
        "bubble_coral_fan",
        "fire_coral_fan",
        "horn_coral_fan"
    ]
    flowers.forEach(flower => {
        Greenhouse("minecraft", flower, 640, [Item.of(flower, 48)], 0);
    })

    // Torchflowers, Pitcher plants are grown from seeds
    Greenhouse("minecraft", "torchflower_seeds", 640, [Item.of("torchflower", 12), Item.of("torchflower_seeds", 6)], 0);
    Greenhouse("minecraft", "pitcher_pod", 640, [Item.of("pitcher_plant", 12), Item.of("pitcher_pod", 6)], 0);

    // A way to get grass blocks
    event.recipes.gtceu.greenhouse("kubejs:grass_block")
        .circuit(1)
        .notConsumable(InputItem.of(Item.of("minecraft:grass_block")))
        .itemInputs("64x dirt")
        .inputFluids(Fluid.of("minecraft:water", 24000))
        .itemOutputs("64x grass_block")
        .duration(640)
        .EUt(80)
})

ServerEvents.recipes(event => {
    event.custom({
        type: "thermal:insolator",
        "ingredient": {
            "item": "ad_astra:aeronos_mushroom"
        },
        "result": [
            {
                "item": "ad_astra:aeronos_stem",
                "chance": 2.0
            },
            {
                "item": "ad_astra:aeronos_cap",
                "chance": 4.0
            },
            {
                "item": "ad_astra:aeronos_mushroom",
                "chance": 1.1
            }
        ],
        "energy_mod": 3.0,
        "water_mod": 2.0
    }).id("kubejs:thermal/insolator/aeronos_mushroom")

    event.custom({
        type: "thermal:insolator",
        "ingredient": {
            "item": "ad_astra:strophar_mushroom"
        },
        "result": [
            {
                "item": "ad_astra:strophar_stem",
                "chance": 2.0
            },
            {
                "item": "ad_astra:strophar_cap",
                "chance": 4.0
            },
            {
                "item": "ad_astra:strophar_mushroom",
                "chance": 1.1
            }
        ],
        "energy_mod": 3.0,
        "water_mod": 2.0
    }).id("kubejs:thermal/insolator/strophar_mushroom")

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
})
