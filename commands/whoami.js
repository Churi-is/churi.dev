(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.whoami = {
        name: "whoami",
        description: "Display your user info.",
        manPage: 'whoami\n\nNAME\n    whoami - Displays the current mock username.\n\nSYNOPSIS\n    whoami\n\nDESCRIPTION\n    Prints the value of the $USER environment variable, which represents the current user in this mock terminal environment (typically "guest").',
        execute: function(args, query, displayOutput, services) {
            displayOutput(`<pre>${services.envVars.USER || 'guest'}</pre>`);
        }
    };
})(globalThis);
