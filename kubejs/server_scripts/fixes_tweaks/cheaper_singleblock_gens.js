/**
 * Makes singleblock generators slightly cheaper.
 */
ServerEvents.recipes(event => {
    // Steam Turbines
    event.recipes.gtceu.shaped("gtceu:lv_steam_turbine", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:bronze_small_fluid_pipe",
        B: "#gtceu:circuits/lv",
        C: "gtceu:tin_rotor",
        D: "gtceu:lv_machine_hull",
        E: "gtceu:tin_single_cable",
        F: "gtceu:lv_electric_motor"
    }).id("gtceu:shaped/steam_turbine_lv").addMaterialInfo()
    event.recipes.gtceu.shaped("gtceu:mv_steam_turbine", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:steel_small_fluid_pipe",
        B: "#gtceu:circuits/mv",
        C: "gtceu:bronze_rotor",
        D: "gtceu:mv_machine_hull",
        E: "gtceu:copper_single_cable",
        F: "gtceu:mv_electric_motor"
    }).id("gtceu:shaped/steam_turbine_mv").addMaterialInfo()
    event.recipes.gtceu.shaped("gtceu:hv_steam_turbine", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:stainless_steel_small_fluid_pipe",
        B: "#gtceu:circuits/hv",
        C: "gtceu:steel_rotor",
        D: "gtceu:hv_machine_hull",
        E: "gtceu:gold_single_cable",
        F: "gtceu:hv_electric_motor"
    }).id("gtceu:shaped/steam_turbine_hv").addMaterialInfo()

    // Gas Turbines
    event.recipes.gtceu.shaped("gtceu:lv_gas_turbine", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:tin_rotor",
        B: "#gtceu:circuits/lv",
        C: "gtceu:lv_electric_motor",
        D: "gtceu:lv_machine_hull",
        E: "gtceu:tin_single_cable",
        F: "gtceu:small_steel_gear"
    }).id("gtceu:shaped/gas_turbine_lv").addMaterialInfo()
    event.recipes.gtceu.shaped("gtceu:mv_gas_turbine", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:bronze_rotor",
        B: "#gtceu:circuits/mv",
        C: "gtceu:mv_electric_motor",
        D: "gtceu:mv_machine_hull",
        E: "gtceu:copper_single_cable",
        F: "gtceu:small_aluminium_gear"
    }).id("gtceu:shaped/gas_turbine_mv").addMaterialInfo()
    event.recipes.gtceu.shaped("gtceu:hv_gas_turbine", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:steel_rotor",
        B: "#gtceu:circuits/hv",
        C: "gtceu:hv_electric_motor",
        D: "gtceu:hv_machine_hull",
        E: "gtceu:gold_single_cable",
        F: "gtceu:small_stainless_steel_gear"
    }).id("gtceu:shaped/gas_turbine_hv").addMaterialInfo()

    // Combustion Generators
    event.recipes.gtceu.shaped("gtceu:lv_combustion", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:small_steel_gear",
        B: "gtceu:lv_electric_piston",
        C: "gtceu:lv_electric_motor",
        D: "gtceu:lv_machine_hull",
        E: "gtceu:tin_single_cable",
        F: "#gtceu:circuits/lv"
    }).id("gtceu:shaped/diesel_generator_lv").addMaterialInfo()
    event.recipes.gtceu.shaped("gtceu:mv_combustion", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:small_aluminium_gear",
        B: "gtceu:mv_electric_piston",
        C: "gtceu:mv_electric_motor",
        D: "gtceu:mv_machine_hull",
        E: "gtceu:copper_single_cable",
        F: "#gtceu:circuits/mv"
    }).id("gtceu:shaped/diesel_generator_mv").addMaterialInfo()
    event.recipes.gtceu.shaped("gtceu:hv_combustion", [
        "ABA",
        "CDC",
        "EFE"
    ], {
        A: "gtceu:small_stainless_steel_gear",
        B: "gtceu:hv_electric_piston",
        C: "gtceu:hv_electric_motor",
        D: "gtceu:hv_machine_hull",
        E: "gtceu:gold_single_cable",
        F: "#gtceu:circuits/hv"
    }).id("gtceu:shaped/diesel_generator_hv").addMaterialInfo()
})
