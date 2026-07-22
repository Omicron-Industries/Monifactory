/**
 * Fission Material Registry.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("ferroboron")
        .ingot()
        .color(0x676767).iconSet("dull")
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .components(GTMaterials.Steel.multiply(4), GTMaterials.Boron.multiply(1))

    event.create("tough_alloy")
        .ingot()
        .color(0x0d1d2d).iconSet("metallic")
        .flags(GTMaterialFlags.GENERATE_PLATE, GTMaterialFlags.GENERATE_FRAME)
        .components(GTMaterials.Steel.multiply(4), GTMaterials.Boron, GTMaterials.Lithium.multiply(2))

})
