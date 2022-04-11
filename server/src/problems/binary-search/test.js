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
            nums: [-3, -2, -1, 0, 1, 2, 3],
            target: 0,
        };
        const expected = 3;

        // Act
        const uTest = new UTest(1);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.binarySearch(input.nums, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assert(output === expected);

        // Return
        return uTest.getObject();
    }

    case2() {
        // Arrange
        const input = {
            nums: [2, 4, 6, 8, 10],
            target: 10,
        };
        const expected = 4;

        // Act
        const uTest = new UTest(2);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.binarySearch(input.nums, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assert(output === expected);

        // Return
        return uTest.getObject();
    }

    case3() {
        // Arrange
        const input = {
            nums: [-100, -50, 0, 50, 100],
            target: 25,
        };
        const expected = -1;

        // Act
        const uTest = new UTest(3);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.binarySearch(input.nums, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assert(output === expected);

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
