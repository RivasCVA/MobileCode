import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'components/Icon';
import Colors from 'util/colors';
import Fonts from 'util/fonts';
import TestCaseItem from './TestCaseItem';
import { Strut } from 'components/Layout';

interface Props {
    /**
     * Test case number.
     */
    caseNumber: number;
}

const TestCaseDropdown = (props: Props): JSX.Element => {
    const { caseNumber } = props;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon icon="check" size="small" color={Colors.Green} />
                <Text style={styles.title} numberOfLines={1}>
                    Test Case {caseNumber}
                </Text>
                <Icon icon="arrowDown" size="xsmall" color={Colors.White} />
            </View>
            <View style={styles.content}>
                <TestCaseItem title="Input" code="[1, 2, 3, 4]" />
                <Strut size={8} />
                <TestCaseItem title="Your Output" code="[1, 2, 3, 4]" />
                <Strut size={8} />
                <TestCaseItem title="Expected Output" code="[1, 2, 3, 4]" />
            </View>
        </View>
    );
};

export default TestCaseDropdown;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 8,
        backgroundColor: Colors.Purple,
        shadowOpacity: 0.5,
        shadowColor: Colors.TrueBlack,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        zIndex: 1,
    },
    content: {
        marginTop: -8,
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: Colors.Purple,
        shadowOpacity: 0.25,
        shadowColor: Colors.TrueBlack,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    title: {
        fontFamily: Fonts.PoppinsMedium,
        fontSize: 16,
        color: Colors.PrimaryLightText,
        marginHorizontal: 8,
        flex: 1,
    },
});
