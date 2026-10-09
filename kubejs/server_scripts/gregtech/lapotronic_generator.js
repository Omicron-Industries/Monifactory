const GEM_PURITIES = [
    { prefix: "", euMultiplier: 1 },
    { prefix: "flawless_", euMultiplier: 1.5 },
    { prefix: "exquisite_", euMultiplier: 2 },
]

function addLapotronicFuel(event, material, eu, duration) {
    for (const purity of GEM_PURITIES) {
        const tierName = purity.prefix === "" ? "normal" : purity.prefix.slice(0, -1)
        event.recipes.gtceu.lapotronic(`kubejs:lapotronic_${tierName}_${material}`)
            .itemInputs(`gtceu:${purity.prefix}${material}_gem`)
            .duration(duration)
            .EUt(-Math.round(eu * purity.euMultiplier))
    }
}

ServerEvents.recipes(event => {
    addLapotronicFuel(event, "diamond", 2048, 200)
    addLapotronicFuel(event, "emerald", 1536, 200)
})
