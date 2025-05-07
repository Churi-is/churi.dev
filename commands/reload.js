(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.reload = {
        name: "reload",
        description: "Reloads the page.",
        manPage: 'reload, refresh\n\nNAME\n    reload, refresh - Reloads the current terminal page.\n\nSYNOPSIS\n    reload\n\nDESCRIPTION\n    Refreshes the entire web page, effectively restarting the terminal session. Useful if the terminal becomes unresponsive or to apply certain changes.',
        execute: function(args, query, displayOutput, services) {
            displayOutput("<pre>Reloading page...</pre>");
            setTimeout(() => services.window.location.reload(), 500);
        }
    };
})(globalThis);
