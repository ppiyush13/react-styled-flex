import { FLEX_GAP_NOT_SUPPORTED, FLEX_GAP_SUPPORTED } from './constants';

if (typeof document !== 'undefined') {
    const htmlDocument = document;
    const htmlBody = htmlDocument.body;
    const bodyClassList = htmlBody.classList;

    const flexGapSupported = () => {
        const PARENT_WIDTH = 10;
        const GAP = 4;
        /* create test node */
        const parent = htmlDocument.createElement('div');
        parent.style.visibility = 'hidden';
        parent.style.height = '1px';
        parent.style.width = `${PARENT_WIDTH}px`;
        parent.style.display = 'flex';
        parent.style.gap = `${GAP}px`;
        parent.innerHTML = '<div id="react-styled-flex-gap-detector-element" style="flex:1"></div><div style="flex:1"></div>';

        /* carry out tests */
        htmlBody.appendChild(parent);
        const { width } = window.getComputedStyle(parent.firstElementChild);
        htmlBody.removeChild(parent);

        /* Remove node and return result */
        return width === `${(PARENT_WIDTH - GAP) / 2}px`;
    };

    if (flexGapSupported()) {
        bodyClassList.add(FLEX_GAP_SUPPORTED);
        bodyClassList.remove(FLEX_GAP_NOT_SUPPORTED);
    }
    else {
        bodyClassList.add(FLEX_GAP_NOT_SUPPORTED);
        bodyClassList.remove(FLEX_GAP_SUPPORTED);
    }
}
