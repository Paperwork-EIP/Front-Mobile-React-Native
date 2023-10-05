import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

import { getItem } from "../services/Storage";

import { profile } from "../../styles/screen/profile.js";

function Profile({ navigation }: { navigation: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const [items, setItems] = useState<any>([]);

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
    const [profilePicture, setProfilePicture] = React.useState('');

    const [userProcessInfo, setUserProcessInfo]: any = useState([]);

    const colorEditButton = '#FC6976';
    const colorInfoIcons = '#29c9b3';
    const sizeInfoIcons = 16;

    const propsCardInfo = [
        {
            title: t('profile.email'),
            icon: 'mail-outline',
            text: email ? email : t('profile.noInfo')
        },
        {
            title: t('profile.language'),
            icon: 'language-outline',
            text: language ? language : t('profile.noInfo')
        },
        {
            title: t('profile.age'),
            icon: 'newspaper-outline',
            text: age ? age : t('profile.noInfo')
        },
        {
            title: t('profile.address'),
            icon: 'location-outline',
            text: address ? address : t('profile.noInfo')
        },
        {
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
                userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, percentage: response.data.response[j]['pourcentage'] });
            else
                userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, percentage: 0 });
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
                setProfilePicture(res.data.profile_picture);
            }).catch(err => {
                console.log(err)
            });
    }

    const goToEdit = () => navigation.navigate("Edit_info", { username: username, name: name, firstname: firstname, language: language, age: age, email: email, address: address, phonenumber: phonenumber, profilePicture: profilePicture });

    useEffect(() => {
        getUserInfo();
        getProcess();
        // profilePictureDisplay = require(profilePicture);
    }, [items]);

    return (
        <View style={profile.container}>
            <View style={profile.profileWrapper}>
                <View style={profile.profilePictureWrapper}>
                    <Image
                        source={/*profilePicture === null ?*/ require('../../assets/avatar/NoAvatar.png') /*: profilePicture*/}
                        style={profile.profilePicture}
                    />
                </View>
                <View style={profile.profileTexts}>
                    <Text style={profile.profileText}>{firstname ? firstname : t('profile.noInfo')} </ Text>
                    <Text style={profile.profileText}>{name ? name : t('profile.noInfo')} </ Text>
                </View>
                <View style={profile.profileTexts}>
                    <Text style={profile.profileTextUsername}>{username ? username : t('profile.noInfo')}</Text>
                </View>
            </View>
            <View style={profile.content}>
                <View style={profile.editWrapper}>
                    <Text style={profile.title}>{t('profile.personnalInfo')}</ Text>
                    <TouchableOpacity style={profile.editButton} onPress={goToEdit}>
                        <Text style={profile.edit}>
                            {t('profile.edit')}
                        </ Text>
                        <Ionicons name={'create-outline'} size={18} color={colorEditButton} />
                    </TouchableOpacity>
                </View>
                <View style={profile.info}>
                    {propsCardInfo.map((item: any, index: number) => (
                        <>
                            <View key={index} style={profile.textsInfo}>
                                <View style={profile.leftPartInfo}>
                                    <Ionicons name={item.icon} size={sizeInfoIcons} color={colorInfoIcons} />
                                    <Text style={profile.leftPartInfoText}>
                                        {item.title}
                                    </Text>
                                </View>
                                <View style={profile.rightPartInfo}>
                                    <Text style={profile.rightPartInfoText}>
                                        {item.text}
                                    </Text>
                                </View>
                            </ View>
                            {
                                index + 1 !== propsCardInfo.length &&
                                <View style={profile.line} />
                            }
                        </>
                    ))}
                </View>
                <View style={profile.content}>
                    <Text style={profile.title}>{t('profile.ongoingProcess')}</ Text>
                    {
                        userProcessInfo.length > 0 ?
                            <View style={profile.info}>
                                {userProcessInfo.map((item: any, index: number) => (
                                    <>
                                        <View key={index} style={profile.textsInfo}>
                                            <View style={profile.leftPartInfo}>
                                                <Text>
                                                    {index + 1}.
                                                </Text>
                                                <Text style={profile.leftPartInfoText}>
                                                    {item.process}
                                                </Text>
                                            </View>
                                            <View style={profile.rightPartInfo}>
                                                <Text style={profile.rightPartInfoText}>
                                                    {item.percentage}%
                                                </Text>
                                            </View>
                                        </ View>
                                        {
                                            index + 1 !== userProcessInfo.length &&
                                            <View style={profile.line} />
                                        }
                                    </>
                                ))}
                            </View>
                            :
                            <View style={profile.noProcess}>
                                <Text style={profile.noProcessText}>{t('profile.noProcess')}</Text>
                            </View>
                    }
                </View>
            </View>
        </View >
    );
};

export default Profile;