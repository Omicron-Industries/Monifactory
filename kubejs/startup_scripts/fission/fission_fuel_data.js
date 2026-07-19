// priority: 1
/**
 * Data/configuration for fission fuels used in other scripts.
 */
/**
 * TODO: Determine how to integrate Americium (and optionally, Cm & Nq+ & Nq*) into fuel selection.
 * Neither isotope of Americium worth considering (241 and 243) are fissile.
 * They both require multiple neutron captures as fertile fuel,
 * which results in a net-negative neutron economy.
 *
 * Perhaps Americium could act as a more viable 'fertile' fuel for Naquadah isotopes,
 * which are presumably highly radioactive?
 * Otherwise, they would be interesting to have as breeder blanket targets for Curium.
 */
/**
 * Despite the definitions in GTM's GTElements.java:
 * 'Thorium' is considered to be Th-232.
 * 'Neptunium' is considered to be Np-237.
 * 'Americium' is considered to be Am-243.
 */
/**
 * Other data is in server_scripts/phoenix_fission.js
 * @type {{identifier: string, category: string, baseHeat: number, depletionTime: number, enrichment:Boolean}[]}
 */
const fission_fuels = [
    {identifier: "tbu", category: "thorium", baseHeat: 30, depletionTime: 300, enrichment: false},
    {identifier: "235", category: "uranium", baseHeat: 50, depletionTime: 240, enrichment: true},
    {identifier: "233", category: "uranium", baseHeat: 55, depletionTime: 230, enrichment: true},
    {identifier: "mix_237", category: "neptunium", baseHeat: 40, depletionTime: 200, enrichment: false},
    {identifier: "239", category: "plutonium", baseHeat: 60, depletionTime: 200, enrichment: true},
    {identifier: "241", category: "plutonium", baseHeat: 70, depletionTime: 160, enrichment: true},
]
