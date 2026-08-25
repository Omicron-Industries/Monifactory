// priority: 800
/*
The itemNukeList is used to list all IDs and regexes matching IDs of items that should be removed from the game, or "nuked".
While this makes it far more difficult to access the items and effectively obliterates them in most cases,
it doesn't remove them entirely and does not guarantee that they are unobtainable, unusable, or hidden in EMI/JEI.

Examples of such cases are:
- Items that may drop from a loot table (not unobtainable)
- Items that provide right-click functionality (not unusable)
- ExtendedCrafting Singularities, which have a special recipe page which cannot be hidden by normal means (not hidden in EMI/JEI)

If you seek to hide an item but not remove it, use KubeJS/client_scripts/JEI.js.
If you seek to remove a recipe but not hide any items, use the relevant file in KubeJS/server_scripts.
*/
global.itemNukeList = [
    // Ad Astra
    "ad_astra:cable_duct",
    "ad_astra:coal_generator",
    "ad_astra:compressor",
    "ad_astra:cryo_freezer",
    "ad_astra:desh_cable",
    "ad_astra:desh_fluid_pipe",
    "ad_astra:energizer",
    "ad_astra:energizer",
    "ad_astra:engine_frame",
    "ad_astra:etrionic_blast_furnace",
    "ad_astra:etrionic_capacitor",
    "ad_astra:etrionic_core",
    "ad_astra:fan",
    "ad_astra:fluid_pipe_duct",
    "ad_astra:fuel_refinery",
    "ad_astra:ostrum_fluid_pipe",
    "ad_astra:photovoltaic_etrium_cell",
    "ad_astra:photovoltaic_vesnium_cell",
    "ad_astra:solar_panel",
    "ad_astra:steel_cable",
    "ad_astra:water_pump",
    /^ad_astra:.*_bucket$/,

    // Applied Energistics 2
    "ae2:vibration_chamber",

    // Better Angel Ring
    "better_angel_ring:ring",

    // CBMultipart
    /cb_microblock:.*/,

    // Chisels & Bits
    "chiselsandbits:block_bit",

    // EnderIO
    "enderio:alloy_smelter",
    "enderio:clayed_glowstone",
    "enderio:conductive_alloy_grinding_ball",
    /^enderio:[\w_]*conduit/,
    /^enderio:[\w_]+_capacitor_bank$/,
    "enderio:confusing_powder",
    "enderio:copper_alloy_grinding_ball",
    "enderio:dark_steel_grinding_ball",
    "enderio:end_steel_grinding_ball",
    "enderio:energetic_alloy_grinding_ball",
    "enderio:flour",
    "enderio:industrial_insulation_block",
    "enderio:nethercotta",
    "enderio:organic_black_dye",
    "enderio:organic_brown_dye",
    "enderio:organic_green_dye",
    "enderio:plant_matter_brown",
    "enderio:plant_matter_green",
    "enderio:powered_spawner",
    "enderio:primitive_alloy_smelter",
    "enderio:pulsating_alloy_grinding_ball",
    "enderio:redstone_alloy_grinding_ball",
    "enderio:sag_mill",
    "enderio:silicon",
    "enderio:soul_powder",
    "enderio:soularium_grinding_ball",
    "enderio:stirling_generator",
    "enderio:vibrant_alloy_grinding_ball",
    /^enderio:painted_/,
    /^enderio:powdered_/,
    "enderio:infinity_rod",
    "enderio:vibrant_photovoltaic_module",
    "enderio:energetic_photovoltaic_module",
    "enderio:pulsating_photovoltaic_module",
    "enderio:light",
    "enderio:light_inverted",
    "enderio:powered_light",
    "enderio:powered_light_inverted",
    "enderio:powered_light_wireless",
    "enderio:powered_light_inverted_wireless",
    "enderio:glider_wing",
    "enderio:nutritious_stick",

    // ExtendedAE
    "expatternprovider:silicon_block",
    "expatternprovider:circuit_cutter",
    /^expatternprovider.*cutter/,

    // Extended Crafting
    "extendedcrafting:auto_ender_crafter",
    "extendedcrafting:auto_flux_crafter",
    "extendedcrafting:black_iron_slate",
    "extendedcrafting:compressor",
    "extendedcrafting:ender_alternator",
    "extendedcrafting:ender_catalyst",
    "extendedcrafting:ender_component",
    "extendedcrafting:ender_crafter",
    "extendedcrafting:ender_star",
    "extendedcrafting:enhanced_ender_catalyst",
    "extendedcrafting:enhanced_ender_component",
    "extendedcrafting:enhanced_redstone_catalyst",
    "extendedcrafting:enhanced_redstone_component",
    "extendedcrafting:flux_alternator",
    "extendedcrafting:flux_crafter",
    "extendedcrafting:flux_star",
    "extendedcrafting:frame",
    "extendedcrafting:recipe_maker",
    "extendedcrafting:singularity",
    /^extendedcrafting:crystaltine_(?!c)[\w_]+/,

    // GTCEu: Modern
    "gtceu:hot_kanthal_ingot",
    "gtceu:hot_silicon_ingot",
    "gtceu:milk",
    "gtceu:steel_machine_casing",
    "gtceu:uv_world_accelerator",
    "gtceu:mv_solar_panel",
    "gtceu:hv_solar_panel",
    "gtceu:ev_solar_panel",
    "gtceu:iv_solar_panel",
    "gtceu:luv_solar_panel",
    "gtceu:zpm_solar_panel",
    "gtceu:uv_solar_panel",
    "gtceu:configurable_maintenance_hatch",
    /^gtceu:(ev|iv|luv|zpm|uv|uhv|uev|max)_\w+a_energy_converter/,
    /^gtceu:uiv/,
    /^gtceu:uxv/,
    /^gtceu:opv/,
    /^gtmutils.uiv/,
    /^gtmutils:uxv/,
    /^gtmutils:opv/,

    // Hammerlib
    /^hammerlib:/,

    // HNN
    "hostilenetworks:deep_learner",
    "hostilenetworks:twilight_prediction",

    // Iron Furnaces
    "ironfurnaces:augment_blasting",
    "ironfurnaces:augment_generator",
    "ironfurnaces:augment_smoking",
    "ironfurnaces:heater",
    "ironfurnaces:item_heater",
    "ironfurnaces:item_spooky",
    "ironfurnaces:item_xmas",
    "ironfurnaces:rainbow_coal",
    "ironfurnaces:rainbow_core",
    "ironfurnaces:rainbow_plating",
    "ironfurnaces:allthemodium_furnace",
    "ironfurnaces:vibranium_furnace",
    "ironfurnaces:unobtainium_furnace",
    "ironfurnaces:million_furnace",
    "ironfurnaces:upgrade_allthemodium",
    "ironfurnaces:upgrade_vibranium",
    "ironfurnaces:upgrade_unobtainium",

    // TODO renable this again. why in the fuck did we disable this?
    // No upgrade consumables to go from diamond to obsidian or iron to silver without re-enabling more furnaces
    "ironfurnaces:upgrade_iron",
    "ironfurnaces:upgrade_gold",
    "ironfurnaces:upgrade_diamond",
    "ironfurnaces:upgrade_emerald",
    "ironfurnaces:upgrade_obsidian",
    "ironfurnaces:upgrade_crystal",
    "ironfurnaces:upgrade_netherite",
    "ironfurnaces:upgrade_copper",
    "ironfurnaces:upgrade_obsidian2",
    "ironfurnaces:upgrade_silver",
    "ironfurnaces:upgrade_obsidian2",
    "ironfurnaces:upgrade_iron2",
    "ironfurnaces:upgrade_gold2",
    "ironfurnaces:upgrade_silver2",
    "ironfurnaces:crystal_furnace",
    "ironfurnaces:emerald_furnace",
    "ironfurnaces:item_linker",

    // Iron Jetpacks
    "ironjetpacks:advanced_coil",
    "ironjetpacks:basic_coil",
    "ironjetpacks:capacitor",
    "ironjetpacks:cell",
    "ironjetpacks:elite_coil",
    "ironjetpacks:thruster",
    "ironjetpacks:ultimate_coil",

    // Just Another Void Dimension (JAVD)
    "javd:portal_block",

    // KubeJS
    "kubejs:debug_ctm_block",
    "kubejs:corrupted_universe_data",
    "kubejs:shattered_universe_data",

    // LaserIO
    "laserio:logic_chip",
    "laserio:logic_chip_raw",

    // Megacells
    "megacells:mega_crafting_accelerator",
    /^megacells:.*mega_interface$/,
    /^megacells:.*mega_pattern_provider$/,
    /^megacells:sky_steel/,

    // PackagedExCrafting
    "packagedexcrafting:basic_crafter",
    "packagedexcrafting:ender_crafter",
    "packagedexcrafting:flux_crafter",

    // Phoenix Fission
    "phoenix_fission:heat_exchanger",
    "phoenix_fission:fissile_heat_safe_casing",
    "phoenix_fission:fissile_reaction_safe_casing",

    // Project Red
    "projectred_core:silicon",
    "projectred_core:sand_coal_comp",
    "projectred_core:red_iron_comp",
    "projectred_core:electrotine_iron_comp",
    "projectred_core:peridot",
    "projectred_core:sapphire",
    "projectred_core:ruby",
    "projectred_core:electrotine_dust",
    "projectred_core:electrotine_generator",
    "projectred_core:electrotine_ingot",
    "projectred_core:red_ingot",
    "projectred_core:sail",
    "projectred_core:woven_cloth",
    "projectred_core:motor",
    "projectred_core:gold_coil",
    "projectred_core:iron_coil",
    "projectred_core:copper_coil",
    "projectred_core:boule",
    "projectred_core:draw_plate",
    "projectred_core:multimeter",
    "projectred_transmission:low_load_power_wire",
    "projectred_transmission:low_load_framed_power_wire",

    // Solar Flux
    /^solarflux:.*/,

    // Looking for removed Sophisticated Storage items?
    // Look in configs/sophisticatedcore-common.toml.
    // SophStorage offers a way to remove items from the registry with config.

    // Systeams
    "systeams:disenchantment_boiler",
    "systeams:lapidary_boiler",
    "systeams:steamiestest_ball",

    // Telepastries
    "telepastries:custom_cake2",
    "telepastries:custom_cake3",
    "telepastries:twilight_cake",

    // Thermal Series
    "thermal:apatite",
    "thermal:bitumen",
    "thermal:cinnabar",
    "thermal:coal_coke_block",
    "thermal:coal_coke",
    "thermal:constantan_coin",
    "thermal:cured_rubber",
    "thermal:drill_head",
    "thermal:dynamo_disenchantment",
    "thermal:dynamo_lapidary",
    "thermal:dynamo_stirling",
    "thermal:niter",
    "thermal:oil_red_sand",
    "thermal:oil_sand",
    "thermal:raw_rubber",
    "thermal:rubber",
    "thermal:ruby",
    "thermal:sapphire",
    "thermal:saw_blade",
    "thermal:sawdust",
    "thermal:sulfur",
    "thermal:tar",
    "thermal:tar_block",
    "thermal:refined_fuel_bucket",
    /^thermal:.*_cast$/,

    // Thermal Series Machines
    "thermal:machine_furnace",
    "thermal:machine_sawmill",
    "thermal:machine_pulverizer",
    "thermal:machine_smelter",
    "thermal:machine_centrifuge",
    "thermal:machine_chiller",
    "thermal:machine_refinery",
    "thermal:machine_pyrolyzer",
    "thermal:machine_bottler",
    "thermal:machine_brewer",
    "thermal:machine_crystallizer",
    "thermal:device_xp_condenser",

    // Wireless Chargers
    "wirelesschargers:basic_wireless_block_charger",
    "wirelesschargers:advanced_wireless_block_charger",
];

// Create Compat
// Removes machines related to processing
if (Platform.isLoaded("create")) {
    global.itemNukeList.push(
        "create:millstone",
        "create:crushing_wheel",
        "create:mechanical_plough",
        "create:mechanical_crafter",
        "create:mechanical_mixer",
        "create:mechanical_saw",
        "create:mechanical_drill",
        "create:mechanical_harvester",
        "create:mechanical_press",
        "create:mechanical_roller",
        "create:encased_fan"
    );
}

// If not doing boilers, nuke them.
if (!global.doBoilers) {
    global.itemNukeList.push(
        "systeams:stirling_boiler",
        "systeams:compression_boiler",
        "systeams:gourmand_boiler",
        "systeams:magmatic_boiler",
        "systeams:numismatic_boiler",
    );
}
