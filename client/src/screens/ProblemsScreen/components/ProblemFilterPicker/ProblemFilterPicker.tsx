import Button from 'components/Button';
import React, { useEffect, useRef } from 'react';
import {
    GestureResponderEvent,
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Animated,
    Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors, { HexToRGB } from 'util/colors';
import Fonts from 'util/fonts';

export type FilterValuesType = {
    [title: string]: {
        /**
         * Whether the filter value is selected.
         */
        selected: boolean;

        /**
         * Optional button color;
         */
        color?: string;
    };
};

interface Props {
    /**
     * Filter values.
     */
    values: FilterValuesType;

    /**
     * On filter values change.
     */
    onChange: (selectedValues: FilterValuesType) => void;

    /**
     * Use this method to remove the filter picker.
     */
    onClose: () => void;
}

/**
 * Filter picker used to selected values for which to filter all problems.
 */
const ProblemFilterPicker = (props: Props): JSX.Element => {
    const { values, onChange, onClose } = props;

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
    const opacityAnimation = useRef(new Animated.Value(1)).current;
    const translateYAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        opacityAnimation.setValue(0);
        Animated.timing(opacityAnimation, {
            duration: 250,
            toValue: 1,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();

        translateYAnimation.setValue(100);
        Animated.timing(translateYAnimation, {
            duration: 400,
            toValue: 0,
            easing: Easing.in(Easing.elastic(1)),
            useNativeDriver: true,
        }).start();
    }, [opacityAnimation, translateYAnimation]);

    // Stop press events from propagating outside the main content
    const onContentPress = (event: GestureResponderEvent) => {
        event.stopPropagation();
    };

    // Calls the close method after animation
    const close = (delay: number = 100) => {
        opacityAnimation.setValue(1);
        Animated.timing(opacityAnimation, {
            duration: 100,
            toValue: 0,
            delay: delay,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });

        translateYAnimation.setValue(0);
        Animated.timing(translateYAnimation, {
            duration: delay + 100,
            toValue: 100,
            delay: 0,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start();
    };

    const handleOutsidePress = () => {
        close(0);
    };

    const handleValuePress = (title: string) => {
        const newValues = { ...values };
        newValues[title].selected = !newValues[title].selected;
        onChange(newValues);
    };

    const handleActionPress = () => {
        close();
    };

    return (
        <Modal transparent>
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <Animated.View style={[styles.container, { opacity: opacityAnimation }]}>
                    <SafeAreaView style={styles.safeArea}>
                        <AnimatedTouchableOpacity
                            style={[{ transform: [{ translateY: translateYAnimation }] }]}
                            onPress={onContentPress}
                            activeOpacity={1}
                        >
                            <View style={styles.valuesContainer}>
                                {Object.entries(values).map(([title, { selected, color }]) => (
                                    <Button
                                        key={title}
                                        style={styles.valueButton}
                                        titleStyle={styles.buttonTitle}
                                        title={title}
                                        color={color}
                                        colorStyle={selected ? 'solid' : 'outline'}
                                        onPress={() => handleValuePress(title)}
                                    />
                                ))}
                            </View>
                            <Button
                                style={styles.actionButton}
                                titleStyle={styles.buttonTitle}
                                title="Done"
                                color={Colors.PrimaryBackground}
                                textColor={Colors.PrimaryDarkText}
                                onPress={handleActionPress}
                            />
                        </AnimatedTouchableOpacity>
                    </SafeAreaView>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ProblemFilterPicker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: HexToRGB(Colors.Black, 0.25),
    },
    safeArea: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    valuesContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 330,
        paddingVertical: 8,
        marginBottom: 2,
        backgroundColor: Colors.PrimaryBackground,
        borderRadius: 16,
    },
    valueButton: {
        width: 282,
        height: 48,
        marginVertical: 8,
        borderRadius: 16,
        shadowOpacity: 0.25,
        shadowColor: Colors.Black,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    actionButton: {
        width: 330,
        height: 48,
        borderRadius: 16,
        marginTop: 10,
    },
    buttonTitle: {
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: 20,
    },
});
