import styled, { css } from 'styled-components';
import CleanElement from './cleanElement';
import detectFlexGapFeature from './detectFlexGapFeature';

const boxProps = ['height', 'width', 'margin', 'padding', 'border'];
const flexBoxProps = ['is', 'inline', 'wrapReverse', 'justifyContent', 'alignItems', 'alignContent', 'column', 'reverse', 'wrap', 'gap', 'columnGap', 'rowGap', 'center'];
const flexItemProps = ['is', 'box', 'order', 'flex', 'alignSelf', 'basis', 'shrink', 'grow'];

const boxModelStyles = css(props => boxProps.reduce((acc, style) => {
    acc[style] = props[style];
    return acc;
}, {}));

const flexBoxStyles = css(props => {
    let flexDirection;
    let gapObj;
    let gapKey;
    let flexWrap;
    const { inline, wrapReverse, alignContent, column, reverse,
        wrap, gap, columnGap, rowGap, center } = props;
    let { justifyContent, alignItems } = props;
    if (column || reverse) {
        flexDirection = column ? 'column' : 'row';
        flexDirection += reverse ? '-reverse' : '';
    }
    if (gap || columnGap || rowGap) {
        if (wrap) {
            /**
             * Gap in wrap mode is not supported yet
             * If you have any better suggestions please create an issue or contribute by raising PR
            */
        }
        else if (!detectFlexGapFeature()) {
            const marginProp = column ? 'bottom' : 'right';
            const child = reverse ? 'first' : 'last';
            const gapProp = (column ? rowGap : columnGap) || gap;

            gapKey = `& > :not(:${child}-child)`;
            gapObj = {
                [`margin-${marginProp}`]: gapProp,
            };
        }
    }
    if (center) {
        justifyContent = justifyContent || 'center';
        alignItems = alignItems || 'center';
    }
    if (wrap) flexWrap = 'wrap';
    if (wrapReverse) flexWrap = 'wrap-reverse';

    return {
        display: inline ? 'inline-flex' : 'flex',
        flexWrap,
        justifyContent,
        alignItems,
        alignContent,
        flexDirection,
        gap,
        columnGap,
        rowGap,
        [gapKey]: gapObj,
    };
});

const flexItemStyles = css(props => {
    const { order, flex, alignSelf, basis, shrink, grow } = props;
    return {
        order,
        flex,
        alignSelf,
        'flex-basis': basis,
        'flex-shrink': shrink,
        'flex-grow': grow,
    };
});
const CleanFlexBox = CleanElement([...boxProps, ...flexBoxProps]);
const CleanFlexItem = CleanElement([...boxProps, ...flexItemProps, ...flexBoxProps]);

export const FlexBox = styled(CleanFlexBox)`${boxModelStyles}${flexBoxStyles}`;
export const FlexItem = styled(CleanFlexItem)`${boxModelStyles}${flexItemStyles}${props => props.box && flexBoxStyles}`;
