import 'react-native';

import React from 'react';
import renderer from 'react-test-renderer';

import i18n from '../../src/i18n/i18n';
import Login from '../../src/pages/Login';

jest.mock('axios');
jest.mock('universal-cookie');

beforeAll(() => {
    i18n.init();
});

describe('Login', () => {
    it('renders correctly', () => {
        renderer.create(<Login />);
    });
});
