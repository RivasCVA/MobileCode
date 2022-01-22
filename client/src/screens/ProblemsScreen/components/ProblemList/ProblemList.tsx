import React, { useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProblemItem from '../ProblemItem';
import { Problem } from 'store/problems/types';

interface Props {
    /**
     * List of data for the problems to render.
     */
    data: Problem[];

    /**
     * List of all completed problem ids.
     */
    completed?: string[];

    /**
     * List of all favorite problem ids.
     */
    favorites?: string[];

    /**
     * On problem press handler.
     */
    onPress?: (index: number) => void;

    /**
     * On problem favorite button press.
     */
    onFavoritePress?: (index: number, currentValue: boolean) => void;
}

const ProblemList = (props: Props): JSX.Element => {
    const { data, completed = [], favorites = [], onPress, onFavoritePress } = props;

    const completedSet = useMemo(() => new Set<string>(completed), [completed]);
    const favoritesSet = useMemo(() => new Set<string>(favorites), [favorites]);

    const handlePress = (index: number) => {
        if (onPress) {
            onPress(index);
        }
    };

    const handleFavoritePress = (index: number, currentValue: boolean) => {
        if (onFavoritePress) {
            onFavoritePress(index, currentValue);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.separate}>
                            <ProblemItem
                                title={item.name}
                                difficulty={item.difficulty}
                                completed={completedSet.has(item._id)}
                                favorited={favoritesSet.has(item._id)}
                                onPress={() => handlePress(index)}
                                onFavoritePress={() =>
                                    handleFavoritePress(index, favoritesSet.has(item._id))
                                }
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default ProblemList;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    list: {
        overflow: 'visible',
    },
    separate: {
        marginVertical: 8,
    },
});
