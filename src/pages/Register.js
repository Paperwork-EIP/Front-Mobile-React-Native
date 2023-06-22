import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import { register } from '../../styles/styles';

function Register({ navigation }) {
    const { t, i18n } = useTranslation();

    return (
        <View style={register.container}>
            <Text>Register</Text>
            <Button
                title={t('register:login')}
                onPress={
                    () => navigation.navigate('Login')
                }
            />
        </View>
    )
};

export default Register;