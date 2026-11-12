/**
 * Custom recipes for the Spatial Tools Compatible mod
 */
ServerEvents.recipes(event => {
    if (doHarderRecipes) {
        event.remove({
            id: /spatialtoolscmp/,
            not: { id: /spatial_tool_merge|crafting_buffer/ } // Merge is custom recipe so the tools won't loose their upgrades etc.
        })

        // Crafting Table recipes are near-identical to Building Gadgets counterparts
        event.shaped("spatialtoolscmp:portable_spatial_replacer", [
            "PE",
            "CM",
            "PB"
        ], {
            M: "#forge:plates/glass",
            P: "gtceu:aluminium_plate",
            E: "gtceu:mv_emitter",
            C: "#gtceu:circuits/mv",
            B: "#gtceu:batteries/lv"
        })
        event.shaped("spatialtoolscmp:portable_spatial_cloner", [
            "SE",
            "CM",
            "PB"
        ], {
            M: "#forge:plates/glass",
            P: "gtceu:aluminium_plate",
            E: "gtceu:lv_emitter",
            S: "gtceu:lv_sensor",
            C: "#gtceu:circuits/mv",
            B: "#gtceu:batteries/mv"
        })
        event.shaped("spatialtoolscmp:portable_spatial_storage", [
            "SE",
            "CM",
            "PB"
        ], {
            M: "#forge:plates/glass",
            P: "gtceu:aluminium_plate",
            E: "gtceu:lv_emitter",
            S: "gtceu:lv_sensor",
            C: "#gtceu:circuits/lv",
            B: "#gtceu:batteries/hv"
        })
        event.shaped("spatialtoolscmp:portable_spatial_piper", [
            "SE",
            "CM",
            "PB"
        ], {
            M: "#forge:plates/glass",
            P: "gtceu:aluminium_plate",
            E: "gtceu:lv_emitter",
            S: "gtceu:lv_sensor",
            C: "#gtceu:circuits/lv",
            B: "#gtceu:batteries/lv"
        })
    } else {
        event.replaceInput({ id: /^spatialtoolscmp:/}, "minecraft:nether_star", "gtceu:mv_emitter")
    }

    // Atomic reconstruct Building Gadgets and Spatial tools into one another
    // to highlight similarity and allow for convenient comparison
    const GadgetReconstructPairs = [
        { gadget: "gadget_exchanging", spatialtool: "portable_spatial_replacer"},
        { gadget: "gadget_copy_paste", spatialtool: "portable_spatial_cloner"},
        { gadget: "gadget_cut_paste", spatialtool: "portable_spatial_storage"},
        { gadget: "gadget_building", spatialtool: "portable_spatial_piper"}
    ]

    GadgetReconstructPairs.forEach(pair => {
        // Gadget to tool
        event.recipes.gtceu.atomic_reconstruction(`${pair.gadget}_to_${pair.spatialtool}`)
            .itemInputs(`buildinggadgets2:${pair.gadget}`)
            .itemOutputs(`spatialtoolscmp:${pair.spatialtool}`)
            .duration(10 * 20)
            .EUt(GTValues.VA[GTValues.MV])
        // Tool to gadget
        event.recipes.gtceu.atomic_reconstruction(`${pair.spatialtool}_to_${pair.gadget}`)
            .itemInputs(`spatialtoolscmp:${pair.spatialtool}`)
            .itemOutputs(`buildinggadgets2:${pair.gadget}`)
            .duration(10 * 20)
            .EUt(GTValues.VA[GTValues.MV])
    })
})
