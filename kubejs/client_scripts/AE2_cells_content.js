/**
 * Shows content of ME cells in tooltips when SHIFT is pressed. Useful to
 * see what the items or fluids are called when they take up most of your
 * cell without taking it out to a chest
 *
 * Only Item and Fluid cells are supported
 */

ItemEvents.tooltip((event) => {
    let rescale = function (num, shift, precision) {
        shift = 10 ** shift
        if (precision === 0) return Math.floor(num / shift).toString()

        let factor = 10 ** precision
        let text = (Math.floor(num / shift * factor) / factor).toString()
        // all of this because KubeJS's toFixed is broken
        let [int, frac] = text.split(".")
        if (!frac) return int
        return `${int}.${frac.slice(0, precision)}`
    }

    // Tries to immitate the AE's amounts formatting to some degree (no ~ or 1.0M)
    let formatAmount = function (num) {
        if (num < 1) return `${rescale(num, 0, 3)}`
        if (num < 10) return `${rescale(num, 0, 2)}`
        if (num < 100) return `${rescale(num, 0, 1)}`
        if (num < 1e4) return `${rescale(num, 0, 0)}`
        if (num < 1e6) return `${rescale(num, 3, 0)}K`
        if (num < 1e7) return `${rescale(num, 6, 1)}M`
        if (num < 1e9) return `${rescale(num, 6, 0)}M`
        if (num < 1e10) return `${rescale(num, 9, 1)}G`
        return `${rescale(num, 9, 3)}G`
    };

    event.addAdvanced(
        [
            /(ae2|megacells):(fluid|item)_storage_cell_\d+\w+/,
            /(ae2|megacells):portable_(fluid|item)_cell_\d+\w+/,
        ],
        (item, advanced, text) => {
            if (!event.shift) {
                text.add(1, [
                    Text.darkGray("Hold ["),
                    Text.gray("Shift"),
                    Text.darkGray("] to show contents"),
                ]);
                return;
            }
            if (
                !item.nbt ||
                !item.nbt.amts ||
                !item.nbt.keys ||
                item.nbt.amts.length === 0 ||
                item.nbt.amts.length !== item.nbt.keys.length
            ) {
                return;
            }

            let pairs = [];
            for (let i = 0; i < item.nbt.amts.length; i++) {
                pairs.push([item.nbt.keys[i], item.nbt.amts[i]]);
            }
            pairs.sort((a, b) => b[1] - a[1]);

            let amountToShow = Math.min(pairs.length, 5);
            if (event.ctrl) {
                amountToShow = pairs.length;
            }

            text.add(1, Text.gray("Contents:"));

            for (let i = 0; i < amountToShow; i++) {
                let [key, amt] = pairs[i];

                let displayAmt;
                let name;
                switch (key["#c"]) {
                case "ae2:f":
                    name = Text.join("[", Fluid.of(key.id).fluidStack.name, "]");
                    displayAmt = formatAmount(amt / 1000) + " B";
                    break;
                case "ae2:i":
                    name = Item.of(key.id).displayName;
                    displayAmt = formatAmount(amt);
                    break;
                default:
                    // Ignore other types, as they shouldn't even appear in supported cells
                    continue;
                }
                text.add(i + 2, [Text.gray(` - ${displayAmt} `), name]);
            }

            let remaining = pairs.length - amountToShow;
            if (remaining > 0) {
                text.add(amountToShow + 2, [
                    Text.gray(` And ${remaining} more (hold [`),
                    Text.white("Ctrl"),
                    Text.gray("] to show all)"),
                ]);
            }
        },
    );
});
