(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.currency = {
        name: "currency",
        description: "Convert currency (e.g., currency 10 USD EUR).",
        usage: "currency {amount} {FROM_CURRENCY} {TO_CURRENCY}",
        manPage: 'currency\n\nNAME\n    currency - Converts amounts between different currencies.\n\nSYNOPSIS\n    currency {amount} {FROM_CURRENCY_CODE} {TO_CURRENCY_CODE}\n\nDESCRIPTION\n    Fetches real-time exchange rates from an external API to convert a specified amount from one currency to another (e.g., \'currency 10 USD EUR\'). Requires an internet connection.',
        execute: function(args, query, displayOutput, services) {
            if (args.length < 3) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            const amount = parseFloat(args[0]);
            const fromCurr = args[1].toUpperCase();
            const toCurr = args[2].toUpperCase();
            if (isNaN(amount)) { displayOutput("<pre class='error'>Invalid amount.</pre>"); return; }
            
            displayOutput(`<pre>Fetching exchange rates for ${fromCurr} to ${toCurr}...</pre>`);
            services.fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr}`)
                .then(response => {
                    if (!response.ok) throw new Error(`API error: ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    if (data.result === "error" || data.error) throw new Error(`API specific error: ${data['error-type'] || data.error.info}`);
                    const rate = data.rates[toCurr];
                    if (rate) {
                        const convertedAmount = (amount * rate).toFixed(2);
                        displayOutput(`<pre>${amount} ${fromCurr} = ${convertedAmount} ${toCurr} (Rate: 1 ${fromCurr} = ${rate} ${toCurr})</pre>`);
                    } else {
                        displayOutput(`<pre class='error'>Could not find rate for ${toCurr}. Supported currencies: ${Object.keys(data.rates).slice(0,10).join(', ')}...</pre>`);
                    }
                })
                .catch(error => displayOutput(`<pre class='error'>Error fetching currency data: ${error.message}</pre>`));
        }
    };
})(globalThis);
