import React from 'react';
import StackNavigator from 'components/StackNavigator';
import ProblemsScreen from 'screens/ProblemsScreen';
import EditorScreen from 'screens/EditorScreen';
import SubmissionScreen from 'screens/SubmissionScreen';

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
            modals={{
                Submission: {
                    component: SubmissionScreen,
                },
            }}
        />
    );
};

export default ProblemsStackNavigator;
