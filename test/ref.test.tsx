import React from 'react';
import { render } from '@testing-library/react';
import { Box, FlexBox, FlexItem } from '../src';

describe('box: testing ref pass', () => {
    it('box: pass ref to div underlying', () => {
        const reference = React.createRef<HTMLDivElement>();
        const { container } = render(<Box ref={reference} />);
        expect(container.firstElementChild).toEqual(reference.current);
    });

    it('box: pass ref', () => {
        const reference = React.createRef<HTMLSpanElement>();
        const { container } = render(<Box as={'span'} ref={reference} />);
        expect(container.firstElementChild).toEqual(reference.current);
    });
});

describe('flexBox: testing ref pass', () => {
    it('flexBox: pass ref to div underlying', () => {
        const reference = React.createRef<HTMLDivElement>();
        const { container } = render(<FlexBox ref={reference} />);
        expect(container.firstElementChild).toEqual(reference.current);
    });

    it('flexBox: pass ref', () => {
        const reference = React.createRef<HTMLSpanElement>();
        const { container } = render(<FlexBox as={'span'} ref={reference} />);
        expect(container.firstElementChild).toEqual(reference.current);
    });
});

describe('flexItem: testing ref pass', () => {
    it('flexItem: pass ref to div underlying', () => {
        const reference = React.createRef<HTMLDivElement>();
        const { container } = render(<FlexItem ref={reference} />);
        expect(container.firstElementChild).toEqual(reference.current);
    });

    it('flexItem: pass ref', () => {
        const reference = React.createRef<HTMLSpanElement>();
        const { container } = render(<FlexItem as={'span'} ref={reference} />);
        expect(container.firstElementChild).toEqual(reference.current);
    });
});
