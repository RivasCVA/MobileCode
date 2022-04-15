/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */

/** A JSON response interface for a solution test runtime error. */
interface LanguageError {
    line: number;
    message: string;
}

abstract class AbstractLanguageManager {
    /**
     * The Linux CLI command to run the file.
     * @param filePath File path of the file to run.
     */
    abstract getTestCommand(filePath: string): string;

    /** The file extension. */
    abstract getFileExtension(): string;

    /** Entire file name of the test file. */
    abstract getTestFileName(): string;

    /** Entire file name of the unit test file. */
    abstract getUnitTestFileName(): string;

    /** Entire file name of the user solution file. */
    abstract getSolutionFileName(): string;

    /**
     * Parses and filters the error message to a JSON format (if possible).
     * @param message Error message.
     */
    abstract filterError(message: string): LanguageError;
}

class PythonLanguageManager extends AbstractLanguageManager {
    getTestCommand(filePath: string): string {
        return `python3 ${filePath}`;
    }

    getFileExtension(): string {
        return '.py';
    }

    getTestFileName(): string {
        return 'test.py';
    }

    getUnitTestFileName(): string {
        return 'utest.py';
    }

    getSolutionFileName(): string {
        return 'solution.py';
    }

    filterError(message: string): LanguageError {
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
    }
}

class JavascriptLanguageManager extends AbstractLanguageManager {
    getTestCommand(filePath: string): string {
        return `node ${filePath}`;
    }

    getFileExtension(): string {
        return '.js';
    }

    getTestFileName(): string {
        return 'test.js';
    }

    getUnitTestFileName(): string {
        return 'utest.js';
    }

    getSolutionFileName(): string {
        return 'solution.js';
    }

    filterError(message: string): LanguageError {
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
    }
}

class JavaLanguageManager extends AbstractLanguageManager {
    getTestCommand(filePath: string): string {
        const { java } = LanguageManager;
        const directoryPath = filePath.replace(java.getTestFileName(), '');
        const javaFileNames = [
            java.getSolutionFileName(),
            java.getUnitTestFileName(),
            java.getTestFileName(),
        ];
        const classFileName = java.getTestFileName().replace(java.getFileExtension(), '');
        const commands: string[] = [];
        commands.push(`cd ${directoryPath}`);
        commands.push(`javac ${javaFileNames.join(' ')}`);
        commands.push(`java ${classFileName}`);
        commands.push('cd');
        return commands.join(' && ');
    }

    getFileExtension(): string {
        return '.java';
    }

    getTestFileName(): string {
        return 'Test.java';
    }

    getUnitTestFileName(): string {
        return 'UTest.java';
    }

    getSolutionFileName(): string {
        return 'Solution.java';
    }

    filterError(message: string): LanguageError {
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
    }
}

/**
 * Offers language-specific support for executing code.
 * All languages listed are the only supported languages.
 */
export const LanguageManager = {
    python: new PythonLanguageManager(),
    javascript: new JavascriptLanguageManager(),
    java: new JavaLanguageManager(),
};

/**
 * Type of all supported languages.
 */
export type Language = keyof typeof LanguageManager;
