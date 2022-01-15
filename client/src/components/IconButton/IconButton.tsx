import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonIcons } from 'util/icons';
import Colors from 'util/colors';

export type ButtonIconTypes = keyof typeof ButtonIcons;

type ButtonSizes = 'small' | 'medium' | 'large';

interface Props {
    /**
     * Icon to display.
     */
    icon: ButtonIconTypes;

    /**
     * General button size.
     */
    size?: ButtonSizes;

    /**
     * Icon color.
     */
    color?: string;

    /**
     * On press handler.
     */
    onPress?: () => void;

    /**
     * On press start handler.
     */
    onPressIn?: () => void;

    /**
     * On press end handler.
     */
    onPressOut?: () => void;

    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
}

/**
 * Icon button for any type of touch events.
 */
const IconButton = (props: Props): JSX.Element => {
    const {
        icon,
        size = 'medium',
        color = Colors.Black,
        onPress,
        onPressIn,
        onPressOut,
        disabled = false,
    } = props;

    return (
        <TouchableOpacity
            style={[styles.container, styles[size], disabled && styles.disabled]}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={0.65}
            disabled={disabled}
        >
            <Image style={[styles.image, { tintColor: color }]} source={ButtonIcons[icon]} />
        </TouchableOpacity>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    disabled: {
        opacity: 0.85,
    },
    small: {
        width: 24,
        height: 24,
    },
    medium: {
        width: 30,
        height: 30,
    },
    large: {
        width: 36,
        height: 36,
    },
});
