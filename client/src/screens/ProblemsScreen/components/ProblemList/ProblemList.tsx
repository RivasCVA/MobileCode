import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProblemItem from '../ProblemItem';
import { Problem } from 'store/problems/types';

interface Props {
    /**
     * List of data for the problems to render.
     */
    data: Problem[];

    /**
     * On problem press handler.
     */
    onPress?: (index: number) => void;
}

const ProblemList = (props: Props): JSX.Element => {
    const { data, onPress } = props;

    const handlePress = (index: number) => {
        if (onPress) {
            onPress(index);
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
                                completed={true}
                                favorited={false}
                                onPress={() => handlePress(index)}
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
