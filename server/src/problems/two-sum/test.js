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
        const output = this.solution.twoSum(input.array, input.target);
        const expected = [11, -1];

        // Assert
        const uTest = new UTest(input, output, expected);
        uTest.assert(output.length === 2);
        for (const num of expected) {
            uTest.assert(output.includes(num));
        }

        // Return
        return uTest.getObject(1);
    }

    case2() {
        // Arrange
        const input = {
            array: [4, 6],
            target: 10,
        };
        const output = this.solution.twoSum(input.array, input.target);
        const expected = [4, 6];

        // Assert
        const uTest = new UTest(input, output, expected);
        uTest.assert(output.length === 2);
        for (const num of expected) {
            uTest.assert(output.includes(num));
        }

        // Return
        return uTest.getObject(2);
    }

    run() {
        return JSON.stringify([
            this.case1(),
            this.case2(),
        ]);
    }
}

console.log(new Test().run());
