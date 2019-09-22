import {createElement} from 'react'

export default (propTypes) => {
    return function CleanElement(props) {
        const RenderComponent = props.is || 'div'
        const keys = propTypes || []
        const cleanedProps = Object.keys(props).reduce((acc, key) => {
            if(key === 'is') ; //skip is prop from leakiing to dom
            else if(keys.indexOf(key) === -1)
                acc[key] = props[key]
            return acc
        }, {})

        return createElement(RenderComponent, cleanedProps)
    }
}