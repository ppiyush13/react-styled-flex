import detectFlexGapFeature from '../src/detectFlexGapFeature';

jest.mock('../src/memoize', () => fn => () => fn());

describe('testing core feature of detectFlexGapFeature module', () => {
    let windowSpy;
    beforeAll(() => {
        windowSpy = jest.spyOn(window, 'getComputedStyle');
    });

    afterEach(() => {
        windowSpy.mockRestore();
    });

    afterAll(() => {
        jest.unmock('../src/memoize');
    });

    it('should return true if computed width is 3px', () => {
        windowSpy.mockImplementation(() => ({
            width: '3px',
        }));
        expect(detectFlexGapFeature()).toEqual(true);
    });

    it('should return false if computed width is 5px', () => {
        windowSpy.mockImplementation(() => ({
            width: '5px',
        }));
        expect(detectFlexGapFeature()).toEqual(false);
    });
});

/*
Command to debug test files in chrome
node --inspect-brk node_modules\jest\bin\jest.js detectFlexFapFeature.test --config jest.config.js
*/
