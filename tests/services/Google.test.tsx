import React from 'react';
import { render } from '@testing-library/react-native';
import GoogleAuthButton from '../../src/services/Google';

describe('GoogleAuthButton', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    it('renders correctly', () => {
        render(<GoogleAuthButton navigation={navigation} />);
    });
});