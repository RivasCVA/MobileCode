import express from 'express';
import exec from '@root/util/exec';
import path from 'path';
import { writeFile, deleteFile } from '@root/util/filesystem';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

/**
 * Offers language-specific support for running code.
 * All languages listed here are the only supported languages.
 */
const SupportLanguage = {
    python: {
        getCommand: (filePath: string) => `python3 ${filePath}`,
        fileExtension: '.py',
    },
    javascript: {
        getCommand: (filePath: string) => `node ${filePath}`,
        fileExtension: '.js',
    },
};

interface RunPostRequest {
    user: string;
    problem: string;
    language: keyof typeof SupportLanguage;
    code: string;
}

router.post('/', async (req, res) => {
    const { user, problem, language, code }: RunPostRequest = req.body;
    const supportLangauge = SupportLanguage[language];

    // Verify if the selected langauge is supported
    if (supportLangauge === undefined) {
        const message = `Language ${language} is not supported`;
        res.status(StatusCodes.BAD_REQUEST).send(message);
        return;
    }

    // Path directed to the cache folder
    const filePath = path.join(
        __dirname,
        `../cache/${user}-${problem}${supportLangauge.fileExtension}`
    );

    try {
        await writeFile(filePath, code);
        const stdout = await exec(supportLangauge.getCommand(filePath));
        res.send(stdout);
    } catch (error) {
        res.status(StatusCodes.BAD_GATEWAY).send(error);
    }

    await deleteFile(filePath);
});

export default router;
