/** Type-matching the JSON error response on a language runtime error. */
export interface LanguageError {
    line: number;
    message: string;
}

/**
 * Offers language-specific support for executing code.
 * All languages listed are the only supported languages.
 */
export const LanguageSupport = {
    python: {
        testCommand: (filePath: string) => `python3 ${filePath}`,
        fileExtension: '.py',
        filterError: (message: string): LanguageError => {
            const result: LanguageError = { line: -1, message };
            // Check if error can be filtered
            const messageArr = message.split('\n');
            const startIndex = messageArr.findIndex((line) => line.includes('solution.py'));
            if (startIndex === -1) {
                return result;
            }
            const lineNumber = parseInt(messageArr[startIndex].replace(/[^0-9]/g, ''), 10);
            if (Number.isNaN(lineNumber)) {
                return result;
            }
            // Filter the error
            result.line = lineNumber;
            result.message = '';
            messageArr.slice(startIndex + 1).forEach((line, index, arr) => {
                if (line.length > 0) {
                    result.message += line;
                    result.message += index < arr.length ? '\n' : '';
                }
            });
            return result;
        },
    },
    javascript: {
        testCommand: (filePath: string) => `node ${filePath}`,
        fileExtension: '.js',
        filterError: (message: string): LanguageError => {
            const result: LanguageError = { line: -1, message };
            // Check if the error can be filtered
            const MIN_NUM_LINES = 5;
            const messageArr = message.split('\n');
            if (messageArr.length <= MIN_NUM_LINES || !messageArr[0].includes('node')) {
                return result;
            }
            const lineNumber = parseInt(messageArr[1].replace(/[^0-9]/g, ''), 10);
            if (Number.isNaN(lineNumber)) {
                return result;
            }
            // Filter the error
            result.line = lineNumber;
            result.message = '';
            messageArr.slice(2, MIN_NUM_LINES + 1).forEach((line, index, arr) => {
                if (line.length > 0) {
                    result.message += line;
                    result.message += index < arr.length ? '\n' : '';
                }
            });
            return result;
        },
    },
};
