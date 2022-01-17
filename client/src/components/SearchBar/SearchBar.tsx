import Button from 'components/Button';
import React, { useEffect, useRef } from 'react';
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
    onChange: (value: string) => void;

    /**
     * Use this method to hide the search bar.
     */
    onCancel?: () => void;

    /**
     * Whether to play a closing animation on cancel.
     */
    animateOnCancel?: boolean;
}

const SearchBar = (props: Props): JSX.Element => {
    const { value, onChange, onCancel, animateOnCancel = true } = props;

    const heightAnimation = useRef(new Animated.Value(64)).current;

    useEffect(() => {
        heightAnimation.setValue(0);
        Animated.timing(heightAnimation, {
            duration: 500,
            toValue: 64,
            easing: Easing.in(Easing.elastic(1)),
            useNativeDriver: false,
        }).start();
    }, [heightAnimation]);

    const handleCancelPress = () => {
        if (animateOnCancel) {
            heightAnimation.setValue(64);
            Animated.timing(heightAnimation, {
                duration: 200,
                toValue: 0,
                easing: Easing.in(Easing.ease),
                useNativeDriver: false,
            }).start(() => {
                if (onCancel) {
                    onCancel();
                }
            });
        } else if (onCancel) {
            onCancel();
        }
    };

    return (
        <Animated.View style={[styles.container, { height: heightAnimation }]}>
            <TextInput value={value} onChangeText={onChange} style={styles.input} />
            <Button
                style={styles.button}
                titleStyle={styles.buttonTitle}
                title="Cancel"
                onPress={handleCancelPress}
            />
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
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: Colors.SecondaryBackground,
    },
    input: {
        width: 247,
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
        backgroundColor: Colors.DarkGray,
    },
    buttonTitle: {
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: 14,
    },
});
