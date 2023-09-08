import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";

import * as Facebook from "expo-auth-session/providers/facebook";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';

import OAuthButton from "../components/OAuthButton";

import { login } from "../../styles/pages/login";

WebBrowser.maybeCompleteAuthSession();

function FacebookAuthButton() {
    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/oauth/facebook/url`;

    const [clientId, setClientId] = React.useState('');
    const [redirectUri, setRedirectUri] = React.useState('');
    const [scopes, setScopes] = React.useState([]);

    const [request, response, prompt] = Facebook.useAuthRequest(
        {
            clientId: clientId,
            scopes: scopes,
            redirectUri: AuthSession.makeRedirectUri({
                scheme: redirectUri,
            }),
        },
    );

    React.useEffect(() => {
        axios.get(url).then((res) => {
            setClientId(res.data.split('client_id=')[1].split('&')[0]);
            setRedirectUri(`fb${res.data.split('client_id=')[1].split('&')[0]}://authorize`);
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
        console.log(redirectUri + " " + clientId + " " + scopes)
        console.log("Facebook response: ", response);

        if (response?.type === 'success') {
            const { access_token } = response.params;
            console.log(access_token);
        }
    }, [response]);

    return (
        <OAuthButton
            title={t('login.facebook')}
            onPress={() => prompt()}
            source={require('../../assets/images/facebook-logo.png')}
            styleButton={login.bottom.buttons.facebookButton}
            styleImage={login.bottom.buttons.facebookButton.image}
            styleText={login.bottom.buttons.facebookButton.text}
            testID="facebookButton"
        />
    )
}

export default FacebookAuthButton;