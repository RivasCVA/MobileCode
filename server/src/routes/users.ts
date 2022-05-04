import express from 'express';
import * as User from '@root/models/user';
import { StatusCodes } from 'http-status-codes';

const router = express.Router();

router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.model.findById(_id);
        if (!user) {
            const message = `Could not find user with id ${user}`;
            res.status(StatusCodes.BAD_REQUEST).json({ message });
            return;
        }
        res.status(StatusCodes.OK).json(user);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});

router.post('/', async (req: User.request, res) => {
    const { error } = User.validation.validate(req.body);
    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
        return;
    }

    const { email, username, favorites, completed, language, theme } = req.body;

    const user = new User.model({
        email,
        username,
        favorites,
        completed,
        language,
        theme,
    });

    try {
        const result = await user.save();
        res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
});

export default router;
