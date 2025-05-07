(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.base64 = {
        name: "base64",
        description: "Encode or decode base64.",
        usage: "base64 encode|decode {text}",
        manPage: 'base64\n\nNAME\n    base64 - Encodes or decodes data in Base64 format.\n\nSYNOPSIS\n    base64 encode {text_to_encode}\n    base64 decode {base64_string}\n\nDESCRIPTION\n    Provides functionality to convert text to its Base64 representation (encode) or convert a Base64 string back to its original text (decode). Handles UTF-8 characters correctly.',
        execute: function(args, query, displayOutput, services) {
            if (args.length < 2) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            const action = args[0].toLowerCase();
            const textToProcess = args.slice(1).join(' ');
            if (action === 'encode') {
                try {
                    displayOutput(`<pre>${btoa(unescape(encodeURIComponent(textToProcess)))}</pre>`);
                } catch (e) {
                    displayOutput(`<pre class='error'>Error encoding: ${e.message}</pre>`);
                }
            } else if (action === 'decode') {
                try {
                    displayOutput(`<pre>${decodeURIComponent(escape(atob(textToProcess)))}</pre>`);
                } catch (e) {
                    displayOutput(`<pre class='error'>Error decoding: ${e.message} (Input might not be valid Base64 or UTF-8)</pre>`);
                }
            } else {
                displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`);
            }
        }
    };
})(globalThis);
