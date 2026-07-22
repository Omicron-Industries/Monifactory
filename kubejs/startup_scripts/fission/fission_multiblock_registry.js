/**
 * Multiblock Registry.
 * This is the place where the shapes for fission-related multiblock machines are defined.
 */

const DynamicFissionReactorMachine = Java.loadClass("net.phoenix.phoenix_fission.common.data.multiblock.fission.DynamicFissionReactorMachine")
const PhoenixRecipeTypes = Java.loadClass("net.phoenix.phoenix_fission.common.data.PhoenixRecipeTypes")
const RelativeDirection = Java.loadClass("com.gregtechceu.gtceu.api.pattern.util.RelativeDirection")
const PhoenixFissionPredicates = Java.loadClass("net.phoenix.phoenix_fission.api.pattern.PhoenixFissionPredicates")
const PhoenixPartAbility = Java.loadClass("net.phoenix.phoenix_fission.api.machine.PhoenixPartAbility")
const PhoenixFissionBlocks = Java.loadClass("net.phoenix.phoenix_fission.common.data.block.PhoenixFissionBlocks")

GTCEuStartupEvents.registry("gtceu:machine", event => {
    // Fission Reactor
    event.create("fission_reactor", "multiblock")
        .machine((holder) => new DynamicFissionReactorMachine(holder))
        .rotationState(RotationState.ALL)
        .recipeTypes(PhoenixRecipeTypes.PRESSURIZED_FISSION_REACTOR_RECIPES)
        .recipeModifiers([(machine, recipe) => DynamicFissionReactorMachine.recipeModifier(machine, recipe), GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK_SUBTICK)])
        .appearanceBlock(() => Block.getBlock("phoenix_fission:lead_lined_casing"))
        .pattern(definition => FactoryBlockPattern.start(RelativeDirection.RIGHT, RelativeDirection.BACK, RelativeDirection.UP)
            .aisle("#CCC#", "CCCCC", "CCCCC", "CCCCC", "#CCC#")
            .aisleRepeatable(1, 4, "CGGGC", "GIIIG", "GIIIG", "GIIIG", "CGGGC")
            .aisle("CG@GC", "GIIIG", "GIIIG", "GIIIG", "CGGGC")
            .aisle("#CCC#", "CRRRC", "CRRRC", "CRRRC", "#CCC#")
            .aisle("#####", "#RRR#", "#RRR#", "#RRR#", "#####")
            .where("@", Predicates.controller(Predicates.blocks(definition.get())))
            .where("C", Predicates.blocks("phoenix_fission:lead_lined_casing").setMinGlobalLimited(38)
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1))
                .or(Predicates.abilities(PhoenixPartAbility.FISSION_SCRAM).setMaxGlobalLimited(1).setPreviewCount(0))
                .or(Predicates.abilities(PhoenixPartAbility.FISSION_SENSOR).setMaxGlobalLimited(3).setPreviewCount(0))
            )
            .where("G", Predicates.blocks("phoenix_fission:lead_lined_casing")
                .or(Predicates.blocks("phoenix_fission:lead_lined_glass"))
                .or(Predicates.abilities(PartAbility.IMPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.EXPORT_ITEMS))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS))
            )
            .where("I", Predicates.blocks(PhoenixFissionBlocks.EMPTY_REACTOR_COMPONENT)
                .or(PhoenixFissionPredicates.fissionCoolers())
                .or(PhoenixFissionPredicates.fissionFuelRods())
                .or(PhoenixFissionPredicates.fissionModerators())
            )
            .where("R", Predicates.blocks("phoenix_fission:control_rod_assembly"))
            .where("#", Predicates.any())
            .build())
        .workableCasingModel("phoenix_fission:block/casings/lead_lined/casing",
            "gtceu:block/multiblock/fission_reactor")
})


/*
.multiblock("pressurized_fission_reactor", DynamicFissionReactorMachine::new)
                    .langValue("§bPressurized Fission Reactor")
                    .recipeType(PhoenixRecipeTypes.PRESSURIZED_FISSION_REACTOR_RECIPES)
                    .generator(true)
                    .regressWhenWaiting(false)
                    .recipeModifiers(DynamicFissionReactorMachine::recipeModifier,
                            GTRecipeModifiers.ELECTRIC_OVERCLOCK.apply(OverclockingLogic.NON_PERFECT_OVERCLOCK_SUBTICK))
                    .appearanceBlock(PhoenixFissionBlocks.FISSILE_REACTION_SAFE_CASING)
                    .pattern(definition -> FactoryBlockPattern.start()
                            .aisle("BCCCB", "CDDDC", "CDDDC", "CDDDC", "BCCCB")
                            .aisle("CEFEC", "DGGGD", "DGGGD", "DGGGD", "CDHDC")
                            .aisle("CFEFC", "DGFGD", "DGFGD", "DGFGD", "CHEHC")
                            .aisle("CEFEC", "DGGGD", "DGGGD", "DGGGD", "CDHDC")
                            .aisle("BCICB", "CDDDC", "CDDDC", "CDDDC", "BCCCB")
                            .where("A", air())
                            .where("B", any())
                            .where("C", blocks(PhoenixFissionBlocks.FISSILE_REACTION_SAFE_CASING.get())
                                    .setMinGlobalLimited(12)
                                    .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                                    .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1))
                                    .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                                    .or(Predicates.abilities(PhoenixPartAbility.FISSION_SCRAM).setMaxGlobalLimited(1))
                                    .or(Predicates.abilities(PhoenixPartAbility.FISSION_SENSOR).setMaxGlobalLimited(2))
                                    .or(Predicates.autoAbilities(definition.getRecipeTypes())))
                            .where("D", blocks(Blocks.TINTED_GLASS))
                            .where("E", blocks(COIL_KANTHAL.get()))
                            .where('F',
                                    PhoenixFissionPredicates.fissionModerators()
                                            .or(PhoenixFissionPredicates.fissionBlankets()))
                            .where("G",
                                    PhoenixFissionPredicates.fissionCoolers()
                                            .or(PhoenixFissionPredicates.fissionFuelRods()))
                            .where("H", blocks(PhoenixFissionBlocks.FISSILE_HEAT_SAFE_CASING.get()))
                            .where("I", Predicates.controller(Predicates.blocks(definition.get())))
                            .build())
                    .model(
                            createWorkableCasingMachineModel(
                                    PhoenixFission.id("block/fission/fissile_reaction_safe_casing"),
                                    GTCEu.id("block/multiblock/fusion_reactor")))
*/
