import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Icons from 'util/icons';
import Colors from 'util/colors';

interface Props {
    /**
     * Icon to display.
     */
    icon: keyof typeof Icons;

    /**
     * Icon color.
     */
    color?: string;
}

/**
 * Static icon image.
 */
const Icon = (props: Props): JSX.Element => {
    const { icon, color = Colors.Black } = props;

    return <Image style={[styles.container, { tintColor: color }]} source={Icons[icon]} />;
};

export default Icon;

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
    },
});
