(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    // Fortunes will be defined in launcher.html globally, or passed via services if preferred
    const localFortunes = [ // Keep a local copy if not passed via services
        "You will find a bushel of gold.", "The journey of a thousand miles begins with a single step.",
        "Good news will come to you by mail.", "You will be successful in your work.",
        "A pleasant surprise is waiting for you.", "You are talented in many ways.",
        "Never give up. Always find a reason to keep trying.", "The best way to predict the future is to create it.",
        "You will make a new friend today.", "An exciting opportunity lies ahead of you."
    ];

    globalContext.FoxTermCommands.fortune = {
        name: "fortune",
        description: "Display a random fortune.",
        manPage: 'fortune\n\nNAME\n    fortune - Displays a random aphorism or piece of wisdom.\n\nSYNOPSIS\n    fortune\n\nDESCRIPTION\n    Prints a randomly selected "fortune cookie" style message to the terminal. The fortunes are pre-defined within the terminal\'s source.',
        execute: function(args, query, displayOutput, services) {
            const fortunesToUse = (services.fortunes && services.fortunes()) || localFortunes;
            displayOutput(`<pre>${fortunesToUse[Math.floor(Math.random() * fortunesToUse.length)]}</pre>`);
        }
    };
})(globalThis);
