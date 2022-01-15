import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Icons from 'util/icons';
import Colors from 'util/colors';

export type IconTypes = keyof typeof Icons;

type IconSizes = 'small' | 'medium' | 'large';

interface Props {
    /**
     * Icon to display.
     */
    icon: IconTypes;

    /**
     * Icon color.
     */
    color?: string;

    /**
     * General icon size.
     */
    size?: IconSizes;
}

/**
 * Static icon image.
 */
const Icon = (props: Props): JSX.Element => {
    const { icon, color = Colors.Black, size = 'medium' } = props;

    return (
        <Image
            style={[styles.container, styles[size], { tintColor: color }]}
            source={Icons[icon]}
        />
    );
};

export default Icon;

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
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
