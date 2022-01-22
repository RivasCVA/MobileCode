import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigators';
import { useSelector, useDispatch } from 'react-redux';
import { selectProblems } from 'store/problems/selectors';
import { selectUser } from 'store/user/selectors';
import { addFavorite, removeFavorite } from 'store/user/actions';
import ProblemList from './components/ProblemList';
import MultiValuePicker, { PickerValuesType } from 'components/MultiValuePicker';
import HeaderSearchBar from 'components/HeaderSearchBar';
import Colors from 'util/colors';
import IconButton from 'components/IconButton';
import { titleCase } from 'util/strings';
import Fonts from 'util/fonts';

const ProblemsScreen = (): JSX.Element => {
    const dispatch = useDispatch();
    const problems = useSelector(selectProblems);
    const user = useSelector(selectUser);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [filterValues, setFilterValues] = useState<PickerValuesType>(defaultFilterValues);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="filter" onPress={handleFilterPress} />,
            headerLeft: () => <IconButton icon="search" onPress={handleSearchPress} />,
        });
    }, [navigation]);

    const handleFilterPress = () => {
        setShowFilter(true);
    };

    const handleFilterChange = (newValues: PickerValuesType) => {
        setFilterValues(newValues);
    };

    const handleFilterClose = () => {
        setShowFilter(false);
    };

    const handleSearchPress = () => {
        setShowSearch(true);
    };

    const handleSearchChange = (newValue: string) => {
        setSearchValue(newValue);
    };

    const handleSearchCancel = () => {
        setSearchValue('');
        setShowSearch(false);
    };

    const handleProblemListPress = (index: number) => {
        navigation.navigate('Editor', { title: problems[index].name });
    };

    const handleProblemListFavoritePress = (index: number, currentValue: boolean) => {
        const _id = problems[index]._id;
        if (currentValue) {
            dispatch(removeFavorite(_id));
        } else {
            dispatch(addFavorite(_id));
        }
    };

    const filteredProblems = useMemo(() => {
        if (searchValue) {
            return problems.filter((problem) =>
                problem.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
            );
        }
        return problems.filter((problem) => filterValues[titleCase(problem.difficulty)].selected);
    }, [filterValues, problems, searchValue]);

    return (
        <View style={styles.container}>
            {showSearch && (
                <HeaderSearchBar
                    value={searchValue}
                    onChange={handleSearchChange}
                    onCancel={handleSearchCancel}
                    showCancel
                    animateOnCancel
                    animateOnMount
                />
            )}
            {showFilter && (
                <MultiValuePicker
                    values={filterValues}
                    onChange={handleFilterChange}
                    onClose={handleFilterClose}
                />
            )}
            <View style={styles.list}>
                {filteredProblems.length === 0 ? (
                    <Text style={styles.noMatch}>Oops! No problems match criteria.</Text>
                ) : (
                    <ProblemList
                        data={filteredProblems}
                        completed={user.completed}
                        favorites={user.favorites}
                        onPress={handleProblemListPress}
                        onFavoritePress={handleProblemListFavoritePress}
                    />
                )}
            </View>
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
        backgroundColor: Colors.PrimaryBackground,
    },
    list: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    noMatch: {
        textAlign: 'center',
        fontFamily: Fonts.PoppinsMedium,
        fontSize: 16,
        color: Colors.PrimaryDarkText,
    },
});

const defaultFilterValues: PickerValuesType = {
    Easy: {
        selected: true,
        color: Colors.Green,
    },
    Medium: {
        selected: true,
        color: Colors.Blue,
    },
    Hard: {
        selected: true,
        color: Colors.Red,
    },
};
