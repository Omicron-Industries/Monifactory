/**
 * Block Registry - defines ID, name,
 * block properties, and block tags of custom blocks.
 */
StartupEvents.registry("block", event => {

    // compressed_sand Blocks
    event.create("compressed_sand")
        .textureAll("kubejs:block/compressed_sand/sand")
        .displayName("Compressed Sand")
        .soundType("sand")
        .resistance(1).hardness(1)
        .tagBlock("mineable/shovel").requiresTool(true)
        .property(BlockProperties.FALLING);

    event.create("double_compressed_sand")
        .textureAll("kubejs:block/compressed_sand/sand_double")
        .displayName("Double Compressed Sand")
        .soundType("sand")
        .resistance(2).hardness(2)
        .tagBlock("mineable/shovel").requiresTool(true)
        .property(BlockProperties.FALLING);

    event.create("compressed_red_sand")
        .textureAll("kubejs:block/compressed_sand/red_sand")
        .displayName("Compressed Red Sand")
        .soundType("sand")
        .resistance(1).hardness(1)
        .tagBlock("mineable/shovel").requiresTool(true)
        .property(BlockProperties.FALLING);

    event.create("double_compressed_red_sand")
        .textureAll("kubejs:block/compressed_sand/red_sand_double")
        .displayName("Double Compressed Red Sand")
        .soundType("sand")
        .resistance(2).hardness(2)
        .tagBlock("mineable/shovel").requiresTool(true)
        .property(BlockProperties.FALLING);


    // Micro Miner Cores/Frames
    event.create("electrum_micro_miner_core")
        .displayName("Electrum Micro Miner Engine Core")
        .soundType("metal")
        .resistance(3)
        .hardness(3)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .defaultCutout();

    event.create("signalum_micro_miner_core")
        .displayName("Signalum Micro Miner Engine Core")
        .soundType("metal")
        .resistance(4)
        .hardness(4)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .defaultCutout();

    event.create("enderium_micro_miner_core")
        .displayName("Enderium Micro Miner Engine Core")
        .soundType("metal")
        .resistance(5)
        .hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .defaultCutout();

    event.create("electrum_micro_miner_frame")
        .displayName("Electrum Micro Miner Engine Frame")
        .soundType("metal")
        .resistance(3)
        .hardness(3)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .defaultCutout();

    event.create("signalum_micro_miner_frame")
        .displayName("Signalum Micro Miner Engine Frame")
        .soundType("metal")
        .resistance(4)
        .hardness(4)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .defaultCutout();

    event.create("enderium_micro_miner_frame")
        .displayName("Enderium Micro Miner Engine Frame")
        .soundType("metal")
        .resistance(5)
        .hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .defaultCutout();

    event.create("warp_core")
        .textureAll("kubejs:block/microverse/component/warp_core")
        .displayName("Warp Core")
        .soundType("metal")
        .resistance(6).hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true);

    event.create("warp_controller")
        .textureAll("kubejs:block/microverse/component/warp_controller")
        .displayName("Warp Controller")
        .soundType("metal")
        .resistance(6).hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true);

    event.create("universal_warp_core")
        .textureAll("kubejs:block/microverse/component/universal_warp_core")
        .displayName("Universal Warp Core")
        .soundType("metal")
        .resistance(6).hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true);

    event.create("universal_warp_controller")
        .textureAll("kubejs:block/microverse/component/universal_warp_controller")
        .displayName("Universal Warp Controller")
        .soundType("metal")
        .resistance(6).hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true);

    // Machine Casings
    const casings = [
        "dark_soularium",
        "dark_steel",
    ]

    casings.forEach(casing => {
        event.create(`${casing}_casing`)
            .textureAll(`kubejs:block/casing/${casing}/casing`)
            .soundType("metal")
            .resistance(6).hardness(5)
            .tagBlock("mineable/pickaxe")
            .tagBlock("forge:mineable/wrench")
            .requiresTool(true);
    });

    // UEV Hermetic Casing
    event.create("gtceu:uev_hermetic_casing")
        .displayName("Hermetic Casing X")
        .soundType("metal")
        .renderType("cutout")
        .resistance(6).hardness(5)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true);

    event.create("dust", "falling")
        .textureAll("kubejs:block/dust")
        .soundType("sand")
        .resistance(0.4).hardness(0.4)
        .tag("mineable/shovel").displayName("Dust Block")
        .property(BlockProperties.FALLING);

    event.create("excitationcoil")
        .displayName("Excitation Coil")
        .soundType("metal")
        .renderType("solid")
        .notSolid()
        .fullBlock(false)
        .noValidSpawns(true)
        .property(BlockProperties.FACING)
        .property(BlockProperties.WATERLOGGED)
        .placementState((/** @type {Internal.BlockStateModifyPlacementCallbackJS} */ context) => context.set(BlockProperties.FACING, context.clickedFace))
        .tag("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .requiresTool(true)
        .lightLevel(0.5);

    event.create("lyso_ce_glass")
        .displayName("Cerium-doped Lutetium Yttrium Oxyorthosilicate Glass")
        .soundType("glass")
        .renderType("cutout")
        .resistance(0.4).hardness(0.4)
        .tagBlock("mineable/pickaxe")
        .textureAll("kubejs:block/lines/prism/lyso_ce_glass")
        .defaultCutout()

    event.create("red_aligned_glass")
        .soundType("glass")
        .renderType("cutout")
        .resistance(0.5).hardness(0.5)
        .tagBlock("mineable/pickaxe")
        .textureAll("kubejs:block/lines/prism/red_aligned_glass")
        .defaultCutout()

    event.create("green_aligned_glass")
        .soundType("glass")
        .renderType("cutout")
        .resistance(0.5).hardness(0.5)
        .tagBlock("mineable/pickaxe")
        .textureAll("kubejs:block/lines/prism/green_aligned_glass")
        .defaultCutout()

    event.create("blue_aligned_glass")
        .soundType("glass")
        .renderType("cutout")
        .resistance(0.5).hardness(0.5)
        .tagBlock("mineable/pickaxe")
        .textureAll("kubejs:block/lines/prism/blue_aligned_glass")
        .defaultCutout()

    event.create("omnic_matrix_coil_block", "gtceu:coil")
        .textureAll("kubejs:block/casing/omnic_matrix_machine/coil")
        .temperature(12600)
        .level(16)
        .energyDiscount(16)
        .tier(8)
        .coilMaterial(() => GTMaterials.get("omnium"))
        .hardness(5)
        .requiresTool(true)
        .tagBlock("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .soundType("metal")

    event.create("meowni_plush", "cardinal")
        .displayName("Meowni Plush")
        .soundType("wool")
        .renderType("cutout")
        .tag("mineable/pickaxe")
        .tagBlock("forge:mineable/wrench")
        .defaultCutout()
});
