import * as Storage from '../../src/services/Storage';

describe('Storage', () => {
    test('stores item in AsyncStorage', async () => {
        const value = 'mockValue';
        const token = 'mockToken';

        await Storage.storeItem(value, token);

        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith(value, token);
    });

    test('saves user data in AsyncStorage', async () => {
        const name = 'John Doe';
        const firstName = 'John';
        const familyName = 'Doe';
        const email = 'john.doe@example.com';
        const id = '12345';
        const picture = 'path_to_image.jpg';

        await Storage.saveUserData(name, firstName, familyName, email, id, picture);

        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('@userName', name);
        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('@userFirstName', firstName);
        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('@userFamilyName', familyName);
        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('@userEmail', email);
        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('@userId', id);
        expect(require('@react-native-async-storage/async-storage').setItem).toHaveBeenCalledWith('@userPicture', picture);
    });

    
    test('get user data in AsyncStorage', async () => {
        const dataTest = await Storage.getUserData();
        
        expect(dataTest).not.toBeNull();
        expect(dataTest).not.toBeUndefined();
        expect(dataTest).not.toBeFalsy();
        expect(dataTest).toBeTruthy();
    });
});