import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';
import axios from 'axios';

import i18n from '../../src/i18n/i18n';
import Register from '../../src/pages/Register';

jest.mock('axios');
jest.mock('universal-cookie');
jest.mock('@react-navigation/native', () => { });

beforeEach(() => {
    i18n.init();
    navigate = jest.fn();

    axios.post.mockResolvedValueOnce({
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
    const navigation = { navigate: jest.fn() };

    it('renders correctly', () => {
        render(<Register navigation={navigation} />);
    });

    it('submit register form and get 200 status code', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

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

        expect(usernameInput.props.value).toBe('test');
        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(confirmPasswordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('submit register form and get not 200 status code', () => {
        axios.post = jest.fn().mockResolvedValue({
            response: {
                status: 400,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Register navigation={navigation} />);

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

        expect(usernameInput.props.value).toBe('test');
        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(confirmPasswordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('submit register form and get a 409 status code', () => {
        axios.post = jest.fn().mockRejectedValue({
            response: {
                status: 409,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Register navigation={navigation} />);

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

        expect(usernameInput.props.value).toBe('test');
        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(confirmPasswordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('submit register form and get an error', () => {
        axios.post = jest.fn().mockRejectedValue({
            response: {
                status: 500,
                data: {
                    message: 'error'
                }
            }
        });

        const { getByTestId } = render(<Register navigation={navigation} />);

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

        expect(usernameInput.props.value).toBe('test');
        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(confirmPasswordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should not submit Register form if all input are not filled', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

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

        expect(usernameInput.props.value).toBe('');
        expect(emailInput.props.value).toBe('test@test.test');
        expect(passwordInput.props.value).toBe('password');
        expect(confirmPasswordInput.props.value).toBe('password');
        expect(axios.post).toHaveBeenCalledTimes(0);
    });

    it('should press on google button', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

        const button = getByTestId('googleButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on facebook button', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

        const button = getByTestId('facebookButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on login button', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

        const button = getByTestId('alreadyHaveAccountButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on hide password button', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

        const button = getByTestId('hidePasswordButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on hide confirm password button', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

        const button = getByTestId('hideConfirmPasswordButton');

        fireEvent.press(button);

        expect(button).toBeTruthy();
    });

    it('should press on language picker', () => {
        const { getByTestId } = render(<Register navigation={navigation} />);

        const picker = getByTestId('languagePicker');

        fireEvent.press(picker);
        fireEvent(picker, 'onValueChange', 'en');

        expect(picker).toBeTruthy();
        expect(i18n.language).toBe('en');
    });
});
