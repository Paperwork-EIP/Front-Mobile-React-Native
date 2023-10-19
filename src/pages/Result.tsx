// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { result } from "../../styles/pages/result";
import { useTranslation } from 'react-i18next';

import { getItem } from "../services/Storage";
import { Text, View } from 'react-native';
import Checkbox from '@react-native-community/checkbox';

import { useRoute } from '@react-navigation/native';

function Result({ navigation, route }: { navigation: any, route: any }) {

    const { t, i18n } = useTranslation();
    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const processSelected = useRoute().params
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [title, setTitle] = useState("");
    // const [processSelected, setProcessSelected] = useState("");

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    // User informations
    const [language, setLanguage] = useState("");


    function getUserSteps() {
        axios.get(`${url}/userProcess/getUserSteps`, { params: { process_title: processSelected?.processStockedTittle, user_token: getItem('@loginToken') } })
                .then(res => {
                    setStepsAnswer(res.data.response);
                    setTitle(res.data.title);
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
        getUserSteps();
    },);

    const handleCheckboxClick = (step_id: any, is_done: any) => {
        var newStepsAnswer = [];
        newStepsAnswer = stepsAnswer;
        newStepsAnswer?.map((item: any) => {
            if (item.step_id === step_id) {
                item.is_done = !is_done;
            }
        })
        setStepsAnswer(newStepsAnswer);
        newStepsAnswer = stepsAnswer.map((item: any) => {
            return {
                step_id: item.step_id,
                response: item.is_done
            }
        })
        axios.post(`${url}/userProcess/update`, {
            user_token: getItem('@loginToken'),
            process_title: processSelected,
            questions: newStepsAnswer
        }).then(res => {
            console.log(res.data.response);
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={result.container}>

        <Text style={result.text}>{t('quizzpage.toDo')}</Text>
            {stepsAnswer?.map((item: any) => {
                return (
                    <View style={result.checkboxContainer}>
                        <Checkbox
                            disabled={false}
                            value={toggleCheckBox}
                            onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                        <Text>Name of the step</Text>
                    </View>)
            })}
        </ View>
    );
}

export default Result;