import React from 'react';
import { cleanup, render } from '@testing-library/react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Calendar from '../../src/screens/Calendar';

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
            appoinment: [
                {
                    date: '2021-09-21T12:00:00.000Z',
                    process_title: 'test process title',
                    stocked_title: 'test stocked title',
                    step_title: 'test step title',
                    step_description: 'test step description',
                    user_process_id: 1
                }
            ]
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('Calendar', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };
    const route = { params: { colorMode: 'light' } };

    test('renders correctly', async () => {
        render(<Calendar navigation={navigation} route={route} />);
    });
});