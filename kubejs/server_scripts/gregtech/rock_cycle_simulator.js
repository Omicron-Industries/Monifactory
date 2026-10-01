/**
 * Rock Cycle Simulator multiblock
 */
ServerEvents.recipes(event => {

    // Recipe
    event.recipes.gtceu.shaped("gtceu:rock_cycle_simulator", [
        "PMP",
        "CHC",
        "UWU"
    ], {
        P: "gtceu:iv_electric_piston",
        C: "#gtceu:circuits/iv",
        U: "gtceu:iv_electric_pump",
        M: "gtceu:iv_electric_motor",
        W: "gtceu:platinum_single_cable",
        H: "gtceu:iv_rock_crusher"
    }).id("kubejs:shaped/rock_cycle_simulator")
        .addMaterialInfo()

    // Recipe Function
    function RockCycle(id, input, output, EUt) {
        event.recipes.gtceu.rock_cycle_simulator(`kubejs:${id}`)
            .notConsumable(Item.of(input))
            .itemOutputs(output)
            .duration(16)
            .EUt(EUt)
    }

    RockCycle("stone", "minecraft:stone", "minecraft:stone", GTValues.VA[GTValues.ULV])
    RockCycle("cobble", "minecraft:cobblestone", "minecraft:cobblestone", GTValues.VA[GTValues.ULV])
    RockCycle("diorite", "minecraft:diorite", "minecraft:diorite", GTValues.VHA[GTValues.MV])
    RockCycle("andesite", "minecraft:andesite", "minecraft:andesite", GTValues.VHA[GTValues.MV])
    RockCycle("granite", "minecraft:granite", "minecraft:granite", GTValues.VHA[GTValues.MV])
    RockCycle("basalt", "minecraft:basalt", "minecraft:basalt", GTValues.VHA[GTValues.HV])
    RockCycle("blackstone", "minecraft:blackstone", "minecraft:blackstone", GTValues.VHA[GTValues.HV])
    RockCycle("obsidian", "minecraft:redstone", "minecraft:obsidian", GTValues.VHA[GTValues.HV])
    RockCycle("marble", "gtceu:marble", "gtceu:marble", GTValues.VHA[GTValues.HV])
    RockCycle("red_granite", "gtceu:red_granite", "gtceu:red_granite", GTValues.VHA[GTValues.EV])
    RockCycle("deepslate", "minecraft:deepslate", "minecraft:deepslate", GTValues.VHA[GTValues.EV])
    RockCycle("calcite", "minecraft:calcite", "minecraft:calcite", GTValues.VHA[GTValues.MV])
    RockCycle("tuff", "minecraft:tuff", "minecraft:tuff", GTValues.VHA[GTValues.MV])
    RockCycle("jasper", "quark:jasper", "quark:jasper", GTValues.VHA[GTValues.MV])
    RockCycle("limestone", "quark:limestone", "quark:limestone", GTValues.VHA[GTValues.MV])
    RockCycle("permafrost", "quark:permafrost", "quark:permafrost", GTValues.VHA[GTValues.MV])
    RockCycle("shale", "quark:shale", "quark:shale", GTValues.VHA[GTValues.MV])
    RockCycle("myalite", "quark:myalite", "quark:myalite", GTValues.VHA[GTValues.MV])

    function DimensionalRockCrushing(namespace, output, EUt, dimension, waterReplacement) {
        if (waterReplacement === undefined) waterReplacement = "minecraft:water"
        event.recipes.gtceu.rock_breaker(`${output}`)
            .notConsumable(`${namespace}:${output}`)
            .itemOutputs(`${namespace}:${output}`)
            .duration(16)
            .EUt(EUt)
            .adjacentFluids("minecraft:lava", waterReplacement)
            .dimension(dimension)

        event.recipes.gtceu.rock_cycle_simulator(`${output}`)
            .notConsumable(`${namespace}:${output}`)
            .itemOutputs(`${namespace}:${output}`)
            .duration(16)
            .EUt(EUt)
            .dimension(dimension)
    }

    DimensionalRockCrushing("minecraft", "end_stone", GTValues.VA[GTValues.IV], "minecraft:the_end")
    DimensionalRockCrushing("minecraft", "netherrack", GTValues.VA[GTValues.EV], "minecraft:the_nether", "kubejs:molten_cryotheum")
    DimensionalRockCrushing("ad_astra", "moon_stone", GTValues.VHA[GTValues.HV], "ad_astra:moon")
    DimensionalRockCrushing("ad_astra", "moon_deepslate", GTValues.VHA[GTValues.HV], "ad_astra:moon")
    DimensionalRockCrushing("ad_astra", "mars_stone", GTValues.VHA[GTValues.HV], "ad_astra:mars")
    DimensionalRockCrushing("ad_astra", "conglomerate", GTValues.VHA[GTValues.HV], "ad_astra:mars")
    DimensionalRockCrushing("ad_astra", "venus_stone", GTValues.VHA[GTValues.EV], "ad_astra:venus")
    DimensionalRockCrushing("ad_astra", "infernal_spire_block", GTValues.VHA[GTValues.EV], "ad_astra:venus")
    DimensionalRockCrushing("ad_astra", "mercury_stone", GTValues.VHA[GTValues.EV], "ad_astra:mercury")
    DimensionalRockCrushing("ad_astra", "glacio_stone", GTValues.VHA[GTValues.IV], "ad_astra:glacio")
    DimensionalRockCrushing("ad_astra", "permafrost", GTValues.VHA[GTValues.IV], "ad_astra:glacio")
})
