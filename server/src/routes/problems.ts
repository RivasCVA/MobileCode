import express, { Request } from 'express';
import * as Problem from '@root/models/problem';
import { StatusCodes } from 'http-status-codes';
import { LanguageManager } from '@root/util/language';

const router = express.Router();

const languages = new Set(Object.keys(LanguageManager));

type ParamsType = {
    _id: string;
};

type QueryType = {
    language: string;
};

router.get('/', async (_, res) => {
    try {
        const include = ['name', 'difficulty', 'category'];
        const problems = await Problem.model.find().select(include.join(' '));
        res.status(StatusCodes.OK).json(problems);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});

router.get('/:_id', async (req: Request<ParamsType, {}, {}, QueryType>, res) => {
    try {
        const { _id } = req.params;
        const { language } = req.query;
        // Language parameter is required
        if (!language) {
            const message = 'Missing required parameter: language';
            res.status(StatusCodes.BAD_REQUEST).json({ message });
            return;
        }
        if (!languages.has(language)) {
            const message = `Language ${language} is not supported`;
            res.status(StatusCodes.BAD_REQUEST).json({ message });
            return;
        }
        const excludedLanguages = [...languages].filter((lang) => lang !== language);
        const exclude = excludedLanguages.map((lang) => `-template.${lang}`);
        const problem = await Problem.model.findById(_id).select(exclude);
        if (!problem) {
            const message = `Could not find problem with id ${_id}`;
            res.status(StatusCodes.BAD_REQUEST).json({ message });
            return;
        }
        res.status(StatusCodes.OK).json(problem);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});

export default router;
