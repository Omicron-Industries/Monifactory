/**
 * Custom recipes for the Thermal Series
 */
ServerEvents.recipes(event => {
    event.remove({ output: ["systeams:steam_dynamo", "steamdynamo:steam_dynamo", "systeams:boiler_pipe", "thermal:rf_coil"] })
    event.remove({ output: ["thermal:dynamo_throttle_augment", "thermal:upgrade_augment_1", "thermal:upgrade_augment_2", "thermal:upgrade_augment_3"] })
    event.remove({ output: ["thermal:machine_furnace", "thermal:machine_sawmill", "thermal:machine_pulverizer", "thermal:machine_smelter", "thermal:machine_centrifuge", "thermal:machine_chiller", "thermal:machine_refinery", "thermal:machine_pyrolyzer", "thermal:machine_bottler", "thermal:machine_brewer", "thermal:machine_crystallizer"] })

    // Magma Crucible for Lava only
    event.remove({ type: "thermal:crucible", not: { id: /^thermal:machines\/crucible\/crucible_[\w_]+_to_lava$/ }})
    // Igneous Extruder for Stone & Cobblestone only
    event.remove({ type: "thermal:rock_gen", not: [{ id: "thermal:devices/rock_gen/rock_gen_cobblestone" }, { id: "thermal:devices/rock_gen/rock_gen_stone" }]})

    event.remove({ id: /^thermal:.*_cast/ })
    event.remove({ id: /^thermal:dynamo_/}) // Remove non-downgrade recipes for Thermal dynamos
    event.remove({ id: "thermal:fire_charge/obsidian_glass_2" }) // Our recipe for Obsidian glass is different

    // Unify Thermal with GT rubber
    event.replaceInput({ id: /^thermal:/ }, ["thermal:cured_rubber"], ["#forge:rubber_plates"])

    // Unify packing dies (ReplaceInput does not work on tags)
    event.shaped("thermal:press_packing_2x2_die", [
        " A ",
        "BCB",
        " A "
    ], {
        A: "gtceu:invar_plate",
        B: "gtceu:cupronickel_plate",
        C: "#minecraft:planks"
    }).id("thermal:press_packing_2x2_die")

    event.shaped("thermal:press_packing_3x3_die", [
        " B ",
        "ACA",
        " B "
    ], {
        A: "gtceu:invar_plate",
        B: "gtceu:cupronickel_plate",
        C: "#minecraft:planks"
    }).id("thermal:press_packing_3x3_die")

    event.shaped("thermal:press_unpacking_die", [
        "B A",
        " C ",
        "A B"
    ], {
        A: "gtceu:invar_plate",
        B: "gtceu:cupronickel_plate",
        C: "#minecraft:planks"
    }).id("thermal:press_unpacking_die")


    // Hardened Glass recipes
    event.recipes.gtceu.alloy_smelter("kubejs:hardened_glass")
        .itemInputs("1x #forge:dusts/lead", "4x #forge:dusts/obsidian")
        .itemOutputs("2x thermal:obsidian_glass")
        .duration(40)
        .EUt(GTValues.VA[GTValues.LV])

    event.recipes.gtceu.alloy_smelter("kubejs:signalum_glass")
        .itemInputs("1x #forge:dusts/signalum", "2x thermal:obsidian_glass")
        .itemOutputs("2x thermal:signalum_glass")
        .duration(40)
        .EUt(GTValues.VA[GTValues.HV])
    event.recipes.gtceu.alloy_smelter("kubejs:lumium_glass")
        .itemInputs("1x #forge:dusts/lumium", "2x thermal:obsidian_glass")
        .itemOutputs("2x thermal:lumium_glass")
        .duration(40)
        .EUt(GTValues.VA[GTValues.HV])
    event.recipes.gtceu.alloy_smelter("kubejs:enderium_glass")
        .itemInputs("1x #forge:dusts/enderium", "2x thermal:obsidian_glass")
        .itemOutputs("2x thermal:enderium_glass")
        .duration(40)
        .EUt(GTValues.VA[GTValues.HV])


    // Centrifuging Recipes for Arboreal Extractor products
    event.recipes.gtceu.centrifuge("kubejs:latex_centrifuging")
        .inputFluids(Fluid.of("thermal:latex", 500))
        .itemOutputs("2x gtceu:raw_rubber_dust")
        .outputFluids(Fluid.of("minecraft:water", 400))
        .duration(60).EUt(6)

    event.recipes.gtceu.centrifuge("kubejs:resin_centrifuging")
        .inputFluids(Fluid.of("thermal:resin", 400))
        .itemOutputs("gtceu:sticky_resin")
        .chancedOutput("thermal:rosin", 6000, 0)
        .outputFluids(Fluid.of("thermal:tree_oil", 150), Fluid.of("minecraft:water", 150))
        .duration(200).EUt(20)

    event.recipes.gtceu.distillation_tower("kubejs:sap_distillation")
        .inputFluids(Fluid.of("thermal:sap", 200))
        .outputFluids(Fluid.of("thermal:syrup", 15), Fluid.of("minecraft:water", 175))
        .chancedOutput("minecraft:sugar", 1000, 0)
        .duration(10 * 20).EUt(2)

    event.remove({ id: "thermal:redstone_servo" });
    event.shaped("thermal:redstone_servo", [
        "ABA",
        " B ",
        "ABA"
    ], {
        A: "kubejs:resonating_crystal",
        B: "#forge:plates/electrical_steel"
    }).id("kubejs:redstone_servo");

    // Coil Ingredients
    event.shaped("thermal:rf_coil", [
        " BA",
        "BAB",
        "AB "
    ], {
        A: "#forge:rods/gold",
        B: "minecraft:redstone"
    })
    event.recipes.gtceu.assembler("thermal:rf_coil_assembly")
        .itemInputs("#forge:springs/gold")
        .inputFluids("gtceu:red_alloy 72")
        .itemOutputs("thermal:rf_coil")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])
        .addMaterialInfo(true)

    event.shaped("kubejs:redstone_transmission_coil", [
        " BA",
        "BAB",
        "AB "
    ], {
        A: "#forge:rods/silver",
        B: "minecraft:redstone"
    })
    event.recipes.gtceu.assembler("kubejs:rf_transmission_coil_assembly")
        .itemInputs("#forge:springs/silver")
        .inputFluids("gtceu:red_alloy 72")
        .itemOutputs("kubejs:redstone_transmission_coil")
        .duration(100)
        .EUt(GTValues.VA[GTValues.LV])
        .addMaterialInfo(true)

    // Insightful Crystal
    event.remove({ id: "thermal:tools/xp_crystal" })
    event.recipes.gtceu.autoclave("insightful_crystal")
        .itemInputs("5x gtceu:lapotron_dust", "2x gtceu:emerald_dust")
        .inputFluids("enderio:xp_juice 1000")
        .itemOutputs("thermal:xp_crystal")
        .duration(20 * 40)
        .EUt(GTValues.VA[GTValues.MV])

    /* === AUGMENTS/UPGRADES ===*/
    event.recipes.gtceu.shaped("thermal:upgrade_augment_1", [
        "ABA",
        "RGR",
        "ABA"
    ], {
        A: "gtceu:invar_screw",
        B: "gtceu:double_invar_plate",
        G: "gtceu:electrical_steel_gear",
        R: "gtceu:fine_red_alloy_wire"
    })

    event.recipes.gtceu.shaped("thermal:upgrade_augment_2", [
        "PGP",
        "BCB",
        "PGP"
    ], {
        B: "gtceu:black_bronze_gear",
        P: "gtceu:double_electrum_plate",
        G: "thermal:obsidian_glass",
        C: "thermal:upgrade_augment_1"
    })

    event.recipes.gtceu.shaped("thermal:upgrade_augment_4", [
        "SSS",
        "SCE",
        "RRS"
    ], {
        R: "gtceu:restonia_gem",
        S: "gtceu:signalum_plate",
        E: "gtceu:energy_crystal",
        C: "thermal:upgrade_augment_2"
    })

    event.recipes.gtceu.shaped("thermal:upgrade_augment_3", [
        "ABG",
        "BCB",
        "GBA"
    ], {
        A: "gtceu:double_cryolobus_plate",
        B: "gtceu:enderium_plate",
        C: "thermal:upgrade_augment_4",
        G: "gtceu:small_tungsten_carbide_gear"
    })

    // Advanced Thermal Storage augments
    event.recipes.gtceu.shaped("thermal:rf_coil_augment_advanced", [
        "PGP",
        "SCS",
        " G "
    ], {
        P: "#forge:plates/stainless_steel",
        S: "gtceu:sterling_silver_plate",
        C: "thermal:rf_coil",
        G: "gtceu:rose_gold_plate",
    }).addMaterialInfo()

    event.recipes.gtceu.shaped("thermal:rf_coil_storage_augment_advanced", [
        "PSP",
        "GCG",
        " G "
    ], {
        P: "#forge:plates/stainless_steel",
        S: "gtceu:sterling_silver_plate",
        C: "thermal:rf_coil",
        G: "gtceu:rose_gold_plate"
    }).addMaterialInfo()

    event.recipes.gtceu.shaped("thermal:rf_coil_xfer_augment_advanced", [
        "PSP",
        "SCS",
        " G "
    ], {
        P: "#forge:plates/stainless_steel",
        S: "gtceu:sterling_silver_plate",
        C: "thermal:rf_coil",
        G: "gtceu:rose_gold_plate"
    }).addMaterialInfo()

    event.recipes.gtceu.shaped("thermal:fluid_tank_augment_advanced", [
        "PLP",
        "RBR",
        " G "
    ], {
        P: "#forge:plates/stainless_steel",
        L: "#forge:plastic_plates",
        R: "gtceu:silicone_rubber_ring",
        G: "#thermal:glass/hardened",
        B: "gtceu:bronze_normal_fluid_pipe"
    }).addMaterialInfo()

    // Temporary Reset NBT recipes
    const oldNBTAugment = ["thermal:upgrade_augment_1", "thermal:upgrade_augment_2" , "thermal:upgrade_augment_3", "thermal:upgrade_augment_4", "thermal:rf_coil_augment_advanced", "thermal:rf_coil_storage_augment_advanced", "thermal:rf_coil_xfer_augment_advanced", "thermal:fluid_tank_augment_advanced"]

    oldNBTAugment.forEach((augment) => {
        event.shapeless(augment, augment)
    })

    // Machine and Dynamo augments
    event.recipes.gtceu.shaped("thermal:dynamo_fuel_augment", [
        "PIP",
        "GCG",
        "PIP"
    ], {
        I: "#forge:ingots/wrought_iron",
        P: "gtceu:wrought_iron_plate",
        C: "thermal:rf_coil",
        G: "gtceu:small_copper_gear"
    }).id("thermal:augments/dynamo_fuel_augment").addMaterialInfo()

    event.recipes.gtceu.shaped("thermal:dynamo_output_augment", [
        "SEI",
        "ECE",
        "IES"
    ], {
        S: "#forge:ingots/sterling_silver",
        E: "#forge:ingots/energetic_alloy",
        I: "#forge:storage_blocks/conductive_alloy",
        C: "kubejs:redstone_transmission_coil"
    }).id("thermal:augments/dynamo_output_augment").addMaterialInfo();

    event.recipes.gtceu.shaped("thermal:machine_output_augment", [
        "MGM",
        "PCP",
        "MGM"
    ], {
        M: "#forge:nuggets/mythril",
        G: "#forge:gears/bronze",
        P: "#forge:plates/invar",
        C: "thermal:redstone_servo"
    }).id("thermal:augments/machine_output_augment").addMaterialInfo();

    event.recipes.gtceu.shaped("thermal:machine_null_augment", [
        "ONO",
        "NCN",
        "ONO"
    ], {
        O: "#forge:plates/obsidian",
        N: "#forge:nuggets/mythril",
        C: "minecraft:cactus" // since we use cactus to delete items now
    }).id("thermal:augments/machine_null_augment").addMaterialInfo();

    event.recipes.gtceu.shaped("thermal:dynamo_throttle_augment", [
        "SES",
        "NCN",
        "SES"
    ], {
        S: "#forge:plates/stainless_steel",
        E: "#forge:ingots/electrum",
        N: "#forge:springs/lead",
        C: "kubejs:excitationcoil"
    }).id("thermal:augments/dynamo_throttle_augment").addMaterialInfo();

    event.recipes.gtceu.shaped("thermal:machine_catalyst_augment", [
        " A ",
        "BCB",
        " A "
    ], {
        A: "gtceu:cupronickel_spring",
        B: "gtceu:lead_plate",
        C: "thermal:redstone_servo"
    }).id("thermal:augments/machine_catalyst_augment").addMaterialInfo()

    event.recipes.gtceu.shaped("thermal:machine_cycle_augment", [
        "DAD",
        "BCB",
        "DAD"
    ], {
        A: "gtceu:signalum_gear",
        B: "gtceu:bronze_plate",
        C: "thermal:redstone_servo",
        D: "#forge:plates/stainless_steel"
    }).id("thermal:augments/machine_cycle_augment").addMaterialInfo()

    event.replaceInput({ id: "thermal:augments/item_filter_augment" }, "#forge:ingots/signalum", "gtceu:item_filter")
    event.replaceInput({ id: "thermal:augments/fluid_filter_augment" }, "#forge:ingots/signalum", "gtceu:fluid_filter")

    // Dynamos
    event.shaped("kubejs:excitationcoil", [
        " B ",
        "BAB",
        "CAC"
    ], {
        A: "kubejs:redstone_transmission_coil",
        B: "#forge:plates/red_alloy",
        C: "#forge:plates/tin"
    })
    event.recipes.gtceu.assembler("kubejs:excitationcoil_assembly")
        .itemInputs("kubejs:redstone_transmission_coil", "2x #forge:plates/red_alloy", "1x #forge:plates/tin")
        .itemOutputs("kubejs:excitationcoil")
        .duration(180)
        .EUt(GTValues.VA[GTValues.LV])
        .addMaterialInfo(true)

    if (doBoilers) {
        event.recipes.gtceu.shaped("systeams:steam_dynamo", [
            " A ",
            "BCB",
            "DED"
        ], {
            A: "kubejs:excitationcoil",
            B: "gtceu:copper_plate",
            C: "ironfurnaces:iron_furnace",
            D: "gtceu:wrought_iron_gear",
            E: "thermal:rf_coil"
        }).addMaterialInfo()

        event.recipes.gtceu.shaped("systeams:boiler_pipe", [
            "  A",
            " B ",
            "A  "
        ], {
            A: "gtceu:copper_plate",
            B: "#enderio:fused_quartz"
        }).addMaterialInfo()

        // Steam Dynamo upgrade (Does not work with the systeams:upgrade_shapeless recipe type in this direction,
        // so we recreate the special recipe stuff using KJS here)
        event.shapeless("systeams:stirling_boiler", ["steamdynamo:steam_dynamo", "systeams:boiler_pipe"])
            .modifyResult((grid, result) => {
                let input = grid.find("steamdynamo:steam_dynamo")
                return result.withNBT(input.nbt)
            })
            .replaceIngredient("steamdynamo:steam_dynamo", "thermal:rf_coil")
            .id("systeams:boiler/upgrades/stirling_upgrade")


        // Steam Dynamo downgrade
        event.custom(
            {
                "type": "systeams:upgrade_shapeless",
                "ingredients": [
                    {"item":"systeams:stirling_boiler"},
                    {"item":"thermal:rf_coil"}
                ],
                "result": {
                    "item": "steamdynamo:steam_dynamo"
                },
                "replacement": "systeams:boiler_pipe"
            }
        )

        // Remove recipes for boilers that aren't the upgrade from dynamo recipe
        event.remove({ id: /^systeams:boilers\/(?!upgrade)/ })
    }

    // Dynamo and Boiler recipes
    function defineDynamoRecipes(asBoiler) {
        event.recipes.gtceu.shaped(asBoiler ? "systeams:stirling_boiler" : "steamdynamo:steam_dynamo", [
            " A ",
            "BCB",
            "DED"
        ], {
            A: "kubejs:excitationcoil",
            B: "gtceu:wrought_iron_plate",
            C: "ironfurnaces:iron_furnace",
            D: "gtceu:wrought_iron_gear",
            E: asBoiler ? "systeams:boiler_pipe" : "thermal:rf_coil"
        }).addMaterialInfo()

        event.recipes.gtceu.shaped(asBoiler ? "systeams:magmatic_boiler" : "thermal:dynamo_magmatic", [
            " A ",
            "BCB",
            "DED"
        ], {
            A: "kubejs:excitationcoil",
            B: "gtceu:dark_steel_plate",
            C: "ironfurnaces:copper_furnace",
            D: "enderio:dark_bimetal_gear",
            E: asBoiler ? "systeams:boiler_pipe" : "thermal:rf_coil"
        }).addMaterialInfo()

        event.recipes.gtceu.shaped(asBoiler ? "systeams:compression_boiler" : "thermal:dynamo_compression", [
            " A ",
            "BCB",
            "DED"
        ], {
            A: "kubejs:excitationcoil",
            B: "gtceu:energetic_alloy_plate",
            C: "ironfurnaces:gold_furnace",
            D: "enderio:energized_gear",
            E: asBoiler ? "systeams:boiler_pipe" : "thermal:rf_coil"
        }).addMaterialInfo()

        event.recipes.gtceu.shaped(asBoiler ? "systeams:gourmand_boiler" : "thermal:dynamo_gourmand", [
            " A ",
            "BCB",
            "DED"
        ], {
            A: "kubejs:excitationcoil",
            B: "gtceu:blue_alloy_plate",
            C: "ironfurnaces:silver_furnace",
            D: "enderio:iron_gear",
            E: asBoiler ? "systeams:boiler_pipe" : "thermal:rf_coil"
        }).addMaterialInfo()

        // Numis can have different recipes
        if(doHarderRecipes) {
            event.recipes.gtceu.shaped(asBoiler ? "systeams:numismatic_boiler" : "thermal:dynamo_numismatic", [
                " A ",
                "BCB",
                "DED"
            ], {
                A: "kubejs:excitationcoil",
                B: "gtceu:zeron_100_plate",
                C: "ironfurnaces:diamond_furnace",
                D: "enderio:vibrant_gear",
                E: asBoiler ? "systeams:boiler_pipe" : "thermal:rf_coil"
            }).addMaterialInfo()
        } else {
            event.recipes.gtceu.shaped(asBoiler ? "systeams:numismatic_boiler" : "thermal:dynamo_numismatic", [
                " A ",
                "BCB",
                "DED"
            ], {
                A: "kubejs:excitationcoil",
                B: "gtceu:vibrant_alloy_plate",
                C: "ironfurnaces:diamond_furnace",
                D: "enderio:vibrant_gear",
                E: asBoiler ? "systeams:boiler_pipe" : "thermal:rf_coil"
            }).addMaterialInfo()
        }
    }
    /*
    I had concluded that defining & calling a function
    would be the best way to adhere to the DRY principle.
    */
    defineDynamoRecipes(false)
    if(doBoilers) defineDynamoRecipes(true)

    // Machines
    event.remove({ id: "thermal:machine_frame" })
    event.recipes.gtceu.shaped("thermal:machine_frame", [
        "SSS",
        "SMS",
        "III"
    ], {
        M: "#forge:gears/aluminium",
        S: "#forge:plates/iron",
        I: "#forge:ingots/invar"
    }).addMaterialInfo()

    event.remove({ id: "thermal:machine_press" })
    event.recipes.gtceu.shaped("thermal:machine_press", [
        " A ",
        "BCB",
        "DED"
    ], {
        A: "minecraft:piston",
        B: "#forge:ingots/cupronickel",
        C: "thermal:machine_frame",
        D: "#forge:gears/bronze",
        E: "thermal:rf_coil"
    }).id("kubejs:machine_press").addMaterialInfo();

    // energetic infuser
    event.remove({ id: "thermal:charge_bench" });
    event.recipes.gtceu.shaped("thermal:charge_bench", [
        "AAA",
        "BCB",
        "DED"
    ], {
        A: "#forge:ingots/electrum",
        B: "kubejs:redstone_transmission_coil",
        C: "thermal:machine_frame",
        D: "#forge:rubber_plates",
        E: "thermal:rf_coil"
    }).id("kubejs:charge_bench").addMaterialInfo()

    // Phytogenic Insolator
    event.remove({ id: "thermal:machine_insolator" })
    event.recipes.gtceu.shaped("thermal:machine_insolator", [
        " A ",
        "SBS",
        "CRC"
    ], {
        A: "gtceu:double_steel_plate",
        B: "minecraft:bucket",
        S: "#minecraft:saplings",
        R: "thermal:rf_coil",
        C: "#forge:gears/copper"
    }).id("thermal:machine_insolator").addMaterialInfo()

    // Energy Cell
    event.recipes.remove({ id: "thermal:energy_cell_frame" })
    event.recipes.gtceu.shaped("thermal:energy_cell_frame", [
        "ABA",
        "BCB",
        "ABA"
    ], {
        A: "#forge:ingots/lead",
        B: "#forge:plates/electrum",
        C: "enderio:vibrant_crystal"
    }).id("thermal:energy_cell_frame").addMaterialInfo()

    event.remove("thermal:energy_cell");
    event.recipes.gtceu.shaped("thermal:energy_cell", [
        "RBR",
        "IFO",
        "RCR"
    ], {
        R: "#forge:rubber_plates",
        B: "#forge:storage_blocks/redstone",
        F: "thermal:energy_cell_frame",
        C: "#gtceu:circuits/ulv",
        I: "thermal:rf_coil",
        O: "kubejs:redstone_transmission_coil"
    }).addMaterialInfo()

    // Diamond as Fuel
    event.recipes.thermal.numismatic_fuel("minecraft:diamond").energy(1200000)
    event.recipes.thermal.numismatic_fuel("gtceu:topaz_gem").energy(200000)
    event.recipes.thermal.numismatic_fuel("gtceu:malachite_gem").energy(200000)
    event.recipes.thermal.numismatic_fuel("minecraft:emerald").energy(200000)
    event.recipes.thermal.numismatic_fuel("minecraft:prismarine_shard").energy(150000)
    event.recipes.thermal.numismatic_fuel("minecraft:quartz").energy(40000)
    event.recipes.thermal.numismatic_fuel("gtceu:sapphire_gem").energy(200000)
    event.recipes.thermal.numismatic_fuel("gtceu:ruby_gem").energy(200000)
    event.recipes.thermal.numismatic_fuel("gtceu:apatite_gem").energy(40000)
    event.recipes.thermal.numismatic_fuel("redstone_arsenal:flux_gem").energy(1500000)
    event.recipes.thermal.numismatic_fuel("minecraft:lapis_lazuli").energy(80000)

    // Thermal Essences
    event.recipes.gtceu.chemical_reactor("elemental_reduction_fluid")
        .itemInputs("kubejs:pulsating_dust")
        .inputFluids(Fluid.of("gtceu:hydrofluoric_acid", 1000))
        .outputFluids("gtceu:elemental_reduction_fluid 1000")
        .duration(80)
        .EUt(90)

    const elemental_essences = [
        {name: "blaze", namespace: "minecraft", power_powder: "pyrotheum", reduction_source: "netherrack", aux: "#forge:dusts/sulfur"},
        {name: "basalz", namespace: "thermal", power_powder: "petrotheum", reduction_source: "coal", aux: "#forge:dusts/obsidian"},
        {name: "blizz", namespace: "thermal", power_powder: "cryotheum", reduction_source: "ice", aux: "minecraft:snowball"},
        {name: "blitz", namespace: "thermal", power_powder: "aerotheum", reduction_source: "endstone", aux: "#forge:dusts/saltpeter"}
    ]

    elemental_essences.forEach(essence_type => {
        // Elemental reduction recipe
        event.recipes.gtceu.chemical_reactor(`elemental_reduction_${essence_type.name}`)
            .itemInputs(`#forge:dusts/${essence_type.reduction_source}`)
            .inputFluids(Fluid.of("gtceu:elemental_reduction_fluid", 100))
            .itemOutputs(`${essence_type.namespace}:${essence_type.name}_powder`)
            .duration(80)
            .EUt(90)

        // Combine into -theum dusts
        event.shaped(`2x kubejs:${essence_type.power_powder}_dust`, [
            "AA ",
            "BC ",
            "   "
        ], {
            A: `${essence_type.namespace}:${essence_type.name}_powder`,
            B: "minecraft:redstone",
            C: essence_type.aux
        }).noMirror().noShrink()

        event.recipes.gtceu.mixer(`mixer_${essence_type.power_powder}`)
            .itemInputs(`2x ${essence_type.namespace}:${essence_type.name}_powder`, "#forge:dusts/redstone", essence_type.aux)
            .itemOutputs(`2x kubejs:${essence_type.power_powder}_dust`)
            .duration(40)
            .EUt(20)

        // To and from Rod form (Mostly for HM Nether Star recipe)
        event.recipes.gtceu.macerator(`macerate_${essence_type.name}_rod`)
            .itemInputs(`${essence_type.namespace}:${essence_type.name}_rod`)
            .itemOutputs(`4x ${essence_type.namespace}:${essence_type.name}_powder`)
            .duration(4.4 * 20)
            .EUt(2)
            .category("gtceu:macerator_recycling");
        event.recipes.gtceu.compressor(`${essence_type.name}_rod`)
            .itemInputs(`4x ${essence_type.namespace}:${essence_type.name}_powder`)
            .itemOutputs(`${essence_type.namespace}:${essence_type.name}_rod`)
            .duration(200)
            .EUt(2)
    })

    // Primal Mana
    event.shaped("4x kubejs:primal_mana", [
        "AAB",
        "DEB",
        "DCC"
    ], {
        A: "kubejs:aerotheum_dust",
        B: "kubejs:pyrotheum_dust",
        C: "kubejs:petrotheum_dust",
        D: "kubejs:cryotheum_dust",
        E: "gtceu:diamond_dust"
    })
    event.recipes.gtceu.mixer("mixer_primal_mana")
        .itemInputs("2x kubejs:petrotheum_dust", "2x kubejs:pyrotheum_dust", "2x kubejs:aerotheum_dust", "2x kubejs:cryotheum_dust", "1x gtceu:diamond_dust")
        .itemOutputs("4x kubejs:primal_mana")
        .duration(100)
        .EUt(100)

    // Clathrates
    event.recipes.gtceu.chemical_reactor("resonant_clathrate")
        .itemInputs("minecraft:quartz")
        .inputFluids(Fluid.of("thermal:ender", 250))
        .itemOutputs("kubejs:resonant_clathrate")
        .duration(120)
        .EUt(75)

    event.recipes.gtceu.chemical_reactor("energized_clathrate")
        .itemInputs("minecraft:quartz")
        .inputFluids(Fluid.of("gtceu:glowstone", 288))
        .itemOutputs("kubejs:energized_clathrate")
        .duration(120)
        .EUt(75)

    event.recipes.gtceu.chemical_reactor("destabilized_clathrate")
        .itemInputs("minecraft:quartz")
        .inputFluids(Fluid.of("gtceu:redstone", 288))
        .itemOutputs("kubejs:destabilized_clathrate")
        .duration(120)
        .EUt(75)

    // Devices
    // Extractor, Fisher, and Composter have recipes unaffected thanks to Item Tags allowing for the use of GT gears

    event.remove({ id: "thermal:device_water_gen" })
    event.recipes.gtceu.shaped("thermal:device_water_gen", [
        " B ",
        "CWC",
        "GSG"
    ], {
        G: "#forge:gears/iron",
        B: "minecraft:bucket",
        W: "#enderio:fused_quartz",
        S: "thermal:redstone_servo",
        C: "#forge:ingots/copper"
    }).id("kubejs:device_water_gen").addMaterialInfo();

    event.remove({ id: "thermal:device_rock_gen" })
    event.recipes.gtceu.shaped("thermal:device_rock_gen", [
        " P ",
        "INI",
        "GSG"
    ], {
        G: "#forge:gears/iron",
        S: "thermal:redstone_servo",
        P: "#forge:plates/steel",
        I: "#forge:plates/invar",
        N: "#forge:pistons"
    }).id("kubejs:device_rock_gen").addMaterialInfo();

    event.remove({ id: "thermal:device_collector" });
    event.recipes.gtceu.shaped("thermal:device_collector", [
        " A ",
        "BCB",
        "DED"
    ], {
        A: "minecraft:hopper",
        B: "#forge:ingots/tin",
        C: "#forge:gems/ender_pearl",
        D: "#forge:gears/iron",
        E: "thermal:redstone_servo"
    }).id("kubejs:device_collector").addMaterialInfo();

    event.remove({ id: "thermal:device_nullifier" });
    event.recipes.gtceu.shaped("thermal:device_nullifier", [
        " A ",
        "BCB",
        "DED"
    ], {
        A: "#forge:double_plates/lead",
        B: "#chipped:bricks",
        C: "minecraft:lava_bucket",
        D: "#forge:gears/iron",
        E: "thermal:redstone_servo"
    }).id("kubejs:device_nullifier").addMaterialInfo();

    event.recipes.gtceu.shaped("thermal:device_potion_diffuser", [
        " A ",
        "BCB",
        "DED"
    ], {
        A: "enderio:fused_quartz",
        B: "#forge:ingots/silver",
        C: "#forge:springs/cupronickel",
        D: "#forge:gears/iron",
        E: "thermal:redstone_servo"
    }).id("thermal:device_potion_diffuser").addMaterialInfo()

    /* === THERMAL TOOLS ===*/
    event.remove({ id: "thermal:tools/wrench" })
    event.shaped("thermal:wrench", [
        "A A",
        " B ",
        " A "
    ], {
        A: "#forge:ingots/iron",
        B: "#forge:ingots/tin"
    }).id("kubejs:tools/wrench");

    // detonator, locked to mv
    event.remove({ id: "thermal:tools/detonator" })
    event.recipes.gtceu.shaped("thermal:detonator", [
        " R ",
        "NCN",
        "NNN"
    ], {
        R: "#forge:rods/silver",
        N: "#forge:nuggets/iron",
        C: "#gtceu:circuits/mv"
    }).id("kubejs:tools/detonator").addMaterialInfo();

    // Fluxbore and Fluxsaw
    event.remove([{ id: "thermal:drill_head" }, { id: "thermal:flux_drill" }])
    if (doFluxbore) {
        if (doHarderFluxBore) {
            event.shaped("thermal:flux_drill", [
                " A ",
                "BCB",
                "DED"
            ], {
                A: "gtceu:stainless_steel_drill_head",
                B: "#forge:ingots/silver",
                C: "gtceu:lv_power_unit",
                D: "#forge:ingots/tin",
                E: "#forge:gears/iron"
            }).id("kubejs:flux_drill");
        } else {
            event.shaped("thermal:flux_drill", [
                " A ",
                "BCB",
                "DED"
            ], {
                A: "gtceu:vanadium_steel_drill_head",
                B: "#forge:ingots/silver",
                C: "gtceu:lv_power_unit",
                D: "#forge:ingots/tin",
                E: "#forge:gears/iron"
            }).id("kubejs:flux_drill");
        }
    }

    event.remove([{ id: "thermal:saw_blade" }, { id: "thermal:flux_saw" }])
    event.shaped("thermal:flux_saw", [
        " A ",
        "BCB",
        "DED"
    ], {
        A: "gtceu:vanadium_steel_buzz_saw_blade",
        B: "#forge:ingots/silver",
        C: "gtceu:lv_power_unit",
        D: "#forge:ingots/tin",
        E: "#forge:gears/iron"
    }).id("kubejs:flux_saw");

    event.remove({ id: "thermal:flux_capacitor" });
    event.recipes.gtceu.shaped("thermal:flux_capacitor", [
        "ADA",
        "BCB",
        " A "
    ], {
        A: "#forge:dusts/redstone",
        B: "#forge:ingots/lead",
        C: "#forge:ingots/copper",
        D: "#forge:dusts/sulfur"
    }).id("kubejs:flux_capacitor");

    event.remove({ id: "thermal:tools/lock" });
    event.recipes.gtceu.shaped("thermal:lock", [
        " A ",
        "ABA",
        "AAA"
    ], {
        A: "#forge:nuggets/iron",
        B: "#forge:nuggets/signalum"
    }).addMaterialInfo();

    /* === misc thermals ===*/
    event.remove({ output: "thermal:phytogro" });
    event.shapeless("16x thermal:phytogro", [
        "2x #forge:dusts/wood",
        "#forge:dusts/charcoal",
        "#forge:dusts/saltpeter",
        "2x #forge:gems/apatite" // ok idk HOW thermal manages to make tag recipe requirement AND regular item
    ]).id("kubejs:phytogro_charcoal_gems_apatite");
    event.shapeless("16x thermal:phytogro", [
        "2x #forge:dusts/wood",
        "#forge:dusts/charcoal",
        "#forge:dusts/saltpeter",
        "2x #forge:dusts/apatite"
    ]).id("kubejs:phytogro_charcoal_dusts_apatite");
    event.shapeless("16x thermal:phytogro", [
        "2x #forge:dusts/wood",
        "#forge:dusts/coal",
        "#forge:dusts/saltpeter",
        "2x #forge:gems/apatite"
    ]).id("kubejs:phytogro_coal_gems_apatite");
    event.shapeless("16x thermal:phytogro", [
        "2x #forge:dusts/wood",
        "#forge:dusts/coal",
        "#forge:dusts/saltpeter",
        "2x #forge:dusts/apatite"
    ]).id("kubejs:phytogro_coal_dusts_apatite");

    // Change Aqua Chow recipes to use Flour instead of raw Wheat
    event.replaceInput([{ id: "thermal:aquachow_4"}, {id: "thermal:deep_aquachow_4" }], "minecraft:wheat", "#forge:dusts/wheat")

    // More recipes for Igneous Extruder
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": "minecraft:water",
        "below": "minecraft:andesite",
        "result": {
            "item": "minecraft:andesite"
        }
    })
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": "minecraft:water",
        "below": "minecraft:calcite",
        "result": {
            "item": "minecraft:calcite"
        }
    })
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": "minecraft:water",
        "below": "minecraft:diorite",
        "result": {
            "item": "minecraft:diorite"
        }
    })
    event.custom({
        "type": "thermal:rock_gen",
        "adjacent": "minecraft:water",
        "below": "minecraft:granite",
        "result": {
            "item": "minecraft:granite"
        }
    })

    // Rockwool as IRL Mineral Wool
    event.remove({ output: "thermal:white_rockwool"})
    event.recipes.gtceu.alloy_smelter("aluminosilicate_rockwool_from_sapphire")
        .itemInputs("gtceu:sapphire_dust", "gtceu:silicon_dioxide_dust")
        .itemOutputs("3x thermal:white_rockwool")
        .duration(8 * 20)
        .EUt(GTValues.VA[GTValues.LV])
    event.recipes.gtceu.alloy_smelter("aluminosilicate_rockwool_from_green_sapphire")
        .itemInputs("gtceu:green_sapphire_dust", "gtceu:silicon_dioxide_dust")
        .itemOutputs("3x thermal:white_rockwool")
        .duration(8 * 20)
        .EUt(GTValues.VA[GTValues.LV])
    event.recipes.gtceu.alloy_smelter("slag_rockwool_from_slag")
        .itemInputs("thermal:slag", "gtceu:basalt_dust")
        .itemOutputs("4x thermal:white_rockwool")
        .duration(8 * 20)
        .EUt(GTValues.VA[GTValues.LV])
    event.recipes.gtceu.alloy_smelter("dolomite_rockwool_from_marble")
        .itemInputs("gtceu:marble_dust", "gtceu:basalt_dust")
        .itemOutputs("4x thermal:white_rockwool")
        .duration(8 * 20)
        .EUt(GTValues.VA[GTValues.LV])
    event.recipes.gtceu.centrifuge("rockwool_from_asbestos")
        .itemInputs("gtceu:asbestos_dust")
        .itemOutputs("5x thermal:white_rockwool")
        .duration(6 * 20)
        .EUt(GTValues.VA[GTValues.LV])
});
