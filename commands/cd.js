(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.cd = {
        name: "cd",
        description: "Change mock directory.",
        usage: "cd [path]",
        manPage: "cd\n\nNAME\n    cd - change directory (mock)\n\nSYNOPSIS\n    cd [DIRECTORY]\n\nDESCRIPTION\n    Change the current mock directory to DIRECTORY. If DIRECTORY is not\n    supplied, the value of the HOME shell variable is used (which is ~).",
        execute: function(args, query, displayOutput, services) {
            let targetPath = args[0] || "~";
            targetPath = services.interpolateEnvVars(targetPath);
            let newPath = "";
            const currentFsPath = services.currentPath();
            const fs = services.mockFileSystem();

            if (targetPath === "~" || targetPath === "~/") {
                newPath = "~";
            } else if (targetPath === "..") {
                if (currentFsPath !== "~") {
                    newPath = currentFsPath.substring(0, currentFsPath.lastIndexOf('/')) || "~";
                } else {
                    newPath = "~"; 
                }
            } else if (targetPath.startsWith("~/")) { 
                const resolved = targetPath.replace(/\/$/, ''); 
                if (fs[resolved] || resolved === "~") { 
                    newPath = resolved;
                } else {
                    displayOutput(`<pre>cd: no such file or directory: ${targetPath}</pre>`); return;
                }
            } else { 
                const base = currentFsPath === "~" ? "~/" : currentFsPath + "/";
                const potentialPath = (base + targetPath).replace(/\/+/g, '/').replace(/\/$/, ''); 

                if (fs[potentialPath]) {
                    newPath = potentialPath;
                } else {
                    displayOutput(`<pre>cd: no such file or directory: ${targetPath}</pre>`); return;
                }
            }
            services.setCurrentPathAndPrompt(newPath || "~"); 
        }
    };
})(globalThis);
