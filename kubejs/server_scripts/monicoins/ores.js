/**
 * Registration of Monicoin trades for ores
 */

ServerEvents.recipes(event => {
    if (doMonicoins) {
        // moniPENNY RECIPES
        event.shaped(Item.of("minecraft:clay_ball", 64), [
            "AAA",
            "  A",
            "   "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_pitchblende", 32), [
            "A  ",
            "AAA",
            "  A"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_saltpeter", 32), [
            " A ",
            "AAA",
            "  A"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_graphite", 32), [
            "  A",
            "AAA",
            "  A"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_powellite", 32), [
            " A ",
            "AAA",
            "A  "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_oilsands", 32), [
            "A  ",
            "AAA",
            " A "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_tricalcium_phosphate", 32), [
            "   ",
            "AAA",
            " AA"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_apatite", 32), [
            "A  ",
            "  A",
            "AAA"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_beryllium", 32), [
            "AA ",
            "   ",
            "AAA"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_salt", 32), [
            " A ",
            "  A",
            "AAA"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_rock_salt", 32), [
            "   ",
            " AA",
            "AAA"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_lazurite", 32), [
            "AA ",
            "  A",
            "AA "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_vanadium_magnetite", 32), [
            "AA ",
            " AA",
            "A  "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_calcite", 32), [
            "AA ",
            "AAA",
            "   "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_sodalite", 32), [
            "AAA",
            "   ",
            " AA"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_lapis", 32), [
            "AAA",
            "   ",
            "AA "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_coal", 32), [
            "AAA",
            " AA",
            "   "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_cinnabar", 32), [
            "AAA",
            "A  ",
            "  A"
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_redstone", 32), [
            "AAA",
            "A  ",
            " A "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_talc", 32), [
            "AAA",
            "A  ",
            "A  "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_pyrope", 32), [
            "AAA",
            "A A",
            "   "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_soapstone", 32), [
            "AAA",
            "AA ",
            "   "
        ], {
            A: "kubejs:moni_penny"
        }).noMirror().noShrink()

        // moniNICKEL RECIPES
        event.shaped(Item.of("gtceu:rubber_sapling", 32), [
            "A A",
            "A  ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_green_sapphire", 32), [
            "AAA",
            "A A",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_sapphire", 32), [
            "AAA",
            "AA ",
            "  A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_cobaltite", 32), [
            "AAA",
            "AA ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_neodymium", 32), [
            "AAA",
            "AA ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_realgar", 32), [
            "AAA",
            "AA ",
            "A A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_electrotine", 32), [
            "AAA",
            "AA ",
            "AAA"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_tantalite", 32), [
            " A ",
            "AAA",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_sphalerite", 32), [
            "AA ",
            "   ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_uraninite", 32), [
            "AA ",
            "   ",
            "  A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_silver", 32), [
            "AA ",
            "  A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_spessartine", 32), [
            "AA ",
            "   ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_lead", 32), [
            "AA ",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_molybdenite", 32), [
            "AAA",
            "A  ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_bastnasite", 32), [
            "AAA",
            "A A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_monazite", 32), [
            "AAA",
            "AA ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_tetrahedrite", 32), [
            "AAA",
            "  A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_topaz", 32), [
            "   ",
            "AAA",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_ruby", 32), [
            "AAA",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_stibnite", 32), [
            "AAA",
            "A  ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_thorium", 32), [
            "AA ",
            "A  ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_malachite", 32), [
            "AAA",
            "   ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_pyrite", 32), [
            "AAA",
            "AAA",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_galena", 32), [
            "   ",
            "   ",
            "AA "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_almandine", 32), [
            "A A",
            "   ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_garnierite", 32), [
            "A  ",
            "A  ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_nickel", 32), [
            "A  ",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_barite", 32), [
            "A  ",
            "  A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_lepidolite", 32), [
            " A ",
            "   ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_bentonite", 32), [
            "A  ",
            "   ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_aluminium", 32), [
            "A  ",
            "   ",
            "  A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_bauxite", 32), [
            " AA",
            "   ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_grossular", 32), [
            " A ",
            "A  ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_pyrolusite", 32), [
            " A ",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_magnesite", 32), [
            " A ",
            "  A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_olivine", 32), [
            " A ",
            "   ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_tin", 32), [
            "   ",
            " A ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_cassiterite", 32), [
            " A ",
            "   ",
            "  A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_lithium", 32), [
            "  A",
            "A  ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_spodumene", 32), [
            "  A",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_chalcopyrite", 32), [
            "  A",
            "  A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("minecraft:raw_copper", 32), [
            "  A",
            "   ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_sulfur", 32), [
            "  A",
            "   ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_quartzite", 32), [
            "  A",
            "   ",
            "  A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_nether_quartz", 32), [
            "   ",
            "AA ",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_certus_quartz", 32), [
            "   ",
            "A A",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_pentlandite", 32), [
            "   ",
            "A  ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_glauconite_sand", 32), [
            "   ",
            "A  ",
            " A "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        /* event.shaped(

          Item.of("gtceu:raw_brown_limonite", 32),
          [
            "A  ",
            " A ",
            "   "
          ],
          {
            A: "kubejs:moni_nickel"
          }).noMirror().noShrink()*/

        event.shaped(Item.of("gtceu:raw_yellow_limonite", 32), [
            "   ",
            "A  ",
            "  A"
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("minecraft:raw_iron", 32), [
            "   ",
            " AA",
            "   "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_magnetite", 32), [
            "   ",
            " A ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_gypsum", 32), [
            "   ",
            "  A",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()

        // moniQUARTER RECIPES
        event.shaped(Item.of("minecraft:raw_gold", 32), [
            "A A",
            "   ",
            "   "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_emerald", 32), [
            " A ",
            "   ",
            " A "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_palladium", 32), [
            "A  ",
            "   ",
            " A "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_molybdenum", 32), [
            " AA",
            "AA ",
            "A  "
        ], {
            A: "kubejs:moni_nickel"
        }).noMirror().noShrink()


        event.shaped(Item.of("gtceu:raw_ilmenite", 32), [
            "A  ",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_platinum", 32), [
            " A ",
            " A ",
            "   "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_cooperite", 32), [
            "A  ",
            "AA ",
            "   "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()

        event.shaped(Item.of("gtceu:raw_diamond", 32), [
            "   ",
            "  A",
            "A  "
        ], {
            A: "kubejs:moni_quarter"
        }).noMirror().noShrink()
    }
})
