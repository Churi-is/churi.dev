(function(globalContext) {
    if (!globalContext.FoxTermCommands) {
        globalContext.FoxTermCommands = {};
    }
    const figletChars = { // Keep this local to the command
        'A': [" ### ", "#   #", "#####", "#   #", "#   #"], 'B': ["#### ", "#   #", "#### ", "#   #", "#### "],
        'C': [" ### ", "#    ", "#    ", "#    ", " ### "], 'D': ["#### ", "#   #", "#   #", "#   #", "#### "],
        'E': ["#####", "#    ", "###  ", "#    ", "#####"], 'F': ["#####", "#    ", "###  ", "#    ", "#    "],
        'G': [" ### ", "#    ", "# ###", "#   #", " ### "], 'H': ["#   #", "#   #", "#####", "#   #", "#   #"],
        'I': [" ### ", "  #  ", "  #  ", "  #  ", " ### "], 'J': ["  ###", "   # ", "   # ", "#  # ", " ##  "],
        'K': ["#  # ", "# #  ", "##   ", "# #  ", "#  # "], 'L': ["#    ", "#    ", "#    ", "#    ", "#####"],
        'M': ["#   #", "## ##", "# # #", "#   #", "#   #"], 'N': ["#   #", "##  #", "# # #", "#  ##", "#   #"],
        'O': [" ### ", "#   #", "#   #", "#   #", " ### "], 'P': ["#### ", "#   #", "#### ", "#    ", "#    "],
        'Q': [" ### ", "#   #", "# # #", " ## #", "   # "], 'R': ["#### ", "#   #", "#### ", "#  # ", "#   #"],
        'S': [" ####", "#    ", " ### ", "    #", "#### "], 'T': ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
        'U': ["#   #", "#   #", "#   #", "#   #", " ### "], 'V': ["#   #", "#   #", " # # ", " # # ", "  #  "],
        'W': ["#   #", "#   #", "# # #", "## ##", "#   #"], 'X': ["#   #", " # # ", "  #  ", " # # ", "#   #"],
        'Y': ["#   #", " # # ", "  #  ", "  #  ", "  #  "], 'Z': ["#####", "   # ", "  #  ", " #   ", "#####"],
        ' ': ["     ","     ","     ","     ","     "], '!': ["  #  ","  #  ","  #  ","     ","  #  "],
        '?': [" ### ","#   #","   # ","     ","  #  "], '.': ["     ","     ","     ","     ","  #  "],
        '0': [" ### ","#   #","# # #","#   #"," ### "], '1': ["  #  "," ##  ","  #  ","  #  "," ### "],
        '2': [" ### ","#   #","  ## "," #   ","#####"], '3': [" ### ","#   #","  ## ","#   #"," ### "],
        '4': ["#  # ","#  # ","#####","   # ","   # "], '5': ["#####","#    ","#### ","    #","#### "],
        '6': [" ### ","#    ","#### ","#   #"," ### "], '7': ["#####","   # ","  #  "," #   ","#    "],
        '8': [" ### ","#   #"," ### ","#   #"," ### "], '9': [" ### ","#   #"," ####","    #"," ### "]
    };

    globalContext.FoxTermCommands.figlet = {
        name: "figlet",
        description: "Simple block-letter ASCII art.",
        usage: "figlet {text}",
        manPage: 'figlet\n\nNAME\n    figlet - Displays text using large characters made from ordinary screen characters.\n\nSYNOPSIS\n    figlet {text}\n\nDESCRIPTION\n    Takes the input text and renders it as "block letter" ASCII art, similar to the traditional FIGlet program. Uses a very basic, built-in font.',
        execute: function(args, query, displayOutput, services) {
            if (!query) { displayOutput(`<pre class='error'>Usage: ${this.usage}</pre>`); return; }
            let outputLines = ["", "", "", "", ""];
            for (let char of query.toUpperCase()) {
                const figChar = figletChars[char] || figletChars['?']; // Fallback to '?'
                for (let i = 0; i < 5; i++) {
                    outputLines[i] += (figChar[i] || "     ") + " ";
                }
            }
            displayOutput(`<pre>${outputLines.join("\n")}</pre>`);
        }
    };
})(globalThis);
