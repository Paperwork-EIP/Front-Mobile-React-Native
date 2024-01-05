// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { result } from "../../styles/pages/result";
import { loading_component } from "../../styles/components/loading_component";
import { useTranslation } from 'react-i18next';

import { getItem } from "../services/Storage";
import { Text, View, TouchableHighlight, Linking, ScrollView, ToastAndroid } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CheckBox } from '@rneui/themed';
import LoadingComponent from "../components/LoadingComponent";
import LongHorizontalButton from "../components/LongHorizontalButton";

import { useRoute } from '@react-navigation/native';

function Result({ navigation, route }: { navigation: any, route: any }) {

    const { t, i18n } = useTranslation();
    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const processSelected = useRoute().params
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [requeteSend, setRequeteSend] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const colorMode = route.params.colorMode;

    async function getUserSteps() {
        const token = await getItem('@loginToken');
        axios.get(`${url}/userProcess/getUserSteps`, { params: { process_title: processSelected?.processStockedTittle, user_token: token } })
            .then(res => {
                setRequeteSend(true);
                setStepsAnswer(res.data.response);
                setIsLoading(false);
            }).catch(err => {
                ToastAndroid.show(t('error.result'), ToastAndroid.SHORT);
                console.log(err);
            });
    }

    useEffect(() => {
        if (requeteSend === false)
            getUserSteps();
    },);

    async function handleClick() {
        const token = await getItem('@loginToken');
        var newStepsAnswer = [];
        newStepsAnswer = stepsAnswer.map((item: any) => {
            if (item.under_steps.length === 0) {
                return {
                    step_id: item.step_id,
                    response: item.is_done
                }
            } else {
                return {
                    step_id: item.step_id,
                    response: item.is_done,
                    underQuestions: item.under_steps.map((underStep: any) => {
                        return {
                            id: underStep.id,
                            response: underStep.is_done
                        }
                    })
                }
        }});
        axios.post(`${url}/userProcess/update`, {
            user_token: token,
            process_title: processSelected?.processStockedTittle,
            questions: newStepsAnswer
        }).then(res => {
            ToastAndroid.show(t('quizzpage.uploadResult'), ToastAndroid.SHORT);
            console.log(res.data.response);
        }).catch(err => {
            ToastAndroid.show(t('error.uploadResult'), ToastAndroid.SHORT);
            console.log(err)
        })
        navigation.navigate('Home');
    }

    const onUnderValueChange = (underStep, index, underIndex) => {
        const newData = [...stepsAnswer];
        newData[index].under_steps[underIndex].is_done = !underStep.is_done;
        if (newData[index].under_steps[underIndex].is_done === false) {
            newData[index].is_done = false;
        }
        if (newData[index].under_steps.every((item) => item.is_done === true)) {
            newData[index].is_done = true;
        }
        setStepsAnswer(newData);
    }
    const onMainValueChange = (item, index) => {
        const newData = [...stepsAnswer];
        newData[index].is_done = !item.is_done;
        newData[index].under_steps.map((underStep, underIndex) => {
            newData[index].under_steps[underIndex].is_done = item.is_done;
        });
        setStepsAnswer(newData);
    }
    const onValueChange = (item, index) => {
        const newData = [...stepsAnswer];
        newData[index].is_done = !item.is_done;
        setStepsAnswer(newData);
    }

    return (
        <View style={colorMode === 'light' ? result.container : result.containerDark}>
            {
                isLoading ?
                    <LoadingComponent styleContainer={loading_component.lightContainer} />
                :
                <>
                
                <Text style={colorMode === 'light' ? result.text : result.textDark}>{t('quizzpage.toDo')}</Text>
                <View style={result.scrollview}>
                    <ScrollView style={result.scrollview}>
                        {stepsAnswer?.map((item, index) => {
                            if (item.under_steps.length === 0) {
                                return (
                                    <View key={index} style={result.checkboxContainer}>
                                        <CheckBox
                                            containerStyle={result.checkbox /*{backgroundColor: 'transparent'}*/}
                                            title={item.description}
                                            textStyle={colorMode === 'light' ? { color: 'black', fontSize: 13 } : { color: 'white', fontSize: 13 }}
                                            disabled={false}
                                            checked={item.is_done}
                                            onPress={(newValue) => onValueChange(item, index)}
                                            iconType="material-community"
                                            checkedIcon="checkbox-marked"
                                            uncheckedIcon="checkbox-blank-outline"
                                            checkedColor="#29C9B3"
                                        />
                                        <TouchableHighlight onPress={() => { Linking.openURL(item.source) }}>
                                            <Ionicons name="link" size={15} color="grey" />
                                        </TouchableHighlight>
                                    </View>)
                            } else {
                                return (
                                    <View key={index} style={result.itemCheckboxContainer}>
                                        <View key={index} style={result.checkboxContainer}>
                                            <CheckBox
                                                containerStyle={result.checkbox /*{backgroundColor: 'transparent'}*/}
                                                title={item.description}
                                                textStyle={colorMode === 'light' ? { color: 'black', fontSize: 13 } : { color: 'white', fontSize: 13 }}
                                                disabled={false}
                                                checked={item.is_done}
                                                onPress={(newValue) => onMainValueChange(item, index)}
                                                iconType="material-community"
                                                checkedIcon="checkbox-marked"
                                                uncheckedIcon="checkbox-blank-outline"
                                                checkedColor="#29C9B3"
                                            />
                                            <TouchableHighlight style={result.link} onPress={() => { Linking.openURL(item.source) }}>
                                                <Ionicons name="link" size={15} color="grey" />
                                            </TouchableHighlight>
                                        </View>
                                        <View style={result.underSteps}>
                                            {item.under_steps.map((underStep, underIndex) => {
                                                return (
                                                    <View key={underIndex} style={result.checkboxContainer}>
                                                        <CheckBox
                                                            containerStyle={/*result.checkbox*/{ backgroundColor: 'transparent' }}
                                                            title={underStep.description}
                                                            textStyle={colorMode === 'light' ? { color: 'black', fontSize: 11 } : { color: 'white', fontSize: 11 }}
                                                            disabled={false}
                                                            checked={underStep.is_done}
                                                            onPress={(newValue) => onUnderValueChange(underStep, index, underIndex)}
                                                            iconType="material-community"
                                                            checkedIcon="checkbox-marked"
                                                            uncheckedIcon="checkbox-blank-outline"
                                                            checkedColor="#29C9B3"
                                                        />
                                                        <TouchableHighlight onPress={() => { Linking.openURL(underStep.source) }}>
                                                            <Ionicons name="link" size={15} color="grey" />
                                                        </TouchableHighlight>
                                                    </View>
    
                                                )
                                            })}
                                        </View>
                                    </View>
                                )
                            }
                        })}
                    </ScrollView>
                </View>
                <LongHorizontalButton
                    title={t('quizzpage.done')}
                    onPress={() => handleClick()}
                    styleButton={result.doneButton}
                    styleText={result.doneButton.text}
                    testID="submitButton"
                />
            </>
            }
            
        </ View>
    );
}

export default Result;