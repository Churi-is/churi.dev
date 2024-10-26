import os
import requests
from PIL import Image, ImageDraw, ImageFont

def download_font(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Font downloaded and saved to {save_path}")
    else:
        print(f"Failed to download font. Status code: {response.status_code}")

def fetch_ascii_art(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except IOError as e:
        print(f"Error reading ASCII art file: {e}")
        return ''

def create_background(output_path):
    # Constants
    char = '⣿'
    rows = 50
    aspect_ratio = 42/9
    font_url = "https://github.com/googlefonts/noto-fonts/raw/main/unhinted/otf/NotoSansSymbols2/NotoSansSymbols2-Regular.otf"
    font_path = "NotoSansSymbols2-Regular.otf"

    # Download font if it doesn't exist
    if not os.path.exists(font_path):
        download_font(font_url, font_path)

    # Load ASCII art
    ascii_art = fetch_ascii_art('./background/ascii_dark.txt')
    ascii_art_lines = ascii_art.split('\n')
    art_height = len(ascii_art_lines)
    art_width = max(len(line) for line in ascii_art_lines)

    # Calculate dimensions
    height = 4320  # Maintain high resolution
    width = int(height * aspect_ratio)
    font_size = height // rows

    # Create image and draw object
    image = Image.new('RGB', (width, height), color='white')
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(font_path, font_size)

    # Calculate dimensions
    char_width = int(font.getlength(char))
    char_height = font_size
    cols = width // char_width

    # Calculate position for bottom-left corner
    start_x = char_width * 2  # Add a small margin from the left edge
    start_y = height - art_height * char_height - char_height * 2  # Keep the same vertical positioning

    # Draw background and ASCII art simultaneously
    for y in range(0, height, char_height):
        line = ''
        for x in range(0, width, char_width):
            # Check if current position is within ASCII art bounds
            art_row = (y - start_y) // char_height
            art_col = (x - start_x) // char_width
            if (0 <= art_row < art_height and 0 <= art_col < art_width and
                art_col < len(ascii_art_lines[art_row]) and ascii_art_lines[art_row][art_col] != ' '):
                line += ascii_art_lines[art_row][art_col]
            else:
                line += char
        draw.text((0, y), line, fill='black', font=font)

    # Save the image
    image.save(output_path)
    print(f"Image saved to {output_path}")
    print(f"Image dimensions: {width}x{height}")
    print(f"Font size: {font_size}")
    print(f"Characters per row: {cols}")

if __name__ == "__main__":
    output_file = "./background/dotart_background.png"
    create_background(output_file)