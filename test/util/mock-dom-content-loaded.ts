const updateDocumentReadyState = (readyState: DocumentReadyState) => {
    Object.defineProperty(document, 'readyState', {
        value: readyState,
        configurable: true,
        writable: true,
    });
};

/** raise DOM content loaded event manually */
const loadDom = () => setImmediate(() => {
    updateDocumentReadyState('complete');
    document.dispatchEvent(new Event('DOMContentLoaded', {
        bubbles: true,
        cancelable: true,
    }));
});

/** utility function to wait until dom content is loaded */
const waitForDomContentToLoad = () => new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
        setImmediate(resolve);
    });
});

export default () => {
    /** store original document.readyState */
    const orgReadyState = document.readyState;

    /** mock document.readyState as 'loading' */
    updateDocumentReadyState('loading');

    /** return all utilities */
    return {
        loadDom,
        waitForDomContentToLoad,
        restore: () => {
            updateDocumentReadyState(orgReadyState);
        },
    };
};
