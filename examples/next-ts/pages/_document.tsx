import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { FlexGapNotSupportedClassName } from 'react-styled-flex';

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
            });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        }
        finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="https://nextjs.org/static/favicon/favicon.ico" />
                    <title>react-styled-flex using NextJs</title>
                </Head>
                <body className={FlexGapNotSupportedClassName}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
