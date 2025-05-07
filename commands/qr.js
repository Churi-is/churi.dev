(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.qr = {
        name: "qr",
        description: "Generate a QR code.",
        usage: "qr {text_to_encode}",
        manPage: 'qr\n\nNAME\n    qr - Generates a QR code from the given text.\n\nSYNOPSIS\n    qr {text_to_encode}\n\nDESCRIPTION\n    Takes the input text and generates a QR code image directly in the terminal output. This relies on an external QRCode.js library being loaded.',
        execute: function(args, query, displayOutput, services) {
            if (!query) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            if (!services.QRCode) {
                displayOutput("<pre class='error'>QRCode library not loaded. Cannot generate QR code.</pre>");
                return;
            }
            const qrContainerId = `qr-${Date.now()}`;
            displayOutput(`<pre>Generating QR code for: "${query.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}"</pre><div id="${qrContainerId}" class="qr-code-container"></div>`);
            try {
                new services.QRCode(services.outputDiv.querySelector(`#${qrContainerId}`), {
                    text: query, width: 128, height: 128,
                    colorDark : "#000000", colorLight : "#ffffff", correctLevel : services.QRCode.CorrectLevel.H
                });
            } catch (e) {
                displayOutput(`<pre class='error'>Error generating QR Code: ${e.message}.</pre>`);
                const el = services.outputDiv.querySelector(`#${qrContainerId}`);
                if (el) el.remove();
            }
        }
    };
})(globalThis);
