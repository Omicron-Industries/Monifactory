// priority: 800
/**
 * This file defines RegEx patterns that match with large quantities of certain items.
 *
 * These items are "removed" in KubeJS/client_scripts/nukelists.js and KubeJS/server_scripts/nukelists.js
 * in a fashion similar to itemNukeList.
 */

/**
 * All gears, blocks, ingots, nuggets, etc. we don't want to remove
 */
global.unificationExcludedItems = [
    "enderio:dark_bimetal_gear",
    "enderio:energized_gear",
    "enderio:iron_gear",
    "enderio:reinforced_obsidian_block",
    "enderio:stone_gear",
    "enderio:vibrant_gear",
    "enderio:wood_gear",
    "enderio:infinity_rod",
    "enderio:experience_rod",
    "extendedcrafting:luminessence_block",
    "thermal:apple_block",
    "thermal:beetroot_block",
    "thermal:carrot_block",
    "thermal:potato_block",
    "thermal:sugar_cane_block",
    "thermal:basalz_rod",
    "thermal:blitz_rod",
    "thermal:blizz_rod"
];

/**
 * A RegEx pattern that matches with all gears, blocks, ingots, nuggets, and other often-unified items
 * from Thermal Series, EnderIO, Ad Astra, and ExtendedCrafting.
 */
global.unificationPattern = new RegExp(`^(?!(${global.unificationExcludedItems.join("|")})).*(thermal|enderio|ad_astra|extendedcrafting):((powdered_|raw_).*|.*(_block|_plate|_ingot|_nugget|_gear|_dust|_rod|_gem|_ore))`, "i")
