import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';
import ProblemItem from './components/ProblemItem';

const ProblemListScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Button title="Title" />
            <Button title="Title" colorStyle="outline" />
            <IconButton icon="search" />
            <Icon icon="check" />
            <ProblemItem title="Title 1" difficulty="hard" completed />
            <ProblemItem title="Title 2" difficulty="medium" completed={false} />
        </View>
    );
};

export default ProblemListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
});
