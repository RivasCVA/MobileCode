import { RootState } from 'store';
import { Problem } from './types';

export const selectProblems = (state: RootState): Problem[] => {
    return state.problems;
};
