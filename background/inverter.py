import json

# File paths
input_file = "./ascii_light.txt"
output_file = "./ascii_dark.txt"
map_file = "inversion_table.json"

# Open the JSON map and both input/output text files
with open(map_file, "r", encoding="utf-8") as fm, \
     open(input_file, "r", encoding="utf-8") as fi, \
     open(output_file, "w", encoding="utf-8") as fo:
    
    # Load the inversion map from JSON
    invert_map = json.load(fm)

    # Process each line in the input file
    for line in fi:
        # Apply the inversion map to each character, keeping newlines intact
        transformed_line = ''.join(
            invert_map.get(char, char)  # Use the map if the char exists, otherwise keep it unchanged
            for char in line
        )
        # Write the transformed line to the output file
        fo.write(transformed_line)

print(f"Transformation completed. Output saved to '{output_file}'.")
