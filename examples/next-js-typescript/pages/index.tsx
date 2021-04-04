import styled from 'styled-components';
import { Box, FlexBox, FlexItem } from 'react-styled-flex';

const App = () => {
    return (
        <div>
            <Header as={'header'} center >
                Next.js
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

const Header = styled(FlexBox)`
    height: 4rem;
    background-color: #0070f3;
    color: white;
`;

const NormalChild = styled.div`
    border: 1px dashed blue;
    padding: 2px 1rem;
`;

export default App;