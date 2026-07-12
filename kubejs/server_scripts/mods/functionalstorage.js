/**
 * Custom recipes for the Functional Storage mod
 */
ServerEvents.recipes(event => {
    // Remove bugged Oak Drawer recipes
    event.remove({ id: /functionalstorage:oak_drawer_alternate/ })


    // Fluid Drawers
    event.replaceInput({ output: /fluid/, mod: "functionalstorage" }, "#minecraft:planks", "#forge:plates/iron")
    event.replaceInput({ output: /fluid/, mod: "functionalstorage" }, "minecraft:bucket", "gtceu:lv_hermetic_casing")


    if(doCompacting) {
        // Compacting drawers
        event.shaped("functionalstorage:compacting_drawer", [
            "III",
            "PDP",
            "III"
        ], {
            I: "gtceu:iron_plate",
            P: "gtceu:lv_electric_piston",
            D: "#functionalstorage:drawer"
        }).id("functionalstorage:compacting_drawer")
        
        event.shaped("functionalstorage:simple_compacting_drawer", [
            "III",
            "IDP",
            "III"
        ], {
            I: "gtceu:iron_plate",
            P: "gtceu:lv_electric_piston",
            D: "#functionalstorage:drawer"
        }).id("functionalstorage:simple_compacting_drawer")

        // Framed Compacting Drawers
        event.shaped("functionalstorage:compacting_framed_drawer", [
            "III",
            "IBI",
            "III"
        ], {
            I: "minecraft:iron_nugget",
            B: "functionalstorage:compacting_drawer"
        }).id("functionalstorage:compacting_framed_drawer")

        event.shaped("functionalstorage:framed_simple_compacting_drawer", [
            "III",
            "IBI",
            "III"
        ], {
            I: "minecraft:iron_nugget",
            B: "functionalstorage:simple_compacting_drawer"
        }).id("functionalstorage:framed_simple_compacting_drawer")

        // Custom coin compacting recipes
        event.custom({
            type: "functionalstorage:custom_compacting",
            higher_input: {
                count: 1,
                item: "kubejs:moni_dollar"
            },
            lower_input: {
                count: 4,
                item: "kubejs:moni_quarter"
            }
        })
        event.custom({
            type: "functionalstorage:custom_compacting",
            higher_input: {
                count: 1,
                item: "kubejs:moni_quarter"
            },
            lower_input: {
                count: 5,
                item: "kubejs:moni_nickel"
            }
        })
        if (doMonicoins) {
            event.custom({
                type: "functionalstorage:custom_compacting",
                higher_input: {
                    count: 1,
                    item: "kubejs:moni_nickel"
                },
                lower_input: {
                    count: 5,
                    item: "kubejs:moni_penny"
                }
            })
        }
    } else {
        event.remove({ id: /^functionalstorage:.*compacting.*_drawer$/})
    }


    // Specialized Drawers
    event.shaped("functionalstorage:controller_extension", [
        "III",
        "CDC",
        "IGI"
    ], {
        I: "gtceu:iron_plate",
        C: "#gtceu:circuits/lv",
        D: "#functionalstorage:drawer",
        G: "#forge:storage_blocks/gold"
    }).id("functionalstorage:controller_extension")
    event.shaped("functionalstorage:armory_cabinet", [
        "ICI",
        "PDP",
        "III"
    ], {
        I: "gtceu:iron_plate",
        C: "#gtceu:circuits/hv",
        D: "#functionalstorage:drawer",
        P: "gtceu:hv_electric_piston"
    }).id("functionalstorage:armory_cabinet")
    event.shaped("functionalstorage:ender_drawer", [
        "ICI",
        "PEP",
        "III"
    ], {
        I: "gtceu:iron_plate",
        C: "#gtceu:circuits/mv",
        E: "enderchests:ender_chest",
        P: "gtceu:mv_electric_piston"
    }).id("functionalstorage:ender_drawer")


    // Storage Controller
    event.remove({ id: "functionalstorage:storage_controller" })
    const controllerCore = ["#forge:storage_blocks/diamond", "#forge:storage_blocks/emerald"]
    controllerCore.forEach(coreBlock => {
        event.shaped("functionalstorage:storage_controller", [
            "III",
            "CDC",
            "IEI"
        ], {
            I: "gtceu:iron_plate",
            C: "#gtceu:circuits/lv",
            D: "#functionalstorage:drawer",
            E: coreBlock
        })
    })


    // Framed Drawers
    const miscframing = ["storage_controller", "controller_extension"]
    miscframing.forEach(Block => {
        event.shaped(`functionalstorage:framed_${Block}`, [
            "III",
            "IBI",
            "III"
        ], {
            I: "minecraft:iron_nugget",
            B: `functionalstorage:${Block}`
        }).id(`functionalstorage:framed_${Block}`)
    })

    // Storage Upgrades
    let upgradeTiers = [
        ["copper", "lead", "bronze"],
        ["gold", "tin", "steel"],
        ["diamond", "copper", "aluminium"],
        ["netherite", "gold", "stainless_steel"]
    ]
    upgradeTiers.forEach((tier, tierIndex) => {
        event.remove({ id: `functionalstorage:${tier[0]}_upgrade` })
        event.shaped(`2x functionalstorage:${tier[0]}_upgrade`, [
            "PUP",
            "PGP",
            "PUP"
        ], {
            P: `#forge:plates/${tier[2]}`,
            G: `#forge:double_plates/${tier[1]}`,
            U: tierIndex == 0 ? "#functionalstorage:drawer" : (`functionalstorage:${upgradeTiers[tierIndex - 1][0]}_upgrade`),
        }).id(`functionalstorage:${tier[2]}_upgrade`)
    })
})
