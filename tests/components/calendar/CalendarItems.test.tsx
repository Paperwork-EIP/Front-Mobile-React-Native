import React from 'react';
import { render } from '@testing-library/react-native';
import CalendarItems from '../../../src/components/calendar/CalendarItems';

describe('CalendarItems', () => {
    const mockItem = {
        title: 'Sample Title',
        color: 'blue'
    };

    test('renders correctly', () => {
        const mockPressCard = jest.fn();
        const mockPressButton = jest.fn();
        const colorMode = 'light';

        const { getByText } = render(
            <CalendarItems
                item={mockItem}
                colorMode={colorMode}
                onPressCard={mockPressCard}
                onPressButton={mockPressButton}
            />
        );

        expect(getByText('Sample Title')).toBeTruthy();
    });
});
