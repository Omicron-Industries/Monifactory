// This file also gens recipes for kubejs added recipes!

/**
 * Automatic generation of tiered recipes
 * E.g. better SMD tiers, better Soldering Alloy tiers
 */


import type { GTJSONRecipe, GTJSONRecipeCondition, MCIdentifier } from "../../types/GTJSONRecipe.ts"

const ExtendedOutputItem = Java.loadClass("com.gregtechceu.gtceu.integration.kjs.recipe.components.ExtendedOutputItem")

/**
 * Ratio tells how much more efficient a solder is
 */
const solders_and_ratios: [id: MCIdentifier, ratio: number][] = [
    ["gtceu:tin", 1],                       // Tier 0
    ["gtceu:soldering_alloy", 1],           // Tier 1
    ["gtceu:advanced_soldering_alloy", 2],  // Tier 2
    ["gtceu:living_soldering_alloy", 4],    // Tier 3
]

const solder_rules: [
    predicate: (_ : Internal.RecipeJS) => boolean,
    removeBaseRecipe: boolean,
    minSolderTier: number,
    maxSolderTier?: number,
][] = [
    // Don't alter any solder solidifying recipes
    [(javaRecipe) => {
        return RegExp(/^gtceu:fluid_solidifier\/solidify_(advanced_|living_)?soldering_alloy_/).test(javaRecipe.getId())
    }, false, 0, 0],

    // UV+ recipes exclusively use Living Solder
    [(javaRecipe) => {
        let recipe = JSON.parse(javaRecipe.json.toString())
        let eut = recipe.tickInputs?.eu?.length
            ? recipe.tickInputs.eu[0].content
            : null
        let hasSolder = recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
            i.content.value.some(v => "tag" in v
                ? v.tag === "forge:soldering_alloy"
                : v.fluid === "gtceu:soldering_alloy"
            )
        )
        return eut > GTValues.V[GTValues.ZPM] && hasSolder
    }, true, 3, 4],

    // ZPM recipes can use Lead-Free Soldering alloy or Living Solder
    [(javaRecipe) => {
        let recipe = JSON.parse(javaRecipe.json.toString())
        let eut = recipe.tickInputs?.eu?.length
            ? recipe.tickInputs.eu[0].content
            : null
        let hasSolder = recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
            i.content.value.some(v => "tag" in v
                ? v.tag === "forge:soldering_alloy"
                : v.fluid === "gtceu:soldering_alloy"
            )
        )
        return eut > GTValues.V[GTValues.LuV] && hasSolder
    }, true, 2, 4],

    // IV+ recipes use Advanced Soldering Alloy
    [(javaRecipe) => {
        let recipe = JSON.parse(javaRecipe.json.toString())
        let eut = recipe.tickInputs?.eu?.length
            ? recipe.tickInputs.eu[0].content
            : null
        let hasSolder = recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
            i.content.value.some(v => "tag" in v
                ? v.tag === "forge:soldering_alloy"
                : v.fluid === "gtceu:soldering_alloy"
            )
        )
        return eut > GTValues.V[GTValues.EV] && hasSolder
    }, true, 2, 3],

    // EV recipes use Soldering Alloy or Lead-Free Soldering Alloy
    // Would be [1, 3] if not for the fact that that creates an infinite loop
    [(javaRecipe) => {
        let recipe = JSON.parse(javaRecipe.json.toString())
        let eut = recipe.tickInputs?.eu?.length
            ? recipe.tickInputs.eu[0].content
            : null
        let hasSolder = recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
            i.content.value.some(v => "tag" in v
                ? v.tag === "forge:soldering_alloy"
                : v.fluid === "gtceu:soldering_alloy"
            )
        )
        return eut > GTValues.V[GTValues.HV] && hasSolder
    }, false, 2, 3],

    // Remove HV+ recipes that use Liquid Tin
    [(javaRecipe) => {
        let recipe = JSON.parse(javaRecipe.json.toString())
        let eut = recipe.tickInputs?.eu?.length
            ? recipe.tickInputs.eu[0].content
            : null
        let hasSolder = recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
            i.content.value.some(v => "tag" in v
                ? v.tag === "forge:tin"
                : v.fluid === "gtceu:tin"
            )
        )
        return eut > GTValues.V[GTValues.MV] && hasSolder
    }, true, 0, 0],

    // Default behaviour: Do nothing
    [(javaRecipe) => {
        return RegExp("").test(javaRecipe.getId())
    }, false, 0, 0],
]

