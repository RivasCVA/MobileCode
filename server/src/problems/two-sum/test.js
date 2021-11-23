const Solution = require('./solution');
const UTest = require('./utest');

class Test {
    constructor() {
        this.solution = new Solution();
    }

    case1() {
        // Arrange
        const input = {
            array: [3, 5, -4, 8, 11, 1, -1, 6],
            target: 10,
        };
        const expected = [11, -1];

        // Act
        const uTest = new UTest(1);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        const output = this.solution.twoSum(input.array, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert=
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
            array: [4, 6],
            target: 10,
        };
        const expected = [4, 6];

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

    run() {
        return JSON.stringify([
            this.case1(),
            this.case2(),
        ]);
    }
}

console.log(new Test().run());
