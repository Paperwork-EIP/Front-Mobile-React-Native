import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Animated, Easing, Modal, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { headerLight, headerDark } from "../../styles/components/header.js";

function Header({ navigation, isDarkMode }: { navigation: any }) {

    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [rotationValue] = useState(new Animated.Value(0));

    useEffect(() => {
        const rotateButton = isMenuOpen ? '90deg' : '0deg';

        Animated.timing(rotationValue, {
            toValue: isMenuOpen ? 1 : 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const preventModalClose = (event) => {
        event.stopPropagation();
    };

    const navigateToPage = ( pageName ) => {
        navigation.navigate(pageName);
        setIsMenuOpen(false);
    }

    const navigateToScreen = ( pageName, screenName ) => {
        navigation.navigate(pageName, {screen: screenName})
        setIsMenuOpen(false);
    }

    return (
        <>
            <View style={isDarkMode ? headerDark.headerContainer : headerLight.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    testID="backHomeBtn">
                    <Ionicons
                        name="home"
                        size={28}
                        color={isDarkMode ? "white" : "black"}
                        testID="iconPageTitle"
                    />
                </TouchableOpacity>
                <Image
                    style={isDarkMode ? headerDark.logo : headerLight.logo}
                    source={require('../../assets/logo.png')}
                  />
                <TouchableOpacity
                    onPress={ toggleMenu }
                    testID="drawerBtn">
                    <Animated.View
                        style={{
                            transform: [
                                {
                                    rotate: rotationValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '90deg'],
                                    }),
                                },
                            ],
                        }}>
                        <Ionicons
                            name="menu-outline"
                            size={28}
                            color={isDarkMode ? "white" : "black"}
                            testID="iconDrawer"
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <Modal
                visible={isMenuOpen}
                transparent={true}
                animationType="slide"
                onRequestClose={() => {
                    setIsMenuOpen(false);
                }}>
                <Pressable
                     style={isDarkMode ? headerDark.modalContainer : headerLight.modalContainer}
                     onPress={() => {
                       setIsMenuOpen(false);
                     }}>
                    <View style={isDarkMode ? headerDark.modalContainer : headerLight.modalContainer}>
                        <View onPress={preventModalClose} style={isDarkMode ? headerDark.menuContainer : headerLight.menuContainer}>
                            <Text
                                style={isDarkMode ? headerDark.navTitle : headerLight.navTitle}
                                onPress={preventModalClose}>{t('header.navigationQuestion')}</Text>
                            <TouchableOpacity
                                style={isDarkMode ? headerDark.navButton : headerLight.navButton}
                                onPress={() => navigateToScreen('Home', 'Home')}>
                                <Text style={isDarkMode ? headerDark.navText : headerLight.navText}>{t('header.homePage')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={isDarkMode ? headerDark.navButton : headerLight.navButton}
                                onPress={() => navigateToScreen('Home', 'Profile')}>
                                <Text style={isDarkMode ? headerDark.navText : headerLight.navText}>{t('header.profilePage')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={isDarkMode ? headerDark.navButton : headerLight.navButton}
                                onPress={() => navigateToPage('Settings')}>
                                <Text style={isDarkMode ? headerDark.navText : headerLight.navText}>{t('header.settingsPage')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

export default Header;