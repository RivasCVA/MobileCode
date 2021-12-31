import java.util.ArrayList;

/**
 * The class responsible for testing the user's solution.
 * This file should be executed to test a java solution.
 **/
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
        InputObject input = new InputObject(new int[] {3, 5, -4, 8, 11, 1, -1, 6}, 10);
        int[] expected = {11, -1};

        // Act
        UTest uTest = new UTest(1);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        int[] output = this.solution.twoSum(input.array, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        ArrayList<Integer> list = new ArrayList<>();
        for (int num : output) {
            list.add(num);
        }
        uTest.assertCondition(list.size() == 2);
        for (int num : expected) {
            uTest.assertCondition(list.contains(num));
        }

        // Return
        return uTest.getObject();
    }

    private JSONObject case2() throws Exception {
        // Arrange
        InputObject input = new InputObject(new int[] {4, 6}, 10);
        int[] expected = {4, 6};

        // Act
        UTest uTest = new UTest(2);
        uTest.startReadingSTDOUT();
        uTest.startRuntimeCounter();
        int[] output = this.solution.twoSum(input.array, input.target);
        uTest.stopRuntimeCounter();
        uTest.stopReadingSTDOUT();
        uTest.addIO(input, output, expected);

        // Assert
        ArrayList<Integer> list = new ArrayList<>();
        for (int num : output) {
            list.add(num);
        }
        uTest.assertCondition(list.size() == 2);
        for (int num : expected) {
            uTest.assertCondition(list.contains(num));
        }

        // Return
        return uTest.getObject();
    }

    private String run() throws Exception {
        JSONObjectArray object = new JSONObjectArray();
        object.add(case1());
        object.add(case2());
        return object.getJSON();
    }
}

class InputObject extends JSONObject {
    int[] array;
    int target;

    public InputObject(int[] array, int target) {
        this.array = array;
        this.target = target;
        this.add("array", array);
        this.add("target", target);
    }
}
