import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

const Stack = createStackNavigator();

export const EditorStackScreen = (): JSX.Element => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Editor" component={EditorScreen} />
        </Stack.Navigator>
    );
};

const EditorScreen = (): JSX.Element => {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    );
};

export default EditorScreen;
