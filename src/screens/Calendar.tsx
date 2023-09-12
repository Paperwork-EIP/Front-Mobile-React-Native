import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CalendarComponent from "../components/calendar/CalendarComponent";
import { getItem, deleteItem } from "../services/Token";

import { calendar, brightRed } from "../../styles/screen/calendar";

function Calendar({ navigation }: { navigation: any }) {
    const [selected, setSelected] = useState('');
    const [items, setItems] = useState([{ title: '', data: [{ title: '', color: '' }] }]);
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
            let list = [];

            for (let i = 0; i < response.data.appoinment.length; i++) {
                const date = response.data.appoinment[i].date;
                const hour = date.split('T')[1].split(':')[0] + ':' + date.split('T')[1].split(':')[1];
                const title = date.split('T')[0];
                const data = [
                    {
                        title: hour + " - " + response.data.appoinment[i].step_title,
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
            console.log("Error axios get calendar : ", error.response);
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
        for (let i = 0; i < items.length; i++) {
            markedDates[items[i].title] = {
                dots: items[i].data
            }
        }
        console.log("Marked dates : ", markedDates, markedDates[selected]);
    }

    async function getLoginToken() {
        const loginToken = await getItem('loginToken');

        if (loginToken) {
            setToken(loginToken);
            updateItems(loginToken);
        }
    }

    useEffect(() => {
        if (!token || items.length === 0) {
            getLoginToken();
        }
        if (selected) {
            updateMarkedDates();
        }
        setDotMarkedDates();
    }, [selected, items]);

    return (
        <View style={calendar.container}>
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
            <Button title="Disconnect" onPress={() => {
                AsyncStorage.clear();
                deleteItem(navigation, 'loginToken', 'Login');
            }} />
        </View >
    );
};

export default Calendar;