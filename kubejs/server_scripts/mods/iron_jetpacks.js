/**
 * Custom recipes for the Iron Jetpacks mod
 */
ServerEvents.recipes(event => {
    // Thermal

    // Generate thermal thruster recipes
    const thermalThrusters = [
        ["leadstone", "lead", "lead", "steamdynamo:steam_dynamo"],
        ["hardened", "invar", "invar", "thermal:dynamo_magmatic"],
        ["reinforced", "aluminium", "electrum", "thermal:dynamo_compression"],
        ["resonant", "enderium", "enderium", "thermal:dynamo_numismatic"]
    ]

    thermalThrusters.forEach(([newTier, plate1, plate2, dynamo]) => {
        event.recipes.gtceu.shaped(Item.of(`kubejs:${newTier}_thruster`), [
            "PCP",
            "MDM",
            "BBB"
        ], {
            P: `#forge:plates/${plate1}`,
            M: `#forge:plates/${plate2}`,
            C: "thermal:rf_coil",
            D: dynamo,
            B: "#forge:plates/red_alloy"
        }).id(`kubejs:ironjetpacks/thrusters/${newTier}`)
            .addMaterialInfo();
    })

    // Generate EnderIO thruster recipes
    const eioThrusters = [
        ["conductive_iron", "conductive_alloy", "1", "kubejs:resonating_crystal", "gtceu:red_alloy_plate"],
        ["electrical_steel", "electrical_steel", "1", "enderio:pulsating_crystal", Item.of("kubejs:conductive_iron_thruster").weakNBT()],
        ["energetic", "energetic_alloy", "2", "enderio:vibrant_crystal", Item.of("kubejs:electrical_steel_thruster").weakNBT()],
        ["vibrant", "vibrant_alloy", "3", "enderio:prescient_crystal", Item.of("kubejs:energetic_thruster").weakNBT()]
    ]

    eioThrusters.forEach(([newTier, plate, card, crystal, lastTier]) => {
        event.recipes.gtceu.shaped(Item.of(`kubejs:${newTier}_thruster`), [
            "PCP",
            "PRP",
            "BTB"
        ], {
            P: `#forge:plates/${plate}`,
            C: `laserio:energy_overclocker_card_tier_${card}`,
            R: crystal,
            T: lastTier,
            B: "gtceu:red_alloy_plate"
        }).id(`kubejs:ironjetpacks/thrusters/${newTier}`)
            .addMaterialInfo();
    })

    // Special thrusters

    // Dark Soularium
    event.recipes.gtceu.shaped(Item.of("kubejs:dark_soularium_thruster"), [
        "ICI",
        "IFI",
        "TTT"
    ], {
        I: "gtceu:double_dark_soularium_plate",
        C: "gtceu:cryolobus_frame",
        F: "enderio:weather_crystal",
        T: Item.of("kubejs:vibrant_thruster").weakNBT()
    }).id("kubejs:ironjetpacks/thrusters/dark_soularium")
        .addMaterialInfo();

    // Fluxed
    event.recipes.gtceu.shaped(Item.of("kubejs:fluxed_thruster"), [
        " P ",
        "PSP",
        "STS"
    ], {
        P: "redstone_arsenal:flux_plating",
        S: "gtceu:double_signalum_plate",
        T: Item.of("kubejs:resonant_thruster").weakNBT()
    }).id("kubejs:ironjetpacks/thrusters/fluxed")
        .addMaterialInfo();

    //
    // Jetpacks
    //

    /**
     * Copies old jetpack nbt to the new jetpack
     * @param {Internal.ModifyRecipeCraftingGrid} grid
     * @param {Internal.ItemStack} result
     * @returns {Internal.ItemStack}
     */
    const copyOldJetpackData = (grid, result) => {
        let item = grid.find("ironjetpacks:jetpack")
        if (!item.nbt) {
            return result;
        }

        let nbt = {};
        if (item.nbt.Energy) {
            nbt.Energy = item.nbt.Energy
        }
        if (item.nbt.Engine) {
            nbt.Engine = item.nbt.Engine
        }
        if (item.nbt.Hover) {
            nbt.Hover = item.nbt.Hover
        }
        if (item.nbt.Throttle) {
            nbt.Throttle = item.nbt.Throttle
        }
        return result.withNBT(nbt);
    }

    /**
     * @type {Internal.Ingredient[][]}
     */
    const jetpackBase = [
        ["leadstone", "ironjetpacks:strap", "lead", "thermal:flux_capacitor"],
        ["conductive_iron", "ironjetpacks:strap", "conductive_alloy", "enderio:basic_capacitor"]
    ]

    /**
     * @type {Internal.Ingredient[][]}
     */
    const jetpackUpgrade = [
        ["hardened", "leadstone", "invar", Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:hardened"}').weakNBT()],
        ["reinforced", "hardened", "electrum", Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:reinforced"}').weakNBT()],
        ["resonant", "reinforced", "enderium", Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:resonant"}').weakNBT()],
        ["electrical_steel", "conductive_iron", "electrical_steel", "enderio:double_layer_capacitor"],
        ["energetic", "electrical_steel", "energetic_alloy", "enderio:octadic_capacitor"],
        ["vibrant", "energetic", "vibrant_alloy", "kubejs:compressed_octadic_capacitor"]
    ]

    jetpackBase.forEach(([newTier, middlePart, plate, energyCapacitor]) => {
        event.shaped(Item.of("ironjetpacks:jetpack", `{Id:"ironjetpacks:${newTier}",Throttle:1.0d}`).strongNBT(), [
            "PEP",
            "PSP",
            "T T"
        ], {
            P: `#forge:plates/${plate}`,
            E: energyCapacitor,
            S: middlePart,
            T: Item.of(`kubejs:${newTier}_thruster`).weakNBT()
        }).id(`kubejs:ironjetpacks/base/${newTier}`);
    })

    jetpackUpgrade.forEach(([newTier, previousTier, plate, energyCapacitor]) => {
        event.shaped(Item.of("ironjetpacks:jetpack", `{Id:"ironjetpacks:${newTier}"}`).strongNBT(), [
            "PEP",
            "PSP",
            "T T"
        ], {
            P: `#forge:plates/${plate}`,
            E: energyCapacitor,
            S: Item.of("ironjetpacks:jetpack", `{Id:"ironjetpacks:${previousTier}"}`).weakNBT(),
            T: Item.of(`kubejs:${newTier}_thruster`).weakNBT()
        }).modifyResult(copyOldJetpackData).id(`kubejs:ironjetpacks/upgrade/${newTier}`);
    })

    event.recipes.gtceu.assembly_line("kubejs:ironjetpacks/upgrade/dark_soularium")
        .itemInputs(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:vibrant"}').weakNBT(), "gtceu:dark_soularium_block", "better_angel_ring:angel_ring", "2x enderio:ender_crystal", "kubejs:double_compressed_octadic_capacitor", "4x #gtceu:circuits/luv", Item.of("kubejs:dark_soularium_thruster", 2))
        .inputFluids("gtceu:advanced_soldering_alloy 1152")
        .itemOutputs(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:dark_soularium"}').strongNBT())
        .duration(3000)
        .EUt(GTValues.VA[GTValues.LuV])
        .stationResearch(b => b
            .researchStack(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:vibrant"}'))
            .EUt(GTValues.VHA[GTValues.IV])
            .CWUt(64))
        .modifyResult(copyOldJetpackData)

    event.recipes.gtceu.assembly_line("kubejs:ironjetpacks/upgrade/fluxed")
        .itemInputs(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:resonant"}').weakNBT(), "redstone_arsenal:flux_chestplate", "better_angel_ring:angel_ring", "2x kubejs:compressed_octadic_capacitor", "3x #gtceu:circuits/luv", Item.of("kubejs:fluxed_thruster", 2))
        .inputFluids("gtceu:advanced_soldering_alloy 1152", "kubejs:molten_cryotheum 10000")
        .itemOutputs(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:fluxed"}').strongNBT())
        .duration(3000)
        .EUt(GTValues.VA[GTValues.LuV])
        .stationResearch(b => b
            .researchStack(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:resonant"}'))
            .EUt(GTValues.VHA[GTValues.IV])
            .CWUt(64))
        .modifyResult(copyOldJetpackData)

    //
    // Misc
    //

    // Cells, thermal exp.
    event.recipes.gtceu.shaped(Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:hardened"}').strongNBT(), [
        " A ",
        "BCB",
        "ADA"
    ], {
        A: "minecraft:redstone",
        B: "gtceu:invar_ingot",
        C: "thermal:flux_capacitor",
        D: "gtceu:tin_ingot"
    }).id("kubejs:ironjetpacks/cells/hardened").addMaterialInfo();

    event.recipes.gtceu.shaped(Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:reinforced"}').strongNBT(), [
        " A ",
        "BCB",
        "ADA"
    ], {
        A: "minecraft:redstone",
        B: "gtceu:electrum_ingot",
        C: Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:hardened"}').weakNBT(),
        D: "#enderio:fused_quartz"
    }).id("kubejs:ironjetpacks/cells/reinforced").addMaterialInfo();

    event.recipes.gtceu.shaped(Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:resonant"}').strongNBT(), [
        " A ",
        "BCB",
        "ADA"
    ], {
        A: "minecraft:redstone",
        B: "gtceu:enderium_ingot",
        C: Item.of("ironjetpacks:cell", '{Id:"ironjetpacks:reinforced"}').weakNBT(),
        D: "kubejs:pyrotheum_dust"
    }).id("kubejs:ironjetpacks/cells/resonant").addMaterialInfo();
})


ServerEvents.tags("item", event => {
    // Mark regular jetpacks from the ironjetpacks mod to include the NBT data when FTB Quests
    // checks for task completion.
    event.add("itemfilters:check_nbt", "ironjetpacks:jetpack");
});
