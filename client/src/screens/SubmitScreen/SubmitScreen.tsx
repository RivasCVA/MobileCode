import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigators';
import { View, StyleSheet } from 'react-native';
import IconButton from 'components/IconButton';
import TestCaseDropdown from './components/TestCaseDropdown';

const SubmitScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    useLayoutEffect(() => {
        const handleBackPress = () => {
            navigation.goBack();
        };

        navigation.setOptions({
            title: 'Submit Code',
            headerLeft: () => <IconButton icon="back" onPress={handleBackPress} />,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TestCaseDropdown caseNumber={1} />
        </View>
    );
};

export default SubmitScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 32,
        paddingVertical: 24,
    },
});
