import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

async function handleOAuthFacebookConnection() {
    const [user, setUser] = React.useState(null);

    const url = `${process.env.REACT_APP_BASE_URL}/oauth/facebook/url`;

    await axios.get(url).then(async (res) => {
        const response = res.data;
        const clientId = response.split('client_id=')[1].split('&')[0];
        const redirectUrl = response.split('redirect_uri=')[1].split('&')[0];
        const scopes = response.split('scope=')[1].split('&')[0];

        console.log("response = ", response);
        console.log("clientId = ", clientId);
        console.log("redirectUrl = ", redirectUrl);
        console.log("scopes = ", scopes);

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