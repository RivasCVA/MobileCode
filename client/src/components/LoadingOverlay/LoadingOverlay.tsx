import { Strut } from 'components/Layout';
import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    StyleSheet,
    ColorValue,
} from 'react-native';
import Colors, { HexToRGB } from 'util/colors';
import Fonts from 'util/fonts';

interface Props {
    /**
     * Custom overlay styles.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Display an error message.
     */
    errorMessage?: string;

    /**
     * Activity indicator and message size.
     */
    size?: number | 'small' | 'large';

    /**
     * Activity indicator and message color.
     */
    color?: ColorValue;
}

const LoadingOverlay = (props: Props): JSX.Element => {
    const { style, errorMessage, size = 'large', color } = props;

    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size={size} color={color} />
            {errorMessage !== undefined && (
                <React.Fragment>
                    <Strut size={15} />
                    <Text style={[styles.errorMessage, color ? { color } : {}]}>
                        {errorMessage}
                    </Text>
                </React.Fragment>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        paddingHorizontal: 40,
        backgroundColor: HexToRGB(Colors.White, 0.1),
    },
    errorMessage: {
        width: '100%',
        textAlign: 'center',
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 18,
        color: Colors.DarkGray,
    },
});

export default LoadingOverlay;
