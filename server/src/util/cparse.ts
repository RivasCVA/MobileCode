/**
 * Converts multi-line code to a single-line string.
 * @param code Multi-line code to parse.
 * @returns The resulting single-line string.
 */
export const codeToString = (code: string): string => {
    let str = code;
    str = str.replace(new RegExp('"', 'g'), '\\"');
    str = str.replace(new RegExp('\\n', 'g'), '\\n');
    return str;
};

/**
 * Converts a single-line string to multi-line code.
 * @param str Single-line string to parse.
 * @returns The resulting multi-line code.
 */
export const stringToCode = (str: string): string => {
    let code = str;
    code = code.replace(new RegExp('\\"', 'g'), '"');
    code = code.replace(new RegExp('\\n', 'g'), '\n');
    return code;
};
