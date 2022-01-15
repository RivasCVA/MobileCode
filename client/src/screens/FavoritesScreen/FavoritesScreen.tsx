import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from 'util/colors';

const FavoritesScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.PrimaryBackground,
    },
});
