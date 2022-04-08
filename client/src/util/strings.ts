/**
 * Converts a word to title case.
 * Title case involves the first letter to be uppercased and the rest lowercased.
 * @param str Word to convert.
 */
export const titleCase = (str: string): string => {
    if (!str) {
        return str;
    }
    if (str.length === 1) {
        return str[0].toUpperCase();
    }
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

/**
 * Converts multi-line code to a single-line string.
 * @param code Multi-line code to parse.
 * @returns The resulting single-line string.
 */
export const codeToString = (code: string): string => {
    let str = code;
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\\n/g, '\\n');
    return str;
};

/**
 * Converts a single-line string to multi-line code.
 * @param str Single-line string to parse.
 * @returns The resulting multi-line code.
 */
export const stringToCode = (str: string): string => {
    let code = str;
    code = code.replace(/\\"/g, '"');
    code = code.replace(/\\n/g, '\n');
    return code;
};
