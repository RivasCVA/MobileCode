import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProblems, getUser } from 'util/requests';
import { setProblems } from 'store/problems/actions';
import { setUser } from 'store/user/actions';
import BottomTabNavigator from 'components/BottomTabNavigator';
import ProblemsStackNavigator from 'navigators/ProblemsStackNavigator';
import FavoritesScreen from 'screens/FavoritesScreen';

/**
 * Screen holding the root bottom tab navigator.
 * All screens and navigators must go through here.
 */
const RootScreen = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            try {
                const problems = await getProblems();
                dispatch(setProblems(problems));
                const user = await getUser('61da63c10af1a7b02c97ddce');
                dispatch(setUser(user));
            } catch (err) {
                console.log(err);
            }
        };
        fetch();
    }, [dispatch]);

    return (
        <BottomTabNavigator
            screens={{
                ProblemsStackNavigator: {
                    component: ProblemsStackNavigator,
                    icon: 'storage',
                },
                Favorites: {
                    component: FavoritesScreen,
                    options: {
                        headerShown: true,
                    },
                    icon: 'star',
                },
            }}
        />
    );
};

export default RootScreen;
