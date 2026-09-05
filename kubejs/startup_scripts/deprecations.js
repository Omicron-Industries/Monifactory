/**
 * All deprecated items and fluids.
 * See deprecation_pipeline.js in this folder to see how the process works.
 */

/* *** TO BE REMOVED FROM THIS FILE IN MONIFACTORY 0.14 *** */

// Exoskeleton Legs
deprecateItem("kubejs:lv_exoskeleton_legs", "gtexolegs:lv_exoskeleton_legs", "LV Exoskeleton Legs")
deprecateItem("kubejs:mv_exoskeleton_legs", "gtexolegs:mv_exoskeleton_legs", "MV Exoskeleton Legs")
deprecateItem("kubejs:hv_exoskeleton_legs", "gtexolegs:hv_exoskeleton_legs", "HV Exoskeleton Legs")
deprecateItem("kubejs:ev_exoskeleton_legs", "gtexolegs:ev_exoskeleton_legs", "EV Exoskeleton Legs")
deprecateItem("kubejs:iv_exoskeleton_legs", "gtexolegs:iv_exoskeleton_legs", "IV Exoskeleton Legs")

// Traveller's Boots
deprecateItem("travellersbootsreloaded:travellers_boots_tier1", "gtexolegs:lv_exoskeleton_legs", "Traveller's Boots Tier 1")
deprecateItem("travellersbootsreloaded:travellers_boots_tier2", "gtexolegs:mv_exoskeleton_legs", "Traveller's Boots Tier 2")
deprecateItem("travellersbootsreloaded:travellers_boots_tier3", "gtexolegs:hv_exoskeleton_legs", "Traveller's Boots Tier 3")
deprecateItem("travellersbootsreloaded:travellers_boots_tier4", "gtexolegs:ev_exoskeleton_legs", "Traveller's Boots Tier 4")
deprecateItem("travellersbootsreloaded:travellers_boots_tier5", "gtexolegs:iv_exoskeleton_legs", "Traveller's Boots Tier 5")

// Primal Mana
deprecateFluid("kubejs:molten_primal_mana", "gtceu:mana", "Primal Mana")

// Dilithium
deprecateItem("kubejs:dilithium_crystal", "gtceu:dilithium_gem", "Dilithium")

// Ancient Debris
deprecateItem("kubejs:crushed_ancient_debris", "gtceu:crushed_netherite_scrap_ore", "Crushed Ancient Debris")

// Saline Antiseptic (rename after typo)
deprecateFluid("gtceu:saline_antisceptic", "gtceu:saline_antiseptic", "Saline Antiseptic")

// Old Nethline Items
deprecateItem("kubejs:diamond_lattice", "6x minecraft:diamond", "Diamond Lattice")
deprecateItem("kubejs:purified_ancient_debris_dust", "gtceu:netherite_scrap_dust", "Purified Ancient Debris Dust")
deprecateItem("kubejs:processed_ancient_debris_dust", "gtceu:netherite_scrap_dust", "Processed Ancient Debris Dust")
deprecateItem("kubejs:inert_netherite_scrap", "kubejs:reactive_netherite_cluster", "Inert Netherite Scrap")
deprecateItem("kubejs:activated_netherite_scrap", "kubejs:reactive_netherite_cluster", "Activated Netherite Scrap")

// Matter Circuits
deprecateItem("kubejs:matter_processing_unit", "kubejs:optical_processing_unit", "Matter Processing Unit")
deprecateItem("kubejs:matter_processor", "kubejs:optical_processor", "Matter Processor")
deprecateItem("kubejs:matter_processor_assembly", "kubejs:optical_processor_assembly", "Matter Processor Assembly")
deprecateItem("kubejs:matter_processor_computer", "kubejs:optical_processor_computer", "Matter Processor Computer")
deprecateItem("kubejs:matter_processor_mainframe", "kubejs:optical_processor_mainframe", "Matter Processor Mainframe")

// Matter Circuits
deprecateItem("kubejs:monic_circuit_board", "kubejs:null_infused_circuit_board", "Extradimensional Circuit Board")
deprecateItem("kubejs:monic_processing_unit", "kubejs:null_infused_printed_circuit_board", "Extradimensional Printed Circuit Board")
deprecateItem("kubejs:monic_processor", "kubejs:extradimensional_processor", "Extradimensional Processor")
deprecateItem("kubejs:monic_processor_assembly", "kubejs:extradimensional_processor_assembly", "Extradimensional Processor Assembly")
deprecateItem("kubejs:monic_processor_computer", "kubejs:extradimensional_processor_computer", "Extradimensional Processor Computer")
deprecateItem("kubejs:monic_processor_mainframe", "kubejs:extradimensional_processor_mainframe", "Extradimensional Processor Mainframe")

// Oganesson, Einsteinium
deprecateItem("kubejs:stabilized_oganesson", "kubejs:stabilized_californium", "Stabilized Oganesson")
deprecateFluid("gtceu:oganesson", "gtceu:californium", "Oganesson")
deprecateItem("kubejs:stabilized_einsteinium", "kubejs:stabilized_californium", "Stabilized Einsteinium")
deprecateFluid("gtceu:einsteinium", "gtceu:californium", "Einsteinium")

// Naqfuel old IDs
deprecateFluid("gtceu:naq_fuel_t1", "gtceu:crude_naquadah_fuel", "T1 Naq Fuel")
deprecateFluid("gtceu:naq_fuel_t2", "gtceu:naquadah_fuel", "T2 Naq Fuel")

