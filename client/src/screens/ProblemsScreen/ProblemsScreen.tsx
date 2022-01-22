import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootStackParamList } from 'navigators';
import { selectProblems } from 'store/problems/selectors';
import ProblemList from './components/ProblemList';
import MultiValuePicker, { PickerValuesType } from 'components/MultiValuePicker';
import HeaderSearchBar from 'components/HeaderSearchBar';
import Colors from 'util/colors';
import IconButton from 'components/IconButton';
import { titleCase } from 'util/strings';
import Fonts from 'util/fonts';

const ProblemsScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [filterValues, setFilterValues] = useState<PickerValuesType>({
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
    });
    const problems = useSelector(selectProblems);

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
                    <ProblemList data={filteredProblems} onPress={handleProblemListPress} />
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
