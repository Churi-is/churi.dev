(function(globalContext) {
    if (!globalContext.FoxTermCommands) { globalContext.FoxTermCommands = {}; }
    globalContext.FoxTermCommands.ls = {
        name: "ls",
        description: 'List "files" in mock directory.',
        usage: "ls [path]",
        manPage: "ls\n\nNAME\n    ls - list directory contents (mock)\n\nSYNOPSIS\n    ls [DIRECTORY]\n\nDESCRIPTION\n    List information about the mock FILES (the current mock directory\n    by default).",
        execute: function(args, query, displayOutput, services) {
            let pathToList = services.currentPath();
            const fs = services.mockFileSystem();
            let argPath = services.interpolateEnvVars(args[0] || "");

            if (argPath) {
                if (argPath === "..") {
                    if (services.currentPath() !== "~") pathToList = services.currentPath().substring(0, services.currentPath().lastIndexOf('/')) || "~";
                } else if (argPath.startsWith("~/")) {
                    const resolvedPath = argPath.replace(/\/$/, '');
                    if (fs[resolvedPath] || resolvedPath === "~") pathToList = resolvedPath;
                    else { displayOutput(`<pre>ls: cannot access '${argPath}': No such file or directory</pre>`); return; }
                } else if (argPath.includes('/')) {
                     if (fs[argPath.replace(/\/$/, '')]) pathToList = argPath.replace(/\/$/, '');
                     else {
                        const resolvedPath = (services.currentPath() === "~" ? "~/" : services.currentPath() + "/") + argPath.replace(/\/$/, '');
                        if (fs[resolvedPath.replace(/\/$/, '')]) pathToList = resolvedPath.replace(/\/$/, '');
                        else { displayOutput(`<pre>ls: cannot access '${argPath}': No such file or directory</pre>`); return; }
                     }
                } else { 
                    const resolvedPath = (services.currentPath() === "~" ? "~/" : services.currentPath() + "/") + argPath;
                    if (fs[resolvedPath]) pathToList = resolvedPath;
                    else { displayOutput(`<pre>ls: cannot access '${argPath}': No such file or directory</pre>`); return; }
                }
            }
            const items = fs[pathToList] || [];
            let lsOutput = "<pre>";
            items.forEach(item => {
                const itemFullPath = (pathToList === "~" ? "~/" : (pathToList.endsWith("/") ? pathToList : pathToList + "/")) + item;
                const normalizedItemFullPath = itemFullPath.replace(/\/+/g, '/').replace(/\/$/, '');
                
                lsOutput += (fs[normalizedItemFullPath] ? `<span style="color:var(--link-color)">${item}/</span>` : item) + "\n";
            });
            if (items.length === 0 && !fs[pathToList] && argPath && pathToList !== argPath) { 
            } else if (items.length === 0 && (fs[pathToList] || pathToList === services.currentPath() && !argPath)) { 
                lsOutput += "(empty directory)\n";
            }
            lsOutput += "</pre>";
            displayOutput(lsOutput);
        }
    };
})(globalThis);
