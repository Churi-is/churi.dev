(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.epoch = {
        name: "epoch",
        description: "Convert Unix epoch time.",
        usage: "epoch [timestamp|now|YYYY-MM-DDTHH:mm:ssZ]",
        manPage: 'epoch\n\nNAME\n    epoch - Converts between Unix epoch time and human-readable dates.\n\nSYNOPSIS\n    epoch [timestamp | "now" | YYYY-MM-DDTHH:mm:ssZ]\n\nDESCRIPTION\n    If given a Unix timestamp (seconds or milliseconds), converts it to an ISO 8601 date string. If given "now", displays the current epoch time and its ISO string. If given an ISO date string, converts it to epoch time. Helps with time conversions common in programming.',
        execute: function(args, query, displayOutput, services) {
            if (!args[0] || args[0].toLowerCase() === 'now') {
                displayOutput(`<pre>Current Epoch: ${Math.floor(Date.now() / 1000)}\nHuman: ${new Date().toISOString()}</pre>`);
            } else {
                const input = args[0];
                if (!isNaN(input)) { 
                    const ts = parseInt(input);
                    const date = new Date(ts * (input.length > 10 ? 1 : 1000)); // Auto-detect s or ms
                    displayOutput(`<pre>Epoch ${ts} is: ${date.toISOString()}</pre>`);
                } else { 
                    try {
                        const date = new Date(input);
                        if (isNaN(date.getTime())) throw new Error("Invalid date string");
                        displayOutput(`<pre>Date ${date.toISOString()} is Epoch: ${Math.floor(date.getTime() / 1000)}</pre>`);
                    } catch (e) {
                        displayOutput(`<pre class='error'>Invalid input. Use 'epoch now', a timestamp, or a valid date string (e.g., YYYY-MM-DDTHH:mm:ssZ).</pre>`);
                    }
                }
            }
        }
    };
})(globalThis);
