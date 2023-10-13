import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import axios from 'axios';

import Home from '../../src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../../src/screens/Calendar', () => ({
    __esModule: true,
    default: () => {
        return <></>;
    },
}));

jest.mock('../../src/screens/Profile', () => ({
    __esModule: true,
    default: () => {
        return <></>;
    },
}));


jest.mock('../../src/screens/MainMenu', () => ({
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

describe('Home tests', () => {
    const navigation = { navigate: jest.fn() };
    const route = { params: { colorMode: 'light' } };

    test('renders correctly', async () => {
        render(
            <NavigationContainer>
                <Home navigation={navigation} route={route} />
            </NavigationContainer>
        );
    });
});