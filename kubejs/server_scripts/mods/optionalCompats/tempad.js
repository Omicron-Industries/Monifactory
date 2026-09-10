/**
 * Compat for the tempad mod
 */
if (Platform.isLoaded("tempad")) {
    console.log("Tempad found, loading compat scripts...")
    LootJS.modifiers((event) => {
        event.addLootTableModifier("minecraft:chests/simple_dungeon")
            .randomChance(0.02)
            .addLoot("tempad:tempad");
    })
    ServerEvents.tags("item", event => {
        event.add("tempad:tempad_fuel", "kubejs:moni_penny")
    })
    ServerEvents.recipes(event => {
        event.shaped("tempad:tempad", [
            "PFP",
            "CNC",
            "PSP"
        ], {
            P: "gtceu:electrum_plate",
            C: "#gtceu:circuits/mv",
            F: "gtceu:mv_field_generator",
            S: "gtceu:mv_sensor",
            N: "waystones:warp_stone"
        }).id("tempad:tempad")

        event.recipes.gtceu.assembler("tempad:he_who_remains_tempad")
            .itemInputs("tempad:tempad", "gtceu:lapotron_crystal", "4x #gtceu:circuits/ev", "16x kubejs:quantum_flux", "8x gtceu:tungsten_carbide_plate", "2x gtceu:signalum_plate")
            .inputFluids(Fluid.of("gtceu:mana", 1000))
            .itemOutputs("tempad:he_who_remains_tempad")
            .duration(100)
            .EUt(GTValues.VA[GTValues.HV])
    })
    console.log("Tempad compat scripts successfully loaded!")
} else { console.log("Tempad was not found, skipping its compat scripts.") }
