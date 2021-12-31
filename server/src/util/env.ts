import dotenv from 'dotenv';

dotenv.config();

/**
 * All dot environment variables.
 * Environment variables should be in a `.env` file under the `server/` directory.
 */
const env = {
    HOST: process.env.HOST,
    DB_PORT: process.env.DB_PORT,
    DB_NAME: process.env.DB_NAME,
    SERVER_PORT: process.env.SERVER_PORT,
};

Object.entries(env).forEach(([key, value]) => {
    if (value === undefined) {
        throw Error(`No value found for environment variable ${key}`);
    }
});

export default env;
