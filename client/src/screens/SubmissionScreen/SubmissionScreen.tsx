import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigators';
import { View, StyleSheet } from 'react-native';
import IconButton from 'components/IconButton';
import TestCaseList from './components/TestCaseList';

const SubmissionScreen = (): JSX.Element => {
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
            <TestCaseList
                data={[
                    {
                        case: 1,
                        input: { array: [Array], target: 9 },
                        output: [2, 7],
                        expected: [2, 7],
                        result: true,
                        stdout: '',
                        runtime: 0.027099609375,
                    },
                    {
                        case: 2,
                        input: { array: [Array], target: 6 },
                        output: [2, 4],
                        expected: [2, 4],
                        result: true,
                        stdout: '',
                        runtime: 0.00390625,
                    },
                    {
                        case: 3,
                        input: { array: [Array], target: 16 },
                        output: [-1, -1],
                        expected: [-1, -1],
                        result: true,
                        stdout: '',
                        runtime: 0.004150390625,
                    },
                ]}
            />
        </View>
    );
};

export default SubmissionScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 32,
        paddingVertical: 24,
    },
});
