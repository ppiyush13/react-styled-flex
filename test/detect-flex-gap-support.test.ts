import mockComputedStyles from './util/mock-computed-styles';
import mockDomContentLoaded from './util/mock-dom-content-loaded';
import { FlexGapNotSupportedClassName, FlexGapSupportedClassName } from '../src/constants';

describe('testing detect-flex-gap-support module', () => {
    beforeEach(() => jest.resetModules());
    beforeEach(() => jest.restoreAllMocks());
    beforeEach(() => { document.body.className = ''; });

    it.each([
        ['5px', FlexGapNotSupportedClassName],
        ['3px', FlexGapSupportedClassName],
    ])('When reported width is %i, body class should be set as %s', (width, expectedClass) => {
        /* mock window.getComputedStyles */
        const restoreComputedStyles = mockComputedStyles({ width });

        /* require actual module */
        jest.requireActual('../src/detect-flex-gap-support');

        /* assert */
        expect(document.body.classList.toString()).toBe(expectedClass);

        /* cleanup */
        restoreComputedStyles();
    });
});

describe.only('testing scenarios when DOM is not loaded yet', () => {
    beforeEach(() => { document.body.className = ''; });

    it('should set class on body when DOM content is loaded', async () => {
        const { waitForDomContentToLoad, loadDom, restore } = mockDomContentLoaded();

        /* require actual module */
        jest.requireActual('../src/detect-flex-gap-support');

        /* assert that class is not yet set */
        expect(document.body.classList.toString()).toBe('');

        /** mark document.readyState as complete and trigger DOMContentLoaded event */
        loadDom();

        /** wait until DOMContentLoaded event is raised and handled */
        await waitForDomContentToLoad();

        /** assert that body has class name */
        expect(document.body.classList.toString()).toBe(FlexGapNotSupportedClassName);

        /** restore domContentLoaded mock */
        restore();
    });
});
