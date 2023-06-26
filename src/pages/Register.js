import React from "react";
import SafeAreaView from 'react-native-safe-area-view';
import { Alert, ScrollView, View, Image, TextInput, Text } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import { REACT_APP_BASE_URL } from "@env";

import axios from "axios";
import HidePasswordButton from "../components/HidePasswordButton";
import OAuthButton from "../components/OAuthButton";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";

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
                        testID="usernameInput"
                    />
                    <TextInput
                        style={register.input}
                        onChangeText={handleEmailChange}
                        value={email}
                        placeholder="Email"
                        inputMode="email"
                        testID="emailInput"
                    />
                    <View style={register.passwordContainer} >
                        <TextInput
                            style={register.passwordContainer.input}
                            onChangeText={handlePasswordChange}
                            value={password}
                            secureTextEntry={hidePassword}
                            placeholder={t('register.password')}
                            testID="passwordInput"
                        />
                        <HidePasswordButton
                            icon={hidePassword ? 'hide_password' : 'show_password'}
                            onPress={() => setHidePassword(!hidePassword)}
                            testID="hidePasswordButton"
                        />
                    </View>
                    <View style={register.passwordContainer} >
                        <TextInput
                            style={register.passwordContainer.input}
                            onChangeText={handleConfirmPasswordChange}
                            value={confirmPassword}
                            secureTextEntry={hideConfirmPassword}
                            placeholder={t('register.confirm')}
                            testID="confirmPasswordInput"
                        />
                        <HidePasswordButton
                            icon={hideConfirmPassword ? 'hide_password' : 'show_password'}
                            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                            testID="hideConfirmPasswordButton"
                        />
                    </View>
                    <LongHorizontalButton
                        title={t('register.button')}
                        onPress={handleSubmit}
                        styleButton={register.button}
                        styleText={register.button.text}
                        testID="registerButton"
                    />
                </View>
                <View style={register.buttons}>
                    <OAuthButton
                        title={t('register.google')}
                        onPress={connectWithGoogle}
                        source={require('../../assets/images/google-logo.png')}
                        styleButton={register.googleButton}
                        styleImage={register.googleButton.image}
                        styleText={register.googleButton.text}
                        testID="googleButton"
                    />
                    <OAuthButton
                        title={t('register.facebook')}
                        onPress={connectWithFacebook}
                        source={require('../../assets/images/facebook-logo.png')}
                        styleButton={register.facebookButton}
                        styleImage={register.facebookButton.image}
                        styleText={register.facebookButton.text}
                        testID="facebookButton"
                    />
                </View>
                <View style={register.center}>
                    <ClickTextButtonWithDescription
                        title={t('register.alreadyHaveAccount')}
                        descriptionText={t('register.login')}
                        onPress={redirectToLogin}
                        styleButton={register.noAccountButton}
                        styleTitle={register.noAccountButton.text}
                        styleDescriptionText={register.noAccountButton.register}
                        testID="alreadyHaveAccountButton"
                    />
                </View>
                <View style={register.center}>
                    <Picker
                        selectedValue={i18n.language}
                        style={register.picker}
                        onValueChange={changeLanguage}
                        testID="languagePicker"
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