(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.cat = {
        name: "cat",
        description: "Display mock file content.",
        usage: "cat {filename}",
        manPage: "cat\n\nNAME\n    cat - concatenate and print files (mock)\n\nSYNOPSIS\n    cat [FILE]...\n\nDESCRIPTION\n    Concatenate mock FILE(s) to standard output.",
        execute: function(args, query, displayOutput, services) {
            if (!args[0]) { displayOutput("<pre class='error'>Usage: cat {filename}</pre>"); return; }
            let fileToCat = services.interpolateEnvVars(args[0]);
            let resolvedFileToCat = "";
            const currentFsPath = services.currentPath();
            const contents = services.mockFileContents();

            if (fileToCat.startsWith("~/")) { 
                resolvedFileToCat = fileToCat;
            } else if (fileToCat.includes("/")) { 
                if (contents[fileToCat]) { 
                    resolvedFileToCat = fileToCat;
                } else { 
                    const base = currentFsPath === "~" ? "~/" : currentFsPath + "/";
                    resolvedFileToCat = base + fileToCat;
                }
            } else { 
                const base = currentFsPath === "~" ? "~/" : currentFsPath + "/";
                resolvedFileToCat = base + fileToCat;
            }
            
            resolvedFileToCat = resolvedFileToCat.replace(/\/+/g, '/').replace(/\/$/, ''); 

            if (contents[resolvedFileToCat]) {
                displayOutput(`<pre>${services.interpolateEnvVars(contents[resolvedFileToCat]).replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">")}</pre>`);
            } else {
                displayOutput(`<pre>cat: ${args[0]}: No such file or directory</pre>`);
            }
        }
    };
})(globalThis);
