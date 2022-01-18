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
