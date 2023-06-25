import React from "react";
import { Alert, SafeAreaView, ScrollView, View, Image, TextInput, Text } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_BASE_URL } from "@env";

import axios from "axios";
import Cookies from 'universal-cookie';
import HidePasswordButton from "../components/HidePasswordButton";
import OAuthButton from "../components/OAuthButton";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";

import { login } from "../../styles/styles";

function Login({ navigation }) {
    const { t, i18n } = useTranslation();
    const cookies = new Cookies();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);

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
        console.log("Connect with Google");
    }

    function connectWithFacebook() {
        console.log("Connect with Facebook");
    }

    function handleSubmit() {
        if (email && password) {
            axios.post(REACT_APP_BASE_URL + '/user/login', {
                email: email,
                password: password
            }
            ).then(function (response) {
                if (response.status === 200) {
                    cookies.set('loginToken', { loginToken: response.data.jwt, email: email }, {
                        path: '/',
                        secure: true,
                        sameSite: 'none'
                    });
                    console.log(cookies.get('loginToken'));
                    // navigation.navigate('Home');
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
                Alert.alert(
                    t('login.error.title'),
                    error.message,
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

    return (
        <SafeAreaView style={login.container}>
            <View style={login.center}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={login.logo}
                />
            </View>
            <ScrollView style={login.scrollview}>
                <View style={login.form}>
                    <Text style={login.title} >{t('login.title')}</Text>
                    <TextInput
                        style={login.input}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Email"
                        inputMode="email"
                    />
                    <View style={login.passwordContainer} >
                        <TextInput
                            style={login.passwordContainer.input}
                            onChangeText={handlePasswordChange}
                            value={password}
                            secureTextEntry={hidePassword}
                            placeholder={t('login.password')}
                        />
                        <HidePasswordButton
                            icon={hidePassword ? 'hide_password' : 'show_password'}
                            onPress={() => setHidePassword(!hidePassword)}
                        />
                    </View>
                    <LongHorizontalButton
                        title={t('login.button')}
                        onPress={handleSubmit}
                        styleButton={login.button}
                        styleText={login.button.text}
                    />
                    <LongHorizontalButton
                        title={t('login.forgot')}
                        onPress={redirectToForgotPassword}
                        styleButton={login.forgotButton}
                        styleText={login.forgotButton.text}
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
                    />
                    <OAuthButton
                        title={t('login.facebook')}
                        onPress={connectWithFacebook}
                        source={require('../../assets/images/facebook-logo.png')}
                        styleButton={login.facebookButton}
                        styleImage={login.facebookButton.image}
                        styleText={login.facebookButton.text}
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
                    />
                </View>
                <View style={login.center}>
                    <Picker
                        selectedValue={i18n.language}
                        style={login.picker}
                        onValueChange={changeLanguage}
                    >
                        <Picker.Item label="English" value="en" />
                        <Picker.Item label="Français" value="fr" />
                    </Picker>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default Login;