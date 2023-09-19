import * as Storage from '../../src/services/Storage';

describe('Storage', () => {
    test('store item in AsyncStorage', async () => {
        const value = 'mockValue';

        const dataTest = await Storage.storeItem(value, value);

        expect(dataTest).not.toBeNull();
    });

    test('get item in AsyncStorage', async () => {
        const value = 'mockValue';

        const dataTest = await Storage.getItem(value);

        expect(dataTest).not.toBeNull();
    });
});