const Colors = {
    PrimaryBackground: '#FAFAFA',
    SecondaryBackground: '#F0F0F0',
    PrimaryDarkText: '#323232',
    SecondaryDarkText: '#626783',
    PrimaryLightText: '#FAFAFA',
    SecondaryLightText: '#F6F5F8',
    White: '#FAFAFA',
    Black: '#323232',
    DarkGray: '#626783',
    LightGray: '#B0B3C1',
    Purple: '#1F3078',
    Green: '#46C08E',
    Blue: '#009BDE',
    Red: '#D23F00',
};

export default Colors;

/**
 * Converts a Color attribute to RGB(A).
 * @param hex The hexadecimal string value.
 * @param alpha Optional alpha value [0, 1].
 */
export const HexToRGB = (hex: string, alpha?: number): string => {
    const h = '0123456789ABCDEF';
    const r = h.indexOf(hex[1]) * 16 + h.indexOf(hex[2]);
    const g = h.indexOf(hex[3]) * 16 + h.indexOf(hex[4]);
    const b = h.indexOf(hex[5]) * 16 + h.indexOf(hex[6]);
    if (alpha) {
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
};