// Coremod stuff
deprecateBlock("kubejs:microverse_casing", "monilabs:microverse_casing", "Microverse Casing")
deprecateBlock("kubejs:dimensional_stabilization_netherite_casing", "monilabs:dimensional_stabilization_netherite_casing", "Dimensional Stabilization Netherite Casing")
deprecateBlock("kubejs:cryolobus_casing", "monilabs:cryolobus_casing", "Cryolobus Casing")
deprecateBlock("kubejs:bioalloy_casing", "monilabs:bioalloy_casing", "Bioalloy Casing")
deprecateBlock("kubejs:bioalloy_fusion_casing", "monilabs:bioalloy_fusion_casing", "Bioalloy Fusion Casing")

deprecateItem("gtceu:eltz_ingot", "monilabs:eltz_ingot", "Eltz Ingot")
deprecateItem("gtceu:crystal_matrix_ingot", "monilabs:crystal_matrix_ingot", "Crystal Matrix Ingot")
deprecateItem("gtceu:sculk_bioalloy_ingot", "monilabs:sculk_bioalloy_ingot", "Sculk Bioalloy Ingot")

deprecateBlock("gtceu:basic_microverse_projector", "monilabs:basic_microverse_projector", "Basic Microverse Projector")
deprecateBlock("gtceu:advanced_microverse_projector", "monilabs:advanced_microverse_projector", "Advanced Microverse Projector")
deprecateBlock("gtceu:advanced_microverse_projector_ii", "monilabs:elite_microverse_projector", "Advanced Microverse Projector II")
deprecateBlock("gtceu:hyperbolic_microverse_projector", "monilabs:hyperbolic_microverse_projector", "Hyperbolic Microverse Projector")

// Parallel Hatches
deprecateBlock("gtceu:uhv_uhv_parallel_hatch", "monilabs:uhv_parallel_hatch", "Giga Parallel Hatch")

deprecateBlock("gtceu:uev_uev_parallel_hatch", "monilabs:uev_parallel_hatch", "Omega Parallel Hatch")

// Osmiridium/Iridosmine
deprecateItem("gtceu:raw_iridosmineyes", "gtceu:raw_osmiridium", "Raw Iridosmine")
deprecateItem("gtceu:raw_osmiridiumyes", "gtceu:raw_iridosmine", "Raw Osmiridium")

deprecateItem("gtceu:iridosmineyes_dust", "gtceu:osmiridium_dust", "Iridosmine Dust")
deprecateItem("gtceu:osmiridiumyes_dust", "gtceu:iridosmine_dust", "Osmiridium Dust")

deprecateBlock("gtceu:glacio_iridosmineyes_ore", "gtceu:glacio_osmiridium_ore", "Glacio Iridosmine Ore")
deprecateBlock("gtceu:glacio_osmiridiumyes_ore", "gtceu:glacio_iridosmine_ore", "Glacio Osmiridium Ore")

// Chlorine Trifluoride
deprecateFluid("gtceu:chlorine_triflouride", "gtceu:chlorine_trifluoride", "Chlorine Trifluoride")

// GT items for AE2 mats
deprecateItem("gtceu:certus_quartz_gem", "ae2:certus_quartz_crystal", "Certus Quartz Crystal")
deprecateItem("gtceu:charged_certus_quartz_gem", "ae2:charged_certus_quartz_crystal", "Charged Certus Quartz Crystal")
deprecateItem("gtceu:fluix_gem", "ae2:fluix_crystal", "Fluix Crystal")

deprecateItem("gtceu:certus_quartz_dust", "ae2:certus_quartz_dust", "Certus Quartz Dust")
deprecateItem("gtceu:fluix_dust", "ae2:fluix_dust", "Fluix Dust")

deprecateBlock("gtceu:certus_quartz_block", "ae2:quartz_block", "Certus Quartz Block")
deprecateBlock("gtceu:fluix_block", "ae2:fluix_block", "Fluix Block")

// Universe Boule
deprecateItem("kubejs:universe_boule", "kubejs:null_boule", "Universe Boule")
deprecateItem("kubejs:universe_wafer", "kubejs:null_wafer", "Universe Wafer")

// Guardian Scale processing
deprecateItem("kubejs:guardian_scale", "minecraft:prismarine_shard", "Guardian Scale")
deprecateFluid("gtceu:guardian_scale_slurry", "gtceu:prismarine_slurry", "Guardian Scale Slurry")

/* *** TO BE REMOVED FROM THIS FILE IN MONIFACTORY 0.15 *** */

// Lumium, Signalum, Enderium, Cryolobus wires. Sculk Superconductor as a material was removed entirely.
const deprecated_thermal_wire_materials = ["lumium", "signalum", "enderium", "cryolobus"]
deprecated_thermal_wire_materials.forEach(material => {
    deprecateBlock(`gtceu:${material}_single_wire`, `4x gtceu:${material}_nugget`)
    deprecateBlock(`gtceu:${material}_double_wire`, `1x gtceu:${material}_ingot`)
    deprecateBlock(`gtceu:${material}_quadruple_wire`, `2x gtceu:${material}_ingot`)
    deprecateBlock(`gtceu:${material}_octal_wire`, `4x gtceu:${material}_ingot`)
    deprecateBlock(`gtceu:${material}_hex_wire`, `8x gtceu:${material}_ingot`)
})
