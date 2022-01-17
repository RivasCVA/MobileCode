import React from 'react';
import {
    createBottomTabNavigator,
    BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/core';
import Colors from 'util/colors';
import Fonts from 'util/fonts';
import Icon, { IconTypes } from 'components/Icon';

const Tab = createBottomTabNavigator();

export type ScreenOptionsType =
    | BottomTabNavigationOptions
    | ((props: {
          route: RouteProp<ParamListBase, string>;
          navigation: any;
      }) => BottomTabNavigationOptions);

export type ScreensType = {
    [name: string]: {
        /**
         * Component to render.
         */
        component: React.ComponentType<any>;

        /**
         * Individual screen options to override.
         */
        options?: ScreenOptionsType;

        /**
         * Icon to render on the tab.
         */
        icon?: IconTypes;
    };
};

interface Props {
    /**
     * All screens to render in each tab.
     *
     * Sample usage:
     * ```
     * {
     *   ScreenName: {
     *     component: ScreenComponent,
     *     ...
     *   },
     *   ...
     * }
     * ```
     * Notice how the keys are the screen names.
     */
    screens: ScreensType;

    /**
     * Default options for all screens.
     */
    screenOptions?: ScreenOptionsType;
}

/**
 * Wrapper for react native's bottom tab navigator.
 */
const BottomTabNavigator = (props: Props): JSX.Element => {
    const { screens, screenOptions } = props;

    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused }) => {
                    const color = focused ? Colors.Black : Colors.LightGray;
                    const icon = screens[route.name].icon;
                    return <Icon icon={icon ? icon : 'close'} color={color} />;
                },
                headerShown: false,
                tabBarShowLabel: false,
                headerTintColor: Colors.PrimaryDarkText,
                tabBarStyle: {
                    backgroundColor: Colors.SecondaryBackground,
                },
                headerTitleStyle: {
                    fontFamily: Fonts.PoppinsSemiBold,
                    fontSize: 18,
                },
                headerStyle: {
                    backgroundColor: Colors.SecondaryBackground,
                },
                ...(screenOptions
                    ? screenOptions instanceof Function
                        ? screenOptions({ route, navigation })
                        : screenOptions
                    : {}),
            })}
        >
            {Object.entries(screens).map(([name, { component, options }]) => (
                <Tab.Screen key={name} name={name} component={component} options={options} />
            ))}
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
