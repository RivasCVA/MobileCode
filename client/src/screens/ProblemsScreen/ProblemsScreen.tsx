import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from 'util/colors';
import ProblemList, { ProblemDataType } from './components/ProblemList';
import { useNavigation } from '@react-navigation/native';

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

const ProblemsScreen = (): JSX.Element => {
    const navigator = useNavigation();

    const handleProblemListPress = (index: number) => {
        console.log(index);
        navigator.navigate('Editor');
    };

    return (
        <View style={styles.container}>
            <ProblemList data={data} onPress={handleProblemListPress} />
        </View>
    );
};

export default ProblemsScreen;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: 32,
        paddingVertical: 16,
        backgroundColor: Colors.PrimaryBackground,
    },
});
