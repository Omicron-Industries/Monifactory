/**
 * Processing lines for post-tank Wafers
 */
ServerEvents.recipes(event => {
    // Post-tank PIC
    event.recipes.gtceu.laser_engraver("uxpic_wafer_neutronium")
        .itemInputs("gtceu:neutronium_wafer")
        .notConsumable("#forge:lenses/lime")
        .itemOutputs("kubejs:uxpic_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(25 * 20)
        .EUt(GTValues.VA[GTValues.ZPM])

    event.recipes.gtceu.laser_engraver("uxpic_wafer_null")
        .itemInputs("kubejs:null_wafer")
        .notConsumable("#forge:lenses/lime")
        .itemOutputs("2x kubejs:uxpic_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(25 * 20)
        .EUt(GTValues.VA[GTValues.UV])

    event.recipes.gtceu.cutter("uxpic_chip")
        .itemInputs("kubejs:uxpic_wafer")
        .itemOutputs("1x kubejs:uxpic_chip")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(45 * 20)
        .EUt(GTValues.VHA[GTValues.ZPM])

    event.recipes.gtceu.electric_blast_furnace("null_doped_boule")
        .itemInputs("4x gtceu:meta_null_ingot", "64x gtceu:silicon_block", "16x kubejs:stabilized_curium")
        .inputFluids("kubejs:molten_pyrotheum 16000")
        .itemOutputs("kubejs:null_boule")
        .duration(18000)
        .EUt(250000)
        .blastFurnaceTemp(11000)

    event.recipes.gtceu.cutter("null_wafer")
        .itemInputs("kubejs:null_boule")
        .inputFluids(Fluid.of("minecraft:water", 1000))
        .itemOutputs("64x kubejs:null_wafer", "64x kubejs:null_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(7200)
        .EUt(128000)

    event.recipes.gtceu.cutter("null_wafer_distilled")
        .itemInputs("kubejs:null_boule")
        .inputFluids(Fluid.of("gtceu:distilled_water", 750))
        .itemOutputs("64x kubejs:null_wafer", "64x kubejs:null_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(4800)
        .EUt(128000)

    event.recipes.gtceu.cutter("null_wafer_lubricant")
        .itemInputs("kubejs:null_boule")
        .inputFluids(Fluid.of("gtceu:lubricant", 250))
        .itemOutputs("64x kubejs:null_wafer", "64x kubejs:null_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(3600)
        .EUt(128000)

    function NullEngrave(name, lens, wafer, time) {
        event.recipes.gtceu.laser_engraver(name)
            .itemInputs("kubejs:null_wafer")
            .notConsumable(lens)
            .itemOutputs(wafer)
            .duration(time)
            .cleanroom(CleanroomType.CLEANROOM)
            .EUt(16000)
    }

    NullEngrave("ilc_wafer", "#forge:lenses/red", "32x gtceu:ilc_wafer", 20);
    NullEngrave("ram_wafer", "#forge:lenses/green", "32x gtceu:ram_wafer", 20);
    NullEngrave("cpu_wafer", "#forge:lenses/light_blue", "32x gtceu:cpu_wafer", 20);
    NullEngrave("lpic_wafer", "gtceu:orange_glass_lens", "32x gtceu:lpic_wafer", 20);
    NullEngrave("mpic_wafer", "gtceu:brown_glass_lens", "32x gtceu:mpic_wafer", 100);
    NullEngrave("simple_soc_wafer", "gtceu:cyan_glass_lens", "32x gtceu:simple_soc_wafer", 20);
    NullEngrave("hasoc_wafer", "gtceu:black_glass_lens", "4x gtceu:highly_advanced_soc_wafer", 500);
    NullEngrave("ulpic_wafer", "#forge:lenses/blue", "32x gtceu:ulpic_wafer", 20);
    NullEngrave("soc_wafer", "gtceu:yellow_glass_lens", "16x gtceu:soc_wafer", 100);
    NullEngrave("asoc_wafer", "#forge:lenses/purple", "8x gtceu:advanced_soc_wafer", 200);
    NullEngrave("nand_wafer", "gtceu:gray_glass_lens", "16x gtceu:nand_memory_wafer", 100);
    NullEngrave("nor_wafer", "gtceu:pink_glass_lens", "16x gtceu:nor_memory_wafer", 100);

    // Multidimensional CPU

    event.recipes.gtceu.laser_engraver("unactivated_dimensional_cpu_wafer")
        .itemInputs("kubejs:null_wafer")
        .notConsumable("gtceu:light_gray_glass_lens")
        .itemOutputs("kubejs:unactivated_multidimensional_cpu_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1200)
        .EUt(GTValues.VA[GTValues.LuV])

    event.recipes.gtceu.large_chemical_reactor("multidimensional_cpu_wafer")
        .itemInputs("16x kubejs:unactivated_multidimensional_cpu_wafer", "64x kubejs:quantum_flux", "kubejs:quasi_stable_neutron_star")
        .inputFluids(Fluid.of("gtceu:xenon", 1000))
        .itemOutputs("16x kubejs:multidimensional_cpu_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(900)
        .EUt(GTValues.VA[GTValues.ZPM])

    event.recipes.gtceu.cutter("multidimensional_cpu_chip")
        .itemInputs("kubejs:multidimensional_cpu_wafer")
        .inputFluids(Fluid.of("minecraft:water", 1000))
        .itemOutputs("16x kubejs:multidimensional_cpu_chip")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1800)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.cutter("multidimensional_cpu_chip_distilled")
        .itemInputs("kubejs:multidimensional_cpu_wafer")
        .inputFluids(Fluid.of("gtceu:distilled_water", 750))
        .itemOutputs("16x kubejs:multidimensional_cpu_chip")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1200)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.cutter("multidimensional_cpu_chip_lubricant")
        .itemInputs("kubejs:multidimensional_cpu_wafer")
        .inputFluids(Fluid.of("gtceu:lubricant", 250))
        .itemOutputs("16x kubejs:multidimensional_cpu_chip")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(900)
        .EUt(GTValues.VA[GTValues.IV])

    // Hyperdynamic RAM
    event.recipes.gtceu.laser_engraver("hyperdynamic_ram_wafer")
        .itemInputs("kubejs:null_wafer")
        .notConsumable("gtceu:magenta_glass_lens")
        .itemOutputs("kubejs:hyperdynamic_ram_wafer")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1200)
        .EUt(GTValues.VA[GTValues.ZPM])

    event.recipes.gtceu.cutter("hyperdynamic_ram_chip")
        .itemInputs("kubejs:hyperdynamic_ram_wafer")
        .inputFluids(Fluid.of("minecraft:water", 1000))
        .itemOutputs("12x kubejs:hyperdynamic_ram_chip_base")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1800)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.cutter("hyperdynamic_ram_chip_distilled")
        .itemInputs("kubejs:hyperdynamic_ram_wafer")
        .inputFluids(Fluid.of("gtceu:distilled_water", 750))
        .itemOutputs("12x kubejs:hyperdynamic_ram_chip_base")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(1200)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.cutter("hyperdynamic_ram_chip_lubricant")
        .itemInputs("kubejs:hyperdynamic_ram_wafer")
        .inputFluids(Fluid.of("gtceu:lubricant", 250))
        .itemOutputs("12x kubejs:hyperdynamic_ram_chip_base")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(900)
        .EUt(GTValues.VA[GTValues.IV])

    event.recipes.gtceu.circuit_assembler("activated_hyperdynamic_ram_chip")
        .itemInputs("16x kubejs:hyperdynamic_ram_chip_base", "kubejs:optical_processing_unit", "4x gtceu:advanced_smd_transistor", "8x gtceu:fine_necrosiderite_wire")
        .inputFluids("gtceu:living_soldering_alloy 144")
        .itemOutputs("16x kubejs:hyperdynamic_ram_chip")
        .cleanroom(CleanroomType.CLEANROOM)
        .duration(300)
        .EUt(GTValues.VA[GTValues.UV])
})
