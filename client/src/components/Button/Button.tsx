import React, { useRef } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Animated,
    StyleProp,
    ViewStyle,
    TextStyle,
    Easing,
} from 'react-native';
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
     * Button color.
     */
    color?: string;

    /**
     * Button text color.
     */
    textColor?: string;

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
     * Custom button styles.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Custom title styles.
     */
    titleStyle?: StyleProp<TextStyle>;

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
        color = Colors.Black,
        textColor = Colors.White,
        onPress,
        onPressIn,
        onPressOut,
        style,
        titleStyle,
        borderStyle = 'rounded',
        colorStyle = 'solid',
        disabled = false,
    } = props;

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    const scaleAnimation = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.timing(scaleAnimation, {
            duration: 125,
            toValue: 0.975,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        if (onPressIn) {
            onPressIn();
        }
    };

    const handlePressOut = () => {
        Animated.timing(scaleAnimation, {
            duration: 50,
            toValue: 1,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();

        if (onPressOut) {
            onPressOut();
        }
    };

    const getColorStyle = () => {
        const colorsStyles = {
            solid: {
                backgroundColor: color,
                color: textColor,
            },
            outline: {
                borderWidth: 2,
                borderColor: color,
                color: color,
            },
        };
        return colorsStyles[colorStyle];
    };

    return (
        <AnimatedTouchableOpacity
            style={[
                styles.container,
                styles[borderStyle],
                getColorStyle(),
                { transform: [{ scale: scaleAnimation }] },
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            activeOpacity={0.95}
        >
            <Text
                style={[styles.title, { color: getColorStyle().color }, titleStyle]}
                numberOfLines={1}
            >
                {title}
            </Text>
        </AnimatedTouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    container: {
        width: 144,
        height: 56,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.PoppinsMedium,
        color: Colors.PrimaryLightText,
    },
    rounded: {
        borderRadius: 64,
    },
    disabled: {
        opacity: 0.85,
    },
});
