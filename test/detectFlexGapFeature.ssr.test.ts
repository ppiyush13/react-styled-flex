/**
 * @jest-environment node
 */

describe('testing detectFlexGapFeature in SSR/SSG mode', () => {
    it('should not break test case while requiring detectFlexGapFeature in node test environment', () => {
        /* require actual module */
        jest.requireActual('../src/detectFlexGapFeature');
        expect(13).toBe(13);
    });
});
