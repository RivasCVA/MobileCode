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

export default router;
