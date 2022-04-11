import java.util.ArrayList;

/**
 * The class responsible for testing the user's solution.
 * This file should be executed to test a java solution.
 */
public class Test {
    private Solution solution = new Solution();

    public static void main(String args[]) {
        try {
            System.out.println((new Test()).run());
        } catch (Exception e) {
            // Automatically prints error message
            System.exit(1);
        }
    }

    private JSONObject case1() throws Exception {
        // Arrange
        InputObject input = new InputObject(new int[] {-3, -2, -1, 0, 1, 2, 3}, 0);
        int expected = 3;

        // Act
        UTest uTest = new UTest(1);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        int output = this.solution.binarySearch(input.nums, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assertCondition(output == expected);

        // Return
        return uTest.getObject();
    }

    private JSONObject case2() throws Exception {
        // Arrange
        InputObject input = new InputObject(new int[] {2, 4, 6, 8, 10}, 10);
        int expected = 4;

        // Act
        UTest uTest = new UTest(2);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        int output = this.solution.binarySearch(input.nums, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assertCondition(output == expected);

        // Return
        return uTest.getObject();
    }

    private JSONObject case3() throws Exception {
        // Arrange
        InputObject input = new InputObject(new int[] {-100, -50, 0, 50, 100}, 25);
        int expected = -1;

        // Act
        UTest uTest = new UTest(3);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        int output = this.solution.binarySearch(input.nums, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        uTest.assertCondition(output == expected);

        // Return
        return uTest.getObject();
    }

    private String run() throws Exception {
        JSONObjectArray object = new JSONObjectArray();
        object.add(case1());
        object.add(case2());
        object.add(case3());
        return object.getJSON();
    }
}

class InputObject extends JSONObject {
    int[] nums;
    int target;

    public InputObject(int[] nums, int target) {
        this.nums = nums;
        this.target = target;
        this.add("nums", nums);
        this.add("target", target);
    }
}
