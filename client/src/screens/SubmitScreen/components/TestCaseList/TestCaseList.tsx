import { Strut } from 'components/Layout';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import TestCaseDropdown from '../TestCaseDropdown';

interface Props {
    data: {
        case: number;
        input: any;
        output: any;
        expected: any;
        result: boolean;
        stdout: string;
        runtime: number;
    }[];
}

const TestCaseList = (props: Props): JSX.Element => {
    const { data } = props;

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({ item }) => {
                    return <TestCaseDropdown caseNumber={item.case} />;
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
