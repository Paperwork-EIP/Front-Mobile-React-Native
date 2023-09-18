jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('expo-linking', () => {
    const module: typeof import('expo-linking') = {
        ...jest.requireActual('expo-linking'),
        createURL: jest.fn(),
    };
    return module;
});
jest.mock('@react-navigation/native', () => { });
jest.mock('@react-native-async-storage/async-storage', () => {
    return {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
    };
});
jest.mock('../src/services/Storage', () => ({
    storeItem: jest.fn(),
    getItem: jest.fn().mockResolvedValue('mockToken'),
    saveUserData: jest.fn(),
    deleteItemAndRedirectTo: jest.fn(),
    getUserData: jest.fn().mockResolvedValue({
        name: 'John Doe',
        firstName: 'John',
        familyName: 'Doe',
        email: 'tewtwetwe',
        id: '12345',
        picture: 'https://example.com/avatar.jpg'
    })
}));
