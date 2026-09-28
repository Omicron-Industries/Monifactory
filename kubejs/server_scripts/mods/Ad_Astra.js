/**
 * Custom recipes for Ad Astra
 */
ServerEvents.recipes(event => {
    // Replace all Steel plates & rods
    event.replaceInput({ id: /^ad_astra:.*/ }, "ad_astra:steel_rod", "gtceu:steel_rod")
    event.replaceInput({ id: /^ad_astra:.*/ }, "ad_astra:steel_plate", "gtceu:steel_plate")


    // Space Suit
    event.shaped("4x kubejs:thermal_cloth", [
        "SSS",
        "SSS",
        "SSS"
    ], {
        S: "minecraft:string"
    })

    event.shaped("kubejs:unprepared_space_helmet", [
        "TTT",
        "T T",
        "   "
    ], {
        T: "kubejs:thermal_cloth"
    })

    event.shaped("kubejs:unprepared_space_suit", [
        "T T",
        "TTT",
        "TTT"
    ], {
        T: "kubejs:thermal_cloth"
    })

    event.shaped("kubejs:unprepared_space_pants", [
        "TTT",
        "T T",
        "T T"
    ], {
        T: "kubejs:thermal_cloth"
    })

    event.shaped("kubejs:unprepared_space_boots", [
        "   ",
        "T T",
        "T T"
    ], {
        T: "kubejs:thermal_cloth"
    })

    event.shaped("kubejs:pressure_layer", [
        "CPC",
        "CPC",
        "CPC"
    ], {
        C: "kubejs:thermal_cloth",
        P: "gtceu:black_steel_plate"
    })

    event.shaped("kubejs:radiation_layer", [
        "CPC",
        "CPC",
        "CPC"
    ], {
        C: "kubejs:thermal_cloth",
        P: "gtceu:lead_plate"
    })

    const spacesuit = ["pants", "boots"]

    // Space Suit
    event.remove({ id: "ad_astra:space_helmet" })
    event.recipes.gtceu.assembler("space_helmet")
        .itemInputs("kubejs:unprepared_space_helmet", "#forge:double_plates/steel", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer", "#gtceu:circuits/lv", "#forge:glass")
        .itemOutputs("ad_astra:space_helmet")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LV])
        .addMaterialInfo(true)

    event.remove({ id: "ad_astra:space_suit" })
    event.recipes.gtceu.assembler("space_suit")
        .itemInputs("kubejs:unprepared_space_suit", "#forge:double_plates/steel", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer", "ad_astra:oxygen_gear", "2x ad_astra:gas_tank")
        .itemOutputs("ad_astra:space_suit")
        .duration(300)
        .EUt(GTValues.VA[GTValues.LV])
        .addMaterialInfo(true)

    spacesuit.forEach(part => {
        event.remove({ id: `ad_astra:space_${part}` })
        event.recipes.gtceu.assembler(`space_${part}`)
            .itemInputs(`kubejs:unprepared_space_${part}`, "#forge:double_plates/steel", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer")
            .itemOutputs(`ad_astra:space_${part}`)
            .duration(300)
            .EUt(GTValues.VA[GTValues.LV])
            .addMaterialInfo(true)
    })

    // Netherite space suit
    event.remove({ id: "ad_astra:netherite_space_helmet" })
    event.recipes.gtceu.assembler("netherite_space_helmet")
        .itemInputs("kubejs:unprepared_space_helmet", "minecraft:netherite_ingot", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer", "#gtceu:circuits/hv", "#forge:glass/tinted", "#forge:foils/gold")
        .itemOutputs("ad_astra:netherite_space_helmet")
        .duration(400)
        .EUt(GTValues.VA[GTValues.MV])
        .addMaterialInfo(true)

    event.remove({ id: "ad_astra:netherite_space_suit" })
    event.recipes.gtceu.assembler("netherite_space_suit")
        .itemInputs("kubejs:unprepared_space_suit", "minecraft:netherite_ingot", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer", "ad_astra:oxygen_gear", "2x ad_astra:large_gas_tank")
        .itemOutputs("ad_astra:netherite_space_suit")
        .duration(400)
        .EUt(GTValues.VA[GTValues.MV])
        .addMaterialInfo(true)

    spacesuit.forEach(part => {
        event.remove({ id: `ad_astra:netherite_space_${part}` })
        event.recipes.gtceu.assembler(`netherite_space_${part}`)
            .itemInputs(`kubejs:unprepared_space_${part}`, "minecraft:netherite_ingot", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer")
            .itemOutputs(`ad_astra:netherite_space_${part}`)
            .duration(400)
            .EUt(GTValues.VA[GTValues.MV])
            .addMaterialInfo(true)
    })

    // Jet Suit
    event.remove({ id: "ad_astra:jet_suit_helmet" })
    event.recipes.gtceu.assembler("jet_suit_helmet")
        .itemInputs("ad_astra:netherite_space_helmet", "4x gtceu:titanium_carbide_plate", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer", "#gtceu:circuits/iv")
        .itemOutputs("ad_astra:jet_suit_helmet")
        .duration(400)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    event.remove({ id: "ad_astra:jet_suit" })
    event.recipes.gtceu.assembler("jet_suit")
        .itemInputs("ad_astra:netherite_space_suit", "4x gtceu:titanium_carbide_plate", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer", "ad_astra:oxygen_gear", "2x ad_astra:large_gas_tank", "2x kubejs:vibrant_thruster")
        .itemOutputs("ad_astra:jet_suit")
        .duration(400)
        .EUt(GTValues.VA[GTValues.EV])
        .addMaterialInfo(true)

    spacesuit.forEach(part => {
        event.remove({ id: `ad_astra:jet_suit_${part}` })
        event.recipes.gtceu.assembler(`jet_suit_${part}`)
            .itemInputs(`ad_astra:netherite_space_${part}`, "4x gtceu:titanium_carbide_plate", "2x kubejs:pressure_layer", "2x kubejs:radiation_layer")
            .itemOutputs(`ad_astra:jet_suit_${part}`)
            .duration(400)
            .EUt(GTValues.VA[GTValues.EV])
            .addMaterialInfo(true)
    })


    // Nasa Work Bench
    event.recipes.extendedcrafting.shaped_table("ad_astra:nasa_workbench", [
        "RPEPR",
        "PXCXP",
        "PCACP",
        "PXCXP",
        "RPEPR"
    ], {
        P: "gtceu:double_steel_plate",
        R: "gtceu:hv_robot_arm",
        X: "gtceu:hv_machine_casing",
        A: "gtceu:mv_assembler",
        E: "gtceu:hv_emitter",
        C: "#gtceu:circuits/hv"
    }).id("ad_astra:nasa_workbench")

    // Oxygen Gear
    event.remove({ output: "ad_astra:oxygen_gear" })
    event.recipes.gtceu.shaped("ad_astra:oxygen_gear", [
        " R ",
        "PCP",
        "F F"
    ], {
        R: "kubejs:resonating_crystal",
        P: "gtceu:lv_electric_pump",
        C: "#gtceu:circuits/lv",
        F: "gtceu:steel_fluid_cell"
    })
        .addMaterialInfo()

    // Engines and Tanks
    event.remove({ output: /ad_astra:.*_engine/ })
    event.remove({ output: /ad_astra:.*_tank/ })
    event.recipes.gtceu.shaped("ad_astra:steel_engine", [
        " P ",
        "PPP",
        "TTT"
    ], {
        P: "gtceu:double_black_steel_plate",
        T: "kubejs:electrical_steel_thruster"
    })
        .addMaterialInfo()

    event.recipes.gtceu.shaped("ad_astra:steel_tank", [
        "PTP",
        "PTP",
        "PTP"
    ], {
        P: "gtceu:double_black_steel_plate",
        T: "enderio:fluid_tank"
    })
        .addMaterialInfo()

    event.recipes.gtceu.shaped("ad_astra:desh_engine", [
        " P ",
        "PPP",
        "TTT"
    ], {
        P: "gtceu:double_signalum_plate",
        T: "kubejs:energetic_thruster"
    })
        .addMaterialInfo()

    event.recipes.gtceu.shaped("ad_astra:desh_tank", [
        "PTP",
        "PTP",
        "PTP"
    ], {
        P: "gtceu:double_signalum_plate",
        T: "enderio:fluid_tank"
    })
        .addMaterialInfo()


    event.recipes.gtceu.shaped("ad_astra:ostrum_engine", [
        " P ",
        "PPP",
        "TTT"
    ], {
        P: "gtceu:double_hsss_plate",
        T: "kubejs:vibrant_thruster"
    })
        .addMaterialInfo()

    event.recipes.gtceu.shaped("ad_astra:ostrum_tank", [
        "PTP",
        "PTP",
        "PTP"
    ], {
        P: "gtceu:double_hsss_plate",
        T: "enderio:fluid_tank"
    })
        .addMaterialInfo()

    event.recipes.gtceu.shaped("ad_astra:calorite_engine", [
        " P ",
        "PPP",
        "TTT"
    ], {
        P: "gtceu:double_cryolobus_plate",
        T: "kubejs:dark_soularium_thruster"
    })
        .addMaterialInfo()

    event.recipes.gtceu.shaped("ad_astra:calorite_tank", [
        "PTP",
        "PTP",
        "PTP"
    ], {
        P: "gtceu:double_cryolobus_plate",
        T: "enderio:fluid_tank"
    })
        .addMaterialInfo()

    event.recipes.gtceu.assembler("ad_astra/gas_tank")
        .itemInputs("gtceu:fluid_cell", "4x gtceu:iron_plate")
        .itemOutputs("ad_astra:gas_tank")
        .duration(100)
        .EUt(32)
        .addMaterialInfo(true)
    event.recipes.gtceu.assembler("ad_astra/large_gas_tank")
        .itemInputs("3x gtceu:fluid_cell", "12x gtceu:steel_plate")
        .itemOutputs("ad_astra:large_gas_tank")
        .duration(100)
        .EUt(32)
        .addMaterialInfo(true)


    // Launch Pad
    event.remove({ id: "ad_astra:launch_pad" })
    event.recipes.gtceu.assembler("ad_astra:launch_pad")
        .itemInputs("9x gtceu:dense_steel_plate", "27x gtceu:concrete_dust")
        .itemOutputs("ad_astra:launch_pad")
        .duration(300)
        .EUt(30)
        .addMaterialInfo(true)

    // Oxygen Loading
    event.custom('{"type": "ad_astra:oxygen_loading","cookingtime": 1,"energy": 30,"input": {"ingredient": {"tag": "forge:oxygen"},"millibuckets": 25},"result": {"fluid": "gtceu:oxygen","millibuckets": 25}}');
    event.remove({ id: /oxygen_from_oxygen_loading/ })

    event.remove({ id: "ad_astra:oxygen_distributor" })
    event.recipes.gtceu.shaped("ad_astra:oxygen_distributor", [
        "BRB",
        "PHP",
        "BCB"
    ], {
        R: "gtceu:steel_rotor",
        H: "gtceu:hv_machine_hull",
        P: "gtceu:hv_electric_pump",
        B: "minecraft:iron_bars",
        C: "#gtceu:circuits/hv"
    }).addMaterialInfo()

    event.remove({ id: "ad_astra:oxygen_loader" })
    event.recipes.gtceu.shaped("ad_astra:oxygen_loader", [
        "BCB",
        "PHP",
        "BRB"
    ], {
        R: "gtceu:steel_rotor",
        H: "gtceu:lv_machine_hull",
        P: "gtceu:lv_electric_pump",
        B: "minecraft:iron_bars",
        C: "#gtceu:circuits/lv"
    }).addMaterialInfo()

    event.remove({ id: "ad_astra:gravity_normalizer" })
    event.recipes.gtceu.shaped("ad_astra:gravity_normalizer", [
        "BEB",
        "CHC",
        "BBB"
    ], {
        E: "gtceu:ev_emitter",
        H: "gtceu:ev_machine_hull",
        B: "gtceu:titanium_plate",
        C: "#gtceu:circuits/ev"
    }).addMaterialInfo()

    event.remove({ id: "ad_astra:oxygen_sensor" })
    event.recipes.gtceu.shaped("ad_astra:oxygen_sensor", [
        "RRR",
        "TOT",
        "RRR"
    ], {
        R: "gtceu:red_alloy_plate",
        T: "gtceu:lv_sensor",
        O: "ad_astra:oxygen_loader"
    }).addMaterialInfo()
    Item.of("ad_astra:tier_1_rover", '{BotariumData:{StoredFluids:[{Amount:0L,Fluid:"minecraft:empty"}]}}')

    event.remove({ id: "ad_astra:tier_1_rover" })
    event.recipes.gtceu.assembler("ad_astra:tier_1_rover")
        .itemInputs(["8x gtceu:steel_plate", "4x ad_astra:wheel", "2x gtceu:lv_electric_motor", "ad_astra:radio", "gtceu:lv_sensor"])
        .itemOutputs("ad_astra:tier_1_rover")
        .duration(600)
        .EUt(32)
        .addMaterialInfo(true)

    const decormaterials = ["iron", "etrium", "steel", "desh", "ostrum", "calorite"]
    decormaterials.forEach(material => {
        event.stonecutting(`ad_astra:${material}_plateblock`, `ad_astra:${material}_panel`)
        event.stonecutting(`ad_astra:encased_${material}_block`, `ad_astra:${material}_panel`)
        event.stonecutting(`ad_astra:${material}_factory_block`, `ad_astra:${material}_panel`)
        if (material != "iron") event.stonecutting(`ad_astra:${material}_block`, `ad_astra:${material}_panel`)
    })

    event.shaped("64x ad_astra:etrium_panel", [
        "PDP",
        "DDD",
        "PDP"
    ], {
        D: "minecraft:diamond",
        P: "gtceu:diamond_plate"
    })

    // Rockets
    event.remove({ id: /nasa_workbench/ })
    const rocket = [ // Plate mats currently just based on color of rocket for testing
        ["tier_1_rocket", "steel", "black_steel"],
        ["tier_2_rocket", "desh", "signalum"],
        ["tier_3_rocket", "ostrum", "hsss"],
        ["tier_4_rocket", "calorite", "cryolobus"],
    ]

    rocket.forEach(([rocket, tier, platematerial]) => {
        event.custom({
            "type": "ad_astra:nasa_workbench",
            "ingredients": [
                {
                    "item": "ad_astra:rocket_nose_cone"
                },
                {
                    "item": `gtceu:double_${platematerial}_plate`
                },
                {
                    "item": `gtceu:double_${platematerial}_plate`
                },
                {
                    "item": `gtceu:double_${platematerial}_plate`
                },
                {
                    "item": `gtceu:double_${platematerial}_plate`
                },
                {
                    "item": `gtceu:double_${platematerial}_plate`
                },
                {
                    "item": `gtceu:double_${platematerial}_plate`
                },
                {
                    "item": "ad_astra:rocket_fin"
                },
                {
                    "item": `ad_astra:${tier}_tank`
                },
                {
                    "item": `ad_astra:${tier}_tank`
                },
                {
                    "item": "ad_astra:rocket_fin"
                },
                {
                    "item": "ad_astra:rocket_fin"
                },
                {
                    "item": `ad_astra:${tier}_engine`
                },
                {
                    "item": "ad_astra:rocket_fin"
                }
            ],
            "result": {
                "count": 1,
                "id": `ad_astra:${rocket}`
            }
        })
    })

    // Space Stations
    event.remove({ id: /space_station/ })
    const spacestations = ["earth", "moon", "mars", "venus", "glacio", "mercury"]
    spacestations.forEach(dim => {
        event.custom({
            "type": "ad_astra:space_station_recipe",
            "dimension": `ad_astra:${dim}_orbit`,
            "ingredients": [
                {
                    "count": 16,
                    "ingredient": {
                        "item": "gtceu:double_titanium_plate"
                    }
                },
                {
                    "count": 8,
                    "ingredient": {
                        "tag": "gtceu:circuits/ev"
                    }
                },
                {
                    "count": 4,
                    "ingredient": {
                        "item": "gtceu:ev_robot_arm"
                    }
                },
                {
                    "count": 2,
                    "ingredient": {
                        "item": "gtceu:ev_emitter"
                    }
                }
            ],
            "structure": "ad_astra:space_station"
        })
    })
})

ServerEvents.tags("fluid", event => {
    // Fuel
    event.add("ad_astra:fuel", "gtceu:rocket_fuel")
    event.add("ad_astra:fuel", "gtceu:jean_gasoline")
    event.add("ad_astra:efficient_fuel", "gtceu:jean_gasoline")
    event.add("ad_astra:efficient_fuel", "ad_astra:fuel")
})

ServerEvents.tags("item", event => {
    const quarkTechArmor = [
        "gtceu:quarktech_helmet",
        "gtceu:quarktech_chestplate",
        "gtceu:advanced_quarktech_chestplate",
        "gtceu:quarktech_leggings",
        "gtceu:quarktech_boots"
    ]
    event.add("ad_astra:space_resistant_armor", quarkTechArmor)
    event.add("ad_astra:freeze_resistant_armor", quarkTechArmor)
    event.add("ad_astra:heat_resistant_armor", quarkTechArmor)

    // Make Ad Astra doors act as cleanroom doors
    event.add("gtceu:cleanroom_doors", /^ad_astra:[\w_]+_door/)

    // Populate empty tag for Thermal Expansion Multiservo Press recipe
    event.add("ad_astra:venus_sandstone", "ad_astra:venus_sandstone")
})

ServerEvents.tags("block", event => {
    // Make Ad Astra doors act as cleanroom doors
    event.add("gtceu:cleanroom_doors", /^ad_astra:[\w_]+_door/)
})

ServerEvents.recipes(event => {
    // Ad Astra Rock Forge Hammers
    function AdAstraForgeHammer(id, input, output, duration, EUt) {
        event.recipes.gtceu.forge_hammer(`kubejs:${id}`)
            .itemInputs(Item.of(input))
            .itemOutputs(output)
            .duration(duration)
            .EUt(EUt)
    }

    AdAstraForgeHammer("mooncobble", "ad_astra:moon_stone", "ad_astra:moon_cobblestone", 12, 4)
    AdAstraForgeHammer("moonsand", "ad_astra:moon_cobblestone", "ad_astra:moon_sand", 10, 16)
    AdAstraForgeHammer("marscobble", "ad_astra:mars_stone", "ad_astra:mars_cobblestone", 12, 4)
    AdAstraForgeHammer("marssand", "ad_astra:mars_cobblestone", "ad_astra:mars_sand", 10, 16)
    AdAstraForgeHammer("venuscobble", "ad_astra:venus_stone", "ad_astra:venus_cobblestone", 12, 4)
    AdAstraForgeHammer("venussand", "ad_astra:venus_cobblestone", "ad_astra:venus_sand", 10, 16)
    AdAstraForgeHammer("mercurycobble", "ad_astra:mercury_stone", "ad_astra:mercury_cobblestone", 12, 4)
    AdAstraForgeHammer("glaciocobble", "ad_astra:glacio_stone", "ad_astra:glacio_cobblestone", 12, 4)
})
