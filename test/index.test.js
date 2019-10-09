import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { FlexBox, FlexItem } from '../src';
import * as dependency from '../src/detectFlexGapFeature';

describe('testing flexBox component', () => {
    it('should render FlexBox component with given styles', () => {
        const component = mount(<FlexBox center>Centered</FlexBox>);

        expect(component).toHaveStyleRule('display', 'flex');
        expect(component).toHaveStyleRule('justify-content', 'center');
        expect(component).toHaveStyleRule('align-items', 'center');
        expect(component.find('div').text()).toEqual('Centered');
    });

    it('should render three div nodes as childrens', () => {
        const component = mount(<FlexBox>
            <h1></h1>
            <p></p>
            <span></span>
        </FlexBox>);

        const flexContainer = component.find('div');
        expect(flexContainer).toHaveStyleRule('display', 'flex');
        expect(flexContainer.getDOMNode().childElementCount).toEqual(3);
    });

    it('should render clean html dom node, without leaking any prop', () => {
        const component = mount(<FlexBox center reverse>Centered</FlexBox>);
        expect(component.find('div').getDOMNode().attributes.length).toEqual(1);
    });

    it('should render flex-direction: column when column prop is true', () => {
        const component = mount(<FlexBox column>Column</FlexBox>);
        expect(component).toHaveStyleRule('flex-direction', 'column');
    });

    it('should render flex-direction: row-reverse when reverse prop is true', () => {
        const component = mount(<FlexBox reverse>row reverse</FlexBox>);
        expect(component).toHaveStyleRule('flex-direction', 'row-reverse');
    });

    it('should render flex-direction: column-reverse when both reverse and column props are true', () => {
        const component = mount(<FlexBox reverse column>Column reverse</FlexBox>);
        expect(component).toHaveStyleRule('flex-direction', 'column-reverse');
    });

    it('should render display: inline-flex when inline is true', () => {
        const component = mount(<FlexBox inline>inline flex</FlexBox>);
        expect(component).toHaveStyleRule('display', 'inline-flex');
    });

    it('should render flex-wrap: wrap when wrap is true', () => {
        const component = mount(<FlexBox wrap>wrapped</FlexBox>);
        expect(component).toHaveStyleRule('flex-wrap', 'wrap');
    });

    it('should render flex-wrap: wrap-reverse when wrap is true', () => {
        const component = mount(<FlexBox wrapReverse>reverse wrapped</FlexBox>);
        expect(component).toHaveStyleRule('flex-wrap', 'wrap-reverse');
    });

    it('should test with some unknown prop, so as to leak that prop to dom', () => {
        const component = mount(<FlexBox dummy={'dummy value'}>leaky div</FlexBox>);
        expect(component.find('div').getDOMNode().getAttribute('dummy')).toEqual('dummy value');
    });

    it('should apply box model styles properly', () => {
        const component = mount(<FlexBox
            height={40}
            width={'51%'}
            border={'1px solid black'}
            margin={15}
            padding={'14px 15px 100% 10rem'}
        >leaky div</FlexBox>);

        expect(component).toHaveStyleRule('height', '40px');
        expect(component).toHaveStyleRule('width', '51%');
        expect(component).toHaveStyleRule('border', '1px solid black');
        expect(component).toHaveStyleRule('margin', '15px');
        expect(component).toHaveStyleRule('padding', '14px 15px 100% 10rem');
    });

    it('should render as button when is prop="button"', () => {
        const component = mount(<FlexBox is={'button'}>
            <p></p>
            <p></p>
        </FlexBox>);

        expect(component.find('button').length).toEqual(1);
    });
});

