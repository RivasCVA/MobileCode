public class Solution {
    public int[] twoSum(int[] array, int target) {
        for (int i = 0; i < array.length; i++) {
            int first = array[i];
            for (int j = i + 1; j < array.length; j++) {
                int second = array[j];
                if (first + second == target) {
                    int[] result = {first, second};
                    return result;
                }
            }
        }
        return new int[] {-1, -1};
    }
}
