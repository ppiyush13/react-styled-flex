import React, { createRef } from 'react';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import styled from 'styled-components';
import { FlexBox, FlexItem } from '../../src';

describe('testing ref of FlexBox', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null;
    });

    it('should return HTML node of styled element for FlexBox', () => {
        const reference = createRef();
        act(() => {
            render(<FlexBox ref={reference}>Flex Comp</FlexBox>, container);
        });

        const div = container.querySelector('div');
        expect(reference.current).toEqual(div);
    });

    it('should return HTML node of styled element for FlexItem', () => {
        const reference = createRef();
        act(() => {
            render(<FlexItem ref={reference}>Flex Comp</FlexItem>, container);
        });

        const div = container.querySelector('div');
        expect(reference.current).toEqual(div);
    });

    it('should return HTML node of styled element by changing DOM element', () => {
        const reference = createRef();
        act(() => {
            render(<FlexBox ref={reference} is={'span'}>Flex Comp</FlexBox>, container);
        });

        const span = container.querySelector('span');
        expect(reference.current).toEqual(span);
    });

    it('should return HTML node for some complex structure', () => {
        const buttonRef = createRef();
        const logoRef = createRef();

        const Button = styled(FlexBox)`
            width: 230px;
            height: 50px; 
        `;
        act(() => {
            render(
                <Button ref={buttonRef} is={'button'}>
                    <FlexItem ref={logoRef} is={'img'} alt={'logo'} />
                    <span>Text</span>
                </Button>,
                container,
            );
        });

        const button = container.querySelector('button');
        expect(buttonRef.current).toEqual(button);

        const img = container.querySelector('img');
        expect(logoRef.current).toEqual(img);
    });
});