describe('testing FlexBox gap feature', () => {
    let orgDetectFlexGapFeatureModule;
    beforeAll(() => {
        orgDetectFlexGapFeatureModule = dependency.default;
    });

    afterAll(() => {
        dependency.default = orgDetectFlexGapFeatureModule;
    });

    describe('when flex gap feature is supported', () => {
        beforeAll(() => {
            dependency.default = () => true;
        });
        it('should not apply margin when detectFlexGapFeature fn returns true', () => {
            const component = mount(<FlexBox gap={20}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).not.toHaveStyleRule('margin-right', '20px', {
                modifier: '& > :not(:last-child)',
            });
        });

        it('should set gap: 10 when detectFlexGapFeature fn returns true', () => {
            const component = mount(<FlexBox gap={10}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('gap', '10px');
        });

        it('should set column-gap: 20 when detectFlexGapFeature fn returns true', () => {
            const component = mount(<FlexBox columnGap={20}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('column-gap', '20px');
        });

        it('should set row-gap: 30 when detectFlexGapFeature fn returns true', () => {
            const component = mount(<FlexBox rowGap={30}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('row-gap', '30px');
        });
    });

    describe('when flex gap feature is not supported', () => {
        beforeAll(() => {
            dependency.default = () => false;
        });
        it('should apply gap when wrap is false', () => {
            const component = mount(<FlexBox gap={20}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('margin-right', '20px', {
                modifier: '& > :not(:last-child)',
            });
        });

        it('should apply gap when wrap is false and reverse is true', () => {
            const component = mount(<FlexBox reverse gap={'5px'}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('margin-right', '5px', {
                modifier: '& > :not(:first-child)',
            });
        });

        it('should apply gap when wrap is false and column is true', () => {
            const component = mount(<FlexBox column gap={'1.5%'}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('margin-bottom', '1.5%', {
                modifier: '& > :not(:last-child)',
            });
        });

        it('should apply gap when wrap is false and both column and reverse are true', () => {
            const component = mount(<FlexBox column reverse gap={'5rem'}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).toHaveStyleRule('margin-bottom', '5rem', {
                modifier: '& > :not(:first-child)',
            });
        });

        it('should not apply margin when wrap is true', () => {
            const component = mount(<FlexBox wrap gap={20}>
                <p></p>
                <p></p>
            </FlexBox>);

            expect(component).not.toHaveStyleRule('margin-right', '20px', {
                modifier: '& > :not(:last-child)',
            });
        });
    });
});

describe('testing FlexItem component', () => {
    it('should render flex:1 when flex prop is set to 1', () => {
        const component = mount(<FlexBox>
            <FlexItem flex={1}>Flex item</FlexItem>
        </FlexBox>);

        expect(component.find(FlexItem).length).toEqual(1);
        const flexItem = component.find(FlexItem).at(0);
        expect(flexItem).toHaveStyleRule('flex', '1');
        expect(flexItem).not.toHaveStyleRule('display', 'flex');
        expect(flexItem.find('div').text()).toEqual('Flex item');
    });

    it('is testing with few more props on FlexItem component', () => {
        const component = mount(<FlexBox>
            <FlexItem basis={500}>Flex item</FlexItem>
        </FlexBox>);

        expect(component.find(FlexItem).length).toEqual(1);
        const flexItem = component.find(FlexItem).at(0);
        expect(flexItem).toHaveStyleRule('flex-basis', '500px');
        expect(flexItem).not.toHaveStyleRule('display', 'flex');
    });

    it('should include both FlexItem and FlexBox styles when box is true', () => {
        const component = mount(<FlexBox>
            <FlexItem box alignSelf={'space-between'}>Flex item</FlexItem>
        </FlexBox>);

        expect(component.find(FlexItem).length).toEqual(1);
        const flexItem = component.find(FlexItem).at(0);
        expect(flexItem).toHaveStyleRule('align-self', 'space-between');
        expect(flexItem).toHaveStyleRule('display', 'flex');
    });

    it('should test box model props and clean element functionality', () => {
        const component = mount(<FlexBox>
            <FlexItem height={15} padding={'10px 15px'}>Flex item</FlexItem>
        </FlexBox>);

        expect(component.find(FlexItem).length).toEqual(1);
        const flexItem = component.find(FlexItem).at(0);
        expect(flexItem).toHaveStyleRule('height', '15px');
        expect(flexItem).toHaveStyleRule('padding', '10px 15px');
        expect(flexItem.find('div').getDOMNode().attributes.length).toEqual(1);
    });

    it('should renders FlexItem as p tag', () => {
        const component = mount(<FlexBox>
            <FlexItem is={'p'}>Now as paragraph tag</FlexItem>
        </FlexBox>);

        expect(component.find(FlexItem).length).toEqual(1);
        const flexItem = component.find(FlexItem).at(0);
        expect(flexItem.render().get(0).name).toEqual('p');
    });

    it('should apply flex grow and flex shrink without any units', () => {
        const component = mount(<FlexBox>
            <FlexItem grow={1} shrink={1}>child</FlexItem>
        </FlexBox>);

        expect(component.find(FlexItem).length).toEqual(1);
        const flexItem = component.find('FlexItem');
        expect(flexItem).toHaveStyleRule('flex-grow', '1');
        expect(flexItem).toHaveStyleRule('flex-shrink', '1');
    });
});

describe('testing FlexBox and FlexItem components displayName', () => {
    it('should return displayName as FlexBox', () => {
        expect(FlexBox.displayName).toEqual('FlexBox');
        expect(FlexBox.styledComponentId).toContain('FlexBox');
    });
    it('should return displayName as FlexBox', () => {
        expect(FlexItem.displayName).toEqual('FlexItem');
        expect(FlexItem.styledComponentId).toContain('FlexItem');
    });
});
