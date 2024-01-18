import React from "react";
import axios from "axios";
import { t } from "i18next";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import OAuthButton from "../components/OAuthButton";

import { getItem, storeItem, saveUserData, getUserData } from "./Storage";
import AlertErrorSomethingWrong from "./Errors";

import { login } from "../../styles/pages/login";

WebBrowser.maybeCompleteAuthSession();

function GoogleAuthButton({ navigation }: { navigation: any }) {
    const [iosClientId, setIosClientId] = React.useState('');
    const [androidClientId, setAndroidClientId] = React.useState('');

    const [, response, promptAsync] = Google.useAuthRequest({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
    });

    async function getTokens(accessToken: string, idToken: string, user: { name: string, given_name: string, family_name: string, email: string, id: string, picture: string }) {
        const typeOauth = "google";
        const email = user.email;

        if (accessToken && idToken && email) {
            await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/mobileLogin`, {
                access_token: accessToken,
                id: idToken,
                email: email,
                oauth: typeOauth
            }).then(async (response) => {
                const token = response.data.jwt;

                await storeItem('@loginToken', token);
                await saveUserData(user.name, user.given_name, user.family_name, user.email, user.id, user.picture);
                await storeItem('@oauth', 'google');

                const checkUserData = await getUserData();
                const checkOauth = await getItem('@oauth');
                const checkToken = await getItem('@loginToken');

                if (checkToken && checkUserData && checkOauth) {
                    redirectToConnectedPage();
                }
            }).catch((error) => {
                AlertErrorSomethingWrong(error, t);
            });
        }
    }

    async function getUserInfo(accessToken: string, idToken: string) {
        if (!accessToken) {
            console.error('Google : No access token');
            return;
        }
        try {
            await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }).then(async (response) => {
                const user = response.data;

                if (user) {
                    await getTokens(accessToken, idToken, user);
                }
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
        if (response?.type === 'success' && response?.authentication?.accessToken && response?.authentication?.idToken) {
            await getUserInfo(response.authentication.accessToken, response.authentication.idToken);
        }
    }

    React.useEffect(() => {
        setAndroidClientId(`${process.env.EXPO_PUBLIC_ANDROID_GOOGLE_ID}`);
        setIosClientId(`${process.env.EXPO_PUBLIC_IOS_GOOGLE_ID}`);
        handleGoogleAuth();
    }, [response]);

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