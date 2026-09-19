/**
 * Compat for the create mod
 */
if (Platform.isLoaded("create")) {
    console.log("Create found, loading compat scripts...")
    ServerEvents.recipes(event => {

        // Removes any machines related to processing, the point of this compat is fun not functionality,


        /* Removes recipes for machines that were not removed, deployers and mechanical crafters are fun!
        Most recipe categories that are removed machines are hidden in
        kubejs/assets/emi/recipe/filters/hidecategories.json as opposed to removing the actual recipes */
        event.remove({ type: "create:deploying" })
        event.remove({ type: "create:milling" })
        event.remove({ type: "create:crushing" })
        event.remove({ id: "create:crafting/kinetics/millstone" })
        // event.remove({id: 'create:mechanical_crafting/crushing_wheel'}) //mechanical roller uses this for now
        event.remove({ id: "create:crafting/kinetics/mechanical_mixer" })
        event.remove({ id: "create:crafting/kinetics/mechanical_press" })
        // Remove the hand crank since it's easy to abuse contraptions using it
        event.remove({ id: "create:crafting/kinetics/hand_crank" })
        // Remove a few more items that are useless without their machines
        event.remove({ id: "create:crafting/kinetics/whisk" })
        event.remove({ id: "create:crafting/kinetics/crafter_slot_cover" })
        event.remove({ id: "create:crafting/kinetics/nozzle" })

        // w h a t ?
        event.remove({ id: "gtceu:shaped/lv_kinetic_mixer" })
        event.remove({ id: "gtceu:shaped/mv_kinetic_mixer" })
        event.remove({ id: "gtceu:shaped/hv_kinetic_mixer" })
        event.remove({ id: "gtceu:shaped/ev_kinetic_mixer" })

        // belts made with rubber
        let kelpRecipes = [
            "create:crafting/kinetics/belt_connector",
            "create:crafting/logistics/andesite_funnel",
            "create:crafting/logistics/brass_funnel",
            "create:crafting/logistics/andesite_tunnel",
            "create:crafting/logistics/brass_tunnel"
        ]
        kelpRecipes.forEach(id => { event.replaceInput({ id: id }, "minecraft:dried_kelp", "gtceu:rubber_plate") })
        event.replaceInput({ id: "create:crafting/kinetics/spout" }, "minecraft:dried_kelp", "gtceu:rubber_ring")

        // Adds some create recipes to gt machines
        event.recipes.gtceu.mixer("kubejs:andesite_alloy_from_iron")
            .itemInputs("#forge:nuggets/iron", "minecraft:andesite")
            .itemOutputs("create:andesite_alloy")
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])
        event.recipes.gtceu.mixer("kubejs:andesite_alloy_from_zinc")
            .itemInputs("#forge:nuggets/zinc", "minecraft:andesite")
            .itemOutputs("create:andesite_alloy")
            .duration(100)
            .EUt(GTValues.VA[GTValues.ULV])

        // Pressing and compacting recipes
        event.recipes.gtceu.forge_hammer("kubejs:dirt_path")
            .itemInputs(["minecraft:dirt", "minecraft:grass"])
            .itemOutputs("minecraft:dirt_path")
            .duration(10)
            .EUt(2)

        event.recipes.gtceu.fluid_solidifier("kubejs:bar_of_chocolate")
            .inputFluids(Fluid.of("create:chocolate", 250))
            .notConsumable("gtceu:ingot_casting_mold")
            .itemOutputs("create:bar_of_chocolate")
            .duration(20)
            .EUt(GTValues.VA[GTValues.ULV])

        let honeyFluid = new JSONObject()
        honeyFluid.add("amount", 1000)
        honeyFluid.add("value", { tag: "forge:honey" })
        event.recipes.gtceu.fluid_solidifier("kubejs:honey_block")
            .inputFluids(FluidIngredientJS.of(honeyFluid))
            .notConsumable("gtceu:block_casting_mold")
            .itemOutputs("minecraft:honey_block")
            .duration(5)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("kubejs:blaze_cake_base")
            .itemInputs("minecraft:egg", "minecraft:sugar", "gtceu:netherrack_dust")
            .itemOutputs("create:blaze_cake_base")
            .duration(200)
            .EUt(GTValues.VA[GTValues.ULV])

        let milkFluid = new JSONObject()
        milkFluid.add("amount", 250)
        milkFluid.add("value", { tag: "forge:milk" })

        event.recipes.gtceu.mixer("kubejs:liquid_chocolate")
            .itemInputs("minecraft:sugar", "minecraft:cocoa_beans")
            .inputFluids(FluidIngredientJS.of(milkFluid))
            .outputFluids(Fluid.of("create:chocolate", 250))
            .duration(200)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.mixer("kubejs:tea")
            .itemInputs("#minecraft:leaves")
            .inputFluids(Fluid.of("minecraft:water", 250), FluidIngredientJS.of(milkFluid))
            .outputFluids(Fluid.of("create:tea", 500))
            .duration(200)
            .EUt(GTValues.VA[GTValues.ULV])

        event.recipes.gtceu.extractor("kubejs:extract_bar_of_chocolate")
            .itemInputs("create:bar_of_chocolate")
            .outputFluids(Fluid.of("create:chocolate", 250))
            .duration(10)
            .EUt(4)

        event.recipes.gtceu.extractor("kubejs:extract_honey_block")
            .itemInputs("minecraft:honey_block")
            .outputFluids(Fluid.of("create:honey", 1000))
            .duration(10)
            .EUt(4)

        // Sequenced assembly but awesome
        event.recipes.gtceu.assembler("kubejs:precision_mechanism")
            .itemInputs("#forge:plates/gold", "5x create:cogwheel", "5x create:large_cogwheel", "5x minecraft:iron_nugget")
            .itemOutputs("create:precision_mechanism")
            .duration(300)
            .EUt(GTValues.VA[GTValues.LV])
            .circuit(5)
        // That was actually awesome

        // adding mechanical crafter stuff
        event.recipes.gtceu.assembler("kubejs:extendo_grip")
            .itemInputs("create:precision_mechanism", "create:brass_hand", "6x minecraft:stick", "#forge:ingots/brass")
            .itemOutputs("create:extendo_grip")
            .duration(600)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("kubejs:potato_cannon")
            .itemInputs("create:precision_mechanism", "create:andesite_alloy", "3x create:fluid_pipe", "2x #forge:ingots/copper")
            .itemOutputs("create:potato_cannon")
            .duration(600)
            .EUt(GTValues.VA[GTValues.MV])
        event.recipes.gtceu.assembler("kubejs:wand_of_symmetry")
            .itemInputs("create:precision_mechanism", "minecraft:obsidian", "3x minecraft:glass", "#forge:ingots/brass", "minecraft:ender_pearl")
            .itemOutputs("create:wand_of_symmetry")
            .duration(600)
            .EUt(GTValues.VA[GTValues.MV])

        event.recipes.gtceu.autoclave("kubejs:rose_quartz")
            .itemInputs("minecraft:quartz")
            .itemOutputs("create:rose_quartz")
            .inputFluids("gtceu:redstone 1152")
            .duration(200)
            .EUt(GTValues.VHA[GTValues.LV])
            .circuit(6)
        event.recipes.gtceu.sifter("kubejs:polished_rose_quartz")
            .itemInputs("create:rose_quartz")
            .itemOutputs("create:polished_rose_quartz")
            .duration(200)
            .EUt(GTValues.VHA[GTValues.LV])

        // deploying recipes
        let assembleCasing = function (input, casingName, logInput, casingModId) {
            logInput = (logInput) ? logInput : "#minecraft:logs"
            casingModId = (casingModId) ? casingModId : "create"
            // recipes can use unstripped logs since gt has no way to strip wood
            return event.recipes.gtceu.assembler(`kubejs:${casingName}`)
                .itemInputs(input, logInput)
                .itemOutputs(`${casingModId}:${casingName}`)
                .duration(100)
                .EUt(GTValues.VHA[GTValues.LV])
        }
        assembleCasing("create:andesite_alloy", "andesite_casing")
        assembleCasing("#forge:ingots/brass", "brass_casing")
        assembleCasing("minecraft:copper_ingot", "copper_casing")
        assembleCasing("#forge:plates/obsidian", "railway_casing", "create:brass_casing")


        // Tracks
        if (!Platform.isLoaded("railways")) {
            // Only do this block if Steam and Rails is not loaded. Else, let the Steam and Rails KJS file handle the track recipes.
            event.remove({ output: "create:track" })
            event.shaped("create:track", [
                "   ",
                "IHI",
                "SSS"
            ], {
                H: "#forge:tools/hammers",
                I: "minecraft:iron_nugget",
                S: "#create:sleepers"
            })
            event.recipes.gtceu.assembler("kubejs:createtracks")
                .itemInputs("3x #create:sleepers", "2x minecraft:iron_nugget")
                .itemOutputs("2x create:track")
                .duration(5)
                .EUt(GTValues.VHA[GTValues.LV])
        } else { console.log("Steam and Rails is present, letting its compat script handle the track recipes.") }

        // stone variant rock crusher recipes
        let rockCrushing = function (modName, itemName, EUt) {
            return [
                event.recipes.gtceu.rock_breaker(`kubejs:${itemName}`)
                    .notConsumable(`${modName}:${itemName}`)
                    .itemOutputs(`${modName}:${itemName}`)
                    .adjacentFluids("minecraft:lava", "minecraft:water")
                    .duration(16)
                    .EUt(EUt),
                event.recipes.gtceu.rock_cycle_simulator(`kubejs:${itemName}_rock_cycle`)
                    .notConsumable(`${modName}:${itemName}`)
                    .itemOutputs(`${modName}:${itemName}`)
                    .duration(16)
                    .EUt(EUt),
            ]
        }
        rockCrushing("minecraft", "dripstone_block", 60)
        rockCrushing("minecraft", "tuff", 60)
        rockCrushing("minecraft", "calcite", 60)
        rockCrushing("create", "asurine", 60)
        rockCrushing("create", "crimsite", 60)
        rockCrushing("create", "limestone", 60)
        rockCrushing("create", "ochrum", 60)
        rockCrushing("create", "scoria", 480)
        rockCrushing("create", "scorchia", 480)
        rockCrushing("create", "veridium", 60)
        // stone variant reconstruction recipes
        let owStone = [["minecraft", "stone"], ["create", "asurine"], ["create", "crimsite"], ["create", "limestone"], ["create", "ochrum"], ["create", "veridium"], ["minecraft", "stone"]]
        let neStone = [["minecraft", "blackstone"], ["create", "scoria"], ["create", "scorchia"], ["minecraft", "blackstone"]]
        for (let i = 0; i < owStone.length - 1; ++i) {
            event.recipes.gtceu.atomic_reconstruction(`kubejs:stone_reconstruction/${owStone[i][1]}`)
                .itemInputs(`${owStone[i][0]}:${owStone[i][1]}`)
                .itemOutputs(`${owStone[i + 1][0]}:${owStone[i + 1][1]}`)
                .duration(20)
                .EUt(GTValues.VA[GTValues.LV])
        }
        for (let i = 0; i < neStone.length - 1; ++i) {
            event.recipes.gtceu.atomic_reconstruction(`kubejs:stone_reconstruction/${neStone[i][1]}`)
                .itemInputs(`${neStone[i][0]}:${neStone[i][1]}`)
                .itemOutputs(`${neStone[i + 1][0]}:${neStone[i + 1][1]}`)
                .duration(20)
                .EUt(GTValues.VA[GTValues.LV])
        }
        // remove unused recipe types
        event.remove({ type: "create:pressing" })
        event.remove({ type: "create:compacting" })
        event.remove({ type: "create:milling" })
        event.remove({ type: "create:crushing" })
        event.remove({ type: "create:mixing" })
        // Deploying recipes are fine
        // Remove sawing recipes. Mechanical saws can still be used for stonecutting and in world tree cutting
        event.remove({ type: "create:cutting" })


        // Packager and Logistics
        event.shaped("create:packager", [
            "S S",
            "SCS",
            "SLS"
        ], {
            L: "#gtceu:circuits/lv",
            C: "create:cardboard_block",
            S: "gtceu:steel_plate"
        }).id("create:crafting/logistics/packager")

        event.shaped("create:stock_ticker", [
            " G ",
            " C ",
            " L "
        ], {
            L: "#gtceu:circuits/mv",
            C: "create:stock_link",
            G: "#forge:glass"
        }).id("create:crafting/logistics/stock_ticker")

        event.shapeless("2x create:factory_gauge ", ["create:stock_link", "create:precision_mechanism", "#gtceu:circuits/hv"]).id("create:crafting/logistics/factory_gauge")

        // Pulp
        event.shaped("2x create:pulp", [
            "   ",
            "RRR",
            " H "
        ], {
            H: "#forge:tools/mortars",
            R: "gtceu:plant_ball"
        })

        event.recipes.gtceu.mixer("kubejs:pulp_wood")
            .itemInputs("gtceu:wood_dust")
            .inputFluids("minecraft:water 100")
            .itemOutputs("create:pulp")
            .duration(100)
            .EUt(GTValues.VHA[GTValues.LV])
            .circuit(1)

        event.recipes.gtceu.compressor("kubejs:pulp_plant")
            .itemInputs("gtceu:plant_ball")
            .itemOutputs("create:pulp")
            .duration(20)
            .EUt(2)

        event.smelting("create:cardboard", "create:pulp")


    })
    console.log("Create compat scripts successfully loaded!")
} else { console.log("Create was not found, skipping its compat scripts.") }
