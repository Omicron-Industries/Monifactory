// priority: 1
/**
 * Material Registry for Processing Lines that register enough materials to get their own registry file.
 */

// Wetware Tweaks
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("rotten_meat")
        .dust(1)
        .color(0xe8543a).secondaryColor(0x684a09).iconSet(GTMaterialIconSet.SAND)
        .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

    event.create("saline_antiseptic")
        .fluid()
        .color(0x99dce5)

    event.create("rotten_sludge")
        .fluid()
        .color(0x997700)
})

// Netherite & Ardite Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("ardite_sand")
        .dust()
        .color(0x9C3C1C)
        .iconSet(GTMaterialIconSet.SAND)

    event.create("ardite_salt")
        .dust()
        .color(0xE6734C)

    event.create("nether_conduit")
        .dust()
        .color(0x664D4D)

    event.create("ardite_slurry")
        .fluid()
        .color(0xAD2F05)

    event.create("impure_molten_ardite")
        .fluid()
        .color(0xAD6639)

    event.create("netherite_scrap")
        .dust().ingot().ore(1, 3)
        .color(0x6D473E)
        .iconSet("dull")
        .addOreByproducts(GTMaterials.Obsidian, GTMaterials.Obsidian, GTMaterials.RarestMetalMixture)
        .ignoredTagPrefixes([TagPrefix.nugget, TagPrefix.block, TagPrefix.dustTiny, TagPrefix.rawOre, TagPrefix.rawOreBlock])
})

// Space Rock Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("calcium_perchlorate")
        .dust()
        .color(0xf9fbda)
        .components("1x calcium", "2x chlorine", "8x oxygen")

    event.create("extraterrestrial_metal_mixture")
        .dust()
        .color(0x734120).secondaryColor(0x555B60).iconSet(GTMaterialIconSet.METALLIC)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])
})

// Necrosiderite Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("necrosiderite_oxide")
        .dust()
        .color(0xD29092)
        .components("2x necrosiderite", "3x oxygen")
})


// Dragon Scale Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("hydrochloric_dragon_scale_solution")
        .fluid()
        .color(0x697898)
        .components("2x hydrogen", "2x chlorine", "2x manganese", "1x tantalum", "4x carbon")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("(HCl)2Mn2TaC?")

    event.create("hydrochloric_manganese_solution")
        .fluid()
        .color(0x697898)
        .components("2x hydrogen", "2x chlorine", "2x manganese")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("(HCl)2Mn2")

    event.create("graphitic_tantalum")
        .dust()
        .color(0x747499).secondaryColor(0x999974)
        .components("1x tantalum", "4x carbon")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("TaC")

    event.create("hydrofluoric_graphitic_tantalum_solution")
        .fluid()
        .color(0x424272)
        .components("2x hydrogen", "2x fluorine", "1x tantalum", "4x carbon")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("(HF)2TaC")

    event.create("hydrofluoric_tantalum_solution")
        .fluid()
        .color(0x626299)
        .components("2x hydrogen", "2x fluorine", "1x tantalum")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("(HF)2Ta")
})

// Prismarine (Previously Guardian Scale) Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("prismarine_slurry")
        .fluid()
        .color(0x8bbeaf)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("chitinous_mixture")
        .fluid()
        .color(0xad9c8a)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("cracked_chitinous_mixture")
        .fluid()
        .color(0xbfa589)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    // Byproduct of processing Chitin IRL. Only useful for electrolysis in Moni.
    event.create("glucosamine")
        .dust()
        .color(0xf9d6d1)
        .components(GTMaterials.Carbon.multiply(6), GTMaterials.Hydrogen.multiply(13), GTMaterials.Nitrogen.multiply(1), GTMaterials.Oxygen.multiply(5))
})

// Ad Astra Ore processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("germanium_disulfide")
        .dust()
        .color(0xf4f9e0)
        .components(GTMaterials.Germanium.multiply(1), GTMaterials.Sulfur.multiply(2))
    event.create("manganese_ii_chloride")
        .dust()
        .color(0xfcbdda)
        .components(GTMaterials.Manganese.multiply(1), GTMaterials.Chlorine.multiply(2))
})

// JEAN Chemline
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("chlorine_trifluoride")
        .gas()
        .color(0xCBC4EF)
        .components("1x chlorine", "3x fluorine")

    event.create("chloroethane")
        .gas()
        .color(0xDEEDE6)
        .components("2x carbon", "5x hydrogen", "1x chlorine")
        .formula("C2H5Cl")

    event.create("tetraethyllead")
        .fluid()
        .color(0x6E6F9E)
        .components("1x lead", "8x carbon", "20x hydrogen")
        .formula("Pb(CH3CH2)4")

    event.create("sodium_lead_alloy")
        .ingot()
        .color(0x58649B)
        .components("1x lead", "1x sodium")

    event.create("dragon_breath")
        .fluid()
        .color(0xFF6AB9)

    event.create("jean_gasoline")
        .fluid()
        .color(0xF16AA5)

})

