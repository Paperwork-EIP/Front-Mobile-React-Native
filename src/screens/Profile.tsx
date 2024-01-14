import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, useColorScheme, ToastAndroid } from "react-native";
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

import { getItem } from "../services/Storage";

import LoadingComponent from "../components/LoadingComponent";

import { profile } from "../../styles/screen/profile.js";
import { loading_component } from "../../styles/components/loading_component";

function Profile({ navigation, route }: { navigation: any, route: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const { t } = useTranslation();

    // User informations
    const [username, setUsername] = React.useState("");
    const [name, setName] = React.useState("");
    const [firstname, setFirstname] = React.useState("");
    const [language, setLanguage] = React.useState("");
    const [age, setAge] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phonenumber, setPhonenumber] = React.useState("");
    const [profilePicture, setProfilePicture] = React.useState(require('../../assets/avatar/no_avatar.png'));
    const [profilePictureTemp, setProfilePictureTemp] = React.useState('../../assets/avatar/no_avatar.png');

    const [isLoading, setIsLoading] = useState(true);
    const [userProcessInfo, setUserProcessInfo]: any = useState([]);

    const colorEditButton = '#FC6976';
    const colorInfoIcons = '#29c9b3';
    const sizeInfoIcons = 16;

    const colorMode = route.params.colorMode;

    const propsCardInfo = [
        {
            id: 1111,
            title: t('profile.email'),
            icon: 'mail-outline',
            text: email ? email : t('profile.noInfo')
        },
        {
            id: 2222,
            title: t('profile.language'),
            icon: 'language-outline',
            text: language ? language : t('profile.noInfo')
        },
        {
            id: 3333,
            title: t('profile.age'),
            icon: 'newspaper-outline',
            text: age ? age : t('profile.noInfo')
        },
        {
            id: 4444,
            title: t('profile.address'),
            icon: 'location-outline',
            text: address ? address : t('profile.noInfo')
        },
        {
            id: 5555,
            title: t('profile.phoneNumber'),
            icon: 'call-outline',
            text: phonenumber ? phonenumber : t('profile.noInfo')
        }
    ]

    async function getProcess() {
        const token = await getItem('@loginToken');
        const response = await axios.get(`${url}/userProcess/getUserProcesses?user_token=${token}`);

        const userProcessTmp = [];
        for (let j = 0; j < response.data.response.length; j++) {
            if (response.data.response[j]['pourcentage'] != null)
                userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, stocked_title: response.data.response[j]['userProcess'].stocked_title, percentage: response.data.response[j]['pourcentage'] });
            else
                userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, stocked_title: response.data.response[j]['userProcess'].stocked_title, percentage: 0 });
        }
        setUserProcessInfo(userProcessTmp);
    }

    async function getUserInfo() {
        const token = await getItem('@loginToken');

        axios.get(`${url}/user/getbytoken`, { params: { token: token } })
            .then(res => {
                setUsername(res.data.username);
                setName(res.data.name);
                setFirstname(res.data.firstname);
                setLanguage(res.data.language);
                setAge(res.data.age);
                setEmail(res.data.email);
                setAddress(res.data.address);
                setPhonenumber(res.data.number_phone);
                getImagesFromAssetsByFilename(res.data.profile_picture);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                ToastAndroid.show(t("error.profile"), ToastAndroid.SHORT);
                console.error(err)
            });
    }

    function getImagesFromAssetsByFilename(filename: string) {
        switch (filename) {
            case '/assets/avatar/avatar01.png':
                setProfilePictureTemp('/assets/avatar/avatar01.png');
                setProfilePicture(require('../../assets/avatar/avatar01.png'));
                break;
            case '/assets/avatar/avatar02.png':
                setProfilePictureTemp('/assets/avatar/avatar02.png');
                setProfilePicture(require('../../assets/avatar/avatar02.png'));
                break;
            case '/assets/avatar/avatar03.png':
                setProfilePictureTemp('/assets/avatar/avatar03.png');
                setProfilePicture(require('../../assets/avatar/avatar03.png'));
                break;
            case '/assets/avatar/avatar04.png':
                setProfilePictureTemp('/assets/avatar/avatar04.png');
                setProfilePicture(require('../../assets/avatar/avatar04.png'));
                break;
            case '/assets/avatar/avatar05.png':
                setProfilePictureTemp('/assets/avatar/avatar05.png');
                setProfilePicture(require('../../assets/avatar/avatar05.png'));
                break;
            case '/assets/avatar/avatar06.png':
                setProfilePictureTemp('/assets/avatar/avatar06.png');
                setProfilePicture(require('../../assets/avatar/avatar06.png'));
                break;
            case '/assets/avatar/avatar07.png':
                setProfilePictureTemp('/assets/avatar/avatar07.png');
                setProfilePicture(require('../../assets/avatar/avatar07.png'));
                break;
            case '/assets/avatar/avatar08.png':
                setProfilePictureTemp('/assets/avatar/avatar08.png');
                setProfilePicture(require('../../assets/avatar/avatar08.png'));
                break;
            default:
                setProfilePictureTemp('/assets/avatar/no_avatar.png');
                setProfilePicture(require('../../assets/avatar/no_avatar.png'));
                break;
        }
    }

    function goToEdit() {
        navigation.navigate("Edit_info", {
            username: username,
            name: name,
            firstname: firstname,
            language: language,
            age: age,
            email: email,
            address: address,
            phonenumber: phonenumber,
            profilePicture: profilePictureTemp,
        })
    }
    function goToResultPage(processStockedTittle: any) {
        navigation.navigate("Result", {processStockedTittle: processStockedTittle});
    };


    useEffect(() => {
        let interval = setInterval(() => {
            getUserInfo();
            getProcess();
        }, 3000);
        return () => clearInterval(interval);        
    }, []);

    return (
        <View style={colorMode === 'light' ? profile.container : profile.containerDark}>
            {
                isLoading ?
                    <LoadingComponent styleContainer={loading_component.lightContainer} />
                    :
                    <>
                        <View style={profile.profileWrapper}>
                            <View style={profile.profilePictureWrapper}>
                                <Image
                                    source={profilePicture as any}
                                    style={profile.profilePicture}
                                />
                            </View>
                            <View style={profile.profileTexts}>
                                <Text style={colorMode === 'light' ? profile.profileText : profile.profileTextDark}>{firstname ? firstname : null} </ Text>
                                <Text style={colorMode === 'light' ? profile.profileText : profile.profileTextDark}>{name ? name : t('profile.noInfo')} </ Text>
                            </View>
                            <View style={profile.profileTexts}>
                                <Text style={colorMode === 'light' ? profile.profileTextUsername : profile.profileTextUsernameDark}>{username ? username : t('profile.noInfo')}</Text>
                            </View>
                        </View>
                        <View style={profile.content}>
                            <View style={profile.editWrapper}>
                                <Text style={colorMode === 'light' ? profile.title : profile.titleDark}>{t('profile.personnalInfo')}</ Text>
                                <TouchableOpacity style={profile.editButton} onPress={goToEdit}>
                                    <Text style={profile.edit}>
                                        {t('profile.edit')}
                                    </ Text>
                                    <Ionicons name={'create-outline'} size={18} color={colorEditButton} />
                                </TouchableOpacity>
                            </View>
                            <View style={colorMode === 'light' ? profile.info : profile.infoDark}>
                                {
                                    propsCardInfo.map((item: any, index: number) => (
                                        <View key={item.id}>
                                            <View style={profile.textsInfo}>
                                                <View style={profile.leftPartInfo}>
                                                    <Ionicons name={item.icon} size={sizeInfoIcons} color={colorInfoIcons} />
                                                    <Text style={colorMode === 'light' ? profile.leftPartInfoText : profile.leftPartInfoTextDark}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                                <View style={profile.rightPartInfo}>
                                                    <Text style={colorMode === 'light' ? profile.rightPartInfoText : profile.rightPartInfoTextDark}>
                                                        {item.text}
                                                    </Text>
                                                </View>
                                            </ View>
                                            {
                                                index + 1 !== propsCardInfo.length &&
                                                <View key={index + 432234234} style={profile.line} />
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={profile.content}>
                                <Text style={colorMode === 'light' ? profile.title : profile.titleDark}>{t('profile.ongoingProcess')}</ Text>
                                {
                                    userProcessInfo.length > 0 ?
                                        <View style={colorMode === 'light' ? profile.info : profile.infoDark}>                                             
                                            {
                                                userProcessInfo.map((item: any, index: number) => (
                                                    <View key={index}>
                                                        <TouchableOpacity onPress={() => goToResultPage(item.stocked_title)}>
                                                            <View style={profile.textsInfo}>
                                                                <View style={profile.leftPartInfo}>
                                                                    <Text style={colorMode === 'light' ? profile.leftPartInfoText : profile.leftPartInfoTextDark}>
                                                                        {index + 1}.
                                                                    </Text>
                                                                    <Text style={colorMode === 'light' ? profile.leftPartInfoText : profile.leftPartInfoTextDark}>
                                                                        {item.process}
                                                                    </Text>
                                                                </View>
                                                                <View style={profile.rightPartInfo}>
                                                                    <Text style={colorMode === 'light' ? profile.rightPartInfoText : profile.rightPartInfoTextDark}>
                                                                        {item.percentage}%
                                                                    </Text>
                                                                </View>
                                                            </ View>
                                                            {
                                                                index + 1 !== userProcessInfo.length &&
                                                                <View style={profile.line} />
                                                            }
                                                        </TouchableOpacity> 
                                                    </View>
                                                ))
                                            }
                                                           
                                        </View>
                                        :
                                        <View style={profile.noProcess}>
                                            <Text style={profile.noProcessText}>{t('profile.noProcess')}</Text>
                                        </View>
                                }
                            </View>
                        </View>
                    </>
            }
        </View >
    );
};

export default Profile;
