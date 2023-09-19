import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { cleanup, render } from '@testing-library/react-native';
import axios from 'axios';

import Home from '../../src/pages/Home';

jest.mock('../../src/screens/Calendar', () => ({
    __esModule: true,
    default: () => {
        return <></>;
    },
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

describe('Home', () => {
    test('renders correctly', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <Home />
            </NavigationContainer>
        );

        expect(getByText('Main Menu')).toBeTruthy();
    });
});