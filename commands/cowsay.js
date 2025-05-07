(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.cowsay = {
        name: "cowsay",
        description: "A friendly cow says your message.",
        usage: "cowsay {message}",
        manPage: 'cowsay\n\nNAME\n    cowsay - An ASCII cow says your message.\n\nSYNOPSIS\n    cowsay {message}\n\nDESCRIPTION\n    Displays a message spoken by an ASCII art cow. If no message is provided, the cow will say "Moo?".',
        execute: function(args, query, displayOutput, services) {
            const message = query || "Moo?";
            const cow = `<pre>\n         \\   ^__^\n          \\  (oo)\\_______\n             (__)\\       )\\/\\\\\n                 ||----w |\n                 ||     ||\n</pre>`;
            displayOutput(`<pre>${message.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}</pre>${cow}`);
        }
    };
})(globalThis);
