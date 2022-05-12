import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack';
import { ParamListBase, RouteProp } from '@react-navigation/core';
import Colors from 'util/colors';
import Fonts from 'util/fonts';

const Stack = createStackNavigator();

export type ScreenOptionsType =
    | StackNavigationOptions
    | ((props: {
          route: RouteProp<ParamListBase, string>;
          navigation: any;
      }) => StackNavigationOptions);

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
    };
};

interface Props {
    /**
     * All screens to render in each stack.
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
     * All modal screens in each stack.
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
    modals?: ScreensType;

    /**
     * Default options for all screens.
     */
    screenOptions?: ScreenOptionsType;
}

/**
 * Wrapper for react native's stack navigator.
 */
const StackNavigator = (props: Props): JSX.Element => {
    const { screens, modals, screenOptions } = props;

    return (
        <Stack.Navigator
            screenOptions={({ route, navigation }) => ({
                headerTintColor: Colors.PrimaryDarkText,
                headerTitleStyle: {
                    fontFamily: Fonts.PoppinsSemiBold,
                    fontSize: 18,
                },
                headerStyle: {
                    backgroundColor: Colors.SecondaryBackground,
                },
                headerLeftContainerStyle: {
                    paddingLeft: 16,
                },
                headerRightContainerStyle: {
                    paddingRight: 16,
                },
                ...(screenOptions
                    ? screenOptions instanceof Function
                        ? screenOptions({ route, navigation })
                        : screenOptions
                    : {}),
            })}
        >
            <Stack.Group>
                {Object.entries(screens).map(([name, { component, options }]) => (
                    <Stack.Screen key={name} name={name} component={component} options={options} />
                ))}
            </Stack.Group>
            {modals && (
                <Stack.Group
                    screenOptions={{
                        headerMode: 'screen',
                        gestureEnabled: false,
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    }}
                >
                    {Object.entries(modals).map(([name, { component, options }]) => (
                        <Stack.Screen
                            key={name}
                            name={name}
                            component={component}
                            options={options}
                        />
                    ))}
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator;
