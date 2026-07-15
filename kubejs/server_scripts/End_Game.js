/**
 * Various end-game recipes
 */

ServerEvents.recipes(event => {

    event.recipes.gtceu.assembler("neutron_emitter_plutonium")
        .itemInputs("1x nuclearcraft:heavy", "1x gtceu:dense_rhodium_plated_palladium_plate",)
        .inputFluids("gtceu:americium 432")
        .itemOutputs("kubejs:neutron_emitter")
        .duration(1600)
        .EUt(GTValues.VA[GTValues.UV])
    event.recipes.gtceu.assembler("neutron_emitter_curium")
        .itemInputs("1x nuclearcraft:heavy", "1x gtceu:dense_rhodium_plated_palladium_plate",)
        .inputFluids("gtceu:curium 288")
        .itemOutputs("kubejs:neutron_emitter")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UV])
    event.recipes.gtceu.assembler("neutron_emitter_californium")
        .itemInputs("1x nuclearcraft:heavy", "1x gtceu:dense_rhodium_plated_palladium_plate",)
        .inputFluids("gtceu:californium 144")
        .itemOutputs("kubejs:neutron_emitter")
        .duration(1200)
        .EUt(GTValues.VA[GTValues.UV])

    event.recipes.gtceu.chemical_bath("uranic_solution_uraninite")
        .inputFluids("gtceu:hypochlorous_acid 1000")
        .itemInputs("2x gtceu:purified_uraninite_ore")
        .outputFluids("gtceu:uranic_solution 1000")
        .duration(320)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.chemical_bath("uranic_solution_pitchblende")
        .inputFluids("gtceu:hypochlorous_acid 1000")
        .itemInputs("2x gtceu:purified_pitchblende_ore")
        .outputFluids("gtceu:uranic_solution 1000")
        .duration(320)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.chemical_bath("uranic_solution_thorium")
        .inputFluids("gtceu:hypochlorous_acid 1000")
        .itemInputs("2x gtceu:purified_thorium_ore")
        .outputFluids("gtceu:uranic_solution 1000")
        .duration(320)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.chemical_bath("uranic_solution_carnotite")
        .inputFluids("gtceu:hypochlorous_acid 1000")
        .itemInputs("2x gtceu:purified_carnotite_ore")
        .outputFluids("gtceu:uranic_solution 1000")
        .duration(320)
        .EUt(GTValues.VHA[GTValues.EV])

    event.recipes.gtceu.electrolyzer("actinium_from_uranic_solution")
        .inputFluids("gtceu:uranic_solution 2000")
        .chancedInput("kubejs:neutron_emitter", 50, 0)
        .chancedOutput("gtceu:actinium_dust", 2000, 0)
        .chancedOutput("gtceu:thorium_dust", 3333, 0)
        .chancedOutput("3x gtceu:uraninite_dust", 5000, 0)
        .chancedItemOutputLogic(ChanceLogic.XOR)
        .outputFluids("minecraft:water 1000")
        .itemOutputs("3x gtceu:lead_chloride_dust")
        .duration(160)
        .EUt(GTValues.VHA[GTValues.ZPM])

    event.recipes.gtceu.electrolyzer("actinium_from_radium_salt")
        .chancedInput("kubejs:neutron_emitter", 50, 0)
        .itemInputs("1x kubejs:radium_salt")
        .chancedFluidOutput("gtceu:actinium 72", 2000, 0)
        .chancedFluidOutput("gtceu:radon 125", 8000, 0)
        .chancedFluidOutputLogic(ChanceLogic.XOR)
        .itemOutputs("1x gtceu:rock_salt_dust")
        .duration(160)
        .EUt(GTValues.VHA[GTValues.ZPM])

    // Assembly Line
    // Dimensional Superassembler
    event.recipes.gtceu.assembly_line("dimensional_superassembler")
        .itemInputs("gtceu:assembly_line", "4x #gtceu:circuits/uev", "16x gtceu:infinity_plate", "4x monilabs:dimensional_stabilization_netherite_casing", "16x monilabs:eltz_casing", "6x gtceu:uev_conveyor_module", "4x gtceu:uev_robot_arm", "4x gtceu:uev_emitter", "2x gtceu:infinity_frame")
        .inputFluids("gtceu:living_soldering_alloy 5760", "gtceu:omnium 5760", "gtceu:polyether_ether_ketone 3456")
        .itemOutputs("gtceu:dimensional_superassembler")
        .duration(6000)
        .EUt(13920000)
        .addMaterialInfo(true)
        .stationResearch(b => b
            .researchStack("gtceu:assembly_line")
            .CWUt(160, 1024000)
            .EUt(GTValues.VA[GTValues.UHV])
        )


    event.recipes.gtceu.assembly_line("gtceu:mega_alloy_blast_smelter")
        .itemInputs("gtceu:alloy_blast_smelter", "4x #gtceu:circuits/uhv", "4x gtceu:uv_field_generator", "4x #forge:springs/yttrium_barium_cuprate", "4x #forge:dense_plates/neutronium", "4x gtceu:ruthenium_trinium_americium_neutronate_quadruple_wire")
        .inputFluids("gtceu:living_soldering_alloy 2304", "gtceu:omnium 5760")
        .itemOutputs("gtceu:mega_alloy_blast_smelter")
        .duration(4000)
        .EUt(GTValues.VA[GTValues.UHV])
        .addMaterialInfo(true)
        .stationResearch(b => b
            .researchStack("gtceu:alloy_blast_smelter")
            .CWUt(128, 768000)
            .EUt(GTValues.VA[GTValues.UHV])
        )

    // Helical Fusion Reactor
    event.recipes.gtceu.assembly_line("gtceu:helical_fusion_reactor")
        .itemInputs("gtceu:uv_fusion_reactor", "4x #gtceu:circuits/uev", "8x gtceu:gravi_star", "2x gtceu:double_activated_netherite_plate", "4x gtceu:uhv_field_generator", "64x kubejs:uxpic_chip", "64x kubejs:uxpic_chip", "64x gtceu:ruthenium_trinium_americium_neutronate_single_wire")
        .inputFluids("gtceu:living_soldering_alloy 1152", "gtceu:darconite 1152", "gtceu:polyether_ether_ketone 576")
        .itemOutputs("gtceu:helical_fusion_reactor")
        .duration(1500)
        .EUt(GTValues.VA[GTValues.UEV])
        .addMaterialInfo(true)
        .stationResearch(b => b
            .researchStack("gtceu:uv_fusion_reactor")
            .CWUt(108, 1024000)
            .EUt(GTValues.VA[GTValues.UHV])
        )


    // Blacklight
    event.recipes.gtceu.shaped("gtceu:blacklight", [
        "BPB",
        " S ",
        "CPW"
    ], {
        B: "gtceu:tungsten_carbide_screw",
        C: "#gtceu:circuits/iv",
        P: "gtceu:tungsten_carbide_plate",
        S: "gtceu:hssg_spring",
        W: "gtceu:platinum_single_cable"
    }).id("gtceu:shaped/blacklight").addMaterialInfo()

    // Trinaquadalloy Mixer Recipe
    event.recipes.gtceu.mixer("mixer_trinaquadalloy")
        .itemInputs("2x gtceu:trinium_dust", "4x gtceu:enriched_naquadah_dust", "2x gtceu:lanthanum_dust", "gtceu:tungsten_carbide_dust")
        .itemOutputs("9x gtceu:trinaquadalloy_dust")
        .circuit(1)
        .duration(300)
        .EUt(491250)

    // Fluxed Electrum Mixer Recipe
    event.recipes.gtceu.mixer("mixer_electrum_flux")
        .itemInputs("6x gtceu:electrum_dust", "gtceu:lumium_dust", "gtceu:signalum_dust")
        .itemOutputs("8x gtceu:electrum_flux_dust")
        .circuit(2)
        .duration(300)
        .EUt(129)

    // UHV Alloy Cable Mixer recipe
    event.recipes.gtceu.mixer("lanthanum_gold_cadmium_curium_sulfate")
        .itemInputs("2x gtceu:lanthanum_dust", "3x gtceu:gold_dust", "3x gtceu:cadmium_dust", "gtceu:curium_dust", "gtceu:sulfur_dust")
        .inputFluids("gtceu:oxygen 4000")
        .itemOutputs("14x gtceu:lanthanum_gold_cadmium_curium_sulfate_dust")
        .circuit(4)
        .duration(300)
        .EUt(GTValues.VA[GTValues.UV])

    // Atomic Casings
    event.recipes.gtceu.shaped("2x gtceu:atomic_casing", [
        "PHP",
        "PFP",
        "PWP"
    ], {
        P: "gtceu:trinaquadalloy_plate",
        H: "#forge:tools/hammers",
        W: "#forge:tools/wrenches",
        F: "gtceu:naquadah_alloy_frame",
    }).id("gtceu:shaped/atomic_casing").addMaterialInfo()

    event.recipes.gtceu.assembler("atomic_casing")
        .itemInputs("6x gtceu:trinaquadalloy_plate", "gtceu:naquadah_alloy_frame")
        .itemOutputs("2x gtceu:atomic_casing")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.LV])
        .circuit(6)
        .addMaterialInfo(true)

    // Sterile Cleaning Maintenance Hatch
    event.recipes.gtceu.shaped("gtmutils:sterile_cleaning_maintenance_hatch", [
        "WAW",
        "FCF",
    ], {
        A: "gtceu:auto_maintenance_hatch",
        W: "gtceu:naquadah_double_cable",
        F: "gtceu:sterilizing_filter_casing",
        C: "#gtceu:circuits/zpm"
    }).addMaterialInfo()

    // FLux Gem
    event.remove({ id: "redstone_arsenal:materials/flux_gem" })
    event.recipes.gtceu.autoclave("flux_gem")
        .itemInputs("minecraft:diamond")
        .inputFluids("gtceu:redstone 720")
        .itemOutputs("redstone_arsenal:flux_gem")
        .duration(200)
        .EUt(400)

    // Flux Plating
    event.shaped("4x redstone_arsenal:flux_plating", [
        " P ",
        "PGP",
        " P "
    ], {
        G: "redstone_arsenal:flux_gem",
        P: "gtceu:electrum_flux_plate"
    }).id("redstone_arsenal:materials/flux_plating")

    event.recipes.gtceu.assembler("kubejs:flux_plating_assembly")
        .itemInputs("redstone_arsenal:flux_gem", "4x gtceu:electrum_flux_plate")
        .itemOutputs("4x redstone_arsenal:flux_plating")
        .duration(60)
        .EUt(GTValues.VA[GTValues.EV])

    // Hyperdegenerate Darconite
    const wire_forms = [
        {multiplier:"single"},
        {multiplier:"double"},
        {multiplier:"quadruple"},
        {multiplier:"octal"},
        {multiplier:"hex"}
    ]

    // Ignoring tagPrefixes results in bugged autogenerated recipes
    wire_forms.forEach((value) => {
        event.remove({ output: `gtceu:hyperdegenerate_darconite_${value.multiplier}_wire`, type: "gtceu:wiremill"})
    })

    event.recipes.gtceu.electric_blast_furnace("hyperdegenerate_darconite_wire")
        .itemInputs(Item.of("4x gtceu:darconite_single_wire"))
        .itemOutputs("4x gtceu:hyperdegenerate_darconite_single_wire")
        .inputFluids(Fluid.of("gtceu:hyperdegenerate_matter", 40))
        .duration(100)
        .EUt(GTValues.VA[GTValues.ZPM])
        .blastFurnaceTemp(10600)

    event.remove({ id: "gtceu:wiremill/mill_hyperdegenerate_darconite_wire_fine"})
    event.remove({ id: "gtceu:extruder/extrude_hyperdegenerate_darconite_wire"})

    event.recipes.gtceu.electric_blast_furnace("hyperdegenerate_darconite_foil")
        .itemInputs("8x gtceu:darconite_foil")
        .itemOutputs("8x gtceu:hyperdegenerate_darconite_foil")
        .inputFluids(Fluid.of("gtceu:hyperdegenerate_matter", 40))
        .duration(100)
        .EUt(GTValues.VA[GTValues.ZPM])
        .blastFurnaceTemp(10600)

    event.recipes.gtceu.electric_blast_furnace("hyperdegenerate_darconite_fine_wire")
        .itemInputs("12x gtceu:fine_darconite_wire")
        .itemOutputs("12x gtceu:fine_hyperdegenerate_darconite_wire")
        .inputFluids(Fluid.of("gtceu:hyperdegenerate_matter", 30))
        .duration(100)
        .EUt(GTValues.VA[GTValues.ZPM])
        .blastFurnaceTemp(10600)

    // Cryolobus Dust
    event.recipes.gtceu.mixer("cryolobus_dust_red")
        .itemInputs("gtceu:red_steel_dust", "2x gtceu:sculk_dust")
        .itemOutputs("3x gtceu:cryolobus_dust")
        .duration(500)
        .EUt(GTValues.VA[GTValues.EV])
    event.recipes.gtceu.mixer("cryolobus_dust_blue")
        .itemInputs("gtceu:blue_steel_dust", "2x gtceu:sculk_dust")
        .itemOutputs("3x gtceu:cryolobus_dust")
        .duration(500)
        .EUt(GTValues.VA[GTValues.EV])

    // Kubejs Stem Cells
    event.remove({ id: "gtceu:large_chemical_reactor/stem_cells" })
    event.recipes.gtceu.large_chemical_reactor("stem_cells")
        .itemInputs("minecraft:dragon_egg")
        .chancedInput("minecraft:sculk_catalyst", 500, 0)
        .inputFluids("gtceu:sterilized_growth_medium 500", "gtceu:bacteria 500", "enderio:xp_juice 2000")
        .itemOutputs("64x gtceu:stem_cells")
        .itemOutputsRanged("gtceu:stem_cells", 0, 64)
        .outputFluids("gtceu:bacterial_sludge 500")
        .duration(6000)
        .EUt(GTValues.VA[GTValues.LuV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    // Remove sterile CR recipes.
    // LCR is a separate recipemap, and singleblocks cannot get the sterile hatch.
    event.remove({ id: "gtceu:chemical_reactor/stem_cells" })
    event.remove({ id: "gtceu:chemical_reactor/collagen_from_bone" })
    event.remove({ id: "gtceu:chemical_reactor/collagen_from_bone_meal" })
    event.remove({ id: "gtceu:chemical_reactor/bacterial_sludge" })


    event.recipes.extendedcrafting.shaped_table("gtceu:zero_point_module", [
        "  PPPPP  ",
        "  PBCBP  ",
        "  PCBCP  ",
        "  PBCBP  ",
        "   ZZZ   ",
        "   ZFZ   ",
        "   ZFZ   ",
        "   ZZZ   ",
        "   PPP   "
    ], {
        B: "kubejs:stabilized_plutonium",
        C: "kubejs:stabilized_californium",
        F: "gtceu:zpm_field_generator",
        P: "nuclearcraft:plate_elite",
        Z: "#gtceu:circuits/zpm"
    })

    // World Accelerators
    event.remove({ id: "gtceu:shaped/lv_world_accelerator" })
    event.remove({ id: "gtceu:shaped/mv_world_accelerator" })
    event.remove({ id: "gtceu:shaped/hv_world_accelerator" })
    event.remove({ id: "gtceu:shaped/ev_world_accelerator" })
    event.remove({ id: "gtceu:shaped/iv_world_accelerator" })
    event.remove({ id: "gtceu:shaped/luv_world_accelerator" })
    event.remove({ id: "gtceu:shaped/zpm_world_accelerator" })

    event.recipes.gtceu.assembly_line("hv_world_accelerator")
        .itemInputs("gtceu:luv_machine_hull", "64x gtceu:luv_field_generator", "16x gtceu:luv_field_generator", "20x gtceu:luv_sensor", "20x gtceu:luv_emitter", "16x #gtceu:circuits/luv", "4x gtceu:double_iridium_plate", "2x gtceu:dense_cryolobus_plate")
        .inputFluids("gtceu:enderium 1152", "gtceu:soldering_alloy 1152")
        .itemOutputs("gtceu:hv_world_accelerator")
        .stationResearch(b => b.researchStack("minecraft:clock").CWUt(4, 16000))
        .duration(6000)
        .EUt(GTValues.VA[GTValues.LuV])

    event.recipes.gtceu.assembly_line("ev_world_accelerator")
        .itemInputs("gtceu:zpm_machine_hull", "64x gtceu:zpm_field_generator", "16x gtceu:zpm_field_generator", "20x gtceu:zpm_sensor", "20x gtceu:zpm_emitter", "16x #gtceu:circuits/zpm", "4x gtceu:double_europium_plate", "2x gtceu:dense_cryolobus_plate")
        .inputFluids("gtceu:enderium 1152", "gtceu:soldering_alloy 1152")
        .itemOutputs("gtceu:ev_world_accelerator")
        .duration(6000)
        .EUt(GTValues.VA[GTValues.ZPM])
        .stationResearch(b => b
            .researchStack("gtceu:hv_world_accelerator")
            .CWUt(16, 128000)
            .EUt(GTValues.VA[GTValues.ZPM])
        )

    event.recipes.gtceu.assembly_line("iv_world_accelerator")
        .itemInputs("gtceu:uv_machine_hull", "64x gtceu:uv_field_generator", "16x gtceu:uv_field_generator", "20x gtceu:uv_sensor", "20x gtceu:uv_emitter", "16x #gtceu:circuits/uv", "4x gtceu:double_europium_plate", "2x gtceu:dense_neutronium_plate")
        .inputFluids("gtceu:enderium 1152", "gtceu:soldering_alloy 1152")
        .itemOutputs("gtceu:iv_world_accelerator")
        .duration(6000)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(b => b
            .researchStack("gtceu:ev_world_accelerator")
            .CWUt(48, 256000)
            .EUt(GTValues.VA[GTValues.UV])
        )

    event.recipes.gtceu.assembly_line("luv_world_accelerator")
        .itemInputs("gtceu:uhv_machine_hull", "64x gtceu:uhv_field_generator", "16x gtceu:uhv_field_generator", "20x gtceu:uhv_sensor", "20x gtceu:uhv_emitter", "16x #gtceu:circuits/uhv", "4x gtceu:double_activated_netherite_plate", "2x gtceu:dense_neutronium_plate")
        .inputFluids("gtceu:omnium 1152", "gtceu:soldering_alloy 1152")
        .itemOutputs("gtceu:luv_world_accelerator")
        .duration(6000)
        .EUt(GTValues.VA[GTValues.UHV])
        .stationResearch(b => b
            .researchStack("gtceu:iv_world_accelerator")
            .CWUt(108, 512000)
            .EUt(GTValues.VA[GTValues.UHV])
        )

    // Beyond this point we could probably just treat these like joke items
    event.recipes.gtceu.assembly_line("zpm_world_accelerator")
        .itemInputs("gtceu:uev_machine_hull", "64x gtceu:uev_field_generator", "16x gtceu:uev_field_generator", "20x gtceu:uev_sensor", "20x gtceu:uev_emitter", "16x #gtceu:circuits/uev", "4x gtceu:double_necrosiderite_plate", "2x gtceu:dense_infinity_plate")
        .inputFluids("gtceu:omnium 1152", "gtceu:soldering_alloy 1152")
        .itemOutputs("gtceu:zpm_world_accelerator")
        .duration(6000)
        .EUt(GTValues.VA[GTValues.UEV])
        .stationResearch(b => b
            .researchStack("gtceu:luv_world_accelerator")
            .CWUt(192, 512000)
            .EUt(GTValues.VA[GTValues.UEV])
        )

    // ! Creative Items !//

    // Creative Jetpack
    event.recipes.extendedcrafting.shaped_table(Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:creative"}').weakNBT(), [
        "  C   L  ",
        " CCC LLL ",
        " CVCFLEL ",
        " CVCILEL ",
        " CVCDLEL ",
        " CVC LEL ",
        " SSS HHH ",
        "  N   R  ",
        " NNN RRR "
    ], {
        C: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:conductive_iron"}').weakNBT(),
        D: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:dark_soularium"}').weakNBT(),
        E: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:resonant"}').weakNBT(),
        F: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:fluxed"}').weakNBT(),
        H: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:hardened"}').weakNBT(),
        I: "gtceu:infinity_ingot",
        L: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:leadstone"}').weakNBT(),
        N: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:energetic"}').weakNBT(),
        R: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:reinforced"}').weakNBT(),
        S: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:electrical_steel"}').weakNBT(),
        V: Item.of("ironjetpacks:jetpack", '{Id:"ironjetpacks:vibrant"}').weakNBT()
    })

    // Creative Chest
    event.recipes.extendedcrafting.shaped_table("2x gtceu:creative_chest", [
        "BMMMMMMMMMB",
        "MhXXFWFXXcM",
        "MXMMMWMMMXM",
        "MMMFGWGFMMP",
        "HCMGALAGSmP",
        "HCwgDQDSOmP",
        "HCMGALAGSmP",
        "MMMFGWGFMMP",
        "MXMMMWMMMXM",
        "MfXXFWFXXsM",
        "BMMMMMMMMMB"
    ], {
        A: "monilabs:max_robot_arm",
        B: "gtceu:monium_block",
        C: "monilabs:max_conveyor_module",
        D: "kubejs:field_stabilized_prismatic_pulsar_compound",
        F: "gtceu:monium_frame",
        G: "monilabs:max_field_generator",
        H: "gtceu:polyether_ether_ketone_huge_item_pipe",
        L: "monilabs:max_4096a_laser_source_hatch",
        M: "kubejs:causality_exempt_monic_heavy_plating",
        O: "gtceu:object_holder",
        P: "monilabs:prism_glass",
        Q: "gtceu:uev_quantum_chest",
        S: "monilabs:max_sensor",
        W: "gtceu:monium_hex_wire",
        X: "#gtceu:circuits/max",
        c: "kubejs:infinity_wire_cutter",
        f: "kubejs:infinity_file",
        g: "gtceu:monium_gear",
        h: "kubejs:infinity_hammer",
        m: "gtceu:computer_monitor_cover",
        s: "kubejs:infinity_screwdriver",
        w: "kubejs:infinity_wrench"
    })

    // Knowledge Transmission Array
    event.recipes.gtceu.assembly_line("knowledge_transmission_array")
        .itemInputs("2x monilabs:sculk_bioalloy_frame", "16x gtceu:europium_double_cable", "16x gtceu:uhv_emitter", "16x gtceu:data_transmitter_hatch", "2x #gtceu:circuits/uhv", "32x gtceu:normal_optical_pipe", "16x gtceu:ruthenium_trinium_americium_neutronate_single_wire", "2x gtceu:network_switch", "32x gtceu:rhodium_foil")
        .inputFluids("gtceu:living_soldering_alloy 1152", "gtceu:omnium 2304", "gtceu:polyether_ether_ketone 1152")
        .itemOutputs("monilabs:knowledge_transmission_array")
        .duration(2000)
        .EUt(GTValues.VA[GTValues.UEV])
        .stationResearch(b => b
            .researchStack("gtceu:data_transmitter_hatch")
            .CWUt(96, 57600)
            .EUt(GTValues.VA[GTValues.UHV])
        )

    // Chromodynamic Conduction Casing
    event.recipes.gtceu.assembler("chromodynamic_conduction_casing")
        .itemInputs("gtceu:activated_netherite_frame", "2x gtceu:normal_laser_pipe", "8x gtceu:omnium_single_wire", "#gtceu:circuits/luv")
        .itemOutputs("monilabs:chromodynamic_conduction_casing")
        .duration(50)
        .EUt(GTValues.VHA[GTValues.UV])
        .addMaterialInfo(true)
    // Coils
    event.recipes.gtceu.assembler("kubejs:omnic_matrix_coil")
        .itemInputs("8x gtceu:omnium_double_wire", "8x monilabs:crystal_matrix_foil")
        .itemOutputs("kubejs:omnic_matrix_coil_block")
        .inputFluids("gtceu:neutronium 144")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UHV])
        .addMaterialInfo(true)

    // Casings
    event.recipes.gtceu.assembler("monilabs:eltz_casing")
        .itemInputs("6x monilabs:eltz_plate", "monilabs:eltz_frame", "gtceu:zpm_field_generator", "#gtceu:circuits/uv")
        .itemOutputs("2x monilabs:eltz_casing")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.ZPM])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("kubejs:netherite_casing")
        .itemInputs("8x gtceu:neutronium_plate", "8x gtceu:large_scale_assembler_casing", "2x gtceu:double_activated_netherite_plate", "6x gtceu:tungsten_steel_rod")
        .itemOutputs("4x monilabs:dimensional_stabilization_netherite_casing")
        .duration(100)
        .EUt(GTValues.VHA[GTValues.ZPM])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("monilabs:bioalloy_casing")
        .itemInputs("4x monilabs:sculk_bioalloy_plate", "2x gtceu:cryolobus_frame", "4x kubejs:warden_horn", "6x gtceu:actinium_rod")
        .itemOutputs("2x monilabs:bioalloy_casing")
        .duration(100)
        .EUt(GTValues.VA[GTValues.UV])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("monilabs:bioalloy_fusion_casing")
        .itemInputs("gtceu:uhv_machine_hull", "2x monilabs:bioalloy_casing", "12x gtceu:cryococcus_plate", "4x gtceu:fusion_casing_mk3", "gtceu:uhv_field_generator")
        .itemOutputs("4x monilabs:bioalloy_fusion_casing")
        .duration(200)
        .EUt(GTValues.VA[GTValues.UHV])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("fieldstabilizedcompound")
        .itemInputs("gtceu:uev_field_generator", "gtceu:uhv_field_generator", "kubejs:supercritical_prismatic_core", "10x kubejs:quasi_stable_neutron_star", "kubejs:dimensionally_stabilized_infinity_heavy_plating")
        .itemOutputs("kubejs:field_stabilized_prismatic_pulsar_compound")
        .duration(255)
        .EUt(GTValues.VA[GTValues.UEV])

    event.recipes.gtceu.assembly_line("causality_exempt_monic_plating")
        .itemInputs("3x gtceu:double_monium_plate", "8x monilabs:double_eltz_plate", "kubejs:quantum_fluxed_eternium_heavy_plating", "kubejs:universe_resistant_neutronium_heavy_plating", "kubejs:elementally_infused_omnic_matrix_heavy_plating", "kubejs:dimensionally_stabilized_infinity_heavy_plating", "8x monilabs:double_eltz_plate", "3x gtceu:double_monium_plate")
        .inputFluids("gtceu:living_soldering_alloy 2880")
        .itemOutputs("kubejs:causality_exempt_monic_heavy_plating")
        .duration(400)
        .EUt(GTValues.VA[GTValues.UIV])
        .stationResearch(b => b
            .researchStack("kubejs:causality_exempt_monic_heavy_plating")
            .CWUt(144, 57600)
            .EUt(GTValues.VA[GTValues.UEV])
        )

    // Shortcut recipes for thrusters
    event.recipes.gtceu.assembler("kubejs:assembler_dark_soularium_thruster")
        .itemInputs("4x gtceu:double_dark_soularium_plate", "6x gtceu:vibrant_alloy_plate", "2x enderio:weather_crystal", "2x enderio:prescient_crystal", "gtceu:cryolobus_frame")
        .itemOutputs("kubejs:dark_soularium_thruster")
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.assembler("kubejs:assembler_flux_thruster")
        .itemInputs("3x redstone_arsenal:flux_plating", "4x gtceu:enderium_plate", "3x gtceu:double_signalum_plate", "thermal:dynamo_numismatic", "thermal:rf_coil")
        .itemOutputs("kubejs:fluxed_thruster")
        .duration(70)
        .EUt(GTValues.VA[GTValues.IV])
})
