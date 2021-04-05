import React from 'react';
import styled from 'styled-components';
import { Box, FlexBox, FlexItem } from 'react-styled-flex';
import Layout from '../components/layout';
import logoSrc from '../assets/logo.svg';

const App = () => (
    <Layout>
        <div>
            <Header as={'header'} center >
                <a
                    href={'https://www.gatsbyjs.com/docs/'} 
                    title={'Gatsby documentation'}
                    target={'_blank'}
                    rel={"noreferrer"}
                >
                    <img
                        src={logoSrc}
                        alt={'gatsby logo'}
                    />
                </a>
            </Header>
            <FlexBox column gap={32} padding={'2rem'}>
                <NormalChild >Normal Child</NormalChild>
                <Box
                    padding={'2px 1rem'}
                    border={'1px dashed crimson'}
                >
                        Box Child
                </Box>
                <FlexItem
                    box
                    gap={'10px'}
                    padding={'16px'}
                    border={'1px dashed darkgreen'}
                >
                    <Box
                        padding={'2px 1rem'}
                        border={'1px dashed darkseagreen'}
                    >
                            Nested child 1
                    </Box>
                    <Box
                        padding={'2px 1rem'}
                        border={'1px dashed darkseagreen'}
                    >
                            Nested child 2
                    </Box>
                </FlexItem>
            </FlexBox>
        </div>
    </Layout>
);

const Header = styled(FlexBox)`
    height: 4rem;
    background-color: #f6edfa;
    color: white;
`;

const NormalChild = styled.div`
    border: 1px dashed blue;
    padding: 2px 1rem;
`;

export default App;
