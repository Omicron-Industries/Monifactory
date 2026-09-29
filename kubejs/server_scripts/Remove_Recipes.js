/**
 * Recipe removals that don't belong in other files.
 *
 * If you seek to both hide an item/fluid and remove it from all recipes and tags, then look into
 * KubeJS/startup_scripts/nukeLists/item.js and KubeJS/startup_scripts/nukeLists/fluid.js
 */

ServerEvents.recipes(event => {
    // Snad
    event.remove("snad:snadrecipe")
    event.remove("snad:red_snad")

    // GT
    event.remove({ id: "gtceu:mixer/rhodium_plated_palladium" })
    event.remove({ id: "gtceu:electrolyzer/decomposition_electrolyzing_gunpowder"})
    event.remove({ id: "gtceu:assembly_line/field_generator_zpm"})
    event.remove({ id: "gtceu:assembly_line/field_generator_zpm/advanced_soldering_alloy"})
    event.remove({ id: "gtceu:assembly_line/field_generator_zpm/living_soldering_alloy"})

    // Redstone arsenal
    event.remove({ id: "redstone_arsenal:materials/flux_dust" })
    event.remove({ id: "redstone_arsenal:materials/flux_ingot_fire_charge_from_dust" })
    event.remove({ id: "redstone_arsenal:materials/flux_ingot_fire_charge" })
    event.remove({ id: "redstone_arsenal:smelting/flux_ingot_from_dust_blasting" })
    event.remove({ id: "redstone_arsenal:smelting/flux_ingot_from_dust_smelting" })
    event.remove({ id: "redstone_arsenal:storage/flux_ingot_from_block" })
    event.remove({ id: "redstone_arsenal:storage/flux_metal_block" })

    // NuclearCraft
    event.remove(/nuclearcraft:fusion.*/)
    event.remove(/nuclearcraft:.*electromagnet.*/)
    event.remove({ output: ["nuclearcraft:tough_alloy_ingot"] });
    event.remove({ output: ["nuclearcraft:rock_crusher", "nuclearcraft:decay_hastener", "nuclearcraft:irradiator", "nuclearcraft:nuclear_furnace", "nuclearcraft:extractor", "nuclearcraft:electrolyzer", "nuclearcraft:pressurizer", "nuclearcraft:alloy_smelter", "nuclearcraft:centrifuge", "nuclearcraft:manufactory", "nuclearcraft:gas_scrubber", "nuclearcraft:fluid_enricher", "nuclearcraft:isotope_separator", "nuclearcraft:fluid_infuser", "nuclearcraft:chemical_reactor", "nuclearcraft:analyzer", "nuclearcraft:ingot_former", "nuclearcraft:pump", "nuclearcraft:fuel_reprocessor", "nuclearcraft:leacher", "nuclearcraft:crystallizer", "nuclearcraft:assembler", "nuclearcraft:steam_turbine", "nuclearcraft:melter"] })
    event.remove({ output: ["nuclearcraft:nitrogen_collector", "nuclearcraft:compact_nitrogen_collector", "nuclearcraft:lava_collector", "nuclearcraft:dense_nitrogen_collector", "nuclearcraft:compact_helium_collector", "nuclearcraft:helium_collector", "nuclearcraft:dense_helium_collector"] })
    event.remove({ output: ["nuclearcraft:magnesium_deepslate_ore", "nuclearcraft:thorium_deepslate_ore", "nuclearcraft:uranium_deepslate_ore", "nuclearcraft:magnesium_ore", "nuclearcraft:boron_deepslate_ore", "nuclearcraft:cobalt_ore", "nuclearcraft:platinum_deepslate_ore", "nuclearcraft:silver_deepslate_ore", "nuclearcraft:lead_ore", "nuclearcraft:lithium_ore", "nuclearcraft:thorium_ore", "nuclearcraft:tin_ore", "nuclearcraft:cobalt_deepslate_ore", "nuclearcraft:silver_ore", "nuclearcraft:uranium_ore", "nuclearcraft:zinc_ore", "nuclearcraft:boron_ore", "nuclearcraft:lithium_deepslate_ore"] })
    event.remove({ output: ["nuclearcraft:foursmore", "nuclearcraft:evenmoresmore", "nuclearcraft:moresmore", "nuclearcraft:smore"] })
    event.remove({ output: ["nuclearcraft:quantum_flux_regulator", "nuclearcraft:fission_reactor_irradiation_chamber", "nuclearcraft:chamber_port", "nuclearcraft:chamber_terminal", "nuclearcraft:event_horizon_stabilizer", "nuclearcraft:quantum_transformer", "nuclearcraft:black_hole", "nuclearcraft:neutronium_frame", "nuclearcraft:photon_concentrator", "nuclearcraft:redstone_dimmer"] })
    event.remove({ id: "minecraft:nuclearcraft_hard_carbon_dust" })

    // Water Collector
    event.remove({ output: /water_collector/ });

    // Remove Thermal gunpowder recipes - they use empty tags a Mixer recipe already exists
    event.remove({ id: /^thermal:gunpowder/ })

    // Remove recipes relating to Americium Plasma that aren't caught by the nukelist for some reason
    event.remove({ id: "gtceu:plasma_generator/americium" })
    event.remove({ id: "gtceu:fusion_reactor/plutonium_241_and_hydrogen_gas_to_americium_plasma" })
})
