(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.man = {
        name: "man",
        description: "Display mock manual page for a command.",
        usage: "man {command_name}",
        execute: function(args, query, displayOutput, services) {
            if (!args[0]) { displayOutput("<pre class='error'>Usage: man {command_name}</pre>"); return; }
            const cmdName = args[0].toLowerCase();
            
            const extCmd = globalThis.FoxTermCommands ? globalThis.FoxTermCommands[cmdName] : null;
            const centralManPages = services.manPages(); 

            if (extCmd && extCmd.manPage) { 
                displayOutput(`<pre>${extCmd.manPage}</pre>`);
            } else if (centralManPages[cmdName]) { 
                displayOutput(`<pre>${centralManPages[cmdName]}</pre>`);
            } else {
                const builtInCmd = services.window.builtInCommands ? services.window.builtInCommands[cmdName] : null;
                if (builtInCmd && builtInCmd.manPage) {
                     displayOutput(`<pre>${builtInCmd.manPage}</pre>`);
                } else {
                    displayOutput(`<pre>No manual entry for ${cmdName}</pre>`);
                }
            }
        }
    };
})(globalThis);
