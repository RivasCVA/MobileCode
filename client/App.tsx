import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import RootScreen from 'screens/RootScreen';

const App = (): JSX.Element => {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <RootScreen />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
