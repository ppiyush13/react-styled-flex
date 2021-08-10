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
    marginTop?: CSSProperties['marginTop'],
    marginRight?: CSSProperties['marginRight'],
    marginBottom?: CSSProperties['marginBottom'],
    marginLeft?: CSSProperties['marginLeft'],
    m?: CSSProperties['margin'],
    mt?: CSSProperties['marginTop'],
    mr?: CSSProperties['marginRight'],
    mb?: CSSProperties['marginBottom'],
    ml?: CSSProperties['marginLeft'],
    padding?: CSSProperties['padding'],
    paddingTop?: CSSProperties['paddingTop'],
    paddingRight?: CSSProperties['paddingRight'],
    paddingBottom?: CSSProperties['paddingBottom'],
    paddingLeft?: CSSProperties['paddingLeft'],
    p?: CSSProperties['padding'],
    pt?: CSSProperties['paddingTop'],
    pr?: CSSProperties['paddingRight'],
    pb?: CSSProperties['paddingBottom'],
    pl?: CSSProperties['paddingLeft'],
    border?: CSSProperties['border'],
    children?: ReactNode,
}

export interface FlexBoxProps extends FlexBoxUniqueProps {
    children?: ReactNode,
}

export interface FlexBoxUniqueProps {
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
    | FlexItemBaseProps & { box?: false } & Never<FlexBoxUniqueProps>;
