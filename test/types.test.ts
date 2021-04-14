import { expectType, TypeOf } from 'ts-expect';
import { BoxProps, FlexBoxProps, FlexItemProps } from '../src';

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
