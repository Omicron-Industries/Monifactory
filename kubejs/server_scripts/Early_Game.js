/**
 * Various early-game recipes
 */

ServerEvents.recipes(event => {
    // Aluminum EBF recipe rebuild
    event.remove({ id: "gtceu:electric_blast_furnace/blast_aluminium" })
    event.remove({ id: "gtceu:electric_blast_furnace/blast_aluminium_gas" })
    event.recipes.gtceu.electric_blast_furnace("aluminium_ingot")
        .itemInputs("gtceu:aluminium_dust")
        .itemOutputs("gtceu:aluminium_ingot")
        .duration(400)
        .EUt(120)
        .circuit(1)
        .blastFurnaceTemp(1700)

    event.recipes.gtceu.electric_blast_furnace("aluminium_ingot_gas")
        .itemInputs("gtceu:aluminium_dust")
        .inputFluids("gtceu:nitrogen 1000")
        .itemOutputs("gtceu:aluminium_ingot")
        .duration(268)
        .EUt(120)
        .circuit(2)
        .blastFurnaceTemp(1700)

    // Ender Pearls
    event.recipes.gtceu.alloy_smelter("pulsating_ender_pearl")
        .itemInputs("#forge:gems/diamond", "#forge:dusts/pulsating")
        .itemOutputs("minecraft:ender_pearl")
        .duration(300)
        .EUt(16)


    const plantMaterial = ["#minecraft:leaves", "#minecraft:saplings", "minecraft:vine"]
    plantMaterial.forEach(ballIngredient => {
        event.shaped("gtceu:plant_ball", [
            "AAA",
            "A A",
            "AAA"
        ], { A: ballIngredient })
    });

    // Bronze Machine Casing
    event.recipes.gtceu.assembler("bronze_machine_casing_assembler")
        .itemInputs("8x gtceu:bronze_plate")
        .itemOutputs("gtceu:bronze_machine_casing")
        .circuit(8)
        .duration(25)
        .EUt(16)
        .addMaterialInfo(true)

    // Hand-crushing
    event.shapeless("minecraft:gravel", ["#forge:cobblestone/normal", "#forge:tools/mortars"])
    event.shapeless("minecraft:sand", ["minecraft:gravel", "#forge:tools/hammers"])
    event.shapeless("kubejs:dust", ["minecraft:sand", "#forge:tools/hammers"])

    // Dust hydration
    event.shapeless("minecraft:clay", ["kubejs:dust", "minecraft:water_bucket"])

    // EIO Solar
    event.recipes.gtceu.alloy_smelter("photovoltaic_plate")
        .itemInputs("2x enderio:photovoltaic_composite", "gtceu:electrical_steel_plate")
        .itemOutputs("enderio:photovoltaic_plate")
        .duration(180)
        .EUt(16)

    // Solar composite
    event.shapeless("3x enderio:photovoltaic_composite", ["gtceu:lapis_dust", "gtceu:coal_dust", "gtceu:silicon_dust"]).id("enderio:photovoltaic_composite")

    // Resin Board stuff
    event.recipes.gtceu.assembler("kubejs:resin_board_assembler")
        .itemInputs("#minecraft:planks")
        .inputFluids("gtceu:glue 100")
        .itemOutputs("gtceu:resin_circuit_board")
        .circuit(1)
        .duration(150)
        .EUt(7)

    event.recipes.gtceu.assembler("gtceu:basic_circuit_board")
        .itemInputs("#minecraft:planks", "4x gtceu:copper_foil")
        .inputFluids("gtceu:glue 100")
        .itemOutputs("gtceu:resin_printed_circuit_board")
        .duration(200)
        .EUt(7)

    // Coal tar from coke & coal dusts (with fly ash)
    event.recipes.gtceu.pyrolyse_oven("coke_dust_to_coal_tar")
        .circuit(8)
        .itemInputs("8x gtceu:coke_dust")
        .chancedOutput("gtceu:coal_fly_ash_dust", 7500, 0)
        .outputFluids("gtceu:coal_tar 4000")
        .duration(320)
        .EUt(96);

    event.recipes.gtceu.pyrolyse_oven("coal_dust_to_coal_tar")
        .circuit(8)
        .itemInputs("12x gtceu:coal_dust")
        .chancedOutput("gtceu:coal_fly_ash_dust", 5000, 0)
        .outputFluids("gtceu:coal_tar 3000")
        .duration(320)
        .EUt(96);

    // Phenol direct from Coal
    event.recipes.gtceu.pyrolyse_oven("coal_to_phenol")
        .itemInputs("16x minecraft:coal")
        .inputFluids("#forge:steam 4000")
        .chancedOutput("gtceu:coal_fly_ash_dust", 5000, 0)
        .outputFluids("gtceu:phenol 1000")
        .circuit(14)
        .duration(640)
        .EUt(30)

    event.recipes.gtceu.pyrolyse_oven("coal_dust_to_phenol")
        .itemInputs("16x gtceu:coal_dust")
        .inputFluids("#forge:steam 4000")
        .chancedOutput("gtceu:coal_fly_ash_dust", 5000, 0)
        .outputFluids("gtceu:phenol 1000")
        .circuit(14)
        .duration(640)
        .EUt(30)

    // Phenol direct from Wood
    event.recipes.gtceu.pyrolyse_oven("log_to_phenol")
        .itemInputs("16x #minecraft:logs_that_burn")
        .itemOutputs("2x gtceu:ash_dust")
        .outputFluids("gtceu:phenol 500")
        .circuit(11)
        .duration(1280)
        .EUt(30)

    event.recipes.gtceu.pyrolyse_oven("log_to_phenol_nitrogen")
        .itemInputs("16x #minecraft:logs_that_burn")
        .inputFluids("gtceu:nitrogen 1000")
        .itemOutputs("2x gtceu:ash_dust")
        .outputFluids("gtceu:phenol 500")
        .circuit(12)
        .duration(640)
        .EUt(30)

    // Phenolic circuit board
    event.remove({ id: "gtceu:assembler/phenolic_board" })
    event.recipes.gtceu.chemical_reactor("phenolic_board")
        .itemInputs("gtceu:resin_circuit_board")
        .inputFluids("gtceu:phenol 100")
        .itemOutputs("gtceu:phenolic_circuit_board")
        .duration(120)
        .EUt(GTValues.VA[GTValues.ULV])

    // Pyro Oven
    event.recipes.gtceu.shaped("gtceu:pyrolyse_oven", [
        "PCW",
        "CHC",
        "PUW"
    ], {
        P: "gtceu:lv_electric_piston",
        C: "#gtceu:circuits/lv",
        U: "gtceu:lv_electric_pump",
        W: "gtceu:cupronickel_quadruple_wire",
        H: "gtceu:ulv_machine_hull"
    }).id("gtceu:shaped/pyrolyse_oven").addMaterialInfo()

    // Toolbelts
    event.replaceInput({ output: "toolbelt:pouch" }, "minecraft:gold_ingot", "gtceu:steel_ingot")

    // early canning (using this explicitly as it has types)
    // lithium, cadmium, sodium
    event.recipes.minecraft.crafting_shapeless("gtceu:lv_lithium_battery", ["gtceu:lv_battery_hull", "2x #forge:dusts/lithium"]).id("moni:lv_lithium_battery")
    event.recipes.minecraft.crafting_shapeless("gtceu:lv_cadmium_battery", ["gtceu:lv_battery_hull", "2x #forge:dusts/cadmium"]).id("moni:lv_cadmium_battery")
    event.recipes.minecraft.crafting_shapeless("gtceu:lv_sodium_battery", ["gtceu:lv_battery_hull", "2x #forge:dusts/sodium"]).id("moni:lv_sodium_battery")

    // Battery Alloy Dust
    event.shapeless("4x gtceu:battery_alloy_dust", ["4x gtceu:lead_dust", "gtceu:antimony_dust"])

    // Remake of cobble to gravel recipe due to recipe conflicts with Ad Astra Forge Hammer Recipes

    event.remove({ id: "gtceu:forge_hammer/cobblestone_to_gravel" })
    function CobbleToGravel(id, input, output) {
        event.recipes.gtceu.forge_hammer(`kubejs:${id}`)
            .itemInputs(Item.of(input))
            .itemOutputs(output)
            .duration(10)
            .EUt(16)
    }

    CobbleToGravel("cobbletogravel", "minecraft:cobblestone", "minecraft:gravel")
    CobbleToGravel("blackstonetogravel", "minecraft:blackstone", "minecraft:gravel")
    CobbleToGravel("deepslatetogravel", "minecraft:cobbled_deepslate", "minecraft:gravel")
})
