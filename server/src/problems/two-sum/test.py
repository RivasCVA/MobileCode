import unittest
import solution

class TestProgram(unittest.TestCase):
    def test_case_1(self):
        output = solution.two_sum([3, 5, -4, 8, 11, 1, -1, 6], 10)
        self.assertTrue(len(output) == 2)
        self.assertTrue(11 in output)
        self.assertTrue(-1 in output)

    def test_case_2(self):
        output = solution.two_sum([4, 6], 10)
        self.assertTrue(len(output) == 2)
        self.assertTrue(4 in output)
        self.assertTrue(6 in output)

if __name__ == '__main__':
    unittest.main()
