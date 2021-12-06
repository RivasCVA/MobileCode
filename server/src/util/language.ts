/** A JSON response interface for a solution test runtime error. */
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
        testCommand: (filePath: string): string => `python3 ${filePath}`,
        fileExtension: '.py',
        testFileName: 'test.py',
        unitTestFileName: 'utest.py',
        solutionFileName: 'solution.py',
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
        testCommand: (filePath: string): string => `node ${filePath}`,
        fileExtension: '.js',
        testFileName: 'test.js',
        unitTestFileName: 'utest.js',
        solutionFileName: 'solution.js',
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
    java: {
        testCommand: (filePath: string): string => {
            const { java } = LanguageSupport;
            const directoryPath = filePath.replace(java.testFileName, '');
            const javaFileNames = [java.solutionFileName, java.unitTestFileName, java.testFileName];
            const classFileName = java.testFileName.replace(java.fileExtension, '');
            const commands: string[] = [];
            commands.push(`cd ${directoryPath}`);
            commands.push(`javac ${javaFileNames.join(' ')}`);
            commands.push(`java ${classFileName}`);
            commands.push('cd');
            return commands.join(' && ');
        },
        fileExtension: '.java',
        testFileName: 'Test.java',
        unitTestFileName: 'UTest.java',
        solutionFileName: 'Solution.java',
        filterError: (message: string): LanguageError => {
            const result: LanguageError = { line: -1, message };
            // Check if the error can be filtered
            message.includes('error:');
            const startIndex = message.indexOf('error:');
            if (startIndex === -1) {
                return result;
            }
            const endIndex = message.substr(startIndex + 5).indexOf('^');
            const lineNumber = parseInt(message.substr(0, startIndex).replace(/[^0-9]/g, ''), 10);
            if (Number.isNaN(lineNumber)) {
                return result;
            }
            // Filter the error
            result.line = lineNumber;
            result.message = message.substr(startIndex + 5, endIndex !== -1 ? endIndex : undefined);
            return result;
        },
    },
};
