import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-family: Segoe UI;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

const theme = {
    colors: {
        primary: '#0070f3',
    },
};

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    );
}
