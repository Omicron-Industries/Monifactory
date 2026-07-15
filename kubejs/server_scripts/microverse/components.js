/**
 * Microminer components and kits.
 * Each of these are a custom KubeJS item or block used in the creation of Micro Miners.
 */
ServerEvents.recipes(event => {
    // Universe Creation Data
    event.recipes.gtceu.scanner("universe_creation_data_hydrogen")
        .itemInputs("gtceu:data_stick")
        .inputFluids("gtceu:hydrogen 16000")
        .itemOutputs("kubejs:universe_creation_data")
        .duration(100)
        .EUt(GTValues.VA[GTValues.HV])

    // Basic Guidance
    event.shaped("kubejs:basic_micro_miner_guidance_system", [
        "GPG",
        "PCP",
        "CCC"
    ], {
        G: "gtceu:lv_sensor",
        P: "gtceu:double_steel_plate",
        C: "#gtceu:circuits/mv"
    })

    // Basic laser
    event.shaped("kubejs:basic_mining_laser", [
        " R ",
        "QGQ",
        "QGQ"
    ], {
        R: "minecraft:redstone_block",
        Q: "minecraft:quartz",
        G: "minecraft:glass"
    })

    // Reinforced Laser
    event.recipes.extendedcrafting.shaped_table("kubejs:reinforced_mining_laser", [
        " R R ",
        "GAGAG",
        "GAGAG",
        "GBGBG",
        "QCECQ"
    ], {
        R: "minecraft:redstone_block",
        G: "minecraft:glass",
        A: "kubejs:solidified_argon",
        B: "minecraft:quartz_block",
        Q: "minecraft:quartz",
        C: "#gtceu:circuits/hv",
        E: "enderio:octadic_capacitor"
    })

    // Advanced Guidance
    event.shaped("kubejs:advanced_micro_miner_guidance_system", [
        "AWA",
        "WCW",
        "CCC"
    ], {
        A: "gtceu:ev_sensor",
        W: "gtceu:double_tungsten_carbide_plate",
        C: "#gtceu:circuits/ev"
    })

    // Warp Core
    event.recipes.gtceu.shaped("kubejs:warp_core", [
        "LTL",
        "TNT",
        "LTL"
    ], {
        L: "gtceu:lumium_block",
        N: "gtceu:nether_star_block",
        T: "gtceu:titanium_block"
    })

    // Warp Controller
    event.recipes.gtceu.shaped("kubejs:warp_controller", [
        "SMS",
        "CHC",
        "SCS"
    ], {
        C: "#gtceu:circuits/ev",
        H: "gtceu:ev_machine_hull",
        M: "gtceu:computer_monitor_cover",
        S: "gtceu:ev_sensor"
    })

    // Universal Warp Core
    event.recipes.gtceu.discharger("universal_warp_core")
        .itemInputs("4x gtceu:void_block", "kubejs:warp_core", Item.of("kubejs:abyssal_energy_core", "{Damage:4000000}").weakNBT(), Item.of("kubejs:abyssal_energy_core", "{Damage:4000000}").weakNBT(), Item.of("kubejs:abyssal_energy_core", "{Damage:4000000}").weakNBT(), Item.of("kubejs:abyssal_energy_core", "{Damage:4000000}").weakNBT())
        .itemOutputs("kubejs:universal_warp_core")
        .duration(12)

    // Universal Warp Controller
    event.recipes.gtceu.discharger("universal_warp_controller")
        .itemInputs("4x gtceu:double_naquadria_plate", "2x #gtceu:circuits/luv", "kubejs:warp_controller", Item.of("kubejs:hadal_energy_core", "{Damage:8000000}").weakNBT())
        .itemOutputs("kubejs:universal_warp_controller")
        .duration(12)

    // Warp engine
    event.recipes.gtceu.assembly_line("warp_engine")
        .itemInputs("gtceu:microversium_frame",
            "6x gtceu:enderium_plate",
            "8x ae2:quantum_ring",
            "ae2:quantum_link",
            "2x #forge:plates/crystal_matrix",
            "2x gtceu:iv_field_generator",
            "kubejs:fluxed_thruster",
            "kubejs:dark_soularium_thruster")
        ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack("ae2:quantum_ring").EUt(GTValues.VA[GTValues.HV]).duration(1200))
        .itemOutputs("kubejs:warp_engine")
        .inputFluids("gtceu:advanced_soldering_alloy 576")
        .duration(1800)
        .EUt(GTValues.VA[GTValues.LuV])

    // Supercharged laser array
    event.recipes.gtceu.chemical_reactor("supercharged_laser_array")
        .itemInputs("kubejs:reinforced_mining_laser")
        .inputFluids("gtceu:radon 1000")
        .itemOutputs("kubejs:supercharged_laser_array")
        .duration(200)
        .EUt(2000)

    // Universal Navigator
    event.recipes.gtceu.assembly_line("universal_navigator")
        .itemInputs("gtceu:microversium_frame",
            "24x gtceu:microversium_plate",
            "gtceu:gravi_star",
            "2x gtceu:uv_sensor",
            "2x gtceu:uv_robot_arm",
            "#gtceu:circuits/uhv",
            "2x gtceu:dense_naquadah_alloy_plate",
            "4x gtceu:enriched_naquadah_trinium_europium_duranide_quadruple_wire",
            "64x gtceu:fine_tritanium_wire")
        .inputFluids("gtceu:living_soldering_alloy 576", "gtceu:naquadria 576")
        .itemOutputs("kubejs:universal_navigator")
        .stationResearch(b => b.researchStack("gtceu:gravi_star").CWUt(96, 384000).EUt(GTValues.VA[GTValues.UV]))
        .duration(6000)
        .EUt(GTValues.VA[GTValues.UV])

    // Extradimensional Navigator
    event.recipes.gtceu.assembly_line("extradimensional_navigator")
        .itemInputs("gtceu:infinity_frame",
            "4x kubejs:universal_navigator",
            "4x gtceu:uev_field_generator",
            "24x gtceu:necrosiderite_plate",
            "4x #gtceu:circuits/uev",
            "2x gtceu:uev_sensor",
            "2x gtceu:uev_emitter",
            "4x gtceu:dense_naquadah_alloy_plate",
            "64x gtceu:fine_necrosiderite_wire",
            "32x gtceu:fine_ruthenium_trinium_americium_neutronate_wire")
        .inputFluids("gtceu:living_soldering_alloy 5760", "monilabs:crystal_matrix 5760", "gtceu:naquadria 2304")
        .itemOutputs("kubejs:extradimensional_navigator")
        .stationResearch(b => b.researchStack("kubejs:universal_navigator").CWUt(160, 640000).EUt(3932160))
        .duration(6000)
        .EUt(3932160)

    // Electrum Engine Frame
    event.recipes.gtceu.shaped("kubejs:electrum_micro_miner_frame", [
        "PRP",
        "R R",
        "PRP"
    ], {
        P: "gtceu:electrum_plate",
        R: "gtceu:electrum_rod",
    }).addMaterialInfo()

    // Signalum Engine Frame
    event.recipes.gtceu.shaped("kubejs:signalum_micro_miner_frame", [
        "PRP",
        "R R",
        "PRP"
    ], {
        P: "gtceu:signalum_plate",
        R: "gtceu:signalum_rod",
    }).addMaterialInfo()

    // Enderium Engine Frame
    event.recipes.gtceu.shaped("kubejs:enderium_micro_miner_frame", [
        "PRP",
        "R R",
        "PRP"
    ], {
        P: "gtceu:enderium_plate",
        R: "gtceu:enderium_rod",
    }).addMaterialInfo()

    // Electrum Engine Core
    event.recipes.gtceu.canner("electrum_micro_miner_core")
        .itemInputs("kubejs:electrum_micro_miner_frame", "1x minecraft:redstone_block")
        .itemOutputs("kubejs:electrum_micro_miner_core")
        .duration(500)
        .EUt(GTValues.VA[GTValues.HV])
        .addMaterialInfo(true)

    // Signalum Engine Core
    event.recipes.gtceu.canner("signalum_micro_miner_core")
        .itemInputs("kubejs:signalum_micro_miner_frame", "2x minecraft:redstone_block")
        .itemOutputs("kubejs:signalum_micro_miner_core")
        .duration(1000)
        .EUt(2000)
        .addMaterialInfo(true)

    // Enderium Engine Core
    event.recipes.gtceu.canner("enderium_micro_miner_core")
        .itemInputs("kubejs:enderium_micro_miner_frame", "4x minecraft:redstone_block")
        .itemOutputs("kubejs:enderium_micro_miner_core")
        .duration(2000)
        .EUt(8000)
        .addMaterialInfo(true)

    // Gemstone Sensor - Optical Sensor has been replaced with a Lens, which is slightly cheaper.
    event.shaped("kubejs:gem_sensor", [
        " A ",
        "WCW",
        " W "
    ], {
        A: "#forge:lenses",
        W: "gtceu:stainless_steel_plate",
        C: "gtceu:hv_sensor"
    })

    event.recipes.gtceu.assembler("gem_sensor_hv")
        .itemOutputs("kubejs:gem_sensor")
        .itemInputs("#forge:lenses", "3x gtceu:stainless_steel_plate", "gtceu:hv_sensor")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(20)

    event.shaped("4x kubejs:gem_sensor", [
        " A ",
        "WCW",
        " W "
    ], {
        A: "#forge:lenses",
        W: "gtceu:tungsten_carbide_plate",
        C: "gtceu:iv_sensor"
    })

    event.recipes.gtceu.assembler("gem_sensor_iv")
        .itemOutputs("4x kubejs:gem_sensor")
        .itemInputs("#forge:lenses", "3x gtceu:tungsten_carbide_plate", "gtceu:iv_sensor")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(20)

    // Microminer kits are consumed in place of the miner.
    event.recipes.gtceu.assembler("basic_drilling_kit")
        .itemOutputs("kubejs:basic_drilling_kit")
        .itemInputs("3x gtceu:double_steel_plate", "gtceu:mv_electric_motor", "2x #gtceu:circuits/lv", "2x minecraft:glass")
        .inputFluids("gtceu:lubricant 20")
        .EUt(GTValues.VA[GTValues.HV])
        .duration(300)

    event.recipes.gtceu.assembler("advanced_drilling_kit")
        .itemOutputs("kubejs:advanced_drilling_kit")
        .itemInputs("3x gtceu:double_vanadium_steel_plate", "gtceu:hv_electric_motor", "2x #gtceu:circuits/mv", "2x #forge:plastic_plates", "2x gtceu:tempered_glass")
        .inputFluids("gtceu:lubricant 100")
        .EUt(GTValues.VA[GTValues.IV])
        .duration(400)

    event.recipes.gtceu.assembler("elite_drilling_kit")
        .itemOutputs("kubejs:elite_drilling_kit")
        .itemInputs("3x gtceu:double_naquadah_alloy_plate", "gtceu:iv_electric_motor", "2x #gtceu:circuits/hv", "2x gtceu:carbon_fiber_plate", "2x gtceu:laminated_glass")
        .inputFluids("gtceu:lubricant 500")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(600)

    const explosives = [
        [16, "gtceu", "powderbarrel"],
        [8, "minecraft", "tnt"],
        [4, "gtceu", "dynamite"],
        [2, "gtceu", "industrial_tnt"]
    ]

    explosives.forEach(explosive => {
        event.recipes.gtceu.assembler(`blasting_kit_${explosive[2]}`)
            .itemOutputs("kubejs:blasting_kit")
            .itemInputs("3x gtceu:double_black_steel_plate", `${explosive[0]}x ${explosive[1]}:${explosive[2]}`, "3x #gtceu:circuits/lv", "2x gtceu:reinforced_epoxy_resin_plate", "2x #enderio:fused_quartz")
            .EUt(GTValues.VA[GTValues.EV])
            .duration(400)
    })

    event.recipes.gtceu.assembler("microversal_alchemy_kit")
        .itemOutputs("kubejs:microversal_alchemy_kit")
        .itemInputs("gtceu:mv_hermetic_casing", "1x gtceu:mv_fluid_regulator", "2x minecraft:brewing_stand", "6x minecraft:glass_bottle")
        .inputFluids(Fluid.of("gtceu:potion", 750, { Potion: "minecraft:awkward" }))
        .EUt(GTValues.VA[GTValues.EV])
        .duration(500)

    // Believe it or not, this is not how a nuke is made.
    event.recipes.gtceu.assembler("nuke_tnt_itnt")
        .itemOutputs("thermal:nuke_tnt")
        .itemInputs("gtceu:small_plutonium_241_dust", "2x gtceu:neutron_reflector", "gtceu:plutonium_ingot", "gtceu:uranium_block", "4x gtceu:aluminium_plate", "3x gtceu:industrial_tnt", "3x gtceu:dense_steel_plate")
        .inputFluids("gtceu:deuterium 500")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(500)
    event.recipes.gtceu.assembler("nuke_tnt_regular_tnt")
        .itemOutputs("thermal:nuke_tnt")
        .itemInputs("gtceu:small_plutonium_241_dust", "2x gtceu:neutron_reflector", "gtceu:plutonium_ingot", "gtceu:uranium_block", "4x gtceu:aluminium_plate", "12x minecraft:tnt", "3x gtceu:dense_steel_plate")
        .inputFluids("gtceu:deuterium 500")
        .EUt(GTValues.VA[GTValues.LuV])
        .duration(500)

    // Potential ingredient additions: Bolts, Screws, Plates, Wires, circuits, frame boxes
    event.recipes.gtceu.assembly_line("gravitational_amplifier")
        .itemOutputs("kubejs:gravitational_amplifier")
        .itemInputs(
            "8x ae2:singularity",
            "4x gtceu:gravi_star",
            Item.of("kubejs:hadal_energy_core", "{Damage:8000000}").weakNBT(),
            "gtceu:zpm_field_generator",
            "12x redstone_arsenal:flux_plating",
            "16x gtceu:enderium_foil",
            "16x gtceu:darmstadtium_bolt",
            "5x gtceu:fusion_glass")
        .inputFluids("gtceu:living_soldering_alloy 864", "gtceu:naquadria 576", "gtceu:polyethyl_cyanoacrylate 288")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UV])
        .stationResearch(builder => builder
            .researchStack("ae2:singularity")
            .CWUt(64, 256000)
            .EUt(GTValues.VA[GTValues.UV])
        )
    event.recipes.gtceu.assembly_line("universal_collapse_device")
        .itemOutputs("kubejs:universal_collapse_device")
        .itemInputs(
            "2x kubejs:gravitational_amplifier",
            "16x thermal:nuke_tnt",
            "16x kubejs:quantum_flux",
            "gtceu:uv_field_generator",
            "kubejs:universal_warp_core",
            "kubejs:universal_warp_controller",
            "4x kubejs:universe_resistant_neutronium_heavy_plating",
            "12x gtceu:styrene_butadiene_rubber_foil"
        )
        .inputFluids("gtceu:living_soldering_alloy 1152", "monilabs:crystal_matrix 576", "gtceu:microversium 1152")
        .duration(1000)
        .EUt(GTValues.VA[GTValues.UHV])
        .stationResearch(builder => builder
            .researchStack("kubejs:gravitational_amplifier")
            .CWUt(108, 512000)
            .EUt(GTValues.VA[GTValues.UHV])
        )
})
