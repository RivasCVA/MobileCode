import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Icon from 'components/Icon';

const ProblemListScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Button title="Title" colorStyle="solid" />
            <Button title="Title" colorStyle="outline" />
            <IconButton icon="search" />
            <Icon icon="check" />
        </View>
    );
};

export default ProblemListScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});
