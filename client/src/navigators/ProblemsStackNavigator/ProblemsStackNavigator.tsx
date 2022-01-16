import React from 'react';
import StackNavigator from 'components/StackNavigator';
import ProblemsScreen from 'screens/ProblemsScreen';
import EditorScreen from 'screens/EditorScreen';

const ProblemsStackNavigator = (): JSX.Element => {
    return (
        <StackNavigator
            screens={{
                Problems: {
                    component: ProblemsScreen,
                },
                Editor: {
                    component: EditorScreen,
                },
            }}
        />
    );
};

export default ProblemsStackNavigator;
