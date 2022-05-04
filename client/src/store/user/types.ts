const SET_USER = 'SET_USER';
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface User {
    _id: string;
    email: string;
    username: string;
    favorites: string[];
    completed: string[];
    language: string;
    theme: string;
}

interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface AddFavoriteAction {
    type: typeof ADD_FAVORITE;
    payload: string;
}

interface RemoveFavoriteAction {
    type: typeof REMOVE_FAVORITE;
    payload: string;
}

export type UserActionType = SetUserAction | AddFavoriteAction | RemoveFavoriteAction;
