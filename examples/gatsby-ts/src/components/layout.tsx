import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 16px;
        font-family: Segoe UI;
    }

    * {
        padding: 0;
        margin: 0;
    }
`;

export default function Layout({ children }: { children: React.ReactElement }) {
    return (
        <React.Fragment>
            <GlobalStyle />
            {children}
        </React.Fragment>
    );
}
