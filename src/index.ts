import styled, { CSSProperties, CSSObject } from 'styled-components';
import { FlexGapSupportedClassName, FlexGapNotSupportedClassName, boxProps, flexBoxProps, flexItemProps } from './constants';
import './detect-flex-gap-support';
import { BoxProps, FlexBoxProps, FlexItemProps, FlexItemBaseProps } from './types';

const FlexGapSupportedIdentifier = `.${FlexGapSupportedClassName} &&`;
const FlexGapNotSupportedIdentifier = `.${FlexGapNotSupportedClassName} &&`;

const boxModelStyles = (props: BoxProps): CSSObject => ({
    boxSizing: props.sizing,
    height: props.height,
    width: props.width,
    margin: props.margin,
    padding: props.padding,
    border: props.border,
});

const flexStyles = (props: FlexBoxProps): CSSObject => {
    const { inline, wrapReverse, alignContent, justifyItems, column, reverse,
        wrap, gap, columnGap, rowGap, center } = props;
    const display = inline
        ? 'inline-flex'
        : 'flex';
    let { justifyContent, alignItems } = props;
    let flexDirection: CSSProperties['flexDirection'];
    let flexWrap: CSSProperties['flexWrap'];

    if (center) {
        justifyContent = justifyContent || 'center';
        alignItems = alignItems || 'center';
    }

    if (column || reverse) {
        flexDirection = column ? 'column' : 'row';
        flexDirection += reverse ? '-reverse' : '';
    }

    if (wrap) flexWrap = 'wrap';
    if (wrapReverse) flexWrap = 'wrap-reverse';

    const result: CSSObject = {
        display,
        flexWrap,
        justifyContent,
        alignItems,
        flexDirection,
        alignContent,
        justifyItems,
    };

    if (gap || columnGap || rowGap) {
        result[FlexGapSupportedIdentifier] = {
            gap, rowGap, columnGap,
        };
        if (wrap) {
            /**
             * Gap in wrap mode is not supported yet
             * If you have any better suggestions please create an issue or contribute by raising PR
            */
        }
        else {
            const marginProp = column ? 'bottom' : 'right';
            const child = reverse ? 'first' : 'last';
            const gapProp = (column ? rowGap : columnGap) || gap;
            result[FlexGapNotSupportedIdentifier] = {
                [`& > :not(:${child}-child)`]: {
                    [`margin-${marginProp}`]: gapProp,
                },
            };
        }
    }

    return result;
};

const flexItemStyles = (props: FlexItemBaseProps): CSSObject => ({
    order: props.order,
    flex: props.flex,
    alignSelf: props.alignSelf,
    justifySelf: props.justifySelf,
    flexBasis: props.basis,
    flexShrink: props.shrink,
    flexGrow: props.grow,
});

export const Box = styled('div').withConfig({
    displayName: 'Box',
    shouldForwardProp: prop => boxProps.indexOf(prop) === -1,
})<BoxProps>(boxModelStyles);

export const FlexBox = styled(Box).withConfig({
    displayName: 'FlexBox',
    shouldForwardProp: prop => flexBoxProps.indexOf(prop) === -1,
})<FlexBoxProps>(flexStyles);

export const FlexItem = styled(Box).withConfig({
    displayName: 'FlexItem',
    shouldForwardProp: prop => flexItemProps.indexOf(prop) === -1,
})<FlexItemProps>(
    flexItemStyles,
    props => (props.box ? flexStyles : ''),
);

export { FlexGapSupportedClassName, FlexGapNotSupportedClassName };
export { BoxProps, FlexBoxProps, FlexItemProps };
