import styled from 'styled-components';
import { Box, FlexBox, FlexItem } from 'react-styled-flex';
import logo from './logo.svg';

export const App = () => {
    return (
        <div>
            <Header as={'header'} center >
                <ReactLogo src={logo} alt="logo" />
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
};

// TODO: Add withConfig({ displayName: "Header" })
const Header = styled(FlexBox)`
    height: 4rem;
    background-color: #20232a;
`;

const ReactLogo = styled.img`
    height: 3rem;
    animation: App-logo-spin infinite 20s linear;
    @keyframes App-logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const NormalChild = styled.div`
    border: 1px dashed blue;
    padding: 2px 1rem;
`;
