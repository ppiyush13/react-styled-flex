import { createElement, forwardRef } from 'react';

export default propTypes => {
    const CleanElement = forwardRef((props, ref) => {
        const RenderComponent = props.is || 'div';
        const keys = propTypes || [];
        const cleanedProps = Object.keys(props).reduce((acc, key) => {
            if (key === 'is') ; // skip is prop from leakiing to dom
            else if (keys.indexOf(key) === -1) acc[key] = props[key];
            return acc;
        }, {});

        // add ref
        cleanedProps.ref = ref;

        return createElement(RenderComponent, cleanedProps);
    });

    // assign display name for easy debugging
    CleanElement.displayName = 'CleanElement';

    return CleanElement;
};
