/**
 * Unit testing class intended for an API response.
 */
class UTest {
    /**
     * 
     * @param {any} input Solution input.
     * @param {any} output Solution output.
     * @param {any} expected Expected solution output.
     */
    constructor(input, output, expected) {
        this.input = input;
        this.output = output;
        this.expected = expected;
        /** @type boolean */
        this.result = null;
    }

    /**
     * Validate a test case.
     * @param {boolean} condition Assertion condition.
     */
    assert(condition) {
        if (this.result === null || this.result === true) {
            this.result = condition;
        }
    }

    /**
     * Generates an object for a JSON response.
     * @param {number} caseNumber Test case number.
     * @returns {object} An object formatted as JSON.
     */
    getObject(caseNumber) {
        return {
            case: caseNumber,
            input: this.input,
            output: this.output,
            expected: this.expected,
            result: this.result === null ? false : this.result,
        };
    }
}

module.exports = UTest;
