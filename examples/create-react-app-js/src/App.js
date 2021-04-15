import styled from 'styled-components';
import { Box, FlexBox, FlexItem } from 'react-styled-flex';

export const App = () => {
    return (
        <div>
            <Header as={'header'} center minHeight={'4rem'}>
                <FlexBox
                    center
                    gap={'0.5rem'}
                    as={Link} 
                    href={'https://create-react-app.dev/'}
                    title={'Create-react-app documentation'}
                    target={'_blank'}
                    rel={"noreferrer"}
                >
                    <img 
                        src={'https://create-react-app.dev/img/logo.svg'}
                        alt={'create-react-app logo'}
                        height={34}
                        width={36}
                    />
                    <strong>Create React App</strong>
                </FlexBox>
            </Header>
            <FlexBox column gap={32} padding={'2rem'}>
                <NormalChild >Normal Child</NormalChild>
                <Box
                    sizing={'border-box'}
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

const Header = styled(FlexBox).withConfig({ displayName: 'Header' })`
    background-color: #242526;
`;

const Link = styled.a`
    text-decoration: none;
    color: rgb(245, 246, 247);
    font-weight: 700;
`;

const NormalChild = styled.div`
    border: 1px dashed blue;
    padding: 2px 1rem;
`;
