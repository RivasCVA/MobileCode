import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from 'util/colors';
import ProblemStatus from './ProblemStatus';
import IconButton from 'components/IconButton';
import Fonts from 'util/fonts';
import Difficulties from 'util/difficulties';

interface Props {
    /**
     * Problem title.
     */
    title: string;

    /**
     * Problem difficulty.
     */
    difficulty: Difficulties;

    /**
     * Mark the problem as complete.
     */
    completed: boolean;

    /**
     * Mark the problem as favorite.
     */
    favorited: boolean;

    /**
     * On press handler.
     */
    onPress?: () => void;

    /**
     * On favorite button press.
     */
    onFavoritePress?: () => void;
}

const ProblemItem = (props: Props): JSX.Element => {
    const { title, difficulty, completed, favorited, onPress, onFavoritePress } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.75}>
            <ProblemStatus difficulty={difficulty} completed={completed} />
            <Text style={styles.text} numberOfLines={1}>
                {title}
            </Text>
            <IconButton
                icon={favorited ? 'favorite' : 'favoriteOutline'}
                size="small"
                color={Colors.DarkGray}
                onPress={onFavoritePress}
            />
        </TouchableOpacity>
    );
};

export default ProblemItem;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        paddingVertical: 8,
        paddingRight: 8,
        borderRadius: 8,
        backgroundColor: Colors.SecondaryBackground,
        shadowOpacity: 0.25,
        shadowColor: Colors.TrueBlack,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    text: {
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: Fonts.PoppinsMedium,
        color: Colors.PrimaryDarkText,
    },
});
