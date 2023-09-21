import React, { useState, useEffect } from 'react';

import { useRoute } from '@react-navigation/native';
import axios from "axios";

import { getItem } from "../services/Storage";
import { useTranslation } from 'react-i18next';

import "../../styles/pages/Quiz.scss";
import { View } from 'react-native';

function QuizzPage({ navigation } : { navigation: any }) {

    var { processSelected } = useRoute().params?.processSelected;
    var { step } = useRoute().params?.step;
    const nextStep = parseInt(step!) + 1;
    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const [title, setTitle] = useState("");
    const [currentId, setCurrentId] = useState();
    const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState();
    const [questions, setQuestions] = useState([{}]);
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
            console.log(res.data.response);
            res.data.response.map((item: any) => {
                if (item.userProcess.stocked_title === processSelected)
                    setUpdate(true);
            });
        }).catch(err => {
            console.log(err)
        });
    }

    useEffect(() => {

        switch(i18n.language) {
            case 'en':
              setLanguage('english');
            case 'fr':
              setLanguage('francais');
            default:
                setLanguage('english');
          }

        axios.get(`${url}/processQuestions/get`, { params: { title: processSelected, language: language } })
        .then(res => {
            console.log(res.data.questions);
            setTitle(res.data.title);
            setCurrentId(res.data.questions[nextStep - 1].step_id);
            setCurrentQuestionAnswer(res.data.questions[nextStep - 1].question);
            setQuestions(res.data.questions);
        }).catch(err => {
            console.log(err)
        });

        
    }, [nextStep, processSelected, language])

    function handleClick(currentQuestionAnswer: string) {
        const urlAnswers = window.location.search.substring(1);
        if (nextStep < questions.length)
        {
            if (!urlAnswers)
                window.location.href = `/quiz/${processSelected}/${nextStep}?${currentId}=${currentQuestionAnswer}`;
            else
                window.location.href = `/quiz/${processSelected}/${nextStep}?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
        } else {

            var queryStr = `?${urlAnswers}&${currentId}=${currentQuestionAnswer}`;
            var queryArr = queryStr.replace('?','').split('&');
            var queryParams = [];

            for (var q = 0; q < queryArr.length; q++) {
                var qArr = queryArr[q].split('=');
                if (qArr[1] === 'true')
                    queryParams.push({ step_id: parseInt(qArr[0]), response: true});
                else
                    queryParams.push({ step_id: parseInt(qArr[0]), response: false});
            }

            const post = { process_title: processSelected, user_token: cookiesInfo.loginToken, questions: queryParams }
            if (update === false)
            {
                axios.post(`${api}/userProcess/add`, post)
                .then(res => {
                    console.log(res);
                    window.location.href = `/processResult/${processSelected}`;
                }).catch(err => {
                    console.log(err)
                });
            } else {
                axios.post(`${api}/userProcess/update`, post)
                .then(res => {
                    console.log(res);
                    window.location.href = `/processResult/${processSelected}`;
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }

    return (
        <View></View>
        // <>
        //     <Header/>

        //     <div className={colorMode === "light" ? "Quiz Quiz-light" : "Quiz Quiz-dark"}>
        //         <div className='Page-Title'>{title}</div>
        //         <div className='Quiz-container'>
        //             <div className='Question-Style'>{currentQuestionAnswer!}</div>
        //             <div className='QuizQuestionBtn'>
        //                 <button type="button" className='No-btn' data-testid="btn-no" onClick={() => handleClick('false')}>{translation.no}</button>
        //                 <button type="button" className='Yes-btn' data-testid="btn-yes" onClick={() => handleClick('true')}>{translation.yes}</button>
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
}

export default QuizQuestion;