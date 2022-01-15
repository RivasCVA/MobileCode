/**
 * The root stack parameter list is used to define props for Stack Navigators.
 *
 * The global modifier is for the `useNavigation` hook to type-check
 * navigation routes alongside navigation props.
 *
 * All screen routes should be listed in the `RootStackParamList` interface.
 * @type object | undefined
 */
export interface RootStackParamList {
    Problems: undefined;
    Editor: undefined;
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
