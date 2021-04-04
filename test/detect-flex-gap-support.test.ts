import mockComputedStyles from './util/mock-computed-styles';
import { FLEX_GAP_NOT_SUPPORTED, FLEX_GAP_SUPPORTED } from '../src/constants';

describe('testing detect-flex-gap-support module', () => {
    afterEach(() => jest.resetModules());
    afterEach(() => jest.restoreAllMocks());

    it.each([
        ['5px', FLEX_GAP_NOT_SUPPORTED],
        ['3px', FLEX_GAP_SUPPORTED],
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
