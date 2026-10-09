// Lapotronic Generator fuel recipes: gem purity scales burn duration, EU/t is fixed by tier.
const GEM_PURITIES = [
    { prefix: "", durationMultiplier: 1 },
    { prefix: "flawless_", durationMultiplier: 1.5 },
    { prefix: "exquisite_", durationMultiplier: 2 },
]

function addLapotronicFuel(event, material, normalItem, eu, duration) {
    for (const purity of GEM_PURITIES) {
        const tierName = purity.prefix === "" ? "normal" : purity.prefix.slice(0, -1)
        const item = purity.prefix === "" ? normalItem : `gtceu:${purity.prefix}${material}_gem`
        event.recipes.gtceu.lapotronic(`kubejs:lapotronic_${tierName}_${material}`)
            .itemInputs(item)
            .duration(Math.round(duration * purity.durationMultiplier))
            .EUt(-eu)
    }
}

ServerEvents.recipes(event => {
    addLapotronicFuel(event, "diamond", "minecraft:diamond", GTValues.V[GTValues.MV], 200)
    addLapotronicFuel(event, "emerald", "minecraft:emerald", GTValues.V[GTValues.MV], 200)
})
