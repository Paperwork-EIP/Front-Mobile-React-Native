import React from "react";
import { View, Text, Button } from "react-native";
import { useTranslation } from 'react-i18next';

import { login } from "../../styles/styles";

function Login({ navigation }) {
    const { t, i18n } = useTranslation();

    return (
        <View style={login.container}>
            <Text>Login</Text>
            <Button
                title={t('login:register')}
                onPress={
                    () => navigation.navigate('Register')
                }
            />
        </View>
    );
};

export default Login;