import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from "axios";

import { getItem } from "../services/Storage";

import CalendarComponent from "../components/calendar/CalendarComponentMainMenu";

import { mainmenu } from "../../styles/screen/mainmenu";
import { calendar } from "../../styles/screen/calendar";

const MainMenu: React.FC = ({ navigation }: any) => {
    const [userProcessInfo, setUserProcessInfo]: any = useState([{}]);

    const { t } = useTranslation();

    function goToQuizzPage() {
        navigation.navigate("QuizzPage");
    };

    function goToLexiconPage() {
        navigation.navigate("Lexicon");
    };

    function goToHelpPage() {
        navigation.navigate("Help");
    };

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

    const [items, setItems] = useState<any>([]);
    const [token, setToken] = useState('');

    const url = process.env.EXPO_PUBLIC_BASE_URL;

    let markedDates: any = {};

    function setColor(index: number) {
        const listColor = ['orange', 'blue', 'green', 'red', 'purple', 'pink', 'yellow', 'grey', 'black', 'brown'];

        if (index > listColor.length - 1) {
            index = 0;
        }

        return listColor[index];
    }

    async function updateItems(token: string) {
        await axios.get(`${url}/calendar/getAll?token=${token}`).then((response) => {
            let list: any = [];

            for (const [index, value] of response.data.appoinment.entries()) {
                const date = value.date;
                const hour = date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1];
                const titleDate = date.split('T')[0];
                const data = [
                    {
                        title: hour + " - " + value.step_title,
                        color: setColor(index)
                    },
                ];

                list.push({
                    title: titleDate,
                    processTitle: value.process_title,
                    stockedTitle: value.stocked_title,
                    stepDescription: value.step_description,
                    userProcessId: value.user_process_id,
                    stepId: value.step_id,
                    data: data
                });
            }

            setItems(list);
        }).catch((error) => {
            setItems([]);
            console.error("Error axios get calendar : ", error.response);
        });
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
        let interval: any;

        if (!token || items.length === 0) {
            getLoginToken();
        } else {
            interval = setInterval(() => {
                getLoginToken();
            }, 3000);
        }

        return () => clearInterval(interval);
    }, [items]);

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
                <View style={mainmenu.calendarContainer}>
                    <View style={mainmenu.calendarWrapper}>
                        <CalendarComponent
                            style={calendar.container.calendar}
                            sectionStyle={calendar.container.section}
                            styleEmpty={calendar.container.empty}
                            styleEmptyText={calendar.container.empty.text}
                            markedDates={markedDates}
                            items={items}
                            onPressButton={() => navigation.navigate("Calendar")}
                        />
                    </View>
                </View>
            </View>
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