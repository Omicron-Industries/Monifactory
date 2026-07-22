// priority: 0
/**
 * Item Registry for fuels.
 */
StartupEvents.registry("item", event => {
    fission_fuels.forEach(fuel_type => {
        let identifier = "";
        if(fuel_type.enrichment) {
            // Low-enriched fuels
            identifier = `le${fuel_type.category.charAt(0)}_${fuel_type.identifier}`
            event.create(`phoenix_fission:${identifier}_fuel`)
                .texture(`phoenix_fission:item/fuel/${fuel_type.category}/${identifier}`)
            event.create(`phoenix_fission:depleted_${identifier}_fuel`)
                .texture(`phoenix_fission:item/fuel/${fuel_type.category}/depleted/${identifier}`)

            // High-enriched fuels
            identifier = `he${fuel_type.category.charAt(0)}_${fuel_type.identifier}`
            event.create(`phoenix_fission:${identifier}_fuel`)
                .texture(`phoenix_fission:item/fuel/${fuel_type.category}/${identifier}`)
            event.create(`phoenix_fission:depleted_${identifier}_fuel`)
                .texture(`phoenix_fission:item/fuel/${fuel_type.category}/depleted/${identifier}`)
        } else {
            identifier = fuel_type.identifier;
            event.create(`phoenix_fission:${identifier}_fuel`)
                .texture(`phoenix_fission:item/fuel/${fuel_type.category}/${identifier}`)
            event.create(`phoenix_fission:depleted_${identifier}_fuel`)
                .texture(`phoenix_fission:item/fuel/${fuel_type.category}/depleted/${identifier}`)
        }
    })
})

GTCEuStartupEvents.registry("gtceu:element", event => {
    // Non-GTM isotopes
    event.create("uranium_233")
        .protons(92)
        .neutrons(141)
        .symbol("U-233")
        .isIsotope(true)

    event.create("plutonium_240")
        .protons(94)
        .neutrons(146)
        .symbol("Pu-240")
        .isIsotope(true)
})

GTCEuStartupEvents.registry("gtceu:material", event => {
    // Non-GTM isotopes
    event.create("uranium_233")
        .liquid(1405).dust()
        .color(0x116311).iconSet(GTMaterialIconSet.RADIOACTIVE)
        .element(GTElements.get("uranium_233"))

    event.create("plutonium_240")
        .liquid(913).dust()
        .color(0x8e1818).iconSet(GTMaterialIconSet.RADIOACTIVE)
        .element(GTElements.get("plutonium_240"))
})
