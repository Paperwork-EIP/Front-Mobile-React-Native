import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import axios from 'axios';

import Home from '../../src/pages/Home';

jest.mock('../../src/screens/Calendar', () => ({
    __esModule: true,
    default: () => {
        return <></>;
    },
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
    __esModule: true,
    createBottomTabNavigator: () => {
        const Tab = () => {
            return <></>;
        }

        Tab.Navigator = () => {
            return <></>;
        }

        return Tab;
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
    it('renders correctly', async () => {
        render(<Home />);
    });
});