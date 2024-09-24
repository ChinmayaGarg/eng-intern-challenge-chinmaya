// Braille mappings for alphabets, numbers, and punctuation
const BRAILLE_DICT = {
    'a': 'O.....', 'b': 'O.O...', 'c': 'OO....', 'd': 'OO.O..', 'e': 'O..O..', 'f': 'OOO...', 'g': 'OOOO..', 'h': 'O.OO..',
    'i': '.OO...', 'j': '.OOO..', 'k': 'O...O.', 'l': 'O.O.O.', 'm': 'OO..O.', 'n': 'OO.OO.', 'o': 'O..OO.', 'p': 'OOO.O.',
    'q': 'OOOOO.', 'r': 'O.OOO.', 's': '.OO.O.', 't': '.OOOO.', 'u': 'O...OO', 'v': 'O.O.OO', 'w': '.OOO.O', 'x': 'OO..OO',
    'y': 'OO.OOO', 'z': 'O..OOO',

    // Numbers (Note: Braille uses the same symbols for 1-9 as letters A-I, and J for 0)
    '1': 'O.....', '2': 'O.O...', '3': 'OO....', '4': 'OO.O..', '5': 'O..O..', '6': 'OOO...', '7': 'OOOO..', '8': 'O.OO..',
    '9': '.OO...', '0': '.OOO..',

    // Punctuation and symbols
    '.': '..OO.O', ',': 'O.....', '?': '..OO.O', '!': 'O.OO.O', ':': 'O..OO.', ';': 'O.O.O.', '-': '..O...',
    '/': '..O.OO', '<': '.....O', '>': '.....O', '(': 'O..OO.', ')': '.O.O..', ' ': '......'
};

// Special symbols for capital letters and numbers
const CAPITAL_PREFIX = '.....O';
const NUMBER_PREFIX = '.O.OOO';

// Check if input contains only Braille characters (O, ., and spaces)
function isBraille(inputString) {
    return [...inputString].every(c => ['O', '.', ' '].includes(c));
}

// Convert English to Braille
function englishToBraille(englishText) {
    let brailleText = [];
    let isNumber = false; // Tracks if we are in a number mode

    for (const char of englishText) {
        if (char >= 'A' && char <= 'Z') {
            brailleText.push(CAPITAL_PREFIX); // Add capital prefix for uppercase letters
            brailleText.push(BRAILLE_DICT[char.toLowerCase()]);
            isNumber = false; // Reset number mode
        } else if (char >= '0' && char <= '9') {
            if (!isNumber) {
                brailleText.push(NUMBER_PREFIX);  // Add number prefix for digits
                isNumber = true; // Remain in number mode
            }
            brailleText.push(BRAILLE_DICT[char]);
        } else {
            brailleText.push(BRAILLE_DICT[char]);
            isNumber = false; // Reset number mode after encountering non-number
        }
    }
    return brailleText.join('');
}

// Convert Braille to English
function brailleToEnglish(brailleText) {
    let englishText = [];
    let i = 0;
    let capitalizeNext = false;
    let isNumber = false;

    while (i < brailleText.length) {
        const brailleChar = brailleText.slice(i, i + 6);
        if (brailleChar === CAPITAL_PREFIX) {
            capitalizeNext = true;
            i += 6;
        } else if (brailleChar === NUMBER_PREFIX) {
            isNumber = true;
            i += 6;
        } else if (brailleChar === '......') {  // Handle spaces
            englishText.push(' ');
            i += 6;
        } else {
            const char = BRAILLE_REVERSE_DICT[brailleChar];
            if (capitalizeNext) {
                englishText.push(char.toUpperCase());
                capitalizeNext = false;
            } else if (isNumber) {
                englishText.push(char);
                isNumber = false;
            } else {
                englishText.push(char);
            }
            i += 6;
        }
    }
    return englishText.join('');
}

// Main function to determine if input is Braille or English and translate accordingly
function translate(inputString) {
    if (isBraille(inputString)) {
        return brailleToEnglish(inputString);
    } else {
        return englishToBraille(inputString);
    }
}

// Get input string from command line arguments
const inputString = process.argv.slice(2).join(' ');

// Output the translated string
console.log(translate(inputString));
