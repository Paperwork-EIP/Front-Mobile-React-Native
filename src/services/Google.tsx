import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import OAuthButton from "../components/OAuthButton";

import { login } from "../../styles/pages/login";

async function SignOut() {
    try {
        return await GoogleSignin.signOut();
    } catch (error) {
        console.error(error);
    }
}

async function GetGoogleUserData() {
    try {
        return await GoogleSignin.getCurrentUser();
    } catch (error) {
        console.error(error);
    }
}


function GoogleAuthButton() {
    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/oauth/google/urlLogin`;

    const [webClientId, setWebClientId] = React.useState('');
    const [scopes, setScopes] = React.useState([]);
    const [response, setResponse] = React.useState({});
    const [data, setData] = React.useState({});

    async function handleGoogleAuth() {
        try {
            GoogleSignin.configure({
                offlineAccess: true,
                scopes: scopes,
            });
            GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
            setResponse({ userInfo });
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        async function getCredentialDatas() {
            await axios.get(url).then(async (res) => {
                setWebClientId(res.data.split('client_id=')[1].split('&')[0]);
                setScopes(res.data.split('scope=')[1].split('&')[0].split(','));

                console.log("Google web client id = ", webClientId);
            }).catch(error => {
                Alert.alert(
                    t('login.error.title'),
                    error.message,
                    [
                        { text: t('login.error.button') }
                    ]
                );
            });
        }

        async function getUserData() {
            const currentUser = await GetGoogleUserData();
            setData({ currentUser });
        }

        getCredentialDatas();
        getUserData();

        console.log("Google response = ", response);
        console.log("Google data = ", data);
    }, [response, webClientId]);

    return (
        <OAuthButton
            title={t('login.google')}
            onPress={handleGoogleAuth}
            source={require('../../assets/images/google-logo.png')}
            styleButton={login.bottom.buttons.googleButton}
            styleImage={login.bottom.buttons.googleButton.image}
            styleText={login.bottom.buttons.googleButton.text}
            testID="googleButton"
        />
    )
}

export default GoogleAuthButton;