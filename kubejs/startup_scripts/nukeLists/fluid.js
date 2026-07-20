// priority: 800
/*
The fluidNukeList is used to list all IDs of fluids that should be removed from the game, or "nuked".
While this makes it far more difficult to access the fluids and effectively obliterates them in most cases,
it doesn't remove them entirely and does not guarantee that they are unobtainable, unusable, or hidden in JEI/EMI.

If you seek to hide a fluid but not remove it, use KubeJS/client_scripts/JEI.js.
If you seek to remove a recipe but not hide any fluids, use the relevant file in KubeJS/server_scripts.
*/
global.fluidNukeList = [
    // Ad Astra
    "ad_astra:oxygen",
    "ad_astra:hydrogen",
    "ad_astra:oil",
    "ad_astra:fuel",
    "ad_astra:cryo_fuel",

    // Ender IO
    "enderio:cloud_seed_concentrated",
    "enderio:cloud_seed",
    "enderio:fire_water",
    "enderio:hootch",
    "enderio:liquid_sunshine",
    "enderio:nutrient_distillation",
    "enderio:rocket_fuel",
    "enderio:vapor_of_levity",

    // GregTech Modern
    "gtceu:americium_plasma",
    "gtceu:molten_kanthal",
    "gtceu:iron_ii_chloride",   // Removing the FluidProperty causes errors in GT's hard-coded recipes

    // Thermal Series
    "cofh_core:experience",
    "thermal:creosote",
    "thermal:glowstone",
    "thermal:redstone",
    "thermal:crude_oil",
    "thermal:heavy_oil",
    "thermal:light_oil",
    "thermal:refined_fuel",

    // Sophisticated Core
    "sophisticatedcore:xp_still",

    // Systeams
    "systeams:steamier",
    "systeams:steamiest",
    "systeams:steamiester",
    "systeams:steamiestest",

]

// Advanced AE Compat
if (Platform.isLoaded("advanced_ae")) {
    global.fluidNukeList.push(
        "advanced_ae:quantum_infusion",
        "advanced_ae:quantum_infusion_source"
    )
}

StartupEvents.postInit(event => {
    /**
     * NuclearCraft is most easily dealt with by removing *everything* but a select few fluids
     */
    // Get all of the NuclearCraft fluids
    let NCFluids = Fluid.getTypes().filter(id => id.includes("nuclearcraft"))

    // NuclearCraft fluids to not nuke
    let NCFluidsToKeep = [
        "nuclearcraft:hydrated_gelatin",
        "nuclearcraft:gelatin",
        "nuclearcraft:sugar",
        "nuclearcraft:marshmallow",
        "nuclearcraft:cocoa_butter",
        "nuclearcraft:pasteurized_milk",
        "nuclearcraft:chocolate_liquor",
        "nuclearcraft:unsweetened_chocolate",
        "nuclearcraft:dark_chocolate",
        "nuclearcraft:milk_chocolate",
        "nuclearcraft:technical_water",
        "nuclearcraft:high_pressure_steam",
    ]

    // Add depleted fuels, or else fission reactors won't run
    NCFluidsToKeep = NCFluidsToKeep.concat(NCFluids.filter(id => id.includes("depleted_fuel")))

    // Add flowing fluid variants to the list of fluids to keep
    NCFluidsToKeep.forEach(fluid => { NCFluidsToKeep.push(`${fluid}_flowing`) })

    // Remove used fluids from the full list of NC fluids
    let NCFluidsToRemove = NCFluids.filter((el) => !NCFluidsToKeep.includes(el))

    // Add all the unwanted NuclearCraft fluids to the nukeList
    global.fluidNukeList = global.fluidNukeList.concat(NCFluidsToRemove)
})
