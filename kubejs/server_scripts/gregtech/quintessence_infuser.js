/**
 * Soul Binder multiblock
 */

ServerEvents.recipes(event => {
    event.recipes.extendedcrafting.shaped_table("gtceu:quintessence_infuser", [
        "SCFCS",
        "CALAC",
        "GLBLG",
        "CALAC",
        "SCFCS",
    ], {
        S: "gtceu:zpm_sensor",
        C: "gtceu:double_dark_soularium_plate",
        F: "gtceu:luv_field_generator",
        A: "kubejs:dark_soularium_casing",
        L: "#gtceu:circuits/zpm",
        G: "gtceu:zpm_field_generator",
        B: "enderio:soul_binder"
    }).id("kubejs:shaped/quintessence_infuser")

    // Warding Dark Soularium Casing Recipe

    event.recipes.gtceu.assembler("kubejs:dark_soularium_casing")
        .itemInputs("6x gtceu:dark_soularium_plate", "1x gtceu:tungsten_frame")
        .itemOutputs("2x kubejs:dark_soularium_casing")
        .duration(50)
        .EUt(GTValues.VHA[GTValues.LV])
        .addMaterialInfo(true)

    function Soulbinding(id, mob, input2, EUt, fluid, output) {
        event.recipes.gtceu.quintessence_infuser(`${id}_${mob}`)
            .itemInputs(Item.of("enderio:filled_soul_vial", `{BlockEntityTag:{EntityStorage:{Entity:{id:"minecraft:${mob}"}}}}`).weakNBT())
            .itemInputs(Item.of(input2))
            .inputFluids(Fluid.of("enderio:xp_juice", fluid))
            .itemOutputs(output)
            .duration(150)
            .EUt(EUt)
    }


    Soulbinding("enderio:prescient_crystal", "shulker", "enderio:vibrant_crystal", 170, 2240, ["enderio:prescient_crystal", "enderio:empty_soul_vial"])
    Soulbinding("enderio:ender_crystal", "enderman", "enderio:vibrant_crystal", 128, 1440, ["enderio:ender_crystal", "enderio:empty_soul_vial"])
    Soulbinding("enderio:enticing_crystal", "villager", "minecraft:emerald", 100, 800, ["enderio:enticing_crystal", "enderio:empty_soul_vial"])
    Soulbinding("enderio:frank_n_zombie", "zombie", "enderio:z_logic_controller", 128, 800, ["enderio:frank_n_zombie", "enderio:empty_soul_vial"])
    Soulbinding("enderio:sentient_ender", "witch", "enderio:ender_resonator", 128, 800, ["enderio:sentient_ender", "enderio:empty_soul_vial"])

})
