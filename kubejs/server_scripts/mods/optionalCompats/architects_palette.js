/**
 *
 * Compatibility Script for Architect's Palette
 * Mainly removes Warping, but also adds various other recipes to GT machines.
 *
 */

if (Platform.isLoaded("architects_palette")) {
    console.log("Architect's Palette found, loading compat script...")

    LootJS.modifiers((event) => {
        event.addEntityLootModifier("minecraft:wither_skeleton").replaceLoot("architects_palette:withered_bone", "minecraft:bone", true);
    });

    ServerEvents.recipes(event => {
        // Recipe Removal
        event.remove([
            { id: "architects_palette:algal_blend" },
            { id: "architects_palette:algal_blend" },
            { id: "architects_palette:plating_block" },
            { id: "architects_palette:tread_plating" },
            { id: "architects_palette:nether_brass_blend" },
            { id: "architects_palette:oracle_jelly" },
            { id: "architects_palette:wardstone_blend" },
            { id: "architects_palette:cerebral_plate" },
            { id: "architects_palette:sunmetal_blend" },
            { id: "architects_palette:hazard_sign" },
            { id: "architects_palette:entwine_rod" },
            { id: "architects_palette:withered_bone" },
        ])

        // For some reason the smelting recipe wouldn't go away so I went with the more direct approach.
        event.remove({ output: "architects_palette:wardstone_brick" })

        event.remove({ type: "architects_palette:warping" })

        event.replaceInput(
            { input: "architects_palette:withered_bone" },
            "architects_palette:withered_bone",
            "kubejs:wither_bone"
        )

        // Mixer Recipes
        event.recipes.gtceu.mixer("algal_blend")
            .itemInputs("minecraft:clay_ball","minecraft:kelp")
            .itemOutputs("4x architects_palette:algal_blend")
            .duration(40)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("4x_algal_blend")
            .itemInputs("minecraft:clay","2x minecraft:kelp")
            .itemOutputs("16x architects_palette:algal_blend")
            .duration(40)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("myonite")
            .itemInputs("4x minecraft:stone","#forge:mushrooms")
            .itemOutputs("8x architects_palette:myonite")
            .duration(40)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("olivestone_bricks")
            .itemInputs("8x minecraft:stone_bricks")
            .inputFluids("gtceu:green_dye 72")
            .itemOutputs("8x architects_palette:olivestone_bricks")
            .duration(40)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("sunmetal_blend")
            .itemInputs("minecraft:soul_sand", "gtceu:tiny_gold_dust")
            .itemOutputs("4x architects_palette:sunmetal_blend")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("sunmetal_blend_9x")
            .itemInputs("9x minecraft:soul_sand", "gtceu:gold_dust")
            .itemOutputs("36x architects_palette:sunmetal_blend")
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("nether_brass_blend")
            .itemInputs("minecraft:soul_sand", "gtceu:copper_dust", "gtceu:tiny_iron_dust")
            .itemOutputs("4x architects_palette:nether_brass_blend")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.mixer("nether_brass_blend_9x")
            .itemInputs("9x minecraft:soul_sand", "9x gtceu:copper_dust", "gtceu:iron_dust")
            .itemOutputs("36x architects_palette:nether_brass_blend")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.mixer("oracle_jelly")
            .itemInputs("minecraft:chorus_fruit", "minecraft:sugar")
            .itemOutputs("4x architects_palette:oracle_jelly")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("oracle_bricks")
            .itemInputs("8x architects_palette:oracle_bricks")
            .inputFluids("gtceu:black_dye 72")
            .itemOutputs("8x architects_palette:dark_oracle_bricks")
            .duration(40)
            .EUt(GTValues.VA[GTValues.ULV])

        // Alloy Smelter Recipes
        event.recipes.gtceu.alloy_smelter("wardstone_brick")
            .itemInputs("minecraft:soul_sand", "minecraft:gold_nugget")
            .itemOutputs("4x architects_palette:sunmetal_brick")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.alloy_smelter("sunmetal_brick")
            .itemInputs("minecraft:lapis_lazuli", "minecraft:nether_wart")
            .itemOutputs("4x architects_palette:wardstone_brick")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.alloy_smelter("cerebral_plate")
            .itemInputs("minecraft:tuff", "#minecraft:coals")
            .itemOutputs("4x architects_palette:cerebral_plate")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        // Compressor Recipes
        event.recipes.gtceu.compressor("agal_bricks")
            .itemInputs("4x architects_palette:algal_brick")
            .itemOutputs("architects_palette:algal_bricks")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("cerebral_block")
            .itemInputs("4x architects_palette:cerebral_plate")
            .itemOutputs("8x architects_palette:cerebral_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("oracle_block")
            .itemInputs("4x architects_palette:oracle_jelly")
            .itemOutputs("8x architects_palette:oracle_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("rotten_flesh_block")
            .itemInputs("9x minecraft:rotten_flesh")
            .itemOutputs("architects_palette:rotten_flesh_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("unobtanium_block")
            .itemInputs("4x architects_palette:unobtanium")
            .itemOutputs("architects_palette:unobtanium_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("sunmetal_block")
            .itemInputs("4x architects_palette:sunmetal_brick")
            .itemOutputs("4x architects_palette:sunmetal_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("nether_brass_block")
            .itemInputs("4x architects_palette:nether_brass_ingot")
            .itemOutputs("4x architects_palette:nether_brass_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("withered_bone_block")
            .itemInputs("3x kubejs:wither_bone")
            .itemOutputs("architects_palette:withered_bone_block")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("cod_log")
            .itemInputs("4x minecraft:cod")
            .itemOutputs("6x architects_palette:cod_log")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("salmon_log")
            .itemInputs("4x minecraft:salmon")
            .itemOutputs("6x architects_palette:salmon_log")
            .duration(100)
            .EUt(2)

        event.recipes.gtceu.compressor("scute_block")
            .itemInputs("4x minecraft:scute")
            .itemOutputs("12x architects_palette:scute_block")
            .duration(100)
            .EUt(2)

        // The One Lathe Recipe
        event.recipes.gtceu.lathe("entwine_rod")
            .itemInputs("minecraft:ender_pearl")
            .itemOutputs("4x architects_palette:entwine_rod")
            .duration(112)
            .EUt(GTValues.VHA[GTValues.LV])

        // Forge Hammer Recipes
        event.recipes.gtceu.forge_hammer("unobtanium")
            .itemInputs("architects_palette:unobtanium_block")
            .itemOutputs("5x architects_palette:unobtanium")
            .duration(60)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.forge_hammer("withered_bone")
            .itemInputs("architects_palette:withered_bone_block")
            .itemOutputs("3x kubejs:wither_bone")
            .duration(60)
            .EUt(GTValues.VA[GTValues.ULV])

        // Assembler Recipes
        event.recipes.gtceu.assembler("abyssaline")
            .itemInputs("2x minecraft:obsidian", "2x minecraft:prismarine_shard")
            .itemOutputs("12x architects_palette:abyssaline")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("plating_block")
            .circuit(24)
            .itemInputs("4x minecraft:iron_nugget", "gtceu:iron_plate")
            .itemOutputs("8x architects_palette:plating_block")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("tread_plate")
            .circuit(23)
            .itemInputs("4x minecraft:iron_nugget", "architects_palette:plating_block")
            .itemOutputs("8x architects_palette:tread_plate")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("bread_block")
            .circuit(1)
            .itemInputs("minecraft:hay_block")
            .itemOutputs("3x architects_palette:bread_block")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("spool")
            .circuit(2)
            .itemInputs("minecraft:stick", "minecraft:white_wool")
            .itemOutputs("2x architects_palette:spool")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("coarse_snow")
            .itemInputs("minecraft:gravel", "minecraft:snow_block")
            .itemOutputs("4x architects_palette:coarse_snow")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("molten_nether_bricks")
            .itemInputs("minecraft:nether_bricks", "minecraft:magma_block")
            .itemOutputs("4x architects_palette:molten_nether_bricks")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("sunstone")
            .itemInputs("minecraft:basalt", "architects_palette:sunmetal_blend")
            .itemOutputs("4x architects_palette:sunstone")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.assembler("hazard_sign")
            .circuit(23)
            .itemInputs("minecraft:iron_nugget", "gtceu:iron_plate")
            .itemOutputs("4x architects_palette:hazard_sign")
            .duration(40)
            .EUt(GTValues.VA[GTValues.LV])

        // Atomic Reconstructor Recipes
        event.recipes.gtceu.atomic_reconstruction("unobtanium")
            .itemInputs("minecraft:netherite_ingot")
            .itemOutputs("architects_palette:unobtanium")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("twisted_sapling")
            .itemInputs("#minecraft:saplings")
            .itemOutputs("architects_palette:twisted_sapling")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("warpstone")
            .itemInputs("minecraft:clay")
            .itemOutputs("architects_palette:warpstone")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("hadaline")
            .itemInputs("architects_palette:abyssaline")
            .itemOutputs("architects_palette:hadaline")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("moonstone")
            .itemInputs("architects_palette:sunstone")
            .itemOutputs("architects_palette:moonstone")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("sunstone")
            .itemInputs("architects_palette:moonstone")
            .itemOutputs("architects_palette:sunstone")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("onyx")
            .itemInputs("minecraft:granite")
            .itemOutputs("architects_palette:onyx")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("nebulite")
            .itemInputs("minecraft:diorite")
            .itemOutputs("architects_palette:nebulite")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("craterstone")
            .itemInputs("minecraft:cobblestone")
            .itemOutputs("architects_palette:craterstone")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("esoterrack")
            .itemInputs("minecraft:andesite")
            .itemOutputs("architects_palette:esoterrack")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("moonshale")
            .itemInputs("minecraft:stone")
            .itemOutputs("architects_palette:moonshale")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("hadaline_lamp")
            .itemInputs("architects_palette:abyssaline_lamp")
            .itemOutputs("architects_palette:hadaline_lamp")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("entrails")
            .itemInputs("architects_palette:rotten_flesh_block")
            .itemOutputs("architects_palette:entrails")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("initial_monazite_rod")
            .itemInputs("gtceu:monazite_gem")
            .itemOutputs("architects_palette:monazite_rod")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("monazite_rod")
            .itemInputs("architects_palette:heliodor_rod")
            .itemOutputs("architects_palette:monazite_rod")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("ekanite_rod")
            .itemInputs("architects_palette:monazite_rod")
            .itemOutputs("architects_palette:ekanite_rod")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.atomic_reconstruction("heliodor_rod")
            .itemInputs("architects_palette:ekanite_rod")
            .itemOutputs("architects_palette:heliodor_rod")
            .duration(20)
            .EUt(GTValues.VA[GTValues.LV])

        // Twisted Wood Recipes
        event.recipes.gtceu.greenhouse("twisted_sapling")
            .circuit(1)
            .notConsumable(InputItem.of(Item.of("architects_palette:twisted_sapling")))
            .inputFluids("minecraft:water 24000")
            .itemOutputs("64x architects_palette:twisted_log", "4x architects_palette:twisted_sapling")
            .duration(1280)
            .EUt(80)
        event.recipes.gtceu.greenhouse("twisted_sapling_boosted")
            .circuit(2)
            .notConsumable(InputItem.of(Item.of("architects_palette:twisted_sapling")))
            .itemInputs("1x gtceu:fertilizer")
            .inputFluids("minecraft:water 16000")
            .itemOutputs("64x architects_palette:twisted_log", "64x architects_palette:twisted_log", "4x architects_palette:twisted_sapling")
            .duration(640)
            .EUt(80)

        event.recipes.gtceu.cutter("water_twisted_planks")
            .itemInputs("#architects_palette:twisted_logs")
            .inputFluids("minecraft:water 4")
            .itemOutputs("6x architects_palette:twisted_planks", "2x gtceu:wood_dust")
            .duration(400)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.cutter("water_distilled_twisted_planks")
            .itemInputs("#architects_palette:twisted_logs")
            .inputFluids("gtceu:distilled_water 3")
            .itemOutputs("6x architects_palette:twisted_planks", "2x gtceu:wood_dust")
            .duration(300)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.cutter("lubricant_twisted_planks")
            .itemInputs("#architects_palette:twisted_logs")
            .inputFluids("gtceu:lubricant 1")
            .itemOutputs("6x architects_palette:twisted_planks", "2x gtceu:wood_dust")
            .duration(200)
            .EUt(GTValues.VA[GTValues.ULV])

    })

    console.log("Architect's Palette Loaded!")
}
