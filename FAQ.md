# Frequently Asked Questions

## General

### About Monifactory

**Q. How "finished" is Monifactory?**

The main path of progression is fully playable - multiple groups have obtained the Creative Chest in Normal Mode.

**Q. Is Monifactory still being updated?**

Refer to the `main` branch of the repository on Github. The latest commit is an indicator of the last time a contribution to the modpack has been made.

**Q. What's the difference between Monifactory and Nomifactory CEu?**

A comprehensive list of changes can be found [here](CHANGELOG.md).

**Q. Can my PC run Monifactory? What are the system requirements?**

Monifactory should run on most hardware/operating system combinations made in the past 5-10 years, provided that the combination is capable of running vanilla Minecraft.
Minecraft's system requirements can be found [here](https://www.minecraft.net/en-us/store/minecraft-deluxe-collection-pc?tabs=%7B%22details%22%3A1%7D#accordionv1-b6c8df09da-item-7739893325:~:text=Java%20System%20Requirements).<br>
Allocating 6GB RAM or higher is recommended for both servers and singleplayer.
That said, you should leave at least 2GB RAM for system processes.
As such, if your computer has less than 8GB RAM total then Monifactory may not run on it.

**Q. Can I play Monifactory on Peaceful mode?**

Yes! Peaceful mode is the intended playstyle for Monifactory. Playing with mobs and hunger do not have any additional benefits in Moni, and all mob drops are attainable early through other methods.

**Q. Can I port my Nomifactory world to Monifactory?**

For all intents and purposes, No. Loading the 1.12 world in 1.20.1 Monifactory *does* load vanilla Minecraft items and blocks and some GT ores properly, but it voids every other modded item or block - you will essentially be sent back to the stone age.

**Q. Will Monifactory be ported to 'X' Minecraft version?**

Monifactory will not be backported to any versions before 1.20.1. Porting the pack to a future version of Minecraft may or may not happen, but **do not ask or pester the devs**.

**Q. Will Monifactory be ported to Fabric?**

Monifactory will not be ported to Fabric. Some mods necessary to the modpack are not available on Fabric, so a port to Fabric is not an option.

**Q. Will Monifactory be released on Modrinth?**

Monifactory will not be released on Modrinth. Some mods necessary to the modpack are not available on Modrinth, so releasing on their platform is not an option.

**Q. Is Create in the modpack?**

No, Create is not in Monifactory by default. There is a compatibility script for it as described in the README.

**Q. Are Lithium and Sodium in the modpack?**

No, but we have their respective port and fork, Radium and Embeddium.

**Q. Does the modpack come with shaders?**

Not by default. Oculus is included to load your shaders of choice, however.

**Q. Can you add \[X\] mod to Monifactory?**

Create a feature request on the GitHub for the mod to be considered.

**Q. Can I add \[X\] mod to my instance of Monifactory?**

By default, Monifactory only supports the mods included with it, and has *optional compat* for various mods, such as Create. While it is your prerogative to alter the pack as you desire, any mods added to the pack may break progression and/or deviate from the intended experience. Support will not be provided for bugs related to mods not shipped with the pack.

<hr>

## How Do I...?

**Q. How do I download Monifactory?**

Stable releases of Monifactory can be downloaded from CurseForge using any launcher of your choice (PrismLauncher, CurseForge, etc.)
Bleeding edge builds can be found [here](https://github.com/Omicron-Industries/Monifactory/releases).

**Q. How do I play Hard Mode/Expert Mode?**

[Instructions can be found here](https://github.com/Omicron-Industries/Monifactory?tab=readme-ov-file#hardexpert-mode-installation)

**Q. How do I update the modpack?**
*Make a backup first.*
Many players have faced difficulties trying to update using their launcher.
As such, doing so is no longer recommended.

Instead:
1. Download an entirely new copy of Monifactory
2. Copy the following folders from your old instance of Monifactory to the new instance:
    `backups`
    `journeymap`
    `saves`
    `schematics` (if you have any)
    `shaderpacks` (if you have any)
    `emi.json`
    `options.txt`
    `emi.css` (located in `\config\`)
3. Replace the contents of your world's `serverconfig` folder with the contents of the `defaultconfigs` folder in the pack's root directory.
4. Adjust the pack mode of the new instance, if needed (Instructions above)

**Q. How do I add optional compat mods?**

[Instructions can be found here](https://github.com/Omicron-Industries/Monifactory?tab=readme-ov-file#Addon-Mods-AKA-Optional-Compats)

**Q. How do I setup a dedicated multiplayer server?**

[Instructions can be found here](https://github.com/Omicron-Industries/Monifactory?tab=readme-ov-file#dedicated-server-installation)

**Q. How do I get old Gregtech textures?**

For the old Gregtech textures, look into [Threefold's Modern GregTech](https://modrinth.com/resourcepack/threefolds-modern-gregtech) or [GregTech CEu Modern Programmer Art](https://www.curseforge.com/minecraft/texture-packs/gtceu-programmer-art).

**Q. How do I remove the urban ruins around my spawn?**

Lost Cities generates those ruins. To disable them, it is easiest to remove the mod entirely.

## Help Section

**Q. Where are the quests in the Questbook?**

You have installed or updated the modpack incorrectly. Refer to the installation instructions above.

**A quest is not showing as completed?!?**

Check all dependencies and ensure they are completed with a green checkmark. Some dependencies may not be on the same quest page or may not be connected with a line.
If that does not work, then go into edit mode by changing the game mode to Creative, then clicking the pencil in the bottom right of the quest UI. In edit mode, you can right-click a quest and select "Complete Instantly".

**Q. I can't light my Nether portal?!?**

In Monifactory, both the Nether and End portals are disabled.
TelePastries' cakes are used to move between dimensions instead.

**KubeJS errors found!**

You have installed or updated the modpack incorrectly. Refer to the installation instructions above.

**Q. What happened to Ender IO?!?**
Support for Ender IO in 1.20.1 has discontinued despite some major aspects of the mod being left in a buggy state. As such, those portions of the mod have been removed so as to not confuse or irritate players.

**Q. My Cleanroom isn't forming!**

The entire top layer except the controller, edges & corners needs to be made of Cleanroom Filter Casings. The multi also needs an energy hatch and a maintenance hatch.

**Q. Why is my UI so dark?**

DarkModeEverywhere is enabled by default, and makes your UI darker (duh). You can switch colors using the button in the bottom left of your inventory screen, or on the main menu

**Q. My dynamo isn't outputting energy?**

Thermal Expansion Dynamos will only output energy while producing it.

### Servers

**Q. How do I update Monifactory on my server?**

In your server directory delete config-overrides, config, defaultconfig, kubejs, and mods. Then from the new Monifactory server zip copy over those same directories to replace the ones you removed. Enjoy!

<!--- Essential PSA, I've commented this out for now. Feel free to edit/uncomment

**Q. Does Monifactory support Essential world hosting?**

Essential is not officially supported, and various unsupported bugs and crashes may arise from hosting using it. Support will not be provided for these -->

### Other Issues

**Q. Where do I report an issue?**

Check the [Known Issues document](KNOWN-ISSUES.md) first. If it's not there, report it to the [issue tracker](https://github.com/Omicron-Industries/Monifactory/issues), or get help on the [Discord](https://discord.gg/4jch9Rs2Cq) in the #moni-help channel

<hr>

## Contributing to Monifactory

See more at [CONTRIBUTING.md](CONTRIBUTING.md)
