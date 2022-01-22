import Difficulties from 'util/difficulties';
import Categories from 'util/categories';

const SET_PROBLEMS = 'SET_PROBLEMS';

export interface Problem {
    _id: string;
    name: string;
    directory: string;
    description: string;
    difficulty: Difficulties;
    category: Categories;
}

interface SetProblemsAction {
    type: typeof SET_PROBLEMS;
    payload: Problem[];
}

export type ProblemActionTypes = SetProblemsAction;
