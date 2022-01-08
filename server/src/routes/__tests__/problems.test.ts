import request from 'supertest';
import mongoose from 'mongoose';
import app from '@root/app';
import env from '@root/util/env';
import * as Problem from '@root/models/problem';

const URL = '/api/problems';
const DATABASE_URL = `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}-test-problems`;
const PROBLEMS = [
    {
        _id: 'aaaa12345678901234567890',
        name: 'Test Name 1',
        directory: 'test-directory-1',
        description: 'Test description 1.',
        difficulty: 'easy',
        category: 'arrays',
    },
    {
        _id: 'bbbb12345678901234567890',
        name: 'Test Name 2',
        directory: 'test-directory-2',
        description: 'Test description 2.',
        difficulty: 'hard',
        category: 'strings',
    },
];

describe(`GET ${URL}`, () => {
    beforeAll(async () => {
        await mongoose.connect(DATABASE_URL);
    });

    beforeEach(async () => {
        await Problem.model.create(PROBLEMS);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Problem.model.deleteMany();
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
        const problem = body.find((p) => p.directory === PROBLEMS[0].directory);
        const { name, directory, description, difficulty, category } = problem;

        // Assert
        // Expect all test problems to be present
        expect(body.length).toBe(2);
        // Expect each problem to have a fixed amount of properties
        expect(Object.keys(problem).length).toBe(7);
        // Expect all properties to have a value
        expect(name).toBe(PROBLEMS[0].name);
        expect(directory).toBe(PROBLEMS[0].directory);
        expect(description).toBe(PROBLEMS[0].description);
        expect(difficulty).toBe(PROBLEMS[0].difficulty);
        expect(category).toBe(PROBLEMS[0].category);
    });

    it('responds with problem found by id', async () => {
        // Arrange

        // Act
        const response = await request(app).get(`${URL}/${PROBLEMS[0]._id}`);
        const { body: problem } = response;
        const { name, directory, description, difficulty, category } = problem;

        // Assert
        // Expect all properties to have a value
        expect(name).toBe(PROBLEMS[0].name);
        expect(directory).toBe(PROBLEMS[0].directory);
        expect(description).toBe(PROBLEMS[0].description);
        expect(difficulty).toBe(PROBLEMS[0].difficulty);
        expect(category).toBe(PROBLEMS[0].category);
    });
});

describe(`POST ${URL}`, () => {
    beforeAll(async () => {
        await mongoose.connect(DATABASE_URL);
    });

    beforeEach(async () => {
        await Problem.model.create(PROBLEMS);
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Problem.model.deleteMany();
    });

    it('SUCCESS status code on correct request', async () => {
        // Arrange
        const data = {
            name: 'Test Name',
            directory: 'test-directory',
            description: 'Test description.',
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
            description: 'Test description.',
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
        const testName = 'New Test Name';
        const testDirectory = 'new-test-directory';
        const testDescription = 'New test description.';
        const testDifficulty = 'medium';
        const testCategory = 'sorting';

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
