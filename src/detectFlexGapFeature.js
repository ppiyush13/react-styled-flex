import createHtmlElement from './createHtmlElement'

const PARENT_WIDTH = 10
const GAP = 4

const memoize = fn => {
    let result
    return () => {
        result = result != null || fn()
        return result
    }
}

const performFeatureDetection = () => {
    /*
        Detection code
    */
    const tempFragment = createHtmlElement(htmlJson)
    const testNode = tempFragment.children[0]
    /*
        Create temp html node for feature detection
    */
    document.body.appendChild(testNode)
    const width = window.getComputedStyle(testNode.firstElementChild)['width']
    document.body.removeChild(testNode)
    /*
        Remove node and return result
    */
    return width === (PARENT_WIDTH - GAP) / 2 + 'px'
}

const htmlJson = {
    tag: 'div',
    style: {
        height: '1px',
		width: PARENT_WIDTH + 'px',
		display: 'flex',
		visibility: 'hidden',
		gap: GAP + 'px'
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

export default memoize(performFeatureDetection)