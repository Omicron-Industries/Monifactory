/*
Gating synopsis:
Regular XNet stuff: Late LV
Advanced connectors: MV
Routing: HV
Wireless Routing: EV
Antenna Dish: IV
*/
if (Platform.isLoaded("xnet")) {
    console.log("XNet found, loading compat scripts...")
    ServerEvents.recipes(event => {
        // Remove all recipes from RFToolsBase and XNet
        event.remove({ mod: "rftoolsbase" })
        event.remove({ mod: "xnet" })

        // Add back in RFTools' information screen for the funsies
        event.shapeless("rftoolsbase:information_screen", ["gtceu:computer_monitor_cover"]);
        event.shapeless("gtceu:computer_monitor_cover", ["rftoolsbase:information_screen"]);

        // Add back in RFTools' Filter Module because of its functionality with XNet
        event.shaped("rftoolsbase:filter_module", [
            " P ",
            "RHR",
            " I "
        ], {
            P: "minecraft:paper",
            R: "#forge:dusts/redstone",
            H: "minecraft:hopper",
            I: "#forge:plates/steel"
        })

        // Basic Cables
        let colors = ["red", "green", "blue", "yellow"];
        colors.forEach((color) => {
            event.recipes.gtceu.assembler(`xnet:netcable_${color}`)
                .itemOutputs(`16x xnet:netcable_${color}`)
                .itemInputs(["2x gtceu:fine_red_alloy_wire", "gtceu:fine_gold_wire", "gtceu:pulsating_alloy_single_wire", `#forge:dyes/${color}`, "2x gtceu:carbon_fiber_mesh"])
                .EUt(GTValues.VHA[GTValues.LV])
                .duration(100)
            event.recipes.gtceu.assembler(`xnet:connector_${color}`)
                .itemOutputs(`2x xnet:connector_${color}`)
                .itemInputs([`xnet:netcable_${color}`, "ae2:formation_core", "ae2:annihilation_core", "2x #forge:plates/steel"])
                .inputFluids(Fluid.of("gtceu:soldering_alloy", 72))
                .EUt(GTValues.VHA[GTValues.LV])
                .duration(120)
            event.shapeless(`xnet:netcable_${color}`, [`#forge:dyes/${color}`, "8x #xnet:cables"])
        })

        // Advanced connectors
        let advanced_connector_types = ["red", "green", "blue", "yellow", "routing"];
        advanced_connector_types.forEach((type) => {
            event.recipes.gtceu.assembler(`xnet:advanced_connector_${type}`)
                .itemOutputs(`xnet:advanced_connector_${type}`)
                .itemInputs([`xnet:connector_${type}`, "gtceu:diamond_plate", "4x gtceu:enori_gem"])
                .inputFluids(Fluid.of("thermal:ender", 250))
                .EUt(GTValues.VA[GTValues.MV])
                .duration(120)
        })
        event.recipes.gtceu.assembler("xnet:connector_upgrade")
            .itemOutputs("xnet:connector_upgrade")
            .itemInputs(["minecraft:paper", "gtceu:diamond_plate", "4x gtceu:enori_gem"])
            .inputFluids(Fluid.of("thermal:ender", 250))
            .EUt(GTValues.VA[GTValues.MV])
            .duration(140)

        // Routing
        event.recipes.gtceu.assembler("xnet:netcable_routing")
            .itemOutputs("16x xnet:netcable_routing")
            .itemInputs(["2x gtceu:fine_red_alloy_wire", "gtceu:fine_gold_wire", "gtceu:fine_borosilicate_glass_wire", "gtceu:pulsating_alloy_single_wire", "2x gtceu:carbon_fiber_mesh"])
            .EUt(GTValues.VHA[GTValues.HV])
            .duration(100)
        event.recipes.gtceu.assembler("xnet:connector_routing")
            .itemOutputs("2x xnet:connector_routing")
            .itemInputs(["xnet:netcable_routing", "ae2:formation_core", "ae2:annihilation_core", "2x #forge:plates/stainless_steel"])
            .inputFluids(Fluid.of("gtceu:soldering_alloy", 72))
            .EUt(GTValues.VHA[GTValues.HV])
            .duration(120)

        event.shaped("xnet:controller", [
            "LML",
            "CHC",
            "PSP"
        ], {
            L: "#gtceu:circuits/ulv",
            M: "#gtceu:circuits/lv",
            C: "#xnet:cables",
            H: "gtceu:lv_machine_hull",
            P: "#forge:plates/steel",
            S: "gtceu:tin_single_cable"
        })

        event.shaped("16x xnet:facade", [
            "PSP",
            "SGS",
            "PSP"
        ], {
            P: "minecraft:paper",
            S: "#forge:plates/steel",
            G: "#forge:glass"
        })

        event.shaped("xnet:router", [
            "LML",
            "CHC",
            "PSP"
        ], {
            L: "#gtceu:circuits/mv",
            M: "#gtceu:circuits/hv",
            C: "xnet:netcable_routing",
            H: "gtceu:hv_machine_hull",
            P: "#forge:plates/ender_pearl",
            S: "gtceu:gold_single_cable"
        })

        event.shaped("xnet:wireless_router", [
            "LML",
            "CHC",
            "PSP"
        ], {
            L: "#gtceu:circuits/hv",
            M: "#gtceu:circuits/ev",
            C: "xnet:netcable_routing",
            H: "gtceu:hv_machine_hull",
            P: "#forge:plates/ender_pearl",
            S: "gtceu:platinum_single_cable"
        })

        // Wireless Routing Antennas
        event.recipes.gtceu.assembler("xnet:antenna")
            .itemOutputs("xnet:antenna")
            .itemInputs(["3x #forge:rods/iron", "2x minecraft:iron_bars", "gtceu:ev_emitter", "3x gtceu:fine_annealed_copper_wire"])
            .EUt(GTValues.VA[GTValues.EV])
            .duration(140)
        event.recipes.gtceu.assembler("xnet:antenna_base")
            .itemOutputs("xnet:antenna_base")
            .itemInputs(["1x #forge:rods/iron", "2x #forge:plates/iron", "gtceu:ev_emitter", "2x gtceu:fine_annealed_copper_wire"])
            .EUt(GTValues.VHA[GTValues.EV])
            .duration(100)
        event.recipes.gtceu.assembler("xnet:antenna_dish")
            .itemOutputs("xnet:antenna_dish")
            .itemInputs(["1x #forge:rods/iron", "gtceu:iv_sensor", "gtceu:iv_emitter", "2x #forge:plates/tungsten_steel", "2x gtceu:fine_annealed_copper_wire"])
            .EUt(GTValues.VA[GTValues.IV])
            .duration(240)

        // Redstone Proxies
        event.shapeless("2x xnet:redstone_proxy", ["gtceu:lv_machine_hull", "kubejs:resonating_crystal", "2x #forge:dusts/redstone", "#xnet:cables"])
        event.shapeless("xnet:redstone_proxy_upd", ["xnet:redstone_proxy"])
        event.shapeless("xnet:redstone_proxy", ["xnet:redstone_proxy_upd"])
    })
}
