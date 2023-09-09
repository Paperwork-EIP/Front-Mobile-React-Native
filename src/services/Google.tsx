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
    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/oauth/google/urlLogin`;

    const [webClientId, setWebClientId] = React.useState('');
    const [iosClientId, setIosClientId] = React.useState('');
    const [androidClientId, setAndroidClientId] = React.useState('');

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
        webClientId: webClientId
    });

    async function getUserInfo(token: string) {
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
            if (response?.type === 'success' && response?.authentication?.accessToken) {
                await getUserInfo(response.authentication.accessToken);
                redirectToConnectedPage();
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    React.useEffect(() => {
        async function getCredentialDatas() {
            await axios.get(url).then(async (res) => {
                setWebClientId(res.data.split('client_id=')[1].split('&')[0]);
            }).catch(error => {
                console.log(error);
                Alert.alert(
                    t('login.error.title'),
                    t('login.error.somethingWrong'),
                    [
                        { text: t('login.error.button') }
                    ]
                );
            });
        }
        setAndroidClientId(`${process.env.EXPO_PUBLIC_ANDROID_GOOGLE_ID}`);
        setIosClientId(`${process.env.EXPO_PUBLIC_IOS_GOOGLE_ID}`);
        getCredentialDatas();
        handleGoogleAuth();
    }, [response, userInfo, webClientId]);

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