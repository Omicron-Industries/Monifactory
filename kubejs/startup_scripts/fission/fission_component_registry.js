// priority: 0
/**
 * Registry for Fission Reactor components for use with Phoenix Fission.
 * Not implemented on these components: Tier, Neutron bias
 */
StartupEvents.registry("block", event => {
    // Fuel Rods. References fission fuels data in fission_fuel_registry.js
    fission_fuels.forEach(fuelType => {
        let identifier = ""
        if(fuelType.enrichment) {
            // Low-enriched fuels
            identifier = `le${fuelType.category.charAt(0)}_${fuelType.identifier}`
            event.create(`phoenix_fission:${identifier}_fuel_rod`, "fission_fuel_rod")
                .baseHeatProduction(fuelType.baseHeat)
                .durationTicks(fuelType.depletionTime * GTValues.SECONDS)
                .amountPerCycle(1)
                .fuelKey(`phoenix_fission:${identifier}_fuel`)
                .outputKey(`phoenix_fission:depleted_${identifier}_fuel`)
                .textureAll("gtceu:block/casings/mechanic/fuel_cell")

            // High-enriched fuels
            identifier = `he${fuelType.category.charAt(0)}_${fuelType.identifier}`
            event.create(`phoenix_fission:${identifier}_fuel_rod`, "fission_fuel_rod")
                .baseHeatProduction(fuelType.baseHeat * 3)
                .durationTicks(fuelType.depletionTime * GTValues.SECONDS)
                .amountPerCycle(1)
                .fuelKey(`phoenix_fission:${identifier}_fuel`)
                .outputKey(`phoenix_fission:depleted_${identifier}_fuel`)
                .textureAll("gtceu:block/casings/mechanic/fuel_cell")
        } else {
            identifier = fuelType.identifier;
            event.create(`phoenix_fission:${identifier}_fuel_rod`, "fission_fuel_rod")
                .baseHeatProduction(fuelType.baseHeat)
                .durationTicks(fuelType.depletionTime * GTValues.SECONDS)
                .amountPerCycle(1)
                .fuelKey(`phoenix_fission:${identifier}_fuel`)
                .outputKey(`phoenix_fission:depleted_${identifier}_fuel`)
                .textureAll("gtceu:block/casings/mechanic/fuel_cell")
        }
    })

    // Passive Heating/Cooling
    event.create("phoenix_fission:reactor_heat_vent", "fission_cooler")
        .isPassive(true)
        .flatCoolingHUt(20.0)
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    event.create("phoenix_fission:cryotheum_heat_sink", "fission_cooler")
        .isPassive(true)
        .flatCoolingHUt(50.0)
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    // I wish negative cooling values would work.
    // This could be nice as a way to artificially heat a reactor.
    /*
    event.create("phoenix_fission:pyrotheum_passive_heater", "fission_cooler")
        .isPassive(true)
        .flatCoolingHUt(-200.0)
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")
    */

    // Active Cooling
    event.create("phoenix_fission:water_cooler", "fission_cooler")
        .coolerTemperature(300)
        .coolantUsagePerTick(1000)
        .isPassive(false)
        .requiredCoolantMaterialId("minecraft:water")
        .outputCoolantFluidId("gtceu:steam")
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    event.create("phoenix_fission:distilled_water_cooler", "fission_cooler")
        .coolerTemperature(295)
        .coolantUsagePerTick(1000)
        .isPassive(false)
        .requiredCoolantMaterialId("gtceu:distilled_water")
        .outputCoolantFluidId("gtceu:superheated_steam")
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    event.create("phoenix_fission:ice_cooler", "fission_cooler")
        .coolerTemperature(273)
        .coolantUsagePerTick(250)
        .isPassive(false)
        .requiredCoolantMaterialId("gtceu:ice")
        .outputCoolantFluidId("gtceu:distilled_water")
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    event.create("phoenix_fission:sodium_potassium_cooler", "fission_cooler")
        .coolerTemperature(293)
        .coolantUsagePerTick(250)
        .isPassive(false)
        .requiredCoolantMaterialId("gtceu:sodium_potassium")
        .outputCoolantFluidId("gtceu:hot_sodium_potassium")
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    event.create("phoenix_fission:liquid_helium_cooler", "fission_cooler")
        .coolerTemperature(100)
        .coolantUsagePerTick(250)
        .isPassive(false)
        .requiredCoolantMaterialId("gtceu:liquid_helium")
        .outputCoolantFluidId("gtceu:helium")
        .textureAll("gtceu:block/casings/mechanic/fuel_cell")

    // Moderators
    event.create("phoenix_fission:graphite_moderator", "fission_moderator")
        .euBoost(15)
        .fuelDiscount(5)
        .textureAll("gtceu:block/casings/mechanic/moderation_cell")

    event.create("phoenix_fission:beryllium_moderator", "fission_moderator")
        .euBoost(10)
        .fuelDiscount(10)
        .textureAll("gtceu:block/casings/mechanic/moderation_cell")

    // Example components saved for later
    /*
    event.create("thorium_msr_liner", "msr_core_liner")
        .displayName("Thorium Salt MSR Liner")
        .tier(3)
        .fluidFlowRate(100)
        .heatPerMb(25.5)
        .inputFluidId("gtceu:thorium")
        .outputFluidId("gtceu:depleted_thorium")
        .texture("gtceu:block/casings/solid/ev");


    event.create("thorium_breeding_blanket", "fission_blanket")
        .displayName("Thorium Breeding Blanket")
        .tier(2)
        .durationTicks(2400)
        .amountPerCycle(1)
        .inputKey("gtceu:thorium_dust")
        .texture("phoenix_fission:block/fission/blanket_base")
        .tintColor(0x7DE7FF);
    */
})

GTCEuStartupEvents.registry("gtceu:material", event => {
    // Hot Coolants
    event.create("superheated_steam")
        .gas(773)
        .color(0xFFFFFF)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .components(GTMaterials.Hydrogen.multiply(2), GTMaterials.Oxygen.multiply(1))

    event.create("hot_sodium_potassium")
        .liquid(773)
        .color(0xc8fcb4)
        .flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
        .components(GTMaterials.Sodium.multiply(1), GTMaterials.Potassium.multiply(1))
})
