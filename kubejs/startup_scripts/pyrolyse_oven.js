/**
 * Changes Pyrolyse Oven to accept a Parallel Control Hatch.
 */

StartupEvents.postInit(event => {
    let GTMemoizer = Java.loadClass("com.gregtechceu.gtceu.utils.memoization.GTMemoizer");
    let $RecipeModifierList = Java.loadClass("com.gregtechceu.gtceu.api.recipe.modifier.RecipeModifierList");

    let pyrolyse_oven = (definition) =>
        FactoryBlockPattern.start()
            .aisle("XXX", "XXX", "XXX")
            .aisle("CCC", "C#C", "CCC")
            .aisle("CCC", "C#C", "CCC")
            .aisle("XXX", "XSX", "XXX")
            .where("S", Predicates.controller(Predicates.blocks(GTMultiMachines.PYROLYSE_OVEN.get())))
            .where("X",
                Predicates.blocks(GTBlocks.MACHINE_CASING_ULV.get()).setMinGlobalLimited(6)
                    .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setMinGlobalLimited(1).setMaxGlobalLimited(2, 1))
                    .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1))
                    .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
                    .or(Predicates.abilities(PartAbility.MUFFLER).setExactLimit(1))
                    .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
            .where("C", Predicates.heatingCoils())
            .where("#", Predicates.any())
            .build();

    GTMultiMachines.PYROLYSE_OVEN.setPatternFactory(GTMemoizer["memoize(java.util.function.Supplier)"](() => pyrolyse_oven.apply(GTMultiMachines.PYROLYSE_OVEN)));
    GTMultiMachines.PYROLYSE_OVEN.setRecipeModifier(new $RecipeModifierList(GTRecipeModifiers.PARALLEL_HATCH, GTMultiMachines.PYROLYSE_OVEN.getRecipeModifier(), GTRecipeModifiers.BATCH_MODE));
});
