// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { result } from "../../styles/pages/result";
import { useTranslation } from 'react-i18next';

import { getItem } from "../services/Storage";
import { Text, View, TouchableHighlight, Linking, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from '@rneui/themed'
import LongHorizontalButton from "../components/LongHorizontalButton";

import { useRoute } from '@react-navigation/native';

function Result({ navigation, route }: { navigation: any, route: any }) {

    const { t, i18n } = useTranslation();
    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const processSelected = useRoute().params
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [requeteSend, setRequeteSend] = useState(false);

    async function getUserSteps() {
        const token = await getItem('@loginToken');
        axios.get(`${url}/userProcess/getUserSteps`, { params: { process_title: processSelected?.processStockedTittle, user_token: token } })
                .then(res => {
                    setRequeteSend(true);
                    setStepsAnswer(res.data.response);
                }).catch(err => {
                    console.log(err);
                }
            );
    }

    useEffect(() => {
        if (requeteSend === false)
            getUserSteps();
    },);

    async function handleClick () {
        const token = await getItem('@loginToken');
        var newStepsAnswer = [];
        newStepsAnswer = stepsAnswer.map((item: any) => {
            return {
                step_id: item.step_id,
                response: item.is_done
            }
        })
        axios.post(`${url}/userProcess/update`, {
            user_token: token,
            process_title: processSelected?.processStockedTittle,
            questions: newStepsAnswer
        }).then(res => {
            console.log(res.data.response);
        }).catch(err => {
            console.log(err)
        })
        navigation.navigate('Home');
    }

    const onValueChange = (item, index) => {
        const newData = [...stepsAnswer];
        newData[index].is_done = !item.is_done;
        setStepsAnswer(newData);
    }

    return (
        <View style={result.container}>
            <Text style={result.text}>{t('quizzpage.toDo')}</Text>
                <ScrollView style={result.scrollview}>
                    {stepsAnswer?.map((item, index) => {
                        console.log(item);
                        return (
                            <View style={result.checkboxContainer}>
                                <CheckBox
                                    title={item.description}
                                    disabled={false}
                                    checked={item.is_done}
                                    onPress={(newValue) => onValueChange(item, index)}
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    checkedColor="#29C9B3"
                                />
                                <TouchableHighlight onPress={()=>{Linking.openURL(item.source)}}>
                                    <Ionicons name="link" size={15} color="grey" />
                                </TouchableHighlight>
                            </View>)
                    })}
                </ScrollView>
            <LongHorizontalButton
                    title={t('quizzpage.done')}
                    onPress={() => handleClick()}
                    styleButton={result.doneButton}
                    styleText={result.doneButton.text}
                    testID="submitButton"
                    />
        </ View>
    );
}

export default Result;