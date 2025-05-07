(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.sudo = {
        name: "sudo",
        description: '"Permission denied" simulator.',
        usage: "sudo {command...}",
        manPage: 'sudo\n\nNAME\n    sudo - Simulates a "permission denied" scenario.\n\nSYNOPSIS\n    sudo {command...}\n\nDESCRIPTION\n    Mimics the behavior of the sudo command when a user lacks permissions. It will typically ask for a password (which is not actually checked) and then deny the request, stating that the user is not allowed to execute the command as root.',
        execute: function(args, query, displayOutput, services) {
            const user = services.envVars.USER || "guest";
            // We need to display the prompt part without the standard prefix.
            // This requires a way to tell displayOutput not to add the prompt, or a more raw output.
            // For now, let's hack it by providing an empty prefix.
            const passwordPromptDiv = document.createElement('div');
            passwordPromptDiv.innerHTML = `<span class="error">[sudo] password for ${user}:</span>`;
            services.outputDiv.appendChild(passwordPromptDiv);
            services.outputDiv.scrollTop = services.outputDiv.scrollHeight;

            setTimeout(() => {
                displayOutput(`<pre>Sorry, user ${user} is not allowed to execute '${args.join(' ')}' as root on this web terminal.</pre>`);
            }, 1000);
        }
    };
})(globalThis);
