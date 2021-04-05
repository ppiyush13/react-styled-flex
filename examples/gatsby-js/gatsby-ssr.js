const React = require('react');

exports.onRenderBody = ({ setBodyAttributes, setHeadComponents }) => {
    setBodyAttributes({
        className: 'flex-gap-not-supported',
    });
    setHeadComponents([
        <React.Fragment key={'head'}>
            <title>react-styled-flex using Gatsby</title>
            <link rel="icon" href="https://www.gatsbyjs.com/favicon-32x32.png" type="image/png"></link>
        </React.Fragment>,
    ]);
};
