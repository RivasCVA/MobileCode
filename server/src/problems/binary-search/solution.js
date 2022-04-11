class Solution {
    binarySearch(nums, target) {
        let left = 0;
        let right = nums.length - 1;

        while (left <= right) {
            const mid = (left + right) / 2;
            const current = nums[mid];

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

module.exports = Solution;
