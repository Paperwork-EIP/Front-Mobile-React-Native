import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableHighlight, ImageStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getItem } from "../services/Storage";

import axios from "axios";

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

    const [userProcessInfo, setUserProcessInfo]: any = useState([{}]);

    // let profilePictureDisplay;

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
        // axios.get(`${url}/userProcess/getUserProcesses`, { params: { user_token: token } })
        // .then(res => {
        //     setUserProcessInfo(res.data.response);
        //     console.log("userProcessInfo = " + userProcessInfo);
        // }).catch(err => {
        //     console.log(err)
        // });
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
        // console.log("profilePictureDisplay = " + profilePictureDisplay);
        console.log("userProcessInfo = " + userProcessInfo);
        console.log("userInfo = " + username + " " + name + " " + firstname + " " + language + " " + age + " " + email + " " + address + " " + phonenumber + " " + profilePicture);
    }, [items]);

    return (
        <View style={profile.container}>
            <View style={profile.header}>
                <TouchableHighlight style={profile.toSettings} onPress={() => { navigation.navigate('Settings') }}>
                    <Ionicons name={'settings-sharp'} size={30} color={'black'} />
                </TouchableHighlight>
            </View>
            <View style={profile.center}>
                <Image source={/*profilePicture === null ?*/ require('../../assets/avatar/NoAvatar.png') /*: profilePicture*/}
                    style={[profile.profilePicture, profile.shadowProp] as ImageStyle} />
            </View>
            <View style={profile.content}>
                <View >
                    <View >
                        <Text>
                            <Text style={profile.title}> {t('profile.personnalInfo')} </ Text>
                            <Text style={profile.edit} onPress={goToEdit}> {t('profile.edit')} <Ionicons name={'pencil'} size={19} color={'#29c9b3'} /> </ Text>
                        </ Text>
                    </View>
                    <View style={profile.info}>
                        <Text style={profile.text}> Username : {username ? username : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Name : {name ? name : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Firstname : {firstname ? firstname : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Language : {language ? language : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Age : {age ? age : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Email : {email ? email : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Address : {address ? address : t('profile.noInfo')} </ Text>
                        <View style={profile.line} />
                        <Text style={profile.text}> Phone number : {phonenumber ? phonenumber : t('profile.noInfo')} </ Text>
                    </View>
                </View>
                <View >
                    <Text style={profile.title}> {t('profile.ongoingProcess')} </ Text>
                    {userProcessInfo.map((item: any, index: number) => (
                        <View key={index} style={profile.processContainer}>
                            <Text style={profile.processName}>{item.process}:</Text>
                            <Text style={profile.processPercentage}>{`${item.percentage}%`}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View >
    );
};

export default Profile;