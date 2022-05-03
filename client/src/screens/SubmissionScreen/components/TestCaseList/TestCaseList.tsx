import { Strut } from 'components/Layout';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TestCaseDropdown from '../TestCaseDropdown';
import { Submission } from 'store/submission/types';

interface Props {
    /**
     * List of data for the submission results.
     */
    data: Submission[];
}

const TestCaseList = (props: Props): JSX.Element => {
    const { data } = props;

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item: submission }) => {
                    return <TestCaseDropdown submission={submission} />;
                }}
                ItemSeparatorComponent={() => <Strut size={12} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default TestCaseList;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    list: {
        overflow: 'visible',
    },
});
