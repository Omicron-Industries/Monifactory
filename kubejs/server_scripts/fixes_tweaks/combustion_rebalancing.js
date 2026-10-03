/**
 * Replaces some base GregTech combustion and oil distillation recipes with more balanced versions.
 * Well, "balanced" in a pack where synthetic Octane and JEAN exist.
 */
ServerEvents.recipes(event => {
    // For a reference point, Gasoline is 50 ticks per mB or 1600 EU/mB.
    // Similarly, High Octane Gasoline is 100 ticks per mB or 3200 EU/mB.

    event.remove({ id: "gtceu:combustion_generator/sulfuric_light_fuel" })
    event.remove({ id: "gtceu:combustion_generator/light_fuel" })
    event.remove({ id: "gtceu:combustion_generator/naphtha" })
    event.remove({ id: "gtceu:gas_turbine/sulfuric_naphtha" })
    event.remove({ id: "gtceu:gas_turbine/sulfuric_gas" })
    event.remove({ id: "gtceu:gas_turbine/refinery_gas" })
    event.remove({ id: "gtceu:gas_turbine/natural_gas" })

    event.recipes.gtceu.mixer("diesel")
        .inputFluids("gtceu:light_fuel 5000", "gtceu:heavy_fuel 1000")
        .outputFluids("gtceu:diesel 6000")
        .duration(30)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.combustion_generator("biodiesel")
        .inputFluids("gtceu:bio_diesel 1")
        .duration(15)    // 87.5% more than default GT
        .EUt(-GTValues.V[GTValues.LV])

    event.recipes.gtceu.combustion_generator("cetane_diesel")
        .inputFluids("gtceu:cetane_boosted_diesel 1")   // -50% cost compared to default GT
        .duration(45)
        .EUt(-GTValues.V[GTValues.LV])

    event.recipes.gtceu.combustion_generator("rocket_fuel")
        .inputFluids("gtceu:rocket_fuel 8")   // -50% cost compared to default GT
        .duration(125)
        .EUt(-GTValues.V[GTValues.LV])

    // Reduce Naphtha output of Raw Oil
    event.recipes.gtceu.distillation_tower("distill_raw_oil")
        .inputFluids("gtceu:oil_medium 100")
        .outputFluids("gtceu:sulfuric_heavy_fuel 15", "gtceu:sulfuric_light_fuel 75", "gtceu:sulfuric_naphtha 120", "gtceu:sulfuric_gas 60")
        .duration(20)
        .EUt(0.75 * GTValues.V[GTValues.MV])
})
