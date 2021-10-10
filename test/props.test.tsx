import React from 'react';
import { render } from '@testing-library/react';
import { Box, FlexBox, FlexItem } from '../src';

const boxCases = [
    [{ sizing: 'content-box' }, 'box-sizing: content-box'],
    [{ position: 'fixed' }, 'position: fixed'],
    [{ zIndex: 10 }, 'z-index: 10'],
    [{ outline: '1px solid purple' }, 'outline: 1px solid purple'],

    [{ overflow: 'auto' }, 'overflow: auto'],
    [{ overflowX: 'scroll' }, 'overflow-x: scroll'],
    [{ overflowY: 'hidden' }, 'overflow-y: hidden'],

    [{ height: '15px' }, 'height: 15px'],
    [{ maxHeight: '100vh' }, 'max-height: 100vh'],
    [{ minHeight: 100 }, 'min-height: 100px'],

    [{ width: '100%' }, 'width: 100%'],
    [{ maxWidth: '10rem' }, 'max-width: 10rem'],
    [{ minWidth: '60ch' }, 'min-width: 60ch'],

    [{ margin: '2rem 0.5rem' }, 'margin: 2rem 0.5rem'],
    [{ margin: 5 }, 'margin: 5px'],
    [{ marginTop: 6 }, 'margin-top: 6px'],
    [{ marginRight: 7 }, 'margin-right: 7px'],
    [{ marginBottom: 8 }, 'margin-bottom: 8px'],
    [{ marginLeft: 9 }, 'margin-left: 9px'],
    [{ m: 10 }, 'margin-top: 10px'],
    [{ mt: 11 }, 'margin-top: 11px'],
    [{ mr: 12 }, 'margin-right: 12px'],
    [{ mb: 13 }, 'margin-bottom: 13px'],
    [{ ml: 14 }, 'margin-left: 14px'],

    [{ padding: '15px 10px 5px 0px' }, 'padding: 15px 10px 5px 0px'],
    [{ paddingTop: '2em' }, 'padding-top: 2em'],
    [{ paddingRight: '3em' }, 'padding-right: 3em'],
    [{ paddingBottom: '4em' }, 'padding-bottom: 4em'],
    [{ paddingLeft: '5em' }, 'padding-left: 5em'],
    [{ p: '10vh 0 0 10vh' }, 'padding: 10vh 0 0 10vh'],
    [{ pt: '6em' }, 'padding-top: 6em'],
    [{ pr: '7em' }, 'padding-right: 7em'],
    [{ pb: '8em' }, 'padding-bottom: 8em'],
    [{ pl: '9em' }, 'padding-left: 9em'],

    [{ border: '1px solid #000' }, 'border: 1px solid #000'],
    [{ borderTop: '2px solid #000' }, 'border-top: 2px solid #000'],
    [{ borderRight: '3px solid #000' }, 'border-right: 3px solid #000'],
    [{ borderBottom: '4px solid #000' }, 'border-bottom: 4px solid #000'],
    [{ borderLeft: '5px solid #000' }, 'border-left: 5px solid #000'],
    [{ b: '6px solid #000' }, 'border: 6px solid #000'],
    [{ bt: '7px solid #000' }, 'border-top: 7px solid #000'],
    [{ br: '8px solid #000' }, 'border-right: 8px solid #000'],
    [{ bb: '9px solid #000' }, 'border-bottom: 9px solid #000'],
    [{ bl: '10px solid #000' }, 'border-left: 10px solid #000'],
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
