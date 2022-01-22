import { Problem, ProblemActionTypes } from './types';

export const setProblems = (problems: Problem[]): ProblemActionTypes => ({
    type: 'SET_PROBLEMS',
    payload: problems,
});
