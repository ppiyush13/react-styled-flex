export default json => {
    const parent = document.createDocumentFragment()
    createElementsFromJSON(json, parent)
    return parent
}

const createElementsFromJSON = (json, parent) => {
    if(Array.isArray(json)) {
        json.forEach(childJson => createElementsFromJSON(childJson, parent))
    }
    else if(json) {
        const {content} = json
        var elem = document.createElement(json.tag);
        Object.keys(json).forEach(attr => {
            const value = json[attr]
            if(attr === 'tag') return
            else if(attr === 'style') assignStyle(elem, value)
            else if(attr === 'content') {
                if(typeof content === 'object') {
                    createElementsFromJSON(value, elem)
                }
                else elem.innerHTML = value
            }
            else elem.setAttribute(attr, value)
        })
        parent.appendChild(elem)
    }
}

export const assignStyle = (elem, obj) => {
    Object.keys(obj).forEach(styleAttr => {
        const styleValue = obj[styleAttr]
        elem.style[styleAttr] = styleValue
    })
}