# Braille Translator in Python

import sys

# Braille mappings for alphabets, numbers, and punctuation
BRAILLE_DICT = {
    'a': 'O.....', 'b': 'O.O...', 'c': 'OO....', 'd': 'OO.O..', 'e': 'O..O..', 'f': 'OOO...', 'g': 'OOOO..', 'h': 'O.OO..',
    'i': '.OO...', 'j': '.OOO..', 'k': 'O...O.', 'l': 'O.O.O.', 'm': 'OO..O.', 'n': 'OO.OO.', 'o': 'O..OO.', 'p': 'OOO.O.',
    'q': 'OOOOO.', 'r': 'O.OOO.', 's': '.OO.O.', 't': '.OOOO.', 'u': 'O...OO', 'v': 'O.O.OO', 'w': '.OOO.O', 'x': 'OO..OO',
    'y': 'OO.OOO', 'z': 'O..OOO',
    
    # Numbers (Note: Braille uses the same symbols for 1-9 as letters A-I, and J for 0)
    '1': 'O.....', '2': 'O.O...', '3': 'OO....', '4': 'OO.O..', '5': 'O..O..', '6': 'OOO...', '7': 'OOOO..', '8': 'O.OO..',
    '9': '.OO...', '0': '.OOO..',
    
    # Punctuation and symbols
    '.': '..OO.O', ',': 'O.....', '?': '..OO.O', '!': 'O.OO.O', ':': 'O..OO.', ';': 'O.O.O.', '-': '..O... ',
    '/': '..O.OO', '<': '.....O', '>': '.....O', '(': 'O..OO.', ')': '.O.O..', ' ': '......'
}

# Reverse Braille mapping (for Braille to English)
BRAILLE_REVERSE_DICT = {v: k for k, v in BRAILLE_DICT.items()}

# Special symbols for capital letters and numbers
CAPITAL_PREFIX = '.....O'
NUMBER_PREFIX = '.O.OOO'

def is_braille(input_string):
    # Check if input contains only Braille characters (O, ., and spaces)
    return all(c in ['O', '.', ' '] for c in input_string)

def english_to_braille(english_text):
    braille_text = []
    for char in english_text:
        if char.isupper():
            braille_text.append(CAPITAL_PREFIX)  # Add capital prefix for uppercase letters
            braille_text.append(BRAILLE_DICT[char.lower()])
        elif char.isdigit():
            braille_text.append(NUMBER_PREFIX)  # Add number prefix for digits
            braille_text.append(BRAILLE_DICT[char])
        else:
            braille_text.append(BRAILLE_DICT[char])
    return ''.join(braille_text)

def braille_to_english(braille_text):
    english_text = []
    i = 0
    capitalize_next = False
    is_number = False
    
    while i < len(braille_text):
        if braille_text[i:i+6] == CAPITAL_PREFIX:
            capitalize_next = True
            i += 6
        elif braille_text[i:i+6] == NUMBER_PREFIX:
            is_number = True
            i += 6
        elif braille_text[i:i+6] == '......':  # Handle spaces
            english_text.append(' ')
            i += 6
        else:
            braille_char = braille_text[i:i+6]
            if braille_char in BRAILLE_REVERSE_DICT:
                char = BRAILLE_REVERSE_DICT[braille_char]
                if capitalize_next:
                    char = char.upper()
                    capitalize_next = False
                if is_number:
                    char = str(char)
                    is_number = False
                english_text.append(char)
            i += 6
    return ''.join(english_text)

def main():
    # Get the input string from command line arguments
    input_string = ' '.join(sys.argv[1:])

    # Determine if the input is Braille or English and translate accordingly
    if is_braille(input_string):
        translated_text = braille_to_english(input_string)
    else:
        translated_text = english_to_braille(input_string)

    # Output the translated string
    print(translated_text)

if __name__ == "__main__":
    main()

