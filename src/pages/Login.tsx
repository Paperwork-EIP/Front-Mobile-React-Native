import React, { useEffect, useState } from "react";
import { Alert, View, Image, TextInput, Text, StyleProp, ViewStyle } from "react-native";
import { authorize } from 'react-native-app-auth';
import { useTranslation } from 'react-i18next';
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HidePasswordButton from "../components/HidePasswordButton";
import OAuthButton from "../components/OAuthButton";
import ClickTextButtonWithDescription from "../components/ClickTextButtonWithDescription";
import LongHorizontalButton from "../components/LongHorizontalButton";

import { login } from "../../styles/pages/login";

function Login({ navigation }: { navigation: any }) {
    const { t, i18n } = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [token, setToken] = useState('');
    // const [displayWebView, setDisplayWebView] = useState(false);
    // const [url, setUrl] = useState('');
    // const [type, setType] = useState('');

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

    // function handleDisplayWebView(state: boolean) {
    //     setDisplayWebView(state);
    // }

    async function handleOAuthConnection(type: string) {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        let url = '';
        let issuer = '';

        switch (type) {
            case "google":
                url = `${baseUrl}/oauth/google/urlLogin`;
                issuer = 'https://accounts.google.com';
                break;
            case "facebook":
                url = `${baseUrl}/oauth/facebook/url`;
                issuer = 'https://www.facebook.com';
                break;

            default:
                break;
        }

        await axios.get(url).then(async (res) => {
            const response = res.data;
            console.log("response = ", response);
            const clientId = response.split('client_id=')[1].split('&')[0];
            const redirectUrl = response.split('redirect_uri=')[1].split('&')[0];
            const scopes = response.split('scope=')[1].split('&')[0];

            const config = {
                issuer: issuer,
                clientId: clientId,
                redirectUrl: redirectUrl,
                scopes: scopes.split('+'),
            };

            const result = await authorize(config);
            console.log("result = ", result);

        }).catch(err => {
            Alert.alert(
                t('login.error.title'),
                t('login.error.message'),
                [
                    { text: err }
                ]
            );
        });
    }

    // function connectWithGoogle() {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/google/urlLogin`).then(res => {
    //         const url = res.data;

    //         console.log(url);
    //         // setType("google");
    //         // setUrl(res.data);
    //         // handleDisplayWebView(true);
    //     }).catch(err => {
    //         Alert.alert(
    //             t('login.error.title'),
    //             t('login.error.message'),
    //             [
    //                 { text: err }
    //             ]
    //         );
    //     });
    // }

    // function connectWithFacebook() {
    //     axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/facebook/url`).then(res => {
    //         console.log(res.data);
    //         // setType("facebook");
    //         // setUrl(res.data);
    //         // handleDisplayWebView(true);
    //     }).catch(err => {
    //         Alert.alert(
    //             t('login.error.title'),
    //             t('login.error.message'),
    //             [
    //                 { text: err }
    //             ]
    //         );
    //     });
    // }

    // function requestApiGoogle(webViewState: any) {
    //     if (!webViewState.url.includes('code')) {
    //         handleDisplayWebView(false);
    //     } else {
    //         const code = webViewState.url.split('code=')[1];

    //         axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/google/login?code=${code}`).then(res => {
    //             console.log(res.data);
    //             storeToken(res.data.jwt);
    //         })
    //     }
    // }

    // function requestApiFacebook(webViewState: any) {
    //     if (!webViewState.url.includes('code')) {
    //         handleDisplayWebView(false);
    //     } else {
    //         const code = webViewState.url.split('code=')[1];

    //         axios.get(`${process.env.REACT_APP_BASE_URL}/oauth/google/login?code=${code}`).then(res => {
    //             console.log(res.data);
    //             storeToken(res.data.jwt);
    //         })
    //     }
    // }

    // function onNavigationStateChange(webViewState: any) {
    //     console.log(webViewState);
    //     switch (type) {
    //         case "google":
    //             requestApiGoogle(webViewState);
    //             break;
    //         case "facebook":
    //             requestApiFacebook(webViewState);
    //             break;

    //         default:
    //             break;
    //     }
    // }

    function redirectToConnectedPage() {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
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

    async function storeToken(token: string) {
        try {
            await AsyncStorage.setItem('loginToken', token);
            redirectToConnectedPage();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit() {
        if (email && password) {
            axios.post(process.env.REACT_APP_BASE_URL + '/user/login', {
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
        if (token) {
            redirectToConnectedPage();
        }
    });

    return (
        <View>
            {/* {
                displayWebView ?
                    <WebView
                        source={{ uri: url }}
                        onNavigationStateChange={navState => onNavigationStateChange(navState)}
                        testID="webView"
                    />
                    :
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
                            <View style={login.bottom}>
                                <View style={login.bottom.buttons as StyleProp<ViewStyle>}>
                                    <OAuthButton
                                        title={t('login.google')}
                                        onPress={connectWithGoogle}
                                        source={require('../../assets/images/google-logo.png')}
                                        styleButton={login.bottom.buttons.googleButton}
                                        styleImage={login.bottom.buttons.googleButton.image}
                                        styleText={login.bottom.buttons.googleButton.text}
                                        testID="googleButton"
                                    />
                                    <OAuthButton
                                        title={t('login.facebook')}
                                        onPress={connectWithFacebook}
                                        source={require('../../assets/images/facebook-logo.png')}
                                        styleButton={login.bottom.buttons.facebookButton}
                                        styleImage={login.bottom.buttons.facebookButton.image}
                                        styleText={login.bottom.buttons.facebookButton.text}
                                        testID="facebookButton"
                                    />
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

            } */}
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
                    <View style={login.bottom}>
                        <View style={login.bottom.buttons as StyleProp<ViewStyle>}>
                            <OAuthButton
                                title={t('login.google')}
                                onPress={() => handleOAuthConnection("google")}
                                source={require('../../assets/images/google-logo.png')}
                                styleButton={login.bottom.buttons.googleButton}
                                styleImage={login.bottom.buttons.googleButton.image}
                                styleText={login.bottom.buttons.googleButton.text}
                                testID="googleButton"
                            />
                            <OAuthButton
                                title={t('login.facebook')}
                                onPress={() => handleOAuthConnection("facebook")}
                                source={require('../../assets/images/facebook-logo.png')}
                                styleButton={login.bottom.buttons.facebookButton}
                                styleImage={login.bottom.buttons.facebookButton.image}
                                styleText={login.bottom.buttons.facebookButton.text}
                                testID="facebookButton"
                            />
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