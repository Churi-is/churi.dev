(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.calc = {
        name: "calc",
        description: "Simple calculator (e.g., calc 2 * (3+4)).",
        usage: "calc {mathematical_expression}",
        manPage: 'calc\n\nNAME\n    calc - Evaluates a simple mathematical expression.\n\nSYNOPSIS\n    calc {expression}\n\nDESCRIPTION\n    Performs basic arithmetic calculations. Supports numbers, parentheses, and the operators +, -, *, /. For example, \'calc 2 * (3+4)\'. Uses JavaScript\'s Function constructor for evaluation after some sanitization.',
        execute: function(args, query, displayOutput, services) {
            if (!query) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            try {
                const sanitizedQuery = query.replace(/[^0-9\.\+\-\*\/\(\)\seE]/g, '');
                if (sanitizedQuery !== query) {
                    displayOutput("<pre class='warning'>Warning: Invalid characters removed from expression.</pre>");
                }
                if (!sanitizedQuery.trim()) throw new Error("Empty expression after sanitization.");
                const result = new Function('return ' + sanitizedQuery)();
                displayOutput(`<pre>${query} = ${result}</pre>`);
            } catch (e) {
                displayOutput(`<pre class='error'>Error calculating: ${e.message}</pre>`);
            }
        }
    };
})(globalThis);
