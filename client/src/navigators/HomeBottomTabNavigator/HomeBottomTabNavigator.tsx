import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultScreenOptions } from 'navigators/BottomTabNavigatorStyles';
import ProblemsStackNavigator from 'navigators/ProblemsStackNavigator';
import FavoritesScreen from 'screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = (): JSX.Element => {
    return (
        <Tab.Navigator
            screenOptions={DefaultScreenOptions({
                ProblemsStackNavigator: 'storage',
                Favorites: 'star',
            })}
        >
            <Tab.Screen name="ProblemsStackNavigator" component={ProblemsStackNavigator} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
    );
};

export default HomeBottomTabNavigator;
