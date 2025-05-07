(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.lorem = {
        name: "lorem",
        description: "Generate Lorem Ipsum text.",
        usage: "lorem [paragraphs=1]",
        manPage: 'lorem\n\nNAME\n    lorem - Generates "Lorem Ipsum" placeholder text.\n\nSYNOPSIS\n    lorem [number_of_paragraphs]\n\nDESCRIPTION\n    Produces a specified number of paragraphs of Lorem Ipsum text. If no number is given, it defaults to one paragraph. Useful for populating mockups or testing text layouts.',
        execute: function(args, query, displayOutput, services) {
            const numParagraphs = parseInt(args[0]) || 1;
            let loremText = "";
            const sentences = [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            ];
            for (let i = 0; i < numParagraphs; i++) {
                let paragraph = "";
                const numSentences = Math.floor(Math.random() * 3) + 3; 
                for (let j = 0; j < numSentences; j++) {
                    paragraph += sentences[Math.floor(Math.random() * sentences.length)] + " ";
                }
                loremText += paragraph.trim() + "\n\n";
            }
            displayOutput(`<pre>${loremText.trim()}</pre>`);
        }
    };
})(globalThis);
