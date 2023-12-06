import React, { useEffect } from "react";
import { Alert, View, Image, TextInput, Text, TouchableHighlight, TouchableOpacity, ScrollView, ImageStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useRoute } from '@react-navigation/native';

import { getItem } from "../services/Storage";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'

import axios from "axios";
import HidePasswordButton from "../components/HidePasswordButton";
import LongHorizontalButton from "../components/LongHorizontalButton";

import { edit } from "../../styles/pages/edit_info";

function Edit_info({ navigation, route }: { navigation: any, route: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const { t, i18n } = useTranslation();

    const [password, setPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);

    // User informations
    const [usernameEdit, setUsername] = React.useState("");
    const [nameEdit, setName] = React.useState("");
    // const [firstnameEdit, setFirstname] = React.useState("");
    const [languageEdit, setLanguage] = React.useState([]);
    const [ageEdit, setAge] = React.useState("");
    const [emailEdit, setEmail] = React.useState("");
    const [addressEdit, setAddress] = React.useState("");
    const [phonenumberEdit, setPhonenumber] = React.useState("");
    const [profilePictureEdit, setProfilePicture] = React.useState("");

    const languageValue = [
        'français',
        'english',
    ];

    const userInfo = route.params;

    const colorMode = route.params.colorMode;
     
    function handleUsernameChange(text: React.SetStateAction<string>) {
        setUsername(text);
    }

    function handleEmailChange(text: React.SetStateAction<string>) {
        setEmail(text);
    }

    function handlePasswordChange(text: React.SetStateAction<string>) {
        setPassword(text);
    }

    function handleAddressChange(text: React.SetStateAction<string>) {
        setAddress(text);
    }

    function handleAgeChange(text: React.SetStateAction<string>) {
        setAge(text);
    }

    // function handleFirstnameChange(text: React.SetStateAction<string>) {
    //     setFirstname(text);
    // }

    function handleNameChange(text: React.SetStateAction<string>) {
        setName(text);
    }

    function handlePhonenumberChange(text: React.SetStateAction<string>) {
        setPhonenumber(text);
    }

    async function handleSubmit() {
        const token = await getItem('@loginToken');
        const parameters = { token: token };

        let isAnyNewValue = false;

        const checkAndAssign = (newValue: string, oldValue: string, paramName: string) => {
            if (newValue.length > 0 && oldValue !== newValue) {
                Object.assign(parameters, { [paramName]: newValue });
                isAnyNewValue = true;
            }
        };

        checkAndAssign(usernameEdit, userInfo?.username, 'username');
        checkAndAssign(nameEdit, userInfo?.name, 'name');
        // checkAndAssign(firstnameEdit, userInfo?.firstname, 'firstname');
        checkAndAssign(languageEdit, userInfo?.language, 'language');
        checkAndAssign(ageEdit, userInfo?.age, 'age');
        checkAndAssign(emailEdit, userInfo?.email, 'new_email');
        checkAndAssign(addressEdit, userInfo?.address, 'address');
        checkAndAssign(phonenumberEdit, userInfo?.phonenumber, 'number_phone');

        console.log('language edit = ' + languageEdit);
        if (languageEdit.includes('français' as never)) {
            i18n.changeLanguage("fr");
        } else if (languageEdit.includes('english' as never)) {
            i18n.changeLanguage("en");
        }
        // 

        if (isAnyNewValue) {
            console.log(parameters);
            axios.post(`${url}/user/modifyDatas`, parameters)
                .then(res => {
                    console.log(res.data);
                    navigation.goBack();
                })
                .catch(err => {
                    console.log(err);
                    //         if (err.response && err.response.status) {
                    //             const { status } = err.response;
                    //         switch (status) {
                    //             case 400:
                    //                 toast.error(translation.alertMissingToken);
                    //                 break;
                    //             case 404:
                    //                 toast.error(translation.alertUserNotFound);
                    //                 break;
                    //             case 409:
                    //                 toast.error(translation.alertUsernameAlreadyUsed);
                    //                 break;
                    //             case 500:
                    //                 toast.error(translation.alertSystemError);
                    //                 break;
                    //             default:
                    //                 break;
                    //             }
                    //         }
                });
        } else {
            console.log('no change');
            //   toast.error(translation.alertNoChange);
        }
    };

    const showAlert = () =>
        Alert.alert(
            'Choose a picture',
            'My Alert Msg',
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Submit',
                    onPress: () => Alert.alert('Submit Pressed'),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                // onDismiss: () =>
                //     Alert.alert(
                //         'This alert was dismissed by tapping outside of the alert dialog.',
                //     ),
            },
        );

    useEffect(() => {
    }, []);

    return (
        
        <View style={colorMode === 'light' ? edit.container : edit.containerDark}>
            <Text style={colorMode === 'light' ? edit.title : edit.titleDark}> {t('profile.editInfo.title')} </ Text>
            <View style={edit.center}>
                <TouchableHighlight style={edit.modifPicture} onPress={() => { showAlert() }}>
                    <Image source={userInfo?.profilePicture === null ? require('../../assets/avatar/no_avatar.png') : userInfo?.profilePicture}
                        style={edit.profilePicture as ImageStyle} />
                </TouchableHighlight>
            </View>
            <ScrollView >
            <TextInput
                style={colorMode === 'light' ? edit.input : edit.inputDark}
                onChangeText={handleUsernameChange}
                value={usernameEdit}
                placeholder={userInfo?.username}
                placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                // inputMode="Username"
                testID="usernameInput"
            />
            <TextInput
                style={colorMode === 'light' ? edit.input : edit.inputDark}
                onChangeText={handleEmailChange}
                value={emailEdit}
                placeholder={userInfo?.email}
                placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                inputMode="email"
                testID="emailInput"
            />
            <SelectDropdown
                data={languageValue}
                // defaultValueByIndex={1}
                // defaultValue={'Egypt'}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setLanguage(selectedItem);
                }}
                defaultButtonText={t('profile.editInfo.selectLanguage')}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={colorMode === 'light' ? edit.dropdownStyle : edit.dropdownStyleDark}
                buttonTextStyle={colorMode === 'light' ? edit.dropdownTxtStyle : edit.dropdownTxtStyleDark}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={colorMode === 'light' ? '#454545' : '#cecece'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                dropdownStyle={colorMode === 'light' ? edit.dropdown1DropdownStyle : edit.dropdown1DropdownStyleDark}
                rowStyle={colorMode === 'light' ? edit.dropdownRowStyle : edit.dropdownRowStyleDark}
                rowTextStyle={colorMode === 'light' ? edit.dropdownRowTxtStyle :edit.dropdownRowTxtStyleDark}
            />
            <View style={colorMode === 'light' ? edit.passwordContainer : edit.passwordContainerDark} >
                <TextInput
                    style={colorMode === 'light' ? edit.passwordContainer.input : edit.passwordContainerDark.input}
                    onChangeText={handlePasswordChange}
                    value={password}
                    secureTextEntry={hidePassword}
                    placeholder={t('login.password')}
                    placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                    testID="passwordInput"
                />
                <HidePasswordButton
                        icon={hidePassword ? 'hide_password' : 'show_password'}
                        onPress={() => setHidePassword(!hidePassword)}
                        testID="hidePasswordButton" dark={colorMode === 'light' ? false : true}                />
            </View>
            <TextInput
                style={colorMode === 'light' ? edit.input : edit.inputDark}
                onChangeText={handleAddressChange}
                value={addressEdit}
                placeholder={userInfo?.address === null ? t('profile.editInfo.address') : userInfo?.address}
                placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                inputMode="email"
                testID="emailInput"
            />
            <TextInput
                style={colorMode === 'light' ? edit.input : edit.inputDark}
                onChangeText={handleAgeChange}
                value={ageEdit}
                placeholder={userInfo?.age === null ? t('profile.editInfo.age') : userInfo?.age}
                placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                inputMode="email"
                testID="emailInput"
            />
            {/* <TextInput
                        style={edit.input}
                        onChangeText={handleFirstnameChange}
                        value={firstnameEdit}
                        placeholder={userInfo?.firstname === null ? "firstname" : userInfo?.firstname}
                        inputMode="email"
                        testID="emailInput"
                    /> */}
            <TextInput
                style={colorMode === 'light' ? edit.input : edit.inputDark}
                onChangeText={handleNameChange}
                value={nameEdit}
                placeholder={userInfo?.name === null ? t('profile.editInfo.name') : userInfo?.name}
                placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                inputMode="email"
                testID="emailInput"
            />
            <TextInput
                style={colorMode === 'light' ? edit.input : edit.inputDark}
                onChangeText={handlePhonenumberChange}
                value={phonenumberEdit}
                placeholder={userInfo?.phonenumber === null ? t('profile.editInfo.phoneNumber') : userInfo?.phonenumber}
                placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                inputMode="email"
                testID="emailInput"
            />
            </ScrollView>
            <LongHorizontalButton
                title={t('profile.editInfo.submit')}
                onPress={handleSubmit}
                styleButton={edit.button}
                styleText={edit.button.text}
                testID="submitButton"
            />
        </View>
        
    );
};

export default Edit_info;