import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import OAuthButton from "../components/OAuthButton";

import { getItem, storeItem, removeItem } from "./Token";

import { login } from "../../styles/pages/login";
import AlertErrorSomethingWrong from "./Errors";

WebBrowser.maybeCompleteAuthSession();

function GoogleAuthButton({ navigation }: { navigation: any }) {
    const [iosClientId, setIosClientId] = React.useState('');
    const [androidClientId, setAndroidClientId] = React.useState('');

    const [loginToken, setLoginToken] = React.useState('');

    const [userInfo, setUserInfo] = React.useState<{
        name: any,
        firstName: any,
        email: any,
        id: any,
        picture: any
    }>();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
    });

    async function getTokens(accessToken: string, idToken: string, email: string) {
        const typeOauth = "google";

        if (accessToken && idToken && email) {
            await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/mobileLogin`, {
                access_token: accessToken,
                id: idToken,
                email: email,
                oauth: typeOauth
            }).then(async (response) => {
                const token = response.data.jwt;

                setLoginToken(token);
                await storeItem('loginToken', loginToken);

                redirectToConnectedPage();
            }).catch((error) => {
                AlertErrorSomethingWrong(error, t);
            });
        }
    }

    async function getUserInfo(accessToken: string, idToken: string) {
        if (!accessToken) {
            return;
        }
        try {
            await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(async (response) => {
                const user = response.data;

                setUserInfo({
                    name: user.name,
                    firstName: user.given_name,
                    email: user.email,
                    id: user.id,
                    picture: user.picture
                });

                await storeItem('user', JSON.stringify(user));
                await getTokens(accessToken, idToken, user.email);
            })
        } catch (error) {
            AlertErrorSomethingWrong(error, t);
        }
    }

    function redirectToConnectedPage() {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    async function handleGoogleAuth() {
        const user = await getItem('user');

        if (!user) {
            if (response?.type === 'success' && response?.authentication?.accessToken && response?.authentication?.idToken) {
                await getUserInfo(response.authentication.accessToken, response.authentication.idToken);
            }
        } else {
            removeItem('user');
        }
    }

    React.useEffect(() => {
        setAndroidClientId(`${process.env.EXPO_PUBLIC_ANDROID_GOOGLE_ID}`);
        setIosClientId(`${process.env.EXPO_PUBLIC_IOS_GOOGLE_ID}`);
        handleGoogleAuth();
    }, [response, loginToken, userInfo, androidClientId, iosClientId]);

    return (
        <OAuthButton
            title={t('login.google')}
            onPress={() => promptAsync()}
            source={require('../../assets/images/google-logo.png')}
            styleButton={login.bottom.buttons.googleButton}
            styleImage={login.bottom.buttons.googleButton.image}
            styleText={login.bottom.buttons.googleButton.text}
            testID="googleButton"
        />
    )
}

export default GoogleAuthButton;