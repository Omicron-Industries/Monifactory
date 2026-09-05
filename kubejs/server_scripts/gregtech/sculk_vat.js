/**
 * Recipes for the Sculk Vat
 * - Controller
 * - Hatches
 * - Petri Dish sterilization
 * - Petri Dish canning
 * - Growth recipes
 * - Transformation recpies
 */

ServerEvents.recipes(event => {
    // Controller recipe
    event.recipes.gtceu.assembly_line("sculk_vat")
        .itemInputs("monilabs:cryolobus_casing", "gtceu:iv_fermenter", "gtceu:sterilizing_filter_casing", "2x #gtceu:circuits/zpm", "16x gtceu:petri_dish")
        .inputFluids("gtceu:advanced_soldering_alloy 576", "gtceu:polybenzimidazole 288")
        .itemOutputs("monilabs:sculk_vat")
        .duration(20 * 30)
        .EUt(GTValues.VA[GTValues.ZPM])
        .addMaterialInfo(true)
        ["scannerResearch(java.util.function.UnaryOperator)"](b => b.researchStack("gtceu:iv_fermenter").EUt(GTValues.VA[GTValues.IV]).duration(20 * 50))

    // Hatch recipes
    event.recipes.gtceu.assembler("sculk_xp_draining_hatch")
        .itemInputs("gtceu:ev_input_hatch", "2x gtceu:cryolobus_plate", "gtceu:luv_electric_pump", "2x gtceu:polybenzimidazole_normal_fluid_pipe")
        .inputFluids("enderio:xp_juice 2000")
        .itemOutputs("monilabs:sculk_xp_draining_hatch")
        .duration(20 * 10)
        .EUt(GTValues.VA[GTValues.LuV])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("sculk_xp_sensor_hatch")
        .itemInputs("gtceu:ev_machine_hull", "2x gtceu:cryolobus_plate", "gtceu:luv_sensor", "4x gtceu:red_alloy_screw")
        .inputFluids("enderio:xp_juice 500")
        .itemOutputs("monilabs:sculk_xp_sensor_hatch")
        .duration(20 * 10)
        .EUt(GTValues.VA[GTValues.LuV])
        .addMaterialInfo(true)

    event.recipes.gtceu.assembler("advanced_sculk_xp_sensor_hatch")
        .itemInputs("monilabs:sculk_xp_sensor_hatch", "gtceu:zpm_sensor")
        .inputFluids("enderio:xp_juice 2000")
        .itemOutputs("monilabs:advanced_sculk_xp_sensor_hatch")
        .duration(20 * 10)
        .EUt(GTValues.VA[GTValues.ZPM])
        .addMaterialInfo(true)

    // Petri Dish cleaning in the Autoclave
    event.recipes.gtceu.autoclave("petri_dish_sterilization")
        .itemInputs("gtceu:petri_dish")
        .inputFluids("gtceu:steam 960")
        .itemOutputs("kubejs:petri_dish_sterile")
        .outputFluids("minecraft:water 6")
        .duration(5 * 20)
        .EUt(GTValues.VA[GTValues.HV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    // Petri Dish canning
    event.recipes.gtceu.canner("petri_dish_bacteria")
        .itemInputs("1x kubejs:petri_dish_sterile", "1x gtceu:agar_dust")
        .inputFluids("gtceu:bacteria 250")
        .itemOutputs("1x kubejs:petri_dish_bacteria")
        .duration(5 * 20)
        .EUt(GTValues.VA[GTValues.MV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    event.recipes.gtceu.canner("petri_dish_sculk")
        .itemInputs("1x kubejs:petri_dish_sterile", "1x gtceu:sculk_agar_dust")
        .inputFluids("gtceu:sculk 250")
        .itemOutputs("1x kubejs:petri_dish_sculk")
        .duration(5 * 20)
        .EUt(GTValues.VA[GTValues.MV])
        .cleanroom(CleanroomType.STERILE_CLEANROOM)

    // Growth recipes
    event.recipes.gtceu.sculk_vat("bacteria_growth")
        .itemInputs("kubejs:petri_dish_bacteria")
        .inputFluids("gtceu:biomass 40000")
        .outputFluids("gtceu:bacteria 30000")
        .circuit(1)
        .duration(400)
        .EUt(GTValues.VA[GTValues.MV])

    event.recipes.gtceu.sculk_vat("sculk_growth")
        .notConsumable("minecraft:sculk_catalyst")
        .itemInputs("1x minecraft:stone")
        .outputFluids("gtceu:sculk 288")
        .xpRange(12000, 56000)
        .duration(20 * 3)
        .EUt(GTValues.VA[GTValues.HV])

    event.recipes.gtceu.sculk_vat("hadal_sculk_growth")
        .itemInputs("2x kubejs:petri_dish_sculk", "kubejs:hadal_shard")
        .inputFluids("gtceu:mutagen 250", "gtceu:glycerol 1250", "gtceu:isoprene 750")
        .outputFluids("gtceu:hadal_sculk 2000")
        .xpRange(96000, 120000)
        .duration(100)
        .EUt(GTValues.VA[GTValues.IV])

    // Transformation recipes
    event.recipes.gtceu.sculk_vat("biomass_fermentation")
        .notConsumable("kubejs:petri_dish_bacteria")
        .inputFluids("gtceu:biomass 40000")
        .outputFluids("gtceu:fermented_biomass 40000")
        .circuit(2)
        .duration(20 * 30)
        .EUt(GTValues.VHA[GTValues.MV])

    /*
    // Move Enriched Bacterial Sludge recipes from Brewery to Sculk Vat
    let sludge_inputs = [
        ["u235", "tiny_uranium_235_dust"],
        ["u238", "uranium_dust"],
        ["naquadria", "tiny_naquadria_dust"]
    ]

    sludge_inputs.forEach(value => {
        event.remove(`gtceu:brewery/enriched_bacterial_sludge_from_${value[0]}`)
        event.recipes.gtceu.sculk_vat(`enriched_bacterial_sludge_from_${value[0]}`)
            .itemInputs(`gtceu:${value[1]}`)
            .inputFluids("gtceu:bacterial_sludge")
            .outputFluids("gtceu:enriched_bacterial_sludge")
            .duration(6.4 * 20)
            .EUt(GTValues.VHA[GTValues.ULV])
    })
    */
})
