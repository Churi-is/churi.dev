(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.banner = {
        name: "banner",
        description: "Display text as a simple banner.",
        usage: "banner {text}",
        manPage: 'banner\n\nNAME\n    banner - Displays text as a simple, centered banner.\n\nSYNOPSIS\n    banner {text}\n\nDESCRIPTION\n    Takes the input text, converts it to uppercase, and displays it centered within a line of \'=\' characters, creating a basic banner effect.',
        execute: function(args, query, displayOutput, services) {
            if (!query) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            const bannerText = query.toUpperCase();
            const lineLength = 30;
            // Pad to center within lineLength
            const padding = Math.max(0, Math.floor((lineLength - bannerText.length) / 2));
            const centeredText = " ".repeat(padding) + bannerText.split('').join(' ') + " ".repeat(padding);

            displayOutput(`<pre>\n==============================\n${centeredText.substring(0, lineLength)}\n==============================\n</pre>`);
        }
    };
})(globalThis);
