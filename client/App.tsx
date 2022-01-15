import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import HomeBottomTabNavigator from 'navigators/HomeBottomTabNavigator';

const App = (): JSX.Element => {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <HomeBottomTabNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
