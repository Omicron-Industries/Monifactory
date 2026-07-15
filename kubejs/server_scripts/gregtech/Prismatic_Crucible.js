/**
 * Anything related to the Prismatic Crucible
 */

ServerEvents.recipes(event => {
    // Controller
    event.recipes.gtceu.assembly_line("prismatic_crucible")
        .itemInputs("monilabs:dimensional_stabilization_netherite_casing", "kubejs:heart_of_a_universe", "6x gtceu:uv_sensor", "2x #gtceu:circuits/uhv", "2x gtceu:uhv_field_generator", "4x gtceu:uhv_electric_pump", "2x gtceu:dense_trinaquadalloy_plate", "16x gtceu:normal_laser_pipe", "12x gtceu:tritanium_single_cable")
        .inputFluids("gtceu:living_soldering_alloy 1152", "gtceu:polyethyl_cyanoacrylate 1152", "gtceu:omnium 1728")
        .itemOutputs("monilabs:prismatic_crucible")
        .duration(20 * 120)
        .EUt(GTValues.VA[GTValues.UHV])
        .stationResearch(b => b
            .researchStack("monilabs:prismatic_focus")
            .CWUt(144)
            .EUt(GTValues.VA[GTValues.UHV])
        )

    // Chroma Sensor Hatch
    event.recipes.gtceu.assembler("chroma_sensor_hatch")
        .itemInputs("monilabs:dimensional_stabilization_netherite_casing", "3x gtceu:zpm_sensor", "12x gtceu:red_alloy_screw", "2x gtceu:europium_single_cable")
        .inputFluids("gtceu:omnium 432")
        .itemOutputs("monilabs:chroma_sensor_hatch")
        .duration(20 * 10)
        .EUt(GTValues.VA[GTValues.UV])
        .addMaterialInfo(true)

    // Advanced Chroma Sensor Hatch
    event.recipes.gtceu.assembler("advanced_chroma_sensor_hatch")
        .itemInputs("monilabs:chroma_sensor_hatch", "gtceu:uv_sensor")
        .inputFluids("gtceu:omnium 432")
        .itemOutputs("monilabs:advanced_chroma_sensor_hatch")
        .duration(20 * 20)
        .EUt(GTValues.VA[GTValues.UHV])
        .addMaterialInfo(true)

    /**
     * Chromatic Processing map
     * Includes: PSoCs, PRISM
     */

    // Callibration
    event.recipes.gtceu.chromatic_processing("processing_callibration")
        .itemInputs("kubejs:chromatic_stabilizer")
        .inputColor(PrismaticColor.PRIMARY)
        .outputStatesRelative(4)
        .duration(40)
        .EUt(GTValues.VHA[GTValues.UV])

    const colors = ["red", "yellow", "green", "cyan", "blue", "magenta"]
    const psocRecipes = [ // [psoc color in, [psoc color out when prismac is r,y,g,c,b,m]]
        ["red", ["inert", "green", "yellow", "active", "magenta", "blue"]],
        ["yellow", ["green", "inert", "red", "magenta", "active", "cyan"]],
        ["green", ["yellow", "red", "inert", "blue", "cyan", "active"]],
        ["cyan", ["active", "magenta", "blue", "inert", "green", "yellow"]],
        ["blue", ["magenta", "active", "cyan", "green", "inert", "red"]],
        ["magenta", ["blue", "cyan", "active", "yellow", "red", "inert"]]
    ]

    colors.forEach((prismacIn, index) => {
        // Inert psoc recipes
        event.recipes.gtceu.chromatic_processing(`psoc_inert_${prismacIn[0]}`)
            .itemInputs("kubejs:photonic_soc_inert")
            .itemOutputs(`kubejs:photonic_soc_${prismacIn}`)
            .inputColor(PrismaticColor[prismacIn.toUpperCase()])
            .outputStatesNormal(PrismaticColor[colors[(Math.floor(index / 2) * 2 + 2) % 6].toUpperCase()])
            .duration(40)
            .EUt(GTValues.VHA[GTValues.UV])

        // Not inert psoc recipes
        psocRecipes.forEach(([psocIn, psocOut]) => {
            event.recipes.gtceu.chromatic_processing(`psoc_${psocIn[0]}_${prismacIn[0]}`)
                .itemInputs(`kubejs:photonic_soc_${psocIn}`)
                .itemOutputs(`kubejs:photonic_soc_${psocOut[index]}`)
                .inputColor(PrismaticColor[prismacIn.toUpperCase()])
                .outputStatesNormal(PrismaticColor[psocIn.toUpperCase()])
                .duration(40)
                .EUt(GTValues.VHA[GTValues.UV])
        })
    })

    // PRISM
    event.recipes.gtceu.chromatic_processing("prism_red")
        .itemInputs("kubejs:lyso_ce_glass")
        .itemOutputs("kubejs:red_aligned_glass")
        .inputColor(PrismaticColor.RED)
        .outputStatesNormal(PrismaticColor.BLUE)
        .duration(40)
        .EUt(GTValues.VHA[GTValues.UV])
    event.recipes.gtceu.chromatic_processing("prism_green")
        .itemInputs("kubejs:red_aligned_glass")
        .itemOutputs("kubejs:green_aligned_glass")
        .inputColor(PrismaticColor.GREEN)
        .outputStatesNormal(PrismaticColor.RED)
        .duration(40)
        .EUt(GTValues.VHA[GTValues.UV])
    event.recipes.gtceu.chromatic_processing("prism_blue")
        .itemInputs("kubejs:green_aligned_glass")
        .itemOutputs("kubejs:blue_aligned_glass")
        .inputColor(PrismaticColor.BLUE)
        .outputStatesNormal(PrismaticColor.GREEN)
        .duration(40)
        .EUt(GTValues.VHA[GTValues.UV])


    /**
     * Chromatic transcendence
     * Includes: Prismatic Core lines, Transcendental Callibration
     */

    // Stabilizer
    event.recipes.gtceu.chromatic_transcendence("stabilizer_primary")
        .itemInputs("kubejs:chromatic_stabilizer")
        .inputColor(PrismaticColor.PRIMARY)
        .outputStatesRelative(-2)
        .duration(40)
        .EUt(GTValues.VHA[GTValues.UHV])
    event.recipes.gtceu.chromatic_transcendence("stabilizer_secondary")
        .itemInputs("kubejs:chromatic_stabilizer")
        .inputColor(PrismaticColor.SECONDARY)
        .outputStatesRelative(2)
        .duration(40)
        .EUt(GTValues.VHA[GTValues.UHV])

    const tertiaryStabilizerRecipes = [
        ["pink", "red"],
        ["orange", "red"],
        ["lime", "green"],
        ["teal", "green"],
        ["azure", "blue"],
        ["indigo", "blue"]
    ]
    tertiaryStabilizerRecipes.forEach(([prismacIn, prismacOut]) => {
        event.recipes.gtceu.chromatic_transcendence(`stabilizer_${prismacIn}`)
            .itemInputs("kubejs:chromatic_stabilizer")
            .inputColor(PrismaticColor[prismacIn.toUpperCase()])
            .outputStatesNormal(PrismaticColor[prismacOut.toUpperCase()])
            .duration(40)
            .EUt(GTValues.VHA[GTValues.UHV])
    })

    // Chromatic Capacitor Charging
    colors.forEach((color) => {
        event.recipes.gtceu.chromatic_transcendence(`capacitor_${color}`)
            .itemInputs("kubejs:chromatic_capacitor_empty")
            .itemOutputs(`kubejs:chromatic_capacitor_${color}`)
            .inputColor(PrismaticColor[color.toUpperCase()])
            .outputStatesNormal(PrismaticColor[color.toUpperCase()])
            .duration(40)
            .EUt(GTValues.VHA[GTValues.UHV])
    })

    // Chromatic Capcitor Discharging
    const capacitorDischarging = [
        ["yellow", "red", "orange"],
        ["red", "yellow", "orange"],
        ["green", "yellow", "lime"],
        ["yellow", "green", "lime"],
        ["cyan", "green", "teal"],
        ["green", "cyan", "teal"],
        ["blue", "cyan", "azure"],
        ["cyan", "blue", "azure"],
        ["magenta", "blue", "indigo"],
        ["blue", "magenta", "indigo"],
        ["red", "magenta", "pink"],
        ["magenta", "red", "pink"],
    ]
    capacitorDischarging.forEach(([capacitor, prismacIn, prismacOut]) => {
        event.recipes.gtceu.chromatic_transcendence(`capacitor_${prismacIn}_${prismacOut}`)
            .itemInputs(`kubejs:chromatic_capacitor_${capacitor}`)
            .itemOutputs("kubejs:chromatic_capacitor_empty")
            .inputColor(PrismaticColor[prismacIn.toUpperCase()])
            .outputStatesNormal(PrismaticColor[prismacOut.toUpperCase()])
            .duration(40)
            .EUt(GTValues.VHA[GTValues.UHV])
    })

    // Prismatic Core Processing
    const priscoreRecipes = [
        ["red", "yellow", "yellow", "red", 192, 192, "none"],
        ["yellow", "green", "green", "blue", 288, 384, "none"],
        ["green", "cyan", "cyan", "green", 288, 672, "none"],
        ["cyan", "blue", "blue", "red", 384, 960, "none"],
        ["blue", "magenta", "active", "blue", 384, 1344, "none"],
        ["active", "orange", "orange", "green", 576, 1728, "yellow"],
        ["orange", "lime", "lime", "indigo", 576, 2304, "none"],
        ["lime", "teal", "teal", "blue", 768, 2880, "cyan"],
        ["teal", "azure", "azure", "orange", 768, 3648, "none"],
        ["azure", "indigo", "indigo", "red", 1152, 4416, "magenta"],
        ["indigo", "pink", "supercritical", "teal", 1152, 5568, "none"]
    ]

    priscoreRecipes.forEach(([coreIn, prismacIn, coreOut, prismacOut, transMb, nullMb, prismacOutHM]) => {
        if(doHarderProcessing & prismacOutHM != "none") {
            event.recipes.gtceu.chromatic_transcendence(`prismatic_core_${prismacIn[0]}`)
                .itemInputs(`kubejs:${coreIn}_prismatic_core`)
                .inputFluids(`monilabs:transcendental_matrix ${transMb}`)
                .itemOutputs(`kubejs:${coreOut}_prismatic_core`)
                .inputColor(PrismaticColor[prismacIn.toUpperCase()])
                .outputStatesNormal(PrismaticColor[prismacOut.toUpperCase()], PrismaticColor[prismacOutHM.toUpperCase()])
                .duration(20)
                .EUt(GTValues.VHA[GTValues.UHV])
        } else {
            event.recipes.gtceu.chromatic_transcendence(`prismatic_core_${prismacIn[0]}`)
                .itemInputs(`kubejs:${coreIn}_prismatic_core`)
                .inputFluids(`monilabs:transcendental_matrix ${transMb}`)
                .itemOutputs(`kubejs:${coreOut}_prismatic_core`)
                .inputColor(PrismaticColor[prismacIn.toUpperCase()])
                .outputStatesNormal(PrismaticColor[prismacOut.toUpperCase()])
                .duration(20)
                .EUt(GTValues.VHA[GTValues.UHV])
        }

        event.recipes.gtceu.chromatic_transcendence(`prismatic_core_${prismacIn[0]}_void`)
            .itemInputs(`kubejs:${coreIn}_prismatic_core`)
            .outputFluids(`gtceu:meta_null ${nullMb}`)
            .inputColor(PrismaticColor["NOT_" + prismacIn.toUpperCase()])
            .outputStatesRelative(0)
            .duration(20)
            .EUt(GTValues.VHA[GTValues.UHV])
    })

    // Have to do red priscore manually cause it shouldn't output null when voided
    event.recipes.gtceu.chromatic_transcendence("prismatic_core_r")
        .itemInputs("kubejs:inert_prismatic_core")
        .inputFluids("monilabs:transcendental_matrix 128")
        .itemOutputs("kubejs:red_prismatic_core")
        .inputColor(PrismaticColor.RED)
        .outputStatesNormal(PrismaticColor.GREEN)
        .duration(20)
        .EUt(GTValues.VHA[GTValues.UHV])

    event.recipes.gtceu.chromatic_transcendence("prismatic_core_r_void")
        .itemInputs("kubejs:inert_prismatic_core")
        .inputColor(PrismaticColor.NOT_RED)
        .outputStatesRelative(0)
        .duration(20)
        .EUt(GTValues.VHA[GTValues.UHV])

    event.recipes.gtceu.chromatic_transcendence("prismatic_core_supercritical_void")
        .itemInputs("kubejs:supercritical_prismatic_core")
        .outputFluids("gtceu:meta_null 4480")
        .inputColor(PrismaticColor.ANY)
        .outputStatesRelative(0)
        .duration(20)
        .EUt(GTValues.VHA[GTValues.UHV])
})
