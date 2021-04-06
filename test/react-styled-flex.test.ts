import * as ReactStyledFlex from '../src';

describe('testing react-styled-flex module', () => {

    it('should export Box, FlexBox, FlexItem, FlexGap', () => {

        expect(ReactStyledFlex.Box).toBeDefined();
        expect(ReactStyledFlex.FlexBox).toBeDefined();
        expect(ReactStyledFlex.FlexItem).toBeDefined();
        expect(ReactStyledFlex.FlexGapSupportedClassName).toBeDefined();
        expect(ReactStyledFlex.FlexGapNotSupportedClassName).toBeDefined();

    });
});
