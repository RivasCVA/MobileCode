import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import JsxParser from 'react-jsx-parser';
import showdown from 'showdown';
import { HTMLToNativeComponents } from './NativeComponents';

interface Props {
    /**
     * Markdown string.
     */
    children: string;
}

/**
 * Markdown renderer that parses a markdown string into react native components.
 *
 * It currently only supports a limited number of markdown attributes.
 */
const MarkdownView = (props: Props): JSX.Element => {
    const { children } = props;
    const converter = useRef(new showdown.Converter()).current;
    // Adds a `<br/>` tag on double newlines to correctly match markdown behavior
    const html = converter.makeHtml(children.replace(/\n\n/g, '\n<br/>\n'));

    return (
        <View style={styles.container}>
            <Text numberOfLines={0}>
                <JsxParser
                    renderInWrapper={false}
                    blacklistedAttrs={[]}
                    components={HTMLToNativeComponents}
                    jsx={html}
                    disableFragments
                />
            </Text>
        </View>
    );
};

export default MarkdownView;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});