function parseRecipe(recipe: GTJSONRecipe) {
    let {duration, recipeConditions} = recipe

    let circuitNumber: number | null = null
    let setCircuitNumber = (n: number): null => {
        if (circuitNumber !== null)
            throw new Error("Recipe has multiple circuit numbers???")
        circuitNumber = n
        return null
    }

    // Extract inputs and outputs data
    let [newInputItems, newOutputItems] = [recipe.inputs?.item, recipe.outputs?.item].map(items =>
        items && items.map(i => {
            let c = i.content
            if (Array.isArray(c) || !("type" in c))
                throw new Error("Recipe uses complicated item stack, I'd rather explode")
            switch(c.type) {
            case "gtceu:circuit":
                return setCircuitNumber(c.configuration)
            case "gtceu:sized":
                if (!("type" in c.ingredient)) {
                    let ing = c.ingredient
                    let parsed = {
                        tag: "tag" in ing ? ing.tag : null,
                        item: "item" in ing ? ing.item : null,
                        amount: c.count,
                        chance: i.chance,
                        maxChance: i.maxChance ?? i.chance,
                    }
                    if (i.chance === i.maxChance) {
                        parsed.chance = 10000
                        parsed.maxChance = 10000
                    }
                    return parsed
                }
                if (c.ingredient.type === "gtceu:circuit")
                    return setCircuitNumber(c.ingredient.configuration)
                // We do want to throw an error here
                // eslint-disable-next-line no-fallthrough
            default:
                throw new Error("Recipe uses complicated item stack, I'd rather explode")
            }
        }).filter(stack => stack !== null)
    )

    let [newInputFluids, newOutputFluids] = [recipe.inputs?.fluid, recipe.outputs?.fluid].map(items =>
        items && items.map(i => {
            if (i.chance !== i.maxChance)
                throw new Error("Chanced fluid recipes are not yet supported")
            let c = i.content
            if (!("value" in c))
                throw new Error("Ranged fluid recipes are not yet supported")
            let [val] = c.value
            if (val === undefined)
                return undefined
            return {
                id: "tag" in val
                    ? "gtceu:" + val.tag.split(":", 2)[1]
                    : val.fluid,
                amount: c.amount
            }
        }).filter(Boolean)
    )

    let eut = recipe.tickInputs?.eu?.length
        ? recipe.tickInputs.eu[0].content
        : null

    let multiplyRecipe = (by: number) => {
        for(let matters of [newInputItems, newOutputItems, newInputFluids, newOutputFluids])
            if(matters)
                for(let matter of matters)
                    matter.amount *= by
        duration *= by
    }
    let isRecipeDivisible = (by: number) =>
        [newInputItems, newOutputItems, newInputFluids, newOutputFluids]
            .filter(matters => matters)
            .every(matters => matters.every(
                matter => matter.amount % by === 0
            )) && duration % by === 0

    let useMultiplier = (cb: () => void, multiplier: number, divisor: number, maxTotalDivisor?: number) => {
        maxTotalDivisor = maxTotalDivisor ?? multiplier
        let divisorInv = 1 / divisor
        multiplyRecipe(multiplier)
        cb()
        // Divide recipe back, UP TO `multiplier` TIMES
        while (maxTotalDivisor > 1 && isRecipeDivisible(divisor)) {
            multiplyRecipe(divisorInv)
            maxTotalDivisor *= divisorInv
        }
    }

    let register = (registerEvent: Internal.RecipesEventJS, newRecipeId: string, machineName: string) => {
        let newRecipe: Internal.GTRecipeSchema$GTRecipeJS = registerEvent.recipes.gtceu[machineName](newRecipeId).duration(duration)

        if(newInputItems) for (let i of newInputItems)
            if(i.tag) {
                let input = `${i.amount}x #${i.tag}` as InputItem_
                newRecipe.itemInputs(input)
            } else if(i.item) {
                if(i.chance === 0) {
                    newRecipe.notConsumable(Item.of(i.item, i.amount))
                } else {
                    newRecipe.chancedInput(Item.of(i.item, i.amount), 10000 * i.chance / i.maxChance, 0)
                }
            }
        if(newOutputItems) for (let i of newOutputItems) {
            let itemStack = (i.item ?? `#${i.tag}`) as Internal.ItemStack_
            newRecipe = newRecipe.chancedOutput(ExtendedOutputItem.of(Item.of(itemStack, i.amount)), 10000 * i.chance / i.maxChance, 0)
        }

        // Polyfilled spread operator 🙏
        if(newInputFluids)
            newRecipe = newRecipe.inputFluids.apply(newRecipe, newInputFluids.map(i => `${i.id} ${i.amount}`))
        if(newOutputFluids)
            newRecipe = newRecipe.outputFluids.apply(newRecipe, newOutputFluids.map(i => `${i.id} ${i.amount}`))
        if(circuitNumber !== null)
            newRecipe = newRecipe.circuit(circuitNumber)
        if(eut !== null)
            newRecipe = newRecipe.EUt(typeof eut === "number"
                ? IOEnergyStack.fromVoltage(eut)
                : IOEnergyStack.fromVA(eut.voltage ?? 0, eut.amperage ?? 1))
        if (recipeConditions) {
            let conditions = recipeConditions.map(cond => "data" in cond
                ? Object.assign({ type: cond.type }, cond.data)
                : cond
            ) as GTJSONRecipeCondition[]

            let cleanroomCondition = conditions.find(cond => cond.type === "cleanroom")
            if(cleanroomCondition) {
                newRecipe = newRecipe.cleanroom(CleanroomType[cleanroomCondition.cleanroom.toUpperCase()])
            }

            let researchCondition = conditions.find(cond => cond.type === "research")
            if(researchCondition) {
                let research = researchCondition.research[0]
                newRecipe = newRecipe.researchWithoutRecipe(research.researchId, research.dataItem.id)
            }
        }
        if (recipe.inputChanceLogics?.item)
            newRecipe = newRecipe.chancedItemInputLogic(ChanceLogic[recipe.inputChanceLogics.item.toUpperCase()])
        if (recipe.outputChanceLogics?.item)
            newRecipe = newRecipe.chancedItemOutputLogic(ChanceLogic[recipe.outputChanceLogics.item.toUpperCase()])
    }

    return { // Kubejs devs pls
        multiplyRecipe: multiplyRecipe,
        isRecipeDivisible: isRecipeDivisible,
        useMultiplier: useMultiplier,
        register: register,
        newInputFluids: newInputFluids,
        newInputItems: newInputItems,
        newOutputFluids: newOutputFluids,
        newOutputItems: newOutputItems,
    }
}

