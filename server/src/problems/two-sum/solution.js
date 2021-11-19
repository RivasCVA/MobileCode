class Solution {
    twoSum(array, target) {
        for (let i = 0; i < array.length - 1; i++) {
            const first = array[i];
            for (let j = i + 1; j < array.length; j++) {
                const second = array[j];
                if (first + second === target) {
                    return [first, second];
                }
            }
        }
        return [];
    }
}

module.exports = Solution;
