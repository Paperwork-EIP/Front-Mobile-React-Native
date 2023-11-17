import React, { useState, useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import axios from "axios";

import { getItem } from "../services/Storage";
import { useTranslation } from 'react-i18next';

import { quizzQuestion } from "../../styles/pages/quizzQuestion";

import LongHorizontalButton from "../components/LongHorizontalButton";

import { Text, View } from 'react-native';
import { use } from 'i18next';

function QuizzQuestion({ navigation } : { navigation: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const processSelected = useRoute().params/*?.processSelected*/;
    // const  step = useRoute().params?.step;
    // let nextStep = parseInt(processSelected?.step!) + 1;
    const [nextStep, setNextStep] = useState(1);
    const [title, setTitle] = useState("");
    const [currentId, setCurrentId] = useState();
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState();
    const [questions, setQuestions] = useState([{}]);
    const [answer, setAnswer] = useState([{}]);
    const [update, setUpdate] = React.useState(false);

    // User informations
    const [language, setLanguage] = useState("");
    const { t, i18n } = useTranslation();

    

    // Translation
    // const translation = getTranslation(language, "quiz");
    async function getUserProcesses() {
        const token = await getItem('@loginToken');
        axios.get(`${url}/userProcess/getUserProcesses`, { params: { user_token: token } })
        .then(res => {
            console.log('process get');
            res.data.response.map((item: any) => {
                if (item.userProcess.stocked_title === processSelected?.processStockedTittle)
                    setUpdate(true);
            });
        }).catch(err => {
            console.log(err)
        });
    }



    useEffect(() => {
        console.log(processSelected);
        getUserProcesses();
        let langTemp = "";
        switch(i18n.language) {
            case 'en':
                langTemp = 'english';
            case 'fr':
                langTemp = 'english';
            default:
                langTemp = 'english';
          }

        axios.get(`${url}/processQuestions/get`, { params: { title: processSelected?.processStockedTittle, language: langTemp } })
        .then(res => {
            console.log(res.data);
            // setTitle(res.data.title);
            setCurrentId(res.data.questions[nextStep - 1].step_id);
            setCurrentQuestionAnswer(res.data.questions[nextStep - 1].question);
            setQuestions(res.data.questions);
        }).catch(err => {
            console.log(err)
        });

        
    }, [nextStep, processSelected, language])

    async function addProcess(responseTemp : any) {
        const token = await getItem('@loginToken');
        const post = { process_title: processSelected?.processStockedTittle, user_token: token, questions: responseTemp }
        axios.post(`${url}/userProcess/add`, post)
                .then(res => {
                    navigation.navigate("Result", {processSelected: processSelected?.processSelected, processStockedTittle: processSelected?.processStockedTittle});
                    // window.location.href = `/processResult/${processSelected}`;
                }).catch(err => {
                    console.log(err)
                });
    }
    async function updateProcess( responseTemp: any) {
        const token = await getItem('@loginToken');
        const post = { process_title: processSelected?.processStockedTittle, user_token: token, questions: responseTemp }
        axios.post(`${url}/userProcess/update`, post)
                .then(res => {
                    navigation.navigate("Result", {processSelected: processSelected?.processSelected, processStockedTittle: processSelected?.processStockedTittle});
                }).catch(err => {
                    console.log(err)
                });
    }

    function handleClick(currentQuestionAnswer: string) {
        if (nextStep < questions.length) {
            if (nextStep === 1) {
                if (currentQuestionAnswer === 'true')
                    setAnswer([{ step_id: currentId, response: true}]);
                else
                    setAnswer([{ step_id: currentId, response: false}]);
            } else {
                if (currentQuestionAnswer === 'true')
                    setAnswer(answer => [...answer, { step_id: currentId, response: true} ]);
                else
                    setAnswer(answer => [...answer, { step_id: currentId, response: false} ]);
            }
            setNextStep(nextStep + 1);
            setCurrentQuestionAnswer(questions[nextStep - 1].question);
            setCurrentId(questions[nextStep - 1].step_id);
        } else {
            if (currentQuestionAnswer === 'true') {
                // setAnswer(answer => [...answer, { step_id: currentId, response: true} ]);
                var responseTemp = [...answer, { step_id: currentId, response: true}];
            } else {
                // setAnswer(answer => [...answer, { step_id: currentId, response: false} ]);
                var responseTemp = [...answer, { step_id: currentId, response: false}];
            }
            if (update === false) {
                addProcess(responseTemp);
            } else {
                updateProcess(responseTemp);
            }
        }
    }

    return (
        <View style={quizzQuestion.container}>
            {/* <Text>{title}</Text> */}
            <View style={quizzQuestion.center}>
                <Text style={quizzQuestion.text}>{currentQuestionAnswer}</Text>
                <View style={quizzQuestion.button}>
                    <LongHorizontalButton
                    title={t('quizzpage.yes')}
                    onPress={() => handleClick('true')}
                    styleButton={quizzQuestion.buttonYes}
                    styleText={quizzQuestion.buttonYes.text}
                    testID="submitButton"
                    />
                    <LongHorizontalButton
                    title={t('quizzpage.no')}
                    onPress={() => handleClick('false')}
                    styleButton={quizzQuestion.buttonNo}
                    styleText={quizzQuestion.buttonNo.text}
                    testID="submitButton"
                    />
                </View>
            </View>
        </View>

    );
}

export default QuizzQuestion;