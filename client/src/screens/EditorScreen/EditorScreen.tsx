import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from 'navigators';
import CodeEditor, { CodeEditorStyleType, CodeEditorSyntaxStyles } from 'components/CodeEditor';
import Colors from 'util/colors';
import { useKeyboard } from '@react-native-community/hooks';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const EditorScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Editor'>>();
    const keyboard = useKeyboard();
    const tabBarHeight = useBottomTabBarHeight();
    const [code, setCode] = useState<string>('');

    const { title } = route.params;

    const editorKeyboardOffset = keyboard.keyboardShown
        ? { marginBottom: keyboard.keyboardHeight - tabBarHeight }
        : {};

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerLeft: () => <View />,
        });
    }, [navigation, title]);

    return (
        <View style={styles.container}>
            <CodeEditor
                style={{ ...styles.editor, ...(editorKeyboardOffset || {}) }}
                language="javascript"
                syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                initialValue={code}
                onChange={(newCode) => setCode(newCode)}
                showLineNumbers
            />
        </View>
    );
};

export default EditorScreen;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.PrimaryBackground,
    },
    editor: {
        fontSize: 20,
        highlighterLineHeight: 26,
        inputLineHeight: 26,
    } as CodeEditorStyleType,
});
