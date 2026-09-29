/**
 * Atomic Reconstructor singleblock
 */

ServerEvents.recipes(event => {
    const reconstructedItems = [
        ["minecraft:redstone", "gtceu:restonia_gem", GTValues.VA[GTValues.MV], "restonia"],
        ["minecraft:iron_ingot", "gtceu:enori_gem", GTValues.VA[GTValues.MV], "enori"],
        ["minecraft:coal", "gtceu:void_gem", GTValues.VA[GTValues.MV], "void"],
        ["minecraft:lapis_lazuli", "gtceu:palis_gem", GTValues.VA[GTValues.MV], "palis"],
        ["minecraft:diamond", "gtceu:diamatine_gem", GTValues.VA[GTValues.MV], "diamatine"],
        ["minecraft:emerald", "gtceu:emeradic_gem", GTValues.VA[GTValues.MV], "emeradic"],
        ["minecraft:coal_block", "gtceu:void_block", GTValues.VA[GTValues.MV], "void_block"],
        ["#forge:storage_blocks/redstone", "gtceu:restonia_block", GTValues.VA[GTValues.MV], "restonia_block"],
        ["#forge:storage_blocks/lapis", "gtceu:palis_block", GTValues.VA[GTValues.MV], "palis_block"],
        ["#forge:storage_blocks/diamond", "gtceu:diamatine_block", GTValues.VA[GTValues.MV], "diamatine_block"],
        ["#forge:storage_blocks/emerald", "gtceu:emeradic_block", GTValues.VA[GTValues.MV], "emeradic_block"],
        ["#forge:storage_blocks/iron", "gtceu:enori_block", GTValues.VA[GTValues.MV], "enori_block"],
        ["minecraft:sand", "minecraft:soul_sand", GTValues.VA[GTValues.MV], "soul_sand"],
        ["minecraft:rotten_flesh", "minecraft:leather", GTValues.VA[GTValues.LV], "leather"],
        ["minecraft:prismarine_shard", "minecraft:prismarine_crystals", GTValues.VA[GTValues.MV], "prismarine_crystals"],
        ["minecraft:prismarine_crystals", "minecraft:prismarine_shard", GTValues.VA[GTValues.MV], "prismarine_shards"],
        ["gtceu:steel_ingot", "gtceu:damascus_steel_ingot", GTValues.VA[GTValues.MV], "damascus_steel"],
        ["minecraft:dried_kelp", "minecraft:wither_rose", GTValues.VA[GTValues.LV], "wither_rose"],
        ["gtceu:plant_ball", "minecraft:kelp", GTValues.VA[GTValues.LV], "kelp"],
        ["minecraft:obsidian", "minecraft:crying_obsidian", GTValues.VA[GTValues.LV], "crying_obsidian"],
        ["#forge:dyes/black", "minecraft:ink_sac", GTValues.VA[GTValues.LV], "ink_sac"],
        ["minecraft:ink_sac", "minecraft:glow_ink_sac", GTValues.VA[GTValues.LV], "glow_ink_sac"],
        ["thermal:rubberwood_sapling", "gtceu:rubber_sapling", GTValues.VA[GTValues.LV], "rubberwood_to_rubber"],
        ["gtceu:rubber_sapling", "thermal:rubberwood_sapling", GTValues.VA[GTValues.LV], "rubber_to_rubberwood"],
        ["#forge:dyes/red", "minecraft:sweet_berries", GTValues.VA[GTValues.LV], "sweet_berries"],
        ["minecraft:sweet_berries", "minecraft:glow_berries", GTValues.VA[GTValues.LV], "glow_berries"],
    ]

    // Black Quartz
    event.recipes.gtceu.electrolyzer("kubejs:black_quartz_dust")
        .itemInputs("4x gtceu:quartzite_dust")
        .itemOutputs("gtceu:black_quartz_dust")
        .duration(400)
        .EUt(90)
    event.recipes.gtceu.autoclave("kubejs:black_quartz_gem__water")
        .itemInputs("gtceu:black_quartz_dust")
        .inputFluids(Fluid.of("minecraft:water", 250))
        .itemOutputs("gtceu:black_quartz_gem")
        .duration(1200)
        .EUt(24)
    event.recipes.gtceu.autoclave("kubejs:black_quartz_gem__distilled")
        .itemInputs("gtceu:black_quartz_dust")
        .inputFluids(Fluid.of("gtceu:distilled_water", 50))
        .itemOutputs("gtceu:black_quartz_gem")
        .duration(600)
        .EUt(24)

    // Black quartz, tag-based recipes for Tinted Glass
    event.replaceInput({ output: "minecraft:tinted_glass" }, "minecraft:glass", "#forge:glass")
    event.replaceInput({ output: "minecraft:tinted_glass" }, "minecraft:amethyst_shard", "#forge:gems/amethyst")
    event.recipes.gtceu.shaped("2x minecraft:tinted_glass", [
        " Q ",
        "QGQ",
        " Q "
    ], {
        Q: "#forge:gems/black_quartz",
        G: "#forge:glass"
    }).id("kubejs:tinted_glass_black_quartz")
        .addMaterialInfo()
    event.recipes.gtceu.assembler("tinted_glass_black_quartz")
        .itemInputs("2x #forge:gems/black_quartz", "#forge:glass")
        .itemOutputs("minecraft:tinted_glass")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])

    // Reconstruction
    reconstructedItems.forEach(([input, output, eut, id]) => {
        event.recipes.gtceu.atomic_reconstruction(`kubejs:${id}`)
            .itemInputs(input)
            .itemOutputs(output)
            .duration(20)
            .EUt(eut)
    })

    // Universal Circuits
    const tiers = ["ulv", "lv", "mv", "hv", "ev", "iv", "luv", "zpm", "uv", "uhv", "uev"]
    tiers.forEach((level) => {
        event.recipes.gtceu.atomic_reconstruction(`kubejs:${level}_universal_circuit`)
            .itemInputs(`#gtceu:circuits/${level}`)
            .itemOutputs(`kubejs:${level}_universal_circuit`)
            .EUt(GTValues.VA[GTValues.LV])
            .duration(5)
    })

    const reconstructorrecipe = [
        ["lv", "lead"],
        ["mv", "rose_gold"],
        ["hv", "beryllium"],
        ["ev", "platinum"],
        ["iv", "rhodium"],
        ["luv", "osmiridium"],
        ["zpm", "naquadah"],
        ["uv", "duranium"],
        ["uhv", "tritanium"],
        ["uev", "omnium"]
    ]
    reconstructorrecipe.forEach(([tier, plate]) => {
        event.recipes.gtceu.shaped(`gtceu:${tier}_atomic_reconstructor`, [
            "CPC",
            "EHE",
            "PPM"
        ], {
            P: `gtceu:${plate}_plate`,
            E: `gtceu:${tier}_emitter`,
            H: `gtceu:${tier}_machine_hull`,
            C: `#gtceu:circuits/${tier}`,
            M: `gtceu:${tier}_electric_motor`
        }).id(`kubejs:shaped/${tier}_atomic_reconstructor`)
            .addMaterialInfo()
    })

    // Flower conversion convenience recipes
    const flowerCycle = [
        "dandelion",
        "poppy",
        "blue_orchid",
        "allium",
        "azure_bluet",
        "red_tulip",
        "orange_tulip",
        "white_tulip",
        "pink_tulip",
        "oxeye_daisy",
        "cornflower",
        "lily_of_the_valley",
        // 'sunflower',  //Flowers that give 2x as much dye are excluded. Sorry!
        // 'lilac',
        // 'rose_bush',
        // 'peony',
        "spore_blossom",
        "wither_rose",
        "dead_bush"
    ]
    reconstructCycle(flowerCycle);

    // Fungus conversion convenience recipes
    const fungusCycle = [
        "red_mushroom",
        "brown_mushroom",
        "nether_wart"
    ]
    reconstructCycle(fungusCycle);

    /**
     * Creates a "cycle" of Atomic Reconstructor recipes that allow players to transmute
     * any one item in the cycle into any other, through repeated applications of Atomic Reconstruction.
     * Best applied to plants or fungi, where getting one enables you to get many more easily.
     *
     * @param {Ingredient[]} cycle The array of ingredients for the AR to cycle through
     */
    function reconstructCycle(cycle) {
        cycle.forEach((flower, index) => {
            let curItem = cycle[index];
            let nextItem = cycle[(index + 1) % cycle.length];
            event.recipes.gtceu.atomic_reconstruction(`gtceu:${curItem}_to_${nextItem}`)
                .itemInputs(`minecraft:${curItem}`)
                .itemOutputs(`minecraft:${nextItem}`)
                .EUt(GTValues.VA[GTValues.LV])
                .duration(30)
        })
    }
})
