/**
 * Material registry for Jollahs revamped rare earth processing
 */

GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("rare_earth_sulfate_solution")
        .fluid()
        .color(0xb56e3c)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("oxidized_re_sludge")
        .dust()
        .color(0x331b01)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("light_rare_earths")
        .liquid()
        .color(0x857f10)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("heavy_rare_earths")
        .liquid()
        .color(0x9c2214)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("lutetium_solution")
        .liquid()
        .color(0x007550)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("terbium_solution")
        .liquid()
        .color(0x4f7823)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("terbium_oxide")
        .dust()
        .color(0x3d3214)
        .components("2x terbium", "3x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("europium_oxide")
        .dust()
        .color(0x807e32)
        .components("2x europium", "3x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("europium_ii_oxide")
        .dust()
        .color(0x615e00)
        .components("1x europium", "1x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("lutetium_fluoride")
        .dust()
        .color(0xfcfceb)
        .components("1x lutetium", "3x fluorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("cuprous_oxide")
        .dust()
        .color(0xd1291d)
        .components("2x copper", "1x oxygen")

    event.create("cuprous_chloride")
        .dust()
        .color(0x4db8bf)
        .components("1x copper", "1x chlorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("oxalic_acid_dihydrate")
        .dust()
        .color(0xfafaf7)
        .components("2x oxalic_acid", "2x water")
        .formula("(COOH)2(H2O)2")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("oxalic_acid")
        .dust()
        .color(0xf7f7f5)
        .components("2x hydrogen", "2x carbon", "4x oxygen")
        .formula("(COOH)2")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("terbium_salt")
        .dust()
        .color(0x7f7367)
        .components("1x terbium", "3x chlorine")
        .flags(GTMaterialFlags.NO_SMASHING, GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("magnetic_terbium")
        .ingot()
        .components("terbium")
        .color(0xcedab4).secondaryColor(0x263640)
        .iconSet(GTMaterialIconSet.MAGNETIC)
        .ingotSmeltInto(GTMaterials.get("gtceu:terbium"))
        .arcSmeltInto(GTMaterials.get("terbium"))
        .macerateInto(GTMaterials.get("terbium"))
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.IS_MAGNETIC)
})
