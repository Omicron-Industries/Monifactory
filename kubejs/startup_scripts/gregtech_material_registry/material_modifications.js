/**
 * Material Registry for various modifications to materials, mostly ones from base GregTech.
 */

const $PropertyKey = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.PropertyKey")
const $IngotProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.IngotProperty")
const $FluidProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidProperty")
const $FluidAttributes = Java.loadClass("com.gregtechceu.gtceu.api.fluids.attribute.FluidAttributes")
const $FluidStorageKeys = Java.loadClass("com.gregtechceu.gtceu.api.fluids.store.FluidStorageKeys")
const $FluidPipeProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.FluidPipeProperties")
const $WireProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.WireProperties")
const $BlastProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.BlastProperty")
const $OreProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.OreProperty")
const $FluidBuilder = Java.loadClass("com.gregtechceu.gtceu.api.fluids.FluidBuilder");
const $DustProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.DustProperty");

// AE2 ItemLike suppliers
const $AEItems = Java.loadClass("appeng.core.definitions.AEItems")
const $AEBlocks = Java.loadClass("appeng.core.definitions.AEBlocks")


let addFluid = (mat, key, temp) => {
    let prop = new $FluidProperty()
    prop.getStorage().enqueueRegistration(key, new $FluidBuilder().temperature(temp))
    mat.setProperty(PropertyKey.FLUID, prop)
}

