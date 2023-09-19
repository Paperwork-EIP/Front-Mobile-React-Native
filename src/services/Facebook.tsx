import React from "react";
import { AccessToken, LoginManager, Profile } from "react-native-fbsdk-next";
import { t } from "i18next";
import axios from "axios";

import OAuthButton from "../components/OAuthButton";

import AlertErrorSomethingWrong from "./Errors";
import { storeItem, getItem, saveUserData, getUserData } from "./Storage";

import { login } from "../../styles/pages/login";

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

        console.log('Facebook connecting...');

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
                                const userData: any = {
                                    name: currentProfile.name,
                                    firstName: currentProfile.firstName,
                                    familyName: currentProfile.lastName,
                                    email: email,
                                    id: currentProfile.userID,
                                    picture: currentProfile.imageURL
                                };

                                await axios.post(`${process.env.EXPO_PUBLIC_BASE_URL}/user/mobileLogin`, {
                                    access_token: token,
                                    id: id,
                                    email: email,
                                    oauth: typeOauth
                                }).then(async (res) => {
                                    const token = res.data.jwt;

                                    await saveUserData(userData.name, userData.firstName, userData.familyName, userData.email, userData.id, userData.picture);
                                    await storeItem('@loginToken', token);
                                    await storeItem('@oauth', 'facebook');

                                    const checkUserData = await getUserData();
                                    const checkToken = await getItem('@loginToken');
                                    const checkOauth = await getItem('@oauth');

                                    console.log('Facebook check user data : ', checkUserData);
                                    console.log('Facebook check token : ', checkToken);
                                    console.log('Facebook check oauth : ', checkOauth);

                                    if (checkToken && checkUserData && checkOauth) {
                                        redirectToConnectedPage();
                                        console.log('Facebook connected');
                                    }
                                }).catch((error) => {
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
        ).catch((error) => {
            AlertErrorSomethingWrong(error, t);
        });
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