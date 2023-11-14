// ForgotPassword.tsx

import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { View, TextInput, Text, TouchableOpacity } from "react-native";
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
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError(t("Invalid email address"));
            return;
        }

        // Send a request to the server for password recovery
        try {
            const response = await axios.post("/api/forgot-password", { email });
            setSuccess(response.data.message);
            setError("");
        } catch (error) {
            setError(error.response.data.message);
            setSuccess("");
        }
    };

    return (
        <View style={colorMode === 'light' ? forgotPassword.container : forgotPassword.containerDark}>
            <View style={forgotPassword.formContainer}>
                <Text style={forgotPassword.title}>{t("Forgot Password(FAIRE IMAGE + LA GESTION MAIL + PAGE DE NEO MDP + GESTION + TU)")}</Text>
                <TextInput
                    style={forgotPassword.input}
                    placeholder={t("Enter your email(TMP)")}
                    value={email}
                    onChangeText={handleEmailChange}
                />
                {error ? <Text style={forgotPassword.errorText}>{error}</Text> : null}
                {success ? <Text style={forgotPassword.successText}>{success}</Text> : null}
                <LongHorizontalButton
                    title={"SOUMETTRE(TMP)"}
                    onPress={handleSubmit}
                    styleButton={forgotPassword.button}
                    styleText={forgotPassword.button.text}
                    testID="forgotPasswordButton"
                />
            </View>
            <View style={forgotPassword.center}>
                <ClickTextButtonWithDescription
                    title={t("Retour(TMP)")}
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
