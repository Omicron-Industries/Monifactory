/** THIS FILE IS FOR RANDOM RECIPES THAT DOESNT REQUIRE THEIR OWN FILE */

ServerEvents.recipes(event => {
    const carbonSources = ["gtceu:coal_dust", "gtceu:charcoal_dust", "gtceu:carbon_dust"]
    const gtMachines = ["extractor", "macerator", "compressor", "forge_hammer", "furnace", "alloy_smelter"]
    if (!doSteamAge) {
        // Moni Steel
        event.smelting("gtceu:steel_ingot", "gtceu:steel_dust")
        event.remove({ type: "gtceu:primitive_blast_furnace", output: "gtceu:steel_ingot" })
        event.remove({ type: "gtceu:electric_blast_furnace", output: "gtceu:steel_ingot" })
        event.remove({ id: /fireclay/ })
        event.remove({ output: ["gtceu:firebrick", "gtceu:firebricks", "gtceu:primitive_blast_furnace"] })

        carbonSources.forEach(carbonSource => {
            event.recipes.gtceu.alloy_smelter(`steel_${carbonSource.replace(/\W/g, "")}`) // The replace line removes non alphanumeric chars, regex is magic
                .itemInputs("#forge:ingots/iron", carbonSource)
                .itemOutputs("gtceu:steel_ingot")
                .duration(150)
                .EUt(GTValues.VHA[GTValues.LV])

            event.recipes.gtceu.alloy_smelter(`steel_wrought_${carbonSource.replace(/\W/g, "")}`) // The replace line removes non alphanumeric chars, regex is magic
                .itemInputs("#forge:ingots/wrought_iron", carbonSource)
                .itemOutputs("gtceu:steel_ingot")
                .duration(100)
                .EUt(GTValues.VHA[GTValues.LV])

            event.shapeless("gtceu:steel_dust", ["gtceu:wrought_iron_dust", carbonSource])
        })

        // Wrought iron per ingot
        event.remove({ type: "minecraft:smelting", output: "gtceu:wrought_iron_nugget" })
        event.smelting("gtceu:wrought_iron_ingot", "minecraft:iron_ingot")

        // Normal Mode recipes for Steam multis
        event.remove({ output: "gtceu:steam_oven" })
        event.recipes.gtceu.shaped("gtceu:steam_oven", [
            "BGB",
            "FCF",
            "BGB"
        ], {
            B: "gtceu:steam_machine_casing",
            G: "gtceu:invar_gear",
            F: "gtceu:bronze_firebox_casing",
            C: "ironfurnaces:copper_furnace"
        }).addMaterialInfo()

        event.remove({ output: "gtceu:steam_grinder" })
        event.recipes.gtceu.shaped("gtceu:steam_grinder", [
            "BGB",
            "BDB",
            "BGB"
        ], {
            B: "gtceu:steam_machine_casing",
            G: "gtceu:potin_gear",
            D: "#forge:gems/diamond"
        }).addMaterialInfo()

        event.remove({ output: "steamadditions:steam_foundry" })
        event.recipes.gtceu.shaped("steamadditions:steam_foundry", [
            "BGB",
            "BDB",
            "BGB"
        ], {
            B: "gtceu:steam_machine_casing",
            G: "gtceu:bronze_gear",
            D: "gtceu:lv_alloy_smelter"
        }).addMaterialInfo()

        // Handmade rubber - no match for the power of the factory
        event.shaped("gtceu:rubber_plate", [
            " H ",
            " R ",
            " R "
        ], {
            H: "#forge:tools/hammers",
            R: "gtceu:sticky_resin"
        })

        // Compressor rubber - better, but not perfect - that's chemical reactor rubber
        event.recipes.gtceu.compressor("compressor_rubber_sheet")
            .itemInputs("gtceu:sticky_resin")
            .itemOutputs("gtceu:rubber_plate")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        // Alternative LV motor recipe
        event.remove({ id: "gtceu:shaped/electric_motor_lv_steel" })
        event.remove({ id: "gtceu:shaped/electric_motor_lv_iron" })
        event.remove({ id: "gtceu:assembler/electric_motor_lv_steel" })
        event.remove({ id: "gtceu:assembler/electric_motor_lv_iron" })

        event.shaped("gtceu:lv_electric_motor", [
            "CWR",
            "WMW",
            "RWC"
        ], {
            C: "gtceu:tin_single_cable",
            W: "gtceu:fine_copper_wire",
            R: "gtceu:iron_rod",
            M: "gtceu:magnetic_iron_rod"
        })

        event.recipes.gtceu.assembler("lv_motor")
            .itemInputs("2x gtceu:tin_single_cable", "2x gtceu:iron_rod", "gtceu:magnetic_iron_rod", "4x gtceu:fine_copper_wire")
            .itemOutputs("gtceu:lv_electric_motor")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])

        // Alternative LV piston recipe
        event.shaped("gtceu:lv_electric_piston", [
            "PPP",
            "CRR",
            "CMG"
        ], {
            P: "gtceu:wrought_iron_plate",
            C: "gtceu:tin_single_cable",
            R: "gtceu:wrought_iron_rod",
            M: "gtceu:lv_electric_motor",
            G: "gtceu:wrought_iron_gear"
        })

        // Glass tube
        event.recipes.gtceu.shaped("gtceu:glass_tube", [
            "   ",
            "PPP",
            "PPP"
        ], {
            P: "#forge:glass_panes"
        }).id("kubejs:glass_tube")

        // GT Steam Age
        gtMachines.forEach(machine => {
            event.remove({ output: [`gtceu:lp_steam_${machine}`, `gtceu:hp_steam_${machine}`] })
        })

        event.remove({ output: "gtceu:lv_item_magnet" })
        event.shaped(Item.of("gtceu:lv_item_magnet", "{Charge:120000L}"), [
            "R R",
            "R R",
            "CPC"
        ], {
            C: "gtceu:tin_single_cable",
            R: "gtceu:magnetic_iron_rod",
            P: "gtceu:iron_plate"
        })
    }

    if(!doHarderRecipes) {
        // Make clay electrolysis an LV recipe
        event.remove({ id: "gtceu:electrolyzer/decomposition_electrolyzing_clay" })
        event.recipes.gtceu.electrolyzer("clay_electrolysis_lv")
            .itemInputs("13x gtceu:clay_dust")
            .itemOutputs("2x gtceu:sodium_dust", "2x gtceu:silicon_dust", "gtceu:lithium_dust", "2x gtceu:aluminium_dust")
            .outputFluids("minecraft:water 6000")
            .duration(364)
            .EUt(GTValues.VHA[GTValues.LV])

        // Monified distill tower
        event.recipes.gtceu.shaped("gtceu:distillation_tower", [
            "LPL",
            "CHC",
            "LPL"
        ], {
            L: "gtceu:stainless_steel_large_fluid_pipe",
            P: "gtceu:hv_electric_pump",
            C: "#gtceu:circuits/hv",
            H: "gtceu:hv_machine_hull"
        }).id("gtceu:shaped/distillation_tower").addMaterialInfo()
    }
})
