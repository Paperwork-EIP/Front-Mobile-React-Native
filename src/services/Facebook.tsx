import React from "react";
import { t } from "i18next";
import { LoginManager, Profile } from "react-native-fbsdk-next";

import OAuthButton from "../components/OAuthButton";

import { login } from "../../styles/pages/login";

function FacebookAuthButton({ navigation }: { navigation: any }) {
    const [userData, setUserData] = React.useState<{
        name: string | null | undefined,
        firstName: string | null | undefined,
        email: string | null | undefined,
        id: string | null | undefined,
        picture: string | null | undefined,
        linkProfile: string | null | undefined
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
            function (currentProfile) {
                if (currentProfile) {
                    setUserData({
                        name: currentProfile.name,
                        firstName: currentProfile.firstName,
                        email: currentProfile.email,
                        id: currentProfile.userID,
                        picture: currentProfile.imageURL,
                        linkProfile: currentProfile.linkURL
                    });
                }
            }
        );
    }

    function handleClickAuth() {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            async function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    await getData();
                    if (userData) {
                        console.log("Facebook user data : " + userData.name + " " + userData.email + " " + userData.id + " " + userData.picture + " " + userData.linkProfile);
                        redirectToConnectedPage();
                    } else {
                        console.log("Error getting user data");
                    }
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
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