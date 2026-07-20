/**
 * Tooltips under item names
 */

const FusionReactorMachine = Java.loadClass("com.gregtechceu.gtceu.common.machine.multiblock.electric.FusionReactorMachine")

ItemEvents.tooltip(tooltip => {
    // Microminers
    function microminer_tooltip(tier) {
        tooltip.add(`kubejs:microminer_t${tier}`, Text.translatable(`item.kubejs.microminer_t${tier}.desc`))
    }
    for (let i = 1; i <= 12; i++) {
        microminer_tooltip(i)
    }

    tooltip.add("kubejs:microminer_t2half", Text.translatable("item.kubejs.microminer_t2half.desc"))
    tooltip.add("kubejs:microminer_t4half", Text.translatable("item.kubejs.microminer_t4half.desc"))

    tooltip.addAdvanced(["/kubejs:stabilized_microminer/"], (item, adv, text) => {
        text.add(1, Text.translatable("item.kubejs.stabilized_microminer.tooltip.1"))
        text.add(2, Text.translatable("item.kubejs.stabilized_microminer.tooltip.2"))
        text.add(3, Text.translatable("item.kubejs.stabilized_microminer.tooltip.3"))
    })

    tooltip.addAdvanced(["/kubejs:microminer.*damaged/"], (item, adv, text) => {
        text.add(1, Text.translatable("item.kubejs.damaged_microminer.tooltip"))
    })

    // Microminer Components
    tooltip.add("kubejs:universal_navigator", Text.translatable("kubejs.universal_navigator.tooltip"))

    // Assembly line ordering
    if (doAssemblyLineOrderingWarning) {
        tooltip.add("gtceu:assembly_line", Text.translatable("gtceu.assembly_line.tooltip.expertmode"))
    } else {
        tooltip.add("gtceu:assembly_line", Text.translatable("gtceu.assembly_line.tooltip.normalandhardmode"))
    }

    // Meowni Plush
    if (doMeowniPlush) {
        tooltip.add("kubejs:meowni_plush", Text.translatable("kubejs.meowni_plush.tooltip.hardmode.1"))
        tooltip.add("kubejs:meowni_plush", Text.translatable("kubejs.meowni_plush.tooltip.hardmode.2"))
    } else {
        tooltip.add("kubejs:meowni_plush", Text.translatable("kubejs.meowni_plush.tooltip.normal.1"))
        tooltip.add("kubejs:meowni_plush", Text.translatable("kubejs.meowni_plush.tooltip.normal.2"))
    }

    // Questbook
    tooltip.addAdvanced("ftbquests:book", (item, adv, text) => { text.add(2, Text.gray(Text.translatable("ftbquests.book.tooltip"))) })

    tooltip.add("patchouli:guide_book", Text.translatable("item.patchouli.guide_book.tooltip"))
    // Redstone Clock
    tooltip.add("redstoneclock:redstone_clock", Text.translatable("redstoneclock.redstone_clock.tooltip"))

    // HNN Data Model
    tooltip.add("hostilenetworks:blank_data_model", Text.translatable("hostilenetworks.blank_data_model.tooltip"))

    // HNN Matters
    tooltip.add("hostilenetworks:overworld_prediction", Text.translatable("hostilenetworks.overworld_prediction.tooltip"))
    tooltip.add("hostilenetworks:nether_prediction", Text.translatable("hostilenetworks.nether_prediction.tooltip"))
    tooltip.add("hostilenetworks:end_prediction", Text.translatable("hostilenetworks.end_prediction.tooltip"))

    // Conduits
    tooltip.add("enderio:conductive_conduit", Text.translatable("enderio.conductive_conduit.tooltip"))
    tooltip.add("enderio:energetic_conduit", Text.translatable("enderio.energetic_conduit.tooltip"))
    tooltip.add("enderio:vibrant_conduit", Text.translatable("enderio.vibrant_conduit.tooltip"))
    tooltip.add("enderio:endsteel_conduit", Text.translatable("enderio.endsteel_conduit.tooltip"))
    tooltip.add("enderio:lumium_conduit", Text.translatable("enderio.lumium_conduit.tooltip"))
    tooltip.add("enderio:signalum_conduit", Text.translatable("enderio.signalum_conduit.tooltip"))
    tooltip.add("enderio:enderium_conduit", Text.translatable("enderio.enderium_conduit.tooltip"))
    tooltip.add("enderio:cryolobus_conduit", Text.translatable("enderio.cryolobus_conduit.tooltip"))
    tooltip.add("enderio:sculk_superconductor_conduit", Text.translatable("enderio.sculk_superconductor_conduit.tooltip"))

    tooltip.add("thermal:device_rock_gen", Text.translatable("thermal.device_rock_gen.tooltip"))
    tooltip.add("thermal:device_water_gen", Text.translatable("thermal.device_water_gen.tooltip"))

    // Circuits
    tooltip.addAdvanced("kubejs:optical_processor_mainframe", (item, adv, text) => { text.add(1, Text.gold(Text.translatable("item.kubejs.uev_tier_circuit"))) })
    tooltip.addAdvanced("kubejs:optical_processor_computer", (item, adv, text) => { text.add(1, Text.gold(Text.translatable("item.kubejs.uhv_tier_circuit"))) })
    tooltip.addAdvanced("kubejs:optical_processor_assembly", (item, adv, text) => { text.add(1, Text.gold(Text.translatable("item.kubejs.uv_tier_circuit"))) })
    tooltip.addAdvanced("kubejs:optical_processor", (item, adv, text) => { text.add(1, Text.gold(Text.translatable("item.kubejs.zpm_tier_circuit"))) })
    tooltip.addAdvanced(["kubejs:optical_processor_mainframe", "kubejs:optical_processor_computer", "kubejs:optical_processor_assembly", "kubejs:optical_processor"], (item, adv, text) => { text.add(1, Text.gray(Text.translatable("item.kubejs.optical_circuit.tooltip"))) })

    tooltip.addAdvanced("kubejs:extradimensional_processor_mainframe", (item, adv, text) => { text.add(1, Text.darkPurple(Text.translatable("item.kubejs.max_tier_circuit"))) })
    tooltip.addAdvanced("kubejs:extradimensional_processor_computer", (item, adv, text) => { text.add(1, Text.darkPurple(Text.translatable("item.kubejs.uev_tier_circuit"))) })
    tooltip.addAdvanced("kubejs:extradimensional_processor_assembly", (item, adv, text) => { text.add(1, Text.darkPurple(Text.translatable("item.kubejs.uhv_tier_circuit"))) })
    tooltip.addAdvanced("kubejs:extradimensional_processor", (item, adv, text) => { text.add(1, Text.darkPurple(Text.translatable("item.kubejs.uv_tier_circuit"))) })
    tooltip.addAdvanced(["kubejs:extradimensional_processor_mainframe", "kubejs:extradimensional_processor_computer", "kubejs:extradimensional_processor_assembly", "kubejs:extradimensional_processor"], (item, adv, text) => { text.add(1, Text.gray(Text.translatable("item.kubejs.extradimensional_circuit.tooltip"))) })

    // Multiblocks
    tooltip.add("gtceu:discharger", Text.translatable("gtceu.multiblock.discharger.description"))
    tooltip.add("gtceu:greenhouse", Text.translatable("gtceu.multiblock.greenhouse.description"))
    tooltip.add("gtceu:large_naquadah_reactor", Text.translatable("gtceu.multiblock.large_naquadah_reactor.description"))
    tooltip.add("gtceu:naquadah_refinery", Text.translatable("gtceu.multiblock.naquadah_refinery.description"))
    tooltip.add("gtceu:simulation_supercomputer", Text.translatable("gtceu.multiblock.simulation_supercomputer.description"))
    tooltip.add("gtceu:loot_superfabricator", Text.translatable("gtceu.multiblock.loot_superfabricator.description"))

    // Singleblocks
    tooltip.addAdvanced(["gtceu:lv_atomic_reconstructor", "gtceu:mv_atomic_reconstructor", "gtceu:hv_atomic_reconstructor", "gtceu:ev_atomic_reconstructor"], (item, adv, text) => { text.add(1, Text.gray(Text.translatable("block.gtceu.lvev_atomic_reconstructor.desc"))) })
    tooltip.addAdvanced(["gtceu:iv_atomic_reconstructor", "gtceu:luv_atomic_reconstructor", "gtceu:zpm_atomic_reconstructor"], (item, adv, text) => { text.add(1, Text.gray(Text.translatable("block.gtceu.ivzpm_atomic_reconstructor.desc"))) })
    tooltip.addAdvanced(["gtceu:uv_atomic_reconstructor", "gtceu:uhv_atomic_reconstructor", "gtceu:uev_atomic_reconstructor"], (item, adv, text) => { text.add(1, Text.gray(Text.translatable("block.gtceu.uvuiv_atomic_reconstructor.desc"))) })

    tooltip.addAdvanced("gtceu:naquadah_reactor", (item, adv, text) => {
        text.add(1, [Text.gray("A reactor that produces energy from "), Text.gold(Text.translate("item.kubejs.naquadah_fuel_rod")), Text.gray(" decay.")])
    })


    // Parallel multiblocks
    const parallelMultis = [
        ["rock_cycle_simulator", "rock_cycle_simulator"],
        ["atmospheric_accumulator", "gas_collector"],
        ["matter_alterator", "atomic_reconstruction"],
        ["implosion_collider", "implosion_compressor"],
        ["quintessence_infuser", "quintessence_infuser"],
        ["dimensional_superassembler", "assembly_line"],
        ["sculk_biocharger", "discharger"],
        ["simulation_quantumcomputer", "simulation_supercomputer"],
        ["loot_quantumfabricator", "loot_superfabricator"],
    ]

    parallelMultis.forEach(multi => {
        tooltip.addAdvanced(`gtceu:${multi[0]}`, (item, adv, text) => {
            text.add(1, Text.translatable("gtceu.multiblock.parallelizable.tooltip"))
            text.add(2, Text.translatable("gtceu.machine.available_recipe_map_1.tooltip", Text.translatable(`gtceu.${multi[1]}`)))
            text.add(3, Text.translatable(`gtceu.multiblock.${multi[0]}.description`))
        })
    })

    tooltip.addAdvanced("gtceu:helical_fusion_reactor", (item, adv, text) => {
        text.add(1, Text.translatable("gtceu.machine.fusion_reactor.capacity", Math.trunc(FusionReactorMachine.calculateEnergyStorageFactor(GTValues.UHV, 32) / 1000000)))
        text.add(2, Text.translatable("gtceu.multiblock.parallelizable.tooltip"))
        text.add(3, Text.translatable("gtceu.machine.available_recipe_map_1.tooltip", Text.translatable("gtceu.fusion_reactor")))
        text.add(4, Text.translatable("gtceu.multiblock.helical_fusion_reactor.description"))
    })

    tooltip.addAdvanced("gtceu:mega_alloy_blast_smelter", (item, adv, text) => {
        text.add(1, Text.translatable("gtceu.multiblock.parallelizable.tooltip"))
        text.add(2, Text.translatable("gtceu.machine.available_recipe_map_1.tooltip", Text.translatable("gtceu.alloy_blast_smelter")))
        text.add(3, Text.translatable("gtceu.machine.electric_blast_furnace.tooltip.0"))
        text.add(4, Text.translatable("gtceu.machine.electric_blast_furnace.tooltip.1"))
        text.add(5, Text.translatable("gtceu.machine.electric_blast_furnace.tooltip.2"))
    })

    tooltip.addAdvanced("gtceu:omnic_synthesizer", (item, adv, text) => {
        text.add(1, Text.translatable("gtceu.multiblock.omnic_synth.tooltip.0"))
        text.add(2, Text.translatable("gtceu.multiblock.omnic_synth.tooltip.1"))
        text.add(3, Text.translatable("gtceu.multiblock.omnic_synth.tooltip.2"))
    })

    tooltip.addAdvanced("gtceu:antimatter_collider", (item,adv,text) => {
        text.add(1, Text.translatable("gtceu.multiblock.antimatter_collider.tooltip.0"))
        text.add(2, Text.translatable("gtceu.multiblock.antimatter_collider.tooltip.1"))
        text.add(3, Text.translatable("gtceu.multiblock.antimatter_collider.tooltip.2"))
        text.add(4, Text.translatable("gtceu.multiblock.antimatter_collider.tooltip.3"))
        text.add(5, Text.translatable("gtceu.multiblock.antimatter_collider.tooltip.4"))
    })

    tooltip.addAdvanced("gtceu:antimatter_manipulator", (item, adv, text) => {
        text.add(1, Text.translatable("gtceu.multiblock.antimatter_manipulator.tooltip.0"))
        text.add(2, Text.translatable("gtceu.multiblock.antimatter_manipulator.tooltip.1"))
        text.add(3, Text.translatable("gtceu.multiblock.antimatter_manipulator.tooltip.2"))
    })

    tooltip.addAdvanced("kubejs:bathyal_energy_core", (item, adv, text) => text.add(1, Text.of(String(item.damageValue) + " / 2000000 RF")))
    tooltip.addAdvanced("kubejs:abyssal_energy_core", (item, adv, text) => text.add(1, Text.of(String(item.damageValue) + " / 4000000 RF")))
    tooltip.addAdvanced("kubejs:hadal_energy_core", (item, adv, text) => text.add(1, Text.of(String(item.damageValue) + " / 8000000 RF")))

    // Voltage Coils
    tooltip.add("kubejs:uhv_voltage_coil", Text.translatable("gtceu.uhv_voltage_coil.desc"))
    tooltip.add("kubejs:uev_voltage_coil", Text.translatable("gtceu.uev_voltage_coil.desc"))

    // Assorted info & warnings for GT machines
    tooltip.add("gtceu:basic_tape", Text.translatable("gtceu.basic_tape.tooltip"));
    tooltip.add("gtceu:nightvision_goggles", Text.translatable("gtceu.nightvision_goggles.tooltip"));
    tooltip.add(/^gtceu:.*_robot_arm$/, Text.translatable("gtceu:robot_arm.tooltip"))
    tooltip.add(/^gtceu:.*_fluid_regulator$/, Text.translatable("gtceu:fluid_regulator.tooltip"))

    // Sophisticated Storage
    tooltip.add("functionalstorage:storage_controller", Text.translatable("functionalstorage.storage_controller.tooltip"));
    tooltip.add("functionalstorage:framed_storage_controller", Text.translatable("functionalstorage.framed_storage_controller.tooltip"));

    // AE2
    tooltip.add("ae2:facade", Text.gray(Text.translatable("ae2.facade.tooltip")));
    tooltip.add("ae2:memory_card", Text.gray(Text.translatable("ae2.memory_card.tooltip")));
    tooltip.add("betterp2p:advanced_memory_card", Text.gray(Text.translatable("betterp2p.advanced_memory_card.tooltip")));

    // EIO Cap Banks
    tooltip.add(/^enderio:.*_bank$/, Text.red(Text.translatable("enderio.cap_bank.tooltip")));

    // Misc
    tooltip.add("gtceu:infinity_ingot", Text.darkGray(Text.translatable("gtceu.infinity_ingot.tooltip")));
    tooltip.add("gtceu:monium_ingot", Text.darkGray(Text.translatable("gtceu.monium_ingot.tooltip")));
    tooltip.add("extendedcrafting:the_ultimate_catalyst", Text.darkGray(Text.translatable("extendedcrafting.the_ultimate_catalyst.tooltip")));
    tooltip.add("extendedcrafting:the_ultimate_component", Text.darkGray(Text.translatable("extendedcrafting.the_ultimate_component.tooltip")));

    tooltip.add("extendedcrafting:auto_flux_crafter", Text.translatable("extendedcrafting.auto_flux_crafter.tooltip"));
    tooltip.add("extendedcrafting:flux_alternator", Text.translatable("extendedcrafting.flux_alternator.tooltip"));
    tooltip.addAdvanced(["extendedcrafting:basic_auto_table", "extendedcrafting:advanced_auto_table", "extendedcrafting:elite_auto_table", "extendedcrafting:ultimate_auto_table", "extendedcrafting:epic_auto_table", "extendedcrafting:auto_flux_crafter"], (item, adv, text) => {
        text.add(1, Text.translatable("extendedcrafting.auto_table.tooltip.1"))
        text.add(2, Text.translatable("extendedcrafting.auto_table.tooltip.2"))
    })

    tooltip.add("kubejs:excitationcoil", Text.translatable("kubejs.excitationcoil.tooltip"));
    tooltip.add("gtceu:terminal", Text.translatable("gtceu.terminal.tooltip"));

    tooltip.add(["gtceu:prospector.lv", "gtceu:prospector.hv", "gtceu:prospector.luv"], Text.translatable("gtceu.prospector.tooltip.1"));
    tooltip.add(["gtceu:prospector.lv", "gtceu:prospector.hv", "gtceu:prospector.luv"], Text.translatable("gtceu.prospector.tooltip.2"));

    // TelePastries
    const TelePastries = ["nether", "overworld", "end", "custom", "lost_city"]
    TelePastries.forEach(dim => {
        tooltip.addAdvanced(`telepastries:${dim}_cake`, (item, adv, text) => {
            text.add(1, Text.translatable(`telepastries.${dim}_cake.tooltip.1`))
            text.add(2, Text.translatable(`telepastries.${dim}_cake.tooltip.2`))
        })
    })

    // NuclearCraft
    tooltip.add("nuclearcraft:rhodochrosite_dust", "§eMnCO₃");
    tooltip.add("nuclearcraft:tough_alloy_ingot", "§eLiFeB");
    tooltip.add("nuclearcraft:ferroboron_ingot", "§eFe₄B");
    tooltip.add("nuclearcraft:hard_carbon_ingot", "§eFe₃C");
    tooltip.add("nuclearcraft:uranium_233", "§eU²³³");
    tooltip.add("nuclearcraft:plutonium_238", "§ePu²³⁸");
    tooltip.add("nuclearcraft:plutonium_242", "§ePu²⁴²");
    tooltip.add("nuclearcraft:neptunium_236", "§eNp²³⁶");
    tooltip.add("nuclearcraft:neptunium_237", "§eNp²³⁷");
    tooltip.add("nuclearcraft:americium_241", "§eAm²⁴¹");
    tooltip.add("nuclearcraft:americium_242", "§eAm²⁴²");
    tooltip.add("nuclearcraft:americium_243", "§eAm²⁴³");
    tooltip.add("nuclearcraft:curium_243", "§eCm²⁴³");
    tooltip.add("nuclearcraft:curium_245", "§eCm²⁴⁵");
    tooltip.add("nuclearcraft:californium_251", "§eCf²⁵¹");
    tooltip.add("nuclearcraft:californium_252", "§eCf²⁵²");

    tooltip.addAdvanced(["/^kubejs:.+infinity_dust_block$/", "kubejs:infinity_dust_block"], (item, adv, text) => {
        text.add(1, Text.translatable("item.kubejs.infinity_dust_block.tooltip"))
    })

    // Wooden pipe, tank warning
    tooltip.add([
        "gtceu:wood_small_fluid_pipe",
        "gtceu:treated_wood_small_fluid_pipe",
        "gtceu:wood_normal_fluid_pipe",
        "gtceu:treated_wood_normal_fluid_pipe",
        "gtceu:wood_large_fluid_pipe",
        "gtceu:treated_wood_large_fluid_pipe",
        "gtceu:wooden_multiblock_tank"
    ], Text.translatable("gtceu.wood_pipe_warning.tooltip"))

    // Chipped workbenches
    tooltip.addAdvanced([
        "chipped:botanist_workbench",
        "chipped:glassblower",
        "chipped:carpenters_table",
        "chipped:loom_table",
        "chipped:mason_table",
        "chipped:alchemy_bench",
        "chipped:tinkering_table"], (item, adv, text) => {
        text.add(1, Text.translatable("chipped.workbenches.tooltip.1"))
        text.add(2, Text.translatable("chipped.workbenches.tooltip.2"))
    })
    tooltip.add("chisel_chipped_integration:drill", Text.translatable("chipped.drill.tooltip"))

    // Note about PEX crafter speed
    tooltip.add([
        "packagedexcrafting:advanced_crafter",
        "packagedexcrafting:elite_crafter",
        "packagedexcrafting:ultimate_crafter",
        "packagedexexcrafting:epic_crafter"
    ], Text.translatable("packagedexcrafting.crafterspeed.tooltip"))

    // Tempad
    if (Platform.isLoaded("tempad")) {
        tooltip.add("tempad:tempad", Text.translatable("tempad.tempad.tooltip"))
    }

    // Advanced AE
    if (Platform.isLoaded("advanced_ae")) {
        tooltip.add([
            "advanced_ae:water_breathing_card",
            "advanced_ae:evasion_card",
            "advanced_ae:strength_card",
            "advanced_ae:attack_speed_card",
            "advanced_ae:luck_card",
            "advanced_ae:swim_speed_card"
        ], Text.translatable("advanced_ae.disabled_card.tooltip"))
    }
})
