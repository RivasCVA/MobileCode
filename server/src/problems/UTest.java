import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

/** Unit testing class intended for an API response. */
public class UTest {
    private int caseNumber;
    private JSONObject input;
    private String output;
    private String expected;
    private Optional<Boolean> result = Optional.empty();
    private String stdout = null;
    private Optional<Float> runtime = Optional.empty();
    /** Whether to wrap "output" and "expected" with quotes in the JSON result. */
    private Boolean noQuoteOutput = false;
    // Other private variables
    private PrintStream oldSTDOUT = null;
    private ByteArrayOutputStream newSTDOUT = null;
    private Optional<Float> runtimeStart = Optional.empty();

    /**
     * Creates a new unit test case.
     * @param caseNumber Test case number.
     */
    public UTest(int caseNumber) {
        this.caseNumber = caseNumber;
    }

    /**
     * Stores the resulting input and output of the tested solution.
     * @param input Solution input.
     * @param output Solution output.
     * @param expected Expected solution output.
     */
    public void addIO(JSONObject input, String output, String expected) {
        this.input = input;
        this.output = output;
        this.expected = expected;
    }

    /**
     * Stores the resulting input and output of the tested solution.
     * @param input Solution input.
     * @param output Solution output.
     * @param expected Expected solution output.
     */
    public void addIO(JSONObject input, int output, int expected) {
        this.input = input;
        this.output = String.valueOf(output);
        this.expected = String.valueOf(expected);
        noQuoteOutput = true;
    }

    /**
     * Stores the resulting input and output of the tested solution.
     * @param input Solution input.
     * @param output Solution output.
     * @param expected Expected solution output.
     */
    public void addIO(JSONObject input, int[] output, int[] expected) {
        this.input = input;
        this.output = Arrays.toString(output);
        this.expected = Arrays.toString(expected);
        noQuoteOutput = true;
    }

    /**
     * Starts reading the standard output.
     * This overrides "System.out".
     */
    public void startReadingSTDOUT() throws Exception {
        if (stdout != null) {
            throw new Exception("Cannot start reading stdout more than once.");
        }
        if (oldSTDOUT != null || newSTDOUT != null) {
            throw new Exception("Must stop reading stdout before starting.");
        }
        oldSTDOUT = System.out;
        newSTDOUT = new ByteArrayOutputStream();
        System.setOut(new PrintStream(newSTDOUT));
    }

    /**
     * Stops reading the standard output.
     * This returns "System.out" to its original state.
     */
    public void stopReadingSTDOUT() throws Exception {
        if (stdout != null) {
            throw new Exception("Cannot stop reading stdout more than once.");
        }
        if (oldSTDOUT == null || newSTDOUT == null) {
            throw new Exception("Must start reading stdout before stopping.");
        }
        stdout = newSTDOUT.toString().trim().replaceAll("\n", "\\\\n");
        System.setOut(oldSTDOUT);
    }

    /**
     * Starts the runtime counter.
     * The runtime is collected in milliseconds (ms).
     */
    public void startRuntimeCounter() throws Exception {
        // TODO: Fix java runtime from showing 0.0 for all runs.
        if (runtime.isPresent() || runtimeStart.isPresent()) {
            throw new Exception("Cannot start runtime counter more than once.");
        }
        if (runtimeStart.isPresent()) {
            throw new Exception("Must stop runtime counter before starting.");
        }
        float now = (float) System.nanoTime() / 1000000;
        runtimeStart = Optional.ofNullable(Float.valueOf(now));
    }

    /**
     * Stops the runtime counter.
     * The runtime is collected in milliseconds (ms).
     */
    public void stopRuntimeCounter() throws Exception {
        if (runtime.isPresent()) {
            throw new Exception("Cannot stop runtime counter more than once.");
        }
        if (!runtimeStart.isPresent()) {
            throw new Exception("Must start runtime counter before stopping.");
        }
        float now = (float) System.nanoTime() / 1000000;
        float elapsed = now - runtimeStart.get();
        runtime = Optional.ofNullable(Float.valueOf(elapsed));
    }

    /**
     * Validates a test case.
     * @param condition Assertion condition.
     */
    public void assertCondition(boolean condition) {
        if (!result.isPresent() || result.get() == true) {
            result = Optional.ofNullable(condition);
        }
    }

    /**
     * Generates an object for a JSON response.
     * @returns An object formatted as JSON.
     */
    public JSONObject getObject() {
        JSONObject object = new JSONObject();
        object.add("case", caseNumber);
        object.add("input", input);
        object.add("output", output, noQuoteOutput);
        object.add("expected", expected, noQuoteOutput);
        object.add("result", result.isPresent() ? result.get() : null);
        object.add("stdout", stdout);
        object.add("runtime", runtime.isPresent() ? runtime.get() : null);
        return object;
    }
}

/** A class for creating JSON object models. */
class JSONObject {
    private ArrayList<String> keys = new ArrayList<>();
    private ArrayList<String> values = new ArrayList<>();

    public JSONObject() {}

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, String value) {
        keys.add("\"" + key + "\"");
        if (value == null) {
            values.add("null");
        } else {
            values.add("\"" + value + "\"");
        }
    }

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, String value, Boolean noQuotes) {
        keys.add("\"" + key + "\"");
        if (value == null) {
            values.add("null");
        } else if (noQuotes) {
            values.add(value);
        } else {
            values.add("\"" + value + "\"");
        }
    }

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, int value) {
        keys.add("\"" + key + "\"");
        values.add(String.valueOf(value));
    }

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, int[] value) {
        keys.add("\"" + key + "\"");
        values.add(Arrays.toString(value));
    }

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, float value) {
        keys.add("\"" + key + "\"");
        values.add(String.valueOf(value));
    }

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, Boolean value) {
        keys.add("\"" + key + "\"");
        values.add(String.valueOf(value));
    }

    /**
     * Adds a new attribute to the JSON model.
     * @param key Attribute key.
     * @param value Attribute value.
     */
    public void add(String key, JSONObject value) {
        keys.add("\"" + key + "\"");
        values.add(value.getJSON());
    }

    /** @return The JSON model formatted as a string. */
    public String getJSON() {
        StringBuilder json = new StringBuilder("{");
        for (int i = 0; i < keys.size(); i++) {
            json.append(keys.get(i) + ":" + values.get(i));
            if (i < keys.size() - 1) {
                json.append(",");
            }
        }
        json.append("}");
        return json.toString();
    }
}

/** A class for creating JSON object model arrays. */
class JSONObjectArray {
    ArrayList<JSONObject> items = new ArrayList<>();

    public JSONObjectArray() {}

    /**
     * Adds a new JSON object model to the array.
     * @param item JSON object model to append.
     */
    public void add(JSONObject item) {
        items.add(item);
    }

    /** @return The JSON object model formatted as a string. */
    public String getJSON() {
        StringBuilder json = new StringBuilder("[");
        for (int i = 0; i < items.size(); i++) {
            json.append(items.get(i).getJSON());
            if (i < items.size() - 1) {
                json.append(",");
            }
        }
        json.append("]");
        return json.toString();
    }
}
