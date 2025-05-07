(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.chucknorris = {
        name: "chucknorris",
        description: "Get a Chuck Norris joke.",
        manPage: 'chucknorris\n\nNAME\n    chucknorris - Fetches and displays a random Chuck Norris joke.\n\nSYNOPSIS\n    chucknorris\n\nDESCRIPTION\n    Retrieves a joke about Chuck Norris from an external API (api.chucknorris.io) and prints it to the terminal. Requires an internet connection.',
        execute: function(args, query, displayOutput, services) {
            displayOutput("<pre>Fetching Chuck Norris wisdom...</pre>");
            services.fetch("https://api.chucknorris.io/jokes/random")
                .then(response => response.json())
                .then(data => displayOutput(`<pre>${data.value.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}</pre>`))
                .catch(error => displayOutput(`<pre class='error'>Error fetching joke: ${error.message}</pre>`));
        }
    };
})(globalThis);
