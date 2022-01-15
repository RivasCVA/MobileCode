import React from 'react';
import BottomTabNavigator from 'components/BottomTabNavigator';
import ProblemsStackNavigator from 'navigators/ProblemsStackNavigator';
import FavoritesScreen from 'screens/FavoritesScreen';

/**
 * Screen holding the root bottom tab navigator.
 * All screens and navigators must go through here.
 */
const RootScreen = (): JSX.Element => {
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
