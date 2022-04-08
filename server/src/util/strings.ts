/**
 * Converts multi-line string to a single-line string.
 * @param code Multi-line string to parse.
 * @returns The resulting single-line string.
 */
export const codeToString = (code: string): string => {
    let str = code;
    str = str.replace(/"/g, '\\"');
    str = str.replace(/\n/g, '\\n');
    return str;
};

/**
 * Converts a single-line string to multi-line string.
 * @param str Single-line string to parse.
 * @returns The resulting multi-line string.
 */
export const stringToCode = (str: string): string => {
    let code = str;
    code = code.replace(/\\"/g, '"');
    code = code.replace(/\\n/g, '\n');
    return code;
};
