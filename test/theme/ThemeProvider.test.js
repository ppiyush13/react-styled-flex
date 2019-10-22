import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { FlexBox, FlexItem } from '../../src';

describe('FlexBox and FlexItem with ThemeProvide', () => {
    it('should render blue color', () => {
        const FlexButton = styled(FlexItem)`
            outline: none;
            color: ${props => props.theme.color};
            background: lightblue;
        `;

        const Content = styled(FlexBox)`
            width: 1000px;
            background: ${props => props.theme.bg};
            flex: 1;
        `;

        const Component = ({ item }) => <Content>
            <FlexButton is={'button'}>Logo</FlexButton>
            <FlexButton is={'a'}>child {item}</FlexButton>
        </Content>;
        const wrapper = mount(<ThemeProvider theme={{ color: 'red', bg: 'black' }}>
            <Component item={'ES6'}/>
        </ThemeProvider>);

        expect(wrapper.find('Content')).toHaveStyleRule('background', 'black');
        expect(wrapper.find('FlexButton')).toHaveStyleRule('color', 'red');
        expect(wrapper.find('FlexButton').at(0).render().get(0).tagName).toEqual('button');
        expect(wrapper.find('FlexButton').at(1).render().get(0).tagName).toEqual('a');
    });
});
