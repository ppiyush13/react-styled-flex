import memoize from '../src/memoize'

describe('Test suites for memoize module ', () => {
    it.each([13, 0, NaN, null, undefined, {}, [], [1], true, false, '', 'dummy', Symbol(45), Symbol(null)])
    ('should return %p', value => {
        const mockFn = jest.fn(() => value)
        const memoizedFn = memoize(mockFn)

        expect(memoizedFn()).toEqual(value)
        expect(mockFn).toHaveBeenCalledTimes(1)
        expect(memoizedFn()).toEqual(value)
        expect(mockFn).toHaveBeenCalledTimes(1)
    })
})