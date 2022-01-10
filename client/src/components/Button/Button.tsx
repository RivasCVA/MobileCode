import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

type BorderStyle = 'rounded';

type ColorStyle = 'solid' | 'outline';

interface Props {
    title: string;
    onPress?: () => void;
    borderStyle?: BorderStyle;
    colorStyle?: ColorStyle;
}

const Button = (props: Props): JSX.Element => {
    const { title, onPress, borderStyle = 'rounded', colorStyle = 'solid' } = props;
    return (
        <TouchableOpacity
            style={[styles.container, styles[borderStyle], styles[colorStyle]]}
            onPress={onPress}
        >
            <Text style={[styles.title, { color: styles[colorStyle].color }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 144,
        height: 56,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    rounded: {
        borderRadius: 64,
    },
    solid: {
        backgroundColor: 'purple',
        color: 'white',
    },
    outline: {
        borderWidth: 2,
        borderColor: 'purple',
        color: 'purple',
    },
});
