/**
 * Compat for the fluxnetworks mod
 */
if (Platform.isLoaded("fluxnetworks")) {
    console.log("Flux Networks found, loading compat scripts...");

    ServerEvents.recipes(event => {
        event.replaceInput({ id: "fluxnetworks:fluxconfigurator" }, "minecraft:obsidian", "gtceu:dark_steel_rod");

        // Flux Dust
        event.recipes.gtceu.chemical_bath("fluxnetworks:flux_dust")
            .itemInputs("1x gtceu:obsidian_dust")
            .inputFluids("gtceu:redstone 144")
            .itemOutputs("fluxnetworks:flux_dust")
            .duration(40)
            .EUt(GTValues.VHA[GTValues.LV])

        // Flux Block
        event.shaped("fluxnetworks:flux_block", [
            "FFF",
            "FFF",
            "FFF"
        ], {
            F: "fluxnetworks:flux_dust"
        }).id("fluxnetworks:fluxblock")

        event.shapeless("9x fluxnetworks:flux_dust", ["fluxnetworks:flux_block"]).id("fluxnetworks:fluxdust")

        // Flux Core
        event.remove({ id: "fluxnetworks:fluxcore" })
        event.recipes.gtceu.assembler("fluxnetworks:fluxcore")
            .itemOutputs("2x fluxnetworks:flux_core")
            .itemInputs("1x minecraft:ender_eye", "4x enderio:reinforced_obsidian_block", "4x fluxnetworks:flux_dust", "1x gtceu:luv_sensor", "1x gtceu:luv_emitter", "4x gtceu:cryolobus_frame")
            .EUt(GTValues.VA[GTValues.LuV])
            .duration(200)

        // Flux Controller
        event.shaped("fluxnetworks:flux_controller", [
            "PCP",
            "RWR",
            "PBP"
        ], {
            P: "gtceu:enriched_naquadah_plate",
            C: "fluxnetworks:flux_core",
            R: "gtceu:enriched_naquadah_rod",
            W: "wirelesschargers:advanced_wireless_player_charger",
            B: "fluxnetworks:flux_block"
        }).id("fluxnetworks:fluxcontroller")

        // Flux Plug & Point
        event.shapeless("fluxnetworks:flux_plug", ["fluxnetworks:flux_core", "fluxnetworks:flux_block"]).id("fluxnetworks:fluxplug");
        event.shapeless("fluxnetworks:flux_point", ["fluxnetworks:flux_core", "minecraft:redstone_block"]).id("fluxnetworks:fluxpoint");

        // Flux Storages
        event.shaped("fluxnetworks:basic_flux_storage", [
            "RBR",
            "GCG",
            "RBR"
        ], {
            R: "gtceu:enriched_naquadah_rod",
            G: "#forge:glass_panes",
            C: "thermal:energy_cell",
            B: "fluxnetworks:flux_block"
        }).id("fluxnetworks:basicfluxstorage")
        event.shaped("fluxnetworks:herculean_flux_storage", [
            "SSS",
            "GCG",
            "SSS"
        ], {
            S: "fluxnetworks:basic_flux_storage",
            G: "#forge:glass_panes",
            C: "gtceu:energy_module",
        }).id("fluxnetworks:herculeanfluxstorage")
        event.shaped("fluxnetworks:gargantuan_flux_storage", [
            "SSS",
            "GCG",
            "SSS"
        ], {
            S: "fluxnetworks:herculean_flux_storage",
            G: "#forge:glass_panes",
            C: "gtceu:energy_cluster",
        }).id("fluxnetworks:gargantuanfluxstorage")

    })
}
