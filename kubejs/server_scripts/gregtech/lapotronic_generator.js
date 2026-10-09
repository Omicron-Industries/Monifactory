const GEM_PURITIES = [
    { prefix: "", durationMultiplier: 1 },
    { prefix: "flawless_", durationMultiplier: 1.5 },
    { prefix: "exquisite_", durationMultiplier: 2 },
]

function addLapotronicFuel(event, material, eu, duration) {
    for (const purity of GEM_PURITIES) {
        const tierName = purity.prefix === "" ? "normal" : purity.prefix.slice(0, -1)
        event.recipes.gtceu.lapotronic(`kubejs:lapotronic_${tierName}_${material}`)
            .itemInputs(`gtceu:${purity.prefix}${material}_gem`)
            .duration(Math.round(duration * purity.durationMultiplier))
            .EUt(-eu)
    }
}

ServerEvents.recipes(event => {
    addLapotronicFuel(event, "diamond", GTValues.VA[GTValues.MV], 200)
    addLapotronicFuel(event, "emerald", GTValues.VA[GTValues.MV], 200)
})
