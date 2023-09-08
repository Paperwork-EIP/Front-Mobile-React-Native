import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../../src/i18n/i18n';
import Login from '../../src/pages/Login';

jest.mock('axios');
jest.mock('@react-navigation/native', () => { });
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('expo-auth-session/providers/facebook', () => {
    return {
        useAuthRequest: jest.fn()
    }
});
jest.mock('expo-auth-session/providers/google', () => {
    return {
        useAuthRequest: jest.fn()
    }
});
jest.mock('expo-auth-session', () => {
    return {
        makeRedirectUri: jest.fn(),
        startAsync: jest.fn(),
        makeAuthUrl: jest.fn(),
    };
});

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

describe('Login', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    it('renders correctly', () => {
        render(<Login navigation={navigation} />);
    });

    it('submit login form and get 200 status code', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submitButton = getByTestId('loginButton');

        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(submitButton);

        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('submit login form and and get not 200 status code', () => {
        axios.post = jest.fn().mockResolvedValue({
            response: {
                status: 400,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Login navigation={navigation} />);

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submitButton = getByTestId('loginButton');

        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(submitButton);

        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('submit login form and get an error', () => {
        axios.post = jest.fn().mockRejectedValue({
            response: {
                status: 500,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Login navigation={navigation} />);

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submitButton = getByTestId('loginButton');

        fireEvent.changeText(emailInput, 'test@test.test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(submitButton);

        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should not submit login form if all input are not filled', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submitButton = getByTestId('loginButton');

        fireEvent.changeText(emailInput, '');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(submitButton);

        expect(emailInput.props.value).toBe('');
        expect(passwordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(0);
    });

    it('should press on google button', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const button = getByTestId('googleButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on facebook button', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const button = getByTestId('facebookButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on register button', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const button = getByTestId('registerButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on forgot password button', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const button = getByTestId('forgotPasswordButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on hide password button', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const button = getByTestId('hidePasswordButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on language picker', () => {
        const { getByTestId } = render(<Login navigation={navigation} />);

        const picker = getByTestId('languagePicker');

        fireEvent.press(picker);
        fireEvent(picker, 'onValueChange', 'en');

        expect(picker).toBeTruthy();
        expect(i18n.language).toBe('en');
    });

    it('should not store token', () => {
        AsyncStorage.setItem = jest.fn().mockRejectedValueOnce({
            response: {
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Login navigation={navigation} />);

        const emailInput = getByTestId('emailInput');
        const passwordInput = getByTestId('passwordInput');
        const submitButton = getByTestId('loginButton');

        fireEvent.changeText(emailInput, 'test');
        fireEvent.changeText(passwordInput, 'password');
        fireEvent.press(submitButton);

        expect(emailInput.props.value).toBe('test');
        expect(passwordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should not get token', () => {
        AsyncStorage.getItem = jest.fn().mockRejectedValueOnce({
            response: {
                data: {
                    message: 'error'
                }
            }
        });

        render(<Login navigation={navigation} />);

        expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    });
});
