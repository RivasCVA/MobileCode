import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigators';
import { View, StyleSheet } from 'react-native';
import IconButton from 'components/IconButton';
import TestCaseList from './components/TestCaseList';
import { Submission } from 'store/submission/types';
import { postSubmission } from 'util/requests';
import Colors from 'util/colors';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/user/selectors';
import LoadingOverlay from 'components/LoadingOverlay';

const SubmissionScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Submission'>>();
    const [submission, setSubmission] = useState<Submission[]>([]);
    const [fetchError, setFetchError] = useState<string>();

    const { username, language } = useSelector(selectUser);
    const { directory, code } = route.params;

    useLayoutEffect(() => {
        const hideTabBar = () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: 'none' },
            });
        };

        const showTabBar = () => {
            navigation.getParent()?.setOptions({
                tabBarStyle: { display: null },
            });
        };

        const handleBackPress = () => {
            showTabBar();
            navigation.goBack();
        };

        hideTabBar();
        navigation.setOptions({
            title: 'Submit',
            headerLeft: () => (
                <IconButton
                    disabled={submission.length === 0 && fetchError === undefined}
                    icon="close"
                    onPress={handleBackPress}
                />
            ),
        });
    }, [fetchError, navigation, submission.length]);

    useEffect(() => {
        const fetch = async () => {
            try {
                setSubmission(await postSubmission(username, directory, language, code));
            } catch (err) {
                setFetchError('Error submitting code.');
                console.log(err);
            }
        };
        fetch();
    }, [code, username, directory, language]);

    return (
        <View style={styles.container}>
            {submission.length === 0 ? (
                <LoadingOverlay errorMessage={fetchError} />
            ) : (
                <TestCaseList data={submission} />
            )}
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
        backgroundColor: Colors.PrimaryBackground,
    },
});
