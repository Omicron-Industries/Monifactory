// priority: -1000
/**
 * materials
 */

GTCEuStartupEvents.craftingComponents(event => {

    event.setItems("better_circuit", {
        UEV: "kubejs:extradimensional_processor_mainframe"
    })

    // Make IV+ electrolyzer wires not all osmium for funsies :)
    event.setMaterialEntries("wire_single", {
        IV: "wireGtSingle:neptunium_palladium_aluminium",
        LuV: "wireGtSingle:osmium",
        ZPM: "wireGtSingle:naquadah_alloy",
        UV: "wireGtSingle:cryococcus",
        UHV: "wireGtSingle:omnium",
        UEV: "wireGtSingle:necrosiderite",
    })


    // Necrosiderite, and Monium for wires/cables
    let setWireCable = (component, prefix0, prefix1) =>
        event.setMaterialEntries(component, {
            UHV: prefix0 + ":lanthanum_gold_cadmium_curium_sulfate",
            UEV: prefix0 + ":darconite",
            MAX: prefix1 + ":monium",
        })

    let setWire = (component, prefix) => setWireCable(component, prefix, prefix)

    setWire("wire_quad", "wireGtQuadruple")
    setWire("wire_oct", "wireGtOctal")
    setWire("wire_hex", "wireGtHex")
    setWireCable("cable_single", "cableGtSingle", "wireGtSingle")
    setWireCable("cable_double", "cableGtDouble", "wireGtDouble")
    setWireCable("cable_quad", "cableGtQuadruple", "wireGtQuadruple")
    setWireCable("cable_oct", "cableGtOctal", "wireGtOctal")
    setWireCable("cable_hex", "cableGtHex", "wireGtOctal")

    let wireCableComponents = [
        [TagPrefix.wireGtQuadruple, TagPrefix.wireGtQuadruple, GTCraftingComponents.WIRE_QUAD],
        [TagPrefix.wireGtOctal, TagPrefix.wireGtOctal, GTCraftingComponents.WIRE_OCT],
        [TagPrefix.wireGtHex, TagPrefix.wireGtHex, GTCraftingComponents.WIRE_HEX],
        [TagPrefix.cableGtSingle, TagPrefix.wireGtSingle, GTCraftingComponents.CABLE],
        [TagPrefix.cableGtDouble, TagPrefix.wireGtDouble, GTCraftingComponents.CABLE_DOUBLE],
        [TagPrefix.cableGtQuadruple, TagPrefix.wireGtQuadruple, GTCraftingComponents.CABLE_QUAD],
        [TagPrefix.cableGtOctal, TagPrefix.wireGtOctal, GTCraftingComponents.CABLE_OCT],
        [TagPrefix.cableGtHex, TagPrefix.wireGtHex, GTCraftingComponents.CABLE_HEX]
    ]

    wireCableComponents.forEach(prefixComponentPair => {
        let wireMap = {};
        wireMap[GTValues.UHV] = prefixComponentPair[0] + ":lanthanum_gold_cadmium_curium_sulfate"
        wireMap[GTValues.UEV] = prefixComponentPair[0] + ":darconite";
        wireMap[GTValues.MAX] = prefixComponentPair[1] + ":monium";
        event.setMaterialEntries(prefixComponentPair[2], wireMap)
    })

    let setCableTierUp = (component, tuple) =>
        event.setMaterialEntries(component, {
            UHV: "cableGt" + tuple + ":darconite",
            UEV: "wireGt" + tuple + ":necrosiderite",
        })

    setCableTierUp("cable_tier_up_single", "Single")
    setCableTierUp("cable_tier_up_double", "Double")
    setCableTierUp("cable_tier_up_quad", "Quadruple")
    setCableTierUp("cable_tier_up_oct", "Octal")
    setCableTierUp("cable_tier_up_hex", "Hex")

    // Pipes
    let pipeComponentPrefixes = [
        [TagPrefix.pipeNormalFluid, GTCraftingComponents.PIPE_NORMAL],
        [TagPrefix.pipeLargeFluid, GTCraftingComponents.PIPE_LARGE],
        [TagPrefix.pipeNonupleFluid, GTCraftingComponents.PIPE_NONUPLE]
    ]

    let setPipe = (component, prefix) =>
        event.setMaterialEntries(component, {
            UHV: prefix + ":neutronium",
            UEV: prefix + ":activated_netherite",
            // Eltz?
        })

    setPipe("normal_pipe", "pipeNormalFluid")
    setPipe("large_pipe", "pipeLargeFluid")
    setPipe("nonuple_pipe", "pipeNonupleFluid")

    event.setItems("glass", {
        UHV: Item.of("gtceu:fusion_glass"),
        UEV: Item.of("monilabs:prism_glass"),
    })

    event.setMaterialEntries("plate", {
        UHV: "plate:manyullyn",
        UEV: "plate:infinity",
        MAX: "plate:monium",
    })

    event.setMaterialEntries("hull_plate", {
        UHV: "plate:polyethyl_cyanoacrylate",
        UEV: "plate:polyethyl_cyanoacrylate",
        MAX: "plate:polyether_ether_ketone"
    })

    event.setMaterialEntries("rotor", {
        UHV: "rotor:neutronium",
        UEV: "rotor:activated_netherite",
        // Eltz?
    })

    // TODO: Grinder, Sawblade (May require making tools for Sawblades)

    // Resistive heating wires (typically, these match the EBF coil for that tier)
    // Used in Alloy Smelters, Electric Furnaces and Extruders
    let heatingCoilComponentPrefixes = [
        [TagPrefix.wireGtDouble, GTCraftingComponents.COIL_HEATING],
        [TagPrefix.wireGtQuadruple, GTCraftingComponents.COIL_HEATING_DOUBLE],
    ]

    let setCoils = (component, prefix) => {
        const entry = prefix + ":omnium"
        event.setMaterialEntries(component, {
            UHV: entry,
            UEV: entry,
        })
    }

    setCoils("coil_heating", "wireGtDouble")
    setCoils("coil_heating_double", "wireGtQuadruple")

    event.setMaterialEntries("coil_electric", {
        UEV: "wireGtHex:darconite",
    })

    const magTerbium = "longRod:magnetic_terbium"
    event.setMaterialEntries("rod_magnetic", {
        UV: "longRod:magnetic_samarium",
        UHV: magTerbium,
        UEV: magTerbium,
    })

    event.setMaterialEntries("rod_distillation", {
        UV: "spring:trinium",
        UHV: "spring:tritanium",
        UEV: "spring:omnium",
    })

    const samRod = "rod:samarium"
    const terbRod = "rod:terbium"

    event.setMaterialEntries("rod_electromagnetic", {
        IV: "rod:neodymium",
        LuV: samRod,
        ZPM: samRod,
        UV: samRod,
        UHV: terbRod,
        UEV: terbRod,
    })

    event.setMaterialEntries("pipe_reactor", {
        UHV: "pipeNormalFluid:polyethyl_cyanoacrylate",
        UEV: "pipeLargeFluid:polyethyl_cyanoacrylate",
    })

    event.setItems("power_component", {
        UHV: "kubejs:uxpic_chip",
        UEV: "kubejs:uxpic_chip",
        MAX: "kubejs:uxpic_chip",
    })

    // Voltage Coils go here

    event.setMaterialEntries("spring", {
        UEV: "spring:darconite",
        UIV: "spring:necrosiderite",
        MAX: "spring:monium",
    })

    // //////////////////////////////////////////////////////

    event.setMaterialEntries("frame", {
        UHV: "frame:manyullyn",
        UEV: "frame:infinity",
        MAX: "frame:monium",
    })

    // Crate, Drum go here

    event.setMaterialEntries("small_spring_transformer", {
        UHV: "smallSpring:lanthanum_gold_cadmium_curium_sulfate",
        UEV: "smallSpring:darconite"
    })

    event.setMaterialEntries("spring_transformer", {
        UV: "spring:lanthanum_gold_cadmium_curium_sulfate",
        UHV: "spring:darconite",
        UEV: "spring:necrosiderite",
    })
})
