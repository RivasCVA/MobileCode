const { performance } = require("perf_hooks");

/** Unit testing class intended for an API response. */
class UTest {
    // Private variables
    /** @type {number} */
    #runtimeStart = null;

    /**
     * Creates a new unit test case.
     * @param {number} caseNumber Test case number.
     */
    constructor(caseNumber) {
        /** @type {number} */
        this.caseNumber = caseNumber;
        /** @type {any} */
        this.input = null;
        /** @type {any} */
        this.output = null;
        /** @type {any} */
        this.expected = null;
        /** @type {boolean} */
        this.result = null;
        /** @type {string} */
        this.stdout = null;
        /** @type {number} */
        this.runtime = null;
    }

    /**
     * Stores the resulting input and output of the tested solution.
     * @param {any} input Solution input.
     * @param {any} output Solution output.
     * @param {any} expected Expected solution output.
     */
    addIO(input, output, expected) {
        this.input = input;
        this.output = output;
        this.expected = expected;
    }

    /**
     * Starts reading the standard output.
     * This overrides `console.log`.
     */
    startReadingSTDOUT() {
        if (this.stdout !== null) {
            throw new Error("Cannot start reading stdout more than once.");
        }
        startReadingConsoleLog();
    }

    /**
     * Stops reading the standard output.
     * This returns `console.log` to its original state.
     */
    stopReadingSTDOUT() {
        if (this.stdout !== null) {
            throw new Error("Cannot stop reading stdout more than once.");
        }
        this.stdout = stopReadingConsoleLog();
    }

    /**
     * Starts the runtime counter.
     * The runtime is collected in milliseconds (ms).
     */
    startRuntimeCounter() {
        if (this.runtime !== null || this.#runtimeStart !== null) {
            throw new Error("Cannot start runtime counter more than once.");
        }
        if (this.#runtimeStart !== null) {
            throw new Error("Must stop runtime counter before starting.");
        }
        this.#runtimeStart = performance.now();
    }

    /**
     * Stops the runtime counter.
     * The runtime is collected in milliseconds (ms).
     */
    stopRuntimeCounter() {
        if (this.runtime !== null) {
            throw new Error("Cannot stop runtime counter more than once.");
        }
        if (this.#runtimeStart === null) {
            throw new Error("Must start runtime counter before stopping.");
        }
        this.runtime = performance.now() - this.#runtimeStart;
    }

    /**
     * Validates a test case.
     * @param {boolean} condition Assertion condition.
     */
    assert(condition) {
        if (this.result === null || this.result === true) {
            this.result = condition;
        }
    }

    /**
     * Generates an object for a JSON response.
     * @returns {object} An object formatted as JSON.
     */
    getObject() {
        return {
            case: this.caseNumber,
            input: this.input,
            output: this.output,
            expected: this.expected,
            result: this.result,
            stdout: this.stdout,
            runtime: this.runtime
        };
    }
}

/**
 * The `console.log` override must occur outside the class.
 * You must stop reading console log to reset `console.log` to its original state.
 */

const ORIGINAL_CONSOLE_LOG = console.log;
let consoleLogOutput = null;

/** Overrides the `console.log` method to redirect stdout. */
function startReadingConsoleLog() {
    if (consoleLogOutput !== null) {
        throw new Error("Must stop reading stdout before starting.");
    }
    consoleLogOutput = "";
    console.log = function() {
        for (arg of arguments) {
            consoleLogOutput += consoleLogOutput ? "\n" : "";
            consoleLogOutput += arg;
        }
    }
}

/** Stops the `console.log` override. */
function stopReadingConsoleLog() {
    if (consoleLogOutput === null) {
        throw new Error("Must start reading stdout before stopping.");
    }
    console.log = ORIGINAL_CONSOLE_LOG;
    const out = consoleLogOutput;
    consoleLogOutput = null;
    return out;
}

module.exports = UTest;
