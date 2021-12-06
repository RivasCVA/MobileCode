from utest import UTest
from solution import Solution
import json
import sys

class Test:
    def __init__(self):
        self.solution = Solution()

    def case_1(self):
        # Arrange
        input = {
            "array": [3, 5, -4, 8, 11, 1, -1, 6],
            "target": 10
        }
        expected = [11, -1]

        # Act
        u_test = UTest(1)
        u_test.start_reading_STDOUT()
        u_test.start_runtime_counter()
        output = self.solution.two_sum(input["array"], input["target"])
        u_test.stop_runtime_counter()
        u_test.stop_reading_STDOUT()
        u_test.add_IO(input, output, expected)

        # Assert
        u_test.assert_condition(len(output) == 2)
        for num in expected:
            u_test.assert_condition(num in output)

        # Return
        return u_test.get_object()

    def case_2(self):
        # Arrange
        input = {
            "array": [4, 6],
            "target": 10
        }
        expected = [4, 6]

        # Act
        u_test = UTest(2)
        u_test.start_reading_STDOUT()
        u_test.start_runtime_counter()
        output = self.solution.two_sum(input["array"], input["target"])
        u_test.stop_runtime_counter()
        u_test.stop_reading_STDOUT()
        u_test.add_IO(input, output, expected)

        # Assert
        u_test.assert_condition(len(output) == 2)
        for num in expected:
            u_test.assert_condition(num in output)

        # Return
        return u_test.get_object()
    
    def run(self):
        return json.dumps([
            self.case_1(),
            self.case_2()
        ])

if __name__ == "__main__":
    try:
        print(Test().run())
    except:
        # Automatically prints error message
        sys.exit(1)
