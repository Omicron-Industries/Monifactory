ServerEvents.recipes(event => {
    const GEM_PURITIES = [
        { prefix: "chipped_", euMultiplier: 0.5 },
        { prefix: "flawed_", euMultiplier: 0.75 },
        { prefix: "", euMultiplier: 1 },
        { prefix: "flawless_", euMultiplier: 1.5 },
        { prefix: "exquisite_", euMultiplier: 2 },
    ]

    const LAPOTRONIC_FUELS = {
        diamond: { eu: 2048, duration: 200 },
        emerald: { eu: 1536, duration: 200 },
    }

    for (const [material, base] of Object.entries(LAPOTRONIC_FUELS)) {
        for (const purity of GEM_PURITIES) {
            const tierName = purity.prefix === "" ? "normal" : purity.prefix.slice(0, -1)
            event.recipes.gtceu.lapotronic(`kubejs:lapotronic_${tierName}_${material}`)
                .itemInputs(`gtceu:${purity.prefix}${material}_gem`)
                .duration(base.duration)
                .EUt(-Math.round(base.eu * purity.euMultiplier))
        }
    }
})
