import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";

import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';

import OAuthButton from "../components/OAuthButton";

import { login } from "../../styles/pages/login";

WebBrowser.maybeCompleteAuthSession();

function GoogleAuthButton() {
    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/oauth/google/urlLogin`;

    const [clientId, setClientId] = React.useState('');
    const [scopes, setScopes] = React.useState([]);

    const [request, response, prompt] = Google.useAuthRequest(
        {
            clientId: clientId,
            scopes: scopes,
            redirectUri: AuthSession.makeRedirectUri({
                native: "com.paperworkmobile",
            }),
        },
    );

    React.useEffect(() => {
        axios.get(url).then(async (res) => {
            setClientId(res.data.split('client_id=')[1].split('&')[0]);
            setScopes(res.data.split('scope=')[1].split('&')[0].split(','));
        }).catch(error => {
            Alert.alert(
                t('login.error.title'),
                error.message,
                [
                    { text: t('login.error.button') }
                ]
            );
        });
        console.log("Google response: ", response);
    }, [response]);

    return (
        <OAuthButton
            title={t('login.google')}
            onPress={() => prompt()}
            source={require('../../assets/images/google-logo.png')}
            styleButton={login.bottom.buttons.googleButton}
            styleImage={login.bottom.buttons.googleButton.image}
            styleText={login.bottom.buttons.googleButton.text}
            testID="googleButton"
        />
    )
}

export default GoogleAuthButton;