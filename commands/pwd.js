(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.pwd = {
        name: "pwd",
        description: "Print working mock directory.",
        manPage: "pwd\n\nNAME\n    pwd - print name of current/working directory (mock)\n\nSYNOPSIS\n    pwd\n\nDESCRIPTION\n    Print the full filename of the current working mock directory.",
        execute: function(args, query, displayOutput, services) {
            displayOutput(`<pre>${services.currentPath()}</pre>`);
        }
    };
})(globalThis);
