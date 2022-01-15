import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultScreenOptions } from 'navigators/StackNavigatorStyles';
import ProblemsScreen from 'screens/ProblemsScreen';
import EditorScreen from 'screens/EditorScreen';
import IconButton from 'components/IconButton';

const Stack = createStackNavigator();

const ProblemsStackNavigator = (): JSX.Element => {
    return (
        <Stack.Navigator screenOptions={DefaultScreenOptions}>
            <Stack.Screen
                name="Problems"
                component={ProblemsScreen}
                options={{
                    headerRight: () => <IconButton icon="filter" />,
                    headerLeft: () => <IconButton icon="search" />,
                }}
            />
            <Stack.Screen name="Editor" component={EditorScreen} />
        </Stack.Navigator>
    );
};

export default ProblemsStackNavigator;
