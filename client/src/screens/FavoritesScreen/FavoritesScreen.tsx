import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from 'util/colors';

const FavoritesScreen = (): JSX.Element => {
    return <View style={styles.container} />;
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.PrimaryBackground,
    },
});
