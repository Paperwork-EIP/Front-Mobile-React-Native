import React, { useEffect } from "react";
import { Modal, View, Image, TextInput, Text, TouchableHighlight, TouchableOpacity, ScrollView, ImageStyle, ToastAndroid } from "react-native";
import { useTranslation } from 'react-i18next';

import { getItem } from "../services/Storage";

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown'

import axios from "axios";
import HidePasswordButton from "../components/HidePasswordButton";
import LongHorizontalButton from "../components/LongHorizontalButton";
import CrossButton from '../components/CrossButton';

import LoadingComponent from "../components/LoadingComponent";
import { loading_component } from "../../styles/components/loading_component";

import { edit } from "../../styles/pages/edit_info";

function Edit_info({ navigation, route }: { navigation: any, route: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const { t, i18n } = useTranslation();

    const [password, setPassword] = React.useState('');
    const [hidePassword, setHidePassword] = React.useState(true);

    const [usernameEdit, setUsername] = React.useState("");
    const [nameEdit, setName] = React.useState("");
    const [firstnameEdit, setFirstnameEdit] = React.useState("");
    const [languageEdit, setLanguage] = React.useState("");
    const [ageEdit, setAge] = React.useState("");
    const [emailEdit, setEmail] = React.useState("");
    const [addressEdit, setAddress] = React.useState("");
    const [phonenumberEdit, setPhonenumber] = React.useState("");
    const [profilePictureEdit, setProfilePictureEdit] = React.useState("");
    const [profilePictureTemp, setProfilePictureTemp] = React.useState() as any;
    
    const [isLoading, setIsLoading] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const languageValue = [
        'french',
        'english',
        'german',
        'spanish',
        'indonesian',
        'korean',
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

    function handleFirstnameChange(text: React.SetStateAction<string>) {
        setFirstnameEdit(text);
    }

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
            console.log("new value " + newValue.length + " old value " + oldValue);
            if (newValue.length > 0 && oldValue !== newValue) {
                console.log("yes");
                Object.assign(parameters, { [paramName]: newValue });
                isAnyNewValue = true;
            }
        };

        const checkAndAssignPicture = (newValue: string, oldValue: string, paramName: string) => {
            var path = '../..'
            newValue = path.concat(newValue);
            if (newValue.length > 5 && oldValue !== newValue) {
                Object.assign(parameters, { [paramName]: profilePictureEdit });
                isAnyNewValue = true;
            }
        };

        checkAndAssign(usernameEdit, userInfo?.username, 'username');
        checkAndAssign(nameEdit, userInfo?.name, 'name');
        checkAndAssign(firstnameEdit, userInfo?.firstname, 'firstname');
        checkAndAssign(languageEdit, userInfo?.language, 'language');
        checkAndAssign(ageEdit, userInfo?.age, 'age');
        checkAndAssign(emailEdit, userInfo?.email, 'new_email');
        checkAndAssign(addressEdit, userInfo?.address, 'address');
        checkAndAssign(phonenumberEdit, userInfo?.phonenumber, 'number_phone');
        checkAndAssignPicture(profilePictureEdit, userInfo?.profilePicture, 'profile_picture');

        switch (languageEdit) {
            case 'french':
                i18n.changeLanguage("fr");
                break;
            case 'english':
                i18n.changeLanguage("en");
                break;
            case 'german':
                i18n.changeLanguage("de");
                break;
            case 'spanish':
                i18n.changeLanguage("es");
                break;
            case 'indonesian':
                i18n.changeLanguage("id");
                break;
            case 'korean':
                i18n.changeLanguage("ko");
                break;
            default:
                break;
        }

        if (isAnyNewValue) {
            await axios.post(`${url}/user/modifyDatas`, parameters)
                .then(() => {
                    ToastAndroid.show(t("profile.editInfo.updatedSuccess"), ToastAndroid.SHORT);
                    navigation.goBack();
                })
                .catch(err => {
                    console.error(err);
                    ToastAndroid.show(t('error.editInfoFail'), ToastAndroid.SHORT);
                });
        } else {
            ToastAndroid.show(t("profile.editInfo.noChange"), ToastAndroid.SHORT);
        }
    };

    function closeModal() {
        setModalVisible(!modalVisible);
    }

    function avatarSelected(avatarSelected: number) {
            switch (avatarSelected) {
                case 1:
                    setProfilePictureEdit('/assets/avatar/avatar01.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar01.png'));
                    closeModal();
                    break;
                case 2:
                    setProfilePictureEdit('/assets/avatar/avatar02.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar02.png'));
                    closeModal();
                    break;
                case 3:
                    setProfilePictureEdit('/assets/avatar/avatar03.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar03.png'));
                    closeModal();
                    break;
                case 4:
                    setProfilePictureEdit('/assets/avatar/avatar04.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar04.png'));
                    closeModal();
                    break;
                case 5:
                    setProfilePictureEdit('/assets/avatar/avatar05.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar05.png'));
                    closeModal();
                    break;
                case 6:
                    setProfilePictureEdit('/assets/avatar/avatar06.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar06.png'));
                    closeModal();
                    break;
                case 7:
                    setProfilePictureEdit('/assets/avatar/avatar07.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar07.png'));
                    closeModal;
                    break;
                case 8:
                    setProfilePictureEdit('/assets/avatar/avatar08.png');
                    setProfilePictureTemp(require('../../assets/avatar/avatar08.png'));
                    closeModal;
                    break;
                default:
                    setProfilePictureEdit('/assets/avatar/no_avatar.png');
                    setProfilePictureTemp(require('../../assets/avatar/no_avatar.png'));
                    break;
            }
        }

    function displayModals() {
        if (modalVisible) {
            return <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={edit.add.centeredView as any}>
                    <View style={colorMode === 'light' ? edit.add.modalView as any : edit.add.modalViewDark as any}>
                        <View style={edit.add.modalHeader as any}>
                            <View style={edit.add.modalHeader.containerTitle as any}>
                                <Text style={colorMode === 'light' ? edit.add.modalHeader.containerTitle.title as any : edit.add.modalHeader.containerTitle.titleDark as any}>{t('profile.editInfo.picture')}</Text>
                            </View>
                            <CrossButton
                                colorMode={colorMode === 'light' ? edit.add.modalHeader.containerTitle.title.color : edit.add.modalHeader.containerTitle.titleDark.color}
                                onPress={closeModal}
                            />
                        </View>
                        <View style={edit.add.modalContent as any}>
                            <View style={edit.add.modalContent.section as any}>
                                <TouchableOpacity onPress={() => avatarSelected(1)}>
                                    <Image source={require('../../assets/avatar/avatar01.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => avatarSelected(2)}>
                                    <Image source={require('../../assets/avatar/avatar02.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                            </View>
                            <View style={edit.add.modalContent.section as any}>
                                <TouchableOpacity onPress={() => avatarSelected(3)}>
                                    <Image source={require('../../assets/avatar/avatar03.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => avatarSelected(4)}>
                                    <Image source={require('../../assets/avatar/avatar04.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                            </View>
                            <View style={edit.add.modalContent.section as any}>
                                <TouchableOpacity onPress={() => avatarSelected(5)}>
                                    <Image source={require('../../assets/avatar/avatar05.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => avatarSelected(6)}>
                                    <Image source={require('../../assets/avatar/avatar06.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                            </View>
                            <View style={edit.add.modalContent.section as any}>
                                <TouchableOpacity onPress={() => avatarSelected(7)}>
                                    <Image source={require('../../assets/avatar/avatar07.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => avatarSelected(8)}>
                                    <Image source={require('../../assets/avatar/avatar08.png')} style={edit.add.modalContent.image as any} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>;
        }
    }

    function getImagesFromAssetsByFilename(filename: string) {
        switch (filename) {
            case '/assets/avatar/avatar01.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar01.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar02.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar02.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar03.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar03.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar04.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar04.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar05.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar05.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar06.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar06.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar07.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar07.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/avatar08.png':
                setProfilePictureTemp(require('../../assets/avatar/avatar08.png'));
                setIsLoading(false);
                break;
            case '/assets/avatar/no_avatar.png':
                setProfilePictureTemp(require('../../assets/avatar/no_avatar.png'));
                setIsLoading(false);
                break;
            default:
                setProfilePictureTemp(require('../../assets/avatar/no_avatar.png'));
                setIsLoading(false);
                break;
        }
    }

    useEffect(() => {
        getImagesFromAssetsByFilename(userInfo?.profilePicture);
    }, []);

    return (
        <>
            {displayModals()}
            <View style={colorMode === 'light' ? edit.container : edit.containerDark}>
                <Text style={colorMode === 'light' ? edit.title : edit.titleDark}> {t('profile.editInfo.title')} </ Text>
                <View style={edit.center}>
                    <TouchableHighlight style={edit.modifPicture} onPress={() => { setModalVisible(!modalVisible) }}>
                        {
                            isLoading ?
                            <LoadingComponent styleContainer={loading_component.lightContainer} />
                            :
                            <Image source={profilePictureTemp as any} style={edit.profilePicture as ImageStyle} />
                        }
                        
                    </TouchableHighlight>
                </View>
                <ScrollView>
                    <TextInput
                        style={colorMode === 'light' ? edit.input : edit.inputDark}
                        onChangeText={handleUsernameChange}
                        value={usernameEdit}
                        placeholder={userInfo?.username}
                        placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                        inputMode="text"
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
                        onSelect={(selectedItem) => {
                            setLanguage(selectedItem);
                        }}
                        defaultButtonText={t('profile.editInfo.selectLanguage')}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item) => {
                            return item;
                        }}
                        buttonStyle={colorMode === 'light' ? edit.dropdownStyle : edit.dropdownStyleDark}
                        buttonTextStyle={colorMode === 'light' ? edit.dropdownTxtStyle : edit.dropdownTxtStyleDark}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={colorMode === 'light' ? '#454545' : '#cecece'} size={16} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={colorMode === 'light' ? edit.dropdown1DropdownStyle : edit.dropdown1DropdownStyleDark}
                        rowStyle={colorMode === 'light' ? edit.dropdownRowStyle : edit.dropdownRowStyleDark}
                        rowTextStyle={colorMode === 'light' ? edit.dropdownRowTxtStyle : edit.dropdownRowTxtStyleDark}
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
                            testID="hidePasswordButton" dark={colorMode === 'light' ? false : true} />
                    </View>
                    <TextInput
                        style={colorMode === 'light' ? edit.input : edit.inputDark}
                        onChangeText={handleAddressChange}
                        value={addressEdit}
                        placeholder={userInfo?.address === null ? t('profile.editInfo.address') : userInfo?.address}
                        placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                        inputMode="text"
                        testID="addressInput"
                    />
                    <TextInput
                        style={colorMode === 'light' ? edit.input : edit.inputDark}
                        onChangeText={handleAgeChange}
                        value={ageEdit}
                        placeholder={userInfo?.age === null ? t('profile.editInfo.age') : userInfo?.age.toString()}
                        placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                        inputMode="numeric"
                        testID="ageInput"
                    />
                    <TextInput
                        style={colorMode === 'light' ? edit.input : edit.inputDark}
                        onChangeText={handleFirstnameChange}
                        value={firstnameEdit}
                        placeholder={userInfo?.firstname === null ? t('profile.editInfo.firstname') : userInfo?.firstname}
                        placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                        inputMode="text"
                        testID="firstnameInput"
                    />
                    <TextInput
                        style={colorMode === 'light' ? edit.input : edit.inputDark}
                        onChangeText={handleNameChange}
                        value={nameEdit}
                        placeholder={userInfo?.name === null ? t('profile.editInfo.name') : userInfo?.name}
                        placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                        inputMode="text"
                        testID="nameInput"
                    />
                    <TextInput
                        style={colorMode === 'light' ? edit.input : edit.inputDark}
                        onChangeText={handlePhonenumberChange}
                        value={phonenumberEdit}
                        placeholder={userInfo?.phonenumber === null ? t('profile.editInfo.phoneNumber') : userInfo?.phonenumber.toString()}
                        placeholderTextColor={colorMode === 'light' ? '#454545' : '#cecece'}
                        inputMode="tel"
                        testID="phoneNumberInput"
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
        </>
    );
};

export default Edit_info;