// priority: 2
/**
 * Material Registry for content original to Monifactory and it's predecessors.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {


    // Primal Mana is shoved here at the start to make absolute sure nothing that uses it is declared before it

    event.create("mana")
        .liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill())
        .element(GTElements.get("mana"))
        .iconSet("mana")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)


    // Hyperdegenerate Matter *should* be in the naqfuel file, but it's used in HDD

    event.create("hyperdegenerate_matter")
        .element(GTElements.get("hyperdegenerate_matter"))
        .color(0xffffff).iconSet("hyperdegenerate_matter")
        .liquid(new GTFluidBuilder().state(GTFluidState.PLASMA).customStill())


    // Sculk Materials

    event.create("cryolobus")
        .ingot().fluid()
        .element(GTElements.get("cryolobus"))
        .color(0x035155).secondaryColor(0x04203d).iconSet("dull")
        .blastTemp(6800, "higher")
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_FRAME)

    event.create("cryococcus")
        .ingot().fluid()
        .element(GTElements.get("cryococcus"))
        .color(0x009295).secondaryColor(0x07303b).iconSet("dull")
        .flags(GTMaterialFlags.NO_SMELTING, GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_FRAME)
        .cableProperties(GTValues.V[GTValues.UHV], 4, 6, false);


    // Prismatic Crucible Materials

    event.create("infinity")
        .ingot()
        .liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill())
        .element(GTElements.get("infinity"))
        .color(0xffffff)
        .iconSet("infinity")
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_DENSE, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_FOIL)

    event.create("meta_null")
        .ingot()
        .liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill())
        .color(0x13081a).secondaryColor(0x000000)
        .iconSet("meta_null")
        .element(GTElements.get("meta_null"))
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_ROTOR)
        .fluidPipeProperties(15000, 1500, true, true, true, true)

    event.create("monium")
        .ingot()
        .liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill())
        .element(GTElements.get("monium"))
        .color(0xffffff)
        .iconSet("monium")
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SPRING, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_RING, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_ROTOR, GTMaterialFlags.GENERATE_ROUND)
        .cableProperties(GTValues.V[GTValues.MAX], 134217727, 0, true)


    // Netherite-Related Materials

    event.create("activated_netherite")
        .ingot()
        .color(0x4C484C)
        .iconSet("bright")
        .fluidPipeProperties(12500, 800, true, false, false, true)
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_ROTOR, GTMaterialFlags.NO_UNIFICATION)
        .ignoredTagPrefixes([TagPrefix.dust, TagPrefix.dustSmall, TagPrefix.dustTiny, TagPrefix.nugget, TagPrefix.ring, TagPrefix.bolt, TagPrefix.screw])

    event.create("ardite")
        .ingot().fluid()
        .color(0xad2f05).secondaryColor(0x823c08)
        .iconSet("dull")
        .blastTemp(9200, "highest", GTValues.VHA[GTValues.UV], 1000)
        .flags(GTMaterialFlags.GENERATE_PLATE)

    event.create("manyullyn")
        .ingot().fluid()
        .color(0xc05cff).secondaryColor(0xff00e0).iconSet("magic")
        .blastTemp(9200, "highest", GTValues.VA[GTValues.UV], 1200)
        .components("4x ardite", "4x cobalt", "mana")
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_FRAME, GTMaterialFlags.GENERATE_SMALL_GEAR)


    // Necrosiderite

    event.create("necrosiderite")
        .ingot()
        .color(0xffffff)
        .iconSet("necrosiderite")
        .flags(GTMaterialFlags.GENERATE_FINE_WIRE, GTMaterialFlags.GENERATE_SPRING, GTMaterialFlags.GENERATE_BOLT_SCREW)
        .cableProperties(33554432, 64, 8, false)
        .blastTemp(12200, "highest", 1000000, 1000)
        .element(GTElements.get("necrosiderite"))


    // Omnium

    event.create("omnium")
        .ingot()
        .liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill())
        .element(GTElements.get("omnium"))
        .color(0xffffff).iconSet("omnium")
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_SPRING)
        .cableProperties(GTValues.V[GTValues.UEV], 6, 128, false)


    // Darconite!

    event.create("darconite")
        .ingot().fluid()
        .color(0x6220fa).secondaryColor(0x1e0ddb)
        .iconSet("crystal")
        .blastTemp(10800, "highest", GTValues.VHA[GTValues.UV], 800)
        .components("3x darmstadtium", "4x cobalt", "2x nitrogen")
        .cableProperties(GTValues.V[GTValues.UEV], 4, 32, false)
        .flags(GTMaterialFlags.GENERATE_FINE_WIRE, GTMaterialFlags.GENERATE_SPRING, GTMaterialFlags.GENERATE_SPRING_SMALL)

    event.create("hyperdegenerate_darconite")
        .color(0xffffff)
        .iconSet("hyperdegenerate_darconite")
        .components("3x darmstadtium", "4x cobalt", "2x nitrogen", "1x hyperdegenerate_matter")
        .cableProperties(GTValues.V[GTValues.UEV], 64, 0, true)
        .flags(GTMaterialFlags.DISABLE_ALLOY_BLAST, GTMaterialFlags.NO_SMELTING, GTMaterialFlags.NO_SMASHING, GTMaterialFlags.NO_WORKING, GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.GENERATE_FINE_WIRE)
        .ignoredTagPrefixes([
            TagPrefix.dust,
            TagPrefix.dustSmall,
            TagPrefix.dustTiny,
            TagPrefix.plate
        ])
})