GTCEuStartupEvents.registry("gtceu:material", event => {
    // Existing materials that get an item form
    GTMaterials.Lutetium.setProperty($PropertyKey.INGOT, new $IngotProperty())

    GTMaterials.Actinium.setProperty($PropertyKey.INGOT, new $IngotProperty())
    GTMaterials.Actinium.setMaterialARGB(0xa034a8)
    GTMaterials.Actinium.setMaterialSecondaryARGB(0x1e8ccc)
    GTMaterials.Actinium.addFlags(GTMaterialFlags.GENERATE_ROD, GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_RING, GTMaterialFlags.GENERATE_ROUND, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_SPRING, GTMaterialFlags.GENERATE_BOLT_SCREW)
    GTMaterials.Actinium.setMaterialIconSet(GTMaterialIconSet.RADIOACTIVE)

    GTMaterials.Germanium.setProperty($PropertyKey.DUST, new $DustProperty())
    GTMaterials.Germanium.setMaterialARGB(0x66806d)
    GTMaterials.Germanium.setMaterialSecondaryARGB(0x5d5e3a)
    addFluid(GTMaterials.Germanium, $FluidStorageKeys.LIQUID, 1211);

    GTMaterials.Terbium.setProperty($PropertyKey.INGOT, new $IngotProperty())
    GTMaterials.Terbium.setMaterialARGB(0x8C8F7A)
    GTMaterials.Terbium.setProperty($PropertyKey.BLAST, new $BlastProperty(7200, "higher", 524288, 900, -1, -1));
    GTMaterials.Terbium.addFlags(GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_RING)

    // Existing materials that get new material forms
    GTMaterials.Neutronium.addFlags(GTMaterialFlags.GENERATE_FOIL, GTMaterialFlags.GENERATE_ROTOR, GTMaterialFlags.GENERATE_LONG_ROD, GTMaterialFlags.GENERATE_RING, GTMaterialFlags.GENERATE_GEAR, GTMaterialFlags.GENERATE_SMALL_GEAR, GTMaterialFlags.GENERATE_BOLT_SCREW, GTMaterialFlags.GENERATE_DENSE)
    GTMaterials.Graphite.addFlags(GTMaterialFlags.GENERATE_PLATE)
    GTMaterials.MagnesiumDiboride.addFlags(GTMaterialFlags.GENERATE_FINE_WIRE)
    GTMaterials.RutheniumTriniumAmericiumNeutronate.addFlags(GTMaterialFlags.GENERATE_FINE_WIRE)
    GTMaterials.VanadiumGallium.addFlags(GTMaterialFlags.GENERATE_BOLT_SCREW)
    GTMaterials.Trinium.addFlags(GTMaterialFlags.GENERATE_SPRING)
    GTMaterials.Tritanium.addFlags(GTMaterialFlags.GENERATE_SPRING)
    GTMaterials.Iridium.addFlags(GTMaterialFlags.GENERATE_DENSE)
    GTMaterials.Platinum.addFlags(GTMaterialFlags.GENERATE_FRAME)

    // Gears for Thermal Expansion
    GTMaterials.Nickel.addFlags(GTMaterialFlags.GENERATE_GEAR)
    GTMaterials.Copper.addFlags(GTMaterialFlags.GENERATE_GEAR)
    GTMaterials.Silver.addFlags(GTMaterialFlags.GENERATE_GEAR)
    GTMaterials.Lead.addFlags(GTMaterialFlags.GENERATE_GEAR)

    // Spring for Thermal Transmission Coil
    GTMaterials.Silver.addFlags(GTMaterialFlags.GENERATE_SPRING)

    // Radioactive materials that get liquid forms and/or a new color
    addFluid(GTMaterials.Californium, $FluidStorageKeys.LIQUID, 1173);
    GTMaterials.Californium.setMaterialARGB(0x7d0222);
    GTMaterials.Californium.setMaterialSecondaryARGB(0x410022);
    addFluid(GTMaterials.Neptunium, $FluidStorageKeys.LIQUID, 913);
    GTMaterials.Neptunium.setMaterialARGB(0x486d7b);
    GTMaterials.Neptunium.setMaterialSecondaryARGB(0x003064);
    GTMaterials.Neptunium.setProperty($PropertyKey.INGOT, new $IngotProperty());
    addFluid(GTMaterials.Curium, $FluidStorageKeys.LIQUID, 1618);
    GTMaterials.Curium.setMaterialARGB(0x58307f);
    GTMaterials.Curium.setMaterialSecondaryARGB(0x221255);
    GTMaterials.Curium.setProperty(PropertyKey.DUST, new $DustProperty());
    GTMaterials.Curium.setProperty($PropertyKey.INGOT, new $IngotProperty());
    addFluid(GTMaterials.NetherStar, $FluidStorageKeys.LIQUID, 1337);
    addFluid(GTMaterials.Actinium, $FluidStorageKeys.LIQUID, 1324);
    GTMaterials.Americium.setMaterialSecondaryARGB(0x083946);

    // Beryllium Plasma
    let beryllium_plasma_prop = GTMaterials.Beryllium.getProperty($PropertyKey.FLUID)
    beryllium_plasma_prop.getStorage().enqueueRegistration($FluidStorageKeys.PLASMA, new $FluidBuilder())

    // Liquid Sculk
    let liquid_sculk_prop = new $FluidProperty();
    liquid_sculk_prop.getStorage().enqueueRegistration($FluidStorageKeys.LIQUID, new $FluidBuilder().temperature(310).customStill())
    GTMaterials.Sculk.setProperty($PropertyKey.FLUID, liquid_sculk_prop)

    let liquid_meat_prop = new $FluidProperty();
    liquid_meat_prop.getStorage().enqueueRegistration($FluidStorageKeys.LIQUID, new $FluidBuilder()
        .temperature(310)
        .textures(true, true)
        .name("blood")
    )
    GTMaterials.Meat.setProperty($PropertyKey.FLUID, liquid_meat_prop)

    // Osmiridium Ore (to go with Iridosmine ore)
    let osmiridium_ore_prop = new $OreProperty();
    osmiridium_ore_prop.setOreByProducts(GTMaterials.Iridium, GTMaterials.Osmium, GTMaterials.Ruthenium)
    GTMaterials.Osmiridium.setProperty($PropertyKey.ORE, osmiridium_ore_prop)

    // Give Zincite an ore form
    let zincite_ore_prop = new $OreProperty(2, 2);
    zincite_ore_prop.setOreByProducts(GTMaterials.Iron, GTMaterials.Manganese)
    GTMaterials.Zincite.setProperty($PropertyKey.ORE, zincite_ore_prop)

    // Give Borax an ore form
    let borax_ore_prop = new $OreProperty(1, 2);
    borax_ore_prop.setOreByProducts(GTMaterials.Salt, GTMaterials.Boron, GTMaterials.RockSalt)
    GTMaterials.Borax.setProperty($PropertyKey.ORE, borax_ore_prop)

    // Give Iron II Chloride a dust form to replace fluid & recolor to match IRL anhydride.
    // Removing the FluidProperty causes errors in GT's hard-coded recipes so we add the fluid to the nukelist instead
    GTMaterials.Iron2Chloride.setProperty($PropertyKey.DUST, new $DustProperty());
    GTMaterials.Iron2Chloride.setMaterialARGB(0xC5E1A5)

    // HM-exclusive modifications
    if (doHarderProcessing) {
        GTMaterials.RhodiumSulfate.setProperty($PropertyKey.DUST, new $DustProperty());
    }
})

