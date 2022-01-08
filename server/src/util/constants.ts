export const TEST_PYTHON_CODE =
    '# This is code from the Post request\n\nclass Solution:\n    def two_sum(self, array, target):\n        print("test")\n        for i in range(len(array) - 1):\n            first = array[i]\n            for j in range(i + 1, len(array)):\n                second = array[j]\n                if first + second == target:\n                    return [first, second]\n        return []\n';

export const TEST_JAVASCRIPT_CODE =
    '// This is code from the Post request\n\nclass Solution {\n    twoSum(array, target) {\n        console.log("test");\n        for (let i = 0; i < array.length - 1; i++) {\n            const first = array[i];\n            for (let j = i + 1; j < array.length; j++) {\n                const second = array[j];\n                if (first + second === target) {\n                    return [first, second];\n                }\n            }\n        }\n        return [];\n    }\n}\nmodule.exports = Solution;\n';

export const TEST_JAVA_CODE =
    'public class Solution {\n    public int[] twoSum(int[] array, int target) {\n        System.out.println("test");\n        for (int i = 0; i < array.length; i++) {\n            int first = array[i];\n            for (int j = i + 1; j < array.length; j++) {\n                int second = array[j];\n                if (first + second == target) {\n                    int[] result = {first, second};\n                    return result;\n                }\n            }\n        }\n        return new int[] {};\n    }\n}\n';
