import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from 'navigators';
import { useKeyboard } from '@react-native-community/hooks';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import CodeEditor, {
    CodeEditorStyleType,
    CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor';
import Colors from 'util/colors';
import { Strut } from 'components/Layout';
import IconButton from 'components/IconButton';
import DescriptionModal from './components/DescriptionModal';

const EditorScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Editor'>>();
    const keyboard = useKeyboard();
    const tabBarHeight = useBottomTabBarHeight();
    const [code, setCode] = useState<string>('');
    const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);

    const { title } = route.params;

    const editorKeyboardOffset = keyboard.keyboardShown
        ? { marginBottom: keyboard.keyboardHeight - tabBarHeight }
        : {};

    useLayoutEffect(() => {
        // To avoid dependency warning
        const handleBackPress = () => {
            navigation.goBack();
        };

        navigation.setOptions({
            headerTitle: title,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => <IconButton icon="back" onPress={handleBackPress} />,
            headerRight: () => (
                <View style={styles.headerRightContainer}>
                    <IconButton icon="description" onPress={handleDescriptionPress} />
                    <Strut size={16} />
                    <IconButton icon="compiler" onPress={handleCompilerPress} />
                </View>
            ),
        });
    }, [navigation, title]);

    const handleDescriptionPress = () => {
        setShowDescriptionModal(true);
    };

    const handleCompilerPress = () => {
        //
    };

    return (
        <View style={styles.container}>
            {showDescriptionModal && (
                <DescriptionModal
                    title={title}
                    difficulty={'medium'}
                    onClose={() => setShowDescriptionModal(false)}
                >
                    This is a description.
                </DescriptionModal>
            )}
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
    headerTitle: {
        paddingHorizontal: 16,
    },
    headerRightContainer: {
        flexDirection: 'row',
    },
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
