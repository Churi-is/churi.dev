(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.word = {
        name: "word",
        description: "Get a random JLPT word (N1-N5).",
        usage: "word [level]",
        manPage: "word\n\nNAME\n    word - display a random Japanese (JLPT) word\n\nSYNOPSIS\n    word [level]\n\nDESCRIPTION\n    Fetches and displays a random Japanese word from the JLPT vocabulary list.\n    An optional level (N1-N5) can be specified.",
        execute: function(args, query, displayOutput, services) {
            let levelArg = args[0];
            if (levelArg && typeof levelArg === 'string') {
                const match = levelArg.match(/N?([1-5])/i);
                if (match) levelArg = match[1];
                else levelArg = null; 
            }

            displayOutput("<pre>Fetching Japanese word...</pre>");
            services.fetchJapaneseWord(levelArg || null, false) 
                .then(htmlResult => displayOutput(`<pre>${htmlResult}</pre>`))
                .catch(error => { 
                     displayOutput(`<pre class='error'>Error in word command execution: ${error.message}</pre>`);
                });
        }
    };
})(globalThis);
