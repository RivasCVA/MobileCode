class Solution:
    def two_sum(self, array, target):
        for i in range(len(array) - 1):
            first = array[i]
            for j in range(i + 1, len(array)):
                second = array[j]
                if first + second == target:
                    return [first, second]
        return []
