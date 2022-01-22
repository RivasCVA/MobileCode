import { User, UserActionType } from './types';

/**
 * Sets the entire user state data.
 * @param user User state data.
 */
export const setUser = (user: User): UserActionType => ({
    type: 'SET_USER',
    payload: user,
});

/**
 * Adds a new problem to the user's favorites list.
 * @param _id Problem id.
 */
export const addFavorite = (_id: string): UserActionType => ({
    type: 'ADD_FAVORITE',
    payload: _id,
});

/**
 * Removes a problem from the user's favorites list.
 * @param _id Problem id.
 */
export const removeFavorite = (_id: string): UserActionType => ({
    type: 'REMOVE_FAVORITE',
    payload: _id,
});
