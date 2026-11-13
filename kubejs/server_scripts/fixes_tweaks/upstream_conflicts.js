/**
 * Fixes upstream GregTech recipe conflicts.
 */

// Using functions for isolated fixes makes sure to keep the scopes separate,
// as KubeJS does not seem to like regular JS scopes.
//
// Defining an array of functions (as opposed to just defining the functions
// and then calling them individually in the recipes below) guarantees that
// we won't accidentally forget calling a fix function.
const fixes = [
    // Fix the conflict between a formic acid and sodium bicarbonate recipe.
    // This fixes the upstream GTM issue "Recipe conflict between Formic Acid
    // and Sodium Bicarbonate Dust":
    // https://github.com/GregTechCEu/GregTech-Modern/issues/4823
    //
    // The fix we employ here is to simply add a circuit 1 to formic acid.
    //
    // This conflict only exists in Normal Mode, as Hard Mode+ changes the
    // recipe in ../_hardmode/platline.js.
    function remove_formic_acid_conflict(event) {
        if (!doHarderProcessing) {
            event.recipes.gtceu
                .chemical_reactor("formic_acid")
                .inputFluids(
                    "gtceu:carbon_dioxide 1000",
                    "minecraft:water 1000",
                )
                .outputFluids("gtceu:formic_acid 1000", "gtceu:oxygen 1000")
                .duration(100)
                .EUt(GTValues.VA[GTValues.LV])
                .circuit(1);
        }
    },

    // There is a conflict between grindstones and stonecutters in an
    // assemblers in EM. See:
    // https://github.com/GregTechCEu/GregTech-Modern/issues/5641
    //
    // This problem only appears in EM, so a fix that is conditional on
    // EM would be nice, however that's annoying (see the way we removed
    // button recipes in another function of this file). We solve this
    // problem by ignoring it: Grindstones aren't really needed for
    // anything except maybe building. Hopefully upstream fixes this
    // eventually, this is not an ideal solution.
    //
    // Incidentally, this also fixes weak conflicts between ladders
    // and grindstones, and wood stairs and grindstones.
    function remove_grindstone_assembler_conflict(event) {
        event.remove("gtceu:assembler/grindstone");
    },

    // In HM-, wooden stairs conflict with beehives, fletching tables,
    // cartography tables, and smithing tables, all of them being
    // circuit 7 and using wooden planks.
    //
    // Fix this by using the EM recipes across all modes for everything
    // except smithing tables, which:
    // - BUFFS the HM- beehive recipe
    // - Slightly buffs fletching and cartography table in HM- I guess
    //
    // The EM smithing table recipe is annoying, so I'll just make up
    // a new one across all modes that's decent enough.
    function remove_beehive_stairs_conflict(event) {
        event.recipes.gtceu
            .assembler("beehive")
            .itemInputs("2x gtceu:wood_screw", "5x #minecraft:planks")
            .itemOutputs("minecraft:beehive")
            .circuit(2)
            .duration(100)
            .EUt(4);
        event.recipes.gtceu
            .assembler("fletching_table")
            .itemInputs("minecraft:feather", "#minecraft:logs")
            .itemOutputs("minecraft:fletching_table")
            .duration(80)
            .EUt(6); // No Circuit
        event.recipes.gtceu
            .assembler("cartography_table")
            .itemInputs("minecraft:paper", "#minecraft:logs")
            .itemOutputs("minecraft:cartography_table")
            .duration(80)
            .EUt(6); // No Circuit
        event.recipes.gtceu
            .assembler("smithing_table")
            .itemInputs("3x gtceu:wrought_iron_plate", "#minecraft:logs")
            .itemOutputs("minecraft:smithing_table")
            .duration(80)
            .EUt(6); // No Circuit
    },

    // In HM-, there's a recipe conflict between crafting table and
    // signs, both on circuit 4 and using planks. Unfortunately,
    // there are no good circuit frequencies to assign the recipe to.
    //
    // We instead use any log on circuit 1.
    function remove_craftingtable_sign_conflict(event) {
        event.recipes.gtceu
            .assembler("crafting_table")
            .itemInputs("#minecraft:logs")
            .circuit(1)
            .itemOutputs("minecraft:crafting_table")
            .duration(80)
            .EUt(6);
    },

    // Fix the conflict that gives you fewer buttons in EM than you're
    // supposed to get, when cutting stone pressure plates.
    // https://github.com/GregTechCEu/GregTech-Modern/issues/5221
    //
    // This one is annoying to fix, because it only appears in EM due to
    // a GT config. Instead of relying on packmode and risking drift,
    // we'll instead check if the better EM stone button recipes exist,
    // and if they do, remove the bad NM stone button recipes.
    function remove_button_cutting_conflict(event) {
        // To that end, we execute `find_recipes` once. Doing this, instead
        // of, say, `count_recipes` for each of the stone types individually,
        // we end up only needing to iterate over the list of recipes once,
        // which is more efficient.
        //
        // Could be fancy and do this with some array funprog magic,
        // but this is more readable.
        const good_to_bad_button_recipe = {
            "gtceu:cutter/blackstone_button":
                "gtceu:cutter/cut_polished_blackstoneslab_into_button",
            "gtceu:cutter/blackstone_button_distilled_water":
                "gtceu:cutter/cut_polished_blackstoneslab_into_button_distilled_water",
            "gtceu:cutter/blackstone_button_water":
                "gtceu:cutter/cut_polished_blackstoneslab_into_button_water",
            "gtceu:cutter/stone_button":
                "gtceu:cutter/cut_stoneslab_into_button",
            "gtceu:cutter/stone_button_distilled_water":
                "gtceu:cutter/cut_stoneslab_into_button_distilled_water",
            "gtceu:cutter/stone_button_water":
                "gtceu:cutter/cut_stoneslab_into_button_water",
        };
        const good_recipes = event.findRecipes(
            Object.keys(good_to_bad_button_recipe).map((str) => {
                return {
                    id: str,
                };
            }),
        );
        good_recipes.forEach((good_recipe) => {
            const recipe_to_remove =
                good_to_bad_button_recipe[good_recipe["id"]];
            // This seems to be a hashmap check instead of an iteration
            // over all the recipes, so should be efficient enough.
            // https://github.com/kube-mods/kubejs/blob/ba142541dcc1d230383f4a55e38dd92ff10d1029/common/src/main/java/dev/latvian/mods/kubejs/recipe/RecipesEventJS.java#L578
            if (recipe_to_remove !== undefined) {
                event.remove({ id: recipe_to_remove });
            }
        });
    },
    // Fix the conflict between assembler hopper and storage cover recipe.
    // This fixes the upstream GTM issue "Recipe conflict between Hopper
    // and Storage Cover":
    // https://github.com/GregTechCEu/GregTech-Modern/issues/5523
    //
    // The fix we employ here is to simply add a circuit 1 to the iron
    // hopper recipe. For consistency, we also change the wrought iron hopper
    // recipe, though that recipe didn't have any conflicts to begin with.
    function remove_hopper_conflict(event) {
        for (const material of ["iron", "wrought_iron"]) {
            event.recipes.gtceu
                .assembler(`hopper_${material}`)
                .itemInputs(
                    "#forge:chests/wooden",
                    `5x gtceu:${material}_plate`,
                )
                .itemOutputs("minecraft:hopper")
                .duration(800)
                .EUt(2)
                .circuit(1);
        }
    },
];

ServerEvents.recipes((event) => {
    fixes.forEach((fn) => fn(event));
});
