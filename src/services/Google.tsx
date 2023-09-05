import React from "react";
import { Alert } from "react-native";
import { authorize } from "react-native-app-auth";
import axios from "axios";
import { t } from "i18next";

async function handleOAuthGoogleConnection() {
    const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
    const issuer = 'https://accounts.google.com';

    let url = `${baseUrl}/oauth/google/urlLogin`;

    await axios.get(url).then(async (res) => {
        const response = res.data;
        const clientId = response.split('client_id=')[1].split('&')[0];
        // const  redirectUri= response.split('redirect_uri=')[1].split('&')[0];
        const redirectUri = "com.anonymous.paperworkmobile"
        const scopes = response.split('scope=')[1].split('&')[0];

        const config = {
            issuer: issuer,
            clientId: clientId,
            redirectUrl: redirectUri,
            scopes: scopes.split('+'),
        };

        const result = await authorize(config);
        console.log("result = ", result);

    }).catch(error => {
        Alert.alert(
            t('login.error.title'),
            error.message,
            [
                { text: t('login.error.button')}
            ]
        );
    });
}

export default handleOAuthGoogleConnection;