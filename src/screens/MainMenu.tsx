import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import axios from "axios";

import { getItem } from "../services/Storage";

import CalendarComponent from "../components/calendar/CalendarComponentMainMenu";
import LoadingComponent from '../components/LoadingComponent';

import { mainmenu } from "../../styles/screen/mainmenu";
import { calendar } from "../../styles/screen/calendar";
import { loading_component } from '../../styles/components/loading_component';

function MainMenu({ navigation, route }: { navigation: any, route: any }) {
    const [userProcessInfo, setUserProcessInfo]: any = useState([]);
    const [isLoadingCalendarAgendaList, setIsLoadingCalendarAgendaList] = useState(true);
    const [isLoadingProcessList, setIsLoadingProcessList] = useState(true);

    const colorMode = route.params.colorMode;

    const { t, i18n } = useTranslation();
    
    const [done, setDone] = React.useState(false);

    function goToQuizzPage() {
        navigation.navigate("QuizzPage");
    };

    function goToResultPage(processStockedTittle: any) {
        navigation.navigate("Result", {processStockedTittle: processStockedTittle});
    };

    function goToLexiconPage() {
        navigation.navigate("Lexicon");
    };

    function goToHelpPage() {
        navigation.navigate("Help");
    };

    async function getLanguage() {
        const token = await getItem('@loginToken');
        axios.get(`${url}/user/getbytoken`, { params: { token: token } })
            .then(res => {
                switch(res.data.language) {
                    case 'english':
                      i18n.changeLanguage('en');
                      break;
                    case 'french':
                      i18n.changeLanguage('fr');
                      break;
                    case 'spanish':
                        i18n.changeLanguage('es');
                        break;
                    case 'german':
                        i18n.changeLanguage('de');
                        break;
                    case 'indonesian':
                        i18n.changeLanguage('id');
                        break;
                    case 'korean':
                        i18n.changeLanguage('ko');
                        break;
                    default:
                        i18n.changeLanguage('en');
                        break;
                }
            }).catch(err => {
                console.log(err)
            });
    }

    async function getProcess(token: string) {
        const response = await axios.get(`${url}/userProcess/getUserProcesses?user_token=${token}`);

        const userProcessTmp = [];
        for (let j = 0; j < response.data.response.length; j++) {
            if (response.data.response[j]['pourcentage'] != null)
                userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, stocked_title: response.data.response[j]['userProcess'].stocked_title, percentage: response.data.response[j]['pourcentage'] });
            else
                userProcessTmp.push({ process: response.data.response[j]['userProcess'].title, stocked_title: response.data.response[j]['userProcess'].stocked_title, percentage: 0 });
        }
        setUserProcessInfo(userProcessTmp);
        setIsLoadingProcessList(false);
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

    function getPercentageClass(percentage: number) {
        if (percentage <= 25) {
            return "#FC6976";
        }
        else if (percentage <= 50) {
            return "#fc9f69";
        }
        else if (percentage <= 75) {
            return "#29c9c6";
        }
        else {
            return "#29C9B3";
        }
    };

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
            setIsLoadingCalendarAgendaList(false);
        }).catch((error) => {
            setItems([]);
            setIsLoadingCalendarAgendaList(false);
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

    function displayProcessList() {
        if (userProcessInfo.length > 0) {
            return userProcessInfo.map((item: any, index: number) => (
                <TouchableOpacity key={index} onPress={() => goToResultPage(item.stocked_title)}>
                    <View style={mainmenu.processContainer}>
                        <Text style={colorMode === 'light' ? mainmenu.processName : mainmenu.processNameDark}>{item.process}:</Text>
                        <View style={colorMode === 'light' ? mainmenu.progressContainer : mainmenu.progressContainerDark}>
                            <View style={[{height: '100%', backgroundColor: getPercentageClass(item.percentage)},
                            // mainmenu.progressValue,
                                    { width: `${item.percentage}%` },
                                    // getPercentageClass(item.percentage),
                                ]}
                            >
                                
                            </View>
                        </View>
                        <Text style={colorMode === 'light' ? mainmenu.processPercentage : mainmenu.processPercentageDark}>{`${item.percentage}%`}</Text>
                    </View>
                </TouchableOpacity>

            ))
        } else {
            return (
                <View style={mainmenu.noProcessContainer}>
                    <Text style={mainmenu.noProcessText}>{t('mainmenu.noProcess')}</Text>
                </View>
            )
        }
    }

    useEffect(() => {
        let interval: any;

        if (!token || items.length === 0) {
            getLoginToken();
        } else {
            interval = setInterval(() => {
                getLoginToken();
            }, 5000);
        }
        if (done === false) {
            getLanguage();
            setDone(true);
        }

        return () => clearInterval(interval);
    }, [items, done]);

    return (
        <View style={colorMode === 'light' ? mainmenu.container : mainmenu.containerDark}>
            <View style={colorMode === 'light' ? mainmenu.sectionContainerFlex1 : mainmenu.sectionContainerDarkFlex1}>
                <Text style={colorMode === 'light' ? mainmenu.title : mainmenu.titleDark}>{t('mainmenu.process')}</Text>
                <ScrollView>
                    {
                        isLoadingProcessList ?
                            <LoadingComponent size="small" styleContainer={loading_component.lightContainer} />
                            :
                            displayProcessList()
                    }
                </ScrollView>
                <TouchableOpacity onPress={goToQuizzPage}>
                    <Text style={mainmenu.button}>{t('mainmenu.newProcessButton')}</Text>
                </TouchableOpacity>
            </View>
            <View style={colorMode === 'light' ? mainmenu.sectionContainerFlex2 : mainmenu.sectionContainerDarkFlex2}>
                <Text style={colorMode === 'light' ? mainmenu.title : mainmenu.titleDark}>{t('mainmenu.events')}</Text>
                {
                    isLoadingCalendarAgendaList ?
                        <LoadingComponent size="small" styleContainer={loading_component.lightContainer} />
                        :
                        <CalendarComponent
                            colorMode={colorMode}
                            style={colorMode === 'light' ? calendar.container.calendar : calendar.containerDark.calendar}
                            sectionStyle={colorMode === 'light' ? calendar.container.section : calendar.containerDark.section}
                            styleEmpty={colorMode === 'light' ? calendar.container.empty : calendar.containerDark.empty}
                            styleEmptyText={colorMode === 'light' ? calendar.container.empty.text : calendar.containerDark.empty.text}
                            markedDates={markedDates}
                            items={items}
                        />
                }
            </View>
            <View style={colorMode === 'light' ? mainmenu.sectionContainerFlex3 : mainmenu.sectionContainerDarkFlex3}>
                <Text style={colorMode === 'light' ? mainmenu.title : mainmenu.titleDark}>{t('mainmenu.needHelp')}</Text>
                <View style={mainmenu.buttonContainerWrapper}>
                    <View style={colorMode === 'light' ? mainmenu.buttonContainer : mainmenu.buttonContainerDark}>
                        <TouchableOpacity onPress={() => goToHelpPage()}>
                            <Text style={colorMode === 'light' ? mainmenu.content : mainmenu.contentDark}>{t('mainmenu.help')}</Text>
                            <Image source={require('../../assets/images/help/FAQs-bro.png')} style={mainmenu.image} />
                        </TouchableOpacity>
                    </View>
                    <View style={colorMode === 'light' ? mainmenu.buttonContainer : mainmenu.buttonContainerDark}>
                        <TouchableOpacity onPress={() => goToLexiconPage()}>
                            <Text style={colorMode === 'light' ? mainmenu.content : mainmenu.contentDark}>{t('mainmenu.lexicon')}</Text>
                            <Image source={require('../../assets/images/lexicon/Lexicon-icon.png')} style={mainmenu.image} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MainMenu;