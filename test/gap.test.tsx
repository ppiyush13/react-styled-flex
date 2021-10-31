import React from 'react';
import { render } from '@testing-library/react';
import { FlexBox, FlexItem } from '../src';
import {
  FlexGapNotSupportedClassName,
  FlexGapSupportedClassName,
} from '../src/constants';

const gapCases = [
  [{ gap: '5px' }, 'gap: 5px', 'margin-right: 5px', 'child-1'],
  [{ gap: '6px', reverse: true }, 'gap: 6px', 'margin-right: 6px', 'child-2'],
  [{ gap: '7px', column: true }, 'gap: 7px', 'margin-bottom: 7px', 'child-1'],
  [
    { gap: '8px', column: true, reverse: true },
    'gap: 8px',
    'margin-bottom: 8px',
    'child-2',
  ],
] as const;

const addFlexSupport = () => {
  document.body.classList.add(FlexGapSupportedClassName);
  document.body.classList.remove(FlexGapNotSupportedClassName);
};

const removeFlexSupport = () => {
  document.body.classList.remove(FlexGapSupportedClassName);
  document.body.classList.add(FlexGapNotSupportedClassName);
};

describe('testing gap property on FlexBox', () => {
  afterAll(() => {
    removeFlexSupport();
  });

  it.each([...gapCases])(
    'flexBox: testing gap in unsupported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      removeFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexBox {...props} data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexBox>,
      );

      expect(getByText(appliedNodeText)).toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).not.toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );

  it.each([...gapCases])(
    'flexBox: testing gap in supported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      addFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexBox {...props} data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexBox>,
      );

      expect(getByText(appliedNodeText)).not.toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );

  it.each([...gapCases])(
    'flexItem: testing gap in unsupported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      removeFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexItem {...props} box data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexItem>,
      );

      expect(getByText(appliedNodeText)).toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).not.toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );

  it.each([...gapCases])(
    'flexItem: testing gap in supported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      addFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexItem {...props} box data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexItem>,
      );

      expect(getByText(appliedNodeText)).not.toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );
});

describe('testing gap property when wrap is set tot true for FlexBox and FlexItem', () => {
  afterAll(() => {
    removeFlexSupport();
  });

  it.each([...gapCases])(
    'flexBox: testing gap in unsupported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      removeFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexBox {...props} wrap data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexBox>,
      );

      expect(getByText(appliedNodeText)).not.toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).not.toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );

  it.each([...gapCases])(
    'flexBox: testing gap in supported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      addFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexBox {...props} wrap data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexBox>,
      );

      expect(getByText(appliedNodeText)).not.toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );

  it.each([...gapCases])(
    'flexItem: testing gap in unsupported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      removeFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexItem {...props} box wrap data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexItem>,
      );

      expect(getByText(appliedNodeText)).not.toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).not.toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );

  it.each([...gapCases])(
    'flexItem: testing gap in supported browser with props %o',
    (
      props,
      supportedBrowserStyleMatch,
      unsupportedBrowserStyleMatch,
      appliedNodeText: string,
    ) => {
      addFlexSupport();

      const { getByText, getByTestId } = render(
        <FlexItem {...props} box wrap data-testid={'flex-parent'}>
          <div>child-1</div>
          <div>child-2</div>
        </FlexItem>,
      );

      expect(getByText(appliedNodeText)).not.toHaveStyle(
        unsupportedBrowserStyleMatch,
      );
      expect(getByTestId('flex-parent')).toHaveStyle(
        supportedBrowserStyleMatch,
      );
    },
  );
});
