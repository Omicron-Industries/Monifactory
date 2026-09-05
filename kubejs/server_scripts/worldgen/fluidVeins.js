/**
 * Registration of GT fluid veins on Ad Astra planets and in the void
 */

const Registries = Java.loadClass("net.minecraft.core.registries.Registries")
const ResourceKey = Java.loadClass("net.minecraft.resources.ResourceKey")
const martianPolarCapsResourceKey = ResourceKey.create(Registries.BIOME, "ad_astra:martian_polar_caps")
const venusWastelandsResourceKey = ResourceKey.create(Registries.BIOME, "ad_astra:venus_wastelands")
const infernalVenusBarrensResourceKey = ResourceKey.create(Registries.BIOME, "ad_astra:infernal_venus_barrens")

GTCEuServerEvents.fluidVeins(event => {

    // Void dim oil
    event.add("kubejs:void/raw_oil", vein => {
        vein.dimensions("javd:void")
        vein.fluid(() => Fluid.of("gtceu:oil_medium").fluid)
        vein.weight(100)
        vein.minimumYield(200)
        vein.maximumYield(250)
        vein.depletionAmount(1)
        vein.depletionChance(50)
        vein.depletedYield(20)
    })

    event.add("kubejs:void/oil", vein => {
        vein.dimensions("javd:void")
        vein.fluid(() => Fluid.of("gtceu:oil").fluid)
        vein.weight(20)
        vein.minimumYield(200)
        vein.maximumYield(250)
        vein.depletionAmount(1)
        vein.depletionChance(50)
        vein.depletedYield(20)
    })


    // Luna fluid veins
    event.add("kubejs:moon/deuterium", vein => {
        vein.dimensions("ad_astra:moon")
        vein.fluid(() => Fluid.of("gtceu:deuterium").fluid)
        vein.weight(60)
        vein.minimumYield(10)
        vein.maximumYield(30)
        vein.depletionAmount(1)
        vein.depletionChance(50)
        vein.depletedYield(5)
    })

    event.add("kubejs:moon/helium_3", vein => {
        vein.dimensions("ad_astra:moon")
        vein.fluid(() => Fluid.of("gtceu:helium_3").fluid)
        vein.weight(35)
        vein.minimumYield(5)
        vein.maximumYield(20)
        vein.depletionAmount(1)
        vein.depletionChance(50)
        vein.depletedYield(3)
    })

    // Mars fluid veins (haha water on Mars)
    event.add("kubejs:mars/ice", vein => {
        vein.dimensions("ad_astra:mars")
        vein.biomes(200, martianPolarCapsResourceKey)
        vein.fluid(() => Fluid.of("gtceu:ice").fluid)
        vein.weight(0)
        vein.minimumYield(100)
        vein.maximumYield(300)
        vein.depletionAmount(1)
        vein.depletionChance(50)
        vein.depletedYield(3)
    })

    event.add("kubejs:mars/ethylene", vein => {
        vein.dimensions("ad_astra:mars")
        vein.fluid(() => Fluid.of("gtceu:ethylene").fluid)
        vein.weight(65)
        vein.minimumYield(150)
        vein.maximumYield(400)
        vein.depletionAmount(1)
        vein.depletionChance(50)
        vein.depletedYield(10)
    })

    event.add("kubejs:mars/fluorine", vein => {
        vein.dimensions("ad_astra:mars")
        vein.fluid(() => Fluid.of("gtceu:fluorine").fluid)
        vein.weight(35)
        vein.minimumYield(50)
        vein.maximumYield(100)
        vein.depletionAmount(1)
        vein.depletionChance(100)
        vein.depletedYield(0)
    })

    // Venus fluid veins
    event.add("kubejs:venus/sulfuric_acid", vein => {
        vein.dimensions("ad_astra:venus")
        vein.fluid(() => Fluid.of("gtceu:sulfuric_acid").fluid)
        vein.weight(65)
        vein.minimumYield(50)
        vein.maximumYield(200)
        vein.depletionAmount(1)
        vein.depletionChance(30)
        vein.depletedYield(5)
    })

    event.add("kubejs:venus/sulfuric_gas", vein => {
        vein.dimensions("ad_astra:venus")
        vein.fluid(() => Fluid.of("gtceu:sulfuric_gas").fluid)
        vein.biomes(35, venusWastelandsResourceKey)
        vein.weight(0)
        vein.minimumYield(100)
        vein.maximumYield(400)
        vein.depletionAmount(1)
        vein.depletionChance(100)
        vein.depletedYield(15)
    })

    event.add("kubejs:venus/blaze", vein => {
        vein.dimensions("ad_astra:venus")
        vein.fluid(() => Fluid.of("gtceu:blaze").fluid)
        vein.biomes(200, infernalVenusBarrensResourceKey)
        vein.weight(0)
        vein.minimumYield(70)
        vein.maximumYield(120)
        vein.depletionAmount(1)
        vein.depletionChance(90)
        vein.depletedYield(0)
    })

    // Mercury fluid veins (Haha Mercury is made of Mercury)
    event.add("kubejs:mercury/lava", vein => {
        vein.dimensions("ad_astra:mercury")
        vein.fluid(() => Fluid.of("minecraft:lava").fluid)
        vein.weight(55)
        vein.minimumYield(75)
        vein.maximumYield(200)
        vein.depletionAmount(1)
        vein.depletionChance(100)
        vein.depletedYield(15)
    })

    event.add("kubejs:mercury/mercury", vein => {
        vein.dimensions("ad_astra:mercury")
        vein.fluid(() => Fluid.of("gtceu:mercury").fluid)
        vein.weight(15)
        vein.minimumYield(100)
        vein.maximumYield(150)
        vein.depletionAmount(1)
        vein.depletionChance(100)
        vein.depletedYield(0)
    })

    event.add("kubejs:mercury/sodium_persulfate", vein => {
        vein.dimensions("ad_astra:mercury")
        vein.fluid(() => Fluid.of("gtceu:sodium_persulfate").fluid)
        vein.weight(20)
        vein.minimumYield(50)
        vein.maximumYield(70)
        vein.depletionAmount(5)
        vein.depletionChance(20)
        vein.depletedYield(20)
    })

    event.add("kubejs:mercury/pyrotheum", vein => {
        vein.dimensions("ad_astra:mercury")
        vein.fluid(() => Fluid.of("kubejs:molten_pyrotheum").fluid)
        vein.weight(10)
        vein.minimumYield(10)
        vein.maximumYield(50)
        vein.depletionAmount(1)
        vein.depletionChance(100)
        vein.depletedYield(0)
    })

    // Glacio fluid veins
    event.add("kubejs:glacio/oil_heavy", vein => {
        vein.dimensions("ad_astra:glacio")
        vein.fluid(() => Fluid.of("gtceu:oil_heavy").fluid)
        vein.weight(60)
        vein.minimumYield(200)
        vein.maximumYield(250)
        vein.depletionAmount(2)
        vein.depletionChance(100)
        vein.depletedYield(40)
    })

    event.add("kubejs:glacio/chlorobenzene", vein => {
        vein.dimensions("ad_astra:glacio")
        vein.fluid(() => Fluid.of("gtceu:chlorobenzene").fluid)
        vein.weight(30)
        vein.minimumYield(100)
        vein.maximumYield(200)
        vein.depletionAmount(1)
        vein.depletionChance(30)
        vein.depletedYield(10)
    })

    event.add("kubejs:glacio/cryotheum", vein => {
        vein.dimensions("ad_astra:glacio")
        vein.fluid(() => Fluid.of("kubejs:molten_cryotheum").fluid)
        vein.weight(10)
        vein.minimumYield(10)
        vein.maximumYield(50)
        vein.depletionAmount(1)
        vein.depletionChance(100)
        vein.depletedYield(0)
    })
})
