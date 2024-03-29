from typing import Any, TextIO
from io import StringIO
import time
import sys

class UTest:
    """ Unit testing class intended for an API response. """

    def __init__(self, case_number: int) -> None:
        """
        Creates a new unit test case.

        Args:
            case_number (int): Test case number.
        """
        self.case_number: int = case_number
        self.input: Any = None
        self.output: Any = None
        self.expected: Any = None
        self.result: bool = None
        self.stdout: str = None
        self.runtime: float = None
        # Private variables
        self.__old_stdout: TextIO = None
        self.__new_stdout: StringIO = None
        self.__runtime_start: float = None

    def add_IO(self, input: Any, output: Any, expected: Any) -> None:
        """
        Stores the resulting input and output of the tested solution.

        Args:
            input (Any): Solution input.
            output (Any): Solution output.
            expected (Any): Expected solution output.
        """
        self.input = input
        self.output = output
        self.expected = expected

    def assert_condition(self, condition: bool) -> None:
        """
        Validates a test case.

        Args:
            condition (bool): Assert condition.
        """
        if self.result == None or self.result == True:
            self.result = condition

    def start_reading_STDOUT(self) -> None:
        """
        Starts reading the standard output.
        This overrides `print`.
        """
        if self.stdout != None:
            raise RuntimeError("Cannot start reading stdout more than once.")

        if self.__old_stdout != None or self.__new_stdout != None:
            raise RuntimeError("Must stop reading stdout before starting.")

        self.__old_stdout = sys.stdout
        self.__new_stdout = StringIO()
        sys.stdout = self.__new_stdout

    def stop_reading_STDOUT(self) -> None:
        """
        Stops reading the standard output.
        This returns `print` to its original state.
        """
        if self.stdout != None:
            raise RuntimeError("Cannot stop reading stdout more than once.")

        if self.__old_stdout == None or self.__new_stdout == None:
            raise RuntimeError("Must start reading stdout before stopping.")

        self.stdout = self.__new_stdout.getvalue()
        sys.stdout = self.__old_stdout

    def start_runtime_counter(self) -> None:
        """
        Starts the runtime counter.
        The runtime is collected in milliseconds (ms).
        """
        if self.runtime != None:
            raise RuntimeError("Cannot start runtime counter more than once.")

        if self.__runtime_start != None:
            raise RuntimeError("Must stop runtime counter before starting.")

        self.__runtime_start = time.time() * 1000

    def stop_runtime_counter(self) -> None:
        """
        Stops the runtime counter.
        The runtime is collected in milliseconds (ms).
        """
        if self.runtime != None:
            raise RuntimeError("Cannot stop runtime counter more than once.")

        if self.__runtime_start == None:
            raise RuntimeError("Must start runtime counter before stopping.")

        self.runtime = (time.time() * 1000) - self.__runtime_start

    def get_object(self) -> object:
        """
        Generates an object for a JSON response.

        Returns:
            object: An object formatted as JSON.
        """
        return {
            "case": self.case_number,
            "input": self.input,
            "output": self.output,
            "expected": self.expected,
            "result": self.result,
            "stdout": self.stdout,
            "runtime": self.runtime
        }
