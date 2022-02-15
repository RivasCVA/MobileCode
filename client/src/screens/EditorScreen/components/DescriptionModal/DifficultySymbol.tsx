import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Strut } from 'components/Layout';
import Colors from 'util/colors';
import Difficulties from 'util/difficulties';
import Fonts from 'util/fonts';

interface Props {
    /**
     * Custom style.
     */
    style?: ViewStyle;

    /**
     * Problem difficulty.
     */
    difficulty: Difficulties;
}

const getText = (difficulty: Difficulties) => {
    switch (difficulty) {
        case 'easy':
            return 'Easy';
        case 'medium':
            return 'Medium';
        case 'hard':
            return 'Hard';
        default:
            return 'Easy';
    }
};

const DifficultySymbol = (props: Props): JSX.Element => {
    const { style, difficulty } = props;

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.dot, { backgroundColor: styles[difficulty].backgroundColor }]} />
            <Strut size={6} />
            <Text style={[styles.text, { color: styles[difficulty].color }]}>
                {getText(difficulty)}
            </Text>
        </View>
    );
};

export default DifficultySymbol;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 16,
    },
    text: {
        fontFamily: Fonts.PoppinsBold,
        fontSize: 16,
    },
    easy: {
        color: Colors.Green,
        backgroundColor: Colors.Green,
    },
    medium: {
        color: Colors.Blue,
        backgroundColor: Colors.Blue,
    },
    hard: {
        color: Colors.Red,
        backgroundColor: Colors.Red,
    },
});
