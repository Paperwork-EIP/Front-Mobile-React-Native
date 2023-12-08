import React, { useEffect, useState } from "react";
import { Alert, View, Image, TextInput, Text, StyleProp, ViewStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import HidePasswordButton from "../components/HidePasswordButton";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";
import LoadingComponent from "../components/LoadingComponent";

import GoogleAuthButton from "../services/Google";
import AlertErrorSomethingWrong from "../services/Errors";
import { getItem, getUserData, storeItem } from "../services/Storage";

import { login } from "../../styles/pages/login";

function Login({ navigation, route }: { navigation: any, route: any }) {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const colorMode = route.params.colorMode;

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
        setIsLoading(false);
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    async function getDatas(email: string, password: string) {
        console.log('Connecting...');
        setIsLoading(true);

        await axios.post(process.env.EXPO_PUBLIC_BASE_URL + '/user/login', {
            email: email,
            password: password
        }).then(async function (response) {
            if (response.status === 200) {
                const token = response.data.jwt;
                const userData = {
                    name: " John Doe",
                    firstName: "John",
                    familyName: "Doe",
                    email: email,
                    id: 1,
                    picture: ""
                };

                await storeItem('@loginToken', token);
                await storeItem('@userEmail', email);
                await storeItem('@userPassword', password);
                await storeItem('@user', JSON.stringify(userData));

                const checkToken = await getItem('@loginToken');
                const userEmail = await getItem('@userEmail');
                const userPassword = await getItem('@userPassword');
                const checkUser = await getItem('@user');

                console.log("<--------------------------->");
                console.log('Login check token : ', checkToken);
                console.log("<--------------------------->");

                if (checkToken && checkUser && userEmail && userPassword) {
                    redirectToConnectedPage();
                    console.log('Connected with email and password');
                }
            } else {
                setIsLoading(false);
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
            setIsLoading(false);
            AlertErrorSomethingWrong(error, t);
        });
    }

    async function handleSubmit() {
        if (email && password) {
            setIsLoading(true);
            await getDatas(email, password);
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
        async function checkExistingDatas() {
            const token = await getItem('@loginToken');
            const userEmail = await getItem('@userEmail');
            const userPassword = await getItem('@userPassword');
            const checkUser = await getUserData();
            const oauth = await getItem('@oauth');

            console.log("<--------------------------->");
            console.log('Login start token : ', token);
            console.log("i18n.language: ", i18n.language);
            console.log("<--------------------------->");

            if (token && oauth) {
                if (checkUser?.email && checkUser?.firstName && checkUser?.id && checkUser?.name) {
                    redirectToConnectedPage();
                    console.log('Connected with' + oauth);
                }
            } else if (userEmail && userPassword) {
                await getDatas(userEmail, userPassword);
            }
        }
        checkExistingDatas();
    }, []);

    return (
        <>
            {
                isLoading ? <LoadingComponent /> : null
            }
            <View style={colorMode === 'light' ? login.container : login.containerDark}>
                <View style={login.center}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={login.logo}
                    />
                </View>
                <View style={login.content}>
                    <View style={login.form}>
                        <Text style={colorMode === 'light' ? login.title : login.titleDark}>{t('login.title')}</Text>
                        <TextInput
                            style={colorMode === 'light' ? login.input : login.inputDark}
                            placeholderTextColor={colorMode === 'light' ? login.placeholder.color : login.placeholderDark.color}
                            onChangeText={handleEmailChange}
                            value={email}
                            placeholder="Email"
                            inputMode="email"
                            testID="emailInput"
                        />
                        <View style={colorMode === 'light' ? login.passwordContainer : login.passwordContainerDark}>
                            <TextInput
                                style={colorMode === 'light' ? login.passwordContainer.input as StyleProp<ViewStyle> : login.passwordContainerDark.input as StyleProp<ViewStyle>}
                                onChangeText={handlePasswordChange}
                                value={password}
                                secureTextEntry={hidePassword}
                                placeholder={t('login.password')}
                                placeholderTextColor={colorMode === 'light' ? login.placeholder.color : login.placeholderDark.color}
                                testID="passwordInput"
                            />
                            <HidePasswordButton
                                dark={colorMode === 'dark' ? true : false}
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
                        </View>
                        <View style={login.center}>
                            <ClickTextButtonWithDescription
                                title={t('login.noAccount')}
                                descriptionText={t('login.register')}
                                onPress={redirectToRegister}
                                styleButton={login.bottom.noAccountButton}
                                styleTitle={colorMode === 'light' ? login.bottom.noAccountButton.text as StyleProp<ViewStyle> : login.bottom.noAccountButton.textDark as StyleProp<ViewStyle>}
                                styleDescriptionText={login.bottom.noAccountButton.register}
                                testID="registerButton"
                            />
                        </View>
                        <View style={login.center}>
                            <Picker
                                selectedValue={i18n.language}
                                onValueChange={changeLanguage}
                                testID="languagePicker"
                                mode="dropdown"
                                dropdownIconColor={colorMode === 'light' ? login.bottom.picker.color : login.bottom.pickerDark.color}
                                style={colorMode === 'light' ? login.bottom.picker as StyleProp<ViewStyle> : login.bottom.pickerDark as StyleProp<ViewStyle>}
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
            </View>
        </ >
    );
};

export default Login;