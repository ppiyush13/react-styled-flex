import { ReactNode, CSSProperties } from 'react';

type Never<T> = {
    [P in keyof T] ?: never;
};

export interface BoxProps {
    sizing?: CSSProperties['boxSizing'],
    position?: CSSProperties['position'],
    height?: CSSProperties['height'],
    maxHeight?: CSSProperties['maxHeight'];
    minHeight?: CSSProperties['minHeight'];
    width?: CSSProperties['width'],
    maxWidth?: CSSProperties['maxWidth'],
    minWidth?: CSSProperties['minWidth'],
    margin?: CSSProperties['margin'],
    padding?: CSSProperties['padding'],
    border?: CSSProperties['border'],
    children?: ReactNode,
}

export interface FlexBoxProps {
    inline?: boolean,
    wrap?: boolean,
    wrapReverse?: boolean,
    column?: boolean,
    reverse?: boolean,
    center?: boolean,
    justifyItems?: CSSProperties['justifyItems'],
    justifyContent?: CSSProperties['justifyContent'],
    alignItems?: CSSProperties['alignItems'],
    alignContent?: CSSProperties['alignContent'],
    gap?: CSSProperties['gap'],
    columnGap?: CSSProperties['columnGap'],
    rowGap?: CSSProperties['rowGap'],
    children?: ReactNode,
}

export interface FlexItemBaseProps {
    box?: boolean,
    order?: CSSProperties['order'],
    grow?: CSSProperties['flexGrow'],
    shrink?: CSSProperties['flexShrink'],
    basis?: CSSProperties['flexBasis'],
    flex?: CSSProperties['flex'],
    alignSelf?: CSSProperties['alignSelf'],
    justifySelf?: CSSProperties['justifySelf'],
    children?: ReactNode,
}

export type FlexItemProps =
    | FlexItemBaseProps & { box: true} & FlexBoxProps
    | FlexItemBaseProps & { box?: false } & Never<FlexBoxProps>;
