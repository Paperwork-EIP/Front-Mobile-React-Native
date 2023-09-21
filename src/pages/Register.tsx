import React, { useState } from "react";
import { Alert, View, Image, TextInput, Text, StyleProp, ViewStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HidePasswordButton from "../components/HidePasswordButton"
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";

import GoogleAuthButton from "../services/Google";
import FacebookAuthButton from "../services/Facebook";

import { register } from "../../styles/pages/register";

function Register({ navigation }: { navigation: any }) {
    const { t, i18n } = useTranslation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    function redirectToLogin() {
        navigation.navigate('Login');
    }

    function redirectToConnectedPage() {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    function handleUsernameChange(text: string) {
        setUsername(text);
    }

    function handleEmailChange(text: string) {
        setEmail(text);
    }

    function handlePasswordChange(text: string) {
        setPassword(text);
    }

    function handleConfirmPasswordChange(text: string) {
        setConfirmPassword(text);
    }

    function handleSubmit() {
        if (email && password && confirmPassword && password === confirmPassword && username) {
            axios.post(process.env.EXPO_PUBLIC_BASE_URL + '/user/register', {
                username: username,
                email: email,
                password: password
            }
            ).then(function (response) {
                if (response.status === 200) {
                    AsyncStorage.setItem('@loginToken', response.data.jwt);
                    redirectToConnectedPage();
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
                        t('register.error.message'),
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
        <View style={register.container}>
            <View style={register.center}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={register.logo}
                />
            </View>
            <View style={register.content}>
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
                            style={register.passwordContainer.input as StyleProp<ViewStyle>}
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
                            style={register.passwordContainer.input as StyleProp<ViewStyle>}
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
                <View style={register.bottom}>
                    <View style={register.bottom.buttons as StyleProp<ViewStyle>}>
                        <GoogleAuthButton navigation={navigation} />
                        <FacebookAuthButton navigation={navigation} />
                    </View>
                    <View style={register.center}>
                        <ClickTextButtonWithDescription
                            title={t('register.alreadyHaveAccount')}
                            descriptionText={t('register.login')}
                            onPress={redirectToLogin}
                            styleButton={register.bottom.alreadyHaveAccount}
                            styleTitle={register.bottom.alreadyHaveAccount.text}
                            styleDescriptionText={register.bottom.alreadyHaveAccount.register}
                            testID="alreadyHaveAccountButton"
                        />
                    </View>
                    <View style={register.center}>
                        <Picker
                            selectedValue={i18n.language}
                            style={register.bottom.picker}
                            onValueChange={changeLanguage}
                            testID="languagePicker"
                        >
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="Français" value="fr" />
                        </Picker>
                    </View>
                </View>
            </View>
        </View >
    );
};

export default Register;