import React, { ReactNode } from 'react';
import { View, Text, Image } from 'react-native';

interface PProps {
    children: ReactNode | string;
}

const P = (props: any): JSX.Element => {
    const { children } = props as PProps;
    return <Text style={{ fontSize: 20 }}>{children}</Text>;
};

interface StrongProps {
    children: ReactNode | string;
}

const Strong = (props: any): JSX.Element => {
    const { children } = props as StrongProps;
    return <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{children}</Text>;
};

interface EmProps {
    children: ReactNode | string;
}

const Em = (props: any): JSX.Element => {
    const { children } = props as EmProps;
    return <Text style={{ fontSize: 20, fontStyle: 'italic' }}>{children}</Text>;
};

interface UProps {
    children: ReactNode | string;
}

const U = (props: any): JSX.Element => {
    const { children } = props as UProps;
    return <Text style={{ fontSize: 20, textDecorationLine: 'underline' }}>{children}</Text>;
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
        textToRender = child.substring(0, child.lastIndexOf('\n'));
    }
    return (
        <View
            style={{
                backgroundColor: '#e7e7e7',
                paddingHorizontal: 5,
                paddingVertical: 2,
                marginTop: isMultiline ? 0 : -5,
                justifyContent: 'center',
            }}
        >
            <Text style={{ fontSize: 20, color: '#343434' }}>{textToRender}</Text>
        </View>
    );
};

interface PreProps {
    children: ReactNode | string;
}

const Pre = (props: any): JSX.Element => {
    const { children } = props as PreProps;
    return <View style={{ display: 'flex', justifyContent: 'center' }}>{children}</View>;
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

interface HTMLToNativeComponentsType {
    [html: string]: (props: any) => JSX.Element;
}

/**
 * Pairs html elements with their react native counterparts.
 */
export const HTMLToNativeComponents: HTMLToNativeComponentsType = {
    p: P,
    strong: Strong,
    em: Em,
    u: U,
    code: Code,
    pre: Pre,
    br: Br,
    img: Img,
};
