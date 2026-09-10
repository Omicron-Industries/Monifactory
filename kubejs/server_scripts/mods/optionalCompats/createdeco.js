/**
 * Compat for the createdeco mod
 */
if (Platform.isLoaded("createdeco")) {
    console.log("createdeco found and scripts loaded")
    ServerEvents.recipes(event => {
        function sheets(output, sheetsInput) {
            event.shaped(`createdeco:${output}`, [
                "H",
                "I",
                "I"
            ], {
                H: "#forge:tools/hammers",
                I: sheetsInput
            })

            event.recipes.gtceu.forge_hammer(`${output}_sheet`)
                .itemInputs(`3x ${sheetsInput}`)
                .itemOutputs(`2x createdeco:${output}`)
                .duration(56)
                .EUt(GTValues.VHA[GTValues.LV])

            event.recipes.gtceu.bender(`${output}_sheet`)
                .itemInputs(sheetsInput)
                .itemOutputs(`createdeco:${output}`)
                .circuit(1)
                .duration(56)
                .EUt(24)

            event.recipes.gtceu.extruder(`${output}_sheet`)
                .itemInputs(sheetsInput)
                .notConsumable("gtceu:plate_extruder_mold")
                .itemOutputs(`createdeco:${output}`)
                .duration(56)
                .EUt(56)
        }

        sheets("industrial_iron_sheet", "createdeco:industrial_iron_ingot")
        sheets("andesite_sheet", "create:andesite_alloy")

        event.recipes.gtceu.cutter("industrial_iron_sheet")
            .itemInputs("create:industrial_iron_block")
            .itemOutputs("9x createdeco:industrial_iron_sheet")
            .duration(448)
            .EUt(GTValues.VA[GTValues.LV])

        event.recipes.gtceu.cutter("andesite_sheet")
            .itemInputs("create:andesite_alloy_block")
            .itemOutputs("9x createdeco:andesite_sheet")
            .duration(448)
            .EUt(GTValues.VA[GTValues.LV])

        function decor(sheet, ingot, bars, decorOutput, block) {
            // Windows
            event.remove({ output: `createdeco:${decorOutput}_window` })
            event.shaped(`2x createdeco:${decorOutput}_window`, [
                " I ",
                "IGI"
            ], {
                I: ingot,
                G: "minecraft:glass"
            })
            // Overlay
            event.remove({ output: `createdeco:${decorOutput}_bars_overlay` })
            event.shaped(`8x createdeco:${decorOutput}_bars_overlay`, [
                " H ",
                "SSS",
                "SSS"
            ], {
                S: sheet,
                H: "#forge:tools/hammers"
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_bars_overlay`)
                .itemInputs(`3x ${sheet}`)
                .itemOutputs(`4x createdeco:${decorOutput}_bars_overlay`)
                .circuit(3)
                .duration(300)
                .EUt(4)
            // Mesh
            event.remove({ output: `createdeco:${decorOutput}_mesh_fence` })
            event.shaped(`8x createdeco:${decorOutput}_mesh_fence`, [
                " H ",
                "SsS",
                "SsS"
            ], {
                S: sheet,
                s: "#forge:string",
                H: "#forge:tools/hammers"
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_mesh_fence`)
                .itemInputs(`2x ${sheet}`)
                .itemInputs("#forge:string")
                .itemOutputs(`4x createdeco:${decorOutput}_mesh_fence`)
                .circuit(32)
                .duration(300)
                .EUt(4)
            // Catwalk
            event.remove({ output: `createdeco:${decorOutput}_catwalk` })
            event.shaped(`4x createdeco:${decorOutput}_catwalk`, [
                "sSH",
                "SBS",
                "DSs"
            ], {
                B: bars,
                S: sheet,
                s: "#forge:screws/iron",
                H: "#forge:tools/hammers",
                D: "#forge:tools/screwdrivers"
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_catwalk`)
                .itemInputs(`4x ${sheet}`)
                .itemInputs(bars)
                .itemOutputs(`4x createdeco:${decorOutput}_catwalk`)
                .circuit(31)
                .duration(300)
                .EUt(4)
            // Catwalk Stairs
            event.remove({ output: `createdeco:${decorOutput}_catwalk_stairs` })
            event.shaped(`2x createdeco:${decorOutput}_catwalk_stairs`, [
                "  H",
                "DCs",
                "sBC"
            ], {
                B: bars,
                C: `createdeco:${decorOutput}_catwalk`,
                s: "#forge:screws/iron",
                H: "#forge:tools/hammers",
                D: "#forge:tools/screwdrivers"
            })
            event.recipes.gtceu.bender(`createdeco:${decorOutput}_catwalk_stairs`)
                .itemInputs(`createdeco:${decorOutput}_catwalk`)
                .itemOutputs(`createdeco:${decorOutput}_catwalk_stairs`)
                .circuit(1)
                .duration(240)
                .EUt(24)
            // Catwalk Railing
            event.remove({ output: `createdeco:${decorOutput}_catwalk_railing` })
            event.shaped(`4x createdeco:${decorOutput}_catwalk_railing`, [
                "sDs",
                "SSS",
                "BHB"
            ], {
                B: bars,
                S: sheet,
                s: "#forge:screws/iron",
                H: "#forge:tools/hammers",
                D: "#forge:tools/screwdrivers"
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_catwalk_railing`)
                .itemInputs(`2x ${bars}`)
                .itemInputs(`2x ${sheet}`)
                .itemOutputs(`4x createdeco:${decorOutput}_catwalk_railing`)
                .circuit(30)
                .duration(300)
                .EUt(4)
            // Support Wedges
            event.remove({ output: `createdeco:${decorOutput}_support_wedge` })
            event.shaped(`3x createdeco:${decorOutput}_support_wedge`, [
                "SS",
                "HS"
            ], {
                S: sheet,
                H: "#forge:tools/hammers"
            })
            event.recipes.gtceu.bender(`createdeco:${decorOutput}_support_wedge`)
                .itemInputs(sheet)
                .itemOutputs(`createdeco:${decorOutput}_support_wedge`)
                .circuit(32)
                .duration(240)
                .EUt(24)
            // Train Hull
            event.remove({ output: `createdeco:${decorOutput}_hull` })
            event.shaped(`createdeco:${decorOutput}_hull`, [
                "HS ",
                "SbS",
                " SF"
            ], {
                b: block,
                S: sheet,
                H: "#forge:tools/hammers",
                F: "#forge:tools/files"
            })
            // Support
            event.remove({ output: `createdeco:${decorOutput}_support` })
            event.shaped(`4x createdeco:${decorOutput}_support`, [
                "IBI",
                "BHB",
                "IBI"
            ], {
                I: ingot,
                B: bars,
                H: "#forge:tools/hammers"
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_support`)
                .itemInputs(bars)
                .itemInputs(ingot)
                .itemOutputs(`2x createdeco:${decorOutput}_support`)
                .circuit(32)
                .duration(300)
                .EUt(4)
            // Lamps
            event.remove({ output: `createdeco:yellow_${decorOutput}_lamp` })
            event.remove({ output: `createdeco:red_${decorOutput}_lamp` })
            event.remove({ output: `createdeco:green_${decorOutput}_lamp` })
            event.remove({ output: `createdeco:blue_${decorOutput}_lamp` })
            event.shaped(`createdeco:yellow_${decorOutput}_lamp`, [
                " I ",
                "WLD",
                "sSs"
            ], {
                I: ingot,
                S: sheet,
                s: "#forge:screws/iron",
                W: "#forge:tools/wrenches",
                D: "#forge:tools/screwdrivers",
                L: "minecraft:torch"
            })
            event.recipes.gtceu.assembler(`createdeco:yellow_${decorOutput}_lamp`)
                .itemInputs(`2x ${ingot}`)
                .itemInputs("minecraft:torch")
                .itemOutputs(`createdeco:yellow_${decorOutput}_lamp`)
                .duration(300)
                .EUt(GTValues.VA[GTValues.ULV])
            event.shaped(`createdeco:red_${decorOutput}_lamp`, [
                " I ",
                "WLD",
                "sSs"
            ], {
                I: ingot,
                S: sheet,
                s: "#forge:screws/iron",
                W: "#forge:tools/wrenches",
                D: "#forge:tools/screwdrivers",
                L: "minecraft:redstone_torch"
            })
            event.recipes.gtceu.assembler(`createdeco:red_${decorOutput}_lamp`)
                .itemInputs(`2x ${ingot}`)
                .itemInputs("minecraft:redstone_torch")
                .itemOutputs(`createdeco:red_${decorOutput}_lamp`)
                .duration(300)
                .EUt(GTValues.VA[GTValues.ULV])
            event.shaped(`createdeco:green_${decorOutput}_lamp`, [
                " I ",
                "WLD",
                "sSs"
            ], {
                I: ingot,
                S: sheet,
                s: "#forge:screws/iron",
                W: "#forge:tools/wrenches",
                D: "#forge:tools/screwdrivers",
                L: "minecraft:glow_berries"
            })
            event.recipes.gtceu.assembler(`createdeco:green_${decorOutput}_lamp`)
                .itemInputs(`2x ${ingot}`)
                .itemInputs("minecraft:glow_berries")
                .itemOutputs(`createdeco:green_${decorOutput}_lamp`)
                .duration(300)
                .EUt(GTValues.VA[GTValues.ULV])
            event.shaped(`createdeco:blue_${decorOutput}_lamp`, [
                " I ",
                "WLD",
                "sSs"
            ], {
                I: ingot,
                S: sheet,
                s: "#forge:screws/iron",
                W: "#forge:tools/wrenches",
                D: "#forge:tools/screwdrivers",
                L: "minecraft:soul_torch"
            })
            event.recipes.gtceu.assembler(`createdeco:blue_${decorOutput}_lamp`)
                .itemInputs(`2x ${ingot}`)
                .itemInputs("minecraft:soul_torch")
                .itemOutputs(`createdeco:blue_${decorOutput}_lamp`)
                .duration(300)
                .EUt(GTValues.VA[GTValues.ULV])
            // Sheetmetal
            event.remove({ output: `createdeco:${decorOutput}_sheet_metal` })
            event.shaped(`4x createdeco:${decorOutput}_sheet_metal`, [
                " S ",
                "SHS",
                " S "
            ], {
                S: sheet,
                H: "#forge:tools/hammers",
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_sheet_metal`)
                .itemInputs(sheet)
                .itemOutputs(`createdeco:${decorOutput}_sheet_metal`)
                .circuit(1)
                .duration(100)
                .EUt(4)
        }

        decor("createdeco:andesite_sheet", "create:andesite_alloy", "createdeco:andesite_bars", "andesite", "#forge:storage_blocks/andesite_alloy")
        decor("#forge:plates/copper", "#forge:ingots/copper", "createdeco:copper_bars", "copper", "#forge:storage_blocks/copper")
        decor("#forge:plates/iron", "#forge:ingots/iron", "minecraft:iron_bars", "iron", "#forge:storage_blocks/iron")
        decor("createdeco:industrial_iron_sheet", "createdeco:industrial_iron_ingot", "createdeco:industrial_iron_bars", "industrial_iron", "create:industrial_iron_block")
        decor("#forge:plates/brass", "#forge:ingots/brass", "createdeco:brass_bars", "brass", "#forge:storage_blocks/brass")
        decor("#forge:plates/zinc", "#forge:ingots/zinc", "createdeco:zinc_bars", "zinc", "#forge:storage_blocks/zinc")

        function ironlessDecor(sheet, ingot, decorOutput) {
            // Bars
            event.remove({ output: `createdeco:${decorOutput}_bars` })
            event.shaped(`8x createdeco:${decorOutput}_bars`, [
                " H ",
                "SSS",
                "SSS"
            ], {
                S: ingot,
                H: "#forge:tools/hammers"
            })
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_bars`)
                .itemInputs(`3x ${ingot}`)
                .itemOutputs(`4x createdeco:${decorOutput}_bars`)
                .circuit(3)
                .duration(300)
                .EUt(4)
            // Trap Doors
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_trapdoor`)
                .itemInputs(`4x ${sheet}`)
                .itemOutputs(`createdeco:${decorOutput}_trapdoor`)
                .circuit(4)
                .duration(100)
                .EUt(GTValues.VHA[GTValues.LV])
            // Doors
            event.recipes.gtceu.assembler(`createdeco:${decorOutput}_door`)
                .itemInputs(`6x ${sheet}`)
                .itemOutputs(`createdeco:${decorOutput}_door`)
                .circuit(4)
                .duration(100)
                .EUt(GTValues.VHA[GTValues.LV])
        }

        ironlessDecor("createdeco:andesite_sheet", "create:andesite_alloy", "andesite")
        ironlessDecor("#forge:plates/copper", "#forge:ingots/copper", "copper")
        ironlessDecor("createdeco:industrial_iron_sheet", "createdeco:industrial_iron_ingot", "industrial_iron")
        ironlessDecor("#forge:plates/brass", "#forge:ingots/brass", "brass")
        ironlessDecor("#forge:plates/zinc", "#forge:ingots/zinc", "zinc")

        function bricks(forEach) {
            event.recipes.gtceu.assembler(`createdeco:mossy_${forEach}_bricks`)
                .itemInputs(`createdeco:${forEach}_bricks`)
                .itemInputs("minecraft:vine")
                .itemOutputs(`createdeco:mossy_${forEach}_bricks`)
                .duration(40)
                .EUt(1)
        }

        // Vanilla Mossy Bricks
        event.recipes.gtceu.assembler("createdeco:mossy_red_bricks")
            .itemInputs("minecraft:bricks")
            .itemInputs("minecraft:vine")
            .itemOutputs("createdeco:mossy_red_bricks")
            .duration(40)
            .EUt(1)

        bricks("pearl")
        bricks("dean")
        bricks("blue")
        bricks("dusk")
        bricks("umber")
        bricks("scarlet")
        bricks("verdant")

    })
}
