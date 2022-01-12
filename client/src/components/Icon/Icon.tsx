import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Icons from 'util/icons';

interface Props {
    /**
     * Icon to display.
     */
    icon: keyof typeof Icons;
}

/**
 * Static icon image.
 */
const Icon = (props: Props): JSX.Element => {
    const { icon } = props;

    return <Image style={styles.container} source={Icons[icon]} />;
};

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
    },
});

export default Icon;
