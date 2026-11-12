/**
 * All deprecated items and fluids.
 * See deprecation_pipeline.js in this folder to see how the process works.
 */

/* *** TO BE REMOVED FROM THIS FILE IN MONIFACTORY 0.15 *** */

// Lumium, Signalum, Enderium, Cryolobus wires. Sculk Superconductor as a material was removed entirely.
const deprecated_thermal_wire_materials = ["lumium", "signalum", "enderium", "cryolobus"]
deprecated_thermal_wire_materials.forEach(material => {
    deprecateBlock(`gtceu:${material}_single_wire`, `4x gtceu:${material}_nugget`)
    deprecateBlock(`gtceu:${material}_double_wire`, `1x gtceu:${material}_ingot`)
    deprecateBlock(`gtceu:${material}_quadruple_wire`, `2x gtceu:${material}_ingot`)
    deprecateBlock(`gtceu:${material}_octal_wire`, `4x gtceu:${material}_ingot`)
    deprecateBlock(`gtceu:${material}_hex_wire`, `8x gtceu:${material}_ingot`)
})

/* *** TO BE REMOVED FROM THIS FILE IN MONIFACTORY 0.16 *** */

// Primal Mana
deprecateFluid("gtceu:mana", "monilabs:mana", "Primal Mana")
