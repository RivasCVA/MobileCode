import Button from 'components/Button';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, Animated, Easing } from 'react-native';
import Colors from 'util/colors';
import Fonts from 'util/fonts';

interface Props {
    /**
     * Text value.
     */
    value: string;

    /**
     * On value change.
     */
    onChange: (newValue: string) => void;

    /**
     * Use this method to hide the search bar (if necessary).
     */
    onCancel?: () => void;

    /**
     * Whether to show the cancel button next to the text input.
     */
    showCancel?: boolean;

    /**
     * Whether to play a closing animation on cancel.
     */
    animateOnCancel?: boolean;

    /**
     * Whether to play a mounting animation.
     */
    animateOnMount?: boolean;
}

/**
 * Search bar containing a text input.
 */
const SearchBar = (props: Props): JSX.Element => {
    const {
        value,
        onChange,
        onCancel,
        showCancel = false,
        animateOnCancel = false,
        animateOnMount = false,
    } = props;

    const heightAnimation = useRef(new Animated.Value(64)).current;
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (animateOnMount) {
            heightAnimation.setValue(0);
            Animated.timing(heightAnimation, {
                duration: 400,
                toValue: 64,
                easing: Easing.in(Easing.elastic(1)),
                useNativeDriver: false,
            }).start();
        } else {
            heightAnimation.setValue(64);
        }
    }, [animateOnMount, heightAnimation]);

    const handleCancelPress = () => {
        if (animateOnCancel) {
            // Prevent double clicking cancel
            setButtonDisabled(true);

            heightAnimation.setValue(64);
            Animated.timing(heightAnimation, {
                duration: 150,
                toValue: 0,
                easing: Easing.in(Easing.ease),
                useNativeDriver: false,
            }).start(() => {
                if (onCancel) {
                    setTimeout(() => {
                        onCancel();
                    }, 10);
                }
            });
        } else if (onCancel) {
            onCancel();
        }
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnimation }]}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                autoCorrect={false}
                autoFocus={true}
                autoCapitalize="none"
                returnKeyType="done"
            />
            {showCancel && (
                <Button
                    style={styles.button}
                    titleStyle={styles.buttonTitle}
                    title="Cancel"
                    onPress={handleCancelPress}
                    disabled={buttonDisabled}
                />
            )}
        </Animated.View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: Colors.SecondaryBackground,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: Colors.DarkGray,
        borderRadius: 64,
        paddingHorizontal: 16,
        color: Colors.SecondaryDarkText,
        fontFamily: Fonts.PoppinsMedium,
        fontSize: 14,
    },
    button: {
        width: 82,
        height: 32,
        marginLeft: 32,
        backgroundColor: Colors.DarkGray,
    },
    buttonTitle: {
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: 14,
    },
});
