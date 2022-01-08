import express from 'express';
import * as Problem from '@root/models/problem';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/', async (_, res) => {
    try {
        const problems = await Problem.model.find();
        res.status(StatusCodes.OK).json(problems);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const problem = await Problem.model.findById(_id);
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

router.post('/', async (req: Problem.request, res) => {
    const { error } = Problem.validation.validate(req.body);
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
    }

    const { name, directory, description, difficulty, category } = req.body;

    const problem = new Problem.model({
        name,
        directory,
        description,
        difficulty,
        category,
    });

    try {
        const result = await problem.save();
        res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});

export default router;
