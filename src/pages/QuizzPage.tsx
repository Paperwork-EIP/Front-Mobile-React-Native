// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { getItem } from "../services/Storage";
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

import LongHorizontalButton from "../components/LongHorizontalButton";

import { quizzPage } from "../../styles/pages/quizzPage";

function QuizzPage({ navigation } : { navigation: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const [posts, setPosts] = useState([{}]);


    // User informations
    const [language, setLanguage] = useState("");


    // Translation
    // const translation = getTranslation(language, "quiz");

    // Color mode
    // const { colorMode } = useColorMode();

    async function getLanguage() {
        const token = await getItem('@loginToken');
        axios.get(`${url}/user/getbytoken`, { params: { token: token } })
        .then(res => {
            setLanguage(res.data.language);
        }).catch(err => {
            console.log(err)
        });
    }

    async function getProcedures() {
        axios.get(`${url}/process/getAll`, { params: { language: language } })
            .then(res => {
                var procedures = [];
                console.log(res.data);
                for (var i = 0; i < res.data.response.length; i++)
                {
                    procedures.push({
                        label: res.data.response[i]['title'],
                        stocked_title: res.data.response[i]['stocked_title'],
                        value: i
                    });
                }
                setPosts(procedures);
            }).catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        getLanguage();
        getProcedures();

        
        }, [])

    const handleSubmit = () => {
        console.log("button pressed");
        console.log(posts);
    }                     

    return (
        <View>
             <SelectDropdown
            data={posts}
            // defaultValueByIndex={1} // use default value by index or default value
            // defaultValue={'Canada'} // use default value by index or default value
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
            <LongHorizontalButton
                title={'Start'}
                onPress={handleSubmit}
                styleButton={quizzPage.button}
                styleText={quizzPage.button.text}
                testID="submitButton"
                    />
        </View>
    );
}

export default QuizzPage;