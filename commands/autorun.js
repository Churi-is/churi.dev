(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }

    globalContext.FoxTermCommands.autorun = {
        name: "autorun",
        description: "Manage commands that run automatically on terminal startup.",
        usage: "autorun [list|add <command_string>|remove <index_or_command_string>|clear]",
        manPage: `autorun\n\nNAME\n    autorun - Manage commands that run automatically on terminal startup.\n\nSYNOPSIS\n    autorun [subcommand] [arguments...]\n\nDESCRIPTION\n    Configures commands that are executed when FoxTerm starts.\n\nSUBCOMMANDS:\n    list (or no subcommand)\n        Displays the current list of autorun commands.\n\n    add <command_string>\n        Adds the specified command string to the autorun list.\n        Example: autorun add neofetch\n\n    remove <index_or_command_string>\n        Removes a command from the autorun list. The command can be specified by its 1-based index in the 'autorun list' output, or by the exact command string.\n        Example: autorun remove 1\n        Example: autorun remove neofetch\n\n    clear\n        Removes all commands from the autorun list.\n\nNOTES:\n    Changes take effect on the next terminal reload.`,
        execute: function(args, query, displayOutput, services) {
            if (!services.FoxTermUtils || !services.FoxTermUtils.storage) {
                displayOutput("<pre class='error'>Storage utility not available. Cannot manage autorun commands.</pre>");
                return;
            }

            const storage = services.FoxTermUtils.storage;
            // Use DEFAULT_AUTORUN_COMMANDS_LIST from envVars as the primary default
            const defaultAutorunStringFromEnv = (services.envVars && services.envVars.DEFAULT_AUTORUN_COMMANDS_LIST) 
                                              ? services.envVars.DEFAULT_AUTORUN_COMMANDS_LIST 
                                              : 'welcome,shortcuts'; // Fallback if envVar is missing
            const defaultCommandsArray = defaultAutorunStringFromEnv.split(',').map(s => s.trim()).filter(Boolean);

            let currentAutorunCommands = storage.loadAutorunCommands(defaultCommandsArray);
            if (!Array.isArray(currentAutorunCommands)) { // Ensure it's an array
                currentAutorunCommands = [...defaultCommandsArray];
            }


            const subCommand = args[0] ? args[0].toLowerCase() : 'list';
            const commandArg = args.slice(1).join(" ");

            switch (subCommand) {
                case 'add':
                    if (!commandArg) {
                        displayOutput("<pre class='error'>Usage: autorun add <command_string></pre>");
                        return;
                    }
                    if (currentAutorunCommands.includes(commandArg)) {
                        displayOutput(`<pre class='warning'>Command "${services.escapeHTML(commandArg)}" is already in the autorun list.</pre>`);
                        return;
                    }
                    currentAutorunCommands.push(commandArg);
                    storage.saveAutorunCommands(currentAutorunCommands);
                    displayOutput(`<pre>Added "${services.escapeHTML(commandArg)}" to autorun commands. It will run on next reload.</pre>`);
                    break;

                case 'remove':
                    if (!commandArg) {
                        displayOutput("<pre class='error'>Usage: autorun remove <index_or_command_string></pre>");
                        return;
                    }
                    let removed = false;
                    const originalLength = currentAutorunCommands.length;

                    // Try removing by 1-based index first
                    const indexToRemove = parseInt(commandArg, 10);
                    if (!isNaN(indexToRemove) && indexToRemove > 0 && indexToRemove <= currentAutorunCommands.length) {
                        const removedCommand = currentAutorunCommands.splice(indexToRemove - 1, 1)[0];
                        displayOutput(`<pre>Removed autorun command (index ${indexToRemove}): "${services.escapeHTML(removedCommand)}"</pre>`);
                        removed = true;
                    } else {
                        // Try removing by command string
                        currentAutorunCommands = currentAutorunCommands.filter(cmd => {
                            if (cmd === commandArg) {
                                removed = true;
                                return false;
                            }
                            return true;
                        });
                        if (removed) {
                             displayOutput(`<pre>Removed autorun command: "${services.escapeHTML(commandArg)}"</pre>`);
                        }
                    }

                    if (removed) {
                        storage.saveAutorunCommands(currentAutorunCommands);
                        displayOutput("<pre>Changes will apply on next reload.</pre>");
                    } else {
                        displayOutput(`<pre class='error'>Command or index "${services.escapeHTML(commandArg)}" not found in autorun list.</pre>`);
                    }
                    break;

                case 'clear':
                    currentAutorunCommands = [];
                    storage.saveAutorunCommands(currentAutorunCommands);
                    displayOutput("<pre class='success'>All autorun commands cleared. This will apply on next reload.</pre>");
                    break;

                case 'list':
                default:
                    if (currentAutorunCommands.length === 0) {
                        displayOutput("<pre>No autorun commands configured.</pre>");
                    } else {
                        let output = "<pre>Current autorun commands (will run on next startup):\n";
                        currentAutorunCommands.forEach((cmd, index) => {
                            output += `  ${index + 1}. ${services.escapeHTML(cmd)}\n`;
                        });
                        output += "</pre>";
                        displayOutput(output);
                    }
                    break;
            }
        }
    };
})(globalThis);
