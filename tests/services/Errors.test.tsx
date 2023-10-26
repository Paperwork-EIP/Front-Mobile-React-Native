import React from 'react';
import { Alert } from 'react-native';
import AlertErrorSomethingWrong from '../../src/services/Errors';

jest.mock('react-native', () => {
    return {
        Alert: {
            alert: jest.fn()
        }
    };
});

describe('AlertErrorSomethingWrong', () => {
    test('should call Alert.alert with the correct arguments', () => {
        const error = { response: 'Some response' };
        const t = jest.fn();

        AlertErrorSomethingWrong(error, t);

        expect(Alert.alert).toHaveBeenCalled();
    });
});
