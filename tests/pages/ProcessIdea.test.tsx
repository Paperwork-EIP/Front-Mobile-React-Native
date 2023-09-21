import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import axios from 'axios';

import i18n from '../../src/i18n/i18n';
import ProcessIdea from '../../src/pages/ProcessIdea';

beforeEach(() => {
    i18n.init();

    axios.get = jest.fn().mockResolvedValueOnce({
        status: 200,
        data: {
            url: 'url'
        }
    });
    axios.post = jest.fn().mockResolvedValueOnce({
        status: 200,
        data: {
            jwt: 'jwt'
        }
    });
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

describe('ProcessIdea', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    it('renders correctly', () => {
        render(<ProcessIdea navigation={navigation} />);
    });

    it('Button back to home page working correctly', () => {
        const { getByTestId } = render(<ProcessIdea navigation={navigation} />);

        const backHomeBtn = getByTestId('backHomeBtn');

        fireEvent.press(backHomeBtn);

        expect(backHomeBtn).toBeTruthy();
    });

    it('Filling the form working corretly', () => {
        const { getByTestId } = render(<ProcessIdea navigation={navigation} />);

        const titleInput = getByTestId('titleInput');
        const titleHelp = getByTestId('helpTitle');
        const descriptionInput = getByTestId('descriptionInput');
        const descriptionHelp = getByTestId('helpDescription');
        const contentInput = getByTestId('contentInput');
        const contentHelp = getByTestId('helpContent');
        const submitButton = getByTestId('submitButton');

        fireEvent.changeText(titleInput, 'title');
        fireEvent.changeText(descriptionInput, 'description');
        fireEvent.changeText(contentInput, 'content');
        fireEvent.press(submitButton);

        expect(titleInput.props.value).toBe('title');
        expect(titleHelp).toBeTruthy();
        expect(descriptionInput.props.value).toBe('description');
        expect(descriptionHelp).toBeTruthy();
        expect(contentInput.props.value).toBe('content');
        expect(contentHelp).toBeTruthy();
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('Not filling the form working corretly', () => {
        const { getByTestId } = render(<ProcessIdea navigation={navigation} />);

        const titleInput = getByTestId('titleInput');
        const descriptionInput = getByTestId('descriptionInput');
        const contentInput = getByTestId('contentInput');
        const submitButton = getByTestId('submitButton');

        fireEvent.changeText(titleInput, '');
        fireEvent.changeText(descriptionInput, '');
        fireEvent.changeText(contentInput, '');
        fireEvent.press(submitButton);

        const titleError = getByTestId('errorTitle');
        const descriptionError = getByTestId('errorDescription');
        const contentError = getByTestId('errorContent');

        expect(contentError).toBeTruthy();
        expect(descriptionError).toBeTruthy();
        expect(titleError).toBeTruthy();

        expect(titleInput.props.value).toBe('');
        expect(descriptionInput.props.value).toBe('');
        expect(contentInput.props.value).toBe('');
        expect(axios.post).not.toHaveBeenCalled();
    });
});
