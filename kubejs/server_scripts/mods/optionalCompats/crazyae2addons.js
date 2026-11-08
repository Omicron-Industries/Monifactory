/**
 *
 * Compatibility Script for Crazy AE2 Addons
 * Moves recipes from its custom Recipe Fabricator to GT assembler, and
 * rebalances crazy provider & upgrade recipe
 *
 */

if (Platform.isLoaded("crazyae2addons")) {
	console.log("Crazy AE2 Addons found, loading compat script...");

	ServerEvents.recipes((event) => {
		// Recipe Removal
		event.remove([
			{ id: "crazyae2addons:fabrication/multi_level_emitter" },
			{ id: "crazyae2addons:fabrication/redstone_emitter" },
			{ id: "crazyae2addons:fabrication/tag_level_emitter" },
			{ id: "crazyae2addons:fabrication/cpu_priority_tunner" },
			{ id: "crazyae2addons:fabrication/pattern_multiplier" },
			{ id: "crazyae2addons:fabrication/crazy_provider" },
			{ id: "crazyae2addons:fabrication/display_database" },
			{ id: "crazyae2addons:fabrication/ejector" },
			{ id: "crazyae2addons:crazy_upgrade" },
			{ id: "crazyae2addons:recipe_fabricator" },
			{ id: "crazyae2addons:fabrication/wormhole" }, // remove recipe in case if config is reset
		]);

		// Multi Emitter & Tag Level Emitter - HV recipes
		event.recipes.gtceu
			.assembler("multi_level_emitter")
			.itemInputs("8x ae2:level_emitter", "2x ae2:engineering_processor")
			.itemOutputs("crazyae2addons:multi_level_emitter")
			.duration(180)
			.EUt(480);

		event.recipes.gtceu
			.assembler("tag_level_emitter")
			.itemInputs(
				"crazyae2addons:multi_level_emitter",
				"crazyae2addons:tag_view_cell",
				"ae2:logic_processor",
			)
			.itemOutputs("crazyae2addons:tag_level_emitter")
			.duration(180)
			.EUt(480);

		event.recipes.gtceu
			.assembler("redstone_emitter")
			.itemInputs(
				"ae2:level_emitter",
				"4x minecraft:redstone",
				"ae2:logic_processor",
			)
			.itemOutputs("crazyae2addons:redstone_emitter")
			.duration(180)
			.EUt(120);

		event.recipes.gtceu
			.assembler("cpu_priority_tuner")
			.itemInputs('#ae2:quartz_wrench', "ae2:crafting_monitor")
			.itemOutputs("crazyae2addons:cpu_priority_tuner")
			.duration(180)
			.EUt(120);

		event.recipes.gtceu
			.assembler("pattern_multiplier")
			.itemInputs(
				"ae2:blank_pattern",
				"2x ae2:logic_processor",
				"2x ae2:engineering_processor",
				"minecraft:chest",
			)
			.itemOutputs("crazyae2addons:pattern_multiplier")
			.duration(180)
			.EUt(120);

		// Crazy Provider - same recipe upgrade path as extended interface -> oversized interface
		//
		// Less pattern slots per ingredient cost to compensate for convenience 
		// of a single provider
		event.recipes.gtceu
			.assembler("crazy_provider")
			.itemInputs(
				"8x expatternprovider:ex_pattern_provider",
				"8x ae2:capacity_card",
				"8x gtceu:stainless_steel_plate",
			)
			.itemOutputs('crazyae2addons:crazy_pattern_provider')
			.duration(240)
			.EUt(480);

		// Can only be used to add rows to crazy provider, not to upgrade the 
		// base pattern provider
		event
			.shapeless("crazyae2addons:crazy_upgrade", [
				"ae2:advanced_card",
				"expatternprovider:pattern_provider_upgrade",
			])
			.id("crazy_upgrade");

		event.recipes.gtceu
			.assembler("me_display_database")
			.itemInputs("6x crazyae2addons:display", "ae2:controller")
			.itemOutputs("crazyae2addons:me_display_database")
			.duration(240)
			.EUt(120);

		event.recipes.gtceu
			.assembler("ejector")
			.itemInputs(
				"ae2:pattern_provider",
				"minecraft:piston",
				"minecraft:stone_button",
			)
			.itemOutputs("crazyae2addons:ejector")
			.duration(240)
			.EUt(120);
	});

	console.log("Crazy AE2 Addons Loaded!");
}
