(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.color = {
        name: "color",
        description: "Change terminal background and text colors.",
        usage: "color {bg_hex} {text_hex}",
        manPage: "color\n\nNAME\n    color - change terminal colors\n\nSYNOPSIS\n    color <bg_hex> <text_hex>\n\nDESCRIPTION\n    Sets the terminal background and text colors to the specified hex values.",
        execute: function(args, query, displayOutput, services) {
            if (args.length === 2) {
                services.window.document.documentElement.style.setProperty('--bg-color', args[0]);
                services.window.document.documentElement.style.setProperty('--text-color', args[1]);
                services.window.document.documentElement.style.setProperty('--input-color', args[1]);
                displayOutput(`<pre>Theme colors updated.</pre>`);
            } else {
                displayOutput("<pre class='error'>Usage: color {background_hex} {text_hex}</pre>");
            }
        }
    };
})(globalThis);
