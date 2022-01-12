import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ButtonIcons } from 'util/icons';

interface Props {
    /**
     * Icon to display.
     */
    icon: keyof typeof ButtonIcons;

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
    const { icon, onPress, onPressIn, onPressOut, disabled = false } = props;

    return (
        <TouchableOpacity
            style={[styles.container, disabled && styles.disabled]}
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={0.65}
            disabled={disabled}
        >
            <Image style={styles.image} source={ButtonIcons[icon]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    disabled: {
        opacity: 0.85,
    },
});

export default IconButton;
