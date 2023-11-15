// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { result } from "../../styles/pages/result";
import { useTranslation } from 'react-i18next';

import { getItem } from "../services/Storage";
import { Text, View } from 'react-native';
// import Checkbox from '@react-native-community/checkbox';
import { CheckBox } from '@rneui/themed'

import { useRoute } from '@react-navigation/native';

function Result({ navigation, route }: { navigation: any, route: any }) {

    const { t, i18n } = useTranslation();
    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const processSelected = useRoute().params
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [title, setTitle] = useState("");
    // const [processSelected, setProcessSelected] = useState("");

    // const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [checked, setChecked] = useState({});
    const [requeteSend, setRequeteSend] = useState(false);

    // User informations
    const [language, setLanguage] = useState("");


    async function getUserSteps() {
        // console.log(processSelected?.processStockedTittle, );
        const token = await getItem('@loginToken');
        axios.get(`${url}/userProcess/getUserSteps`, { params: { process_title: processSelected?.processStockedTittle, user_token: token } })
                .then(res => {
                    setRequeteSend(true);
                    setStepsAnswer(res.data.response);
                    setTitle(res.data.title);
                    console.log(res.data);
                    stepsAnswer?.map((item: any) => {
                        if (item.is_done === true) {
                            // document.getElementById(item.step_id)?.setAttribute("checked", "checked");
                        }
                    });
                }).catch(err => {
                    console.log(err);
                }
            );
    }

    useEffect(() => {
        // axios.get(`${url}/user/getbytoken`, { params: { token: getItem('@loginToken') } })
        // .then(res => {
        //     setLanguage(res.data.language);
        // }).catch(err => {
        //     console.log(err)
        // });
        if (requeteSend === false)
            getUserSteps();
    },);

    // const handleCheckboxClick = (step_id: any, is_done: any) => {
    //     var newStepsAnswer = [];
    //     newStepsAnswer = stepsAnswer;
    //     newStepsAnswer?.map((item: any) => {
    //         if (item.step_id === step_id) {
    //             item.is_done = !is_done;
    //         }
    //     })
    //     setStepsAnswer(newStepsAnswer);
    //     newStepsAnswer = stepsAnswer.map((item: any) => {
    //         return {
    //             step_id: item.step_id,
    //             response: item.is_done
    //         }
    //     })
    //     axios.post(`${url}/userProcess/update`, {
    //         user_token: getItem('@loginToken'),
    //         process_title: processSelected,
    //         questions: newStepsAnswer
    //     }).then(res => {
    //         console.log(res.data.response);
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    const onValueChange = (item, index) => {
        const newData = [...stepsAnswer];
        newData[index].is_done = !item.is_done;
        setStepsAnswer(newData);
    }

    return (
        <View style={result.container}>

        <Text style={result.text}>{t('quizzpage.toDo')}</Text>
            {stepsAnswer?.map((item, index) => {
                console.log(item);
                console.log(item.is_done);
                return (
                    <View style={result.checkboxContainer}>
                        <CheckBox
                        style={result.checkbox}
                            title={item.description}
                            disabled={false}
                            checked={item.is_done}
                            onPress={(newValue) => onValueChange(item, index)}
                        />
                        {/* Logo avec source */}
                        {/* <Text>Name of the step</Text> */}
                    </View>)
            })}
        </ View>
    );
}

export default Result;