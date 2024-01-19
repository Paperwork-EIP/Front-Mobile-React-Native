import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Modal, NativeModules, Alert, ToastAndroid } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import RNRestart from 'react-native-restart';
import DisconnectButton from "../components/DisconnectButton";
import LongIconButton from "../components/LongIconButton";

import { deleteItemAndRedirectTo, getItem } from "../services/Storage";
import { setColorModeInLocalStorage } from "../services/Parameters";

import { settingsLight, settingsDark } from "../../styles/pages/settings.js";

function Settings({ navigation, route }: { navigation: any, route: any }) {
    const { t } = useTranslation();
    const [token, setToken] = useState('');
    const api = process.env.EXPO_PUBLIC_BASE_URL;

    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const colorMode = route.params.colorMode;

    const setColorModeCallback = useCallback(async (color: string) => {
        await setColorModeInLocalStorage(color);
    }, []);

    function toggleDarkMode() {
        Alert.alert(
            t('settings.pageTitle'),
            t('settings.restartMessage'),
            [
                {
                    text: "Ok",
                    onPress: async () => {
                        await setColorModeCallback(colorMode === 'dark' ? 'light' : 'dark').then(() => {
                            RNRestart.restart();
                        });
                    }
                }
            ]
        );
    };

    async function getLoginToken() {
        const loginToken = await getItem('@loginToken');

        if (loginToken) {
            setToken(loginToken);
        }
    }

    useEffect(() => {
        if (!token) {
            getLoginToken();
        }
    });

    useEffect(() => {
    }, []);

    const handleConfirm = () => {
        setConfirmationVisible(false);
        axios.get(`${api}/user/delete`, {
            params: {
                token: token,
            }
        }).then(() => {
            ToastAndroid.show(t('settings.deleteAccountSuccess'), ToastAndroid.SHORT);
            deleteItemAndRedirectTo(navigation, '@loginToken', 'Login');
            RNRestart.restart();
        }).catch(err => {
            console.error(err)
            if (err.response.status === 400) {
                ToastAndroid.show(t('error.alertMissingToken'), ToastAndroid.SHORT);
            } else if (err.response.status === 404) {
                ToastAndroid.show(t('error.alertUserNotFound'), ToastAndroid.SHORT);
            } else if (err.response.status === 500) {
                ToastAndroid.show(t('error.alertSystemError'), ToastAndroid.SHORT);
            }
        });
    };

    const handleCancel = () => {
        setConfirmationVisible(false);
    };

    return (
        <>
            <View style={colorMode === 'dark' ? settingsDark.container : settingsLight.container}>
                <View style={colorMode === 'dark' ? settingsDark.content : settingsLight.content}>
                <Text
                    style={colorMode === 'dark' ? settingsDark.pageTitle : settingsLight.pageTitle}
                    testID="darkModeText"
                >{t('settings.pageTitle')}</Text>
                    <View style={colorMode === 'dark' ? settingsDark.settingsContainer : settingsLight.settingsContainer}>
                        <View style={colorMode === 'dark' ? settingsDark.section : settingsLight.section}>
                            <LongIconButton
                              title={colorMode === 'dark' ? t('settings.lightMode') : t('settings.darkMode')}
                              styleButton={colorMode === 'dark' ? settingsDark.darkButton : settingsLight.darkButton}
                              styleText={colorMode === 'dark' ? settingsDark.darkButton.text : settingsLight.darkButton.text}
                              onPress={toggleDarkMode}
                              testID="darkModeButton"
                              iconName={colorMode === 'dark' ? "sunny-outline" : "moon-outline"}
                              light={colorMode === 'dark' ? false : true}
                            />
                            <DisconnectButton
                                styleButton={colorMode === 'dark' ? settingsDark.disconnectButton : settingsLight.disconnectButton}
                                styleText={colorMode === 'dark' ? settingsDark.disconnectButton.text : settingsLight.disconnectButton.text}
                                navigation={navigation}
                                text={t('settings.disconnect')}
                                testID="disconnectButton"
                                iconName="power"
                                light={colorMode === 'dark' ? true : false}
                            />
                            <LongIconButton
                                title={t('settings.deleteAccount')}
                                styleButton={colorMode === 'dark' ? settingsDark.button : settingsLight.button}
                                styleText={colorMode === 'dark' ? settingsDark.button.text : settingsLight.button.text}
                                onPress={() => setConfirmationVisible(true)}
                                testID="deleteAccountButton"
                                iconName="trash"
                                light={colorMode === 'dark' ? true : false}
                            />

                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isConfirmationVisible}
                                onRequestClose={() => {
                                    setConfirmationVisible(false);
                                }}
                                testID="deleteAccountModal"
                            >
                                <View style={colorMode === 'dark' ? settingsDark.modal : settingsLight.modal}>
                                    <View style={colorMode === 'dark' ? settingsDark.modal.center : settingsLight.modal.center}>
                                        <Text
                                            style={colorMode === 'dark' ? settingsDark.modal.text : settingsLight.modal.text}
                                            testID="deleteAccountQuestion"
                                        >{t('settings.deleteAccountQuestion')}</Text>
                                        <View style={colorMode === 'dark' ? settingsDark.sectionModal : settingsLight.sectionModal}>
                                            <TouchableOpacity
                                                style={colorMode === 'dark' ? settingsDark.cancelButton : settingsLight.cancelButton}
                                                onPress={handleCancel}
                                                testID="modalCancelButton"
                                            >
                                                <Text
                                                    style={colorMode === 'dark' ? settingsDark.cancelButton.text : settingsLight.cancelButton.text}
                                                    testID="modalCancelText"
                                                >{t('settings.cancel')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={colorMode === 'dark' ? settingsDark.confirmButton : settingsLight.confirmButton}
                                                onPress={handleConfirm}
                                                testID="modalConfirmButton"
                                            >
                                                <Text
                                                    style={colorMode === 'dark' ? settingsDark.confirmButton.text : settingsLight.confirmButton.text}
                                                    testID="modalConfirmText"
                                                >{t('settings.confirm')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={colorMode === 'dark' ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={colorMode === 'dark' ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={colorMode === 'dark' ? settingsDark.title : settingsLight.title}
                                testID="versionText"
                            >{t('settings.version')}</Text>
                            <Text
                                style={colorMode === 'dark' ? settingsDark.title : settingsLight.title}
                                testID="versionNumber"
                            >1.0</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default Settings;