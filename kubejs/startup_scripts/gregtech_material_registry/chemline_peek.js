/**
 * Material Registry for Poly Ether Ether Ketone.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {

    event.create("nitrotoluene")
        .liquid()
        .color(0x8c6029)
        .components("7x carbon", "7x hydrogen", "1x nitrogen", "2x oxygen")

    event.create("aniline")
        .liquid()
        .color(0x78663a)
        .components("5x carbon", "7x hydrogen", "1x nitrogen")
        .formula("C6H5NH2")

    event.create("nitrous_acid")
        .liquid(new GTFluidBuilder().attribute($FluidAttributes.ACID))
        .color(0x7281A6)
        .components("1x hydrogen", "1x nitrogen", "2x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("fluoroboric_acid")
        .liquid(new GTFluidBuilder().attribute($FluidAttributes.ACID))
        .color(0xaffad7)
        .components("1x hydrogen", "1x boron", "4x fluorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("boron_trifluoride")
        .gas()
        .color(0xcdfaaf)
        .components("1x boron", "3x fluorine")

    event.create("4-fluorotoluene")
        .liquid()
        .color(0x632a18)
        .components("7x carbon", "7x hydrogen", "1x fluorine")

    event.create("fluorotoluene_mixture")
        .liquid()
        .color(0x593f36)

    event.create("activated_fluorotoluene_mixture")
        .liquid()
        .color(0x593636)

    event.create("4-fluorotrichlorotoluene")
        .liquid()
        .color(0x00a666)
        .components("7x carbon", "4x hydrogen", "3x chlorine", "1x fluorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("4-fluorobenzoyl_chloride")
        .liquid()
        .color(0x518f9e)
        .components("1x fluorine", "7x carbon", "4x hydrogen", "1x oxygen", "1x chlorine")
        .formula("FC6H4COCl")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("benzenediazonium_fluoroborate")
        .dust()
        .color(0x613d4e)
        .components("6x carbon", "5x hydrogen", "2x nitrogen", "1x boron", "4x fluorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("fluorobenzene")
        .liquid()
        .color(0x3d613f)
        .components("6x carbon", "5x hydrogen", "1x fluorine")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("fluorobenzene_gas_mixture")
        .liquid()
        .color(0x29B9CF)
        .components("1x fluorobenzene", "1x boron_trifluoride", "2x nitrogen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("4-4-difluorobenzophenone")
        .dust()
        .color(0x7d470a)
        .components("13x carbon", "8x hydrogen", "1x oxygen", "2x fluorine")
        .formula("(FC6H4)2CO")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("hydroquinone")
        .dust()
        .color(0xdedede)
        .components("6x carbon", "6x hydrogen", "2x oxygen")
        .formula("C6H4(OH)2")

    event.create("sodium_fluoride")
        .dust()
        .color(0xa6a6a6)
        .components("1x sodium", "1x fluorine")

    event.create("sulfolane")
        .liquid()
        .color(0xfffdd1)
        .components("4x carbon", "8x hydrogen", "1x sulfur", "2x oxygen")
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)

    event.create("polyether_ether_ketone")
        .liquid().dust().polymer()
        .color(0xC4B4A1)
        .components("19x carbon", "12x hydrogen", "3x oxygen")
        .itemPipeProperties(64, 24)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION, GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.STICKY)
        .formula("(C6H4O2)(C13H8O)")
})
