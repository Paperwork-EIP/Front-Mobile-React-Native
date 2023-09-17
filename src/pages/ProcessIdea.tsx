import React, { useEffect, useRef, useState } from "react";
import { Alert, View, Image, TextInput, Text, StyleProp, ViewStyle } from "react-native";
import { useTranslation } from 'react-i18next';
import axios from "axios";

import LongHorizontalButton from "../components/LongHorizontalButton";
import { processidea } from "../../styles/pages/processidea.js";
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
            console.log("title = " + title);
            console.log("description = " + description);
            console.log("content = " + content);
            axios.post(`${api}/processProposal/add`, {
                title: title,
                description: description,
                content: content,
                user_token: token
            }).then(res => {
                console.log("res = " + res)
                alert(t('processidea.success'))
                navigation.navigate('Home')
            }).catch(err => {
                console.log("err = " + err);
                alert(t('processidea.fail'))
            })
        }
    }

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };
    return (
        <>
            <View style={processidea.container}>
                <View style={processidea.content}>
                    <View style={processidea.form}>
                        <Text style={processidea.title} >{t('processidea.title')}</Text>
                        <TextInput
                            style={processidea.input}
                            placeholder="Title"
                            placeholderTextColor="gray"
                            inputMode="text"
                            aria-label="title"
                            value={title}
                            onChangeText = {text => setTitle(text)}
                            testID="titleInput"
                        />
                        {errors.title ? <Text style={processidea.errorLabel}>{errors.title}</Text> : null }
                        <Text style={processidea.helpLabel} >{t('processidea.helpTitle')}</Text>
                        <Text style={processidea.title} >{t('processidea.description')}</Text>
                        <TextInput
                            style={processidea.input}
                            placeholder="Description"
                            placeholderTextColor="gray"
                            inputMode="text"
                            aria-label="description"
                            value={description}
                            onChangeText = {text => setDescription(text)}
                            testID="descriptionInput"
                        />
                        {errors.description ? <Text style={processidea.errorLabel}>{errors.description}</Text> : null }
                        <Text style={processidea.helpLabel} >{t('processidea.helpDescription')}</Text>
                        <Text style={processidea.title} >{t('processidea.content')}</Text>
                        <TextInput
                            style={processidea.input}
                            placeholder="Content"
                            placeholderTextColor="gray"
                            inputMode="text"
                            aria-label="content"
                            value={content}
                            onChangeText = {text => setContent(text)}
                            testID="contentInput"
                        />
                        {errors.content ? <Text style={processidea.errorLabel}>{errors.content}</Text> : null }
                        <Text style={processidea.helpLabel} >{t('processidea.helpContent')}</Text>
                        <LongHorizontalButton
                            title={t('processidea.submit')}
                            styleButton={processidea.button}
                            styleText={processidea.button.text}
                            onPress={handleSubmit}
                            testID="loginButton"
                        />
                    </View>
                </View>
            </View>
        </>
    );
}

export default ProcessIdea;