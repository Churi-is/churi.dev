(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.ip = {
        name: "ip",
        description: "Show your public IP address.",
        manPage: 'ip\n\nNAME\n    ip - Displays your public IP address.\n\nSYNOPSIS\n    ip\n\nDESCRIPTION\n    Fetches and shows your device\'s public IP address by querying an external service (api.ipify.org). Requires an internet connection.',
        execute: function(args, query, displayOutput, services) {
            displayOutput("<pre>Fetching public IP address...</pre>");
            services.fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => displayOutput(`<pre>Your public IP address is: ${data.ip}</pre>`))
                .catch(error => displayOutput(`<pre class='error'>Could not fetch IP: ${error.message}</pre>`));
        }
    };
})(globalThis);
