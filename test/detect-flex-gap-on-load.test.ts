import mockDomContentLoaded from './util/mock-dom-content-loaded';
import { FlexGapNotSupportedClassName } from '../src/constants';

describe('testing scenarios when DOM is not loaded yet', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('should set class on body when DOM content is loaded', async () => {
    const { waitForDomContentToLoad, loadDom, restore } =
      mockDomContentLoaded();

    /* require actual module */
    jest.requireActual('../src/detect-flex-gap-support');

    /* assert that class is not yet set */
    expect(document.body.classList.toString()).toBe('');

    /** mark document.readyState as complete and trigger DOMContentLoaded event */
    loadDom();

    /** wait until DOMContentLoaded event is raised and handled */
    await waitForDomContentToLoad();

    /** assert that body has class name */
    expect(document.body.classList.toString()).toBe(
      FlexGapNotSupportedClassName,
    );

    /** restore domContentLoaded mock */
    restore();
  });
});
