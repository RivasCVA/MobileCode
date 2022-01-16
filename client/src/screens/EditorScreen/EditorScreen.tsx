import React, { useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from 'navigators';
import Colors from 'util/colors';

const EditorScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Editor'>>();

    const { title } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,
        });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <Text>Hello</Text>
        </View>
    );
};

export default EditorScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.PrimaryBackground,
    },
});
