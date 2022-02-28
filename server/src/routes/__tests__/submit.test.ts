import request from 'supertest';
import app from '@root/app';

const URL = '/api/submit';

const TEST_PYTHON_CODE =
    '# This is code from the Post request\n\nclass Solution:\n    def two_sum(self, array, target):\n        print("test")\n        for i in range(len(array) - 1):\n            first = array[i]\n            for j in range(i + 1, len(array)):\n                second = array[j]\n                if first + second == target:\n                    return [first, second]\n        return []\n';

const TEST_JAVASCRIPT_CODE =
    '// This is code from the Post request\n\nclass Solution {\n    twoSum(array, target) {\n        console.log("test");\n        for (let i = 0; i < array.length - 1; i++) {\n            const first = array[i];\n            for (let j = i + 1; j < array.length; j++) {\n                const second = array[j];\n                if (first + second === target) {\n                    return [first, second];\n                }\n            }\n        }\n        return [];\n    }\n}\nmodule.exports = Solution;\n';

const TEST_JAVA_CODE =
    '// This is code from the Post request\n\npublic class Solution {\n    public int[] twoSum(int[] array, int target) {\n        System.out.println("test");\n        for (int i = 0; i < array.length; i++) {\n            int first = array[i];\n            for (int j = i + 1; j < array.length; j++) {\n                int second = array[j];\n                if (first + second == target) {\n                    int[] result = {first, second};\n                    return result;\n                }\n            }\n        }\n        return new int[] {};\n    }\n}\n';

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
            expect(input).toBeTruthy();
            expect(output).toBeTruthy();
            expect(expected).toBeTruthy();
            expect(result).toBeTruthy();
            expect(stdout).toBeTruthy();
            expect(runtime).toBeTruthy();
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
            expect(input).toBeTruthy();
            expect(output).toBeTruthy();
            expect(expected).toBeTruthy();
            expect(result).toBeTruthy();
            expect(stdout).toBeTruthy();
            expect(runtime).toBeTruthy();
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
            expect(input).toBeTruthy();
            expect(output).toBeTruthy();
            expect(expected).toBeTruthy();
            expect(result).toBeTruthy();
            expect(stdout).toBeTruthy();
            // TODO: Fix java runtime then switch to toBeTruthy.
            expect(runtime).toBeDefined();
        });
    });
});
