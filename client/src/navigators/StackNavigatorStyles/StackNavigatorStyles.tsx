import { StackNavigationOptions } from '@react-navigation/stack';
import Fonts from 'util/fonts';
import Colors from 'util/colors';

export const DefaultScreenOptions: StackNavigationOptions = {
    headerTintColor: Colors.PrimaryDarkText,
    headerTitleStyle: {
        fontFamily: Fonts.PoppinsSemiBold,
        fontSize: 18,
    },
    headerStyle: {
        backgroundColor: Colors.SecondaryBackground,
    },
    headerLeftContainerStyle: {
        paddingLeft: 16,
    },
    headerRightContainerStyle: {
        paddingRight: 16,
    },
};
