/**
 * Material Registry for Polyethylcyanoacrylate.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("sodium_cyanide")
        .dust()
        .color(0x7FB4C7)
        .components("1x sodium", "1x carbon", "1x nitrogen")

    event.create("chloroacetic_mixture")
        .fluid()
        .color(0x2D80B5)

    event.create("chloroacetate")
        .dust()
        .color(0x2D8BAE)
        .components("1x chlorine", "2x carbon", "3x hydrogen", "2x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("ClCH2CO2H")

    event.create("dichloroacetate")
        .fluid()
        .color(0x2D8BBE)
        .components("1x chlorine", "1x chloroacetate")
        .formula("Cl2CH2CO2H")

    event.create("trichloroacetate")
        .fluid()
        .color(0x2D8BCE)
        .components("1x chlorine", "1x dichloroacetate")
        .formula("Cl3CH2CO2H")

    event.create("cyanoacetic_acid")
        .dust()
        .color(0x5B8988)
        .components("1x nitrogen", "3x carbon", "3x hydrogen", "2x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("C3H3NO2")
        .ignoredTagPrefixes([TagPrefix.dustTiny, TagPrefix.dustSmall])

    event.create("ethyl_cyanoacrylate")
        .liquid()
        .color(0x516863)
        .components("1x nitrogen", "6x carbon", "7x hydrogen", "2x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .formula("C6H7NO2")

    event.create("polyethyl_cyanoacrylate")
        .polymer().liquid()
        .color(0x708787)
        .components("1x nitrogen", "6x carbon", "7x hydrogen", "2x oxygen")
        .fluidPipeProperties(1300, 1000, true, true, true, false)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.STICKY)
        .formula("C6H7NO2");

    // Dimethyl sulfoxide sub-chain

    event.create("dimethyl_sulfoxide")
        .liquid()
        .color(0xBFB178)
        .components("2x carbon", "6x hydrogen", "1x sulfur", "1x oxygen")

    event.create("dimethyl_sulfide")
        .liquid()
        .color(0xACB279)
        .components("2x carbon", "6x hydrogen", "1x sulfur")
})
