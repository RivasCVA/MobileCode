import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated,
    Easing,
    ScrollView,
} from 'react-native';
import Icon from 'components/Icon';
import Colors from 'util/colors';
import Fonts from 'util/fonts';
import TestCaseItem from './TestCaseItem';
import { Strut } from 'components/Layout';
import { Submission } from 'store/submission/types';

interface Props {
    submission: Submission;
}

const TestCaseDropdown = (props: Props): JSX.Element => {
    const { submission } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [headerClickable, setHeaderClickable] = useState<boolean>(true);
    const contentHeightAnimation = useRef(new Animated.Value(0)).current;

    const handleHeaderClick = () => {
        if (!headerClickable) {
            return;
        }
        setHeaderClickable(false);
        if (isOpen) {
            Animated.timing(contentHeightAnimation, {
                duration: 250,
                toValue: 0,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                setIsOpen(false);
                setHeaderClickable(true);
            });
        } else {
            setIsOpen(true);
            Animated.timing(contentHeightAnimation, {
                duration: 250,
                toValue: 195,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                setHeaderClickable(true);
            });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.headerTouchable}
                activeOpacity={0.95}
                underlayColor="transparent"
                onPress={handleHeaderClick}
            >
                <View style={styles.header}>
                    <Icon
                        icon="check"
                        size="small"
                        color={submission.result ? Colors.Green : Colors.Red}
                    />
                    <Text style={styles.title} numberOfLines={1}>
                        Test Case {submission.case}
                    </Text>
                    <Icon icon="arrowDown" size="xsmall" color={Colors.White} />
                </View>
            </TouchableHighlight>
            {isOpen && (
                <Animated.View style={{ height: contentHeightAnimation }}>
                    <View style={styles.content}>
                        <ScrollView
                            contentContainerStyle={styles.contentScrollView}
                            showsVerticalScrollIndicator={false}
                        >
                            <TestCaseItem
                                title="Input"
                                code={JSON.stringify(submission.input, null, 2)}
                            />
                            <Strut size={8} />
                            <TestCaseItem
                                title="Your Output"
                                code={JSON.stringify(submission.output)}
                            />
                            <Strut size={8} />
                            <TestCaseItem
                                title="Expected Output"
                                code={JSON.stringify(submission.expected)}
                            />
                            {submission.stdout.length > 0 && (
                                <React.Fragment>
                                    <Strut size={8} />
                                    <TestCaseItem
                                        title="Stdout"
                                        code={submission.stdout.trimEnd()}
                                    />
                                </React.Fragment>
                            )}
                        </ScrollView>
                    </View>
                </Animated.View>
            )}
        </View>
    );
};

export default TestCaseDropdown;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderRadius: 8,
        paddingLeft: 16,
        paddingRight: 8,
        backgroundColor: Colors.Purple,
        shadowOpacity: 0.5,
        shadowColor: Colors.TrueBlack,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    headerTouchable: {
        zIndex: 1,
    },
    content: {
        marginTop: -8,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: Colors.Purple,
        shadowOpacity: 0.25,
        shadowColor: Colors.TrueBlack,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },
    contentScrollView: {
        paddingTop: 8,
        paddingBottom: 24,
    },
    title: {
        fontFamily: Fonts.PoppinsMedium,
        fontSize: 16,
        color: Colors.PrimaryLightText,
        marginHorizontal: 8,
        flex: 1,
    },
});
