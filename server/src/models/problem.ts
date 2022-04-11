import mongoose from 'mongoose';
import Joi from 'joi';
import { Request } from 'express';

const difficulties = { easy: 'easy', medium: 'medium', hard: 'hard' };

const categories = {
    arrays: 'arrays',
    strings: 'strings',
    sorting: 'sorting',
    stacks: 'stacks',
    bst: 'bst',
    graphs: 'graphs',
    dp: 'dp',
};

export const validation = Joi.object({
    name: Joi.string().required(),
    directory: Joi.string().lowercase().required(),
    description: Joi.string().required(),
    difficulty: Joi.string()
        .valid(...Object.keys(difficulties))
        .required(),
    category: Joi.string()
        .valid(...Object.keys(categories))
        .required(),
    template: Joi.string().allow(null),
    cases: Joi.array().min(1).items(Joi.object()).required(),
});

export const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        directory: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        template: {
            type: String,
            required: false,
            default: null,
        },
        cases: {
            type: [{ type: Object }],
            required: true,
        },
    },
    { versionKey: false }
);

export interface request extends Request {
    body: {
        _id: string;
        name: string;
        directory: string;
        description: string;
        difficulty: keyof typeof difficulties;
        category: keyof typeof categories;
        template: string;
        cases: Object[];
    };
}

export const model = mongoose.model('Problem', schema);
