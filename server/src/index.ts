import app from '@root/app';
import Debug from '@root/util/debug';
import env from '@root/util/env';
import mongoose from 'mongoose';

const DB_URL = `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}`;
const SERVER_URL = `http://${env.HOST}:${env.SERVER_PORT}`;

mongoose.connect(DB_URL);

mongoose.connection.once('open', () => {
    Debug.db(`MongoDB connected to ${env.DB_NAME}: ${DB_URL}`);
});

app.listen(env.SERVER_PORT, () => {
    Debug.server(`Listening on port ${env.SERVER_PORT}: ${SERVER_URL}`);
});
