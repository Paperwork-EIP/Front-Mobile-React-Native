import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import OAuthButton from "../components/OAuthButton";

import { getItem, storeItem } from "./Token";

import { login } from "../../styles/pages/login";

WebBrowser.maybeCompleteAuthSession();

function GoogleAuthButton({ navigation }: { navigation: any }) {
    const [iosClientId, setIosClientId] = React.useState('');
    const [androidClientId, setAndroidClientId] = React.useState('');

    const [accessToken, setAccessToken] = React.useState('');
    const [idToken, setIdToken] = React.useState('');
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

    async function getTokens(accessToken: string, idToken: string) {
        console.log(accessToken, idToken);
        await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/oauth/google/mobileLogin`, {
            access_token: accessToken,
            id_token: idToken
        }).then(async (response) => {
            const token = response.data.token;

            setAccessToken(accessToken);
            setIdToken(idToken);
            setLoginToken(token);
            await storeItem('loginToken', loginToken);
            const test = await getItem('loginToken');
            console.log("Google : " + test);
            redirectToConnectedPage();
        }).catch((error) => {
            console.log(error.response);
            Alert.alert(
                t('login.error.title'),
                t('login.error.somethingWrong'),
                [
                    { text: t('login.error.button') }
                ]
            );
        });
    }

    async function getUserInfo(token: string) {
        console.log(token);
        if (!token) {
            return;
        }
        try {
            const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const user = response.data;

            setUserInfo({
                name: user.name,
                firstName: user.given_name,
                email: user.email,
                id: user.id,
                picture: user.picture
            });
            await storeItem('user', JSON.stringify(user));
        } catch (error) {
            console.log(error);
            Alert.alert(
                t('login.error.title'),
                t('login.error.somethingWrong'),
                [
                    { text: t('login.error.button') }
                ]
            );
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
                await getUserInfo(response.authentication.accessToken);
                await getTokens(response.authentication.accessToken, response.authentication.idToken);
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    React.useEffect(() => {
        setAndroidClientId(`${process.env.EXPO_PUBLIC_ANDROID_GOOGLE_ID}`);
        setIosClientId(`${process.env.EXPO_PUBLIC_IOS_GOOGLE_ID}`);
        handleGoogleAuth();
    }, [response, loginToken, userInfo, androidClientId, iosClientId, accessToken, idToken]);

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