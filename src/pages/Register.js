import React from "react";
import { Alert, SafeAreaView, ScrollView, View, Image, TextInput, Text, TouchableOpacity, Switch } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_BASE_URL } from "@env";

import axios from "axios";

import { register } from "../../styles/styles";

function Register({ navigation }) {
    const { t, i18n } = useTranslation();

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = React.useState(true);

    function changeLanguage(language) {
        i18n.changeLanguage(language);
    };

    function redirectToLogin() {
        navigation.navigate('Login');
    }

    function handleUsernameChange(text) {
        setUsername(text);
    }

    function handleEmailChange(text) {
        setEmail(text);
    }

    function handlePasswordChange(text) {
        setPassword(text);
    }

    function handleConfirmPasswordChange(text) {
        setConfirmPassword(text);
    }

    function connectWithGoogle() {
        console.log("Connect with Google");
    }

    function connectWithFacebook() {
        console.log("Connect with Facebook");
    }

    function handleSubmit() {
        if (email && password && confirmPassword && password === confirmPassword && username) {
            axios.post(REACT_APP_BASE_URL + '/user/register', {
                username: username,
                email: email,
                password: password
            }
            ).then(function (response) {
                if (response.status === 200) {
                    console.log("Register successful");
                    // navigation.navigate('Home');
                }
                else {
                    Alert.alert(
                        t('register.error.title'),
                        t('register.error.somethingWrong'),
                        [
                            { text: t('register.error.button') }
                        ]
                    );
                }
            }
            ).catch(function (error) {
                if (error.response.status === 409) {
                    Alert.alert(
                        t('register.error.title'),
                        t('register.error.accountAlreadyExists'),
                        [
                            { text: t('register.error.button') }
                        ]
                    );
                }
                else {
                    Alert.alert(
                        t('register.error.title'),
                        error.message,
                        [
                            { text: t('register.error.button') }
                        ]
                    );
                }
            });

        } else {
            Alert.alert(
                t('register.error.title'),
                t('register.error.empty'),
                [
                    { text: t('register.error.button') }
                ]
            );
        }
    }

    function RegisterButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={register.button}
                onPress={onPress}>
                <Text style={register.button.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function HidePasswordButton({ onPress, icon }) {
        return (
            <TouchableOpacity
                style={register.passwordContainer.hidePasswordButton}
                onPress={onPress}>
                <Image source={icon === 'show_password' ? require('../../assets/images/show_password.png') : require('../../assets/images/hide_password.png')} style={register.passwordContainer.hidePasswordButton.image} />
            </TouchableOpacity>
        );
    }

    function GoogleButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={register.googleButton}
                onPress={onPress}>
                <Image source={require('../../assets/images/google-logo.png')} style={register.googleButton.image} />
                <Text style={register.googleButton.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function FacebookButton({ onPress, title }) {
        return (
            <TouchableOpacity
                style={register.facebookButton}
                onPress={onPress}>
                <Image source={require('../../assets/images/facebook-logo.png')} style={register.facebookButton.image} />
                <Text style={register.facebookButton.text}>{title}</Text>
            </TouchableOpacity>
        );
    }

    function NoAccountButton({ onPress, title, registerText }) {
        return (
            <TouchableOpacity
                style={register.noAccountButton}
                onPress={onPress}>
                <Text style={register.noAccountButton.text}>{title}</Text>
                <Text style={register.noAccountButton.register}>{registerText}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={register.container}>
            <View style={register.center}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={register.logo}
                />
            </View>
            <ScrollView style={register.scrollview}>
                <View style={register.form}>
                    <Text style={register.title} >{t('register.title')}</Text>
                    <TextInput
                        style={register.input}
                        onChangeText={handleUsernameChange}
                        value={username}
                        placeholder={t('register.username')}
                        inputMode="text"
                    />
                    <TextInput
                        style={register.input}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Email"
                        inputMode="email"
                    />
                    <View style={register.passwordContainer} >
                        <TextInput
                            style={register.passwordContainer.input}
                            onChangeText={handlePasswordChange}
                            value={password}
                            secureTextEntry={hidePassword}
                            placeholder={t('register.password')}
                        />
                        <HidePasswordButton
                            icon={hidePassword ? 'hide_password' : 'show_password'}
                            onPress={() => setHidePassword(!hidePassword)}
                        />
                    </View>
                    <View style={register.passwordContainer} >
                        <TextInput
                            style={register.passwordContainer.input}
                            onChangeText={handleConfirmPasswordChange}
                            value={confirmPassword}
                            secureTextEntry={hideConfirmPassword}
                            placeholder={t('register.confirm')}
                        />
                        <HidePasswordButton
                            icon={hideConfirmPassword ? 'hide_password' : 'show_password'}
                            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                        />
                    </View>
                    <RegisterButton
                        title={t('register.button')}
                        onPress={handleSubmit}
                    />
                </View>
                <View style={register.buttons}>
                    <GoogleButton
                        title={t('register.google')}
                        onPress={connectWithGoogle}
                    />
                    <FacebookButton
                        title={t('register.facebook')}
                        onPress={connectWithFacebook}
                    />
                </View>
                <View style={register.center}>
                    <NoAccountButton
                        title={t('register.alreadyHaveAccount')}
                        registerText={t('register.login')}
                        onPress={redirectToLogin}
                    />
                </View>
                <View style={register.center}>
                    <Picker
                        selectedValue={i18n.language}
                        style={register.picker}
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

export default Register;