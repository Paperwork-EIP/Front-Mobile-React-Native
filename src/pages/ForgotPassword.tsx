import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, Image, TextInput, Text, TouchableOpacity } from "react-native";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";
import axios from "axios";

import { forgotPassword } from "../../styles/pages/forgotPassword";

function ForgotPassword({ navigation, route }: { navigation: any, route: any }) {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const colorMode = route.params.colorMode;

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    function redirectToLogin() {
        navigation.navigate('Login');
    }

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(t("Invalid email address"));
            return;
        }

        try {
        await axios.get(process.env.EXPO_PUBLIC_BASE_URL + '/user/sendResetPasswordEmail', { params: { email: email } });
            //toast t('login.emailSent');
            console.log("email sent");
        } catch (error) {
            //toast t('login.emailFail');
            console.error(error);
        }
    };

    return (
        <View style={colorMode === 'light' ? forgotPassword.container : forgotPassword.containerDark}>
            <View style={forgotPassword.formContainer}>
            <Image source={require('../../assets/images/forgotPassword/ResetPassword-bro.png')} style={forgotPassword.Image} />
                <Text style={colorMode === 'light' ? forgotPassword.title : forgotPassword.titleDark} >{t('forgotPassword.title')}</Text>
                    <TextInput
                        style={colorMode === 'light' ? forgotPassword.input : forgotPassword.inputDark}
                        placeholderTextColor={colorMode === 'light' ? forgotPassword.placeholder.color : forgotPassword.placeholderDark.color}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder={t('forgotPassword.placeholder')}
                        inputMode="text"
                        testID="emailInput"
                    />
                {error ? <Text style={forgotPassword.errorText}>{error}</Text> : null}
                {success ? <Text style={forgotPassword.successText}>{success}</Text> : null}
                <LongHorizontalButton
                    title={t('forgotPassword.submit')}
                    onPress={handleSubmit}
                    styleButton={forgotPassword.button}
                    styleText={forgotPassword.button.text}
                    testID="forgotPasswordButton"
                />
            </View>
            <View style={forgotPassword.center}>
                <ClickTextButtonWithDescription
                    title={t("forgotPassword.back")}
                    onPress={redirectToLogin}
                    styleButton={forgotPassword.bottom.returnToLogin}
                    styleTitle={colorMode === 'light' ? forgotPassword.bottom.returnToLogin.text as StyleProp<ViewStyle> : forgotPassword.bottom.returnToLogin.textDark as StyleProp<ViewStyle>}
                    styleDescriptionText={forgotPassword.bottom.returnToLogin.forgotPassword}
                    testID="returnToLoginButton"
                />
            </View>
        </View>
    );
}

export default ForgotPassword;
