/**
 * Material Registry for harder Platinum Group processing.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {
    if (doHarderProcessing) {
        event.create("palladium_rich_ammonia")
            .fluid()
            .color(0x808080)
            .components("2x ammonia", "palladium", "chlorine")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

        event.create("rhodium_sulfate_solution")
            .fluid()
            .color(0xffbb66)
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("rhodium_sulfate", "water")

        event.create("platinum_palladium_leachate")
            .fluid()
            .color(0xffffc5)
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("platinum", "palladium", "aqua_regia")

        event.create("methyl_formate")
            .fluid()
            .color(0xffaaaa)
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("2x carbon", "4x hydrogen", "2x oxygen")

        event.create("platinum_metallic")
            .dust()
            .color(0xfffbc5).iconSet("metallic")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("platinum", "rare_earth")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("ammonium_hexachloroplatinate")
            .dust()
            .color(0xfef0c2).iconSet("metallic")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("2x nitrogen", "8x hydrogen", "platinum", "6x chlorine")
            .formula("(NH4)2PtCl6")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("potassium_pyrosulfate")
            .dust()
            .color(0xfbbb66)
            .components("2x potassium", "2x sulfur", "7x oxygen")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("zinc_sulfate")
            .dust()
            .color(0x846649).iconSet("fine")
            .components("zinc", "sulfur", "4x oxygen")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("sodium_ruthenate")
            .dust()
            .color(0x3a40cb).iconSet("shiny")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("2x sodium", "ruthenium", "4x oxygen")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("platinum_group_residue")
            .dust()
            .color(0x64632e).iconSet("rough")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("iridium", "osmium", "rhodium", "ruthenium", "rare_earth")

        event.create("crude_platinum_residue")
            .dust()
            .color(0xfffbc5).iconSet("dull")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("platinum_raw")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("iridium_group_sludge")
            .dust()
            .color(0x644629).iconSet("dull")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("iridium", "osmium", "ruthenium", "rare_earth")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

        event.create("crude_rhodium_residue")
            .dust()
            .color(0x666666).iconSet("dull")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("2x rhodium", "water")
            .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])


        event.create("sodium_methoxide")
            .dust()
            .color(0xd0d0f0).iconSet("dull")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("carbon", "3x hydrogen", "oxygen", "sodium")
    }

    // Add these to all modes
    event.create("potassium_bisulfate")
        .dust()
        .color(0xfdbd68)
        .components("potassium", "hydrogen", "sulfur", "4x oxygen")
        .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])
})
