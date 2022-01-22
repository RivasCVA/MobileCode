import { Problem, ProblemActionTypes } from './types';

const initialState: Problem[] = [
    {
        _id: 'id-1',
        name: 'Problem 1',
        directory: 'probelem-1',
        description: 'Problem one description.',
        difficulty: 'hard',
        category: 'bst',
    },
    {
        _id: 'id-2',
        name: 'Problem 2',
        directory: 'problem-2',
        description: 'Problem two description.',
        difficulty: 'easy',
        category: 'graphs',
    },
    {
        _id: 'id-3',
        name: 'Problem 3',
        directory: 'problem-3',
        description: 'Problem three description.',
        difficulty: 'medium',
        category: 'stacks',
    },
];

const problemsReducer = (state = initialState, action: ProblemActionTypes): Problem[] => {
    switch (action.type) {
        case 'SET_PROBLEMS':
            return [...action.payload];
        default:
            return state;
    }
};

export default problemsReducer;
