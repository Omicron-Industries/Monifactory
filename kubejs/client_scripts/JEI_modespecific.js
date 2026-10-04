/** /kjs inventory will be your friend. */

JEIEvents.hideItems(event => {
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
