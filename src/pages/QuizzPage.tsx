// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { getItem } from "../services/Storage";
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useTranslation } from 'react-i18next';

import LongHorizontalButton from "../components/LongHorizontalButton";

import { quizzPage } from "../../styles/pages/quizzPage";

function QuizzPage({ navigation, route }: { navigation: any, route: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const { t, i18n } = useTranslation();

    const [posts, setPosts] = useState([{}]);
    const [processSelected, setProcessSelected] = useState("");
    const [processStockedTittle, setProcessStockedTittle] = useState("");
    const [processValue, setProcessValue] = useState(0);


    // User informations
    const [language, setLanguage] = useState("");
    const goToQuestion = () => navigation.navigate("QuizzQuestion", {processSelected: processSelected, processStockedTittle: processStockedTittle, step: processValue});


    function getLanguage() {
        switch(i18n.language) {
            case 'en':
              setLanguage('english');
            case 'fr':
              setLanguage('francais');
            default:
                setLanguage('english');
          }
    }

    async function getProcedures() {
        let langTemp = "";
        switch(i18n.language) {
            case 'en':
                langTemp = 'english';
            case 'fr':
                langTemp = 'english';
            default:
                langTemp = 'english';
          }
        axios.get(`${url}/process/getAll`, { params: { language: langTemp } })
            .then(res => {
                var procedures = [];
                // console.log(res.data);
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
        console.log(posts);
        }, [])

    const handleSubmit = () => {
        console.log("button pressed");
        console.log(processStockedTittle);
        goToQuestion();
    }                     

    return (
        <View style={quizzPage.container}>
            <SelectDropdown
            data={posts.map((item) => item.label)}
            onSelect={(selectedItem, index) => {
                setProcessSelected(selectedItem);
                setProcessValue(posts[index].value);
                setProcessStockedTittle(posts[index].stocked_title);
                console.log(selectedItem, index);
            }}
            defaultButtonText={t('quizzpage.select')}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
            <LongHorizontalButton
                title={t('quizzpage.start')}
                onPress={handleSubmit}
                styleButton={quizzPage.button}
                styleText={quizzPage.button.text}
                testID="submitButton"
                    />
        </View>
    );
}

export default QuizzPage;