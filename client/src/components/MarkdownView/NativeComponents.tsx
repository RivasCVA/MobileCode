import React, { ReactNode } from 'react';
import { View, Text, Image, Platform } from 'react-native';

export type Theme = 'light' | 'dark';

interface HTMLToNativeComponentsType {
    [html: string]: (props: any) => JSX.Element;
}

/**
 * Pairs html elements with their react native counterparts.
 * @param theme Color theme.
 */
export const HTMLToNativeComponents = (theme: Theme): HTMLToNativeComponentsType => {
    const TextFontFamily = Platform.OS === 'ios' ? 'Arial' : 'sans-serif';
    const TextFontSize = 20;
    const TextColor = '#24292f';
    const CodeFontFamily = Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace';
    const CodeFontSize = 16;
    const CodeBackgroundColor = theme === 'light' ? '#c8d1d9' : '#161b22';
    const CodeColor = theme === 'light' ? '#161b22' : '#c8d1d9';

    interface PProps {
        children: ReactNode | string;
    }

    const P = (props: any): JSX.Element => {
        const { children } = props as PProps;
        return (
            <Text
                style={{
                    fontFamily: TextFontFamily,
                    fontSize: TextFontSize,
                    color: TextColor,
                }}
            >
                {children}
            </Text>
        );
    };

    interface StrongProps {
        children: ReactNode | string;
    }

    const Strong = (props: any): JSX.Element => {
        const { children } = props as StrongProps;
        return (
            <Text
                style={{
                    fontFamily: TextFontFamily,
                    fontSize: TextFontSize,
                    fontWeight: 'bold',
                    color: TextColor,
                }}
            >
                {children}
            </Text>
        );
    };

    interface EmProps {
        children: ReactNode | string;
    }

    const Em = (props: any): JSX.Element => {
        const { children } = props as EmProps;
        return (
            <Text
                style={{
                    fontFamily: TextFontFamily,
                    fontSize: TextFontSize,
                    fontStyle: 'italic',
                    color: TextColor,
                }}
            >
                {children}
            </Text>
        );
    };

    interface UProps {
        children: ReactNode | string;
    }

    const U = (props: any): JSX.Element => {
        const { children } = props as UProps;
        return (
            <Text
                style={{
                    fontFamily: TextFontFamily,
                    fontSize: TextFontSize,
                    textDecorationLine: 'underline',
                    color: TextColor,
                }}
            >
                {children}
            </Text>
        );
    };

    interface CodeProps {
        children: ReactNode | string;
    }

    const Code = (props: any): JSX.Element => {
        const { children } = props as CodeProps;
        const isMultiline = typeof children === 'string' ? children.includes('\n') : false;
        let textToRender = children;
        if (isMultiline) {
            const child = children as string;
            // Removes any auto-added `<br/>` tags
            textToRender = child.substring(0, child.lastIndexOf('\n')).replace(/<br\/>/g, '');
        }
        return (
            <View
                style={{
                    justifyContent: 'center',
                    backgroundColor: CodeBackgroundColor,
                    paddingHorizontal: isMultiline ? 10 : 2,
                    paddingVertical: isMultiline ? 10 : 4,
                    marginTop: isMultiline ? 8 : -5,
                    borderRadius: 6,
                }}
            >
                <Text
                    style={{
                        fontFamily: CodeFontFamily,
                        fontSize: CodeFontSize,
                        color: CodeColor,
                    }}
                >
                    {textToRender}
                </Text>
            </View>
        );
    };

    interface PreProps {
        children: ReactNode | string;
    }

    const Pre = (props: any): JSX.Element => {
        const { children } = props as PreProps;
        return (
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {children}
            </View>
        );
    };

    interface ImgProps {
        src: string;
        alt?: string;
        width?: string;
        height?: string;
    }

    const Img = (props: any): JSX.Element => {
        const { src, alt, width, height } = props as ImgProps;
        const imgWidth = Number(width);
        const imgHeight = Number(height);
        const onlyOneDimension = isNaN(imgWidth) ? !isNaN(imgHeight) : isNaN(imgHeight);
        return (
            <Image
                style={{
                    width: !isNaN(imgWidth) ? imgWidth : undefined,
                    height: !isNaN(imgHeight) ? imgHeight : undefined,
                    aspectRatio: onlyOneDimension ? 1 : undefined,
                    resizeMode: 'stretch',
                }}
                source={{ uri: src }}
                accessibilityLabel={alt}
                accessible={alt !== undefined}
            />
        );
    };

    const Br = (): JSX.Element => {
        return <Text />;
    };

    return {
        p: P,
        strong: Strong,
        em: Em,
        u: U,
        code: Code,
        pre: Pre,
        br: Br,
        img: Img,
    };
};
