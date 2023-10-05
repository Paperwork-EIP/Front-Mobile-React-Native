import React, { useEffect, useState } from "react";
import { View } from "react-native";
import axios from "axios";

import CalendarComponent from "../components/calendar/CalendarComponent";
import { getItem } from "../services/Storage";

import { calendar, brightRed } from "../../styles/screen/calendar";

function Calendar() {
    const [items, setItems] = useState<any>([]);
    const [token, setToken] = useState('');
    const [markedDatesState, setMarkedDatesState] = useState<any>({});

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
        }).catch((error) => {
            setItems([]);
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
        let interval: any;

        if (!token || items.length === 0) {
            getLoginToken();
        } else {
            interval = setInterval(() => {
                getLoginToken();
            }, 3000);
        }
        
        setDotMarkedDates();

        return () => clearInterval(interval);
    }, [items]);

    return (
        <View style={calendar.container}>
            <CalendarComponent
                style={calendar.container.calendar}
                sectionStyle={calendar.container.section}
                styleEmpty={calendar.container.empty}
                styleEmptyText={calendar.container.empty.text}
                markedDates={markedDatesState}
                items={items}
            />
        </View>
    );
};

export default Calendar;