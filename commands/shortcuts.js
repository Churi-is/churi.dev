(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }

    const DEFAULT_SHORTCUTS = [
        { icon: "🦊", name: "FoxTerm", url: "https://github.com/your-repo/FoxTerm" }, // Example
        { icon: "⚙️", name: "Settings", url: "#" } // Placeholder for internal settings page if ever
    ];
    const STORAGE_KEY = 'shortcuts';

    function loadShortcuts(storage, defaultShortcuts) {
        let shortcuts = storage.loadData(STORAGE_KEY, defaultShortcuts);
        if (!Array.isArray(shortcuts) || !shortcuts.every(s => typeof s === 'object' && s.name && s.url && s.icon)) {
            return [...defaultShortcuts]; // Return a copy
        }
        return shortcuts;
    }

    function saveShortcuts(storage, shortcuts) {
        storage.saveData(STORAGE_KEY, shortcuts);
    }

    function findShortcut(shortcuts, identifier) {
        const index = parseInt(identifier, 10) - 1;
        if (!isNaN(index) && index >= 0 && index < shortcuts.length) {
            return { shortcut: shortcuts[index], index: index };
        }
        const foundIndex = shortcuts.findIndex(s => s.name.toLowerCase() === identifier.toLowerCase());
        if (foundIndex !== -1) {
            return { shortcut: shortcuts[foundIndex], index: foundIndex };
        }
        return null;
    }

    globalContext.FoxTermCommands.shortcuts = {
        name: "shortcuts",
        description: "Manage and display quick access shortcuts. Displays shortcuts in a grid view by default.",
        usage: "shortcuts [view|list|add <icon> <name> <url>|remove <name_or_index>|edit <name_or_index> <new_icon> <new_name> <new_url>|open <name_or_index>]",
        manPage: `shortcuts\n\nNAME\n    shortcuts - Manage and display quick access shortcuts.\n\nSYNOPSIS\n    shortcuts [subcommand] [arguments...]\n\nDESCRIPTION\n    Configures and displays a list of shortcuts (icon, name, URL). When run without arguments or with 'view', it displays the current shortcuts in a grid format. Changes are saved immediately.\n\nSUBCOMMANDS:\n    view (or no subcommand)\n        Displays the current shortcuts in a grid format, typically in rows of three.\n\n    list\n        Displays the current list of shortcuts with numerical indexes.\n\n    add <icon> <name> <url>\n        Adds a new shortcut. Name must not contain spaces if not quoted. URL should be complete.\n        Example: shortcuts add 🚀 MySite https://example.com\n        Example: shortcuts add "⭐" "My Cool Site" https://cool.example.com\n\n    remove <name_or_index>\n        Removes a shortcut by its 1-based index or its name (case-insensitive).\n        Example: shortcuts remove 1\n        Example: shortcuts remove MySite\n\n    edit <name_or_index> <new_icon> <new_name> <new_url>\n        Edits an existing shortcut. Use '_' (underscore) for fields you don't want to change.\n        Example: shortcuts edit MySite _ "My New Site Name" _\n        Example: shortcuts edit 1 ✨ _ _ (changes only icon)\n\n    open <name_or_index>\n        Opens the URL of the specified shortcut in a new tab.\n        Example: shortcuts open MySite\n\nNOTES:\n    - Shortcut names are case-insensitive for 'remove', 'edit', and 'open'.\n    - If a name contains spaces, it might need to be quoted for 'add' and 'edit' depending on shell parsing, though this command tries to handle it.\n    - Icons can be emojis or short text.`,
        execute: function(args, query, displayOutput, services) {
            if (!services.FoxTermUtils || !services.FoxTermUtils.storage) {
                displayOutput("<pre class='error'>Storage utility not available. Cannot manage shortcuts.</pre>");
                return;
            }
            const storage = services.FoxTermUtils.storage;
            let currentShortcuts = loadShortcuts(storage, DEFAULT_SHORTCUTS);

            const subCommand = args[0] ? args[0].toLowerCase() : 'view'; // Default to 'view'
            
            switch (subCommand) {
                case 'add':
                    // shortcuts add icon name url1 url2 -> icon, name, url1 url2
                    if (args.length < 4) { // icon, name, url parts
                        displayOutput("<pre class='error'>Usage: shortcuts add <icon> <name> <url></pre>");
                        return;
                    }
                    const icon = args[1];
                    const name = args[2];
                    const url = args.slice(3).join(" ");

                    if (currentShortcuts.find(s => s.name.toLowerCase() === name.toLowerCase())) {
                        displayOutput(`<pre class='warning'>Shortcut with name "${services.escapeHTML(name)}" already exists.</pre>`);
                        return;
                    }
                    currentShortcuts.push({ icon, name, url });
                    saveShortcuts(storage, currentShortcuts);
                    displayOutput(`<pre>Added shortcut: ${services.escapeHTML(icon)} ${services.escapeHTML(name)} (${services.escapeHTML(url)})</pre>`);
                    break;

                case 'remove':
                    if (args.length < 2) {
                        displayOutput("<pre class='error'>Usage: shortcuts remove <name_or_index></pre>");
                        return;
                    }
                    const identifierToRemove = args[1];
                    const foundToRemove = findShortcut(currentShortcuts, identifierToRemove);

                    if (foundToRemove) {
                        const removed = currentShortcuts.splice(foundToRemove.index, 1)[0];
                        saveShortcuts(storage, currentShortcuts);
                        displayOutput(`<pre>Removed shortcut: ${services.escapeHTML(removed.icon)} ${services.escapeHTML(removed.name)}</pre>`);
                    } else {
                        displayOutput(`<pre class='error'>Shortcut "${services.escapeHTML(identifierToRemove)}" not found.</pre>`);
                    }
                    break;

                case 'edit':
                    // shortcuts edit <id> <icon> <name> <url>
                    if (args.length < 5) {
                        displayOutput("<pre class='error'>Usage: shortcuts edit <name_or_index> <new_icon> <new_name> <new_url></pre>");
                        return;
                    }
                    const identifierToEdit = args[1];
                    const newIcon = args[2];
                    const newName = args[3];
                    const newUrl = args.slice(4).join(" ");

                    const foundToEdit = findShortcut(currentShortcuts, identifierToEdit);

                    if (foundToEdit) {
                        const shortcut = foundToEdit.shortcut;
                        if (newIcon !== '_') shortcut.icon = newIcon;
                        if (newName !== '_') shortcut.name = newName;
                        if (newUrl !== '_') shortcut.url = newUrl;
                        
                        // Check for name collision if name changed
                        if (newName !== '_' && currentShortcuts.some((s, i) => s.name.toLowerCase() === newName.toLowerCase() && i !== foundToEdit.index)) {
                            displayOutput(`<pre class='error'>Another shortcut with the name "${services.escapeHTML(newName)}" already exists. Edit aborted.</pre>`);
                            // Revert changes if needed or simply don't save
                            currentShortcuts = loadShortcuts(storage, DEFAULT_SHORTCUTS); // Reload to discard changes
                            return;
                        }
                        
                        saveShortcuts(storage, currentShortcuts);
                        displayOutput(`<pre>Edited shortcut. New values:\n  Icon: ${services.escapeHTML(shortcut.icon)}\n  Name: ${services.escapeHTML(shortcut.name)}\n  URL:  ${services.escapeHTML(shortcut.url)}</pre>`);
                    } else {
                        displayOutput(`<pre class='error'>Shortcut "${services.escapeHTML(identifierToEdit)}" not found.</pre>`);
                    }
                    break;

                case 'open':
                    if (args.length < 2) {
                        displayOutput("<pre class='error'>Usage: shortcuts open <name_or_index></pre>");
                        return;
                    }
                    const identifierToOpen = args[1];
                    const foundToOpen = findShortcut(currentShortcuts, identifierToOpen);

                    if (foundToOpen && foundToOpen.shortcut.url) {
                        if (foundToOpen.shortcut.url === "#") {
                             displayOutput(`<pre class='info'>Shortcut "${services.escapeHTML(foundToOpen.shortcut.name)}" is a placeholder and cannot be opened.</pre>`);
                             return;
                        }
                        try {
                            new URL(foundToOpen.shortcut.url); // Validate URL
                            services.window.open(foundToOpen.shortcut.url, '_blank');
                            displayOutput(`<pre>Opening "${services.escapeHTML(foundToOpen.shortcut.name)}" (${services.escapeHTML(foundToOpen.shortcut.url)})...</pre>`);
                        } catch (e) {
                            displayOutput(`<pre class='error'>Invalid URL for shortcut "${services.escapeHTML(foundToOpen.shortcut.name)}": ${services.escapeHTML(foundToOpen.shortcut.url)}</pre>`);
                        }
                    } else {
                        displayOutput(`<pre class='error'>Shortcut "${services.escapeHTML(identifierToOpen)}" not found or has no URL.</pre>`);
                    }
                    break;

                case 'list':
                    if (currentShortcuts.length === 0) {
                        displayOutput("<pre>No shortcuts configured. Use 'shortcuts add <icon> <name> <url>' to add one.</pre>");
                    } else {
                        let output = "<pre class='shortcuts-list'><strong>Shortcuts:</strong> (use 'shortcuts open &lt;name_or_index&gt;' to open)\n";
                        currentShortcuts.forEach((s, index) => {
                            const safeIcon = services.escapeHTML(s.icon);
                            const safeName = services.escapeHTML(s.name);
                            const safeUrl = services.escapeHTML(s.url);
                            let displayUrl = safeUrl;
                            if (s.url === "#") { // Special handling for placeholder URLs
                                output += `  ${index + 1}. ${safeIcon} ${safeName} (placeholder)\n`;
                            } else {
                                try {
                                    const urlObj = new URL(s.url); // Check if valid URL for display
                                    displayUrl = urlObj.protocol + "//" + urlObj.hostname + (urlObj.pathname === "/" ? "" : urlObj.pathname.substring(0,30)+(urlObj.pathname.length > 30 ? "..." : ""));
                                } catch (e) { /* not a valid full URL, display as is */ }
                                output += `  ${index + 1}. ${safeIcon} <a href="${safeUrl}" target="_blank" title="Open ${safeName} (${safeUrl})">${safeName}</a> <span style="color:var(--prompt-color)">(${displayUrl})</span>\n`;
                            }
                        });
                        output += "</pre>";
                        displayOutput(output);
                    }
                    break;
                
                case 'view':
                default: // 'view' is the default action
                    if (currentShortcuts.length === 0) {
                        displayOutput("<pre>No shortcuts configured. Use 'shortcuts add <icon> <name> <url>' to add one.</pre>");
                    } else {
                        let output = "<pre class='shortcuts-view'><strong>Shortcuts:</strong>\n\n";
                        const itemsPerRow = 3;
                        let rowBuffer = [];
                        for (let i = 0; i < currentShortcuts.length; i++) {
                            const s = currentShortcuts[i];
                            const safeIcon = services.escapeHTML(s.icon);
                            const safeName = services.escapeHTML(s.name);
                            const safeUrl = services.escapeHTML(s.url);
                            let itemHtml;
                            if (s.url === "#") {
                                itemHtml = `${safeIcon} ${safeName} (placeholder)`;
                            } else {
                                itemHtml = `${safeIcon} <a href="${safeUrl}" target="_blank" title="Open ${safeName} (${safeUrl})">${safeName}</a>`;
                            }
                            rowBuffer.push(itemHtml);

                            if (rowBuffer.length === itemsPerRow || i === currentShortcuts.length - 1) {
                                output += "  " + rowBuffer.join("    ") + "\n"; // Use four spaces as separator
                                rowBuffer = []; // Clear buffer for the next row
                            }
                        }
                        displayOutput(output);
                    }
                    break;
            }
        }
    };

    // Add load/save to storage utility if not already there (for direct use by this command if needed)
    // This is primarily for the command's own use if it were to bypass the main storage util,
    // but good practice to ensure the functions are available.
    // The main storage utility will be augmented separately.
    if (globalContext.FoxTermUtils && globalContext.FoxTermUtils.storage) {
        if (!globalContext.FoxTermUtils.storage.loadShortcuts) {
            globalContext.FoxTermUtils.storage.loadShortcuts = (defaultShortcuts) => loadShortcuts(globalContext.FoxTermUtils.storage, defaultShortcuts);
        }
        if (!globalContext.FoxTermUtils.storage.saveShortcuts) {
            globalContext.FoxTermUtils.storage.saveShortcuts = (shortcuts) => saveShortcuts(globalContext.FoxTermUtils.storage, shortcuts);
        }
    }

})(globalThis);
