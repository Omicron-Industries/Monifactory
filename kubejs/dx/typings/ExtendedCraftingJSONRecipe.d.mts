export type ExtendedCraftingJSONIngredient = {
    item: Special.Item
} | {
    tag: string
} | {
    item: Special.Item
    /** `.weakNBT()` */
    type: "forge:partial_nbt"
    nbt: string
}

export type ExtendedCraftingJSONResult = {
    item: Special.Item
    count: number
    nbt?: string
}

export type ExtendedCraftingJSONShapedTableRecipe = {
    result: ExtendedCraftingJSONResult
    pattern: string[]
    key: Record<string, ExtendedCraftingJSONIngredient>
}
