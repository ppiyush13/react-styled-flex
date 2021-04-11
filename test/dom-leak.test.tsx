import React from 'react';
import { render } from '@testing-library/react';
import { Box, BoxProps, FlexBox, FlexBoxProps, FlexItem, FlexItemProps } from '../src';

const assert = (element: Element) => {
    expect(element.attributes.length).toBe(1);
    expect(element).toHaveAttribute('class');
};

const boxParams = {
    sizing: 'border-box',
    height: '50px',
    width: '100%',
    margin: '2rem auto',
    padding: '10px 15px 0px 15px',
    border: '1px solid #000',
} as const;

const flexBoxParams = {
    inline: true,
    wrap: true,
    wrapReverse: true,
    column: true,
    reverse: true,
    center: true,
    justifyItems: 'flex-start',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    alignContent: 'flex-end',
    gap: '15px',
    rowGap: '20px',
    columnGap: '25px',
} as const;

const flexItemParams = {
    box: true,
    order: 5,
    shrink: 0,
    grow: 'unset',
    basis: '100%',
    flex: 1,
    alignSelf: 'center',
    justifySelf: 'center',
} as const;

describe('testing dom leaking nature of Box, FlexBox and FlexItem', () => {
    it('box: expect props are not leaked into DOM', () => {
        const props: Required<BoxProps> = {
            ...boxParams,
            children: <>
                <div>child div</div>
            </>,
        };

        const { container } = render(<Box {...props} />);
        assert(container.firstElementChild);
    });

    it('flexBox: expect props are not leaked into DOM', () => {
        const props: Required<FlexBoxProps> = {
            ...boxParams,
            ...flexBoxParams,
            children: <>
                <div>child div</div>
            </>,
        };

        const { container } = render(<FlexBox {...props} />);
        assert(container.firstElementChild);
    });

    it('flexItem: expect props are not leaked into DOM', () => {
        const props: Required<FlexItemProps> = {
            ...boxParams,
            ...flexBoxParams,
            ...flexItemParams,
            children: <>
                <div>child div</div>
            </>,
        };

        const { container } = render(<FlexItem {...props} />);
        assert(container.firstElementChild);
    });
});
