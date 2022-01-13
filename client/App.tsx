import React from 'react';
import ProblemsScreen from 'screens/ProblemsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'components/Icon';
import { StatusBar } from 'react-native';
import Colors from 'util/colors';
import Fonts from 'util/fonts';
import FavoritesScreen from 'screens/FavoritesScreen';

const Tab = createBottomTabNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused }) => {
                            const color = focused ? Colors.Black : Colors.LightGray;
                            switch (route.name) {
                                case 'Problems':
                                    return <Icon icon="storage" color={color} />;
                                case 'Favorites':
                                    return <Icon icon="star" color={color} />;
                                default:
                                    return <Icon icon="close" color={color} />;
                            }
                        },
                        tabBarShowLabel: false,
                        tabBarStyle: { backgroundColor: Colors.SecondaryBackground },
                        headerTintColor: Colors.PrimaryDarkText,
                        headerTitleStyle: { fontFamily: Fonts.PoppinsSemiBold, fontSize: 18 },
                        headerStyle: { backgroundColor: Colors.SecondaryBackground },
                    })}
                >
                    <Tab.Screen name="Problems" component={ProblemsScreen} />
                    <Tab.Screen name="Favorites" component={FavoritesScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
