import React, { useLayoutEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigators';
import ProblemList, { ProblemDataType } from './components/ProblemList';
import MultiValuePicker, { PickerValuesType } from 'components/MultiValuePicker';
import SearchBar from 'components/SearchBar';
import Colors from 'util/colors';
import IconButton from 'components/IconButton';
import { titleCase } from 'util/strings';
import Fonts from 'util/fonts';

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
        navigation.navigate('Editor', { title: data[index].title });
    };

    const filteredData = useMemo(() => {
        if (searchValue) {
            return data.filter((value) => value.title.includes(searchValue));
        }
        return data.filter((value) => filterValues[titleCase(value.difficulty)].selected);
    }, [filterValues, searchValue]);

    return (
        <View style={styles.container}>
            {showSearch && (
                <SearchBar
                    value={searchValue}
                    onChange={handleSearchChange}
                    onCancel={handleSearchCancel}
                    animateOnCancel
                    showCancel
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
                {filteredData.length === 0 && (
                    <Text style={styles.noMatch}>Oops! No problems match.</Text>
                )}
                <ProblemList data={filteredData} onPress={handleProblemListPress} />
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
        color: Colors.SecondaryDarkText,
    },
});
