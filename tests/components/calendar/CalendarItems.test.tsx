import React from 'react';
import { render } from '@testing-library/react-native';
import CalendarItems from '../../../src/components/calendar/CalendarItems';

describe('CalendarItems', () => {
    const mockItem = {
        title: 'Sample Title',
        color: 'blue'
    };

    it('renders correctly', () => {
        const mockPressCard = jest.fn();
        const mockPressButton = jest.fn();

        const { getByText } = render(
            <CalendarItems
                item={mockItem}
                onPressCard={mockPressCard}
                onPressButton={mockPressButton}
            />
        );

        expect(getByText('Sample Title')).toBeTruthy();
    });
});
