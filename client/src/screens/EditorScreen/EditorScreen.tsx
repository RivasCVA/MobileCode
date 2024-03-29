import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
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
import LoadingOverlay from 'components/LoadingOverlay';
import DescriptionModal from './components/DescriptionModal';
import { getProblem } from 'util/requests';
import { Problem } from 'store/problems/types';
import { stringToCode, codeToString } from 'util/strings';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/user/selectors';
import Languages from 'util/languages';

const EditorScreen = (): JSX.Element => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'Editor'>>();
    const keyboard = useKeyboard();
    const tabBarHeight = useBottomTabBarHeight();
    const codeEditorRef = useRef<TextInput>(null);
    const [code, setCode] = useState<string>();
    const [showDescriptionModal, setShowDescriptionModal] = useState<boolean>(false);
    const [problem, setProblem] = useState<Problem>();
    const [fetchError, setFetchError] = useState<string>();

    const { language, theme } = useSelector(selectUser);
    const { _id, title } = route.params;

    const editorKeyboardOffset = keyboard.keyboardShown
        ? { marginBottom: keyboard.keyboardHeight - tabBarHeight }
        : {};

    useLayoutEffect(() => {
        // To avoid dependency warning
        const handleBackPress = () => {
            navigation.goBack();
        };

        const handleDescriptionPress = () => {
            if (problem) {
                codeEditorRef.current?.blur();
                setShowDescriptionModal(true);
            }
        };

        const handleCompilerPress = () => {
            if (problem && code) {
                navigation.navigate('Submission', {
                    directory: problem.directory,
                    code: codeToString(code),
                });
            }
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
    }, [code, navigation, problem, title]);

    // Fetch problem data from API
    useEffect(() => {
        const fetch = async () => {
            try {
                setProblem(await getProblem(_id, language as Languages));
            } catch (err) {
                setFetchError('Error.\nPlease try again later.');
                console.log(err);
            }
        };
        fetch();
    }, [_id, language]);

    useEffect(() => {
        if (problem) {
            // Converts all indentations to be double spaced
            setCode(
                stringToCode(problem.template[language as Languages])
                    .split('    ')
                    .join('  ')
            );
        }
    }, [language, problem]);

    const handleDescriptionModalClose = () => {
        setShowDescriptionModal(false);
        codeEditorRef.current?.focus();
    };

    return (
        <View style={styles.container}>
            {showDescriptionModal && problem && (
                <DescriptionModal
                    title={title}
                    difficulty={problem.difficulty}
                    onClose={handleDescriptionModalClose}
                >
                    {stringToCode(problem.description)}
                </DescriptionModal>
            )}
            {code === undefined ? (
                <LoadingOverlay errorMessage={fetchError} color={Colors.DarkGray} />
            ) : (
                <CodeEditor
                    style={{ ...styles.editor, ...(editorKeyboardOffset || {}) }}
                    language={language as Languages}
                    syntaxStyle={
                        CodeEditorSyntaxStyles[theme as keyof typeof CodeEditorSyntaxStyles]
                    }
                    initialValue={code}
                    onChange={(newCode) => setCode(newCode)}
                    ref={codeEditorRef}
                    showLineNumbers
                />
            )}
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
        fontSize: 18,
        highlighterLineHeight: 24,
        inputLineHeight: 24,
    } as CodeEditorStyleType,
});
