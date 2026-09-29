/** THIS FILE IS FOR RANDOM RECIPES THAT DOESNT REQUIRE THEIR OWN FILE */

ServerEvents.recipes(event => {
    if (!doHNN) {
        event.remove({ id: /hostilenetworks/ })
    }

    if(doHarderRecipes) {
        event.remove("bic_clipboard:clipboard")
        event.shaped("bic_clipboard:clipboard", [
            " RD",
            "BWS",
            "PPP",
        ], {
            R: "#forge:screws/iron",
            D: "#forge:tools/screwdrivers",
            B: "#forge:bolts/iron",
            W: "#minecraft:planks",
            S: "#forge:springs/iron",
            P: "#forge:paper"
        })
    }

    if (doHarderRecipes) {
        event.remove({ id: "gtceu:large_chemical_reactor/radon_from_uranium_238" })
        event.remove({ id: "gtceu:electric_blast_furnace/blast_cryolobus_gas" })
        event.remove({ id: "gtceu:circuit_assembler/wetware_board" })
        event.remove({ id: "enderio:stick" })
    }

    if (!doHNN) {
        // Mob Heads
        event.shaped("minecraft:skeleton_skull", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "minecraft:bone",
            B: "kubejs:solidified_experience"
        })

        event.shaped("minecraft:wither_skeleton_skull", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "kubejs:wither_bone",
            B: "kubejs:solidified_experience"
        })

        event.shaped("minecraft:zombie_head", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "minecraft:rotten_flesh",
            B: "minecraft:skeleton_skull"
        })

        event.shaped("minecraft:creeper_head", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "minecraft:gunpowder",
            B: "minecraft:skeleton_skull"
        })

        event.shaped("minecraft:dragon_head", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "kubejs:ender_dragon_scale",
            B: "kubejs:solidified_experience"
        })

        event.shaped("enderio:enderman_head", [
            " A ",
            "ABA",
            " A "
        ], {
            A: "minecraft:ender_pearl",
            B: "minecraft:skeleton_skull"
        })
    }

    if (doMeowniPlush) {
        event.recipes.gtceu.forming_press("kubejs:meowni_plush")
            .itemInputs("64x kubejs:moni_dollar", "64x kubejs:moni_dollar", "64x kubejs:moni_dollar", "16x kubejs:moni_dollar",) // Not exact atm, I don't run linux (so i cant use the awk script) and this value is gonna change regardless.
            .itemOutputs("kubejs:meowni_plush")
            .duration(2000)
            .EUt(65520)
    }

    if (!doMonicoins) {
        event.remove({ id: "bountiful:crafting/bountyboard" })
        event.remove({ id: "bountiful:crafting/decree" })
    }
})
