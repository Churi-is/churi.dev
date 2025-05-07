(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    globalContext.FoxTermCommands.temp = {
        name: "temp",
        description: "Convert temperature.",
        usage: "temp {value} {C|F} to {F|C}",
        manPage: 'temp\n\nNAME\n    temp - Converts temperatures between Celsius and Fahrenheit.\n\nSYNOPSIS\n    temp {value} {C|F} to {F|C}\n\nDESCRIPTION\n    Converts a given temperature value from Celsius to Fahrenheit or vice-versa. For example, \'temp 100 C to F\' or \'temp 32 F to C\'.',
        execute: function(args, query, displayOutput, services) {
             if (args.length < 4 || args[2].toLowerCase() !== 'to') { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
             const tempVal = parseFloat(args[0]);
             const fromUnit = args[1].toUpperCase();
             const toUnit = args[3].toUpperCase();
             if (isNaN(tempVal)) { displayOutput("<pre class='error'>Invalid temperature value.</pre>"); return; }
             let resultTemp;
             if (fromUnit === 'C' && toUnit === 'F') {
                 resultTemp = (tempVal * 9/5) + 32;
                 displayOutput(`<pre>${tempVal}°C is ${resultTemp.toFixed(2)}°F</pre>`);
             } else if (fromUnit === 'F' && toUnit === 'C') {
                 resultTemp = (tempVal - 32) * 5/9;
                 displayOutput(`<pre>${tempVal}°F is ${resultTemp.toFixed(2)}°C</pre>`);
             } else if (fromUnit === toUnit) {
                 displayOutput(`<pre>${tempVal}°${fromUnit} is ${tempVal}°${toUnit} (no conversion needed)</pre>`);
             } else {
                 displayOutput("<pre class='error'>Invalid units. Use C (Celsius) or F (Fahrenheit).</pre>");
             }
        }
    };
})(globalThis);
