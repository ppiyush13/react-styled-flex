export const FlexGapSupportedClassName = 'flex-gap-supported';
export const FlexGapNotSupportedClassName = 'flex-gap-not-supported';

export const boxPropsArr = ['sizing', 'position', 'height', 'maxHeight', 'minHeight', 'width', 'maxWidth', 'minWidth', 'margin', 'marginTop','marginRight','marginBottom', 'marginLeft','padding', 'border'] as const;
export const flexBoxPropsArr = ['inline', 'wrap', 'reverse', 'wrapReverse', 'column', 'center', 'justifyContent', 'justifyItems', 'alignItems', 'alignContent', 'gap', 'columnGap', 'rowGap'] as const;
export const flexItemPropsArr = ['box', 'order', 'grow', 'shrink', 'basis', 'flex', 'alignSelf', 'justifySelf'] as const;

export const boxProps: string[] = boxPropsArr.slice();
export const flexBoxProps: string[] = flexBoxPropsArr.slice();
export const flexItemProps = (flexItemPropsArr.slice() as string[]).concat(flexBoxProps);
