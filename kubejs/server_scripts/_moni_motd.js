/**
 * Welcome message sent to players on join
 */
PlayerEvents.loggedIn(event => {
    event.player.tell(["Welcome to ", Text.blue("Monifactory Beta"), ` on ${capitalize(`${global.packmode}`)} mode.`]); // force recast to string
    event.player.tell(["Report pack issues to ", Text
        .blue("the Github").underlined()
        .clickOpenUrl("https://github.com/Omicron-Industries/Monifactory")
        .hover("Click to open"), "."
    ]);
})
