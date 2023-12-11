import React, { useState } from "react";
import { Alert, View, Image, TextInput, Text, StyleProp, ViewStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HidePasswordButton from "../components/HidePasswordButton"
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";
import LoadingComponent from "../components/LoadingComponent";

import GoogleAuthButton from "../services/Google";

import { register } from "../../styles/pages/register";

function Register({ navigation, route }: { navigation: any, route: any }) {
    const { t, i18n } = useTranslation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const colorMode = route.params.colorMode;

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    function redirectToLogin() {
        navigation.navigate('Login');
    }

    function redirectToConnectedPage() {
        setIsLoading(false);
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
            setIsLoading(true);
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
                    setIsLoading(false);
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
                setIsLoading(false);
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
        <>
            {
                isLoading ?
                    <LoadingComponent />
                    :
                    <View style={colorMode === 'light' ? register.container : register.containerDark}>
                        <View style={register.center}>
                            <Image
                                source={require('../../assets/logo.png')}
                                style={register.logo}
                            />
                        </View>
                        <View style={register.content}>
                            <View style={register.form}>
                                <Text style={colorMode === 'light' ? register.title : register.titleDark} >{t('register.title')}</Text>
                                <TextInput
                                    style={colorMode === 'light' ? register.input : register.inputDark}
                                    placeholderTextColor={colorMode === 'light' ? register.placeholder.color : register.placeholderDark.color}
                                    onChangeText={handleUsernameChange}
                                    value={username}
                                    placeholder={t('register.username')}
                                    inputMode="text"
                                    testID="usernameInput"
                                />
                                <TextInput
                                    style={colorMode === 'light' ? register.input : register.inputDark}
                                    placeholderTextColor={colorMode === 'light' ? register.placeholder.color : register.placeholderDark.color}
                                    onChangeText={handleEmailChange}
                                    value={email}
                                    placeholder="Email"
                                    inputMode="email"
                                    testID="emailInput"
                                />
                                <View style={colorMode === 'light' ? register.passwordContainer : register.passwordContainerDark}>
                                    <TextInput
                                        style={colorMode === 'light' ? register.passwordContainer.input as StyleProp<ViewStyle> : register.passwordContainerDark.input as StyleProp<ViewStyle>}
                                        onChangeText={handlePasswordChange}
                                        value={password}
                                        secureTextEntry={hidePassword}
                                        placeholder={t('register.password')}
                                        placeholderTextColor={colorMode === 'light' ? register.placeholder.color : register.placeholderDark.color}
                                        testID="passwordInput"
                                    />
                                    <HidePasswordButton
                                        dark={colorMode === 'dark' ? true : false}
                                        icon={hidePassword ? 'hide_password' : 'show_password'}
                                        onPress={() => setHidePassword(!hidePassword)}
                                        testID="hidePasswordButton"
                                    />
                                </View>
                                <View style={colorMode === 'light' ? register.passwordContainer : register.passwordContainerDark}>
                                    <TextInput
                                        style={colorMode === 'light' ? register.passwordContainer.input as StyleProp<ViewStyle> : register.passwordContainerDark.input as StyleProp<ViewStyle>}
                                        onChangeText={handleConfirmPasswordChange}
                                        value={confirmPassword}
                                        secureTextEntry={hideConfirmPassword}
                                        placeholder={t('register.confirm')}
                                        placeholderTextColor={colorMode === 'light' ? register.placeholder.color : register.placeholderDark.color}
                                        testID="confirmPasswordInput"
                                    />
                                    <HidePasswordButton
                                        dark={colorMode === 'dark' ? true : false}
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
                                </View>
                                <View style={register.center}>
                                    <ClickTextButtonWithDescription
                                        title={t('register.alreadyHaveAccount')}
                                        descriptionText={t('register.login')}
                                        onPress={redirectToLogin}
                                        styleButton={register.bottom.alreadyHaveAccount}
                                        styleTitle={colorMode === 'light' ? register.bottom.alreadyHaveAccount.text as StyleProp<ViewStyle> : register.bottom.alreadyHaveAccount.textDark as StyleProp<ViewStyle>}
                                        styleDescriptionText={register.bottom.alreadyHaveAccount.register}
                                        testID="alreadyHaveAccountButton"
                                    />
                                </View>
                                <View style={register.center}>
                                    <Picker
                                        selectedValue={i18n.language}
                                        onValueChange={changeLanguage}
                                        testID="languagePicker"
                                        mode="dropdown"
                                        dropdownIconColor={colorMode === 'light' ? register.bottom.picker.color : register.bottom.pickerDark.color}
                                        style={colorMode === 'light' ? register.bottom.picker as StyleProp<ViewStyle> : register.bottom.pickerDark as StyleProp<ViewStyle>}
                                    >
                                        <Picker.Item label="English" value="en" />
                                        <Picker.Item label="Français" value="fr" />
                                        <Picker.Item label="Español" value="es" />
                                        <Picker.Item label="Deutsche" value="de" />
                                        <Picker.Item label="bahasa Indonesia" value="id" />
                                        <Picker.Item label="한국인" value="ko" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View >
            }
        </>
    );
};

export default Register;