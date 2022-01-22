import { combineReducers, createStore, Store } from 'redux';
import { Problem } from './problems/types';
import problemsReducer from './problems/reducer';

export interface RootState {
    problems: Problem[];
}

const rootReducer = combineReducers<RootState>({
    problems: problemsReducer,
});

export const configureStore = (): Store => {
    return createStore(rootReducer);
};
