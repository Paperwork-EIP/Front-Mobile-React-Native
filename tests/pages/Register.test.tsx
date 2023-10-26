import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import axios from 'axios';

import i18n from '../../src/i18n/i18n';
import Register from '../../src/pages/Register';

jest.mock('../../src/services/Google', () => ({
    __esModule: true,
    default: () => {
        return <></>;
    },
}));

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

describe('Register', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };
    const route = { params: { colorMode: 'light' } };

    test('renders correctly', () => {
        render(<Register navigation={navigation} route={route} />);
    });

    test('submit register form and get 200 status code', () => {
        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const usernameInput = getByTestId('usernameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const confirmPasswordInput = getByTestId('confirmPasswordInput');
        const submitButton = getByTestId('registerButton');

        fireEvent.changeText(usernameInput, 'test');
        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPasswordInput, 'password');
        fireEvent.press(submitButton);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('submit register form and get not 200 status code', () => {
        axios.post = jest.fn().mockResolvedValue({
            response: {
                status: 400,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const usernameInput = getByTestId('usernameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const confirmPasswordInput = getByTestId('confirmPasswordInput');
        const submitButton = getByTestId('registerButton');

        fireEvent.changeText(usernameInput, 'test');
        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPasswordInput, 'password');
        fireEvent.press(submitButton);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('submit register form and get a 409 status code', () => {
        axios.post = jest.fn().mockRejectedValue({
            response: {
                status: 409,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const usernameInput = getByTestId('usernameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const confirmPasswordInput = getByTestId('confirmPasswordInput');
        const submitButton = getByTestId('registerButton');

        fireEvent.changeText(usernameInput, 'test');
        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPasswordInput, 'password');
        fireEvent.press(submitButton);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('submit register form and get an error', () => {
        axios.post = jest.fn().mockRejectedValue({
            response: {
                status: 500,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const usernameInput = getByTestId('usernameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const confirmPasswordInput = getByTestId('confirmPasswordInput');
        const submitButton = getByTestId('registerButton');

        fireEvent.changeText(usernameInput, 'test');
        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPasswordInput, 'password');
        fireEvent.press(submitButton);

        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    test('should not submit Register form if all input are not filled', () => {
        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const usernameInput = getByTestId('usernameInput');
        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const confirmPasswordInput = getByTestId('confirmPasswordInput');
        const submitButton = getByTestId('registerButton');

        fireEvent.changeText(usernameInput, '');
        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.changeText(confirmPasswordInput, 'password');
        fireEvent.press(submitButton);

        expect(axios.post).toHaveBeenCalledTimes(0);
    });

    test('should press on login button', () => {
        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const button = getByTestId('alreadyHaveAccountButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    test('should press on hide password button', () => {
        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const button = getByTestId('hidePasswordButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    test('should press on hide confirm password button', () => {
        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const button = getByTestId('hideConfirmPasswordButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    test('should press on language picker', () => {
        const { getByTestId } = render(<Register navigation={navigation} route={route} />);

        const picker = getByTestId('languagePicker');

        fireEvent.press(picker);
        fireEvent(picker, 'onValueChange', 'en');

        expect(picker).toBeTruthy();
        expect(i18n.language).toBe('en');
    });
});
