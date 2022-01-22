import { Problem, ProblemActionTypes } from './types';

const initialState: Problem[] = [];

const problemsReducer = (state = initialState, action: ProblemActionTypes): Problem[] => {
    switch (action.type) {
        case 'SET_PROBLEMS':
            return [...action.payload];
        default:
            return state;
    }
};

export default problemsReducer;
