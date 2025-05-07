(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.resetstorage = {
        name: "resetstorage",
        description: "Clears all saved FoxTerm data (history, aliases, env vars, theme, path) from local storage.",
        manPage: "resetstorage\n\nNAME\n    resetstorage - Clears all FoxTerm data from local storage.\n\nSYNOPSIS\n    resetstorage\n\nDESCRIPTION\n    Removes all data saved by FoxTerm in the browser's local storage. This includes command history, aliases, environment variables, the selected theme, and the current path. The terminal will revert to its default state on the next reload.",
        execute: function(args, query, displayOutput, services) {
            if (services.FoxTermUtils && services.FoxTermUtils.storage) {
                const clearedItems = services.FoxTermUtils.storage.clearAllFoxTermStorage();
                if (clearedItems.length > 0) {
                    displayOutput(`<pre class="success">Cleared the following FoxTerm data from local storage:\n${clearedItems.join('\n')}\nPlease reload the page for changes to take full effect.</pre>`);
                } else {
                    displayOutput("<pre>No FoxTerm data found in local storage to clear.</pre>");
                }
            } else {
                displayOutput("<pre class='error'>Storage utility not available.</pre>");
            }
        }
    };
})(globalThis);
