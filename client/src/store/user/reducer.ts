import { User, UserActionType } from './types';

const initialState: User = {
    _id: '',
    email: '',
    username: '',
    favorites: [],
    completed: [],
};

const userReducer = (state = initialState, action: UserActionType): User => {
    switch (action.type) {
        case 'SET_USER':
            return { ...action.payload };
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: Array.from(new Set([...state.favorites, action.payload])),
            };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favorites: state.favorites.filter((value) => value !== action.payload),
            };
        default:
            return state;
    }
};

export default userReducer;
