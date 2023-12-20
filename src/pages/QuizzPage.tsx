// React Import
import React, { useState, useEffect } from 'react';

// Utils Import
import axios from "axios";

import { getItem } from "../services/Storage";
import { View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useTranslation } from 'react-i18next';

import LongHorizontalButton from "../components/LongHorizontalButton";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { quizzPage } from "../../styles/pages/quizzPage";

function QuizzPage({ navigation, route }: { navigation: any, route: any }) {

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    const { t, i18n } = useTranslation();

    const [posts, setPosts] = useState([{}]);
    const [processSelected, setProcessSelected] = useState("");
    const [processStockedTittle, setProcessStockedTittle] = useState();
    const [processValue, setProcessValue] = useState(0);


    // User informations
    const [language, setLanguage] = useState("");
    const goToQuestion = () => navigation.navigate("QuizzQuestion", {processStockedTittle: processStockedTittle});

    
    const colorMode = route.params.colorMode;

    function getLanguage() {
        switch(i18n.language) {
            case 'en':
                setLanguage('english');
                break;
            case 'fr':
                setLanguage('french');
                break;
            case 'de':
                setLanguage('german');
                break;
            case 'es':
                setLanguage('spanish');
                break;
            case 'id':
                setLanguage('indonesian');
                break;
            case 'ko':
                setLanguage('korean');
                break;
            default:
                setLanguage('english');
                break;
          }
    }

    async function getProcedures() {
        let langTemp = "";
        switch(i18n.language) {
            case 'en':
                langTemp = 'english';
                break;
            case "fr":
                langTemp = 'french';
                break;
            case "de":
                langTemp = 'german';
                break;
            case "es":
                langTemp = 'spanish';
                break;
            case "id":
                langTemp = 'indonesian';
                break;
            case "ko":
                langTemp = 'korean';
                break;
            default:
                langTemp = 'english';
                break;
          }
        axios.get(`${url}/process/getAll`, { params: { language: langTemp } })
            .then(res => {
                var procedures = [];
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
        if(processStockedTittle!)
            goToQuestion();
        else
            console.log(processStockedTittle);
    }                     

    return (
        <View style={colorMode === 'light' ? quizzPage.container : quizzPage.containerDark}>
            <SelectDropdown
            data={posts.map((item) => item.label)}
            onSelect={(selectedItem, index) => {
                setProcessSelected(selectedItem);
                setProcessValue(posts[index].value);
                setProcessStockedTittle(posts[index].stocked_title);
            }}
            defaultButtonText={t('quizzpage.select')}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={colorMode === 'light' ? quizzPage.dropdownStyle : quizzPage.dropdownStyleDark}
            buttonTextStyle={colorMode === 'light' ? quizzPage.dropdownTxtStyle : quizzPage.dropdownTxtStyleDark}
            renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={colorMode === 'light' ? '#454545' : '#cecece'} size={12} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={colorMode === 'light' ? quizzPage.dropdown1DropdownStyle : quizzPage.dropdown1DropdownStyleDark}
            rowStyle={colorMode === 'light' ? quizzPage.dropdownRowStyle : quizzPage.dropdownRowStyleDark}
            rowTextStyle={colorMode === 'light' ? quizzPage.dropdownRowTxtStyle :quizzPage.dropdownRowTxtStyleDark}
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