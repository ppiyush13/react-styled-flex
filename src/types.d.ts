import { ReactNode, CSSProperties } from 'react';

type Never<T> = {
  [P in keyof T]?: never;
};

export interface BoxProps {
  sizing?: CSSProperties['boxSizing'];
  position?: CSSProperties['position'];
  zIndex?: CSSProperties['zIndex'];
  outline?: CSSProperties['outline'];
  overflow?: CSSProperties['overflow'];
  overflowX?: CSSProperties['overflowX'];
  overflowY?: CSSProperties['overflowY'];
  height?: CSSProperties['height'];
  maxHeight?: CSSProperties['maxHeight'];
  minHeight?: CSSProperties['minHeight'];
  width?: CSSProperties['width'];
  maxWidth?: CSSProperties['maxWidth'];
  minWidth?: CSSProperties['minWidth'];
  margin?: CSSProperties['margin'];
  marginTop?: CSSProperties['marginTop'];
  marginRight?: CSSProperties['marginRight'];
  marginBottom?: CSSProperties['marginBottom'];
  marginLeft?: CSSProperties['marginLeft'];
  m?: CSSProperties['margin'];
  mt?: CSSProperties['marginTop'];
  mr?: CSSProperties['marginRight'];
  mb?: CSSProperties['marginBottom'];
  ml?: CSSProperties['marginLeft'];
  padding?: CSSProperties['padding'];
  paddingTop?: CSSProperties['paddingTop'];
  paddingRight?: CSSProperties['paddingRight'];
  paddingBottom?: CSSProperties['paddingBottom'];
  paddingLeft?: CSSProperties['paddingLeft'];
  p?: CSSProperties['padding'];
  pt?: CSSProperties['paddingTop'];
  pr?: CSSProperties['paddingRight'];
  pb?: CSSProperties['paddingBottom'];
  pl?: CSSProperties['paddingLeft'];
  border?: CSSProperties['border'];
  borderTop?: CSSProperties['borderTop'];
  borderRight?: CSSProperties['borderRight'];
  borderBottom?: CSSProperties['borderBottom'];
  borderLeft?: CSSProperties['borderLeft'];
  b?: CSSProperties['border'];
  bt?: CSSProperties['borderTop'];
  br?: CSSProperties['borderRight'];
  bb?: CSSProperties['borderBottom'];
  bl?: CSSProperties['borderLeft'];
  children?: ReactNode;
}

export interface FlexBoxProps {
  inline?: boolean;
  wrap?: boolean;
  wrapReverse?: boolean;
  column?: boolean;
  reverse?: boolean;
  center?: boolean;
  justifyItems?: CSSProperties['justifyItems'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  alignContent?: CSSProperties['alignContent'];
  gap?: CSSProperties['gap'];
  columnGap?: CSSProperties['columnGap'];
  rowGap?: CSSProperties['rowGap'];
  children?: ReactNode;
}

export interface FlexItemBaseProps {
  box?: boolean;
  order?: CSSProperties['order'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  basis?: CSSProperties['flexBasis'];
  flex?: CSSProperties['flex'];
  alignSelf?: CSSProperties['alignSelf'];
  justifySelf?: CSSProperties['justifySelf'];
  children?: ReactNode;
}

export type FlexItemProps =
  | (FlexItemBaseProps & { box: true } & FlexBoxProps)
  | (FlexItemBaseProps & { box?: false } & Never<FlexBoxProps>);
