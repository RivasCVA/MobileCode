const Solution = require('./solution');
const UTest = require('./utest');

/**
 * The class responsible for testing the user's solution.
 * This file should be executed to test a javascript solution.
 */
class Test {
    constructor() {
        this.solution = new Solution();
    }

    case1() {
        // Arrange
        const input = {
            array: [2, 7, 11, 15],
            target: 9,
        };
        const expected = [2, 7];

        // Act
        const uTest = new UTest(1);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.twoSum(input.array, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assert(output.length === 2);
        for (const num of expected) {
            uTest.assert(output.includes(num));
        }

        // Return
        return uTest.getObject();
    }

    case2() {
        // Arrange
        const input = {
            array: [3, 2, 4],
            target: 6,
        };
        const expected = [2, 4];

        // Act
        const uTest = new UTest(2);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.twoSum(input.array, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assert(output.length === 2);
        for (const num of expected) {
            uTest.assert(output.includes(num));
        }

        // Return
        return uTest.getObject();
    }

    case3() {
        // Arrange
        const input = {
            array: [2, 8, 6, 4],
            target: 16,
        };
        const expected = [];

        // Act
        const uTest = new UTest(3);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.twoSum(input.array, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assert(output.length === 2);
        for (const num of expected) {
            uTest.assert(output.includes(num));
        }

        // Return
        return uTest.getObject();
    }

    run() {
        return JSON.stringify([
            this.case1(),
            this.case2(),
            this.case3(),
        ]);
    }
}

if (require.main === module) {
    try {
        console.log(new Test().run());
    } catch (error) {
        // Automatically prints error message
        process.exit(1);
    }
}