const checkedRecipeIds = new Set<string>()

function generateAlternatives(event: Internal.RecipesEventJS, javaRecipe: Internal.RecipeJS) {
    let recipeId = `${javaRecipe.getId()}` // HAS TO be a primitive because it is used in a set
    if (javaRecipe.removed || checkedRecipeIds.has(recipeId))
        return
    checkedRecipeIds.add(recipeId)

    javaRecipe.serialize()
    let recipe: GTJSONRecipe = JSON.parse(javaRecipe.json.toString())

    // Filter out non-GT-machine recipes
    if(!(typeof recipe === "object" && typeof recipe.duration === "number"))
        return

    let machineName = recipeId.split(":", 2)[1].split("/", 2)[0]
    let recipeName = recipeId.split(machineName + "/")[1]

    // Soldering alloy tiers
    if(recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
        "value" in i.content && i.content.value.some(v => "tag" in v
            ? v.tag === "forge:tin" || RegExp(/soldering_alloy/).test(v.tag)
            : v.fluid === "gtceu:tin" || RegExp(/soldering_alloy/).test(v.fluid)
        )
    )) {
        // Get overrides for this recipe
        let [, removeBaseRecipe, minSolderTier, maxSolderTier] = solder_rules.find(([predicate]) => predicate(javaRecipe))

        for (let [solderId, solderEfficiency] of solders_and_ratios.slice(minSolderTier, maxSolderTier)) {
            let r = parseRecipe(recipe)
            r.useMultiplier(() => {
                // Replace all old solder with better one
                for (let inp of r.newInputFluids) {
                    let entry = solders_and_ratios.find(([id]) => id === inp.id)
                    if (entry) {
                        inp.id = solderId
                        inp.amount /= (solderEfficiency / entry[1])
                    }
                }
            }, solderEfficiency, 2)
            r.register(
                event,
                recipeName + "/" + solderId.split(":", 2)[1],
                machineName,
            )
        }

        if (removeBaseRecipe) {
            javaRecipe.remove()
            return;
        }
    }

    // Complex SMDs
    if(recipe.inputs?.item && recipe.inputs.item.some(i =>
        !Array.isArray(i.content) && "type" in i.content &&
        i.content.type === "gtceu:sized" &&
        "item" in i.content.ingredient &&
        i.content.ingredient.item.startsWith("gtceu:advanced_smd_") &&
        !recipeName.match(/^mainframe_iv|((nano|quantum)_(processor|assembly|computer|mainframe))/)   // Don't add Complex SMDs to nano- or quantum- processors
    )) {
        // Advanced SMD recipes take twice as fast to make than Simple SMDs
        // Here we follow this convention:
        recipe.duration /= 2

        let r = parseRecipe(recipe)
        r.useMultiplier(() => {
            // Replace all advanced smd by complex smd
            for(let inp of r.newInputItems) {
                if (!inp.item) continue
                let match = inp.item.match(/^gtceu:advanced(_smd_.*)$/) as null | [string, "_smd_capacitor"]
                if(!match) continue
                inp.item = `kubejs:complex${match[1]}`
                inp.amount /= 4
            }
        }, 4, 2, 16)
        r.register(event, recipeName + "/complex_smd", machineName)
    }

    // Oxalic Acid etchant
    if(recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
        "value" in i.content && i.content.value.some(v => "tag" in v
            ? v.tag === "forge:iron_iii_chloride"
            : v.fluid === "gtceu:iron_iii_chloride"
        ) && recipeName.match(/circuit_board_iron3$/)
    )) {
        let r = parseRecipe(recipe)
        r.useMultiplier(() => {
            // Replace all old solder with better one
            for (let inp of r.newInputFluids) {
                if (inp.id !== "gtceu:iron_iii_chloride") continue
                inp.id = "gtceu:oxalic_acid_solution"
                inp.amount /= 2
            }
        }, 2, 2)
        r.register(
            event,
            recipeName.replace("iron3", "oxalic"),
            machineName,
        )
    }

    // Hexafluorosilicic circuit boards
    if(recipe.inputs?.fluid && recipe.inputs.fluid.some(i =>
        "value" in i.content && i.content.value.some(v => "tag" in v
            ? v.tag === "forge:sulfuric_acid"
            : v.fluid === "gtceu:sulfuric_acid"
        ) && recipeName.match(/board/)
    )) {
        let r = parseRecipe(recipe)
        r.useMultiplier(() => {
            for (let inp of r.newInputFluids) {
                if (inp.id !== "gtceu:sulfuric_acid") continue
                inp.id = "gtceu:hexafluorosilicic_acid"
                inp.amount *= (3 / 25)
            }
        }, 5, 5)
        r.register(
            event,
            recipeName + "/hexafluorosilicic",
            machineName,
        )
    }

}

