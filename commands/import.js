(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }

    globalContext.FoxTermCommands.import = {
        name: "import",
        description: "Imports FoxTerm settings from a JSON file.",
        usage: "import",
        manPage: "import\n\nNAME\n    import - Import FoxTerm settings.\n\nSYNOPSIS\n    import\n\nDESCRIPTION\n    Prompts the user to select a JSON file (previously created by the 'export' command). It then parses this file and applies the settings to the current FoxTerm session, overwriting existing configurations. This includes environment variables, aliases, theme, command history, current path, autorun commands, and shortcuts.\n\nA page reload is usually required for all changes to take full effect.",
        execute: function(args, query, displayOutput, services) {
            if (!services.FoxTermUtils || !services.FoxTermUtils.storage) {
                displayOutput("<pre class='error'>Storage utility not available. Cannot import settings.</pre>");
                return;
            }
            const storage = services.FoxTermUtils.storage;

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';

            fileInput.onchange = (event) => {
                const file = event.target.files[0];
                if (!file) {
                    displayOutput("<pre class='info'>File selection cancelled.</pre>");
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importedData = JSON.parse(e.target.result);
                        if (!importedData || typeof importedData !== 'object' || !importedData.settings || typeof importedData.settings !== 'object') {
                            throw new Error("Invalid file format. Missing 'settings' object.");
                        }
                        if (importedData.version !== "1.0") {
                             displayOutput(`<pre class='warning'>Warning: Importing settings from a different version (${services.escapeHTML(importedData.version || 'unknown')}). Compatibility issues may occur.</pre>`);
                        }

                        const settings = importedData.settings;
                        let changesMade = false;

                        // Import EnvVars
                        if (settings.envVars && typeof settings.envVars === 'object') {
                            Object.keys(services.envVars).forEach(key => delete services.envVars[key]); // Clear existing session envVars
                            Object.assign(services.envVars, settings.envVars); // Assign new ones
                            storage.saveEnvVars(services.envVars);
                            changesMade = true;
                            displayOutput("<pre>Environment variables imported.</pre>");
                        }

                        // Import Aliases
                        if (settings.aliases && typeof settings.aliases === 'object') {
                            Object.keys(services.aliases).forEach(key => delete services.aliases[key]); // Clear existing session aliases
                            Object.assign(services.aliases, settings.aliases); // Assign new ones
                            storage.saveAliases(services.aliases);
                            changesMade = true;
                            displayOutput("<pre>Aliases imported.</pre>");
                        }

                        // Import Theme
                        if (settings.currentTheme && typeof settings.currentTheme === 'string') {
                            if (services.applyTheme(settings.currentTheme, null)) { // Apply without message from applyTheme itself
                                displayOutput(`<pre>Theme '${services.escapeHTML(settings.currentTheme)}' imported and applied.</pre>`);
                                changesMade = true;
                            } else {
                                displayOutput(`<pre class='warning'>Imported theme '${services.escapeHTML(settings.currentTheme)}' not found or could not be applied.</pre>`);
                            }
                        }

                        // Import Command History
                        if (settings.commandHistory && Array.isArray(settings.commandHistory)) {
                            // Update current session history (accessible via services.getCommandHistory())
                            // The main script's commandHistory variable needs to be updated.
                            // This is a bit tricky as we don't have direct access to `let commandHistory` in index.html
                            // For now, we'll save it, and it will be loaded on next reload.
                            // Or, if `services.getCommandHistory()` returns a reference that can be modified:
                            const liveHistory = services.getCommandHistory();
                            if (liveHistory) {
                                liveHistory.length = 0; // Clear it
                                settings.commandHistory.forEach(cmd => liveHistory.push(cmd));
                                // Also update historyIndex if possible, or rely on reload
                            }
                            storage.saveCommandHistory(settings.commandHistory);
                            changesMade = true;
                            displayOutput("<pre>Command history imported.</pre>");
                        }

                        // Import Current Path
                        if (settings.currentPath && typeof settings.currentPath === 'string') {
                            services.setCurrentPathAndPrompt(settings.currentPath); // This also saves it
                            changesMade = true;
                            displayOutput("<pre>Current path imported and set.</pre>");
                        }

                        // Import Autorun Commands
                        if (settings.autorunCommands && Array.isArray(settings.autorunCommands)) {
                            storage.saveAutorunCommands(settings.autorunCommands);
                            // Update current session's autorunCommands if possible, or rely on reload
                            changesMade = true;
                            displayOutput("<pre>Autorun commands imported.</pre>");
                        }
                        
                        // Import Shortcuts
                        if (settings.shortcuts && Array.isArray(settings.shortcuts)) {
                            storage.saveData('shortcuts', settings.shortcuts);
                            // Update current session's shortcuts if possible, or rely on reload
                            changesMade = true;
                            displayOutput("<pre>Shortcuts imported.</pre>");
                        }

                        if (changesMade) {
                            displayOutput("<pre class='success'>Settings imported successfully. Please <a href='javascript:location.reload()'>reload the page</a> for all changes to take full effect.</pre>");
                        } else {
                            displayOutput("<pre class='info'>No settings found to import in the selected file, or settings were identical.</pre>");
                        }

                    } catch (err) {
                        displayOutput(`<pre class='error'>Error importing settings: ${services.escapeHTML(err.message)}</pre>`);
                        console.error("Import error:", err);
                    } finally {
                        // Clean up the file input element if it was appended to body
                        if (fileInput.parentNode) {
                            fileInput.parentNode.removeChild(fileInput);
                        }
                    }
                };

                reader.onerror = () => {
                    displayOutput(`<pre class='error'>Error reading file: ${services.escapeHTML(reader.error.message)}</pre>`);
                    if (fileInput.parentNode) {
                        fileInput.parentNode.removeChild(fileInput);
                    }
                };

                reader.readAsText(file);
            };

            // Trigger file input
            fileInput.style.display = 'none'; // Hide it
            document.body.appendChild(fileInput); // Required for Safari
            fileInput.click();
            // Don't remove immediately, wait for onchange or onerror
        }
    };

})(globalThis);
