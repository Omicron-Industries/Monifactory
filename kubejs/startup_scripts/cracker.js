/**
 * Changes Cracker to accept a Parallel Control Hatch.
 */

StartupEvents.postInit(event => {
    let GTMemoizer = Java.loadClass("com.gregtechceu.gtceu.utils.memoization.GTMemoizer");
    let $RecipeModifierList = Java.loadClass("com.gregtechceu.gtceu.api.recipe.modifier.RecipeModifierList");
    let $CoilWorkableElectricMultiblockMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.multiblock.CoilWorkableElectricMultiblockMachine")
    let $RecipeModifier = Java.loadClass("com.gregtechceu.gtceu.api.recipe.modifier.RecipeModifier")
    let $GTRecipe = Java.loadClass("com.gregtechceu.gtceu.api.recipe.GTRecipe");
    let $MetaMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.MetaMachine");
    let $RecipeHelper = Java.loadClass("com.gregtechceu.gtceu.api.recipe.RecipeHelper")

    function crackerCoilDiscount(machine, recipe) {
        if (!(machine instanceof $MetaMachine)) return ModifierFunction.NULL;
        if (!(recipe instanceof $GTRecipe)) return ModifierFunction.NULL;

        if (!(machine instanceof $CoilWorkableElectricMultiblockMachine)) {
            return $RecipeModifier.nullWrongType($CoilWorkableElectricMultiblockMachine, machine)
        }

        if ($RecipeHelper.getRecipeEUtTier(recipe) > machine.getTier()) return ModifierFunction.NULL;

        if (machine.getCoilTier() > 0) {
            return ModifierFunction.builder()
                .eutMultiplier(1.0 - machine.getCoilTier() * 0.1)
                .build();
        }
        return ModifierFunction.IDENTITY;
    }

    let cracker = (definition) =>
        FactoryBlockPattern.start()
            .aisle("HCHCH", "HCHCH", "HCHCH")
            .aisle("HCHCH", "H###H", "HCHCH")
            .aisle("HCHCH", "HCOCH", "HCHCH")
            .where("O", Predicates.controller(Predicates.blocks(GTMultiMachines.CRACKER.get())))
            .where("H", Predicates.blocks(GTBlocks.CASING_STAINLESS_CLEAN.get()).setMinGlobalLimited(12)
                .or(Predicates.abilities(PartAbility.INPUT_ENERGY).setMinGlobalLimited(1).setMaxGlobalLimited(2, 1))
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.PARALLEL_HATCH).setMaxGlobalLimited(1))
                .or(Predicates.abilities(PartAbility.MUFFLER).setExactLimit(1))
                .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1)))
            .where("#", Predicates.any())
            .where("C", Predicates.heatingCoils())
            .build();

    GTMultiMachines.CRACKER.setPatternFactory(GTMemoizer["memoize(java.util.function.Supplier)"](() => cracker.apply(GTMultiMachines.CRACKER)));
    GTMultiMachines.CRACKER.setRecipeModifier(new $RecipeModifierList(crackerCoilDiscount, GTRecipeModifiers.PARALLEL_HATCH, GTRecipeModifiers.OC_NON_PERFECT_SUBTICK, GTRecipeModifiers.BATCH_MODE));
});
