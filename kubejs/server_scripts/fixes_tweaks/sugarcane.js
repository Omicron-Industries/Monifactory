/**
 * Under Minecraft's chunk loading system,
 * chunks at ticket level 32 are called "Block Ticking" or "Lazy Loaded".
 * Item entities spawned in these chunks never tick:
 * no gravity, no merge, no despawn, no collection.
 * They pile up until a player arrives and the server
 * tries to tick all of them at once.
 * This code prevents item entites under these conditions
 * from spawning upon an attempt being made to spawn one.
 *
 * No attempts are made to delete items that spawn in an entity ticking chunk,
 * but later get moved to a lazy-loaded chunk because:
 * 1. They will have already been collected into stacks
 * 2. By virtue of their having already been in a entity ticking chunk,
 *  it shows that the server can handle as many items as there were.
 * 3. No additional items can build up in this lazy-loaded area
 *  without triggering the event handler below.
 *
 * Written with Claude Code, shared by Mavalle, modified by Xefyr
 */

// Item entities that can be farmed with Snad, having the highest risk of causing this issue
const WATCH = [
    "minecraft:sugar_cane",
    "minecraft:cactus",
    "minecraft:bamboo",
    "minecraft:kelp",
]

const seen = {}

EntityEvents.spawned(event => {
    // Only affect items
    const e = event.entity
    if (e.type !== "minecraft:item") return

    // Only affect entities on the watchlist
    const id = e.item.id
    if (WATCH.indexOf(id) === -1) return

    // Filter out ticking entities (these will collect and despawn eventually)
    const pos = e.blockPosition()
    if (e.level.isPositionEntityTicking(pos)) return

    // Right-shift operator truncates floats to integers in Javascript
    const key = (pos.x >> 4) + "," + (pos.z >> 4)

    // Log a warning to the console when a lazy-loaded item entity matching the watchlist is deleted from a new chunk
    if (!seen[key]) {
        seen[key] = true
        console.warn(
            "[LazyItems] Item " + id + " spawned in lazy-loaded chunk and was deleted for lag mitigation. " +
            "Coordinates x=" + pos.x + ", y=" + pos.y + ", z=" + pos.z + ". " +
            "Further items of this type spawned in this 'lazy loaded' chunk will be deleted as well. " +
            "If you have a Snad farm there, consider force-loading the chunk and adjacent chunks."
        )
    }

    event.cancel()
})
