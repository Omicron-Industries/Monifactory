/**
 * Draconic Evolution Fusion recipes
 */

ServerEvents.recipes(event => {
    event.recipes.gtceu.shaped("gtceu:discharger", [
        "PLP",
        "CFC",
        "PHP"
    ], {
        P: "gtceu:cryolobus_plate",
        F: "kubejs:dischargement_core",
        C: "gtceu:niobium_titanium_single_cable",
        L: "gtceu:iv_field_generator",
        H: "gtceu:hsse_frame"
    }).id("kubejs:shaped/discharger")
        .addMaterialInfo()

    event.recipes.gtceu.assembler("monilabs:cryolobus_casing")
        .itemInputs("6x gtceu:cryolobus_plate", "gtceu:cryolobus_frame")
        .itemOutputs("2x monilabs:cryolobus_casing")
        .duration(50)
        .circuit(6)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    function Discharge(id, output, input, refund) {
        event.recipes.gtceu.discharger(`kubejs:${id}`)
            .itemInputs(input)
            .itemOutputs(output)
            .duration(15) // wip
        // .EUt(-(refund / 4)) Enable once that gets fixed.
    }

    const bathyal = Item.of("kubejs:bathyal_energy_core", "{Damage:2000000}").weakNBT()
    const abyssal = Item.of("kubejs:abyssal_energy_core", "{Damage:4000000}").weakNBT()
    const hadal = Item.of("kubejs:hadal_energy_core", "{Damage:8000000}").weakNBT()

    Discharge("cryococcus_block", "5x gtceu:cryococcus_block", ["5x gtceu:cryolobus_block", "2x kubejs:warden_heart", bathyal, bathyal], 40000000)
    Discharge("hadal_warp_engine", "kubejs:hadal_warp_engine", ["gtceu:cryococcus_frame", "kubejs:warp_engine", "gtceu:cryococcus_plate", "2x gtceu:cryolobus_plate", "gtceu:zpm_field_generator", "kubejs:hadal_shard", hadal, abyssal], 40000000)

    // event.recipes.gtceu.charger("kubejs:sculk_core_charge")
    //     .itemInputs(["4x gtceu:cryolobus_ingot", "4x gtceu:tungsten_carbide_ingot", "minecraft:sculk_catalyst"])
    //     .itemOutputs("kubejs:sculk_core")
    //     .EUt(500000 / 16)
    //     .duration(100 * 4)
})
