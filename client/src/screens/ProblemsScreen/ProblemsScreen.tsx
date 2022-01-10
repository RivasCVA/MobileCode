import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from 'components/Button';

const ProblemsScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Button title="Title" colorStyle="solid" />
            <Button title="Title" colorStyle="outline" />
        </View>
    );
};

export default ProblemsScreen;

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
});
