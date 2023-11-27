import React, { useState, useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import axios from "axios";

import { getItem } from "../services/Storage";
import { useTranslation } from 'react-i18next';

import { quizzQuestion } from "../../styles/pages/quizzQuestion";

import LongHorizontalButton from "../components/LongHorizontalButton";

import { Text, View } from 'react-native';
import { exists, use } from 'i18next';

function QuizzQuestion({ navigation, route } : { navigation: any, route: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const processSelected = useRoute().params/*?.processSelected*/;
    // const  step = useRoute().params?.step;
    const [nextStep, setNextStep] = useState(1);
    const [title, setTitle] = useState("");
    const [currentId, setCurrentId] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();
    const [questions, setQuestions] = useState([{}]);
    const [answer, setAnswer] = useState([{}]);
    const [update, setUpdate] = React.useState(false);

    const [test, setTest] = useState([{}]);
    const [underQuestion, setUnderQuestions] = useState();
    const [underAnswer, setUnderAnswer] = useState([{}]);
    const [nextUnder, setNextUnder] = useState(-1);

    // User informations
    const [language, setLanguage] = useState("");
    const { t, i18n } = useTranslation();

    
    const colorMode = route.params.colorMode;    

    // Translation
    async function getUserProcesses() {
        const token = await getItem('@loginToken');
        axios.get(`${url}/userProcess/getUserProcesses`, { params: { user_token: token } })
        .then(res => {
            res.data.response.map((item: any) => {
                if (item.userProcess.stocked_title === processSelected?.processStockedTittle)
                    setUpdate(true);
            });
        }).catch(err => {
            console.log(err)
        });
    }



    useEffect(() => {
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
            setCurrentId(res.data.questions[nextStep - 1].step_id);
            setCurrentQuestion(res.data.questions[nextStep - 1].question);
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
                if (questions[nextStep - 1].underQuestions && currentQuestionAnswer === 'true')
                    setAnswer([{ step_id: currentId, response: currentQuestionAnswer === 'true', underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
                        return (
                            {step_id: item.step_id, response: true}
                        )
                    })}]);
                // else if (questions[nextStep - 1].underQuestions!)
                //     setAnswer([{ step_id: currentId, response: currentQuestionAnswer === 'true'}]);
                else
                    setAnswer([{ step_id: currentId, response: currentQuestionAnswer === 'true'}]);
            } else
                if (questions[nextStep - 1].underQuestions && currentQuestionAnswer === 'true')
                    setAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true', underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
                        return (
                            {step_id: item.step_id, response: true}
                        )
                    })}]);
                // else if (questions[nextStep - 1].underQuestions)
                //     setAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'}]);
                else
                    setAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'} ]);
            setNextStep(nextStep + 1);
            setCurrentQuestion(questions[nextStep - 1].question);
            setCurrentId(questions[nextStep - 1].step_id);
        } else {
            if (questions[nextStep - 1].underQuestions && currentQuestionAnswer === 'true')
            var responseTemp = [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true', underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
                    return (
                        {step_id: item.step_id, response: true}
                    )
                })}];
            // else if (questions[nextStep - 1].underQuestions)
            //     var responseTemp = [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'}];
            else
                var responseTemp = [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'}];
            if (update === false) {
                addProcess(responseTemp);
            } else {
                updateProcess(responseTemp);
            }
        }

        // test part
        // if (questions[nextStep - 1].underQuestions && currentQuestionAnswer === 'false') {
        //     // etape 1 = creer la variable de reponse
        //     // etape 2 = utiliser currentId pour rester dans les sous question
        //     // etape 3 = afficher les sous questions
        //     // etape 4 = envoyer les reponse des sous questions dans la variable answer et mettre la main question en faux
        //     if (nextUnder === -1) {
        //         setUnderQuestions(questions[nextStep - 1].underQuestions);
        //         setNextUnder(nextUnder + 1);
        //         setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
        //     } else if (nextUnder === 0) {
        //         setNextUnder(nextUnder + 1);
        //         setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
        //         setUnderAnswer([{ step_id: currentId, response: currentQuestionAnswer === 'true'}]);
        //     } else if (nextUnder < questions[nextStep - 1].underQuestions.length - 1) {
        //         setNextUnder(nextUnder + 1);
        //         setCurrentQuestion(questions[nextStep - 1].underQuestions[nextUnder + 1].question);
        //         setUnderAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'}]);
        //     } else {
        //         setNextUnder(-1);
        //         setAnswer(answer => [...answer, { step_id: currentId, response: currentQuestionAnswer === 'true'}]);
        //         setNextStep(nextStep + 1);
        //         setCurrentQuestion(questions[nextStep - 1].question);
        //         setCurrentId(questions[nextStep - 1].step_id);
        //     }
        //     console.log(questions[nextStep - 1].underQuestions);
        //     // setTest([{step_id: currentId, response: false, underQuestions: questions[nextStep - 1].underQuestions.map((item: any, index: number) => {
        //     //     // console.log(item);
        //     //     return (
        //     //         {step_id: item.step_id, response: true}
        //     //     )
        //     // })}]);
        // }
        // else {
        //     console.log("Current question = " + currentQuestion);
        // }
    }

    return (
        <View style={colorMode === 'light' ? quizzQuestion.container : quizzQuestion.containerDark }>
            <View style={quizzQuestion.center}>
                <Text style={colorMode === 'light' ? quizzQuestion.text : quizzQuestion.textDark}>{currentQuestion}</Text>
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