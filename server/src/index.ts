import app from '@root/app';
import mongoose from 'mongoose';
import Debug from '@root/util/debug';
import env from '@root/util/env';
import { DB_URL, SERVER_URL } from '@root/util/constants';

mongoose.connect(DB_URL);

mongoose.connection.once('open', () => {
    Debug.db(`MongoDB connected to ${env.DB_NAME}: ${DB_URL}`);
});

app.listen(env.SERVER_PORT, () => {
    Debug.server(`Listening on port ${env.SERVER_PORT}: ${SERVER_URL}`);
});
