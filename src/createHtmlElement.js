const assignStyle = (elem, obj) => {
    if(elem && obj && typeof obj === 'object') {
        Object.keys(obj).forEach(styleAttr => {
            const styleValue = obj[styleAttr]
            elem.style[styleAttr] = styleValue
        })
    }
}

const createElementsFromJSON = (json, parent) => {
    if(Array.isArray(json)) {
        json.forEach(childJson => createElementsFromJSON(childJson, parent))
    }
    else if(json && typeof json === 'object') {
        const {content, tag = 'div'} = json
        const elem = document.createElement(tag)
        Object.keys(json).forEach(attr => {
            const value = json[attr]
            if(attr === 'tag') return;
            else if(attr === 'style') assignStyle(elem, value)
            else if(attr === 'content') {
                if(typeof content === 'object') {
                    createElementsFromJSON(value, elem)
                }
                else elem.textContent = value
            }
            else {
                try {
                    elem.setAttribute(attr, value)
                }
                catch(ex) {
                    ex.name === 'InvalidCharacterError' && console.warn(`Invalid attribute ${attr}, skipping it`)
                }
            }
        })
        parent.appendChild(elem)
    }
}

export default json => {
    const parent = document.createDocumentFragment()
    createElementsFromJSON(json, parent)
    return parent
}