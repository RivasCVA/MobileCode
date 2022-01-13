import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import ProblemList, { ProblemDataType } from './components/ProblemList';

const data: ProblemDataType[] = [
    { title: 'Title 1', difficulty: 'easy', completed: false, favorited: false },
    { title: 'Title 2', difficulty: 'medium', completed: true, favorited: true },
    { title: 'Title 3', difficulty: 'hard', completed: true, favorited: false },
    { title: 'Title 4', difficulty: 'hard', completed: true, favorited: true },
    { title: 'Title 5', difficulty: 'medium', completed: false, favorited: true },
    { title: 'Title 6', difficulty: 'easy', completed: false, favorited: false },
    { title: 'Title 7', difficulty: 'medium', completed: true, favorited: true },
    { title: 'Title 8', difficulty: 'medium', completed: false, favorited: false },
];

const ProblemListScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Button title="Title" />
            <Button title="Title" colorStyle="outline" />
            <IconButton icon="search" />
            <Icon icon="check" />
            <ProblemList data={data} />
        </View>
    );
};

export default ProblemListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
});
