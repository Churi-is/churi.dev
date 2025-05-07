(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.theme = {
        name: "theme",
        description: "Change theme (default, matrix, light).",
        usage: "theme {preset_name}",
        manPage: "theme\n\nNAME\n    theme - change terminal theme\n\nSYNOPSIS\n    theme [preset_name]\n\nDESCRIPTION\n    Changes the terminal's color scheme to a predefined preset.\n    Available presets: default, matrix, light.",
        execute: function(args, query, displayOutput, services) {
            const availableThemes = services.themes();
            if (args[0] && availableThemes[args[0].toLowerCase()]) {
                const selectedTheme = availableThemes[args[0].toLowerCase()];
                for (const prop in selectedTheme) {
                    services.window.document.documentElement.style.setProperty(prop, selectedTheme[prop]);
                }
                displayOutput(`<pre>Theme set to '${args[0]}'.</pre>`);
            } else {
                displayOutput(`<pre class='error'>Usage: theme {preset_name}. Available: ${Object.keys(availableThemes).join(', ')}</pre>`);
            }
        }
    };
})(globalThis);
