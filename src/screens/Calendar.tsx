import React, { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import axios from "axios";

import CalendarComponent from "../components/calendar/CalendarComponent";
import LoadingComponent from "../components/LoadingComponent";

import { getItem } from "../services/Storage";

import { calendar, brightRed } from "../../styles/screen/calendar";
import { loading_component } from "../../styles/components/loading_component";

function Calendar({ navigation, route }: { navigation: any, route: any }) {
    const [items, setItems] = useState<any>([]);
    const [token, setToken] = useState('');
    const [markedDatesState, setMarkedDatesState] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);

    const colorMode = route.params.colorMode;
    const selectedDotColor = brightRed;
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
            setDotMarkedDates();
            setIsLoading(false);
        }).catch((error) => {
            setItems([]);
            setIsLoading(false);
            console.error("Error axios get calendar : ", error.response);
        });
    }

    function setDotMarkedDates() {
        let tmp: any = {};

        items.forEach((item: any) => {
            const date = item.title;
            const dotColor = item.data[0].color;

            if (tmp[date]) {
                tmp[date].dots = [
                    ...tmp[date].dots,
                    {
                        color: dotColor,
                        selectedDotColor: selectedDotColor,
                    },
                ];
            } else {
                tmp[date] = {
                    dots: [
                        {
                            color: dotColor,
                            selectedDotColor: selectedDotColor,
                        },
                    ],
                };
            }
        });

        markedDates = tmp;
        setMarkedDatesState(markedDates);
    }

    async function getLoginToken() {
        const loginToken = await getItem('@loginToken');

        if (loginToken) {
            setToken(loginToken);
            await updateItems(loginToken);
        }
    }

    useEffect(() => {
        items.map((item: any) => {
            const eventDate = new Date(item.title);
            const today = new Date();
            const threeDays = new Date();
            threeDays.setDate(today.getDate() - 3);

            if (eventDate < threeDays) {
                axios.get(`${url}/calendar/delete?user_process_id=${item.userProcessId}&step_id=${item.stepId}`, {
                }).then(() => {
                    console.log("Delete calendar item");
                }).catch(err => {
                    console.error(err);
                })
            }
        })
    }, [items]);

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
    }, []);

    return (
        <View style={colorMode === 'light' ? calendar.container : calendar.containerDark}>
            {
                isLoading ?
                    <LoadingComponent styleContainer={loading_component.lightContainer} />
                    :
                    <CalendarComponent
                        colorMode={colorMode}
                        style={colorMode === 'light' ? calendar.container.calendar : calendar.containerDark.calendar}
                        sectionStyle={colorMode === 'light' ? calendar.container.section : calendar.containerDark.section}
                        styleEmpty={colorMode === 'light' ? calendar.container.empty : calendar.containerDark.empty}
                        styleEmptyText={colorMode === 'light' ? calendar.container.empty.text : calendar.containerDark.empty.text}
                        markedDates={markedDatesState}
                        items={items}
                    />
            }
        </View>
    );
};

export default Calendar;