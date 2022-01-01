import request from 'supertest';
import app from '@root/app';
import { TEST_JAVASCRIPT_CODE, TEST_JAVA_CODE, TEST_PYTHON_CODE } from '@root/util/constants';

const URL = '/api/submit';

describe(`POST ${URL}`, () => {
    describe('python', () => {
        it('OK status code with working python code', async () => {
            // Arrange
            const data = {
                user: 'test-user-1',
                problem: 'two-sum',
                language: 'python',
                code: TEST_PYTHON_CODE,
            };

            // Act
            const response = await request(app).post(URL).send(data);

            // Assert
            expect(response.statusCode).toBe(200);
        });

        it('BAD_REQUEST status code with non-working python code', async () => {
            // Arrange
            const data = {
                user: 'test-user-2',
                problem: 'two-sum',
                language: 'python',
                code: '',
            };

            // Act
            const response = await request(app).post(URL).send(data);

            // Assert
            expect(response.statusCode).toBe(400);
        });

        it('valid test cases with a working python solution', async () => {
            // Arrange
            const data = {
                user: 'test-user-3',
                problem: 'two-sum',
                language: 'python',
                code: TEST_PYTHON_CODE,
            };

            // Act
            const response = await request(app).post(URL).send(data);
            const { body } = response;
            const testCase = body[0];
            const { case: caseNumber, input, output, expected, result, stdout, runtime } = testCase;

            // Assert
            // Expect at least one test case to be received
            expect(body.length).toBeGreaterThan(0);
            // Expect each test case to have a fixed amount of properties
            expect(Object.keys(testCase).length).toBe(7);
            // Expect all properties to have a value
            expect(caseNumber).toBe(1);
            expect(input).toBeDefined();
            expect(output).toBeDefined();
            expect(expected).toBeDefined();
            expect(result).toBeDefined();
            expect(stdout).toBeDefined();
            expect(runtime).toBeDefined();
        });
    });

    describe('javascript', () => {
        it('OK status code with working javascript code', async () => {
            // Arrange
            const data = {
                user: 'test-user-1',
                problem: 'two-sum',
                language: 'javascript',
                code: TEST_JAVASCRIPT_CODE,
            };

            // Act
            const response = await request(app).post(URL).send(data);

            // Assert
            expect(response.statusCode).toBe(200);
        });

        it('BAD_REQUEST status code with non-working javascript code', async () => {
            // Arrange
            const data = {
                user: 'test-user-2',
                problem: 'two-sum',
                language: 'javascript',
                code: '',
            };

            // Act
            const response = await request(app).post(URL).send(data);

            // Assert
            expect(response.statusCode).toBe(400);
        });

        it('valid test cases with a working javascript solution', async () => {
            // Arrange
            const data = {
                user: 'test-user-3',
                problem: 'two-sum',
                language: 'javascript',
                code: TEST_JAVASCRIPT_CODE,
            };

            // Act
            const response = await request(app).post(URL).send(data);
            const { body } = response;
            const testCase = body[0];
            const { case: caseNumber, input, output, expected, result, stdout, runtime } = testCase;

            // Assert
            // Expect at least one test case to be received
            expect(body.length).toBeGreaterThan(0);
            // Expect each test case to have a fixed amount of properties
            expect(Object.keys(testCase).length).toBe(7);
            // Expect all properties to have a value
            expect(caseNumber).toBe(1);
            expect(input).toBeDefined();
            expect(output).toBeDefined();
            expect(expected).toBeDefined();
            expect(result).toBeDefined();
            expect(stdout).toBeDefined();
            expect(runtime).toBeDefined();
        });
    });

    describe('java', () => {
        it('OK status code with working java code', async () => {
            // Arrange
            const data = {
                user: 'test-user-1',
                problem: 'two-sum',
                language: 'java',
                code: TEST_JAVA_CODE,
            };

            // Act
            const response = await request(app).post(URL).send(data);

            // Assert
            expect(response.statusCode).toBe(200);
        });

        it('BAD_REQUEST status code with non-working java code', async () => {
            // Arrange
            const data = {
                user: 'test-user-2',
                problem: 'two-sum',
                language: 'java',
                code: '',
            };

            // Act
            const response = await request(app).post(URL).send(data);

            // Assert
            expect(response.statusCode).toBe(400);
        });

        it('valid test cases with a working java solution', async () => {
            // Arrange
            const data = {
                user: 'test-user-3',
                problem: 'two-sum',
                language: 'java',
                code: TEST_JAVA_CODE,
            };

            // Act
            const response = await request(app).post(URL).send(data);
            const { body } = response;
            const testCase = body[0];
            const { case: caseNumber, input, output, expected, result, stdout, runtime } = testCase;

            // Assert
            // Expect at least one test case to be received
            expect(body.length).toBeGreaterThan(0);
            // Expect each test case to have a fixed amount of properties
            expect(Object.keys(testCase).length).toBe(7);
            // Expect all properties to have a value
            expect(caseNumber).toBe(1);
            expect(input).toBeDefined();
            expect(output).toBeDefined();
            expect(expected).toBeDefined();
            expect(result).toBeDefined();
            expect(stdout).toBeDefined();
            expect(runtime).toBeDefined();
        });
    });
});
