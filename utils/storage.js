(function(globalContext) {
    if (!globalContext.FoxTermUtils) {
        globalContext.FoxTermUtils = {};
    }

    const STORAGE_PREFIX = 'foxterm_';

    function saveData(key, data) {
        try {
            localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving ${key} to localStorage:`, e);
            // Potentially display a message to the user in the terminal?
        }
    }

    function loadData(key, defaultValue) {
        try {
            const storedValue = localStorage.getItem(STORAGE_PREFIX + key);
            if (storedValue === null || typeof storedValue === 'undefined') {
                return defaultValue;
            }
            return JSON.parse(storedValue);
        } catch (e) {
            console.error(`Error loading ${key} from localStorage:`, e);
            return defaultValue;
        }
    }

    globalContext.FoxTermUtils.storage = {
        saveEnvVars: (envVars) => saveData('envVars', envVars),
        loadEnvVars: (defaultEnvVars) => loadData('envVars', defaultEnvVars),

        saveAliases: (aliases) => saveData('aliases', aliases),
        loadAliases: (defaultAliases) => loadData('aliases', defaultAliases),

        saveCurrentTheme: (themeName) => saveData('currentTheme', themeName),
        loadCurrentTheme: (defaultThemeName) => loadData('currentTheme', defaultThemeName),

        saveCommandHistory: (history) => saveData('commandHistory', history),
        loadCommandHistory: (defaultHistory) => loadData('commandHistory', defaultHistory),

        saveCurrentPath: (path) => saveData('currentPath', path),
        loadCurrentPath: (defaultPath) => loadData('currentPath', defaultPath),

        saveAutorunCommands: (commands) => saveData('autorunCommands', commands),
        loadAutorunCommands: (defaultCommands) => loadData('autorunCommands', defaultCommands),

        // Added for shortcuts command
        saveShortcuts: (shortcuts) => saveData('shortcuts', shortcuts),
        loadShortcuts: (defaultShortcuts) => loadData('shortcuts', defaultShortcuts),
        // Expose generic loadData for direct use by commands if necessary (like shortcuts.js does for its own key)
        saveData: saveData, 
        loadData: loadData,

        clearAllFoxTermStorage: () => {
            let clearedItems = [];
            // Define all known storage keys managed by FoxTerm
            const knownKeys = [
                'envVars',
                'aliases',
                'currentTheme',
                'commandHistory',
                'currentPath',
                'autorunCommands',
                'shortcuts' // Added shortcuts
            ];

            for (const key of Object.keys(localStorage)) {
                if (key && key.startsWith(STORAGE_PREFIX)) {
                    const userFriendlyKey = key.replace(STORAGE_PREFIX, '');
                    // Only remove if it's a known key, or adopt a policy to remove all prefixed keys
                    if (knownKeys.includes(userFriendlyKey)) {
                        clearedItems.push(userFriendlyKey);
                        localStorage.removeItem(key);
                    }
                }
            }
            return clearedItems;
        }
    };
})(globalThis);
