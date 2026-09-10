/**
 * Register items and GregTech: Modern materials for S'mores.
 */

StartupEvents.registry("item", event => {
    event.create("marshmallow")
        .texture("kubejs:item/smore/marshmallow")
    event.create("milk_chocolate")
        .texture("kubejs:item/smore/milk_chocolate")
    event.create("graham_cracker")
        .texture("kubejs:item/smore/graham_cracker")
})

GTCEuStartupEvents.registry("gtceu:material", event => {
    event.create("marshmallow")
        .liquid(343)
        .color(0xEDEDED)

    event.create("pasteurized_milk")
        .liquid(345)
        .color(0xEEEEEE)

    event.create("chocolate_liquor")
        .liquid(322)
        .color(0x281a10)

    event.create("milk_chocolate")
        .liquid(318)
        .color(0x422f21)
})
