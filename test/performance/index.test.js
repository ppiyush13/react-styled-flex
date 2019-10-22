import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PerformanceUtil from './PerformanceUtil';
import { FlexBox, FlexItem } from '../../src';

const repititions = 10;

it('perf test for basic layout', async () => {
    const result = await PerformanceUtil({
        repititions,
        Component: () => <FlexBox>
            <FlexItem></FlexItem>
            <FlexItem></FlexItem>
            <FlexItem></FlexItem>
            <FlexItem></FlexItem>
        </FlexBox>,
    });

    console.log(result);
});

it('perf test for advanced layout', async () => {
    const result = await PerformanceUtil({
        repititions,
        Component: () => <FlexBox gap={10} center width={500} height={'60%'} border={'1px solid black'}>
            <FlexItem order={2}>
                Child1
            </FlexItem>
            <FlexItem alignSelf={'center'}>
                Child 2
            </FlexItem>
            <FlexItem order={2} grow={0}>
                Child 3
            </FlexItem>
            <FlexItem flex={1} box reverse column>
                <FlexItem flex={1}>
                    Child 4
                </FlexItem>
            </FlexItem>
        </FlexBox>,
    });

    console.log(result);
});

it('perf test larger components', async () => {
    const result = await PerformanceUtil({
        repititions,
        Component: () => <div>
            {
                [...Array(50)].map((x, i) => <FlexBox key={i} gap={10} center width={500} height={'60%'} border={'1px solid black'}>
                    <FlexItem order={2}>
                            Child1
                    </FlexItem>
                    <FlexItem alignSelf={'center'}>
                            Child 2
                    </FlexItem>
                    <FlexItem order={2} grow={0}>
                            Child 3
                    </FlexItem>
                    <FlexItem flex={1} box reverse column>
                        <FlexItem flex={1}>
                                Child 4
                        </FlexItem>
                    </FlexItem>
                </FlexBox>)
            }
        </div>,
    });

    console.log(result);
});

it('perf test for is prop', async () => {
    const FlexButton = styled(FlexItem)`
        outline: none;
        color: papayawhip;
        background: lightblue;
    `;

    const Content = styled(FlexBox)`
        width: 1000px;
        background: grey;
        flex: 1;
    `;

    const Component = ({ item }) => <Content>
        <FlexButton is={'button'}>Logo</FlexButton>
        <FlexButton is={'a'}>child {item}</FlexButton>
    </Content>;

    const result = await PerformanceUtil({
        repititions,
        Component: () => <div>
            {
                [...Array(100)].map((x, i) => <Component key={i} item={i}/>)
            }
        </div>,
    });

    console.log(result);
});

it('perf test with theme provider component', async () => {
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

    const result = await PerformanceUtil({
        repititions,
        Component: () => <ThemeProvider theme={{ color: 'red', bg: 'black' }}>
            {
                [...Array(100)].map((x, i) => <Component key={i} item={i}/>)
            }
        </ThemeProvider>,
    });

    console.log(result);
});
