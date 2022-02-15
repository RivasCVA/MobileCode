import React, { useEffect, useRef, useState } from 'react';
import { View, Modal, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import DifficultySymbol from './DifficultySymbol';
import Colors, { HexToRGB } from 'util/colors';
import Fonts from 'util/fonts';
import { Strut } from 'components/Layout';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Difficulties from 'util/difficulties';

interface Props {
    /**
     * Problem description.
     */
    children: string;

    /**
     * Problem title.
     */
    title: string;

    /**
     * Problem difficulty.
     */
    difficulty: Difficulties;

    /**
     * On modal close.
     */
    onClose: () => void;
}

const DescriptionModal = (props: Props): JSX.Element => {
    const { children, title, difficulty, onClose } = props;

    const backgroundColorAlpha = useRef(new Animated.Value(0.0)).current;
    const bottomSheetRef = useRef<BottomSheet>(null);
    // Only percentage snap points
    const snapPoints: string[] = ['80%'];
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        Animated.timing(backgroundColorAlpha, {
            duration: 500,
            toValue: 0.25,
            useNativeDriver: false,
        }).start();
    }, [backgroundColorAlpha]);

    const close = () => {
        Animated.timing(backgroundColorAlpha, {
            duration: 500,
            toValue: 0.0,
            useNativeDriver: false,
        }).start(() => {
            onClose();
        });
    };

    const handleOutsidePress = () => {
        bottomSheetRef.current?.close();
    };

    const handleAnimate = (_: number, toIndex: number) => {
        if (toIndex === -1) {
            close();
        }
    };

    const handleChange = (index: number) => {
        if (index !== -1) {
            setCurrentIndex(index);
        }
    };

    return (
        <Modal transparent>
            <Animated.View
                style={[
                    styles.container,
                    {
                        backgroundColor: backgroundColorAlpha.interpolate({
                            inputRange: [0, 1],
                            outputRange: [HexToRGB(Colors.Black, 0.0), HexToRGB(Colors.Black, 1.0)],
                        }),
                    },
                ]}
            >
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <View
                        style={{
                            height: `${100 - parseFloat(snapPoints[currentIndex])}%`,
                            width: '100%',
                        }}
                    />
                </TouchableWithoutFeedback>
                <BottomSheet
                    backgroundStyle={styles.bottomSheetBackground}
                    index={currentIndex}
                    snapPoints={snapPoints}
                    onAnimate={handleAnimate}
                    onChange={handleChange}
                    ref={bottomSheetRef}
                    animateOnMount
                    enablePanDownToClose
                >
                    <BottomSheetScrollView contentContainerStyle={styles.scrollView}>
                        <Text style={styles.title}>{title}</Text>
                        <Strut size={6} />
                        <DifficultySymbol style={styles.difficultySymbol} difficulty={difficulty} />
                        <Strut size={16} />
                        <View style={styles.separator} />
                        <Strut size={24} />
                        <Text style={styles.description} numberOfLines={0}>
                            {children}
                        </Text>
                    </BottomSheetScrollView>
                </BottomSheet>
            </Animated.View>
        </Modal>
    );
};

export default DescriptionModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bottomSheetBackground: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: Colors.PrimaryBackground,
    },
    scrollView: {
        alignItems: 'center',
        padding: 24,
        paddingTop: 8,
    },
    title: {
        alignSelf: 'flex-start',
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: 28,
        color: Colors.PrimaryDarkText,
    },
    difficultySymbol: {
        alignSelf: 'flex-start',
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.PrimaryDarkText,
    },
    description: {
        width: '100%',
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 18,
        color: Colors.PrimaryDarkText,
    },
});
