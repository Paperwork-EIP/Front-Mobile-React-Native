import React from 'react';
import { render } from '@testing-library/react-native';

import GoogleAuthButton from '../../src/services/Google';

jest.mock('expo-auth-session/providers/google', () => ({
    startAsync: jest.fn(),
    makeRedirectUri: jest.fn(),
    useAuthRequest: jest.fn(),
}));

describe('GoogleAuthButton', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    it('renders correctly', () => {
        render(<GoogleAuthButton navigation={navigation} />);
    });
});