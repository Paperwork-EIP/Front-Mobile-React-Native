// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { getItem } from "../services/Storage";
import { Text, View } from 'react-native';

function Result({ navigation } : { navigation: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;
    const [stepsAnswer, setStepsAnswer] = useState([]);
    const [title, setTitle] = useState("");
    const [processSelected, setProcessSelected] = useState("");

    // User informations
    const [language, setLanguage] = useState("");


    function getUserSteps() {
        axios.get(`${url}/userProcess/getUserSteps`, { params: { process_title: processSelected, user_token: getItem('@loginToken') } })
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
        axios.get(`${url}/user/getbytoken`, { params: { token: getItem('@loginToken') } })
        .then(res => {
            setLanguage(res.data.language);
        }).catch(err => {
            console.log(err)
        });
    }, [processSelected, url, stepsAnswer]);

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
        <View>

        <Text>Process Result</Text>
        {/* //                         stepsAnswer?.map((item: any) => {
        //                             return (
        //                                 <div className='ProcessResult-output'>
        //                                     <input className='ProcessResult-Checkbox' type="checkbox" data-testid={item.step_id} id={item.step_id} onClick={() => handleCheckboxClick(item.step_id, item.is_done)}></input>
        //                                     <label htmlFor={item.step_id}> : {item.description} </label>
        //                                     <a href={item.source} target='_blank'><BsLink /></a>
        //                                 </div>
        //                             )
        //                         })
        //                     } */}

        </ View>
    );
}

export default Result;