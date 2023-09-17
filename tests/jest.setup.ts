jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('expo-linking', () => {
    const module: typeof import('expo-linking') = {
        ...jest.requireActual('expo-linking'),
        createURL: jest.fn(),
    };

    return module;
});

jest.mock('expo-auth-session/providers/google', () => ({
    ...jest.requireActual('expo-auth-session/providers/google'),
    useAuthRequest: jest.fn(),
}));

jest.mock('axios');
jest.mock('@react-navigation/native', () => { });
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);