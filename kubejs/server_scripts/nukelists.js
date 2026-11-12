// priority: -10
/**
 * Removes all tags from objects on the nukelists and deletes all recipes & uses for them.
 *
 * Also does the same for items matching the Unification Patterns.
 */
ServerEvents.tags("item", event => {
    event.removeAllTagsFrom(global.itemNukeList)

    // Remove tags from items matching the unification patterns.
    // For definitions, see KubeJS/startup_scripts/nukeLists/unificationPatterns.js
    event.removeAllTagsFrom(global.unificationPattern)
})
ServerEvents.tags("fluid", event => {
    event.removeAllTagsFrom(global.fluidNukeList)
})

ServerEvents.recipes(event => {

    let ignoreTypes = [
        { type: "minecraft:crafting" },
        { type: "minecraft:smelting" }
    ];

    // Create arrays to hold data
    let itemRemoveParams = [];
    let fluidRemoveParams = [];

    // Adds items contained in KubeJS/startup_scripts/nukeLists/item.js
    global.itemNukeList.forEach(item => {
        // Push each item to the remove list
        itemRemoveParams.push({ output: item });
        itemRemoveParams.push({ input: item });
    })

    // Remove all items in the remove list
    event.remove(itemRemoveParams);

    // Reset the remove list to add buckets into it
    itemRemoveParams = [];

    // Adds fluids contained in KubeJS/startup_scripts/nukeLists/fluid.js
    global.fluidNukeList.forEach(fluid => {
        // Push each fluid to the remove list
        fluidRemoveParams.push({ not: ignoreTypes, output: fluid });
        fluidRemoveParams.push({ not: ignoreTypes, input: fluid });

        // Get rid of recipes involving the buckets too
        itemRemoveParams.push({ output: fluid.concat("_bucket") });
        itemRemoveParams.push({ input: fluid.concat("_bucket") })
    })

    // Use KubeJS optimizations to remove all recipes at once, rather than repeatedly check entire recipe registry for each
    event.remove(fluidRemoveParams)
    event.remove(itemRemoveParams)

    // Remove recipes that use items matching the unification patterns.
    // For definitions, see KubeJS/startup_scripts/nukeLists/unificationPatterns.js
    event.remove([{ output: global.unificationPattern }, { input: global.unificationPattern }])
})
