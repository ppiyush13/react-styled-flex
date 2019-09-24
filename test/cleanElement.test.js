import React from 'react'
import {shallow} from 'enzyme'
import cleanElement from '../src/cleanElement'

describe('Test suites for cleanElement module', () => {

    /**
     * 
     * Check first whether props are leaking without cleanElement module
     */
    it('should render div with leaking props as attributes', () => {
        const leakyDiv = shallow(<div direction={"row"} column={"true"} height={"50px"}/>)
        const cheerioWrapper = leakyDiv.render()
        
        expect(cheerioWrapper[0].name).toEqual('div')
        expect(Object.keys(cheerioWrapper.attr()).length).toEqual(3)
        expect(cheerioWrapper.attr('direction')).toEqual('row')
        expect(cheerioWrapper.attr('column')).toEqual('true')
        expect(cheerioWrapper.attr('height')).toEqual('50px')

        /**
         * Passing of above asserts implies that props are indeed getting leaked onto DOM
         * So cleanElement  module is still relevant
         */
    })

    it('should render div without leaking props as attrs', () => {
        const CleanDiv = cleanElement(['direction', 'column'])
        const cleanDivComp = shallow(<CleanDiv direction={"row"} column={"true"} height={"50px"}/>)
        const cheerioWrapper = cleanDivComp.render()
        
        expect(cheerioWrapper[0].name).toEqual('div')
        expect(Object.keys(cheerioWrapper.attr()).length).toEqual(1)
        expect(cheerioWrapper.attr('direction')).toEqual(undefined)
        expect(cheerioWrapper.attr('column')).toEqual(undefined)
        expect(cheerioWrapper.attr('height')).toEqual('50px') // height prop was missed from the cleanElement method
    })

    it('should render button without leaking props as attrs', () => {
        const CleanDiv = cleanElement(['enabled', 'type'])
        const cleanDivComp = shallow(<CleanDiv is={'button'} enabled={"true"} type={"primary"} height={"50px"}/>)
        const cheerioWrapper = cleanDivComp.render()
        
        expect(cheerioWrapper[0].name).toEqual('button')
        expect(Object.keys(cheerioWrapper.attr()).length).toEqual(1)
        expect(cheerioWrapper.attr('is')).toEqual(undefined)
        expect(cheerioWrapper.attr('enabled')).toEqual(undefined)
        expect(cheerioWrapper.attr('type')).toEqual(undefined)
        expect(cheerioWrapper.attr('height')).toEqual('50px') // height prop was missed from the cleanElement method
    })

    it('should render button div with leaking props as attrs by not passing any prop list to cleanElement call', () => {
        const CleanDiv = cleanElement()
        const cleanDivComp = shallow(<CleanDiv is={'button'} enabled={"true"} type={"primary"} height={"50px"}/>)
        const cheerioWrapper = cleanDivComp.render()
        
        expect(cheerioWrapper[0].name).toEqual('button')
        expect(Object.keys(cheerioWrapper.attr()).length).toEqual(3)
        expect(cheerioWrapper.attr('is')).toEqual(undefined)
        expect(cheerioWrapper.attr('enabled')).toEqual("true")
        expect(cheerioWrapper.attr('type')).toEqual("primary")
        expect(cheerioWrapper.attr('height')).toEqual('50px') // height prop was missed from the cleanElement method
    })

})