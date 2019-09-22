import createHtmlElement from './createHtmlElement'

let memoizedResult
export default () => {
    if(memoizedResult != null) return memoizedResult;
    /*
        Detection code
    */
    const tempFragment = createHtmlElement(json)
    const testNode = tempFragment.children[0]
    /*
        Create temp html node for feature detection
    */
    document.body.appendChild(testNode)
    const width = window.getComputedStyle(testNode.firstElementChild)['width']
    document.body.removeChild(testNode)
    /*
        Remove node and memoize result
    */
    memoizedResult = width === '3px'
    return memoizedResult
}

const json = {
    tag: 'div',
    style: {
        height: '1px',
		width: '10px',
		display: 'flex',
		visibility: 'hidden',
		gap: '4px'
    },
    content: [
        {
            tag: 'div',
            style: {
                flex: 1
            }
        },
        {
            tag: 'div',
            style: {
                flex: 1
            }
        }
    ]
}