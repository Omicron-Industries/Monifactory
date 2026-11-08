/**
 *
 * Hide a couple items from Architect's Palette.
 * Recipes replace these items
 *
 */
if (Platform.isLoaded("crazyae2addons")) {
    console.log("Crazy AE2 Addons found, loading client compat scripts...")

    JEIEvents.hideItems(event => {
        // Hide Recipe Fabricator item removed from recipes.
        event.hide([
            "crazyae2addons:recipe_fabricator"
        ])
    })
}
