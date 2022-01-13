import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'components/Icon';
import Difficulties from 'util/difficulties';
import Colors from 'util/colors';

interface Props {
    /**
     * Problem difficulty.
     */
    difficulty: Difficulties;

    /**
     * Mark as completed.
     */
    completed: boolean;
}

const ProblemStatus = (props: Props): JSX.Element => {
    const { difficulty, completed } = props;

    return (
        <View style={[styles.container, styles[difficulty]]}>
            {completed && <Icon icon="check" color={Colors.White} />}
        </View>
    );
};

export default ProblemStatus;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    easy: {
        backgroundColor: Colors.Green,
    },
    medium: {
        backgroundColor: Colors.Blue,
    },
    hard: {
        backgroundColor: Colors.Red,
    },
});
