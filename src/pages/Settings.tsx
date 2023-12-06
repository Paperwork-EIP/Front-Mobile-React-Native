import React, { useCallback, useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Switch, Modal, NativeModules, Alert } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from "axios";

import DisconnectButton from "../components/DisconnectButton";
import LongHorizontalButton from "../components/LongHorizontalButton";

import { deleteItemAndRedirectTo, getItem } from "../services/Storage";
import { setColorModeInLocalStorage } from "../services/Parameters";

import { settingsLight, settingsDark } from "../../styles/pages/settings.js";

function Settings({ navigation, route }: { navigation: any, route: any }) {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("");
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
                            console.log("Color mode changed to " + colorMode);
                            NativeModules.DevSettings.reload();
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
        // axios.get(`${api}/user/getbytoken`, { params: { token: token } })
        //     .then(res => {
        //         setLanguage(res.data.language);
        //     }).catch(err => {
        //         console.log(err)
        //     });
    }, /*[token]*/);

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    const handleConfirm = () => {
        setConfirmationVisible(false);
        axios.get(`${api}/user/delete`, {
            params: {
                token: token,
            }
        }).then(res => {
            console.log(res.data);
            alert(t('settings.deleteAccountSuccess'))
            deleteItemAndRedirectTo(navigation, '@loginToken', 'Login');
            window.location.reload();
        }).catch(err => {
            console.log(err)
            if (err.response.status === 400) {
                toast.error(t('settings.alertMissingToken'));
            } else if (err.response.status === 404) {
                toast.error(t('settings.alertUserNotFound'));
            } else if (err.response.status === 500) {
                toast.error(t('settings.alertSystemError'));
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
                    <View style={colorMode === 'dark' ? settingsDark.settingsContainer : settingsLight.settingsContainer}>
                        <View style={colorMode === 'dark' ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={colorMode === 'dark' ? settingsDark.title : settingsLight.title}
                                testID="darkModeText"
                            >{t('settings.darkMode')}</Text>
                            <Switch
                                value={colorMode === 'dark'}
                                onValueChange={toggleDarkMode}
                                testID="darkModeSwitch"
                            />
                        </View>
                        <View style={colorMode === 'dark' ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={colorMode === 'dark' ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={colorMode === 'dark' ? settingsDark.title : settingsLight.title}
                                testID="disconnectText"
                            >{t('settings.disconnect')}</Text>
                            <DisconnectButton
                                styleButton={colorMode === 'dark' ? settingsDark.disconnectButton : settingsLight.disconnectButton}
                                styleText={colorMode === 'dark' ? settingsDark.disconnectButton.text : settingsLight.disconnectButton.text}
                                navigation={navigation}
                                text={t('settings.disconnect')}
                                testID="disconnectButton"
                            />
                        </View>
                        <View style={colorMode === 'dark' ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={colorMode === 'dark' ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={colorMode === 'dark' ? settingsDark.title : settingsLight.title}
                                testID="deleteAccountText"
                            >{t('settings.deleteAccount')}</Text>
                            <LongHorizontalButton
                                title={t('settings.delete')}
                                styleButton={colorMode === 'dark' ? settingsDark.button : settingsLight.button}
                                styleText={colorMode === 'dark' ? settingsDark.button.text : settingsLight.button.text}
                                onPress={() => setConfirmationVisible(true)}
                                testID="deleteAccountButton"
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
                                        <View style={colorMode === 'dark' ? settingsDark.section : settingsLight.section}>
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