import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, Linking } from 'react-native';
import axios from "axios";
import { useTranslation } from 'react-i18next';
import { getItem } from "../services/Storage";
import { mainmenu } from "../../styles/pages/mainmenu";
import { useNavigation } from '@react-navigation/native';
import Help from "../pages/Help";
import Lexicon from "../pages/Lexicon";

import CalendarComponent from "../components/calendar/CalendarComponentMainMenu";
import { calendar, brightRed } from "../../styles/screen/calendar";

const MainMenu: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation();

    function changeLanguage(language: string | undefined) {
        i18n.changeLanguage(language);
    };

    const goToQuizzPage = () => {
        navigation.navigate("QuizzPage");
    };
    const goToLexiconPage = () => {
        navigation.navigate("Lexicon");
    };
    const goToHelpPage = () => {
        navigation.navigate("Help");
    };
    const [userProcessInfo, setUserProcessInfo]: any = useState([{}]);

    async function getProcess(token: string) {
        try {
            const response = await axios.get(`${url}/userProcess/getUserProcesses?user_token=${token}`);

            const userProcessTmp = [];
            for (let j = 0; j < response.data.response.length; j++) {
                if (response.data.response[j]['pourcentage'] != null)
                    userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, percentage: response.data.response[j]['pourcentage'] });
                else
                    userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, percentage: 0 });
            }
            setUserProcessInfo(userProcessTmp);
        } catch (err) {
        }
    }

    const [selected, setSelected] = useState('');
    const [items, setItems] = useState<any>([]);
    const [token, setToken] = useState('');

    const selectedDotColor = brightRed;
    const url = process.env.EXPO_PUBLIC_BASE_URL;

    let markedDates: any = {};

    function handleDayPressed(day: { year?: number; month?: number; day?: number; timestamp?: number; dateString: any; }) {
        setSelected(day.dateString);
    }

    function getRandomColor() {
        const listColor = ['orange', 'blue', 'green', 'red', 'purple', 'pink', 'yellow', 'grey', 'black'];

        return listColor[5];
    }

    async function updateItems(token: string) {
        await axios.get(`${url}/calendar/getAll?token=${token}`).then((response) => {
            let list: any = [];

            for (const value of response.data.appoinment) {
                const date = value.date;
                const hour = date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1];
                const title = date.split('T')[0];
                const data = [
                    {
                        title: hour + " - " + value.step_title,
                        color: getRandomColor()
                    },
                ];

                list.push({
                    title: title,
                    data: data
                });
            }

            setItems(list);
        }).catch((error) => {
            setItems([]);
            console.error("Error axios get calendar : ", error.response);
        });
    }

    function updateMarkedDates() {
        // Update marked dates when user selects a day
        markedDates[selected] = {
            selected: true,
            disableTouchEvent: true,
            selectedColor: selectedDotColor,
        };
    }

    function setDotMarkedDates() {
        for (const item of items) {
            markedDates[item.title] = {
                dots: item.data
            }
        }
    }

    async function getLoginToken() {
        const loginToken = await getItem('@loginToken');

        if (loginToken) {
            setToken(loginToken);
            await updateItems(loginToken);
            await getProcess(loginToken);
        }
    }

    useEffect(() => {
        if (!token || items.length === 0) {
            getLoginToken();
        }
        updateMarkedDates();
        setDotMarkedDates();
    }, [selected, items]);

    return (

        <View style={mainmenu.container}>
            <View style={mainmenu.sectionContainer}>
                <Text style={mainmenu.title}>{t('mainmenu.process')}</Text>
                {userProcessInfo.map((item: any, index: number) => (
                    <View key={index} style={mainmenu.processContainer}>
                        <Text style={mainmenu.processName}>{item.process}:</Text>
                        <Text style={mainmenu.processPercentage}>{`${item.percentage}%`}</Text>
                    </View>
                ))}
                <TouchableOpacity onPress={goToQuizzPage}>
                    <Text style={mainmenu.button}>{t('mainmenu.newProcessButton')}</Text>
                </TouchableOpacity>
            </View>
            <View style={mainmenu.sectionContainer}>
                <Text style={mainmenu.title}>{t('mainmenu.events')}</Text>
            </View>
            <CalendarComponent
                style={calendar.container.calendar}
                sectionStyle={calendar.container.section}
                styleEmpty={calendar.container.empty}
                styleEmptyText={calendar.container.empty.text}
                markedDates={markedDates}
                items={items}
                onDayPress={handleDayPressed}
            />
            <View style={mainmenu.sectionContainer}>
                <Text style={mainmenu.title}>{t('mainmenu.needHelp')}</Text>
                <View style={mainmenu.buttonContainerWrapper}>
                    <View style={mainmenu.buttonContainer}>
                        <TouchableOpacity onPress={() => goToHelpPage()}>
                            <Text style={mainmenu.content}>{t('mainmenu.help')}</Text>
                            <Image source={require('../../assets/images/help/FAQs-bro.png')} style={mainmenu.image} />
                        </TouchableOpacity>
                    </View>
                    <View style={mainmenu.buttonContainer}>
                        <TouchableOpacity onPress={() => goToLexiconPage()}>
                            <Text style={mainmenu.content}>{t('mainmenu.lexicon')}</Text>
                            <Image source={require('../../assets/images/lexicon/Lexicon-icon.png')} style={mainmenu.image} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MainMenu;