import mockComputedStyles from './util/mockComputedStyles';
import { FLEX_GAP_NOT_SUPPORTED, FLEX_GAP_SUPPORTED } from '../src/constants';

describe('testing detectFlexGapFeature module', () => {
    afterEach(() => jest.resetModules());
    afterEach(() => jest.restoreAllMocks());

    it.each([
        ['5px', FLEX_GAP_NOT_SUPPORTED],
        ['3px', FLEX_GAP_SUPPORTED],
    ])('When reported width is %i, body class should be set as %s', (width, expectedClass) => {
        /* mock window.getComputedStyles */
        const restoreComputedStyles = mockComputedStyles({ width });

        /* require actual module */
        jest.requireActual('../src/detectFlexGapFeature');

        /* assert */
        expect(document.body.classList.toString()).toBe(expectedClass);

        /* cleanup */
        restoreComputedStyles();
    });
});
