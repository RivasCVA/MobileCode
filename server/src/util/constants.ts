import env from '@root/util/env';

export const DB_URL = `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}`;
export const SERVER_URL = `http://${env.HOST}:${env.SERVER_PORT}`;
