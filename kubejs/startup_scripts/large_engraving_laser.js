/**
 * Lowers the minimum casing requirement on the Large Engraving Laser from 50 to 44
 * to allow exactly enough input busses to fit all lenses.
 */

StartupEvents.postInit(event => {
    let GTMemoizer = Java.loadClass("com.gregtechceu.gtceu.utils.memoization.GTMemoizer");

    let large_engraving_laser = (definition) =>
        FactoryBlockPattern.start()
            .aisle("XXXXX", "XXGXX", "XXGXX", "XXXXX")
            .aisle("XXXXX", "XAAAX", "XAAAX", "XKKKX")
            .aisle("XXXXX", "GAAAG", "GACAG", "XKXKX")
            .aisle("XXXXX", "XAAAX", "XAAAX", "XKKKX")
            .aisle("XXSXX", "XXGXX", "XXGXX", "XXXXX")
            .where("S", Predicates.controller(Predicates.blocks(GCYMMachines.LARGE_ENGRAVING_LASER.get())))
            .where("C", Predicates.blocks(GTBlocks.CASING_TUNGSTENSTEEL_PIPE.get()))
            .where("X", Predicates.blocks(GCYMBlocks.CASING_LASER_SAFE_ENGRAVING.get()).setMinGlobalLimited(44)
                .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setMinGlobalLimited(1).setMaxGlobalLimited(2, 1))
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
                .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
            .where("G", Predicates.blocks(GTBlocks.CASING_TEMPERED_GLASS.get()))
            .where("K", Predicates.blocks(GTBlocks.CASING_GRATE.get()))
            .where("A", Predicates.air())
            .build();

    GCYMMachines.LARGE_ENGRAVING_LASER.setPatternFactory(GTMemoizer["memoize(java.util.function.Supplier)"](() => large_engraving_laser.apply(GCYMMachines.LARGE_ENGRAVING_LASER)));
});
