/** /kjs inventory will be your friend. */

JEIEvents.hideItems(event => {
    const gtMachines = ["extractor", "macerator", "compressor", "forge_hammer", "furnace", "alloy_smelter"]
    if (!doSteamAge) {
        // Hide GT Steam Age items
        gtMachines.forEach(machine => {
            event.hide([`gtceu:lp_steam_${machine}`, `gtceu:hp_steam_${machine}`])
        })
        event.hide(["gtceu:firebrick", "gtceu:firebricks", "gtceu:primitive_blast_furnace"])
        event.hide(/fireclay/)

        // Hide Bronze tier storage
        event.hide("sophisticatedstorage:iron_barrel")
        event.hide("sophisticatedstorage:iron_chest")
        event.hide("sophisticatedstorage:iron_shulker_box")
        event.hide(/^sophisticatedstorage:.*iron.*tier_upgrade$/)

    }
    // Sophisticated compacting upgrades
    if (!doCompacting) {
        event.hide(/^sophisticated.*(compacting|compression)_upgrade$/)
        event.hide(/^functionalstorage:.*compacting.*_drawer$/)
    }
    if(!doMeowniPlush) {
        event.hide("kubejs:meowni_plush")
    }
    if (!doHNN) {
        event.hide(/^hostilenetworks/)
    }
    if(doHarderRecipes) {
        event.hide("watercollector:watercollector")
    }
    if (!doLaserIO) {
        event.hide(/^laserio:laser/)
        event.hide(/^laserio:filter/)
        event.hide(/^laserio:card_/)
        event.hide("laserio:overclocker_node")
        event.hide("laserio:overclocker_card")
    }
    if(!doConverters) {
        event.hide(/^gtceu:[A-Za-z0-9]+_[A-Za-z0-9]+_energy_converter$/)
        event.hide(/^gtceu:[A-Za-z0-9]+_[A-Za-z0-9]+_energy_converter$/)
    }
})

JEIEvents.removeCategories(event => {
    if (!doHNN) {
        event.remove("hostilenetworks:loot_fabricator")
        event.remove("hostilenetworks:sim_chamber")
    }
})
