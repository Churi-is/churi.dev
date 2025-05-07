(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.say = {
        name: "say",
        description: "Text-to-speech.",
        usage: "say {text_to_speak}",
        manPage: 'say\n\nNAME\n    say - Uses the browser\'s text-to-speech capabilities.\n\nSYNOPSIS\n    say {text_to_speak}\n\nDESCRIPTION\n    The say command converts the provided text into audible speech using the browser\'s built-in SpeechSynthesis API. If speech synthesis is not supported, a warning will be displayed.',
        execute: function(args, query, displayOutput, services) {
            if (!query) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            if ('speechSynthesis' in services.window) {
                const utterance = new SpeechSynthesisUtterance(query);
                utterance.onerror = (event) => {
                    displayOutput(`<pre class='error'>Speech synthesis error: ${event.error}</pre>`);
                };
                services.window.speechSynthesis.speak(utterance);
                displayOutput(`<pre>Speaking: "${query.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}"</pre>`);
            } else {
                displayOutput("<pre class='warning'>Speech synthesis not supported in this browser.</pre>");
            }
        }
    };
})(globalThis);
