// priority: -9998
// This file also gens recipes for kubejs added recipes!
// @ts-check You might need probejs to look at this file with a straight face :P

/**
 * GregTech integration for Extended Crafting shaped recipes.
 */

/** @typedef {import("../../dx/typings/ExtendedCraftingJSONRecipe.d.mts").ExtendedCraftingJSONIngredient} ExtendedCraftingJSONIngredient */
/** @typedef {import("../../dx/typings/ExtendedCraftingJSONRecipe.d.mts").ExtendedCraftingJSONShapedTableRecipe} ExtendedCraftingJSONShapedTableRecipe */

ServerEvents.recipes(event => {
    // Ordered by size: basic is 3x3, epic is 11x11
    const tableTiers = ["basic", "advanced", "elite", "ultimate", "epic"]
    const voltageNames = Array.from(GTValues.VN, vn => `${vn}`.toLowerCase())

    // For each table tier, since which voltage can its recipes run?
    /** @type {number[]} */
    const minVoltageForTable = tableTiers.map((_, tableTier) => Math.min.apply(null,
        Object
            .entries(global.extendedCrafterTables)
            .filter(([, table]) => tableTiers.indexOf(table) >= tableTier)
            .map(([gtTier]) => voltageNames.indexOf(gtTier))
    ))

    /**
     * @param {ExtendedCraftingJSONIngredient} ingredient
     */
    function toIngredient(ingredient) {
        if ("tag" in ingredient) return Ingredient.of(`#${ingredient.tag}`)
        if ("nbt" in ingredient) return Item.of(ingredient.item, ingredient.nbt).weakNBT()
        return Ingredient.of(ingredient.item)
    }

    // Nested loop because .flat does not work, Rhino <3
    for (let source of [
        event.findRecipes({ type: "extendedcrafting:shaped_table" }),
        event.addedRecipes // recipes added by KubeJS need to be accounted for explicitly.
    ])
        // Extended Crafting recipes to GT recipes conversion
        for (let javaRecipe of source) {
            if (
                javaRecipe.removed ||
                // recipes added by KubeJS serialize with "type": "unknown"
                `${javaRecipe.getType()}` !== "extendedcrafting:shaped_table"
            ) continue

            javaRecipe.serialize()

            /** @type {ExtendedCraftingJSONShapedTableRecipe} */
            let recipe = JSON.parse(javaRecipe.json.toString())

            // No spread operator in Rhino
            let size = Math.max(recipe.pattern.length, Math.max.apply(null, recipe.pattern.map(row => row.length)))

            // Table tier from its size. ceil of half because each tier increases size by 2
            let tableTier = Math.max(0, Math.ceil((size - 3) / 2))
            let voltage = minVoltageForTable[tableTier]

            // add up every item in the shaped pattern to convert to shapeless
            /** @type {Record<string, {ingredient: ExtendedCraftingJSONIngredient, count: number}>} */
            let counts = {}
            for (let row of recipe.pattern)
                for (let char of row.split("")) {
                    if (char === " ") continue
                    let ingredient = recipe.key[char]
                    let id = JSON.stringify(ingredient) // ID for deduplication of the same items
                    if (!counts[id]) counts[id] = { ingredient: ingredient, count: 0 }
                    counts[id].count++
                }
            let inputs = Object
                .values(counts)
                .map(input => InputItem.of(toIngredient(input.ingredient), input.count))

            let output = recipe.result
            event.recipes.gtceu.extended_crafting(`${javaRecipe.getId()}`)
                .itemOutputs(Item.of(output.item, output.count || 1, output.nbt))
                .duration(20 * size)
                .EUt(GTValues.VA[voltage])
                .itemInputs(inputs)
        }

    // Crafting recipe for the single blocks
    Object.entries(global.extendedCrafterTables).forEach(([tier, table]) => {
        event.recipes.gtceu.shaped(`gtceu:${tier}_extended_crafter`, [
            "ATA",
            "MHM",
            "CTC"
        ], {
            A: `gtceu:${tier}_robot_arm`,
            T: `extendedcrafting:${table}_auto_table`,
            M: `gtceu:${tier}_conveyor_module`,
            H: `gtceu:${tier}_machine_hull`,
            C: `#gtceu:circuits/${tier}`
        }).id(`kubejs:shaped/${tier}_extended_crafter`)
            .addMaterialInfo()
    })
})
