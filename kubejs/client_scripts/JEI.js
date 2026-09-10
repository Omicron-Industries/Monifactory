/**
 * Hide items, fluids, and recipes in EMI/JEI.
 * "/kjs inventory" and "/kjs hand" are your friends for finding item and fluid IDs.
 *
 * If you seek to both hide an item/fluid and remove it from all recipes and tags, then look into
 * KubeJS/startup_scripts/nukeLists/item.js and KubeJS/startup_scripts/nukeLists/fluid.js
 */

JEIEvents.hideItems(event => {

    // Hide excess permutations of AE2 Facades
    event.hide("ae2:facade")
    event.hide(/^ae2:facade/)

    // Hide excess permutations of EnderIO Clear glass, Fused Quartz
    event.hide(/^enderio:clear_glass_.*_.*/)
    event.hide(/^enderio:fused_quartz_.*_.*/)

    // snad
    event.hide("snad:soul_snad")
    if (!doSnad) {
        event.hide(["snad:snad", "snad:red_snad"])
    }

    // fluxbore
    if (!doFluxbore) {
        event.hide("thermal:flux_drill")
    }

    // Hide GT ores to prevent clutter
    GTMaterialRegistry.getRegisteredMaterials().forEach(id => {
        event.hide([
            `gtceu:granite_${id.name}_ore`,
            `gtceu:diorite_${id.name}_ore`,
            `gtceu:andesite_${id.name}_ore`,
            `gtceu:red_granite_${id.name}_ore`,
            `gtceu:marble_${id.name}_ore`,
            `gtceu:deepslate_${id.name}_ore`,
            `gtceu:tuff_${id.name}_ore`,
            `gtceu:sand_${id.name}_ore`,
            `gtceu:red_sand_${id.name}_ore`,
            `gtceu:gravel_${id.name}_ore`,
            `gtceu:basalt_${id.name}_ore`,
            `gtceu:blackstone_${id.name}_ore`,
            `gtceu:moon_${id.name}_ore`,
            `gtceu:venus_${id.name}_ore`,
            `gtceu:mercury_${id.name}_ore`,
            `gtceu:mars_${id.name}_ore`,
            `gtceu:glacio_${id.name}_ore`
        ])
    })
})

JEIEvents.addItems(event => {
    // Add example AE2 facade after failing to hide all other facade permutations
    event.add(Item.of("ae2:facade", { item: "gtceu:infinity_block" }))

    // Iron Jetpacks' Cells are hard to selectively remove due to NBT shenanigans
    event.add(Item.of("ironjetpacks:cell", {Id: "ironjetpacks:hardened"}))
    event.add(Item.of("ironjetpacks:cell", {Id: "ironjetpacks:reinforced"}))
    event.add(Item.of("ironjetpacks:cell", {Id: "ironjetpacks:resonant"}))

    // Thermal
    event.add("thermal:nuke_tnt")
})

JEIEvents.hideFluids(event => {
    // Hide Ad Astra fluids
    Fluid.getTypes().filter(id=>id.includes("ad_astra")).forEach(id => event.hide(id))

    // Hide Thermal fluids
    event.hide("thermal:creosote")
    event.hide("cofh_core:experience")
    event.hide("thermal:glowstone")
    event.hide("thermal:redstone")

    // Hide Soph Core fluids
    event.hide("sophisticatedcore:xp_still")
})
