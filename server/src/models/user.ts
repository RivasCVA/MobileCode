import mongoose from 'mongoose';
import Joi from 'joi';
import { Request } from 'express';

export const validation = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().max(255).required(),
    favorites: Joi.array().items(Joi.string()).unique(),
    completed: Joi.array().items(Joi.string()).unique(),
    language: Joi.string().max(255).required(),
    theme: Joi.string().max(255).required(),
});

export const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    favorites: {
        type: [{ type: String }],
        default: [],
    },
    completed: {
        type: [{ type: String }],
        default: [],
    },
    language: {
        type: String,
        default: 'python',
    },
    theme: {
        type: String,
        default: 'github',
    },
});

export interface request extends Request {
    body: {
        _id: string;
        email: string;
        username: string;
        favorites: string[];
        completed: string[];
        language: string;
        theme: string;
    };
}

export const model = mongoose.model('User', schema);
