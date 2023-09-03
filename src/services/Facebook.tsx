import React from "react";
import { Alert } from "react-native";
import axios from "axios";
import { t } from "i18next";

import * as WebBrowser from "expo-web-browser";

async function getInfoFromServerFacebook() {
    const url = `${process.env.REACT_APP_BASE_URL}/oauth/facebook/url`;

    let facebookUrl: string = "";
    let clientId: string = "";
    let redirectUrl: string = "";
    let scopes: string[] = [];

    await axios.get(url).then(async (res) => {
        const data = res.data;

        facebookUrl = data;
        clientId = data.split('client_id=')[1].split('&')[0];
        redirectUrl = data.split('redirect_uri=')[1].split('&')[0];
        scopes = data.split('scope=')[1].split('&')[0];
    }).catch(error => {
        Alert.alert(
            t('login.error.title'),
            error.message,
            [
                { text: t('login.error.button') }
            ]
        );
    });
    return { facebookUrl, clientId, redirectUrl, scopes };
}

// function getUserDataFromApi(response: any) {
//     let userInfo = null;

//     if (response && response.type === "success" && response.authentication) {
//         (async () => {
//             const userInfoResponse = await axios.get(
//                 `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,email,picture.type(large)`
//             )
//             userInfo = userInfoResponse.data;
//         })
//     }

//     return userInfo;
// }

async function handleOAuthFacebookConnection() {
    const { facebookUrl } = await getInfoFromServerFacebook();

    await WebBrowser.openAuthSessionAsync(
        facebookUrl,
    ).then((response) => {
        console.log(response);
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

// export { getInfoFromServerFacebook, getUserDataFromApi };
export default handleOAuthFacebookConnection;