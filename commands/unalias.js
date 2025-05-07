(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.unalias = {
        name: "unalias",
        description: "Remove an alias.",
        usage: "unalias {alias_name}",
        manPage: "unalias\n\nNAME\n    unalias - remove alias definitions\n\nSYNOPSIS\n    unalias alias_name\n\nDESCRIPTION\n    Removes the alias definition for 'alias_name'.",
        execute: function(args, query, displayOutput, services) {
            const currentAliases = services.aliases; 
            if (!args[0]) { displayOutput("<pre class='error'>Usage: unalias {alias_name}</pre>"); return; }
            const aliasToRemove = args[0].trim();
            if (currentAliases[aliasToRemove]) {
                delete currentAliases[aliasToRemove];
                if (services.FoxTermUtils && services.FoxTermUtils.storage) {
                    services.FoxTermUtils.storage.saveAliases(currentAliases);
                }
                displayOutput(`<pre>Alias '${aliasToRemove}' removed.</pre>`);
            } else {
                displayOutput(`<pre>-foxterm: unalias: ${aliasToRemove}: not found</pre>`);
            }
        }
    };
})(globalThis);
