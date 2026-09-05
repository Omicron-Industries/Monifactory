/**
 * Custom recipes for the LaserIO mod
 */

ServerEvents.recipes(event => {
    // Disable LIO transportation in Expert (Cards are used in recipes)
    if (!doLaserIO) {
        event.remove({ id: /laserio:laser_/ })
        event.remove({ id: /laserio:card_/ })
    }

    // Harder recipes in Hard Mode
    const cardChip = doHarderRecipes ? "#gtceu:circuits/lv" : "#gtceu:circuits/ulv"

    // Replace Logic chips with circuits.
    event.remove({ output: ["laserio:logic_chip_raw", "laserio:logic_chip"] })
    event.replaceInput({ mod: "laserio", not: [{ id: "laserio:card_item" }, { id: "laserio:card_fluid" }, { id: "laserio:card_energy" }, { id: "laserio:card_redstone" }] }, "laserio:logic_chip", cardChip)

    const Cards = [
        ["item", "gtceu:pulsating_alloy_plate"],
        ["fluid", "gtceu:lazurite_plate"],
        ["energy", "gtceu:gold_plate"],
        ["redstone", "gtceu:red_alloy_plate"]
    ]

    if (doLaserIO) {
        // Cards
        Cards.forEach(card => {
            event.shaped(`laserio:card_${card[0]}`, [
                "TNT",
                "TCT",
                "GGG"
            ], {
                N: card[1],
                C: cardChip,
                G: "minecraft:gold_nugget",
                T: "gtceu:tin_plate"
            }).id(`laserio:card_${card[0]}`)

            // temporarily removed because LaserIO cards can't stack
            /*
            event.recipes.gtceu.assembler(`laserio:card_${card[0]}`)
                .itemInputs(card[1], cardChip, "3x gtceu:tin_plate", "6x minecraft:gold_nugget")
                .itemOutputs(`2x laserio:card_${card[0]}`)
                .duration(80)
                .EUt(GTValues.VHA[GTValues.LV])
            */
        })

        // Overclockers
        event.remove({ output: ["laserio:overclocker_card", "laserio:overclocker_node"] })
        event.shaped("laserio:overclocker_card", [
            "E",
            "P",
            "A"
        ], {
            E: "#forge:double_plates/electrical_steel",
            P: "#forge:plates/electrum",
            A: "ae2:basic_card"
        })
        event.shaped("laserio:overclocker_node", [
            "E",
            "P",
            "A"
        ], {
            E: "#forge:double_plates/electrical_steel",
            P: "enderio:pulsating_crystal",
            A: "ae2:advanced_card"
        })

        // Laser Connectors
        event.recipes.gtceu.shaped("4x laserio:laser_connector", [
            " E ",
            "RRR",
            "SSS"
        ], {
            S: "gtceu:steel_plate",
            E: "gtceu:glass_tube",
            R: "gtceu:red_alloy_plate"
        }).id("laserio:laser_connector")
            .addMaterialInfo()

        event.recipes.gtceu.shaped("laserio:laser_node", [
            "PGP",
            "GRG",
            "PGP"
        ], {
            P: "gtceu:steel_plate",
            G: "#forge:glass_panes/colorless",
            R: "laserio:laser_connector"
        }).id("laserio:laser_node")
            .addMaterialInfo()

        event.recipes.gtceu.shaped("2x laserio:laser_connector_advanced", [
            " E ",
            "RCR",
            "FFF"
        ], {
            F: "gtceu:electrum_flux_plate",
            E: "gtceu:iv_emitter",
            C: "#gtceu:circuits/luv",
            R: "gtceu:red_alloy_plate"
        }).id("laserio:laser_connector_advanced")
            .addMaterialInfo()
    }


    // Energy Overclockers  //

    // Conductive Iron
    event.shaped("3x laserio:energy_overclocker_card_tier_1", [
        "AAA",
        "BBB",
        "AAA"
    ], {
        A: "gtceu:conductive_alloy_single_wire",
        B: "gtceu:iron_plate"
    }).id("kubejs:conductive_card")

    event.recipes.gtceu.assembler("kubejs:conductive_card")
        .itemInputs("6x gtceu:conductive_alloy_single_wire", "3x gtceu:iron_plate")
        .itemOutputs("4x laserio:energy_overclocker_card_tier_1")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])

    // Energetic Alloy
    event.shaped("3x laserio:energy_overclocker_card_tier_2", [
        "AAA",
        "BCB",
        "AAA"
    ], {
        A: "gtceu:energetic_alloy_single_wire",
        B: "gtceu:iron_plate",
        C: "laserio:energy_overclocker_card_tier_1"
    }).id("kubejs:energetic_card")

    event.recipes.gtceu.assembler("kubejs:energetic_card")
        .itemInputs("6x gtceu:energetic_alloy_single_wire", "laserio:energy_overclocker_card_tier_1", "2x gtceu:iron_plate")
        .itemOutputs("4x laserio:energy_overclocker_card_tier_2")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])

    // Vibrant Alloy
    event.shaped("3x laserio:energy_overclocker_card_tier_3", [
        "AAA",
        "BCB",
        "AAA"
    ], {
        A: "gtceu:vibrant_alloy_single_wire",
        B: "gtceu:iron_plate",
        C: "laserio:energy_overclocker_card_tier_2"
    }).id("kubejs:vibrant_card")

    event.recipes.gtceu.assembler("kubejs:vibrant_card")
        .itemInputs("6x gtceu:vibrant_alloy_single_wire", "laserio:energy_overclocker_card_tier_2", "2x gtceu:iron_plate")
        .itemOutputs("4x laserio:energy_overclocker_card_tier_3")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])

    // Endsteel
    event.shaped("3x laserio:energy_overclocker_card_tier_4", [
        "AAA",
        "BCB",
        "AAA"
    ], {
        A: "gtceu:end_steel_single_wire",
        B: "gtceu:iron_plate",
        C: "laserio:energy_overclocker_card_tier_3"
    }).id("kubejs:endsteel_card")

    event.recipes.gtceu.assembler("kubejs:endsteel_card")
        .itemInputs("6x gtceu:end_steel_single_wire", "laserio:energy_overclocker_card_tier_3", "2x gtceu:iron_plate")
        .itemOutputs("4x laserio:energy_overclocker_card_tier_4")
        .duration(80)
        .EUt(GTValues.VHA[GTValues.LV])
})
