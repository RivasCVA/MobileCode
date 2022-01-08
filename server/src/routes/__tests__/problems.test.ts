import request from 'supertest';
import mongoose from 'mongoose';
import app from '@root/app';
import env from '@root/util/env';

const URL = '/api/problems';

const DATABASE_URL = `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}`;

describe(`GET ${URL}`, () => {
    beforeAll(async () => {
        await mongoose.connect(DATABASE_URL);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('OK status code on regular request', async () => {
        // Arrange

        // Act
        const response = await request(app).get(URL);

        // Assert
        expect(response.statusCode).toBe(200);
    });

    it('responds with all problems', async () => {
        // Arrange

        // Act
        const response = await request(app).get(URL);
        const { body } = response;
        const problem = body[0];
        const { name, directory, description, difficulty, category } = problem;

        // Assert
        // Expect at least one problem to be received
        expect(body.length).toBeGreaterThan(0);
        // Expect each test case to have a fixed amount of properties
        expect(Object.keys(problem).length).toBe(7);
        // Expect all properties to have a value
        expect(name).toBeTruthy();
        expect(directory).toBeTruthy();
        expect(description).toBeTruthy();
        expect(difficulty).toBeTruthy();
        expect(category).toBeTruthy();
    });
});

describe(`POST ${URL}`, () => {
    beforeAll(async () => {
        await mongoose.connect(DATABASE_URL);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('SUCCESS status code on correct request', async () => {
        // Arrange
        const data = {
            name: 'Test Name',
            directory: 'test-directory',
            description: 'Test description',
            difficulty: 'easy',
            category: 'arrays',
        };

        // Act
        const response = await request(app).post(URL).send(data);

        // Assert
        expect(response.statusCode).toBe(201);
    });

    it('BAD_REQUEST status code on incorrect request', async () => {
        // Arrange
        const data = {
            name: 'Test Name',
            directory: 'test-directory',
            description: 'Test description',
            difficulty: 'easy',
            category: '',
        };

        // Act
        const response = await request(app).post(URL).send(data);

        // Assert
        expect(response.statusCode).toBe(400);
    });

    it('successfully adds new problem', async () => {
        // Arrange
        const testName = 'Test Name';
        const testDirectory = 'test-directory';
        const testDescription = 'Test description';
        const testDifficulty = 'easy';
        const testCategory = 'arrays';

        const data = {
            name: testName,
            directory: testDirectory,
            description: testDescription,
            difficulty: testDifficulty,
            category: testCategory,
        };

        // Act
        const response = await request(app).post(URL).send(data);
        const { body } = response;
        const { name, directory, description, difficulty, category } = body;

        // Assert
        expect(name).toBe(testName);
        expect(directory).toBe(testDirectory);
        expect(description).toBe(testDescription);
        expect(difficulty).toBe(testDifficulty);
        expect(category).toBe(testCategory);
    });
});
