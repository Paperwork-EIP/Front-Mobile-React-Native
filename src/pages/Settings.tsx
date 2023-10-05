import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Icon, View, Text, Switch, Modal } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { settingsLight, settingsDark } from "../../styles/pages/settings.js";
import { getItem } from "../services/Storage";
import DisconnectButton from "../components/DisconnectButton";
import LongHorizontalButton from "../components/LongHorizontalButton";
import { deleteItemAndRedirectTo } from "../services/Storage";
import Header from "../components/Header";

function Settings({ navigation }: { navigation: any }) {

    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("");
    const [token, setToken] = useState('');
    const api = process.env.EXPO_PUBLIC_BASE_URL;

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isConfirmationVisible, setConfirmationVisible] = useState(false);

    const toggleDarkMode = async () => {
        try {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
        } catch (error) {
            console.error('Error toggling dark mode:', error);
        }
    };

    const loadThemePreference = async () => {
        try {
            const storedTheme = await AsyncStorage.getItem('theme');
            if (storedTheme) {
                setIsDarkMode(storedTheme === 'dark');
            }
        } catch (error) {
            console.error('Error loading theme preference:', error);
        }
    };

    useEffect(() => {
        loadThemePreference();
    }, []);

    // ++++++++++++++++++++++++++++++++++++++++++++

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
        axios.get(`${api}/user/getbytoken`, { params: { token: token } })
        .then(res => {
            setLanguage(res.data.language);
        }).catch(err => {
            console.log(err)
        });
    }, [token]);

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    const handleConfirm = () => {
        setConfirmationVisible(false);
        axios.get(`${api}/user/delete`, { params: {
            token: token,
        }}).then(res => {
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
            <View style={isDarkMode ? settingsDark.container : settingsLight.container}>
                <View style={isDarkMode ? settingsDark.content : settingsLight.content}>
                    <Header navigation={navigation} isDarkMode={isDarkMode} pageName={t('settings.pageTitle')} />
                    <View style={isDarkMode ? settingsDark.settingsContainer : settingsLight.settingsContainer}>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={isDarkMode ? settingsDark.title : settingsLight.title}
                                testID="darkModeText"
                            >{t('settings.darkMode')}</Text>
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleDarkMode}
                                testID="darkModeSwitch"
                            />
                        </View>
                        <View style={isDarkMode ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={isDarkMode ? settingsDark.title : settingsLight.title}
                                testID="disconnectText"
                            >{t('settings.disconnect')}</Text>
                            <DisconnectButton
                                styleButton={isDarkMode ? settingsDark.disconnectButton : settingsLight.disconnectButton}
                                styleText={isDarkMode ? settingsDark.disconnectButton.text : settingsLight.disconnectButton.text}
                                navigation={navigation}
                                text="Disconnect"
                                testID="disconnectButton"
                            />
                        </View>
                        <View style={isDarkMode ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={isDarkMode ? settingsDark.title : settingsLight.title}
                                testID="deleteAccountText"
                            >{t('settings.deleteAccount')}</Text>
                            <LongHorizontalButton
                                title={t('settings.delete')}
                                styleButton={isDarkMode ? settingsDark.button : settingsLight.button}
                                styleText={isDarkMode ? settingsDark.button.text : settingsLight.button.text}
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
                                <View style={isDarkMode ? settingsDark.modal : settingsLight.modal}>
                                    <View style={isDarkMode ? settingsDark.modal.center : settingsLight.modal.center}>
                                        <Text
                                            style={isDarkMode ? settingsDark.modal.text : settingsLight.modal.text}
                                            testID="deleteAccountQuestion"
                                        >{t('settings.deleteAccountQuestion')}</Text>
                                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                                            <TouchableOpacity
                                                style={isDarkMode ? settingsDark.cancelButton : settingsLight.cancelButton}
                                                onPress={handleCancel}
                                                testID="modalCancelButton"
                                            >
                                                <Text
                                                    style={isDarkMode ? settingsDark.cancelButton.text : settingsLight.cancelButton.text}
                                                    testID="modalCancelText"
                                                >{t('settings.cancel')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={isDarkMode ? settingsDark.confirmButton : settingsLight.confirmButton}
                                                onPress={handleConfirm}
                                                testID="modalConfirmButton"
                                            >
                                                <Text
                                                    style={isDarkMode ? settingsDark.confirmButton.text : settingsLight.confirmButton.text}
                                                    testID="modalConfirmText"
                                                >{t('settings.confirm')}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={isDarkMode ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text
                                style={isDarkMode ? settingsDark.title : settingsLight.title}
                                testID="versionText"
                            >{t('settings.version')}</Text>
                            <Text
                                style={isDarkMode ? settingsDark.title : settingsLight.title}
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