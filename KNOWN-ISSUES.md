## Other Frequently Asked Questions:
See more at [FAQ.md](FAQ.md)

## Issues you may encounter while playing the game:

**Game crashes when generating a superflat world.**

Lost Cities has issues with forcing players to spawn in a Lost City, and crashes when attempting to generate a superflat. Remove the mod to generate a superflat until the issue is fixed.

**Game crashes when you disable William Wythers' Overhauled Overworld**

Monifactory tweaks Wythers' worldgen with a datapack to prevent some confusing and annoying behavior like Nether music playing in the Overworld, infrequent flower generation, and high frequency of waterlogged ore veins. Unfortunately, there is no way to conditionally load world generation datapacks so disabling or removing the mod will cause this datapack to crash your game. 

It is located in `kubejs/data/minecraft/worldgen` if you wish to remove it.

**Game crashes on MacOS or Linux**

Remove Spark and ensure you are using an ARM64 version of Java 17 or higher.

**Mod versions do not match when connecting to server ([example pictured here](https://imgur.com/GL1GdwW))**

Odds are your config doesn't match the ones on the server. Pack modes (Normal, Hard, Expert) change configs, so make sure that the client and server are on the same mode!

**"Connection Lost - Invalid player data" error message**

No cause has been identified, but the leading theory is that you may have favorited or bookmarked a recipe or item that no longer exists in EMI. Download a new instance of Monifactory from scratch, test it to ensure it works, and if so then transfer over your files in chunks while repeatedly checking to ensure the error doesn't re-occur.

**Textures are switched around**

GregTech uses dynamically generated textures - reloading resource packs may break this. Restart the game to fix it.

**EMI and/or AE2 having issues with GregTech tools**

These mods don't handle NBT or tool-based crafting perfectly all the time, so you may encounter this issue occasionally. Transition to Assemblers or other machines ASAP. Machine crafting also offers improved material efficiency over tool crafting.

**UI elements overlapping with the recipe viewer**

Switch to a lower GUI scale or tweak EMI's UI configs to your liking. Alternatively, disable EMI temporarily using Ctrl + O

**Discord Rich Presence integration doesn't match my voltage tier**

The Rich Presence integration relies on the completion of certain quests in the Progression tab to track your voltage tier. Navigate to the chapter and ensure that the quest with the Machine Hull corresponding to your tier is completed, then wait a few minutes for it to update.
Additionally, there are some reports of problems from players that use Java 22 - consider switching to Java 17 if it remains an issue.

## Other Issues with Mods
Monifactory contains multiple mods that are at different stages of completion - it is not uncommon for a bug to be caused by one of these mods instead of Monifactory specifically.

If you create a report that should go to one of these mods instead of Monifactory, then your report may be closed with no action taken. To have the best chance of solving the issue you're facing, make sure you confirm the source of the issue and make the report directly to the root cause.

If you are unsure whether a specific mod may be causing a bug, try to replicate the bug on a *new instance with only the mods necessary to re-create the issue.* If you can do this, then the bug should be reported to that mod's developers instead of those of Monifactory.

The most frequent offenders are listed below:

**Issues with [Gregtech CEu: Modern](https://github.com/GregTechCEu/GregTech-Modern)**

GTM is being actively developed. You may run into bugs, but these are addressed relatively quickly. Please ensure you aren't creating a duplicate report before notifying the devs of an issue or submitting a bug report to the Github page above.

**Issues with [LaserIO](https://github.com/Direwolf20-MC/LaserIO/issues)**

Occasionally, there can be the occasional issue or feature request you may have. Send these to LaserIO directly. 

**Issues with [EnderIO Modern](https://github.com/Team-EnderIO/EnderIO)**

EnderIO 1.20.1 is not feature complete - things may be missing, have bugs or cause crashes.
If you encounter any issues, please properly isolate the issue and submit a bug report to the Github page above.

**Issues with [AE2](https://github.com/AppliedEnergistics/Applied-Energistics-2/)**

Although bugs with AE2 are infrequent, the AE2 team has shown little inclination to address bugs on 1.20.1, so your best option is to find a workaround after submitting a bug report to the Github page above.
