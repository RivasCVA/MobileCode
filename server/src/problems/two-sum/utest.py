from typing import Any

class UTest:
    """ Unit testing class intended for an API response. """

    def __init__(self, input: Any, output: Any, expected: Any) -> None:
        """
        Args:
            input (Any): Solution input.
            output (Any): Solution output.
            expected (Any): Expected solution output.
        """
        self.input = input
        self.output = output
        self.expected = expected
        self.result: bool = None
    
    def assert_condition(self, condition: bool) -> None:
        """
        Validate a test case.

        Args:
            condition (bool): Assert condition.
        """
        if self.result == None or self.result == True:
            self.result = condition
    
    def get_object(self, caseNumber: int) -> object:
        """
        Generates an object for a JSON response.

        Args:
            caseNumber (int): Test case number.
        
        Returns:
            object: An object formatted as JSON.
        """
        return {
            "case": caseNumber,
            "input": self.input,
            "output": self.output,
            "expected": self.expected,
            "result": False if self.result == None else self.result,
        }
