import { setColorModeInLocalStorage, getColorModeFromLocalStorage } from '../../src/services/Parameters';
import { storeItem, getItem } from '../../src/services/Storage';

jest.mock('../../src/services/Storage');

describe('setColorModeInLocalStorage', () => {
  it('stores color mode in local storage', async () => {
    await setColorModeInLocalStorage('dark');

    expect(storeItem).toHaveBeenCalledWith('@colorMode', 'dark');
  });
});

describe('getColorModeFromLocalStorage', () => {
  it('retrieves color mode from local storage', () => {

    const result = getColorModeFromLocalStorage();

    expect(getItem).toHaveBeenCalledWith('@colorMode');
  });
});