import React, { useEffect, useState } from "react";
import {  Alert, View, TextInput, Text, useColorScheme } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from "axios";

import LongHorizontalButton from "../components/LongHorizontalButton";
import { processIdeaLight, processIdeaDark } from "../../styles/pages/processidea.js";
import { getItem } from "../services/Storage";

function ProcessIdea({ navigation }: { navigation: any }) {

    const { t, i18n } = useTranslation();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({ title: '', description: '', content: '' });

    const [language, setLanguage] = useState("");
    const [token, setToken] = useState('');

    const api = process.env.EXPO_PUBLIC_BASE_URL;
    
    const colorMode = useColorScheme();

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

    const handleSubmit = () => {
        const newErrors = {};
        var doWeHaveError = false;
        if (title.length == 0) {
          newErrors.title = t('processidea.errorTitle');
          doWeHaveError = true;
        }
        if (description.length == 0) {
          newErrors.description = t('processidea.errorDescription');
          doWeHaveError = true;
        }
        if (content.length == 0) {
          newErrors.content = t('processidea.errorContent');
          doWeHaveError = true;
        }
        setErrors(newErrors);

        if (doWeHaveError == true)
            console.log("there is some errors");
        else {
            console.log("there is no errors");
            axios.post(`${api}/processProposal/add`, {
                title: title,
                description: description,
                content: content,
                user_token: token
            }).then(res => {
                console.log("res = " + res)
                Alert.alert(
                  t('processidea.wSuccess'),
                  t('processidea.success'),
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('OK Pressed')
                    }
                  ],
                  { cancelable: false }
                );
                navigation.navigate('Home')
            }).catch(err => {
                console.log("err = " + err);
                Alert.alert(
                  t('processidea.wFail'),
                  t('processidea.fail'),
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('OK Pressed')
                    }
                  ],
                  { cancelable: false }
                );
            })
        }
    }

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    return (
        <>
            <View style={colorMode === 'dark' ? processIdeaDark.container : processIdeaLight.container}>
                <View style={colorMode === 'dark' ? processIdeaDark.content : processIdeaLight.content}>
                    <View style={colorMode === 'dark' ? processIdeaDark.form : processIdeaLight.form}>
                        <Text style={colorMode === 'dark' ? processIdeaDark.title : processIdeaLight.title} >{t('processidea.title')}</Text>
                        <TextInput
                            style={colorMode === 'dark' ? processIdeaDark.input : processIdeaLight.input}
                            placeholder="Title"
                            placeholderTextColor="gray"
                            inputMode="text"
                            aria-label="title"
                            value={title}
                            onChangeText = {text => setTitle(text)}
                            testID="titleInput"
                        />
                        {errors.title ?
                        <Text
                            style={colorMode === 'dark' ? processIdeaDark.errorLabel : processIdeaLight.errorLabel}
                            testID="errorTitle"
                        >{errors.title}</Text> : null }
                        <Text
                            style={colorMode === 'dark' ? processIdeaDark.helpLabel : processIdeaLight.helpLabel}
                            testID="helpTitle"
                        >{t('processidea.helpTitle')}</Text>
                        <Text style={colorMode === 'dark' ? processIdeaDark.title : processIdeaLight.title} >{t('processidea.description')}</Text>
                        <TextInput
                            style={colorMode === 'dark' ? processIdeaDark.input : processIdeaLight.input}
                            placeholder="Description"
                            placeholderTextColor="gray"
                            inputMode="text"
                            aria-label="description"
                            value={description}
                            onChangeText = {text => setDescription(text)}
                            testID="descriptionInput"
                        />
                        {errors.description ?
                        <Text
                            style={colorMode === 'dark' ? processIdeaDark.errorLabel : processIdeaLight.errorLabel}
                            testID="errorDescription"
                        >{errors.description}</Text> : null }
                        <Text
                            style={colorMode === 'dark' ? processIdeaDark.helpLabel : processIdeaLight.helpLabel}
                            testID="helpDescription"
                        >{t('processidea.helpDescription')}</Text>
                        <Text style={colorMode === 'dark' ? processIdeaDark.title : processIdeaLight.title} >{t('processidea.content')}</Text>
                        <TextInput
                            style={colorMode === 'dark' ? processIdeaDark.input : processIdeaLight.input}
                            placeholder="Content"
                            placeholderTextColor="gray"
                            inputMode="text"
                            aria-label="content"
                            value={content}
                            onChangeText = {text => setContent(text)}
                            testID="contentInput"
                        />
                        {errors.content ?
                        <Text
                            style={colorMode === 'dark' ? processIdeaDark.errorLabel : processIdeaLight.errorLabel}
                            testID="errorContent"
                        >{errors.content}</Text> : null }
                        <Text
                            style={colorMode === 'dark' ? processIdeaDark.helpLabel : processIdeaLight.helpLabel}
                            testID="helpContent"
                        >{t('processidea.helpContent')}</Text>
                        <LongHorizontalButton
                            title={t('processidea.submit')}
                            styleButton={colorMode === 'dark' ? processIdeaDark.button : processIdeaLight.button}
                            styleText={colorMode === 'dark' ? processIdeaDark.button.text : processIdeaLight.button.text}
                            onPress={handleSubmit}
                            testID="submitButton"
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

export default ProcessIdea;