import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { ParamListBase, RouteProp } from '@react-navigation/core';
import Colors from 'util/colors';
import Fonts from 'util/fonts';
import Icon, { IconTypes } from 'components/Icon';

type NavigatorItemType = { [name: string]: IconTypes };

type ScreenOptionsType =
    | BottomTabNavigationOptions
    | ((props: {
          route: RouteProp<ParamListBase, string>;
          navigation: any;
      }) => BottomTabNavigationOptions);

export const DefaultScreenOptions = (navigatorItems: NavigatorItemType): ScreenOptionsType => {
    return ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            const color = focused ? Colors.Black : Colors.LightGray;
            const icon = navigatorItems[route.name];
            if (icon) {
                return <Icon icon={icon} color={color} />;
            } else {
                return <Icon icon="close" color={color} />;
            }
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
    });
};
