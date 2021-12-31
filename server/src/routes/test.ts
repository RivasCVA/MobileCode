import express from 'express';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import exec from '@root/util/exec';
import { writeFile, deleteFile, readFile, createDirectory } from '@root/util/fileman';
import { stringToCode } from '@root/util/cparse';
import { LanguageManager } from '@root/util/language';

const router = express.Router();

/** A JSON response interface for the Test POST request. */
interface DefaultPostRequest {
    user: string;
    problem: string;
    language: keyof typeof LanguageManager;
    code: string;
}

router.post('/', async (req, res) => {
    const { user, problem, language, code }: DefaultPostRequest = req.body;
    const languageManager = LanguageManager[language];

    // Verify if the selected langauge is supported
    if (languageManager === undefined) {
        const message = `Language ${language} is not supported`;
        res.status(StatusCodes.BAD_REQUEST).send(message);
        return;
    }

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

        // Exec the code
        const stdout = await exec(languageManager.getTestCommand(testCodePath));
        res.status(StatusCodes.OK).send(stdout);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(
            JSON.stringify(languageManager.filterError(error))
        );
    }

    // Remove the user-problem directory
    await deleteFile(cacheDirectoryPath);
});

export default router;
