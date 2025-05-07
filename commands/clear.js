(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.clear = {
        name: "clear",
        description: "Clear the terminal screen.",
        manPage: 'clear, cls\n\nNAME\n    clear, cls - Clears the terminal screen.\n\nSYNOPSIS\n    clear\n\nDESCRIPTION\n    Removes all previous output from the terminal display, providing a clean screen. The command history is not affected.',
        execute: function(args, query, displayOutput, services) {
            services.outputDiv.innerHTML = '';
        }
    };
})(globalThis);
