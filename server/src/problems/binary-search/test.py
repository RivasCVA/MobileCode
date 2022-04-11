from utest import UTest
from solution import Solution
import json
import sys

class Test:
    """
    The class responsible for testing the user's solution.
    This file should be executed to test a python solution.
    """

    def __init__(self):
        self.solution = Solution()

    def case_1(self):
        # Arrange
        input = {
            "nums": [1, 4, 5, 8, 10, 14],
            "target": 8
        }
        expected = 3

        # Act
        u_test = UTest(1)
        u_test.start_reading_STDOUT()
        u_test.start_runtime_counter()
        output = self.solution.binary_search(input["nums"], input["target"])
        u_test.stop_runtime_counter()
        u_test.stop_reading_STDOUT()
        u_test.add_IO(input, output, expected)

        # Assert
        u_test.assert_condition(output == expected)

        # Return
        return u_test.get_object()

    def case_2(self):
        # Arrange
        input = {
            "nums": [-8, -4, -1, 0, 4, 9, 8],
            "target": 0
        }
        expected = 3

        # Act
        u_test = UTest(2)
        u_test.start_reading_STDOUT()
        u_test.start_runtime_counter()
        output = self.solution.binary_search(input["nums"], input["target"])
        u_test.stop_runtime_counter()
        u_test.stop_reading_STDOUT()
        u_test.add_IO(input, output, expected)

        # Assert
        u_test.assert_condition(output == expected)

        # Return
        return u_test.get_object()

    def case_3(self):
        # Arrange
        input = {
            "nums": [-90, -45, -10, 1, 21, 36, 80],
            "target": 27
        }
        expected = -1

        # Act
        u_test = UTest(3)
        u_test.start_reading_STDOUT()
        u_test.start_runtime_counter()
        output = self.solution.binary_search(input["nums"], input["target"])
        u_test.stop_runtime_counter()
        u_test.stop_reading_STDOUT()
        u_test.add_IO(input, output, expected)

        # Assert
        u_test.assert_condition(output == expected)

        # Return
        return u_test.get_object()

    def run(self):
        return json.dumps([
            self.case_1(),
            self.case_2(),
            self.case_3()
        ])

if __name__ == "__main__":
    try:
        print(Test().run())
    except:
        # Automatically prints error message
        sys.exit(1)
