import React from "react";
import { Alert } from "react-native";
import { AccessToken, LoginManager, Profile } from "react-native-fbsdk-next";
import { t } from "i18next";
import axios from "axios";

import OAuthButton from "../components/OAuthButton";

import { storeItem, getItem } from "./Token";

import { login } from "../../styles/pages/login";
import AlertErrorSomethingWrong from "./Errors";

function FacebookAuthButton({ navigation }: { navigation: any }) {

    function redirectToConnectedPage() {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    async function getData() {
        const typeOauth = "facebook";

        await Profile.getCurrentProfile().then(
            function (currentProfile) {
                if (currentProfile) {
                    AccessToken.getCurrentAccessToken().then(async (data) => {
                        const token = data?.accessToken.toString();

                        if (token) {
                            await axios.get(`https://graph.facebook.com/v13.0/me?fields=email`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }).then(async (response) => {
                                const id = response.data.id;
                                const email = response.data.email;
                                const userData = {
                                    name: currentProfile.name,
                                    firstName: currentProfile.firstName,
                                    email: email,
                                    id: currentProfile.userID,
                                    picture: currentProfile.imageURL
                                };

                                console.log('Facebook profile : ', userData);

                                await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/mobileLogin`, {
                                    access_token: token,
                                    id: id,
                                    email: email,
                                    oauth: typeOauth
                                }).then(async (res) => {
                                    const token = res.data.jwt;

                                    console.log('Facebook token : ', token);

                                    if (token && userData) {
                                        await storeItem('@user', JSON.stringify(userData));
                                        await storeItem('@loginToken', token);

                                        const checkToken = await getItem('@loginToken');
                                        console.log('Facebook check token : ', checkToken);

                                        if (checkToken) {
                                            redirectToConnectedPage();
                                        }
                                    }
                                }
                                ).catch((error) => {
                                    AlertErrorSomethingWrong(error, t);
                                });
                            }).catch((error) => {
                                AlertErrorSomethingWrong(error, t);
                            });
                        }
                    });
                }
            }
        );
    }

    function handleClickAuth() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    getData();
                }
            },
            function (error) {
                AlertErrorSomethingWrong(error, t);
            }
        );
    }

    return (
        <OAuthButton
            title={t('login.facebook')}
            onPress={handleClickAuth}
            source={require('../../assets/images/facebook-logo.png')}
            styleButton={login.bottom.buttons.facebookButton}
            styleImage={login.bottom.buttons.facebookButton.image}
            styleText={login.bottom.buttons.facebookButton.text}
            testID="facebookButton"
        />
    )
}

export default FacebookAuthButton;