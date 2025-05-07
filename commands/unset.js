(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.unset = {
        name: "unset",
        description: "Unset an environment variable.",
        usage: "unset VAR",
        manPage: "unset\n\nNAME\n    unset - unset environment variables\n\nSYNOPSIS\n    unset VAR\n\nDESCRIPTION\n    Removes the definition of the environment variable VAR.",
        execute: function(args, query, displayOutput, services) {
            const currentEnvVars = services.envVars; 
            if (!args[0]) {
                displayOutput("<pre class='error'>Usage: unset VAR</pre>");
                return;
            }
            const varToUnset = args[0].toUpperCase();
            if (currentEnvVars.hasOwnProperty(varToUnset)) {
                delete currentEnvVars[varToUnset];
                if (services.FoxTermUtils && services.FoxTermUtils.storage) {
                    services.FoxTermUtils.storage.saveEnvVars(currentEnvVars);
                }
                displayOutput(`<pre>Unset ${varToUnset}</pre>`);
            } else {
                displayOutput(`<pre>Variable ${varToUnset} not found.</pre>`);
            }
        }
    };
})(globalThis);
