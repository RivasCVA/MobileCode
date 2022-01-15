import React from 'react';
import StackNavigator from 'components/StackNavigator';
import ProblemsScreen from 'screens/ProblemsScreen';
import EditorScreen from 'screens/EditorScreen';
import IconButton from 'components/IconButton';

const ProblemsStackNavigator = (): JSX.Element => {
    return (
        <StackNavigator
            screens={{
                Problems: {
                    component: ProblemsScreen,
                    options: {
                        headerRight: () => <IconButton icon="filter" />,
                        headerLeft: () => <IconButton icon="search" />,
                    },
                },
                Editor: {
                    component: EditorScreen,
                },
            }}
        />
    );
};

export default ProblemsStackNavigator;
