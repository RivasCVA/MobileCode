import mongoose from 'mongoose';
import Joi from 'joi';

export const validation = Joi.object({
    name: Joi.string().alphanum().required(),
});

export const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export const model = mongoose.model('Problem', schema);
