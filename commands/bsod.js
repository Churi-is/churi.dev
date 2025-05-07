(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.bsod = {
        name: "bsod",
        description: "Fun BSOD simulation.",
        manPage: "bsod / bluescreen\n\nNAME\n    bsod, bluescreen - simulate a Blue Screen of Death\n\nSYNOPSIS\n    bsod\n    bluescreen\n\nDESCRIPTION\n    Displays a mock Blue Screen of Death overlay. Press any key or click to dismiss.",
        execute: function(args, query, displayOutput, services) {
            services.bsodOverlay.style.display = 'block';
            services.commandInput.blur();
            
            const handleBsodDismiss = function(event) {
                services.bsodOverlay.style.display = 'none';
                services.commandInput.focus();
                services.window.removeEventListener('keydown', handleBsodDismiss, true);
                services.window.removeEventListener('click', handleBsodDismiss, true);
            };
            
            services.window.addEventListener('keydown', handleBsodDismiss, true);
            services.window.addEventListener('click', handleBsodDismiss, true);
        }
    };
})(globalThis);
