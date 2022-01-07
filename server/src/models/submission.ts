import Joi from 'joi';
import { Request } from 'express';
import { LanguageManager } from '@root/util/language';

const languages = LanguageManager;

export const validation = Joi.object({
    user: Joi.string().required(),
    problem: Joi.string().required(),
    language: Joi.string()
        .valid(...Object.keys(languages))
        .required(),
    code: Joi.string().required(),
});

export interface request extends Request {
    body: {
        user: string;
        problem: string;
        language: keyof typeof languages;
        code: string;
    };
}
