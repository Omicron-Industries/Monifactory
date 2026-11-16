/**
 * GregTech integration for Extended Crafting.
 * Adds Extended Crafters as workstations to Extended Crafting table categories in EMI.
 */
const $EmiRecipes = Java.loadClass("dev.emi.emi.registry.EmiRecipes")
const $EmiStack = Java.loadClass("dev.emi.emi.api.stack.EmiStack")

JEIEvents.information(() => {
    // Ordered by size, same as EMI category ids `extendedcrafting:<table>_crafting`
    const categoryTiers = ["advanced", "elite", "ultimate", "epic"]

    for (let category of $EmiRecipes.categories) {
        let id = `${category.getId()}`

        let match = id.match(/^extendedcrafting:(\w+)_crafting$/)
        if (!match) continue // Need to make sure we are adding to the correct categories
        let categoryTier = categoryTiers.indexOf(match[1])
        if (categoryTier < 0) continue // Not basic table

        Object.entries(global.extendedCrafterTables).forEach(([gtTier, gtTable]) => {
            // Reflect voltage tier gate. Bigger size = more advanced single block needed
            if (categoryTiers.indexOf(gtTable) < categoryTier) return

            // Add the GT machines as workstations. Cursed, I know, go read EMI source
            $EmiRecipes.addWorkstation(category, $EmiStack["of(net.minecraft.world.item.ItemStack)"](Item.of(`gtceu:${gtTier}_extended_crafter`)))
        })
    }
})
