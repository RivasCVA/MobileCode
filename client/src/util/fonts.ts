import { Platform } from 'react-native';

const Fonts = {
    PoppinsBlack: 'Poppins-Black',
    PoppinsBold: 'Poppins-Bold',
    PoppinsItalic: 'Poppins-Italic',
    PoppinsLight: 'Poppins-Light',
    PoppinsMedium: 'Poppins-Medium',
    PoppinsRegular: 'Poppins-Regular',
    PoppinsSemiBold: 'Poppins-SemiBold',
    Code: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
};

export default Fonts;
