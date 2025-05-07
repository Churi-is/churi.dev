(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.neofetch = {
        name: "neofetch",
        aliases: ["sysinfo"],
        description: "Display mock system information.",
        manPage: 'neofetch, sysinfo\n\nNAME\n    neofetch, sysinfo - Displays mock system information in a neofetch-like style.\n\nSYNOPSIS\n    neofetch\n\nDESCRIPTION\n    Simulates the neofetch command, showing various pieces of information about the browser environment, such as user agent, screen resolution, and mock uptime. It uses environment variables like $USER and $HOSTNAME.',
        execute: function(args, query, displayOutput, services) {
            const userAgent = navigator.userAgent;
            const lang = navigator.language;
            const screenRes = `${services.window.screen.width}x${services.window.screen.height}`;
            const uptimeMinutes = ((performance.now() / 1000) / 60).toFixed(2);
            const env = services.envVars;

            let neofetchOutput = `<pre style="color:var(--text-color)">`;
            const items = [
                { label: "OS", value: "Browser Environment (HTML/CSS/JS)" },
                { label: "Host", value: "Your Device" },
                { label: "Kernel", value: "Browser JS Engine" },
                { label: "Uptime", value: `${uptimeMinutes} minutes` },
                { label: "Shell", value: `${env.SHELL || 'foxterm.js'} ${env.TERM_VERSION || ''}` },
                { label: "Resolution", value: screenRes },
                { label: "Terminal", value: "This Very Terminal" },
                { label: "CPU", value: "Your Brain" },
                { label: "Memory", value: "Enough for this tab" },
                { label: "User Agent", value: `${userAgent.substring(0, 60)}${userAgent.length > 60 ? '...' : ''}` },
                { label: "Language", value: lang }
            ];

            const userHost = `${env.USER || 'user'}@${env.HOSTNAME || 'host'}`;
            neofetchOutput += `${userHost}\n-----------------\n`;

            items.forEach(item => {
                neofetchOutput += `<span style="color:var(--highlight-color)">${item.label.padEnd(12)}</span> ${item.value}\n`;
            });
            neofetchOutput += `</pre>`;
            displayOutput(neofetchOutput);
        }
    };

})(globalThis);
