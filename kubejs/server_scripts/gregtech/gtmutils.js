/** GTMUtils recipes */
ServerEvents.recipes(event => {
    if (doQuantumCoolant) {
        event.recipes.gtceu.large_chemical_reactor("quantum_coolant")
            .notConsumable("gtceu:luv_emitter")
            .itemInputs("8x monilabs:quantum_flux", "8x kubejs:cryotheum_dust")
            .inputFluids("gtceu:liquid_helium 1000", "gtceu:pcb_coolant 500")
            .outputFluids("gtmutils:quantum_coolant 2000")
            .duration(80)
            .EUt(GTValues.VA[GTValues.LuV]);
    }

    // Infinite Spray Can
    event.recipes.extendedcrafting.shaped_table("gtmutils:infinite_spray_can", [
        "  ppp  ",
        " pABCp ",
        "pDEcFGp",
        "pHwIwJp",
        "pKLcMNp",
        " pOPQp ",
        "  ppp  "
    ], {
        p: "gtceu:black_steel_plate",
        c: "#gtceu:circuits/hv",
        w: "gtceu:infinite_water_cover",
        A: Item.of("gtceu:red_dye_spray_can").weakNBT(),
        B: Item.of("gtceu:black_dye_spray_can").weakNBT(),
        C: Item.of("gtceu:white_dye_spray_can").weakNBT(),
        D: Item.of("gtceu:brown_dye_spray_can").weakNBT(),
        E: Item.of("gtceu:green_dye_spray_can").weakNBT(),
        F: Item.of("gtceu:orange_dye_spray_can").weakNBT(),
        G: Item.of("gtceu:magenta_dye_spray_can").weakNBT(),
        H: Item.of("gtceu:blue_dye_spray_can").weakNBT(),
        I: Item.of("gtceu:solvent_spray_can").weakNBT(),
        J: Item.of("gtceu:light_blue_dye_spray_can").weakNBT(),
        K: Item.of("gtceu:purple_dye_spray_can").weakNBT(),
        L: Item.of("gtceu:cyan_dye_spray_can").weakNBT(),
        M: Item.of("gtceu:lime_dye_spray_can").weakNBT(),
        N: Item.of("gtceu:yellow_dye_spray_can").weakNBT(),
        O: Item.of("gtceu:light_gray_dye_spray_can").weakNBT(),
        P: Item.of("gtceu:gray_dye_spray_can").weakNBT(),
        Q: Item.of("gtceu:pink_dye_spray_can").weakNBT()
    })
})
