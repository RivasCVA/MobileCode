import React from 'react';
import { View } from 'react-native';

interface Props {
    /**
     * Amount to separate.
     */
    size: number;
}

/**
 * Seperates components without the use of `style`.
 */
const Strut = (props: Props): JSX.Element => {
    const { size } = props;

    return (
        <View
            style={{
                flexBasis: size,
                width: size,
                height: size,
                flex: 0,
                flexShrink: 0,
                alignSelf: 'center',
            }}
        />
    );
};

export default Strut;