// Wither Gas
GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("tetrapropylene")
        .fluid()
        .color(0xbfa53f)

    event.create("alkylbenzene")
        .fluid()
        .color(0xbcbf65)

    event.create("overbased_magnesium_sulfonate")
        .fluid()
        .color(0x8b8c66)

    event.create("wither_gas")
        .gas()
        .color(0x3c3d2d)
})

// Primal Mana ...Chemline?
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("elemental_reduction_fluid")
        .fluid()
        .color(0xbbddbd)
        .iconSet("elemental_reduction_fluid")
})

// Prism Glass Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("lyso_ce")
        .dust()
        .color(0xc7eefc)
        .formula("Lu3Y2(Si2O5)5:Ce")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.NO_SMASHING, GTMaterialFlags.EXCLUDE_BLOCK_CRAFTING_RECIPES)

    event.create("yttria")
        .dust()
        .color(0xc6cead)
        .components("2x yttrium", "3x oxygen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)

    event.create("cerium_nitrate")
        .dust()
        .color(0xef411f)
        .components("1x cerium", "1x nitrogen", "3x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
})

// Sculk Bioalloy Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("experience_attuned")
        .dust().gas()
        .color(0x70486e)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .components(GTMaterials.Amethyst.multiply(7), "2x dark_soularium", GTMaterials.Lapis.multiply(4))

    event.create("sculk_agar")
        .dust()
        .color(0x0a3538)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.STICKY, GTMaterialFlags.PHOSPHORESCENT)
        .components(GTMaterials.PotassiumCyanide.multiply(4), GTMaterials.Biotite.multiply(7), GTMaterials.GelatinMixture.multiply(9), GTMaterials.get("experience_attuned").multiply(2))

    event.create("hadal_sculk")
        .liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill())

    event.create("bioalloy_base")
        .liquid(1936)
        .color(0x52a5c6).secondaryColor(0x48539b)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .components(GTMaterials.BlueAlloy.multiply(4), GTMaterials.Lead.multiply(2), GTMaterials.Lutetium.multiply(1))
})

// Optical Circuits
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("lithium_niobate")
        .liquid()
        .gem()
        .color(0xffe26c)
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING, GTMaterialFlags.CRYSTALLIZABLE, GTMaterialFlags.GENERATE_LENS)
        .components("1x lithium", "1x niobium", "3x oxygen")

    event.create("dielectric_mirror_solution")
        .liquid()
        .color(0xe2fff9)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .components("7x silicon_dioxide", "1x enderium", (doHarderProcessing ? "4x tantalum_pentoxide" : "1x tantalum"), "5x rutile", "11x polyethylene", "2x germanium")

})

// Actinium Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("uranic_solution")
        .liquid()
        .color(0xD3B53B)

    event.create("lead_chloride")
        .dust()
        .color(0x776E82).iconSet("rough")
        .components("lead", "2x chlorine")

})

// Crystal Matrix Processing
GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("acetylene")
        .gas()
        .color(0xFF4F4F)
        .components("2x carbon", "2x hydrogen")

    event.create("calcium_carbide")
        .dust()
        .color(0xCFC870)
        .components("1x calcium", "2x carbon")

})

// I don't know what this is for
GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("butanol")
        .fluid()
        .color(0xc7af2e)
        .components("4x carbon", "10x hydrogen", "1x oxygen")
        .formula("C4H9OH")

    event.create("phosphorus_trichloride")
        .fluid()
        .color(0xe8c474)
        .components("1x phosphorus", "3x chlorine")

    event.create("phosphoryl_chloride")
        .fluid()
        .color(0xe8bb5b)
        .components("1x phosphorus", "1x oxygen", "3x chlorine")

    event.create("tributyl_phosphate")
        .fluid()
        .color(0xe8c474)
        .components("12x carbon", "27x hydrogen", "4x oxygen", "1x phosphorus")
        .formula("(C4H9O)3PO")

    event.create("tantalum_pentoxide")
        .dust()
        .color(0x72728A).iconSet("rough")
        .components("2x tantalum", "5x oxygen")

    event.create("purpur")
        .dust()
        .color(0xaf7baf).secondaryColor(0x965196).iconSet("rough")
})
