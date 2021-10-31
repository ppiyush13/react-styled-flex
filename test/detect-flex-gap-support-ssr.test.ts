/**
 * @jest-environment node
 */

describe('testing detect-flex-gap-support in SSR/SSG mode', () => {
  it('should not break test case while requiring detect-flex-gap-support in node test environment', () => {
    /* require actual module */
    jest.requireActual('../src/detect-flex-gap-support');
    expect(13).toBe(13);
  });
});
