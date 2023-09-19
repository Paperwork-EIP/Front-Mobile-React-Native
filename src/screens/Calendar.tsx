import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import axios from "axios";

import DisconnectButton from "../components/DisconnectButton";
import CalendarComponent from "../components/calendar/CalendarComponent";
import { getItem } from "../services/Storage";

import { calendar, brightRed } from "../../styles/screen/calendar";

function Calendar({ navigation }: { navigation: any }) {
    const [selected, setSelected] = useState('');
    const [items, setItems] = useState<any>([]);
    const [token, setToken] = useState('');

    const selectedDotColor = brightRed;
    const url = process.env.EXPO_PUBLIC_BASE_URL;

    let markedDates: any = {};

    function handleDayPressed(day: { year?: number; month?: number; day?: number; timestamp?: number; dateString: any; }) {
        setSelected(day.dateString);
        console.log('selected day', day);
    }

    function handleOnItemPressed(item: any) {
        console.log('selected item', item);
    }

    function getRandomColor() {
        const listColor = ['orange', 'blue', 'green', 'red', 'purple', 'pink', 'yellow', 'grey', 'black'];

        return listColor[Math.floor(Math.random() * listColor.length)];
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
        <View style={calendar.container}>
            <DisconnectButton navigation={navigation} text="Disconnect" />
            <Button
                title="Submit a process idea"
                color="#FF0000"
                onPress={() => navigation.navigate('ProcessIdea')}
            />
            <Button
                title="Settings"
                color="#00FF00"
                onPress={() => navigation.navigate('Settings')}
            />
            <CalendarComponent
                style={calendar.container.calendar}
                sectionStyle={calendar.container.section}
                styleEmpty={calendar.container.empty}
                styleEmptyText={calendar.container.empty.text}
                markedDates={markedDates}
                items={items}
                onDayPress={handleDayPressed}
                onItemPress={handleOnItemPressed}
            />
        </View >
    );
};

export default Calendar;