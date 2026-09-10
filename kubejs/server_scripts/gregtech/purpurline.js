/**
 * Purpur processing offers a means of getting Phosphorus that isn't Apatite. Potassium, too.
 */

ServerEvents.recipes(event =>{
    let purpur_items = [
        {item: "minecraft:popped_chorus_fruit", amount: GTValues.M},
        {item: "minecraft:purpur_pillar", amount: GTValues.M},
        {item: "minecraft:purpur_stairs", amount: GTValues.M * 3 / 4},
        {item: "minecraft:purpur_slab", amount: GTValues.M / 2},
        {item: "quark:purpur_vertical_slab", amount: GTValues.M / 2}
    ]
    purpur_items.forEach(entry => {
        event.recipes.gtceu.macerator(`purpur_dust_from_${entry.item}`)
            .category("gtceu:macerator_recycling")
            .itemInputs(entry.item)
            .itemOutputs(ChemicalHelper.getDust(GTMaterials.get("purpur"), entry.amount))
            .EUt(2)
            .duration(5 * (entry.amount / GTValues.M) * 20)
    })

    event.recipes.gtceu.macerator("purpur_dust_from_chipped_block")
        .category("gtceu:macerator_recycling")
        .itemInputs("#chipped:purpur_block")
        .itemOutputs(ChemicalHelper.getDust(GTMaterials.get("purpur"), GTValues.M))
        .EUt(2)
        .duration(4.9 * 20)

    event.recipes.gtceu.centrifuge("purpur_dust_separation")
        .itemInputs("gtceu:purpur_dust")
        .chancedOutput("gtceu:bio_chaff", 5000, 0)
        .chancedOutput("gtceu:purpurite_dust", 2000, 0)
        .chancedOutput("kubejs:ender_shard", 2400, 0)
        .chancedOutput("gtceu:potash_dust", 1500, 0)
        .chancedOutput("gtceu:endstone_dust", 1000, 0)
        .chancedOutput("gtceu:mica_dust", 800, 0)
        .EUt(GTValues.VA[GTValues.MV])
        .duration(8 * 20)
})
