/**
 * Fission Material Registry.
 */

GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("ferroboron")
        .ingot().fluid()
        .color(0x676767).iconSet("dull")
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .components(GTMaterials.Steel.multiply(4), GTMaterials.Boron.multiply(1))

    event.create("tough_alloy")
        .ingot().fluid()
        .color(0x0d1d2d).iconSet("metallic")
        .flags(GTMaterialFlags.GENERATE_PLATE)
        .components(GTMaterials.get("ferroboron"), GTMaterials.Lithium)

})
