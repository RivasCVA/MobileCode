import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from 'util/colors';
import Fonts from 'util/fonts';

interface Props {
    /**
     * Item title.
     */
    title: string;

    /**
     * Code to display.
     */
    code: string;
}

const TestCaseItem = (props: Props): JSX.Element => {
    const { title, code } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.codeContainer}>
                <Text style={styles.code}>{code}</Text>
            </View>
        </View>
    );
};

export default TestCaseItem;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: 14,
        marginVertical: 2,
        color: Colors.PrimaryLightText,
    },
    codeContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 5,
        backgroundColor: Colors.SecondaryLightText,
    },
    code: {
        color: Colors.PrimaryDarkText,
        fontFamily: Fonts.Code,
        fontSize: 16,
    },
});
