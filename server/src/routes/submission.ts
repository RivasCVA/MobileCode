import express from 'express';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import exec from '@root/util/exec';
import { writeFile, deleteFile, readFile, createDirectory } from '@root/util/fileman';
import { stringToCode } from '@root/util/strings';
import { LanguageManager, Language } from '@root/util/language';
import * as Submission from '@root/models/submission';

const router = express.Router();

/**
 * Submits the given code by running against the server test cases.
 * @param user Username of sender.
 * @param problem Problem being submitted (directory name only).
 * @param language Programming language being submitted.
 * @param code Code being submitted.
 * @returns A promise resolving with the exec output or rejecting with an exec error.
 */
export const submit = async (
    user: string,
    problem: string,
    language: Language,
    code: string
): Promise<string> => {
    // Helps manage and run the code
    const languageManager = LanguageManager[language];

    // File with the test cases
    const testFilePath = path.join(
        __dirname,
        `../problems/${problem}/${languageManager.getTestFileName()}`
    );

    // File with the unit test functionality
    const unitTestFilePath = path.join(
        __dirname,
        `../problems/${problem}/${languageManager.getUnitTestFileName()}`
    );

    // Directory to host all test files
    const cacheDirectoryPath = path.join(__dirname, `../cache/${user}-${problem}`);

    // Track return value
    let throwError: boolean = false;
    let result: string;

    try {
        // Create the user-problem directory to hold all test files
        await createDirectory(cacheDirectoryPath);

        // Gather all the code to be run
        const userCode = stringToCode(code);
        const userCodePath = `${cacheDirectoryPath}/${languageManager.getSolutionFileName()}`;
        const testCode = await readFile(testFilePath);
        const testCodePath = `${cacheDirectoryPath}/${languageManager.getTestFileName()}`;
        const unitTestCode = await readFile(unitTestFilePath);
        const unitTestCodePath = `${cacheDirectoryPath}/${languageManager.getUnitTestFileName()}`;

        // Paste all the code into the user-problem directory
        await writeFile(userCodePath, userCode);
        await writeFile(testCodePath, testCode);
        await writeFile(unitTestCodePath, unitTestCode);

        // Execute the code
        result = await exec(languageManager.getTestCommand(testCodePath));
    } catch (err) {
        throwError = true;
        // Return a simplified error message
        if (typeof err === 'string') {
            result = JSON.stringify(languageManager.filterError(err));
        } else if (err.code) {
            switch (err.code) {
                case 'ENOENT':
                    result = JSON.stringify({
                        message: `Problem directory "${problem}" not found`,
                    });
                    break;
                default:
                    result = JSON.stringify({
                        message: `Failed with error code: ${err.code}`,
                    });
                    break;
            }
        } else {
            result = JSON.stringify(err);
        }
    }

    // Remove the user-problem directory
    await deleteFile(cacheDirectoryPath);

    if (!throwError) {
        return Promise.resolve(result);
    }
    return Promise.reject(result);
};

router.post('/', async (req: Submission.request, res) => {
    // Note: the validation checks if the given language is supported
    const { error } = Submission.validation.validate(req.body);
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
    }

    const { user, problem, language, code } = req.body;

    try {
        const result = await submit(user, problem, language, code);
        res.status(StatusCodes.OK).json(JSON.parse(result));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(JSON.parse(err));
    }
});

export default router;
