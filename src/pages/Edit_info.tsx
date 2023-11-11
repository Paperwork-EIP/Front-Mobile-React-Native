import React, { useEffect } from "react";
import { Alert, View, Image, TextInput, Text, TouchableHighlight, TouchableOpacity } from "react-native";
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
            'Alert Title',
            'My Alert Msg',
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () =>
                    Alert.alert(
                        'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
            },
        );

    useEffect(() => {
    }, []);

    return (
        <View style={edit.container}>
            <View>
                <TouchableOpacity
                    style={edit.homebtn}
                    onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="chevron-back-outline" size={28} color={"black"} />
                </TouchableOpacity>
            </View>
            <Text style={edit.title}> {t('profile.editInfo.title')} </ Text>
            <View style={edit.center}>
                <TouchableHighlight style={edit.modifPicture} onPress={() => { showAlert() }}>
                    <Image source={userInfo?.profilePicture === null ? require('../../assets/avatar/no_avatar.png') : userInfo?.profilePicture}
                        style={[edit.profilePicture]} />
                </TouchableHighlight>
            </View>
            <TextInput
                style={edit.input}
                onChangeText={handleUsernameChange}
                value={usernameEdit}
                placeholder={userInfo?.username}
                // inputMode="Username"
                testID="usernameInput"
            />
            <TextInput
                style={edit.input}
                onChangeText={handleEmailChange}
                value={emailEdit}
                placeholder={userInfo?.email}
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
                // buttonStyle={edit.dropdown1BtnStyle}
                // buttonTextStyle={edit.dropdown1BtnTxtStyle}
                renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                }}
                dropdownIconPosition={'right'}
                // dropdownStyle={edit.dropdown1DropdownStyle}
                // rowStyle={edit.dropdown1RowStyle}
                // rowTextStyle={edit.dropdown1RowTxtStyle}
            />
            <View style={edit.passwordContainer} >
                <TextInput
                    // style={profile.passwordContainer.input}
                    onChangeText={handlePasswordChange}
                    value={password}
                    secureTextEntry={hidePassword}
                    placeholder={t('login.password')}
                    testID="passwordInput"
                />
                <HidePasswordButton
                    icon={hidePassword ? 'hide_password' : 'show_password'}
                    onPress={() => setHidePassword(!hidePassword)}
                    testID="hidePasswordButton"
                />
            </View>
            <TextInput
                style={edit.input}
                onChangeText={handleAddressChange}
                value={addressEdit}
                placeholder={userInfo?.address === null ? t('profile.editInfo.address') : userInfo?.address}
                inputMode="email"
                testID="emailInput"
            />
            <TextInput
                style={edit.input}
                onChangeText={handleAgeChange}
                value={ageEdit}
                placeholder={userInfo?.age === null ? t('profile.editInfo.age') : userInfo?.age}
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
                style={edit.input}
                onChangeText={handleNameChange}
                value={nameEdit}
                placeholder={userInfo?.name === null ? t('profile.editInfo.name') : userInfo?.name}
                inputMode="email"
                testID="emailInput"
            />
            <TextInput
                style={edit.input}
                onChangeText={handlePhonenumberChange}
                value={phonenumberEdit}
                placeholder={userInfo?.phonenumber === null ? t('profile.editInfo.phoneNumber') : userInfo?.phonenumber}
                inputMode="email"
                testID="emailInput"
            />
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