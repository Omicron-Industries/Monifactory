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
const LargeTurbineMachine = Java.loadClass("com.gregtechceu.gtceu.common.machine.multiblock.generator.LargeTurbineMachine")
const TraceabilityPredicate = Java.loadClass("com.gregtechceu.gtceu.api.pattern.TraceabilityPredicate")
const SimplePredicate = Java.loadClass("com.gregtechceu.gtceu.api.pattern.predicates.SimplePredicate")
const IRotorHolderMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.feature.multiblock.IRotorHolderMachine")
const MetaMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.MetaMachine")

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {

    // High Pressure Steam Turbine recipe type
    event.create("hp_steam_turbine")
        .category("multiblock")
        .setEUIO("out")
        .setMaxIOSize(0, 0, 1, 1)
        .setSlotOverlay(false, false, GuiTextures.CENTRIFUGE_OVERLAY)
        .setProgressBar(GuiTextures.PROGRESS_BAR_GAS_COLLECTOR, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.TURBINE)
})

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

    // Predicate for Large Turbine rotor holder ripped pretty much straight from GTM
    let rotorHolderPredicate = new TraceabilityPredicate(
        new SimplePredicate((state) => {
            let rotorHolderMachine = MetaMachine.getMachine(state.getWorld(), state.getPos());
            return rotorHolderMachine instanceof IRotorHolderMachine &&
                state.getWorld().getBlockState(state.getPos().relative(rotorHolderMachine.self().getFrontFacing())).isAir()
        },
        /**
         * This nameless function below has been a nightmare. All it does is retrieve list of rotor holder blocks that can go in the spot for the multi previews, but Rhino/JS didn't want to supply it in the correct type.
         * I was forced to create a new predicate from scratch and use the candidates from that instead. It's ugly, but it works!
         */
        () => Predicates.ability(PartAbility.ROTOR_HOLDER, GTValues.ALL_TIERS.slice(GTValues.IV)).common[0].candidates.get()
        )
    )
        .addTooltips(Component.translatable("gtceu.multiblock.pattern.clear_amount_3"))
        .addTooltips(Component.translatable("gtceu.multiblock.pattern.error.limited.1", GTValues.VN[GTValues.IV]))
        .setExactLimit(1)

    // High Pressure Steam Turbine
    event.create("high_pressure_steam_turbine", "multiblock")
        .machine((holder) => new LargeTurbineMachine(holder, GTValues.IV))
        .rotationState(RotationState.ALL)
        .recipeTypes("hp_steam_turbine")
        .recipeModifiers((machine, recipe) => LargeTurbineMachine.recipeModifier(machine, recipe))
        .appearanceBlock(GTBlocks.CASING_TITANIUM_TURBINE)
        .generator(true)
        .pattern(definition => FactoryBlockPattern.start(/* RelativeDirection.FRONT, RelativeDirection.UP, RelativeDirection.RIGHT */)
            .aisle("CCCFFC", "CHHC#C", "CCCFFC")
            .aisle("CHHC#C", "RGGGGE", "CHHC#C")
            .aisle("CCCFFC", "C@HC#C", "CCCFFC")
            .where("@", Predicates.controller(Predicates.blocks(definition.get())))
            .where("G", Predicates.blocks(GTBlocks.CASING_TITANIUM_GEARBOX.get()))
            .where("C", Predicates.blocks(GTBlocks.CASING_TITANIUM_TURBINE.get()))
            .where("F", Predicates.frames(GTMaterials.HSSG))
            .where("R", rotorHolderPredicate)
            .where("E", Predicates.abilities(PartAbility.OUTPUT_ENERGY).setExactLimit(1))
            .where("H", Predicates.blocks(GTBlocks.CASING_TITANIUM_TURBINE.get())
                .or(Predicates.abilities(PartAbility.MAINTENANCE).setExactLimit(1))
                .or(Predicates.abilities(PartAbility.IMPORT_FLUIDS).setPreviewCount(1))
                .or(Predicates.abilities(PartAbility.EXPORT_FLUIDS).setPreviewCount(1)))
            .where("#", Predicates.any())
            .build())
        .tooltips(
            Component.translatable("gtceu.universal.tooltip.base_production_eut", GTValues.V[GTValues.IV] * 2),
            Component.translatable("gtceu.multiblock.turbine.efficiency_tooltip", GTValues.VNF[GTValues.IV]))
        .workableCasingModel("gtceu:block/casings/mechanic/machine_casing_turbine_titanium",
            "gtceu:block/multiblock/generator/large_steam_turbine")
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