GTCEuStartupEvents.materialModification(event => {
    // Change materials' components
    GTMaterials.EchoShard.setComponents(GTMaterials.Quartzite.multiply(3), GTMaterials.Sculk.multiply(2))

    GTMaterials.Glowstone.setComponents(GTMaterials.TricalciumPhosphate.multiply(1), GTMaterials.Gold.multiply(1), GTMaterials.Barite.multiply(1))
    GTMaterials.Glowstone.setFormula("AuCa3(PO4)2BaSO4", true)

    GTMaterials.RhodiumPlatedPalladium.setComponents(GTMaterials.Palladium.multiply(3), GTMaterials.Rhodium.multiply(1), "2x lumium")
    GTMaterials.RhodiumPlatedPalladium.setFormula("Pd3Rh(SnFe)4(CuAg4)2", true)

    GTMaterials.Sugar.setComponents(GTMaterials.Carbon.multiply(12), GTMaterials.Water.multiply(11))
    GTMaterials.Sugar.setFormula("C12H22O11", true)

    // We keep Ingots in the material definition so we can replace it in the Ore Processing Diagram with vanilla Netherite Scrap, then remove it here.
    TagPrefix.ingot.setIgnored(GTMaterials.get("netherite_scrap"), Ingredient.of("minecraft:netherite_scrap"))

    GTMaterials.Neutronium.getProperty(PropertyKey.FLUID_PIPE).setThroughput(400)
    GTMaterials.Neutronium.getProperty(PropertyKey.FLUID_PIPE).setMaxFluidTemperature(10000)
    GTMaterials.Ultimet.getProperty(PropertyKey.ITEM_PIPE).setTransferRate(4)
    GTMaterials.Osmiridium.getProperty(PropertyKey.ITEM_PIPE).setTransferRate(12)
    GTMaterials.Americium.getProperty(PropertyKey.ITEM_PIPE).setTransferRate(20)

    // SetIgnoreds for AE2 materials
    TagPrefix.gem.setIgnored(GTMaterials.CertusQuartz, $AEItems.CERTUS_QUARTZ_CRYSTAL)
    TagPrefix.gem.setIgnored(GTMaterials.get("charged_certus_quartz"), $AEItems.CERTUS_QUARTZ_CRYSTAL_CHARGED)
    TagPrefix.gem.setIgnored(GTMaterials.get("fluix"), $AEItems.FLUIX_CRYSTAL)

    TagPrefix.dust.setIgnored(GTMaterials.CertusQuartz, $AEItems.CERTUS_QUARTZ_DUST)
    TagPrefix.dust.setIgnored(GTMaterials.get("fluix"), $AEItems.FLUIX_DUST)

    TagPrefix.block.setIgnoredBlock(GTMaterials.CertusQuartz, $AEBlocks.QUARTZ_BLOCK.block())
    TagPrefix.block.setIgnoredBlock(GTMaterials.get("fluix"), $AEBlocks.FLUIX_BLOCK.block())

    // Change Fluix block to only have 4 gems instead of 9
    TagPrefix.block.modifyMaterialAmount(GTMaterials.get("fluix"), 4)
})
