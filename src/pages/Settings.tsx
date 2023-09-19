import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Icon, View, Text, Switch, Modal } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { settingsLight, settingsDark } from "../../styles/pages/settings.js";
import { getItem } from "../services/Storage";
import DisconnectButton from "../components/DisconnectButton";
import LongHorizontalButton from "../components/LongHorizontalButton";
import { deleteItemAndRedirectTo } from '../services/Storage';

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
                    <View>
                        <TouchableOpacity
                            style={isDarkMode ? settingsDark.homeBtn : settingsLight.homeBtn}
                            onPress={() => navigation.navigate('Home')}>
                            <Ionicons name="chevron-back-outline" size={28} color={isDarkMode ? "white" : "black"} />
                            <Text style={isDarkMode ? settingsDark.homeBtn.text : settingsLight.homeBtn.text}>{t('settings.pageTitle')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={isDarkMode ? settingsDark.settingsContainer : settingsLight.settingsContainer}>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text style={isDarkMode ? settingsDark.title : settingsLight.title} >{t('settings.darkMode')}</Text>
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleDarkMode}
                            />
                        </View>
                        <View style={isDarkMode ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text style={isDarkMode ? settingsDark.title : settingsLight.title} >{t('settings.disconnect')}</Text>
                            <DisconnectButton
                                styleButton={isDarkMode ? settingsDark.disconnectButton : settingsLight.disconnectButton}
                                styleText={isDarkMode ? settingsDark.disconnectButton.text : settingsLight.disconnectButton.text}
                                navigation={navigation}
                                text="Disconnect"
                            />
                        </View>
                        <View style={isDarkMode ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text style={isDarkMode ? settingsDark.title : settingsLight.title} >{t('settings.deleteAccount')}</Text>
                            <LongHorizontalButton
                                title={t('settings.delete')}
                                styleButton={isDarkMode ? settingsDark.button : settingsLight.button}
                                styleText={isDarkMode ? settingsDark.button.text : settingsLight.button.text}
                                onPress={() => setConfirmationVisible(true)}
                                testID="loginButton"
                            />
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={isConfirmationVisible}
                                onRequestClose={() => {
                                    setConfirmationVisible(false);
                                }}
                            >
                                <View style={isDarkMode ? settingsDark.modal : settingsLight.modal}>
                                    <View style={isDarkMode ? settingsDark.modal.center : settingsLight.modal.center}>
                                        <Text style={isDarkMode ? settingsDark.modal.text : settingsLight.modal.text}>Êtes-vous sûr de vouloir supprimer votre compte ?</Text>
                                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                                            <TouchableOpacity
                                                style={isDarkMode ? settingsDark.cancelButton : settingsLight.cancelButton}
                                                onPress={handleCancel}
                                            >
                                                <Text style={isDarkMode ? settingsDark.cancelButton.text : settingsLight.cancelButton.text}>Annuler</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={isDarkMode ? settingsDark.confirmButton : settingsLight.confirmButton}
                                                onPress={handleConfirm}
                                            >
                                                <Text style={isDarkMode ? settingsDark.confirmButton.text : settingsLight.confirmButton.text}>Confirmer</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                        <View style={isDarkMode ? settingsDark.lineBetween : settingsLight.lineBetween}></View>
                        <View style={isDarkMode ? settingsDark.section : settingsLight.section}>
                            <Text style={isDarkMode ? settingsDark.title : settingsLight.title} >{t('settings.version')}</Text>
                            <Text style={isDarkMode ? settingsDark.title : settingsLight.title} >1.0</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}

export default Settings;