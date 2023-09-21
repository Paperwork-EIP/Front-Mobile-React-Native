import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import OAuthButton from '../../src/components/OAuthButton';

describe('OAuthButton', () => {
    test('renders correctly', () => {
        const onPress = jest.fn();
        const source = require("../../assets/images/google-logo.png");
        const title = 'Button Title';
        const styleButton = {};
        const styleImage = {};
        const styleText = {};

        const { getByText, getByTestId } = render(
            <OAuthButton
                onPress={onPress}
                source={source}
                title={title}
                styleButton={styleButton}
                styleImage={styleImage}
                styleText={styleText}
                testID="testButton"
            />
        );

        const button = getByTestId('testButton');
        const text = getByText(title);

        fireEvent.press(button);

        expect(text).toBeDefined();
        expect(onPress).toHaveBeenCalled();
    });
});
