import React from 'react';
import styled from 'styled-components';
import { Box, FlexBox, FlexItem } from 'react-styled-flex';

export const App = () => (
    <div>
        <Header as={'header'} center>
            <FlexBox 
                as={'a'} 
                gap={10} 
                alignItems={'center'} 
                href={'https://v2.parceljs.org/'}
                title={'Parcel documentation'}
                target={'_blank'}
                rel={"noreferrer"}
            >
                <img 
                    src={'https://v2.parceljs.org/assets/parcel.png'}
                    alt={'parcel logo image'}
                    height={30} 
                    width={38}
                />
                <img 
                    src={'https://v2.parceljs.org/assets/logo.svg'} 
                    alt={'parcel logo text'}
                    height={160} 
                    width={120} 
                />
            </FlexBox>
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
);

const Header = styled(FlexBox)`
    height: 4rem;
    background-color: #21374b;
    color: white;
`;

const NormalChild = styled.div`
    border: 1px dashed blue;
    padding: 2px 1rem;
`;

