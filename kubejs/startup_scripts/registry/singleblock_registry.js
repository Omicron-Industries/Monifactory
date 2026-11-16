/**
 * Singleblock registry.
 * This is the place where the Atomic Reconstructor machine/recipe type is defined
 * and custom Parallel Control hatches.
 */
const $ParallelHatchPartMachine = Java.loadClass("com.gregtechceu.gtceu.common.machine.multiblock.part.ParallelHatchPartMachine")

/**
 * Extended Crafting table tier corresponding to each Extended Crafter tier.
 * Change tooltips and translations too, if you are changing this.
 */
global.extendedCrafterTables = {
    mv: "advanced",
    hv: "elite",
    ev: "elite",
    iv: "elite",
    luv: "ultimate",
    zpm: "ultimate",
    uv: "ultimate",
    uhv: "epic",
    uev: "epic",
}

GTCEuStartupEvents.registry("gtceu:recipe_type", event => {
    // GT Atomic Reconstructor recipe type
    event.create("atomic_reconstruction")
        .category("reconstruction")
        .setEUIO("in")
        .setMaxIOSize(1, 1, 0, 0)
        .setSlotOverlay(false, false, GuiTextures.ARROW_INPUT_OVERLAY)
        .setProgressBar(MoniGuiTextures.PROGRESS_BAR_RECONSTRUCTION, FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ELECTROLYZER)


    // GT Extended Crafter recipe type

    // This will get players discussing lmao
    // Pls let this easter egg be, for fun
    const progressBars = [
        GuiTextures.PROGRESS_BAR_ARROW_MULTIPLE,
        GuiTextures.PROGRESS_BAR_UNPACKER,
    ]
    event.create("extended_crafting")
        .category("extended_crafting")
        .setEUIO("in")
        .setMaxIOSize(24, 1, 0, 0)
        .setSlotOverlay(false, false, GuiTextures.RESEARCH_STATION_OVERLAY)
        .setSlotOverlay(true, false, GuiTextures.BOX_OVERLAY)
        .setProgressBar(progressBars[Math.floor(Math.random() * progressBars.length)], FillDirection.LEFT_TO_RIGHT)
        .setSound(GTSoundEntries.ASSEMBLER)
})

GTCEuStartupEvents.registry("gtceu:machine", event => {
    // GT Atomic Reconstructor machine
    event.create("atomic_reconstructor", "simple")
        .tiers(GTValues.LV, GTValues.MV, GTValues.HV, GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM, GTValues.UV, GTValues.UHV, GTValues.UEV)
        .definition((tier, builder) =>
            builder
                .langValue(`${GTValues.VLVH[tier]} Atomic Reconstructor`)
                .recipeType("atomic_reconstruction")
                .workableTieredHullModel("gtceu:block/machines/reconstructor")
        )

    // GT Extended Crafter machine
    event.create("extended_crafter", "simple")
        .tiers(GTValues.MV, GTValues.HV, GTValues.EV, GTValues.IV, GTValues.LuV, GTValues.ZPM, GTValues.UV, GTValues.UHV, GTValues.UEV)
        .definition((tier, builder) =>
            builder
                .langValue(`${GTValues.VLVH[tier]} Extended Crafter`)
                .recipeType("extended_crafting")
                .workableTieredHullModel(`gtceu:block/machines/extended_crafter/${global.extendedCrafterTables[GTValues.VN[tier].toLowerCase()]}`)
        )
})


// Giga, Omega Parallel Hatches
GTCEuStartupEvents.registry("gtceu:machine", event => {
    event.create("uhv_parallel_hatch", "custom")
        .machine((holder, tier) => {
            return new $ParallelHatchPartMachine(holder, tier);
        })
        .tiers(GTValues.UHV)
        .definition((tier, builder) =>
            builder
                .rotationState(RotationState.ALL)
                .abilities(PartAbility.PARALLEL_HATCH)
                .workableTieredHullModel(GTCEu.id("block/machines/parallel_hatch_mk9"))
        )

    event.create("uev_parallel_hatch", "custom")
        .machine((holder, tier) => {
            return new $ParallelHatchPartMachine(holder, tier);
        })
        .tiers(GTValues.UEV)
        .definition((tier, builder) =>
            builder
                .rotationState(RotationState.ALL)
                .abilities(PartAbility.PARALLEL_HATCH)
                .workableTieredHullModel(GTCEu.id("block/machines/parallel_hatch_mk10"))
        )
})
