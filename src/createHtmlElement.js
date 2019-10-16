const assignStyle = (elem, obj) => {
    if (elem && obj && typeof obj === 'object') {
        Object.keys(obj).forEach(styleAttr => {
            const styleValue = obj[styleAttr];
            elem.style[styleAttr] = styleValue; // eslint-disable-line no-param-reassign
        });
    }
};

function createElementsFromJSON(json, parent) {
    if (Array.isArray(json)) {
        json.forEach(childJson => createElementsFromJSON(childJson, parent));
    }
    else if (json && typeof json === 'object') {
        const { content, tag = 'div' } = json;
        const elem = document.createElement(tag);
        Object.keys(json).forEach(attr => {
            const value = json[attr];
            if (attr === 'tag') return;
            if (attr === 'style') assignStyle(elem, value);
            else if (attr === 'content') {
                if (typeof content === 'object') createElementsFromJSON(value, elem);
                else elem.textContent = value;
            }
            else {
                try {
                    elem.setAttribute(attr, value);
                }
                catch (ex) {
                    /*
                        //if(ex.name === 'InvalidCharacterError')
                        //throw new Error(`Invalid attribute ${attr}, skipping it`);
                        //else throw ex;
                        Mostly encountered InvalidCharacterError because of invalid attr
                        We decide in future what needs to be done for this cases
                        Two options:
                        1. Throw exception
                        2. log on console
                    */
                }
            }
        });
        parent.appendChild(elem);
    }
}

export { assignStyle };

export default json => {
    const parent = document.createDocumentFragment();
    createElementsFromJSON(json, parent);
    return parent;
};
