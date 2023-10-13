import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import DisconnectButton from '../../src/components/DisconnectButton';

jest.mock('../../src/components/calendar/CalendarComponent', () => ({
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

describe('DisconnectButton', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    test('renders correctly', () => {
        render(<DisconnectButton navigation={navigation} text={''} />);
    });

    test('disconnect', () => {
        const { getByTestId } = render(<DisconnectButton navigation={navigation} text={''} />);

        const disconnectButton = getByTestId('disconnectButton');

        fireEvent.press(disconnectButton);

        expect(AsyncStorage.clear).toHaveBeenCalledTimes(1);
    });
});