import React from "react";
import { Alert } from "react-native";
import { t } from "i18next";
import { LoginManager, Profile } from "react-native-fbsdk-next";

import OAuthButton from "../components/OAuthButton";

import { storeItem, getItem } from "./Token";

import { login } from "../../styles/pages/login";

function FacebookAuthButton({ navigation }: { navigation: any }) {
    const [userData, setUserData] = React.useState<{
        name: any,
        firstName: any,
        email: any,
        id: any,
        picture: any
    }>();

    function redirectToConnectedPage() {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    async function getData() {
        await Profile.getCurrentProfile().then(
            async function (currentProfile) {
                if (currentProfile) {
                    setUserData({
                        name: currentProfile.name,
                        firstName: currentProfile.firstName,
                        email: currentProfile.email,
                        id: currentProfile.userID,
                        picture: currentProfile.imageURL
                    });
                    if (userData) {
                        await storeItem('user', JSON.stringify(userData));
                        redirectToConnectedPage();
                    }
                }
            }
        );
    }

    function handleClickAuth() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    Alert.alert(
                        t('login.error.title'),
                        t('login.error.somethingWrong'),
                        [
                            { text: t('login.error.button') }
                        ]
                    );
                } else {
                    getData();
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
                Alert.alert(
                    t('login.error.title'),
                    t('login.error.somethingWrong'),
                    [
                        { text: t('login.error.button') }
                    ]
                );
            }
        );
    }

    React.useEffect(() => {
        async function getUserData() {
            await getItem('user').then(async (user) => {
                if (user) {
                    const data = JSON.parse(user);
                    setUserData(data);
                }
            });
        }
        console.log("Facebook user data: " + userData);
        getUserData();
    }, [userData]);

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