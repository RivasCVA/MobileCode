import React from 'react';
import StackNavigator from 'components/StackNavigator';
import ProblemsScreen from 'screens/ProblemsScreen';
import EditorScreen from 'screens/EditorScreen';
import SubmitScreen from 'screens/SubmitScreen';

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
                Submit: {
                    component: SubmitScreen,
                },
            }}
        />
    );
};

export default ProblemsStackNavigator;
