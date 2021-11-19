from utest import UTest
from solution import Solution
import json

class Test:
    def __init__(self):
        self.solution = Solution()

    def case_1(self):
        # Arrange
        input = {
            "array": [3, 5, -4, 8, 11, 1, -1, 6],
            "target": 10
        }
        output = self.solution.two_sum(input["array"], input["target"])
        expected = [11, -1]

        # Assert
        u_test = UTest(input, output, expected)
        u_test.assert_condition(len(output) == 2)
        for num in expected:
            u_test.assert_condition(num in output)

        # Return
        return u_test.get_object(1)

    def case_2(self):
        # Arrange
        input = {
            "array": [4, 6],
            "target": 10
        }
        output = self.solution.two_sum(input["array"], input["target"])
        expected = [4, 6]

        # Assert
        u_test = UTest(input, output, expected)
        u_test.assert_condition(len(output) == 2)
        for num in expected:
            u_test.assert_condition(num in output)

        # Return
        return u_test.get_object(2)
    
    def run(self):
        return json.dumps([
            self.case_1(),
            self.case_2()
        ])

if __name__ == "__main__":
    print(Test().run())
