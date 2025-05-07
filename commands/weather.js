(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.weather = {
        name: "weather",
        description: "Get weather information.",
        usage: "weather [city_name]",
        manPage: "weather\n\nNAME\n    weather - display weather information\n\nSYNOPSIS\n    weather [city_name]\n\nDESCRIPTION\n    Fetches and displays current weather information. If no city is specified,\n    it attempts to use geolocation. Falls back to a default city if geolocation fails.",
        execute: function(args, query, displayOutput, services) {
            displayOutput("<pre>Fetching weather data...</pre>");
            services.fetchWeather(query || null, false) 
                .then(htmlResult => displayOutput(`<pre>${htmlResult}</pre>`))
                .catch(error => { 
                    displayOutput(`<pre class='error'>Error in weather command execution: ${error.message}</pre>`);
                });
        }
    };
})(globalThis);
