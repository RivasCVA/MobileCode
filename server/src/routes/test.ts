import express from 'express';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import exec from '@root/util/exec';
import { writeFile, deleteFile, readFile, createDirectory } from '@root/util/fileman';
import { stringToCode } from '@root/util/cparse';
import { LanguageSupport } from '@root/util/language';

const router = express.Router();

/** A JSON response interface for the Test POST request. */
interface DefaultPostRequest {
    user: string;
    problem: string;
    language: keyof typeof LanguageSupport;
    code: string;
}

router.post('/', async (req, res) => {
    const { user, problem, language, code }: DefaultPostRequest = req.body;
    const languageSupport = LanguageSupport[language];

    // Verify if the selected langauge is supported
    if (languageSupport === undefined) {
        const message = `Language ${language} is not supported`;
        res.status(StatusCodes.BAD_REQUEST).send(message);
        return;
    }

    // File with the test cases
    const testFilePath = path.join(
        __dirname,
        `../problems/${problem}/${languageSupport.testFileName}`
    );

    // File with the unit test functionality
    const unitTestFilePath = path.join(
        __dirname,
        `../problems/${problem}/${languageSupport.unitTestFileName}`
    );

    // Directory to host all test files
    const cacheDirectoryPath = path.join(__dirname, `../cache/${user}-${problem}`);
    try {
        await createDirectory(cacheDirectoryPath);
        const userCode = stringToCode(code);
        const userCodePath = `${cacheDirectoryPath}/${languageSupport.solutionFileName}`;
        const testCode = await readFile(testFilePath);
        const testCodePath = `${cacheDirectoryPath}/${languageSupport.testFileName}`;
        const unitTestCode = await readFile(unitTestFilePath);
        const unitTestCodePath = `${cacheDirectoryPath}/${languageSupport.unitTestFileName}`;
        await writeFile(userCodePath, userCode);
        await writeFile(testCodePath, testCode);
        await writeFile(unitTestCodePath, unitTestCode);
        const stdout = await exec(languageSupport.testCommand(testCodePath));
        res.status(StatusCodes.OK).send(stdout);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(
            JSON.stringify(languageSupport.filterError(error))
        );
    }

    await deleteFile(cacheDirectoryPath);
});

export default router;
