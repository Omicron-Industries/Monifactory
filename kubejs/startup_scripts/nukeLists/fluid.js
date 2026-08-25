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
