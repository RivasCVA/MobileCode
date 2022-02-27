import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { configureStore } from 'store';
import RootScreen from 'screens/RootScreen';

const store = configureStore();

const App = (): JSX.Element => {
    return (
        <SafeAreaProvider>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <Provider store={store}>
                    <RootScreen />
                </Provider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default App;
