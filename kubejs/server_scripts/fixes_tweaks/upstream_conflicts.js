/**
 * Fixes upstream GregTech recipe conflicts.
 */

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
            .inputFluids("gtceu:carbon_dioxide 1000", "minecraft:water 1000")
            .outputFluids("gtceu:formic_acid 1000", "gtceu:oxygen 1000")
            .duration(100)
            .EUt(GTValues.VA[GTValues.LV])
            .circuit(1);
    }
}

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
function remove_grindstone_assembler_conflict(event) {
    event.remove("gtceu:assembler/grindstone");
}

// In HM-, beehives conflict with wooden stairs, both being
// on circuit 7.
//
// Fix this by using the EM recipes across all modes.
// This *BUFFS* the HM- recipe, it previously used
// 6x planks and 3x honeycomb.
function remove_beehive_stairs_conflict(event) {
    event.recipes.gtceu
        .assembler("beehive")
        .itemInputs("2x gtceu:wood_screw", "5x #minecraft:planks")
        .itemOutputs("minecraft:beehive")
        .circuit(2)
        .duration(100)
        .EUt(4);
}

// Fix the conflict in assemblers between ladders and grindstones.
// This is only relevant for HM- I think, because it relies on
// doHarderMiscRecipes being off, but I think it's fine to nuke this
// recipe in EM as well, because... who uses ladders. Also for reasons
// I can't figure out (also upstream GTM maybe?) there's a great
// tool-less crafting table recipe for ladders in EM anyway.
function remove_ladder_grindstone_conflict(event) {
    event.remove("gtceu:assembler/ladder");
}

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
        "gtceu:cutter/stone_button": "gtceu:cutter/cut_stoneslab_into_button",
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
        const recipe_to_remove = good_to_bad_button_recipe[good_recipe["id"]];
        // This seems to be a hashmap check instead of an iteration
        // over all the recipes, so should be efficient enough.
        // https://github.com/kube-mods/kubejs/blob/ba142541dcc1d230383f4a55e38dd92ff10d1029/common/src/main/java/dev/latvian/mods/kubejs/recipe/RecipesEventJS.java#L578
        if (recipe_to_remove !== undefined) {
            event.remove({ id: recipe_to_remove });
        }
    });
}
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
            .itemInputs("#forge:chests/wooden", `5x gtceu:${material}_plate`)
            .itemOutputs("minecraft:hopper")
            .duration(800)
            .EUt(2)
            .circuit(1);
    }
}

ServerEvents.recipes((event) => {
    remove_formic_acid_conflict(event);
    remove_grindstone_assembler_conflict(event);
    remove_ladder_grindstone_conflict(event);
    remove_button_cutting_conflict(event);
    remove_hopper_conflict(event);
});
