public class Solution {
    public int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            int current = nums[mid];

            if (current > target) {
                right = mid - 1;
            } else if (current < target) {
                left = mid + 1;
            } else {
                return mid;
            }
        }

        return -1;
    }
}
