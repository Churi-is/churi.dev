(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.exit = {
        name: "exit",
        description: "Attempt to exit (displays a message).",
        manPage: 'exit\n\nNAME\n    exit - Displays a message about closing the terminal.\n\nSYNOPSIS\n    exit\n\nDESCRIPTION\n    In a real terminal, \'exit\' would close the session. In this web-based terminal, it prints a message reminding the user to close the browser tab or window to "exit".',
        execute: function(args, query, displayOutput, services) {
            displayOutput("<pre>You can't escape the matrix! (Just close the tab if you want to leave.)</pre>");
        }
    };
})(globalThis);
