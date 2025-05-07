(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.history = {
        name: "history",
        description: "Show command history.",
        manPage: "history\n\nNAME\n    history - display command history\n\nSYNOPSIS\n    history\n\nDESCRIPTION\n    Shows a list of previously executed commands.",
        execute: function(args, query, displayOutput, services) {
            const historyCmds = services.getCommandHistory();
            if (historyCmds.length > 0) {
                let historyOutput = "<pre>";
                historyCmds.forEach((cmd, index) => {
                    historyOutput += `${(index + 1).toString().padStart(3)}  ${cmd.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}\n`;
                });
                historyOutput += "</pre>";
                displayOutput(historyOutput);
            } else {
                displayOutput("<pre>No commands in history yet.</pre>");
            }
        }
    };
})(globalThis);
