(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.passwd = {
        name: "passwd",
        description: "Generate a random password.",
        usage: "passwd [length=12]",
        manPage: 'passwd\n\nNAME\n    passwd - Generates a random password.\n\nSYNOPSIS\n    passwd [length]\n\nDESCRIPTION\n    Creates a random password of a specified length (default is 12 characters). The password includes uppercase letters, lowercase letters, numbers, and special symbols. Length must be between 4 and 128.',
        execute: function(args, query, displayOutput, services) {
            const length = parseInt(args[0]) || 12;
            if (length < 4 || length > 128) { displayOutput("<pre class='error'>Password length must be between 4 and 128.</pre>"); return; }
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
            let password = "";
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            displayOutput(`<pre>${password}</pre>`);
        }
    };
})(globalThis);
