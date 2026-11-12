/** Shamelessly stolen from A&B :) */
/** Let's NOT delete this in case we need it for something else in the future but it should be commented out when we enter 0.15 cycle.*/

const MetaMachine = Java.loadClass("com.gregtechceu.gtceu.api.machine.MetaMachine")

function opposite(face) {
    if (face.equals("down"))
        return "up"
    if (face.equals("east"))
        return "west"
    if (face.equals("west"))
        return "east"
    if (face.equals("north"))
        return "south"
    if (face.equals("south"))
        return "north"
    return "down"
}

BlockEvents.placed(event => {
    let block = event.getBlock()

    // Set energy converters to feToEu mode when placed
    if (block.getId().startsWith("gtceu:") && block.getId().endsWith("_energy_converter")) {
        MetaMachine.getMachine(event.getLevel(), event.getBlock().pos).setFeToEu(true)
    }

    // Blocks below these line only get their placements altered if they were placed by an entity
    if (event.getEntity() == null) return

    // Reverse placed Dynamos on Sneak
    if (block.getId().startsWith("thermal:dynamo") || (block.getId().startsWith("systeams:"))) { // systeams:steam is not a block thankfully
        let properties = block.getProperties()
        if (event.getEntity().isCrouching()) {
            properties["facing"] = opposite(properties["facing"].toString())
            block.set(block.getId(), properties)
        }
    }

})
