import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Difficulties from 'util/difficulties';
import ProblemItem from '../ProblemItem';

export interface ProblemDataType {
    title: string;
    difficulty: Difficulties;
    completed: boolean;
    favorited: boolean;
}

interface Props {
    /**
     * List of data for the problems to render.
     */
    data: ProblemDataType[];

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
                                title={item.title}
                                difficulty={item.difficulty}
                                completed={item.completed}
                                favorited={item.favorited}
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
