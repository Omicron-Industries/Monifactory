/**
 * Re-tiers the WEB Hub and WEB Receiver to late LuV - script 1 of 2.
 * - Replaces the neutronium frames with europium frames and naquadah alloy frames with naquadah frames.
 */

let WEBHubMachine = Java.loadClass("net.neganote.gtutilities.common.machine.multiblock.WEBHubMachine")
let WEBReceiverMachine = Java.loadClass("net.neganote.gtutilities.common.machine.multiblock.WEBReceiverMachine")
let GTMemoizer = Java.loadClass("com.gregtechceu.gtceu.utils.memoization.GTMemoizer")

StartupEvents.postInit(event => {
    let UtilMachines = Java.loadClass("net.neganote.gtutilities.common.machine.UtilMachines");
    let web_hub_pattern = (definition) => FactoryBlockPattern.start()
        .aisle("###XXX###", "####F####", "#########", "####H####", "####H####", "####H####", "####H####", "####H####")
        .aisle("#XXXXXXX#", "###FHF###", "####H####", "####H####", "####H####", "####F####", "#########", "#########")
        .aisle("#XXHHHXX#", "#########", "#########", "#########", "####F####", "####F####", "#########", "#########")
        .aisle("XXHHHHHXX", "#F#####F#", "#########", "####S####", "###SSS###", "###SSS###", "###S#S###", "#########")
        .aisle("XXHHHHHXX", "FH##H##HF", "#H##C##H#", "HH#SSS#HH", "HHFSSSFHH", "HFFSSSFFH", "H#######H", "H#######H")
        .aisle("XXHHHHHXX", "#F#####F#", "#########", "####S####", "###SSS###", "###SSS###", "###S#S###", "#########")
        .aisle("#XXHHHXX#", "#########", "#########", "#########", "####F####", "####F####", "#########", "#########")
        .aisle("#XXXXXXX#", "###FHF###", "####H####", "####H####", "####H####", "####F####", "#########", "#########")
        .aisle("###XXX###", "####F####", "#########", "####H####", "####H####", "####H####", "####H####", "####H####")
        .where("#", Predicates.any())
        .where("X", Predicates.blocks("gtceu:palladium_substation").setMinGlobalLimited(30).or(WEBHubMachine.getHatchPredicates()))
        .where("S", Predicates.blocks("gtceu:superconducting_coil"))
        .where("H", Predicates.blocks("gtceu:high_power_casing"))
        .where("C", Predicates.controller(Predicates.blocks(UtilMachines.WEB_HUB.getBlock())))
        .where("F", Predicates.frames(GTMaterials.Europium))
        .build()
    UtilMachines.WEB_HUB.setPatternFactory(GTMemoizer["memoize(java.util.function.Supplier)"](() => web_hub_pattern.apply(UtilMachines.WEB_HUB)));

    let web_receiver_pattern = (definition) => FactoryBlockPattern.start()
        .aisle("abbba", "aabaa", "aaaaa", "aaaaa", "aaaaa", "aacaa", "aacaa", "aadaa")
        .aisle("bbbbb", "abdba", "aacaa", "aaaaa", "aaaaa", "aacaa", "aaaaa", "aaaaa")
        .aisle("bbbbb", "bdddb", "acdca", "aadaa", "aadaa", "ccdcc", "cadac", "daaad")
        .aisle("bbbbb", "abdba", "aacaa", "aaaaa", "aaaaa", "aacaa", "aaaaa", "aaaaa")
        .aisle("abeba", "aabaa", "aaaaa", "aaaaa", "aaaaa", "aacaa", "aacaa", "aadaa")
        .where("a", Predicates.any())
        .where("b", Predicates.blocks("gtceu:high_power_casing").setMinGlobalLimited(12).or(WEBReceiverMachine.getHatchPredicates()))
        .where("d", Predicates.blocks("gtceu:superconducting_coil"))
        .where("e", Predicates.controller(Predicates.blocks(UtilMachines.WEB_RECEIVER.getBlock())))
        .where("c", Predicates.frames(GTMaterials.Naquadah))
        .build()
    UtilMachines.WEB_RECEIVER.setPatternFactory(GTMemoizer["memoize(java.util.function.Supplier)"](() => web_receiver_pattern.apply(UtilMachines.WEB_RECEIVER)));
})
