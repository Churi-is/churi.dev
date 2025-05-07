(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.env = {
        name: "env",
        description: "List environment variables.",
        manPage: "env\n\nNAME\n    env - display environment variables\n\nSYNOPSIS\n    env\n\nDESCRIPTION\n    Prints a list of current environment variables and their values.",
        execute: function(args, query, displayOutput, services) {
            const currentEnvVars = services.envVars;
            let envOutput = "<pre>";
            for (const key in currentEnvVars) {
                envOutput += `${key}=${currentEnvVars[key]}\n`;
            }
            envOutput += "</pre>";
            displayOutput(envOutput);
        }
    };
})(globalThis);
