/**
 * Material Registry for Kapton K.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {

    if (doHarderRecipes) {
        event.create("durene")
            .dust()
            .fluid()
            .color(0x336040).iconSet("fine")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("10x carbon", "14x hydrogen")
            .formula("C6H2(CH3)4");

        event.create("pyromellitic_dianhydride")
            .dust()
            .fluid()
            .color(0xB48C63)
            .components("10x carbon", "2x hydrogen", "6x oxygen")
            .formula("C6H2(C2O3)2");

        event.create("copper_iodide")
            .dust()
            .color(0xf0e0b4)
            .components("1x copper", "1x iodine")

        event.create("dinitrodiphenyl_ether")
            .fluid()
            .color(0xfa9f6e)
            .components("12x carbon", "5x oxygen", "2x nitrogen", "8x hydrogen")
            .formula("O(C6H4NO2)2")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

        event.create("oxydianiline")
            .fluid()
            .color(0xf0e130).iconSet("dull")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
            .components("12x carbon", "12x hydrogen", "2x nitrogen", "oxygen")
            .formula("O(C6H4NH2)2");

        event.create("kapton_k")
            .polymer()
            .fluid()
            .color(0x915A23)
            .components("1x pyromellitic_dianhydride", "1x oxydianiline")
            .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.STICKY)
    }
})
