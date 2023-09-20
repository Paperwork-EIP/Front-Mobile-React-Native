import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import axios from 'axios';

import GoogleAuthButton from '../../src/services/Google';

jest.mock('expo-auth-session/providers/google', () => ({
    startAsync: jest.fn(),
    makeRedirectUri: jest.fn(),
    useAuthRequest: jest.fn().mockReturnValue([null, {
        type: 'success',
        authentication: {
            accessToken: 'mockAccessToken',
            idToken: 'mockIdToken'
        },
    }, jest.fn()])
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

describe('GoogleAuthButton', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    test('renders correctly', () => {
        render(<GoogleAuthButton navigation={navigation} />);
    });
});