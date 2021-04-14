import React from 'react';
import { render } from '@testing-library/react';
import { Box, FlexBox, FlexItem } from '../src';

const boxCases = [
    [{ sizing: 'content-box' }, 'box-sizing: content-box'],
    [{ height: '15px' }, 'height: 15px'],
    [{ width: '100%' }, 'width: 100%'],
    [{ margin: '2rem 0.5rem' }, 'margin: 2rem 0.5rem'],
    [{ margin: 5 }, 'margin: 5px'],
    [{ padding: '15px 10px 5px 0px' }, 'padding: 15px 10px 5px 0px'],
    [{ border: '1px solid #000' }, 'border: 1px solid #000'],
] as const;

const flexBoxCases = [
    [{}, 'display: flex'],
    [{ inline: true }, 'display: inline-flex'],
    [{ wrap: true }, 'flex-wrap: wrap'],
    [{ wrapReverse: true }, 'flex-wrap: wrap-reverse'],
    [{ column: true }, 'flex-direction: column'],
    [{ column: true, reverse: true }, 'flex-direction: column-reverse'],
    [{ reverse: true }, 'flex-direction: row-reverse'],
    [{ center: true }, 'justify-content: center; align-items: center'],
    [{ justifyContent: 'space-between' }, 'justify-content: space-between'],
    [{ alignItems: 'space-around' }, 'align-items: space-around'],
    [{ center: true, justifyContent: 'space-between' }, 'justify-content: space-between; align-items: center'],
    [{ alignContent: 'flex-start' }, 'align-content: flex-start'],
    [{ justifyItems: 'space-evenly' }, 'justify-items: space-evenly'],
] as const;

const flexItemCases = [
    [{ order: 1 }, 'order: 1'],
    [{ order: 'inherit' }, 'order: inherit'],
    [{ grow: 0 }, 'flex-grow: 0'],
    [{ grow: 'unset' }, 'flex-grow: unset'],
    [{ shrink: 0.6 }, 'flex-shrink: 0.6'],
    [{ shrink: 'initial' }, 'flex-shrink: initial'],
    [{ basis: 3 }, 'flex-basis: 3px'],
    [{ basis: 'max-content' }, 'flex-basis: max-content'],
    [{ flex: 'auto' }, 'flex: auto'],
    [{ flex: 2 }, 'flex: 2'],
    [{ flex: 'min-content' }, 'flex: min-content'],
    [{ flex: '1 30px' }, 'flex: 1 30px'],
    [{ flex: '2 2 10%' }, 'flex: 2 2 10%'],
    [{ alignSelf: 'normal' }, 'align-self: normal'],
    [{ alignSelf: 'self-start' }, 'align-self: self-start'],
    [{ alignSelf: 'first baseline' }, 'align-self: first baseline'],
    [{ justifySelf: 'stretch' }, 'justify-self: stretch'],
    [{ justifySelf: 'safe center' }, 'justify-self: safe center'],
] as const;

describe('testing all the exports of react-styled-flex', () => {
    /* test Box props */
    it.each([
        ...boxCases,
    ])('box: should render component with %o props', (props, styleMatch) => {
        const { container } = render(<Box {...props} />);
        expect(container.firstChild).toHaveStyle(styleMatch);
    });

    it.each([
        ...boxCases,
        ...flexBoxCases,
    ])('flexBox: should render component with %o props', (props, styleMatch) => {
        const { container } = render(<FlexBox {...props} />);
        expect(container.firstChild).toHaveStyle(styleMatch);
    });

    it.each([
        ...boxCases,
        ...flexBoxCases,
        ...flexItemCases,
    ])('flexItem: should render component with %o props', (props, styleMatch) => {
        const { container } = render(<FlexItem box {...props} />);
        expect(container.firstChild).toHaveStyle(styleMatch);
    });

    it.each([
        ...flexBoxCases,
    ])('flexItem: should not apply flexBox props when box is false, with %o props', (props, styleMatch) => {
        // @ts-expect-error: flex-box props cannot be applied to FlexItem without box set to true
        const { container } = render(<FlexItem {...props} />);
        expect(container.firstChild).not.toHaveStyle(styleMatch);
    });
});