ServerEvents.recipes(event => {
    let lengthBeforePass = event.addedRecipes.size();

    // Generate tiered recipes for base GTM
    for (let javaRecipe of event.findRecipes({ mod: "gtceu" })) {
        generateAlternatives(event, javaRecipe)
    }

    console.log(`GTM pass: ${event.addedRecipes.size() - lengthBeforePass} new recipes were added!`)

    // Generate tiered recipes for KubeJS (This is why this file is low priority)
    // More recipes that can be tiered might be added during tiering, we have to account for this
    do {
        lengthBeforePass = event.addedRecipes.size()
        let failedRecipes = 0

        for (let javaRecipe of event.addedRecipes) {
            try {
                generateAlternatives(event, javaRecipe)
            } catch(e) {
                failedRecipes++
                if (e instanceof Error) {
                    console.log(
                        "Failed to generate recipe for " + javaRecipe.getId(),
                        `${e.name}: ${e.message}`,
                        javaRecipe.json.toString(),
                    )
                } else throw e
            }
        }

        console.log(`KubeJS pass: ${event.addedRecipes.size() - lengthBeforePass} new recipes were added, ${failedRecipes} failed to add`)
    } while (lengthBeforePass < event.addedRecipes.size())

    // Release sweet RAM
    checkedRecipeIds.clear()
})
