import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import { register } from '../../styles/styles';

function Register({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const { t, i18n } = useTranslation();

    return (
        <View style={register.container}>
            
        </View>
    )
};

export default Register;