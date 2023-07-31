import React, { useEffect } from "react";
import { Alert, View, Image, TextInput, Text } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_BASE_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HidePasswordButton from "../components/HidePasswordButton";
import OAuthButton from "../components/OAuthButton";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";

import { login } from "../../styles/pages/login";

function Login({ navigation }) {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);
    const [token, setToken] = React.useState('');

    function changeLanguage(language) {
        i18n.changeLanguage(language);
    };

    function redirectToRegister() {
        navigation.navigate('Register');
    }

    function redirectToForgotPassword() {
        navigation.navigate('ForgotPassword');
    }

    function handleEmailChange(text) {
        setEmail(text);
    }

    function handlePasswordChange(text) {
        setPassword(text);
    }

    function connectWithGoogle() {
        axios.get(`${REACT_APP_BASE_URL}/oauth/google/urlLogin`).then(res => {
            console.log(res.data);
        })
    }

    function connectWithFacebook() {
        axios.get(`${REACT_APP_BASE_URL}/oauth/facebook/url`).then(res => {
            console.log(res.data);
        })
    }

    function redirectToConnectedPage() {
        navigation.navigate('Calendar');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Calendar' }],
        });
    }

    async function getToken() {
        try {
            let loginToken = await AsyncStorage.getItem('loginToken');
            if (loginToken) {
                setToken(loginToken);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function storeToken(token) {
        try {
            await AsyncStorage.setItem('loginToken', token);
            redirectToConnectedPage();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit() {
        if (email && password) {
            axios.post(REACT_APP_BASE_URL + '/user/login', {
                email: email,
                password: password
            }
            ).then(async function (response) {
                if (response.status === 200) {
                    await storeToken(response.data.jwt);
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
        getToken();
        console.log("token = " + token);
        if (token) {
            redirectToConnectedPage();
        }
    });

    return (
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
                            style={login.passwordContainer.input}
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
                <View style={login.buttons}>
                    <OAuthButton
                        title={t('login.google')}
                        onPress={connectWithGoogle}
                        source={require('../../assets/images/google-logo.png')}
                        styleButton={login.googleButton}
                        styleImage={login.googleButton.image}
                        styleText={login.googleButton.text}
                        testID="googleButton"
                    />
                    <OAuthButton
                        title={t('login.facebook')}
                        onPress={connectWithFacebook}
                        source={require('../../assets/images/facebook-logo.png')}
                        styleButton={login.facebookButton}
                        styleImage={login.facebookButton.image}
                        styleText={login.facebookButton.text}
                        testID="facebookButton"
                    />
                </View>
                <View style={login.center}>
                    <ClickTextButtonWithDescription
                        title={t('login.noAccount')}
                        descriptionText={t('login.register')}
                        onPress={redirectToRegister}
                        styleButton={login.noAccountButton}
                        styleTitle={login.noAccountButton.text}
                        styleDescriptionText={login.noAccountButton.register}
                        testID="registerButton"
                    />
                </View>
                <View style={login.center}>
                    <Picker
                        selectedValue={i18n.language}
                        style={login.picker}
                        onValueChange={changeLanguage}
                        testID="languagePicker"
                    >
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Français" value="fr" />
                    </Picker>
                </View>
            </View>
        </View >
    );
};

export default Login;