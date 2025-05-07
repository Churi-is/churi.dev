(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.echo = {
        name: "echo",
        description: "Print message or environment variable.",
        usage: "echo {message} / $VAR",
        manPage: "echo\n\nNAME\n    echo - display a line of text\n\nSYNOPSIS\n    echo [string ...]\n\nDESCRIPTION\n    Outputs the strings it is given as arguments. Supports environment variable expansion (e.g., $USER).",
        execute: function(args, query, displayOutput, services) {
            displayOutput(`<pre>${query.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}</pre>`);
        }
    };
})(globalThis);
