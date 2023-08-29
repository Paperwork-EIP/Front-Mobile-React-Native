import React from "react";
import { Alert } from "react-native";
import { authorize } from "react-native-app-auth";
import axios from "axios";
import { t } from "i18next";

async function handleOAuthFacebookConnection() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const issuer = 'ttps://graph.facebook.com';

    let url = `${baseUrl}/oauth/facebook/url`;

    await axios.get(url).then(async (res) => {
        const response = res.data;
        // const clientId = response.split('client_id=')[1].split('&')[0];
        // const redirectUrl = response.split('redirect_uri=')[1].split('&')[0];
        // const scopes = response.split('scope=')[1].split('&')[0];

        console.log("response = ", response);

        // const config = {
        //     issuer: issuer,
        //     clientId: clientId,
        //     redirectUrl: redirectUrl,
        //     scopes: scopes.split('+'),
        // };

        // const result = await authorize(config);
        // console.log("result = ", result);

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

export default handleOAuthFacebookConnection;