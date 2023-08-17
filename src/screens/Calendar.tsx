import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CalendarComponent from "../components/CalendarComponent";

import { calendar } from "../../styles/screen/calendar";

function Calendar({ navigation }: { navigation: any }) {

    const selectedDotColor = '#FC6976';

    const [selected, setSelected] = useState('');
    let markedDates: any = {
        [selected]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: selectedDotColor,
        }
    };

    function handleDayPressed(day: { year?: number; month?: number; day?: number; timestamp?: number; dateString: any; }) {
        setSelected(day.dateString);
        console.log('selected day', day);
    }

    function updateMarkedDates() {
        let newList = markedDates;

        newList = Object.assign(newList, {
            '2023-10-01': { selected: true, marked: true, selectedColor: 'blue' },
            '2023-09-02': { marked: true },
            '2023-11-03': { selected: true, marked: true, selectedColor: 'blue' }
        });

        markedDates = newList;
    }

    async function getToken() {
        try {
            const value = await AsyncStorage.getItem('loginToken');
            if (value !== null) {
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function removeToken() {
        try {
            await AsyncStorage.removeItem('loginToken');
            navigation.navigate('Login');
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function clearAsyncStorage() {
        try {
            removeToken();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken();
        updateMarkedDates();
    }, [selected]);

    return (
        <View style={calendar.container}>
            <CalendarComponent
            style={calendar.container.calendar}
                onDayPress={(day: { year?: number | undefined; month?: number | undefined; day?: number | undefined; timestamp?: number | undefined; dateString: any; }) => handleDayPressed(day)}
                markedDates={markedDates}
            />
            <Button title="Disconnect" onPress={clearAsyncStorage} />
        </View >
    );
};

export default Calendar;