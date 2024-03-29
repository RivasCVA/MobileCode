/**
 * The root stack parameter list is used to define props for Stack Navigator screens.
 *
 * All screen routes should be listed in the `RootStackParamList` type.
 *
 * Type the `useNavigation` hook as:
 * ```
 * const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
 * ```
 *
 * Type the `useRoute` hook as:
 * ```
 * const route = useRoute<RouteProp<RootStackParamList, 'ScreenName'>>();
 * ```
 */
export type RootStackParamList = {
    Problems: undefined;
    Editor: {
        /** Problem _id. */
        _id: string;
        /** Problem title. */
        title: string;
    };
    Submission: {
        /** Problem directory. */
        directory: string;
        /** User code. */
        code: string;
    };
};
