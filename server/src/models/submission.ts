import Joi from 'joi';
import { Request } from 'express';
import { LanguageManager, Language } from '@root/util/language';

export const validation = Joi.object({
    user: Joi.string().required(),
    directory: Joi.string().required(),
    language: Joi.string()
        .valid(...Object.keys(LanguageManager))
        .required(),
    code: Joi.string().required(),
});

export interface request extends Request {
    body: {
        _id: string;
        user: string;
        directory: string;
        language: Language;
        code: string;
    };
}
