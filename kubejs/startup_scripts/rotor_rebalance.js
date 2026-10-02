/*
 * Rebalance turbine power and fuel efficiency across the board to pair with durability being mixin'd out of existence.
 */
const $RotorProperty = Java.loadClass("com.gregtechceu.gtceu.api.data.chemical.material.properties.RotorProperty")
const $MoniMaterials = Java.loadClass("net.neganote.monilabs.common.data.materials.MoniMaterials")

GTCEuStartupEvents.materialModification(event => {
    // Existing rotors
    GTMaterials.Ultimet.getProperty(PropertyKey.ROTOR).setPower(150)                // nerf from 160
    GTMaterials.Osmiridium.getProperty(PropertyKey.ROTOR).setEfficiency(250)        // buff from 130
    GTMaterials.Osmiridium.getProperty(PropertyKey.ROTOR).setPower(180)             // buff from 130
    GTMaterials.Naquadah.getProperty(PropertyKey.ROTOR).setPower(300)               // buff from 160
    GTMaterials.RhodiumPlatedPalladium.getProperty(PropertyKey.ROTOR).setEfficiency(220)    // buff from 155
    GTMaterials.NaquadahAlloy.getProperty(PropertyKey.ROTOR).setPower(320)          // buff from 190
    GTMaterials.TungstenSteel.getProperty(PropertyKey.ROTOR).setPower(200)          // buff from 160
    GTMaterials.Osmium.getProperty(PropertyKey.ROTOR).setPower(180)                 // buff from 160

    // New turbine rotors from existing GT Materials
    let DarmstadtiumTurbineProperty = new $RotorProperty(300, 200, 7.0, 10240)
    GTMaterials.Darmstadtium.setProperty(PropertyKey.ROTOR, DarmstadtiumTurbineProperty)

    let CrystalMatrixTurbineProperty = new $RotorProperty(220, 270, 6.0, 10240)
    $MoniMaterials.CrystalMatrix.setProperty(PropertyKey.ROTOR, CrystalMatrixTurbineProperty)
})
