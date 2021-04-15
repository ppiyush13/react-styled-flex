import { expectType, TypeOf, TypeEqual } from 'ts-expect';
import { boxPropsArr, flexBoxPropsArr, flexItemPropsArr } from '../src/constants';
import { BoxProps, FlexBoxProps, FlexItemProps, FlexItemBaseProps } from '../src/types';

describe('testing react-styled-flex types', () => {
    test('testing BoxProps type', () => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        expectType<TypeOf<BoxProps, { }>>(true);
        expectType<TypeOf<BoxProps, { height: 100 }>>(true);

        expectType<TypeOf<BoxProps, { gap: 100 }>>(false);
    });

    test('testing FlexBoxProps type', () => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        expectType<TypeOf<FlexBoxProps, { }>>(true);
        expectType<TypeOf<FlexBoxProps, { gap: '2rem' }>>(true);

        expectType<TypeOf<FlexBoxProps, { flex: 1 }>>(false);
    });

    test('testing FlexItemProps type', () => {
        // eslint-disable-next-line @typescript-eslint/ban-types
        expectType<TypeOf<FlexItemProps, { }>>(true);
        expectType<TypeOf<FlexItemProps, { shrink: 0 }>>(true);
        expectType<TypeOf<FlexItemProps, { shrink: 0, flex: 1 }>>(true);
        expectType<TypeOf<FlexItemProps, { box: true, flex: 1, gap: 100 }>>(true);
        expectType<TypeOf<FlexItemProps, { box: true, shrink: 0, inline: true }>>(true);

        expectType<TypeOf<FlexItemProps, { flex: 1, gap: 100 }>>(false);
        expectType<TypeOf<FlexItemProps, { shrink: 0, inline: true }>>(false);
    });
});

describe('testing key list', () => {
    /**
     * In order to avoid leaking props to dom, manual list of props are maintained which are passed
     * to shouldForwardProps API to avoid passing props.
     * These lists are maintained manually as of now. Below test cases will start failing when
     * any of the list and respective interface are out of sync.
     */

    it('should fail case when any new prop is added to BoxProps interface and not added to boxPropsArr list', () => {
        expectType<TypeEqual<
            typeof boxPropsArr[number],
            Exclude<keyof BoxProps, 'children'>
        >>(true);
    });

    it('should fail case when any new prop is added to FlexBoxProps interface and not added to flexBoxPropsArr list', () => {
        expectType<TypeEqual<
            typeof flexBoxPropsArr[number],
            Exclude<keyof FlexBoxProps, 'children'>
        >>(true);
    });

    it('should fail when any new prop is added to FlexItemBaseProps interface and not added to flexItemPropsArr list', () => {
        expectType<TypeEqual<
            typeof flexItemPropsArr[number],
            Exclude<keyof FlexItemBaseProps, 'children'>
        >>(true);
    });
});
