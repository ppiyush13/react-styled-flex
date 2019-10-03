import detectFlexGapFeature from '../src/detectFlexGapFeature';

describe('testing memoization of detectFlexGapFeature module', () => {
    it('should return memoized result unless it is first time', () => {
        /**
            To test this functionality, we will verify that
            window.getComputedStyles was called only once.
            Attach spy on create window.getComputedStyles
        */
        const spy = jest.spyOn(window, 'getComputedStyle');

        /**
        * Assert first time
        */
        detectFlexGapFeature();
        expect(spy).toHaveBeenCalledTimes(1);

        /**
        * Call and repeat same assertion again
        */
        detectFlexGapFeature();
        expect(spy).toHaveBeenCalledTimes(1);

        /*
            Call multiple times
        */
        detectFlexGapFeature();
        detectFlexGapFeature();
        detectFlexGapFeature();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
