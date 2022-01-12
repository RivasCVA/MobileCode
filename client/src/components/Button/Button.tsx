import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import Fonts from 'util/fonts';
import Colors from 'util/colors';

type BorderStyle = 'rounded';

type ColorStyle = 'solid' | 'outline';

interface Props {
    /**
     * Button title.
     */
    title: string;

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
     * Border curve style.
     */
    borderStyle?: BorderStyle;

    /**
     * Button coloring style.
     */
    colorStyle?: ColorStyle;

    /**
     * Whether the button is disabled.
     */
    disabled?: boolean;
}

/**
 * Button for any type of touch events.
 */
const Button = (props: Props): JSX.Element => {
    const {
        title,
        onPress,
        onPressIn,
        onPressOut,
        borderStyle = 'rounded',
        colorStyle = 'solid',
        disabled = false,
    } = props;

    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scale, {
            duration: 150,
            toValue: 0.95,
            useNativeDriver: true,
        }).start();

        if (onPressIn) {
            onPressIn();
        }
    };

    const handlePressOut = () => {
        Animated.timing(scale, {
            duration: 50,
            toValue: 1,
            useNativeDriver: true,
        }).start();

        if (onPressOut) {
            onPressOut();
        }
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            activeOpacity={0.95}
        >
            <Animated.View
                style={[
                    styles.button,
                    styles[borderStyle],
                    styles[colorStyle],
                    { transform: [{ scale }] },
                    disabled && styles.disabled,
                ]}
            >
                <Text style={[styles.title, { color: styles[colorStyle].color }]} numberOfLines={1}>
                    {title}
                </Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        width: 144,
        height: 56,
    },
    button: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.PoppinsMedium,
    },
    rounded: {
        borderRadius: 64,
    },
    solid: {
        backgroundColor: Colors.Purple,
        color: Colors.White,
    },
    outline: {
        borderWidth: 2,
        borderColor: Colors.Purple,
        color: Colors.Purple,
    },
    disabled: {
        opacity: 0.85,
    },
});
