(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.alias = {
        name: "alias",
        description: "Create a command alias or list aliases.",
        usage: "alias [name[=value]]",
        manPage: "alias\n\nNAME\n    alias - define or display aliases\n\nSYNOPSIS\n    alias [name[=value] ...]\n\nDESCRIPTION\n    Alias allows a string to be substituted for a word when it is used\n    as the first word of a simple command. If 'name=value' is given,\n    defines an alias 'name' with value 'value'. If 'name' is given,\n    prints the alias for 'name'. If no arguments, prints all defined aliases.",
        execute: function(args, query, displayOutput, services) {
            const currentAliases = services.aliases; 
            if (!query) { 
                if (Object.keys(currentAliases).length === 0) {
                    displayOutput("<pre>No aliases defined.</pre>"); return;
                }
                let aliasList = "<pre>";
                for (const name in currentAliases) {
                    aliasList += `alias ${name}='${currentAliases[name]}'\n`;
                }
                aliasList += "</pre>";
                displayOutput(aliasList);
            } else { 
                const parts = query.split('=');
                if (parts.length === 1) { 
                    const nameToFind = parts[0].trim();
                    if (currentAliases[nameToFind]) {
                        displayOutput(`<pre>alias ${nameToFind}='${currentAliases[nameToFind]}'</pre>`);
                    } else {
                        displayOutput(`<pre>-foxterm: alias: ${nameToFind}: not found</pre>`);
                    }
                } else if (parts.length >= 2) { 
                    const nameToSet = parts[0].trim();
                    const valueToSet = parts.slice(1).join('=').trim();
                    if (!nameToSet) { displayOutput("<pre class='error'>Alias name cannot be empty.</pre>"); return; }
                    if (!valueToSet) { displayOutput(`<pre class='warning'>Setting alias '${nameToSet}' to empty string.</pre>`); }
                    currentAliases[nameToSet] = valueToSet;
                    if (services.FoxTermUtils && services.FoxTermUtils.storage) {
                        services.FoxTermUtils.storage.saveAliases(currentAliases);
                    }
                    displayOutput(`<pre>Alias '${nameToSet}' set.</pre>`);
                } else { 
                    displayOutput("<pre class='error'>Usage: alias [name[=value]]</pre>");
                }
            }
        }
    };
})(globalThis);
