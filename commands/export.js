(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }

    globalContext.FoxTermCommands.export = {
        name: "export",
        description: "Exports all FoxTerm settings to a JSON file.",
        usage: "export",
        manPage: "export\n\nNAME\n    export - Export FoxTerm settings.\n\nSYNOPSIS\n    export\n\nDESCRIPTION\n    Gathers all current FoxTerm settings (environment variables, aliases, theme, command history, current path, autorun commands, and shortcuts) and downloads them as a JSON file named 'foxterm-settings.json'. This file can be used with the 'import' command to restore settings on another browser or device.",
        execute: function(args, query, displayOutput, services) {
            if (!services.FoxTermUtils || !services.FoxTermUtils.storage) {
                displayOutput("<pre class='error'>Storage utility not available. Cannot export settings.</pre>");
                return;
            }
            const storage = services.FoxTermUtils.storage;

            const settingsToExport = {
                version: "1.0", // For potential future compatibility
                exportedAt: new Date().toISOString(),
                settings: {
                    envVars: { ...services.envVars }, // Get a copy
                    aliases: { ...services.aliases }, // Get a copy
                    currentTheme: storage.loadCurrentTheme('default'),
                    commandHistory: storage.loadCommandHistory([]),
                    currentPath: storage.loadCurrentPath("~"),
                    autorunCommands: storage.loadAutorunCommands(
                        (services.envVars.DEFAULT_AUTORUN_COMMANDS_LIST || "welcome").split(',').map(s => s.trim()).filter(Boolean)
                    ),
                    shortcuts: storage.loadData('shortcuts', []) // Using generic loadData as shortcuts.js does
                }
            };

            try {
                const jsonString = JSON.stringify(settingsToExport, null, 2);
                const blob = new Blob([jsonString], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'foxterm-settings.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                displayOutput("<pre class='success'>Settings exported successfully as 'foxterm-settings.json'.</pre>");
            } catch (e) {
                displayOutput(`<pre class='error'>Error exporting settings: ${services.escapeHTML(e.message)}</pre>`);
                console.error("Export error:", e);
            }
        }
    };

})(globalThis);
