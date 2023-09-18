import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react-native';
import axios from 'axios';
import { LoginManager } from 'react-native-fbsdk-next';

import FacebookAuthButton from '../../src/services/Facebook';

jest.mock('react-native-fbsdk-next', () => {
    const mockAccessToken = {
        accessToken: 'mockAccessToken'
    };
    const mockCurrentProfile = {
        name: 'John Doe',
        firstName: 'John',
        lastName: 'Doe',
        userID: '12345',
        imageURL: 'https://example.com/avatar.jpg'
    };

    return {
        AccessToken: {
            getCurrentAccessToken: jest.fn(() => Promise.resolve(mockAccessToken))
        },
        LoginManager: {
            logInWithPermissions: jest.fn(() => Promise.resolve({ isCancelled: false }))
        },
        Profile: {
            getCurrentProfile: jest.fn(() => Promise.resolve(mockCurrentProfile))
        }
    };
});

jest.mock('../../src/services/Storage', () => ({
    storeItem: jest.fn(),
    getItem: jest.fn().mockResolvedValue('mockToken'),
    saveUserData: jest.fn(),
    getUserData: jest.fn().mockResolvedValue({
        name: 'John Doe',
        firstName: 'John',
        familyName: 'Doe',
        email: 'tewtwetwe',
        id: '12345',
        picture: 'https://example.com/avatar.jpg'
    })
}));

beforeEach(() => {
    axios.get = jest.fn().mockResolvedValue({
        status: 200,
        data: {
            id: 1,
            email: 'test@egbesrgb.com'
        }
    });

    axios.post = jest.fn().mockResolvedValue({
        status: 200,
        data: {
            jwt: 'fzsghg893yt9834yt3'
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('FacebookAuthButton', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    test('renders correctly', async () => {
        render(<FacebookAuthButton navigation={navigation} />);
    });

    test('handles Facebook authentication success', async () => {
        const { getByTestId } = render(<FacebookAuthButton navigation={navigation} />);
        const facebookButton = getByTestId('facebookButton');

        fireEvent.press(facebookButton);

        expect(getByTestId('facebookButton')).toBeTruthy();
    });

    test('handles Facebook authentication is canceled', async () => {
        const { getByTestId } = render(<FacebookAuthButton navigation={navigation} />);
        const facebookButton = getByTestId('facebookButton');

        jest.spyOn(LoginManager, 'logInWithPermissions').mockImplementationOnce(() => Promise.resolve({ isCancelled: true }));

        fireEvent.press(facebookButton);

        expect(axios.get).not.toHaveBeenCalled();
    });

    test('handles Facebook authentication error', async () => {
        const { getByTestId } = render(<FacebookAuthButton navigation={navigation} />);
        const facebookButton = getByTestId('facebookButton');

        jest.spyOn(LoginManager, 'logInWithPermissions').mockImplementationOnce(() => Promise.reject(new Error('Something went wrong')));

        fireEvent.press(facebookButton);

        expect(axios.get).not.toHaveBeenCalled();
    });

    test('error axios get', async () => {
        axios.get = jest.fn().mockRejectedValueOnce(new Error('Something went wrong'));
        axios.post = jest.fn().mockRejectedValueOnce(new Error('Something went wrong'));

        const { getByTestId } = render(<FacebookAuthButton navigation={navigation} />);
        const facebookButton = getByTestId('facebookButton');

        fireEvent.press(facebookButton);

        expect(navigation.navigate).not.toHaveBeenCalled();
    });

    test('error axios post', async () => {
        axios.post = jest.fn().mockRejectedValueOnce(new Error('Something went wrong'));

        const { getByTestId } = render(<FacebookAuthButton navigation={navigation} />);
        const facebookButton = getByTestId('facebookButton');

        fireEvent.press(facebookButton);

        expect(navigation.navigate).not.toHaveBeenCalled();
    });
});