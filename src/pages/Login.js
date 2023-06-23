import React from "react";
import { Alert, SafeAreaView, ScrollView, View, Image, TextInput, Text, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_BASE_URL } from "@env";

import axios from "axios";
import Cookies from 'universal-cookie';

import { login } from "../../styles/styles";

function Login({ navigation }) {
    const { t, i18n } = useTranslation();
    const cookies = new Cookies();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function changeLanguage(language) {
        i18n.changeLanguage(language);
    };

    function handleEmailChange(text) {
        setEmail(text);
    }

    function handlePasswordChange(text) {
        setPassword(text);
    }

    function handleSubmit() {
        if (email && password) {
            axios.post(REACT_APP_BASE_URL + '/user/login', {
                email: email,
                password: password
            }
            ).then(function (response) {
                cookies.set('loginToken', { loginToken: response.data.jwt, email: email }, {
                    path: '/',
                    secure: true,
                    sameSite: 'none'
                });
                console.log(cookies.get('loginToken'));
                navigation.navigate('Home');
            }
            ).catch(function (error) {
                Alert.alert(
                    error,
                    [
                        { text: t('login.error.button') }
                    ]
                );
                console.log(error);
            });
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

    function LoginButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={login.button}
                onPress={onPress}>
                <Text style={login.button.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function ForgotPasswordButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={login.forgotButton}
                onPress={onPress}>
                <Text style={login.forgotButton.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function GoogleButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={login.googleButton}
                onPress={onPress}>
                <Image source={require('../../assets/images/google-logo.png')} style={login.googleButton.image} />
                <Text style={login.googleButton.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function FacebookButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={login.facebookButton}
                onPress={onPress}>
                <Image source={require('../../assets/images/facebook-logo.png')} style={login.facebookButton.image} />
                <Text style={login.facebookButton.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function NoAccountButton({ onPress, title, registerText }) {
        return (
            <TouchableOpacity
                style={login.noAccountButton}
                onPress={onPress}>
                <Text style={login.noAccountButton.text}>{title}</Text>
                <Text style={login.noAccountButton.register}>{registerText}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={login.container}>
            <ScrollView style={login.scrollview}>
                <View style={login.center}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={login.logo}
                    />
                </View>
                <View style={login.form}>
                    <Text style={login.title} >{t('login.title')}</Text>
                    <TextInput
                        style={login.input}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Email"
                    />
                    <TextInput
                        style={login.input}
                        onChangeText={handlePasswordChange}
                        value={password}
                        placeholder="*******************"
                    />
                    <LoginButton
                        title={t('login.button')}
                        onPress={handleSubmit}
                    />
                    <ForgotPasswordButton
                        title={t('login.forgot')}
                        onPress={handleSubmit}
                    />
                </View>
                <View style={login.buttons}>
                    <GoogleButton
                        title={t('login.google')}
                        onPress={handleSubmit}
                    />
                    <FacebookButton
                        title={t('login.facebook')}
                        onPress={handleSubmit}
                    />
                </View>
                <View style={login.center}>
                    <NoAccountButton
                        title={t('login.noAccount')}
                        registerText={t('login.register')}
                        onPress={handleSubmit}
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