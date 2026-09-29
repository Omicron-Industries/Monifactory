/**
 * Compat for the computercraft mod
 */
if (Platform.isLoaded("computercraft")) {
    console.log("Computercraft Tweaked found, loading compat scripts...")
    ServerEvents.recipes(event => {

        // Nomral Computer
        event.remove({ id: "computercraft:computer_normal" })
        event.shaped("computercraft:computer_normal", [
            "SSS",
            "SNS",
            "SCS"
        ], {
            S: "gtceu:steel_plate",
            C: "gtceu:computer_monitor_cover",
            N: "#gtceu:circuits/hv",
        })

        // Advanced Computer
        event.remove({ id: "computercraft:computer_advanced" })
        event.remove({ id: "computercraft:computer_advanced_upgrade" })
        event.shaped("computercraft:computer_advanced", [
            "SSS",
            "SNS",
            "SCS"
        ], {
            S: "gtceu:electrum_plate",
            C: "computercraft:computer_normal",
            N: "#gtceu:circuits/ev",
        })

        // Turtle
        event.remove({ id: "computercraft:turtle_normal" })
        event.shaped("computercraft:turtle_normal", [
            "   ",
            "RCA",
            " E "
        ], {
            R: "gtceu:stainless_steel_crate",
            A: "gtceu:hv_robot_arm",
            C: "computercraft:computer_normal",
            E: "gtceu:hv_conveyor_module",
        })

        // Advanced Turtle
        event.remove({ id: "computercraft:turtle_advanced" })
        event.remove({ id: "computercraft:turtle_advanced_upgrade" })
        event.shaped("computercraft:turtle_advanced", [
            "   ",
            "RCA",
            " E "
        ], {
            R: "gtceu:titanium_crate",
            A: "gtceu:ev_robot_arm",
            C: "computercraft:computer_advanced",
            E: "gtceu:ev_conveyor_module",
        })

        // Ender Modem
        event.remove({ id: "computercraft:wireless_modem_advanced" })
        event.shaped("computercraft:wireless_modem_advanced", [
            " E ",
            "BSB",
            "PPP"
        ], {
            B: "gtceu:electrum_bolt",
            P: "gtceu:electrum_plate",
            S: "gtceu:hv_sensor",
            E: "gtceu:hv_emitter",
        })

        // Wireless Modem
        event.remove({ id: "computercraft:wireless_modem_normal" })
        event.shaped("computercraft:wireless_modem_normal", [
            " E ",
            "BSB",
            "PPP"
        ], {
            B: "gtceu:steel_bolt",
            P: "gtceu:steel_plate",
            S: "gtceu:mv_sensor",
            E: "gtceu:mv_emitter",
        })

        // Speaker
        event.remove({ id: "computercraft:speaker" })
        event.shaped("computercraft:speaker", [
            "PWP",
            "PNP",
            "PCP"
        ], {
            W: "gtceu:copper_single_wire",
            N: "minecraft:note_block",
            P: "gtceu:steel_plate",
            C: "gtceu:carbon_fiber_mesh",
        })

        // Monitor
        event.remove({ id: "computercraft:monitor_normal" })
        event.shaped("computercraft:monitor_normal", [
            "PHP",
            "PCP",
            "PPP"
        ], {
            P: "gtceu:steel_plate",
            C: "gtceu:computer_monitor_cover",
            H: "gtceu:mv_machine_hull",
        })

        // Advanced Monitor
        event.remove({ id: "computercraft:monitor_advanced" })
        event.shaped("computercraft:monitor_advanced", [
            "PHP",
            "PCP",
            "PPP"
        ], {
            P: "gtceu:electrum_plate",
            C: "gtceu:computer_monitor_cover",
            H: "gtceu:hv_machine_hull",
        })

        // Pocket Computer
        event.remove({ id: "computercraft:pocket_computer_normal" })
        event.shaped("computercraft:pocket_computer_normal", [
            "   ",
            " C ",
            " T "
        ], {
            T: "gtceu:terminal",
            C: "computercraft:computer_normal",

        })

        // Advanced Pocket Computer
        event.remove({ id: "computercraft:pocket_computer_advanced" })
        event.remove({ id: "computercraft:pocket_computer_advanced_upgrade" })
        event.shaped("computercraft:pocket_computer_advanced", [
            "   ",
            " C ",
            " T "
        ], {
            T: "gtceu:terminal",
            C: "computercraft:computer_advanced",

        })

        // Printer
        event.remove({ id: "computercraft:printer" })
        event.shaped("computercraft:printer", [
            "PHP",
            "PIM",
            "PCC"
        ], {
            P: "gtceu:steel_plate",
            H: "gtceu:mv_machine_hull",
            I: "gtceu:mv_electric_piston",
            C: "gtceu:mv_conveyor_module",
            M: "gtceu:mv_electric_motor",

        })

        // Wired Modem
        event.remove({ id: "computercraft:wired_modem" })
        event.shaped("computercraft:wired_modem", [
            "PPP",
            "ECC",
            "PPP"
        ], {
            P: "gtceu:steel_plate",
            E: "gtceu:mv_emitter",
            C: "computercraft:cable",

        })

        // Netowrking Cable
        event.remove({ id: "computercraft:cable" })
        event.recipes.gtceu.assembler("computercraft_cable")
            .itemInputs("3x gtceu:steel_foil", "6x gtceu:fine_copper_wire")
            .inputFluids("gtceu:polyethylene 144")
            .itemOutputs("6x computercraft:cable")
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])


        // Disk Drive
        event.remove({ id: "computercraft:disk_drive" })
        event.shaped("computercraft:disk_drive", [
            "PHP",
            "PBP",
            "PBP"
        ], {
            P: "gtceu:steel_plate",
            H: "gtceu:mv_machine_hull",
            B: "gtceu:lv_input_bus",


        })
    })
    console.log("Computercraft Tweaked compat scripts successfully loaded!")
} else { console.log("Computercraft Tweaked not found, skipping its compat scripts.") }
