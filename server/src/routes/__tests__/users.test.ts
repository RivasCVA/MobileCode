import request from 'supertest';
import mongoose from 'mongoose';
import app from '@root/app';
import env from '@root/util/env';
import * as User from '@root/models/user';

const URL = '/api/users';
const DATABASE_URL = `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}-test-users`;
const USERS = [
    {
        _id: 'aaaa12345678901234567890',
        email: 'test@email.com',
        username: 'test-username',
        favorites: ['zzzz12345678901234567890', 'yyyy12345678901234567890'],
        completed: ['xxxx12345678901234567890'],
        language: 'test-language',
        theme: 'test-theme',
    },
];

describe(`GET ${URL}`, () => {
    beforeAll(async () => {
        await Promise.all(
            USERS.map(async (user) => {
                const { error } = User.validation.validate(user, {
                    allowUnknown: true,
                });
                if (error) {
                    throw Error(error.message);
                }
            })
        );
        await mongoose.connect(DATABASE_URL);
    });

    beforeEach(async () => {
        await User.model.create(USERS);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.model.deleteMany();
    });

    it('OK status code on correct request', async () => {
        // Arrange

        // Act
        const response = await request(app).get(`${URL}/${USERS[0]._id}`);

        // Assert
        expect(response.statusCode).toBe(200);
    });

    it('responds with user found by id', async () => {
        // Arrange

        // Act
        const response = await request(app).get(`${URL}/${USERS[0]._id}`);
        const { body: user } = response;
        const { email, username, favorites, completed, language, theme } = user;

        // Assert
        // Expect each problem to have a fixed amount of properties
        expect(Object.keys(user).length).toBe(8);
        // Expect all properties to have a value
        expect(email).toBe(USERS[0].email);
        expect(username).toBe(USERS[0].username);
        expect(favorites).toEqual(USERS[0].favorites);
        expect(completed).toEqual(USERS[0].completed);
        expect(language).toBe(USERS[0].language);
        expect(theme).toBe(USERS[0].theme);
    });
});

describe(`POST ${URL}`, () => {
    beforeAll(async () => {
        await mongoose.connect(DATABASE_URL);
    });

    beforeEach(async () => {
        await User.model.create(USERS);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await User.model.deleteMany();
    });

    it('SUCCESS status code on correct request', async () => {
        // Arrange
        const data = {
            email: 'test@email.com',
            username: 'test-username',
            favorites: ['pppp12345678901234567890', 'uuuu12345678901234567890'],
            completed: ['mmmm12345678901234567890'],
            language: 'test-language',
            theme: 'test-theme',
        };

        // Act
        const response = await request(app).post(URL).send(data);

        // Assert
        expect(response.statusCode).toBe(201);
    });

    it('BAD_REQUEST status code on correct request', async () => {
        // Arrange
        const data = {
            email: 'test@.com',
            username: 'test-username',
            favorites: ['pppp12345678901234567890', 'uuuu12345678901234567890'],
            completed: ['mmmm12345678901234567890'],
            language: 'test-language',
            theme: 'test-theme',
        };

        // Act
        const response = await request(app).post(URL).send(data);

        // Assert
        expect(response.statusCode).toBe(400);
    });

    it('successfully adds new user', async () => {
        // Arrange
        const testEmail = 'test@email.com';
        const testUsername = 'Test User Name';
        const testFavorites = ['pppp12345678901234567890', 'uuuu12345678901234567890'];
        const testCompleted = ['mmmm12345678901234567890'];
        const testLanguage = 'test-language';
        const testTheme = 'test-theme';

        const data = {
            email: testEmail,
            username: testUsername,
            favorites: testFavorites,
            completed: testCompleted,
            language: testLanguage,
            theme: testTheme,
        };

        // Act
        const response = await request(app).post(URL).send(data);
        const { body } = response;
        const { email, username, favorites, completed, language, theme } = body;

        // Assert
        expect(email).toBe(testEmail);
        expect(username).toBe(testUsername);
        expect(favorites).toEqual(testFavorites);
        expect(completed).toEqual(testCompleted);
        expect(language).toBe(testLanguage);
        expect(theme).toBe(testTheme);
    });
});
