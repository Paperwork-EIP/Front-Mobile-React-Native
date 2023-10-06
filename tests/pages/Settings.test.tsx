import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../../src/i18n/i18n';
import Settings from '../../src/pages/Settings';

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

describe('Settings', () => {
    const navigation = { navigate: jest.fn(), reset: jest.fn() };

    it('renders correctly', () => {
        render(<Settings navigation={navigation} />);

        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('Verify if everything is rendering', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const darkModeText = getByTestId('darkModeText');
        const darkModeSwitch = getByTestId('darkModeSwitch');
        const disconnectText = getByTestId('disconnectText');
        const disconnectButton = getByTestId('disconnectButton');
        const deleteAccountText = getByTestId('deleteAccountText');
        const deleteAccountButton = getByTestId('deleteAccountButton');
        const versionText = getByTestId('versionText');
        const versionNumber = getByTestId('versionNumber');

        expect(darkModeText).toBeTruthy();
        expect(darkModeSwitch).toBeTruthy();
        expect(disconnectText).toBeTruthy();
        expect(disconnectButton).toBeTruthy();
        expect(deleteAccountText).toBeTruthy();
        expect(deleteAccountButton).toBeTruthy();
        expect(versionText).toBeTruthy();
        expect(versionNumber).toBeTruthy();
    });

    it('Verify if everything in modal is rendering after clicking on delete account button', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const deleteAccountButton = getByTestId('deleteAccountButton');

        fireEvent.press(deleteAccountButton);

        const deleteAccountModal = getByTestId('deleteAccountModal');
        const deleteAccountQuestion = getByTestId('deleteAccountQuestion');
        const modalCancelButton = getByTestId('modalCancelButton');
        const modalCancelText = getByTestId('modalCancelText');
        const modalConfirmButton = getByTestId('modalConfirmButton');
        const modalConfirmText = getByTestId('modalConfirmText');

        expect(deleteAccountModal).toBeTruthy();
        expect(deleteAccountQuestion).toBeTruthy();
        expect(modalCancelButton).toBeTruthy();
        expect(modalCancelText).toBeTruthy();
        expect(modalConfirmButton).toBeTruthy();
        expect(modalConfirmText).toBeTruthy();
    });

    it('Verify if everything is rendering in dark mode', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const darkModeSwitch = getByTestId('darkModeSwitch');

        fireEvent.press(darkModeSwitch);

        const darkModeText = getByTestId('darkModeText');
        const disconnectText = getByTestId('disconnectText');
        const disconnectButton = getByTestId('disconnectButton');
        const deleteAccountText = getByTestId('deleteAccountText');
        const deleteAccountButton = getByTestId('deleteAccountButton');
        const versionText = getByTestId('versionText');
        const versionNumber = getByTestId('versionNumber');

        expect(darkModeText).toBeTruthy();
        expect(darkModeSwitch).toBeTruthy();
        expect(disconnectText).toBeTruthy();
        expect(disconnectButton).toBeTruthy();
        expect(deleteAccountText).toBeTruthy();
        expect(deleteAccountButton).toBeTruthy();
        expect(versionText).toBeTruthy();
        expect(versionNumber).toBeTruthy();
    });

    it('Verify if everything in modal is rendering after clicking on delete account button in dark mode', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const darkModeSwitch = getByTestId('darkModeSwitch');

        fireEvent.press(darkModeSwitch);

        const deleteAccountButton = getByTestId('deleteAccountButton');

        fireEvent.press(deleteAccountButton);

        const deleteAccountModal = getByTestId('deleteAccountModal');
        const deleteAccountQuestion = getByTestId('deleteAccountQuestion');
        const modalCancelButton = getByTestId('modalCancelButton');
        const modalCancelText = getByTestId('modalCancelText');
        const modalConfirmButton = getByTestId('modalConfirmButton');
        const modalConfirmText = getByTestId('modalConfirmText');

        expect(deleteAccountModal).toBeTruthy();
        expect(deleteAccountQuestion).toBeTruthy();
        expect(modalCancelButton).toBeTruthy();
        expect(modalCancelText).toBeTruthy();
        expect(modalConfirmButton).toBeTruthy();
        expect(modalConfirmText).toBeTruthy();
    });

    it('Disconnect when clicking on disconnect button', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const disconnectButton = getByTestId('disconnectButton');

        fireEvent.press(disconnectButton);

        expect(AsyncStorage.clear).toHaveBeenCalledTimes(1);
    });

    it('Delete account modal - Open', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const deleteAccountButton = getByTestId('deleteAccountButton');

        fireEvent.press(deleteAccountButton);

        const deleteAccountModal = getByTestId('deleteAccountModal');

        expect(deleteAccountModal).toBeTruthy();
    });

    it('Delete account modal - Open and Cancel', () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);

        const deleteAccountButton = getByTestId('deleteAccountButton');
        fireEvent.press(deleteAccountButton);
        const deleteAccountModal = getByTestId('deleteAccountModal');
        expect(deleteAccountModal).toBeTruthy();

        const modalCancelButton = getByTestId('modalCancelButton');
        fireEvent.press(modalCancelButton);
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('Toggle dark mode', async () => {
        const { getByTestId } = render(<Settings navigation={navigation} />);
        const darkModeSwitch = getByTestId('darkModeSwitch');

        // Vérifiez que le commutateur est initialement à false (mode clair)
        expect(darkModeSwitch.props.value).toBe(false);

        // Simulez le changement d'état du commutateur
        fireEvent.changeText(darkModeSwitch, 'true');

        // Attendez un bref instant pour que le changement soit pris en compte
        await waitFor(() => {
            // Vérifiez que le commutateur est désormais à true (mode sombre)
            expect(darkModeSwitch.props.value).toBe(true);
        });

        // Simulez à nouveau le changement d'état du commutateur
        fireEvent.changeText(darkModeSwitch, 'false');

        // Attendez un bref instant pour que le changement soit pris en compte
        await waitFor(() => {
            // Vérifiez que le commutateur est désormais à false (mode clair)
            expect(darkModeSwitch.props.value).toBe(false);
        });
    });
});
