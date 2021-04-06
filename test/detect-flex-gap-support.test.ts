import mockComputedStyles from './util/mock-computed-styles';
import { FlexGapNotSupportedClassName, FlexGapSupportedClassName } from '../src/constants';

describe('testing detect-flex-gap-support module', () => {
    afterEach(() => jest.resetModules());
    afterEach(() => jest.restoreAllMocks());

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
