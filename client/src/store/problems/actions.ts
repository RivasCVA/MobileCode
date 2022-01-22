import { Problem, ProblemActionTypes } from './types';

/**
 * Sets the entire problems state data.
 * @param problems Problems state data.
 */
export const setProblems = (problems: Problem[]): ProblemActionTypes => ({
    type: 'SET_PROBLEMS',
    payload: problems,
});
