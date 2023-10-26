import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Animated, Easing, Modal, Pressable, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

import { headerLight, headerDark } from "../../styles/components/header.js";

function Header({ navigation, theme }: { navigation: any, theme: any }) {

    const { t } = useTranslation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [rotationValue] = useState(new Animated.Value(0));
    
    const colorMode = theme;
    const iconSize = 24;

    useEffect(() => {
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

    function preventModalClose(event: any) {
        event.stopPropagation();
    };

    function navigateToPage(pageName: string) {
        navigation.navigate(pageName);
        setIsMenuOpen(false);
    }

    function navigateToScreen(pageName: string, screenName: string) {
        navigation.navigate(pageName, {screen: screenName})
        setIsMenuOpen(false);
    }

    return (
        <>
            <View style={colorMode === 'dark' ? headerDark.headerContainer : headerLight.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    testID="backHomeBtn">
                    <Ionicons
                        name="home"
                        size={iconSize}
                        color={colorMode === 'dark' ? "white" : "black"}
                        testID="iconPageTitle"
                    />
                </TouchableOpacity>
                <Image
                    style={colorMode === 'dark' ? headerDark.logo : headerLight.logo}
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
                            size={iconSize}
                            color={colorMode === 'dark' ? "white" : "black"}
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
                     style={colorMode === 'dark' ? headerDark.modalContainer : headerLight.modalContainer}
                     onPress={() => {
                       setIsMenuOpen(false);
                     }}>
                    <View style={colorMode === 'dark' ? headerDark.modalContainer : headerLight.modalContainer}>
                        <View style={colorMode === 'dark' ? headerDark.menuContainer : headerLight.menuContainer}>
                            <Text
                                style={colorMode === 'dark' ? headerDark.navTitle : headerLight.navTitle}
                                onPress={preventModalClose}>{t('header.navigationQuestion')}</Text>
                            <TouchableOpacity
                                style={colorMode === 'dark' ? headerDark.navButton : headerLight.navButton}
                                onPress={() => navigateToScreen('Home', 'Home')}>
                                <Text style={colorMode === 'dark' ? headerDark.navText : headerLight.navText}>{t('header.homePage')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={colorMode === 'dark' ? headerDark.navButton : headerLight.navButton}
                                onPress={() => navigateToScreen('Home', 'Profile')}>
                                <Text style={colorMode === 'dark' ? headerDark.navText : headerLight.navText}>{t('header.profilePage')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={colorMode === 'dark' ? headerDark.navButton : headerLight.navButton}
                                onPress={() => navigateToPage('Settings')}>
                                <Text style={colorMode === 'dark' ? headerDark.navText : headerLight.navText}>{t('header.settingsPage')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

export default Header;