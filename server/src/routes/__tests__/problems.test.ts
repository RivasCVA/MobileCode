import request from 'supertest';
import mongoose from 'mongoose';
import app from '@root/app';
import env from '@root/util/env';

const URL = '/api/problems';

describe(`GET ${URL}`, () => {
    beforeAll(async () => {
        const url = `mongodb://${env.HOST}:${env.DB_PORT}/${env.DB_NAME}`;
        await mongoose.connect(url);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('OK status code', async () => {
        // Arrange

        // Act
        const response = await request(app).get(URL).send();

        // Assert
        expect(response.statusCode).toBe(200);
    });

    it('Responds with all problems', async () => {
        // Arrange

        // Act
        const response = await request(app).get(URL).send();
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
