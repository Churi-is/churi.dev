(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.set = {
        name: "set",
        description: "Set an environment variable.",
        usage: "set VAR=value",
        manPage: "set\n\nNAME\n    set - set environment variables\n\nSYNOPSIS\n    set VAR=value\n\nDESCRIPTION\n    Sets the environment variable VAR to the specified value.",
        execute: function(args, query, displayOutput, services) {
            const currentEnvVars = services.envVars; 
            if (!query || query.indexOf('=') === -1) {
                displayOutput("<pre class='error'>Usage: set VAR=value</pre>");
                return;
            }
            const [varNameSet, ...varValuePartsSet] = query.split('=');
            const varValueToSet = varValuePartsSet.join('=');
            const trimmedVarNameSet = varNameSet.trim().toUpperCase();
            if (!trimmedVarNameSet.match(/^[A-Z_][A-Z0-9_]*$/)) {
                displayOutput("<pre class='error'>Invalid variable name. Must start with a letter or underscore, followed by letters, numbers, or underscores.</pre>");
                return;
            }
            currentEnvVars[trimmedVarNameSet] = varValueToSet.trim();
            if (services.FoxTermUtils && services.FoxTermUtils.storage) {
                services.FoxTermUtils.storage.saveEnvVars(currentEnvVars);
            }
            displayOutput(`<pre>Set ${trimmedVarNameSet}=${currentEnvVars[trimmedVarNameSet]}</pre>`);
        }
    };
})(globalThis);
