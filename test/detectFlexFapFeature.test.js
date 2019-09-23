//import detectFlexGapFeature from '../src/detectFlexGapFeature'

let originalGetComputedStyles =  window.getComputedStyle
let detectFlexGapFeature

beforeEach(async () => {
    jest.resetModules()
    detectFlexGapFeature = (await import ('../src/detectFlexGapFeature'))['default']
})

afterEach(() => {
    __rewire_reset_all__()
    window.getComputedStyle = originalGetComputedStyles
})

describe('Test suites for detectFlexGapFeature module', () => {
    it('should return true for given configurations', () => {
        
        /** 
        * Rewire private variables PARENT_WIDTH and GAP
        */
        detectFlexGapFeature.__set__('PARENT_WIDTH', 100)
        detectFlexGapFeature.__set__('GAP', 50)
        /**
        * Mock window.getComputeStyle function
        */
        window.getComputedStyle = () => {
            return {
                width: "25px"
            }
        }

        /**
        * Assert
        */
        expect(detectFlexGapFeature()).toEqual(true)
    })

    it('should return memoized result second time', () => {
        
        /**
        * Attach spy on create window.getComputedStyles
        */
        const spy = jest.spyOn(window, 'getComputedStyle')

        /**
        * Assert first time
        */
        detectFlexGapFeature()
        expect(spy).toHaveBeenCalledTimes(1)

        /**
        * Call and repeat same assertion again
        */
        detectFlexGapFeature()
        expect(spy).toHaveBeenCalledTimes(1)
    })
})

/*
Command to debug test files in chrome
node --inspect-brk node_modules\jest\bin\jest.js detectFlexFapFeature.test --config jest.config.js
*/