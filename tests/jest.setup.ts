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
    };
});
jest.mock('react-native-fbsdk-next', () => require('react-native-fbsdk-next/jest/mocks').default);