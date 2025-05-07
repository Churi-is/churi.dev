(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.date = {
        name: "date",
        description: "Display current date and time.",
        manPage: 'date, time\n\nNAME\n    date, time - Displays the current date and time.\n\nSYNOPSIS\n    date\n\nDESCRIPTION\n    Shows the current system date and time, formatted according to the user\'s locale settings as provided by the browser.',
        execute: function(args, query, displayOutput, services) {
            displayOutput(`<pre>${new Date().toLocaleString()}</pre>`);
        }
    };
})(globalThis);
