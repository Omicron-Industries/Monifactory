/**
 *
 * Compatibility Script for Industrial Hellscape
 * Adds recipe for decorative blocks to GT machines and changes existing
 * recipes to use existing materials from the pack
 *
 */

if (Platform.isLoaded("industrialhellscape")) {
    console.log("Industrial Hellscape found, loading compat script...");

    ServerEvents.recipes((event) => {
        // Recipe Removal
        event.remove([
            { id: "industrialhellscape:inhell_haven_device" },
            { id: "industrialhellscape:vesselplate_from_iron_block" },
            { id: "industrialhellscape:vesselplate_from_iron_ingot" },
            { id: "industrialhellscape:strut" },
            { id: "industrialhellscape:vesselglass_from_iron_ingot" },
            { id: "industrialhellscape:rockrete_from_stone" },
            { id: "industrialhellscape:pipeworks" },
            { id: "industrialhellscape:metalworks" },
            { id: "industrialhellscape:duct" },
            { id: "industrialhellscape:furniture_kit_recipe_planks" },
            { id: "industrialhellscape:furniture_kit_recipe_log" },
            { id: "minecraft:hvac_smelt_recycle" },
            { id: "minecraft:hvac_blast_recycle" },
            { id: "minecraft:vesselplate_smelt_recycle" },
            { id: "minecraft:vesselplate_blast_recycle" },
            { id: "minecraft:strut_smelt_recycle" },
            { id: "minecraft:strut_blast_recycle" },
            { id: "minecraft:rockrete_smelt_recycle" },
            { id: "minecraft:rockrete_blast_recycle" },
        ]);

        event.recipes.gtceu
            .atomic_reconstruction("inhell_haven_device")
            .itemInputs("crafting_on_a_stick:stonecutter")
            .itemOutputs("industrialhellscape:inhell_haven_device")
            .duration(200)
            .EUt(30);

        function assembling(id, output, inputs, duration) {
            event.recipes.gtceu
                .assembler(id)
                .notConsumable(
                    InputItem.of(Item.of("industrialhellscape:inhell_haven_device")),
                )
                .itemInputs(inputs)
                .itemOutputs(output)
                .duration(duration)
                .EUt(30);
        }

        function encircle(id, output, input, duration) {
            assembling(id, output, [Item.of(input, 8)], duration);

            event
                .shaped(output, ["iii", "idi", "iii"], {
                    i: input,
                    d: "industrialhellscape:inhell_haven_device",
                })
                .keepIngredient("industrialhellscape:inhell_haven_device")
                .id(id);
        }

        function shapeless(id, output, inputs, duration) {
            assembling(id, output, inputs, duration);

            event
                .shapeless(
                    output,
                    ["industrialhellscape:inhell_haven_device"].concat(inputs),
                )
                .keepIngredient("industrialhellscape:inhell_haven_device")
                .id(id);
        }

        encircle(
            "vesselplate",
            Item.of("industrialhellscape:riveted_vesselplate_panel", 8),
            "ad_astra:iron_plating",
            25,
        );
        encircle(
            "strut",
            Item.of("industrialhellscape:strut", 32),
            "gtceu:steel_frame",
            100,
        );

        shapeless(
            "vesselglass",
            Item.of("industrialhellscape:vesselglass", 2),
            ["industrialhellscape:riveted_vesselplate_panel", "minecraft:glass"],
            20,
        );

        encircle(
            "rockrete",
            Item.of("industrialhellscape:gray_rockrete", 8),
            "#industrialhellscape:ih_recipe_stonelikes",
            25,
        );

        encircle(
            "pipeworks",
            Item.of("industrialhellscape:pipeworks", 48),
            "gtceu:copper_small_fluid_pipe",
            150,
        );
        encircle(
            "metalworks",
            Item.of("industrialhellscape:metalworks", 48),
            "gtceu:long_iron_rod",
            150,
        );

        encircle(
            "duct",
            Item.of("industrialhellscape:duct", 48),
            "gtceu:steel_small_fluid_pipe",
            150,
        );

        shapeless(
            "ihea_furniture_kit",
            Item.of("industrialhellscape:ihea_furniture_kit", 8),
            [
                "gtceu:wood_crate",
                "gtceu:iron_plate",
                "minecraft:smooth_stone",
            ],
            50,
        );
    });

    console.log("Industrial Hellscape Loaded!");
}
