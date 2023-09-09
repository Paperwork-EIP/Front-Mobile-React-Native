import React, { useEffect, useState } from "react";
import { Alert, Dimensions, View, Image, TextInput, Text, StyleProp, ViewStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import HidePasswordButton from "../components/HidePasswordButton";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";

import FacebookAuthButton from "../services/Facebook";
import GoogleAuthButton from "../services/Google";
import { getItem, storeItem } from "../services/Token";

import { login } from "../../styles/pages/login";

function Login({ navigation }: { navigation: any }) {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    function redirectToRegister() {
        navigation.navigate('Register');
    }

    function redirectToForgotPassword() {
        navigation.navigate('ForgotPassword');
    }

    function handleEmailChange(text: React.SetStateAction<string>) {
        setEmail(text);
    }

    function handlePasswordChange(text: React.SetStateAction<string>) {
        setPassword(text);
    }

    function redirectToConnectedPage() {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    async function handleSubmit() {
        if (email && password) {
            axios.post(process.env.EXPO_PUBLIC_BASE_URL + '/user/login', {
                email: email,
                password: password
            }
            ).then(async function (response) {
                if (response.status === 200) {
                    await storeItem('loginToken', response.data.jwt);
                    redirectToConnectedPage();
                } else {
                    Alert.alert(
                        t('login.error.title'),
                        t('login.error.message'),
                        [
                            { text: t('login.error.button') }
                        ]
                    );
                }
            }
            ).catch(function (error) {
                console.log(error);
                Alert.alert(
                    t('login.error.title'),
                    t('login.error.message'),
                    [
                        { text: t('login.error.button') }
                    ]
                );
            });

        } else {
            Alert.alert(
                t('login.error.title'),
                t('login.error.empty'),
                [
                    { text: t('login.error.button') }
                ]
            );
        }
    }

    useEffect(() => {
        async function checkToken() {
            const token = await getItem('loginToken');
            if (token) {
                redirectToConnectedPage();
            }
        }
        checkToken();
    });

    return (
        <View>
            <View style={login.container}>
                <View style={login.center}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={login.logo}
                    />
                </View>
                <View style={login.content}>
                    <View style={login.form}>
                        <Text style={login.title} >{t('login.title')}</Text>
                        <TextInput
                            style={login.input}
                            onChangeText={handleEmailChange}
                            value={email}
                            placeholder="Email"
                            inputMode="email"
                            testID="emailInput"
                        />
                        <View style={login.passwordContainer} >
                            <TextInput
                                style={login.passwordContainer.input as StyleProp<ViewStyle>}
                                onChangeText={handlePasswordChange}
                                value={password}
                                secureTextEntry={hidePassword}
                                placeholder={t('login.password')}
                                testID="passwordInput"
                            />
                            <HidePasswordButton
                                icon={hidePassword ? 'hide_password' : 'show_password'}
                                onPress={() => setHidePassword(!hidePassword)}
                                testID="hidePasswordButton"
                            />
                        </View>
                        <LongHorizontalButton
                            title={t('login.button')}
                            onPress={handleSubmit}
                            styleButton={login.button}
                            styleText={login.button.text}
                            testID="loginButton"
                        />
                        <LongHorizontalButton
                            title={t('login.forgot')}
                            onPress={redirectToForgotPassword}
                            styleButton={login.forgotButton}
                            styleText={login.forgotButton.text}
                            testID="forgotPasswordButton"
                        />
                    </View>
                    <View style={login.bottom}>
                        <View style={login.bottom.buttons as StyleProp<ViewStyle>}>
                            <GoogleAuthButton navigation={navigation} />
                            <FacebookAuthButton navigation={navigation} />
                        </View>
                        <View style={login.center}>
                            <ClickTextButtonWithDescription
                                title={t('login.noAccount')}
                                descriptionText={t('login.register')}
                                onPress={redirectToRegister}
                                styleButton={login.bottom.noAccountButton}
                                styleTitle={login.bottom.noAccountButton.text}
                                styleDescriptionText={login.bottom.noAccountButton.register}
                                testID="registerButton"
                            />
                        </View>
                        <View style={login.center}>
                            <Picker
                                selectedValue={i18n.language}
                                style={login.bottom.picker}
                                onValueChange={changeLanguage}
                                testID="languagePicker"
                            >
                                <Picker.Item label="English" value="en" />
                                <Picker.Item label="Français" value="fr" />
                            </Picker>
                        </View>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default Login;