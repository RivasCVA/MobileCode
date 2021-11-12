import express from 'express';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import exec from '@root/util/exec';
import { writeFile, deleteFile, readFile, createDirectory } from '@root/util/fileman';
import { stringToCode } from '@root/util/parse';

const router = express.Router();

/**
 * Offers language-specific support for executing code.
 * All languages listed here are the only supported languages.
 */
const LanguageSupport = {
    python: {
        getCommand: (filePath: string) => `python3 ${filePath}`,
        fileExtension: '.py',
    },
    javascript: {
        getCommand: (filePath: string) => `node ${filePath}`,
        fileExtension: '.js',
    },
};

/**
 * Type-matching the default Test POST request.
 */
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
        `../problems/${problem}/test${languageSupport.fileExtension}`
    );

    // Directory to host all test files
    const cacheDirectoryPath = path.join(__dirname, `../cache/${user}-${problem}`);

    try {
        await createDirectory(cacheDirectoryPath);
        const userCode = stringToCode(code);
        const userCodePath = `${cacheDirectoryPath}/solution${languageSupport.fileExtension}`;
        const testCode = await readFile(testFilePath);
        const testCodePath = `${cacheDirectoryPath}/test${languageSupport.fileExtension}`;
        await writeFile(userCodePath, userCode);
        await writeFile(testCodePath, testCode);
        const stdout = await exec(languageSupport.getCommand(testCodePath));
        res.status(StatusCodes.OK).send(stdout);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).send(error);
    }

    await deleteFile(cacheDirectoryPath);
});

export default router;
