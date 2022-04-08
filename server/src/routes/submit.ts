import express from 'express';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import exec from '@root/util/exec';
import { writeFile, deleteFile, readFile, createDirectory } from '@root/util/fileman';
import { stringToCode } from '@root/util/strings';
import { LanguageManager } from '@root/util/language';
import * as Submission from '@root/models/submission';

const router = express.Router();

router.post('/', async (req: Submission.request, res) => {
    // Note: the validation checks if the given language is supported
    const { error } = Submission.validation.validate(req.body);
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
    }

    const { user, problem, language, code } = req.body;
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
        const stdout = await exec(languageManager.getTestCommand(testCodePath));
        res.status(StatusCodes.OK).json(JSON.parse(stdout));
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(languageManager.filterError(err));
    }

    // Remove the user-problem directory
    await deleteFile(cacheDirectoryPath);
});

export default router;
