(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.sl = {
        name: "sl",
        description: "Steam Locomotive animation.",
        manPage: 'sl\n\nNAME\n    sl - Displays a steam locomotive animation.\n\nSYNOPSIS\n    sl\n\nDESCRIPTION\n    A classic terminal "typo" command. When run, it shows a simple ASCII art steam locomotive chugging across the screen. A bit of fun.',
        execute: function(args, query, displayOutput, services) {
            displayOutput("<pre>All aboard!</pre>");
            const slContainer = document.createElement('div');
            slContainer.className = 'sl-animation-container';
            services.outputDiv.appendChild(slContainer); // Use outputDiv from services

            const trainFrames = [
                "      ====        ",
                "  ___ مق مق مق ___ ",
                " |DD|  |_______|  ",
                " \\__/--\"O\"\"\"\"\"O\"--\\__/",
                "  \\------------------/",
                "    \\ O O O O O O /",
                "     \\___________/"
            ];
            let position = 40; 
            const maxPosition = -trainFrames[0].length - 20; 

            let slInterval = setInterval(() => {
                let frameOutput = "<pre>";
                trainFrames.forEach(line => {
                    frameOutput += " ".repeat(Math.max(0, position)) + line + "\n";
                });
                frameOutput += "</pre>";
                slContainer.innerHTML = frameOutput;
                position--;
                if (position < maxPosition) {
                    clearInterval(slInterval);
                    slContainer.remove();
                    displayOutput("<pre>Choo choo!</pre>");
                }
            }, 120);
        }
    };
})(globalThis);
