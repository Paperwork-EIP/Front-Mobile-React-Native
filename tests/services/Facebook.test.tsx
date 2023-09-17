import React from 'react';
import { render } from '@testing-library/react-native';

import FacebookAuthButton from '../../src/services/Facebook';

describe('FacebookAuthButton', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    it('renders correctly', () => {
        render(<FacebookAuthButton navigation={navigation} />);
    });
});