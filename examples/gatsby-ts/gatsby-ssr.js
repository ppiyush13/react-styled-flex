const React = require('react');
const { FlexGapNotSupportedClassName } = require('react-styled-flex');

exports.onRenderBody = ({ setBodyAttributes, setHeadComponents }) => {
    setBodyAttributes({
        className: FlexGapNotSupportedClassName,
    });
    setHeadComponents([
        <React.Fragment key={'head'}>
            <title>react-styled-flex using Gatsby</title>
            <link rel="icon" href="https://www.gatsbyjs.com/favicon-32x32.png" type="image/png"></link>
        </React.Fragment>,
    ]);
};
