(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.uuid = {
        name: "uuid",
        description: "Generate a UUID v4.",
        manPage: 'uuid\n\nNAME\n    uuid - Generates a Version 4 UUID (Universally Unique Identifier).\n\nSYNOPSIS\n    uuid\n\nDESCRIPTION\n    Creates and displays a cryptographically strong random UUID (v4). Utilizes the browser\'s \'crypto.randomUUID()\' method if available.',
        execute: function(args, query, displayOutput, services) {
            if (services.crypto && services.crypto.randomUUID) {
                displayOutput(`<pre>${services.crypto.randomUUID()}</pre>`);
            } else {
                displayOutput("<pre class='error'>Crypto API for UUID not available.</pre>");
            }
        }
    };
})(globalThis);
