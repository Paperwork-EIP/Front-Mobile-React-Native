import React from "react";
import { Alert } from "react-native";
import { LoginManager } from "react-native-fbsdk-next";
import axios from "axios";
import { t } from "i18next";

async function handleOAuthFacebookConnection() {
    const url = `${process.env.EXPO_PUBLIC_BASE_URL}/oauth/facebook/url`;

    await axios.get(url).then((res) => {
        const clientId = res.data.split('client_id=')[1].split('&')[0];
        const redirectUrl = res.data.split('redirect_uri=')[1].split('&')[0];
        const scopes = res.data.split('scope=')[1].split('&')[0];

        console.log(clientId);
        console.log(redirectUrl);
        console.log(scopes);

        LoginManager.logInWithPermissions(scopes).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(result);
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );

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

export default handleOAuthFacebookConnection;