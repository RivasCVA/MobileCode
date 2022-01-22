import { combineReducers, createStore, Store } from 'redux';
import { Problem } from './problems/types';
import problemsReducer from './problems/reducer';
import { User } from './user/types';
import userReducer from './user/reducer';

export interface RootState {
    problems: Problem[];
    user: User;
}

const rootReducer = combineReducers<RootState>({
    problems: problemsReducer,
    user: userReducer,
});

export const configureStore = (): Store => {
    return createStore(rootReducer);
};
