const originalGetComputedStyles = window.getComputedStyle;

type ResetMock = () => void;

export default (partialStylesObj: Record<string, string>): ResetMock => {
  window.getComputedStyle = (...args) => {
    const originalStyles = originalGetComputedStyles(...args);

    return {
      ...originalStyles,
      ...partialStylesObj,
    };
  };

  return () => {
    window.getComputedStyle = originalGetComputedStyles;
  };
};
