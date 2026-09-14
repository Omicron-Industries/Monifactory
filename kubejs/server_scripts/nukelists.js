// priority: -10
/**
 * Removes all tags from objects on the nukelists and deletes all recipes & uses for them.
 *
 * Also does the same for items matching the Unification Patterns.
 */
ServerEvents.tags("item", event => {
    event.removeAllTagsFrom(global.itemNukeList)

    // Remove tags from items matching the unification patterns.
    // For definitions, see KubeJS/startup_scripts/unificationPatterns.js
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

    global.itemNukeList.forEach(item => {
        event.remove([{ output: item }, { input: item }])
    })

    global.fluidNukeList.forEach(fluid => {
        event.remove([
            {not: ignoreTypes, output: fluid},
            {not: ignoreTypes, input: fluid}
        ])

        // Get rid of recipes involving the buckets too
        event.remove([{ output: fluid.concat("_bucket") }, { input: fluid.concat("_bucket") }])
    })

    // Remove recipes that use items matching the unification patterns.
    // For definitions, see KubeJS/startup_scripts/unificationPatterns.js
    event.remove([{ output: global.unificationPattern }, { input: global.unificationPattern }])
})
